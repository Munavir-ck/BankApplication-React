import mongoose from "mongoose";

const transaction = new mongoose.Schema(
  {
    owner: {
      type: String,
      ref: "client",
    },

    amount: {
      type: Number,
    },
    type: {
      type: String,
    },
    details: {
      type: String,
    },
    balance: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("transaction", transaction);
export default transactionModel;
