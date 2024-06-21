const connectMySQL = require("./driver");

async function checkKey(req, res, next) {
  const key = req.params.key;

  console.log("i ran")

  const sql = `SELECT *
                    from url
                        WHERE url.url_key LIKE ?`;
  try {
    const result = await connectMySQL(sql, [key]);
    if (!result.length) {
      res.status(404).send("URL not found");
      return;
    } else {
    console.log("i ran")
      next();
    }
  } catch (error) {
    console.log(error)
    res.status(404).send("Connection Failed");
  }
}

module.exports = { checkKey };
