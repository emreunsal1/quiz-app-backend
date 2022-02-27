const addNewListController = (req, res) => {
  const newList = req.body;
  res.send(newList);
};

const getAllListCOntroller = (req, res) => {};

module.exports = { addNewListController, getAllListCOntroller };
