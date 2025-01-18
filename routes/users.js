const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const router = new Router();
const filePath = path.join(__dirname, "../data/users.json");

router.get("/users", (req, res) => {
  const users = fs.readFileSync(filePath, "utf-8");
  return (
    res.status(200).json(users),
    function (err, users) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(users);
    }
  );
});

router.get("/users/:_id", (req, res) => {
  console.log("Arquivo users.js carregado!");
  fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    }
    const users = JSON.parse(data);
    const userId = req.params._id;
    const userFound = users.find((list) => list._id === userId);
    if (!userFound) {
      return res.status(404).send({ message: "ID do usuário não encontrado" });
    }

    return res.send(userFound);
  });
});

module.exports = router;
