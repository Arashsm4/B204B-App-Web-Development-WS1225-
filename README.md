# B204B-App-Web-Development-WS1225-
B204B App &amp; Web Development (WS1225)

Although it was the same knowledge, I had to learn a few more things to work on this project. For a long time, I feared working with Docker or databases, but I actually had a really fun time working on this project. I took some help from online resources, patched the holes in my knowledge in parts I didn't get it mostly again for database and Docker, but yeah, it was nice. I wish I had worked more on it because I was thinking maybe I can plug the thingiverse and some other sites into this, but it would have exceeded the time constraint 



# ElectronicFan - Community Hardware Database

## Project Overview
This project was developed for the Web and App Development module. It evolved from a basic Amazon clone into a focused, community-driven knowledge base for electronic components. 

Instead of a standard e-commerce store where users just buy physical parts, **ElectronicFan** acts as a secure database. Users can browse components and datasheets for free, but must pay a simulated access fee to "decrypt" and view community-contributed tips, tricks, and reviews. 

The site features a dark, sci-fi/terminal aesthetic to fit the hardware-hacking theme.

## Tech Stack
* **Front-End:** Vanilla HTML5, CSS3 (CSS Grid/Flexbox), and Client-Side JavaScript.
* **Back-End:** Node.js with Express.js (RESTful API architecture).
* **Database:** MongoDB (NoSQL document-based structure via Mongoose).
* **Deployment/Environment:** Docker & Docker Compose.

## Key Features Implemented
1. **Component Library & Search:** Users can view products and search for specific parts by name.
2. **Add Component:** A form to inject new hardware specs into the database.
3. **PayPal Integration (Sandbox):** Implemented a dummy PayPal gateway. 
   * *Level 1 Access:* €1.00 to unlock reviews for a single component.
   * *Root Access:* €50.00 to unlock all components (saved via `localStorage`).
4. **Restricted Reviews:** Community tips and reviews are locked behind the payment wall. Only users who complete the simulated PayPal checkout can read all logs or submit their own.
5. **Auto-Seeding Database:** If the MongoDB database is empty on startup, the server automatically reads `data/products.json` and injects initial hardware data so the application is immediately testable.

## How to Run the Project (Docker)
This project is fully containerized. You do not need to install Node.js or MongoDB locally to grade this.

**Prerequisite:** Ensure Docker Desktop is running.

1. Open a terminal in the root directory of this project.
2. Run the provided bash script (Mac/Linux):
   ```bash
   chmod +x run.sh
   ./run.sh
