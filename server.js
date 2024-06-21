const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

//add url to database
app.use("/add", require("./routes/add.js"));

//use mini url and redirect to link
app.use("/", require("./routes/redirect.js"));

//delete url from database 
app.use("/delete", require("./routes/delete.js"));

const PORT = process.env.PORT | 6001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
