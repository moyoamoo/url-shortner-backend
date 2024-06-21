const express = require("express");
const router = express.Router();
const connectMySQL = require("../driver");
const { checkKey } = require("../middleware");

router.delete("/:key", checkKey, async (req, res) => {
  const key = req.params.key;

  const query = `DELETE from url
                        WHERE url.url_key LIKE ?`;

  try {
    const result = await connectMySQL(query, [key]);
    console.log(result);
    res.status(200).send("URL deleted");
  } catch (error) {
    res.status(404).send("Connection Failed");
  }
});

module.exports = router;
