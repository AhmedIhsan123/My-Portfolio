import express from "express";

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index", { message: "Hello World!" });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
