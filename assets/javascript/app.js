// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBZH5fYajN9jIVy-XPfckeKpI6z2ml1n4A",
    authDomain: "employee-tracker-1bbaf.firebaseapp.com",
    databaseURL: "https://employee-tracker-1bbaf.firebaseio.com",
    projectId: "employee-tracker-1bbaf",
    storageBucket: "employee-tracker-1bbaf.appspot.com",
    messagingSenderId: "914407505844"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
var employeeName=0;
var role=0;
var startDate=0;
var monthlyRate=0;

 $("#submitButton").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

employeeName = $("#employeeName").val().trim();
role = $("#role").val().trim();
startDate = $("#date").val().trim();
monthlyRate = $("#month").val().trim();

database.ref().push({
        employeeName: employeeName,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
      });

var display;
display=$("#display");
$("#employee-display").append(display);
$("#role-display").append(display);
$("#startDate-display").append(display);
$("#monthWorked-display").append(display);
});

database.ref().on("value", function(snapshot) {

      // Log everything that's coming out of snapshot
    
      console.log(snapshot.val().employeeName);
      console.log(snapshot.val().role);
      console.log(snapshot.val().startDate);
      console.log(snapshot.val().monthlyRate);

      // Change the HTML to reflect
      $("#employee-display").html(snapshot.val().employeeName);
      $("#role-display").html(snapshot.val().role);
      $("#startDate-displayy").html(snapshot.val().startDate);
      $("#monthWorked-display").html(snapshot.val().monthlyRate);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });