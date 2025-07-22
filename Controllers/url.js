import { Url } from "../Models/Url.js";
import shortid from "shortid";
import { config } from "dotenv";

//.env setup
config({ path: ".env" });
const port = process.env.PORT;
const baseurl = process.env.BASEURL;

export const shortURL = async (req, res) => {
  const mainurl = req.body.mainurl;
  const shortCode = shortid.generate();

  //const shortURL = `http://localhost:${port}/${shortCode}`;
  const shortURL = `${baseurl}/${shortCode}`;
  //save to DB
  const newUrl = new Url({ shortCode, mainurl });
  await newUrl.save();

  console.log("short url saved==", newUrl);

  res.render("index.ejs", { shortURL });
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.codeshowrt;

  try {
    const originalurl = await Url.findOne({ shortCode });
    // res.json({ originalurl });

    if (originalurl) {
      //console.log();
      //sends user to real url
      res.redirect(originalurl.mainurl);
    } else {
      res.status(404).json({ message: "Invalid URL" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
