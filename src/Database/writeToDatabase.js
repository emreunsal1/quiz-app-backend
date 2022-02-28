const { listModel } = require("../models/listModel");
const { questionModel } = require("../models/questionModel");

const addQuestion = (questionJson) => {
  const newQuestion = new questionModel(questionJson);

  newQuestion.save((error) => {
    if (error) {
      console.log("hata");
    } else {
      console.log("kaydedildi yupiii");
    }
  });
};

const addList = (listJson) => {
  const newList = new listModel(listJson);

  newList.save((error) => {
    if (error) {
      console.log("liste oluşturulamadı");
    } else {
      console.log("liste oluşturuldu problem yok");
    }
  });
};

module.exports = { addQuestion, addUser, addList };
