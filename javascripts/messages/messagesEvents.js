const messagesFirebaseAPI = require('./messagesFirebaseAPI');
const moment = require('../../lib/node_modules/moment');
const messagesDom = require('./messagesDom');

const activateChatModalEvent = () => {
  $(document).on('click','#messagesBtn', () => {
    $('#chat-modal').css('display', 'block');
  });
};

const deactivateChatModalEvent = () => {
  $(document).on('click','#close-chat-modal-btn', () => {
    $('#chat-modal').css('display', 'none');
  });
};

// Post message to database
const postMessageToDBEvent = () => {
  $(document).on('click','#chat-input-send-btn', () => {
    const messageToSave = {
      avatar: 'https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg',
      message: $('#chat-input-message').val(),
      timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
      isEdited: false,
    };
    messagesFirebaseAPI.postMessageToDB(messageToSave)
      .then(() => {
        $('#chat-input-message').val('');
        getMessage();
        scrollToBottomEvent();
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

// Get message from database
const getMessage = () => {
  messagesFirebaseAPI.getMessageFromDB()
    .then((messagesArray) => {
      messagesDom.printMessages(messagesArray);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getMessageFromDBEvent = () => {
  $(document).on('click','#messagesBtn', () => {
    getMessage();
    scrollToBottomEvent();
  });
};

// Delete message in database
const deleteMessageFromDBEvent = () => {
  $(document).on('click','.chat-message-delete-btn', (e) => {
    const messageId = $(e.target).closest('li').data('messageId');
    messagesFirebaseAPI.deleteMessageFromDB(messageId)
      .then(() => {
        getMessage();
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

// Edit exising message
let messageId = '';
let messageContent = '';

const getMessageForEditEvent = () => {
  $(document).on('click','.chat-message-edit-btn', (e) => {
    messageId = $(e.target).closest('li').data('messageId');
    messageContent = $(e.target).closest('.chat-message-wrapper').find('.chat-message-detail-me').html();
    $('#chat-message-content-edit').val(messageContent);
  });
};

const editMessageInDBEvent = () => {
  $(document).on('click','#chat-message-save-change-btn', (e) => {
    e.preventDefault();
    const messageToEdit = {
      avatar: 'https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg',
      message: $('#chat-message-content-edit').val(),
      timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
      isEdited: true,
    };
    messagesFirebaseAPI.editMessageInDB(messageToEdit,messageId)
      .then(() => {
        getMessage();
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

// get user name from user table and set to variable
const setActiveUsernameEvent = () => {
  $(document).on('click','#messagesBtn', () => {
    messagesFirebaseAPI.setActiveUsername();
  });
};

// keep the scroll bar on the bottom
const scrollToBottomEvent = () => {
  const height =  '10000px';
  $('#chat-message').animate({ scrollTop: height, }, 'slow');
  return false;
};

const backToMainPage = () => {
  $(document).on('click','#close-chat-modal-btn', () => {
    $('#landing-page').removeClass('hide');
  });
};

module.exports = {
  activateChatModalEvent,
  deactivateChatModalEvent,
  postMessageToDBEvent,
  getMessageFromDBEvent,
  deleteMessageFromDBEvent,
  editMessageInDBEvent,
  getMessageForEditEvent,
  setActiveUsernameEvent,
  backToMainPage,
  getMessage,
  scrollToBottomEvent,
};
