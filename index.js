const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/home", (req, res) => {
  return res.render("./pages/home");
});

app.get("/contact", (req, res) => {
  return res.render("./pages/contact");
});

app.get("/project", (req, res) => {
  return res.render('./pages/project');
});

app.get("/about", (req, res) => {
  return res.render('./pages/about');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));