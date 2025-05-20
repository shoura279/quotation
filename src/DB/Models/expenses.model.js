import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    note: { type: String },
    price: { type: Number },
    expensesType: { type: String },
    quotation: {
      type: Schema.Types.ObjectId,
      ref: "Quotation",
    },
  },
  { timestamps: true }
);

export const Expenses = model("Expenses", schema);
