const express = require("express");
const connectMySQL = require("../driver");
const router = express.Router();

router.get("/:key", async (req, res) => {
  const key = req.params.key;
  console.log(key)

  const query = `SELECT *
                    FROM url 
                        WHERE url.url_key LIKE ?`;

    //redirect to miniurl in database using key
  try {
    const result = await connectMySQL(query, [key]);
    console.log(result[0].long_url);
    return res.redirect(302, result[0].long_url);
  } catch (error) {
    res.status(404).send("Connection failed");
  }
});

module.exports = router;
