import { Expenses } from "../DB/Models/expenses.model.js";

export const addExpense = async (req, res) => {
  const { price, quotation } = req.body;
  const { id: userId } = req.user;
  const createdExpense = await Expenses.create({
    price,
    quotation,
    createdBy: userId,
    updatedBy: userId,
  });
  return res.status(201).json({
    success: true,
    data: createdExpense,
  });
};
export const getExpenses = async (req, res) => {
  const { ref_id } = req.query;
  const expenses = await Expenses.find(
    { quotation: ref_id },
    {},
    { populate: [{ path: "quotation" }] }
  );
  return res.status(200).json({
    success: true,
    data: expenses,
  });
};
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const deletedExpense = await Expenses.findByIdAndDelete(id);
  if (!deletedExpense) throw new Error("expense not found!");
  return res.status(200).json({
    success: true,
    message: "expense deleted successfully",
  });
};
