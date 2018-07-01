// Initialize Firebase
var config = {
  apiKey: "AIzaSyAMmFl350TycekG4Qe_OljWzodpkODRAcw",
  authDomain: "reservation-site-a43e1.firebaseapp.com",
  databaseURL: "https://reservation-site-a43e1.firebaseio.com",
  projectId: "reservation-site-a43e1",
  storageBucket: "reservation-site-a43e1.appspot.com",
  messagingSenderId: "930373170195"
};

firebase.initializeApp(config);

// Connect to Database
var database = firebase.database();

// Initialize reservationData object
var reservationData = {};


// Enables user to select each day
$('.reservation-day li').each(function(e) {
    $(this).on('click', function(e){
      
      // Get day of user selection and store it in reservationData object
      reservationData.day = $(this).text();

      // Make text in drop down the selected
      $('.dropdown-toggle').text(reservationData.day);

   });
});


// Enables user to add name and submit to database
$('.reservations').on('submit', function(e) {
  e.preventDefault();

  // Get name of user selection and store it in reservationData object
  reservationData.name = $('.reservation-name').val();
  
  database.ref('reservations').push(reservationData);

});


// Add user input to the database and update reservations list
database.ref('reservations').on('child_added', function(snapshot) {

  // Receive snapshot, a reference of data at a single point in time.
  var newReservation = snapshot.val();

  //Compile data to the reservation listing
  var source = $('#reservation-template').html();

  var template = Handlebars.compile(source);

  var newReservationHTML = template(newReservation);

  $('.reservation-list').append(newReservationHTML);

});


// Get Google map of location
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10,
    scrollwheel: false
  });

//Step 9:

  var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: "Tom's Restaurant"
  });
}