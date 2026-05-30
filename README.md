#  Wanderlust - Full Stack Travel Booking Platform

Wanderlust is a full-stack web application designed to help users explore travel destinations, create listings, and share reviews of places they have visited. It provides a smooth and interactive experience for travelers to discover and manage travel-related content.

---

##  Features

*  Secure user authentication (Signup / Login / Logout)
*  Create, edit, and delete travel listings
*  Add reviews and ratings for destinations
*  Image upload and management support
*  Explore travel destinations easily
*  Fully responsive UI for all devices

---

## 🛠️ Tech Stack

**Frontend:**

* HTML5
* CSS3
* JavaScript
* EJS (Embedded JavaScript Templates)
* Bootstrap (if used)

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB
* Mongoose ODM

**Authentication & Services:**

* Passport.js (Local Strategy Authentication)
* dotenv (Environment Variables)
* Cloudinary (Image Storage & Management)

---

##  Project Structure

```text id="p4v7aa"
controllers/     → Application logic
models/          → Database schemas
routes/          → API routes
views/           → EJS templates (Frontend UI)
public/          → Static assets (CSS, JS)
utils/           → Helper functions
app.js           → Main server file
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the repository

```bash id="g9k2pl"
git clone https://github.com/76210/Wanderlust.git
```

### 2. Install dependencies

```bash id="k1n7xq"
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory and add:

```env id="v8m2rs"
MONGO_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SECRET=your_session_secret
```

### 4. Run the application

```bash id="t3q9lm"
nodemon app.js
```

##  Key Learnings

* Full-stack web development using Node.js & Express
* RESTful API design
* Authentication & session management
* Database design with MongoDB
* Image upload integration with Cloudinary

---

##  Author

**Khushboo Verma**

---

##  Acknowledgement

If you like this project, please consider giving it a  on GitHub.
