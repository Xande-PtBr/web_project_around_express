const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "679ce45ad6740e59af4c23b9",
  };

  next();
});

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);
app.use("*", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
