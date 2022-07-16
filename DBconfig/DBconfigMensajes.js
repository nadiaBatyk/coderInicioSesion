const mongoose = require("mongoose");
const mongo = {
  URL: "mongodb+srv://admin:admin@cluster0.7ddl8ks.mongodb.net/mensajes?retryWrites=true&w=majority",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
mongoose
  .connect(mongo.URL, mongo.options)
  .then((res) => console.log("conectado a la base de datos"))
  .catch((err) => console.log(err));
