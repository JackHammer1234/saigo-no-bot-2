const mongoose = require("mongoose");

const economiaSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  dinero: { type: Number, default: 0 },
  inventario: { type: Map, of: Number, default: {} },
});

module.exports = mongoose.model("Economia", economiaSchema);
