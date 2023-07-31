const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  return res.render("home");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
