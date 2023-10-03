const express = require("express");
const mongoose = require("mongoose");

//ROUTES
var categoria_routes = require('./routes/categoria');
var producto_routes = require('./routes/producto');
var marca_routes = require('./routes/marca');


const app = express();

app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect(
    //`mongodb+srv://aradb:aradbpass@cluster0.krbhq.mongodb.net/?retryWrites=true&w=majority`
    `${process.env.MONGODB_URL}`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Conexión exitosa");
});

app.use('/api', categoria_routes);
app.use('/api', producto_routes); 
app.use('/api', marca_routes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
