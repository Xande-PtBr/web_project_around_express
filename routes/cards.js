const { Router } = require("express");
const cards = require("../data/cards.json");
const router = new Router();

router.get("/", (req, res) => {
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
