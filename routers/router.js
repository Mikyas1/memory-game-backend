const express = require("express")
const controller = require("../controllers/controller");

const router = express.Router();

router.get("/:level", controller.getCards);
router.get("/saved-game/:userId", controller.GetSavedGameStatus);
router.post("/save", controller.saveGameStatus);

module.exports = router;