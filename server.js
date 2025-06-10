const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");
const connectdb = require("./config/db.js");
const app = express();

connectdb();

app.use(express.json());

app.use("/contact", require("./routes/contactRoutes.js"));

app.use("/user", require("./routes/userRoutes.js"));

app.use(errorHandler);

app.listen(3000, () => {
  console.log("listing 3000");
});
