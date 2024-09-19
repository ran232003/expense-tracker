const MyError = require("../models/MyError");
const Expense = require("../models/expense-schema");
const replaceId = (data) => {
  const newData = data.map((item) => {
    const expense = item.toObject(); // Convert Mongoose document to plain JavaScript object
    expense.id = expense._id.toString(); // Add id field as string
    delete expense._id; // Remove _id field
    return expense;
  });
  return newData;
};
const getExpenses = async (req, res, next) => {
  try {
    const data = await Expense.find({});
    console.log("getExpenses");
    const modifiedData = replaceId(data);
    //console.log(modifiedData);
    return res.json({ status: "ok", data: modifiedData });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const editExpense = async (req, res, next) => {
  console.log("editExpense");

  try {
    const { amount, date, description, id } = req.body; // Get the fields to update from the request body

    const updatedExpense = await Expense.findByIdAndUpdate(
      id, // The id of the document to update
      { amount, date, description }, // The new data to update
      { new: true, runValidators: true } // Options: return the updated document and run validators
    );

    // Check if the expense was found and updated
    if (!updatedExpense) {
      return res
        .status(404)
        .json({ status: "error", message: "Expense not found" });
    }
    const data = await Expense.find({});
    const modifiedData = replaceId(data);

    //console.log(modifiedData);
    return res.json({ status: "ok", data: modifiedData });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const addExpense = async (req, res, next) => {
  console.log("addExpense");

  try {
    const { amount, date, description } = req.body; // Get the fields to update from the request body

    const newExpense = new Expense({
      amount,
      date,
      description,
    });
    await newExpense.save();
    const data = await Expense.find({});
    const modifiedData = replaceId(data);

    //console.log(modifiedData);
    return res.json({ status: "ok", data: modifiedData });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};

module.exports = {
  getExpenses,
  editExpense,
  addExpense,
};
