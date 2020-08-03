// Variables =========================================
let commentsContainer = document.querySelector('.comments');
let apiKey = {
  "api_key": "4ce60e6a-0fd6-4074-be37-c42c5bb6de4b"
};
let apiURL = 'https://project-1-api.herokuapp.com/comments/?api_key=4ce60e6a-0fd6-4074-be37-c42c5bb6de4b';

// created DOM elements ===============================
let newCommentSection = document.createElement('div'),
  formContainer = document.createElement('form'),
  oldCommentContainer = document.createElement('div'),
  commentsSectionHeader = document.createElement('h2');

// Data ===============================================
let comments = [];

axios.get(apiURL)
  .then((response) => response.data)
  .then((data) => {
    console.log('Comments: ', data);
    data.forEach(function (data) {
      comments.push(data);
      generateOldComments();
    });
  });

// Functions ===========================================

// create header for comments section and add appropriate class and append header to the comments container
function addCommentsHeader() {
  commentsSectionHeader.innerHTML = 'Join the Conversation';
  commentsSectionHeader.classList.add('comments__heading');
  commentsContainer.appendChild(commentsSectionHeader);
}


// create the form to add a new comment 
function addNewComment() {
  // add comment container
  newCommentSection.classList.add('comments__form-container');
  commentsContainer.appendChild(newCommentSection);

  // add comment image
  let newCommentImage = document.createElement('img');
  newCommentImage.classList.add('comments__comment-img');
  newCommentImage.setAttribute('src', './assets/images/grey-circle.png');
  addToCommentsContainer(newCommentImage);

  // add form container 
  formContainer.classList.add('comments__form');
  addToCommentsContainer(formContainer);

  // create form labels 
  createFormLabel('name', 'Name');

  // create name input 
  let nameInput = document.createElement('input');
  nameInput.classList.add('comments__name-input')
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('placeholder', 'Your Name');
  formContainer.appendChild(nameInput);

  // create comment input 
  let commentInput = document.createElement('textarea');
  commentInput.classList.add('comments__comment-input')
  commentInput.setAttribute('name', 'comment');
  commentInput.setAttribute('cols', '25');
  commentInput.setAttribute('rows', '5');
  commentInput.setAttribute('placeholder', 'Add a new comment');
  formContainer.appendChild(commentInput);

  // add comment button 
  let commentBtn = document.createElement('button');
  commentBtn.classList.add('comments__btn');
  commentBtn.innerHTML = 'Comment';
  commentBtn.setAttribute('type', 'submit');
  formContainer.appendChild(commentBtn);
}


// bring in the older comments 
function generateOldComments() {
  // create old comment container
  oldCommentContainer.classList.add('comments__user-comments');
  commentsContainer.appendChild(oldCommentContainer);

  // add user comment 
  addUserComment(comments);
}


// add previous user comments from array
function addUserComment() {
  // clear everything that is currently inside of the oldCommentContainer to make room for the new array of comments with the updated new comments 
  oldCommentContainer.innerHTML = '';

  // ensure the comments array that was modified with the new comment is in date order 
  let sortedArray = comments.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // loop through the date sorted array and assign variables to the different parts of the object 
  for (let i = 0; i < sortedArray.length; i++) {
    let innerTextName = sortedArray[i].name;
    let innerTextDate = new Date(sortedArray[i].timestamp).toLocaleDateString();
    let innerTextComment = sortedArray[i].comment;
    let imgNumber = i;
    let userNum = sortedArray[i].userNum;

    // create the user comment container and add the appropriate container and append the container to the oldCommentContainer
    let userCommentContainer = document.createElement('div');
    userCommentContainer.classList.add('comments__user-comment');
    oldCommentContainer.appendChild(userCommentContainer);

    // user comment image 
    let userCommentImg = document.createElement('img');
    userCommentImg.classList.add('comments__user-img');
    userCommentContainer.appendChild(userCommentImg);
    userCommentImg.setAttribute('src', './assets/images/user-' + imgNumber + '.jpg');
    userCommentImg.setAttribute('alt', 'User ' + userNum + 'Photo');

    // create comment body 
    let userCommentBody = document.createElement('div');
    userCommentBody.classList.add('comments__comment-body');
    userCommentContainer.appendChild(userCommentBody);

    // create comment body heading 
    let userCommentBodyHeading = document.createElement('div');
    userCommentBodyHeading.classList.add('comments__body-heading');
    userCommentBody.appendChild(userCommentBodyHeading);

    // create comment body heading name
    let userCommentBodyHeadingName = document.createElement('h5');
    userCommentBodyHeadingName.classList.add('comments__body-heading-name');
    userCommentBodyHeadingName.innerHTML = innerTextName;
    userCommentBodyHeading.appendChild(userCommentBodyHeadingName);

    // create comment body heading date 
    let userCommentBodyHeadingDate = document.createElement('h5');
    userCommentBodyHeadingDate.classList.add('comments__body-heading-date');
    userCommentBodyHeadingDate.innerHTML = innerTextDate;
    userCommentBodyHeading.appendChild(userCommentBodyHeadingDate);

    // create comment 
    let userComment = document.createElement('div');
    userComment.classList.add('comments__body-content');
    userComment.innerHTML = innerTextComment;
    userCommentBody.appendChild(userComment);
  }
}

// helper function to add anything to the form-container
function addToCommentsContainer(element) {
  newCommentSection.appendChild(element);
}


// create and add labels to the form
function createFormLabel(labelName, text) {
  let formLabel = document.createElement('label');
  formLabel.classList.add('comments__label');
  formLabel.setAttribute('src', labelName);
  formLabel.innerHTML = text;
  formContainer.appendChild(formLabel);
}


// function calls
addCommentsHeader();
addNewComment();
generateOldComments();


// input variables for event listener
let newCommentInputName = document.querySelector('.comments__name-input');
let newCommentInputComment = document.querySelector('.comments__comment-input');


// form submit event listener
formContainer.addEventListener('submit', (submit) => {
  submit.preventDefault();

  // create a new comment object to be put into the current comments array 
  let commentObject = {
    name: newCommentInputName.value,
    timestamp: Date.now(),
    comment: newCommentInputComment.value,
    imgNumber: '4',
    userNumber: '4'
  }

  console.log(commentObject);

  // use unshift to get the new comment object into the array. This inserts it in the beginning 
  comments.unshift(commentObject);
  addUserComment(comments);

  //make sure the text fields are clear for a new user input
  newCommentInputName.value = '';
  newCommentInputComment.value = '';
});