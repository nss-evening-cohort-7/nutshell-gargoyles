const news = require('./news');
const newsDom = require('./newsDom');

const deleteNewsEvent = () => {
  $(document).on('click', '.deleteArticleButton', (e) => {
    const articleToDeleteId = $(e.target).closest('.article-container').data('firebaseDbId');
    console.log('from newsEvents', articleToDeleteId);
    news.deleteNewsFromDb(articleToDeleteId)
      .then(() => {
        alert('article successfully removed');
        getNewsEvent();
      })
      .catch((error) => {
        console.error('error deleting article', error);
      });
  });
};

const getNewsEvent = () => {
  news.getNews()
    .then((articleArray) => {
      newsDom.printNews(articleArray);
    })
    .catch((error) => {
      console.error('error in finding news', error);
    });
};

const saveNewsEvent = () => {
  $(document).on('click', '.saveButton', (e) => {
    e.preventDefault();
    const articleArray = [];
    const articleInput = $('.article-title-input').val();
    const synapsisInput = $('.article-synapsis-input').val();
    const urlInput = $('.article-url-input').val();
    const articleToAdd = {
      title: articleInput,
      synapsis: synapsisInput,
      url: urlInput,
    };
    news.saveNewsToDb(articleToAdd)
      .then(() => {
        alert('article saved');
        getNewsEvent();
        articleArray.push(articleToAdd);
        newsDom.printNews(articleArray);
      })
      .catch((error) => {
        console.error('error in saving article', error);
      });
  });
};

const modalInit = () => {
  $('#newsModal').on('shown.bs.modal', () => {
    $('#myInput').focus();
  });
};

module.exports = {
  saveNewsEvent,
  getNewsEvent,
  modalInit,
  deleteNewsEvent,
};
