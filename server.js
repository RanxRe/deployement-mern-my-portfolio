const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

//dotenv configuration
dotenv.config();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/portfolio", require("./routes/protfolioRoute.js"));

//static files
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

//port
const PORT = process.env.PORT || 8000;

//listen
app.listen(PORT, () => console.log(`Server running @ http://localhost:${PORT}`));
