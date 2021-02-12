const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  voituresCount,
  autoval,
  updateValidation,
  searchFilters,
} = require("../controllers/voiture");

router.post("/voiture", create);
router.get("/voitures/total", voituresCount);

router.get("/voitures/:count", listAll);
router.post("/voitures/validation/limit", autoval);
router.delete("/voiture/:_id", authCheck, adminCheck, remove);
router.get("/voiture/:_id", read);
router.put("/voiture/:_id", authCheck, adminCheck, update);
router.put("/voiture/update/:_id", authCheck, adminCheck, updateValidation);

router.post("/voitures", list);
router.post("/search/filters", searchFilters);

module.exports = router;
