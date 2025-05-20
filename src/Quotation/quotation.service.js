import { Quotation } from "../DB/Models/quotation.model.js";

export const addQuotation = async (req, res, next) => {
  const { name, description, price } = req.body;
  const { userId } = req.user;
  const createdQuotation = Quotation.create({
    name,
    description,
    price,
    createdBy: userId,
    updatedBy: userId,
  });
  return res.status(201).json({
    success: true,
    data: createdQuotation,
  });
};

export const updateQuotation = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const { userId } = req.user;
  const updatedQuotation = await Quotation.findByIdAndUpdate(
    id,
    { name, description, price, updatedBy: userId },
    { new: true }
  );
  if (!updatedQuotation) throw new Error("quotation not found!");
  return res.status(200).json({
    success: true,
    data: updatedQuotation,
  });
};

export const deleteQuotation = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const deletedQuotation = await Quotation.findOneAndDelete({
    id,
    createdBy: userId,
  });
  if (!deletedQuotation) throw new Error("quotation not found!");
  return res.status(200).json({
    success: true,
    message: "quotation deleted successfully",
  });
};

export const getQuotation = async (req, res, next) => {
  const { id } = req.params;
  const quotation = await Quotation.findOne({ id });
  if (!quotation) throw new Error("quotation not found!");
  return res.status(200).json({
    success: true,
    data: quotation,
  });
};

export const getAllQuotations = async (req, res, next) => {
  const quotations = await Quotation.find({ createdBy: userId });
  return res.status(200).json({
    success: true,
    data: quotations,
  });
};
