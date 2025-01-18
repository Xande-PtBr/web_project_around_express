const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const router = new Router();

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../data/cards.json");
  const cards = fs.readFileSync(filePath, "utf-8");
  return (
    res.status(200).json(cards),
    function (err, cards) {
      if (err) {
        return res.status(404).send(err);
      }
      res.json(cards);
    }
  );
});

module.exports = router;
