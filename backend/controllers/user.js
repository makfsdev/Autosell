const User = require("../models/user");



exports.usersCount = async (req, res) => {
    let totalUsers = await User.find({}).estimatedDocumentCount().exec();
    res.json(totalUsers);
  };
