const express = require("express");
const connectMySQL = require("../driver");
const router = express.Router();

router.post("/", async (req, res) => {
  let { shortUrl, longUrl, key } = req.body;
  console.log(key);
  //check if body is valid
  if (!shortUrl) {
    res.send({ status: 0, reason: "No short url" });
    return;
  }

  if (!longUrl) {
    res.send({ status: 0, reason: "No long url" });
    return;
  }

  if (!key) {
    res.send({ status: 0, reason: "No key" });
    return;
  }

  if (shortUrl.length < 5) {
    res.send({ status: 0, reason: "Short url too short" });
    return;
  }

  const findURL = `SELECT *
                    FROM url
                      WHERE long_url like ?`;

  const query = `INSERT INTO url
                    (url_key, short_url, long_url)
                        VALUES
                            (?, ?, ?)`;

  try {
    const result = await connectMySQL(findURL, [longUrl]);
    if (!result.length) {
      const result = await connectMySQL(query, [key, shortUrl, longUrl]);
      res.send({ status: 1, longUrl, key, shortUrl });
      return;
    }
    res.send({
      status: 1,
      longUrl,
      key: result[0].url_key,
      shortUrl: result[0].short_url,
    });
  } catch (error) {
    res.send({ status: 0, reason: "Connection Lost" });
  }
});

module.exports = router;
