const mongoose = require("mongoose");

const voitureSchema = new mongoose.Schema(
  {
    marque: {
      type: String,
      text: true,
    },
    modèle: {
      type: String,
      text: true,
    },
    année: {
      type: Number,
    },
    carrosserie: {
      type: String,
      trim: true,
    },
    motorisation: {
      type: String,
      trim: true,
    },
    version: {
      type: String,
      trim: true,
    },
    kilométrage: {
      type: String,
      trim: true,
    },
    delai: {
      type: String,
      trim: true,
    },
    prix: {
      type: String,
    },
    autre: {
      type: String,
      text: true,
    },
    images: {
      type: Array,
    },
    email: {
      type: String,
      index: true,
    },
    phone: {
      type: Number,
      index: true,
    },
    validation: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voiture", voitureSchema);
