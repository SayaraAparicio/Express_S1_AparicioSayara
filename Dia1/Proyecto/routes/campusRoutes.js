const express = require("express");
const router = express.Router();
const camperController = require("../controllers/campusController");
const verifyToken = require("../middleware/auth");


router.get("/", camperController.getCampers);
router.post("/", verifyToken,  camperController.createCamper);
router.delete("/:id", verifyToken, camperController.removeCamper);
router.put("/:id", camperController.updateCamper );
router.get("/:id",  camperController.searchCamperById);

module.exports = router;
