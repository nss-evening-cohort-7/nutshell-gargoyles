const {modalInit, saveNewsEvent, deleteNewsEvent,} = require('./newsEvents');
const {addArticleButton, printModalForm,} = require('./newsDom');

const initializeNews = () => {
  addArticleButton();
  printModalForm();
  modalInit();
  saveNewsEvent();
  deleteNewsEvent();
};

module.exports = {
  initializeNews,
};
