const { Router } = require("express");
const router = new Router();
const users = require("../data/users.json");

router.get("/", (req, res) => {
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

router.get("/:_id", (req, res) => {
  const userId = req.params._id;
  const userFound = users.find((list) => list._id === userId);
  if (!userFound) {
    return res.status(404).send({ message: "ID do usuário não encontrado" });
  }

  return res.send(userFound);
});

module.exports = router;
