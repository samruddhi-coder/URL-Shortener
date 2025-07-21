import express from "express";
import mongoose from "mongoose";
import { shortURL, getOriginalUrl } from "./Controllers/url.js";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

//.env setup

config({ path: ".env" });
const app = express();

app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_URL, { dbname: "NodeJS_Mastery" })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

//rendering ejs file
app.get("/", (req, res) => {
  res.render("index.ejs", { shortURL: null });
});

//short url logic
app.post("/short", shortURL);

//going to original via shortcode (dynamic routing)
//is part of a URL shortener backend, and it’s responsible for handling redirection from a short URL (like https://yourdomain.com/abc123) to the original full URL (like https://www.youtube.com/watch?v=dQw4w9WgXcQ).
//any var name can be other than codeshowrt
app.get("/:codeshowrt", getOriginalUrl);
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Serve 'image' folder statically
app.use("./image", express.static(path.join(__dirname, "image")));
