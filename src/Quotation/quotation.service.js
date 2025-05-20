import { Quotation } from "../DB/Models/quotation.model.js";
import { User } from "../DB/Models/user.model.js";

export const addQuotation = async (req, res, next) => {
  const { name, description, price } = req.body;
  const { id: userId } = req.user;

  const createdQuotation = await Quotation.create({
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
  const deletedQuotation = await Quotation.findByIdAndDelete({
    id,
  });
  if (!deletedQuotation) throw new Error("quotation not found!");
  return res.status(200).json({
    success: true,
    message: "quotation deleted successfully",
  });
};

export const getQuotation = async (req, res, next) => {
  const { id } = req.params;
  const quotation = await Quotation.findById(
    id,
    {},
    { populate: [{ path: "createdBy" }] }
  );

  if (!quotation) throw new Error("quotation not found!");
  return res.status(200).json({
    success: true,
    data: quotation,
  });
};

export const getAllQuotations = async (req, res, next) => {
  const { name, clientName } = req.query;
  const filter = {};
  const clientData = await User.findOne(
    { name: { $regex: clientName } },
    { name: 1 }
  );
  if (clientData) filter.createdBy = clientData._id;
  if (name) filter.name = { $regex: name, $options: "i" };
  const quotations = await Quotation.find(
    filter,
    {},
    { populate: [{ path: "createdBy" }] }
  );
  return res.status(200).json({
    success: true,
    data: quotations,
  });
};
