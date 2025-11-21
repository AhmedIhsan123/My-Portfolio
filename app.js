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

const contacts = [];

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for forms
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Allow the use of JSON
// app.use(express.json);

// Define a default root
app.get("/", (req, res) => {
	res.render("home", { message: "Hello World!" });
});

// Define a contact root
app.get("/contact", (req, res) => {
	res.render("contact");
});

// Define a submit-form route
app.post("/submit-form", async (req, res) => {
	// Create a JSON object to store contact data
	const contact = req.body;
	contact.date = new Date();

	// Write a query to insert into the db
	const sql = `INSERT INTO contacts (fname, lname, jTitle, company, linkedin, email, meetType, other, message, mailingList, mailingType)
	VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

	// Create an array of params for each placeholder
	const params = [
		contact.fname,
		contact.lname,
		contact.job_title || "",
		contact.company || "",
		contact.linkedin || "",
		contact.email || "",
		contact.meet || "",
		contact.other || "",
		contact.message || "",
		(contact.mail_list = "on" ? true : false),
		contact.mail_format || "",
	];

	try {
		const [result] = await pool.execute(sql, params);

		// Send the user to the confirmation page
		res.render("confirmation");
	} catch (err) {
		console.log("DB Error:", err);
	}
});

// Define a admin root
app.get("/admin", (req, res) => {
	res.render("admin", { contacts });
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
