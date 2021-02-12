const Voiture = require("../models/voiture");
const User = require("../models/user");

exports.create = async (req, res) => {
  try {
    console.log(req.body);

    const newVoiture = await new Voiture(req.body).save();
    res.json(newVoiture);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create voiture failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let voiture = await Voiture.find({})
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(voiture);
};
exports.autoval = async (req, res) => {
  const { validation, count } = req.body;
  Voiture.find({ validation: validation })
    .limit(count)
    .exec((err, voiture) => {
      if (err) console.log(err);
      res.json(voiture);
    });
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Voiture.findOneAndRemove({
      _id: req.params._id,
    }).exec();
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Voiture delete failed");
  }
};

exports.read = async (req, res) => {
  const voiture = await Voiture.findOne({ _id: req.params._id }).exec();
  res.json(voiture);
};

exports.update = async (req, res) => {
  try {
    const updated = await Voiture.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Voiture UPDATE ERROR", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.updateValidation = async (req, res) => {
  console.log(req.body.validation);
  try {
    const updated = await Voiture.findOneAndUpdate(
      { _id: req.params._id },
      { validation: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

// exports.list = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;
//     const voitures = await Voiture.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     res.json(voitures);
//   } catch (err) {
//     console.error(err);
//   }
// };

exports.list = async (req, res) => {
  try {
    const { validation, sort, order, page } = req.body;

    const currentPage = page || 1;
    const perPage = 3;

    const voitures = await Voiture.find({ validation: validation })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(voitures);
  } catch (err) {
    console.error(err);
  }
};

exports.voituresCount = async (req, res) => {
  let total = await Voiture.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

// search Filters
const handleQuery = async (req, res, query) => {
  const voiture = await Voiture.find({ $text: { $search: query } }).exec();
  res.json(voiture);
};

// search by prix
const handlePrice = async (req, res, prix) => {
  try {
    const voiture = await Voiture.find({
      prix: { $gte: prix[0], $lte: prix[1] },
    }).exec();
    res.json(voiture);
  } catch (err) {
    console.log(err);
  }
};

exports.searchFilters = async (req, res) => {
  const { query, prix } = req.body;
  if (query) {
    await handleQuery(req, res, query);
  }
  if (prix !== undefined) {
    await handlePrice(req, res, prix);
  }
};
