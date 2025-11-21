// Import statements
import express, { application } from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mysql2 from "mysql2";

// Configure dotenv
dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3010;

// Make a pool for the db
const pool = mysql2
	.createPool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT,
	})
	.promise();

const guests = [];

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for forms
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Define a default root
app.get("/", (req, res) => {
	res.render("home", { message: "Hello World!" });
});

// Define a contact root
app.get("/contact", (req, res) => {
	res.render("contact");
});

// Define a confirmation root
app.post("/confirmation", (req, res) => {
	const guest = req.body;
	guest.date = new Date();
	guests.push(guest);
	console.log(guests);
	res.render("confirmation");
});

// Define a admin root
app.get("/admin", (req, res) => {
	res.render("admin", { guests });
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
