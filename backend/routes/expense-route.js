let express = require("express");

const {
  getExpenses,
  editExpense,
  addExpense,
} = require("../controllers/expense-controller");

const router = express.Router();
router.get("/getExpenses", getExpenses);
router.post("/editExpense", editExpense);
router.post("/addExpense", addExpense);

module.exports = router;
