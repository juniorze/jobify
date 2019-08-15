const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (resquest, response) => {
  response.render("home");
});
app.get("/vaga", (resquest, response) => {
  response.render("vaga");
});

app.listen(3333, err => {
  if (err) {
    console.log("Não foi possivel iniciar a aplicação");
  } else {
    console.log("Servidor online");
  }
});
