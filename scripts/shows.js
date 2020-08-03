// Variables =========================================
let tableContainer = document.querySelector('.shows-table');
let labelContainer = document.createElement('div');
let showWrapper = document.createElement('div');


// Data ===============================================
// show table headings that will be applied on the desktop and tablet views 
let showTableLabels = ['dates', 'venue', 'location'];
//link to the fake API
let showsApiUrl = 'https://project-1-api.herokuapp.com/showdates/?api_key=4ce60e6a-0fd6-4074-be37-c42c5bb6de4b';


// empty array to store show data
let shows = [];

// use axios to go get the show data
axios.get(showsApiUrl)
  .then((response) => response.data)
  .then((data) => {
    console.log('Shows: ', data);
    addShowRow(data);
  });

// Functions ===========================================

// create header for shows container
// add shows inner html and header class 
// append the header to the shows table container
function addShowTableHeader() {
  let tableHeaderDT = document.createElement('h2');
  tableHeaderDT.innerHTML = 'Shows';
  tableHeaderDT.classList.add('shows-table__header');
  tableContainer.appendChild(tableHeaderDT);
}


// create container for show / venue / location 
// append container (that only shows on tablet and dt) to the wrapper for the entire show container 
function createLabelContainer() {
  labelContainer.classList.add('shows-table__labels-dt-container');
  showWrapper.appendChild(labelContainer);
}


// loop through the showTableLabels array to dynamically insert the headings when site is at desktop or table or above 
// add inner html from current iteration in the loop
// add appropriate classes and append labels to the label container 
function addShowTableLabel() {
  for (let i = 0; i < showTableLabels.length; i++) {
    let tableLabel = document.createElement('h5');
    tableLabel.innerHTML = showTableLabels[i];
    tableLabel.classList.add('shows-table__label-dt');
    labelContainer.appendChild(tableLabel);
  }
}


// add a fake button in the labels row to ensure spacing is the same as tickets row 
// add appropriate class to ensure the button is visibility hidden to make sure it takes up the correct spacing 
// append button to the label container 
function addFakeBtn() {
  let fakeBtn = document.createElement('button');
  fakeBtn.innerHTML = 'Buy Tickets';
  fakeBtn.classList.add('shows-table__buy-btn', 'shows-table__buy-btn-dt');
  labelContainer.appendChild(fakeBtn);
}



// main function to add a row with date, venue, location and buy tickets information 
function addShowRow(array) {
  //create show container wrapper and append it to the table container
  showWrapper.classList.add('shows-table__ticket-wrapper');
  tableContainer.appendChild(showWrapper);
  console.log(array);

  // loop through the passed in array, in this case, the shows array with objects 
  // assign the date, venue and location using array[i].date/venue/location
  for (let i = 0; i < array.length; i++) {
    let date = array[i].date;
    let venue = array[i].place;
    let location = array[i].location;

    console.log(array);

    // creates a new row add add class list
    let showRow = document.createElement('div');
    showRow.classList.add('shows-table__ticket-container');

    // create date label, add class and inner html
    let dateLabel = document.createElement('h5');
    dateLabel.classList.add('shows-table__label');
    dateLabel.innerHTML = 'Date';
    showRow.appendChild(dateLabel);

    // creates the date element to be added to the show row
    let dateElm = document.createElement('h5');
    dateElm.classList.add('shows-table__date');
    dateElm.innerHTML = date;
    showRow.appendChild(dateElm);

    // create venue label, add class and inner html 
    let venueLabel = document.createElement('h5');
    venueLabel.classList.add('shows-table__label');
    venueLabel.innerHTML = 'Venue';
    showRow.appendChild(venueLabel);

    // create venue element to be added to the show row
    let venueElm = document.createElement('h5');
    venueElm.classList.add('shows-table__venue');
    venueElm.innerHTML = venue;
    showRow.appendChild(venueElm);

    // create location label, add class and inner html
    let locationLabel = document.createElement('h5');
    locationLabel.classList.add('shows-table__label');
    locationLabel.innerHTML = 'Location';
    showRow.appendChild(locationLabel);

    // create location element to be added to the show row
    let locationElm = document.createElement('h5');
    locationElm.classList.add('shows-table__location');
    locationElm.innerHTML = location;
    showRow.appendChild(locationElm);

    // creat purchase btn for each row
    let btn = document.createElement('button');
    btn.innerHTML = 'Buy Tickets';
    btn.classList.add('shows-table__buy-btn');
    showRow.appendChild(btn);

    // add the created row to the entire wrapper 
    showWrapper.appendChild(showRow);
  }
}


addShowTableHeader();
createLabelContainer();
addShowTableLabel();
addFakeBtn();