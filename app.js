const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use(cardsRouter);
app.use(usersRouter);
app.use("*", (req, res) => {
  res.status(404).send("A solicitação não foi encontrada");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
