const express = require("express");
const app = express();

const sqlite = require("sqlite");
const dbConnection = sqlite.open("banco.sqlite", { Promise });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (request, response) => {
  const db = await dbConnection;
  const categoriasDb = await db.all("select * from categorias;");
  const vagas = await db.all("select * from vagas;");
  const categorias = categoriasDb.map(cat => {
    return {
      ...cat,
      vagas: vagas.filter(vaga => vaga.categoria === cat.id)
    };
  });
  response.render("home", {
    categorias
  });
});
app.get("/vaga/:id", async (request, response) => {
  const db = await dbConnection;
  const vaga = await db.get(
    "select * from vagas where id = " + request.params.id
  );
  response.render("vaga", {
    vaga
  });
});

const init = async () => {
  const db = await dbConnection;
  await db.run(
    "create table if not exists categorias (id INTEGER PRIMARY KEY, categoria TEXT);"
  );
  await db.run(
    "create table if not exists vagas (id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);"
  );
  //const categoria = "Engineering team";
  //await db.run(`insert into categorias(categoria) values('${categoria}')`);
  //const vaga1 = "Digital Marketing (Curitiba-PR)";
  //const desc1 = "Vaga para Digital Marketing para trabalhar em Curitiba-PR";
  //const vaga2 = "Fullstack Developer (Remote)";
  //const desc2 = "Vaga para Fullstack Developer para trabalhar remoto";
  //await db.run(
  //  `insert into vagas(categoria, titulo, descricao) values(1, '${vaga1}', '${desc1}')`
  //);
  //await db.run(
  //  `insert into vagas(categoria, titulo, descricao) values(2, '${vaga2}', '${desc2}')`
  //);
};
init();
app.listen(3333, err => {
  if (err) {
    console.log("Não foi possivel iniciar a aplicação");
  } else {
    console.log("Servidor online");
  }
});
