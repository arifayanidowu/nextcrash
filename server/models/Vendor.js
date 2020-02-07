const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema(
  {
    company_name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "vendor"
    },
    general_info: {
      type: Object
    },
    business_info: {
      type: Object
    },
    tech_capability: {
      type: Object
    },
    work_reference: {
      type: Object
    },
    bank_details: {
      type: Object
    },
    individual_reference: {
      type: Object
    },
    status: {
      type: String,
      default: "pending"
    },
    classes: {
      type: Number
    },
    contracts: [Object],
    isContracted: { type: Boolean, default: false },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = Vendor = mongoose.model("Vendor", vendorSchema);
