const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect(
  `mongodb+srv://aradb:aradbpass@cluster0.krbhq.mongodb.net/?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Conexión exitosa");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
