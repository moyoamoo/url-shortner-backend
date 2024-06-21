const express = require("express");
const connectMySQL = require("../driver");
const router = express.Router();

router.post("/", async (req, res) => {
  let { shortUrl, longUrl, key } = req.body;

  //check if body is valid 
  if (!shortUrl) {
    res.status(400).send("No short url");
    return;
  }

  if (!longUrl) {
    res.status(400).send("No long url");
    return;
  }

  if (!key) {
    res.status(400).send("No key");
    return;
  }

  if (shortUrl.length < 5) {
    res.status(400).send("Short url too short");
    return;
  }

  
  const query = `INSERT INTO url
                    (url_key, short_url, long_url)
                        VALUES
                            (?, ?, ?)`;
  //add to database 
  try {
    const result = await connectMySQL(query, [key, shortUrl, longUrl]);
    res.status(302).send({ status: 1, key, longUrl, shortUrl });
  } catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(302).send({ status: 1, key, longUrl, shortUrl });
      return;
    } else {
      res.status(404).send("connection failed");
    }
  }

  console.log(longUrl, shortUrl);
});

module.exports = router;
