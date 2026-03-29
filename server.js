const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');

const app = express();
app.use(express.json());
app.use(cors());


// connecting to mongo using docker service name instead of localhost. took me a while to figure this out. I hate data bases with all my heart
// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/electronics-shop';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("Connected to MongoDB successfully!");

    // AUTO-SEEDING LOGIC: Plug in data if DB is empty
    const count = await Product.countDocuments();
    if (count === 0) {
        console.log("Database is empty. Loading initial data from products.json...");
        const rawData = fs.readFileSync(path.join(__dirname, 'data', 'products.json'));
        const productsData = JSON.parse(rawData);
        await Product.insertMany(productsData);
        console.log("Initial products successfully added to the database!");
    }
}).catch(err => console.log("DB Connection Error:", err));

// --- RESTful APIs ---

// 1. Get products (with search)
app.get('/api/products', async (req, res) => {
    try {
        const searchQuery = req.query.search;
        let query = {};
        if (searchQuery) {
            query.name = { $regex: searchQuery, $options: 'i' };
        }
        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 2. Get single product
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 3. Add new product
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: "Error adding product" });
    }
});

// 4. Save order
app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Order saved", order: newOrder });
    } catch (error) {
        res.status(400).json({ message: "Error saving order" });
    }
});

// 5. Get orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 6. Post review (with bad word filter)
app.post('/api/reviews', async (req, res) => {
    try {
        let { reviewText, tipText, productId } = req.body;

        // simple filter for bad words like i mentioned in the report. just replaces them with stars so the db stays clean. well it should be better but for now it's small

        const badWords = ['badword', 'stupid', 'idiot', 'crap'];
        badWords.forEach(word => {
            const regex = new RegExp(word, 'gi');
            reviewText = reviewText.replace(regex, '***');
            if (tipText) tipText = tipText.replace(regex, '***');
        });

        const newReview = new Review({ productId, reviewText, tipText });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: "Error saving review" });
    }
});

// 7. Get reviews for a product
app.get('/api/reviews/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId }).limit(5).sort({ date: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));