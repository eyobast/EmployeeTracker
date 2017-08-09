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
var employeeName="";
var role="";
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

});
//to get the data from our database
database.ref().on("value", function(snapshot) {

//clearing the table before append the new input
$("tbody").empty();

//"for every employee..."
for (var employee in snapshot.val()) {

  //new Date()-monthsWorkedTd;
  
//dynamically creating td for each employee and assign it to a value
  var employeeNameTd = $("<td class='employeeName'>").text(snapshot.val()[employee].employeeName);
  var roleTd=$("<td class='role'>").text(snapshot.val()[employee].role);
  var startDateTd=$("<td class='startDate'>").text(snapshot.val()[employee].startDate);
  var monthlyRateTd=$("<td class='monthlyRate'>").text(snapshot.val()[employee].monthlyRate);
  
//calculating the month
  var month = (new Date() - new Date(snapshot.val()[employee].startDate)) / (1000 * 60 * 60 * 24 * 30);
  //toString to change the text value to string
  var monthsWorkedTd=$("<td class='monthsWorked'>").text(month.toFixed(2).toString());

//calculating the total bill
  var total=(month*snapshot.val()[employee].monthlyRate);
  //toFixed(2) to round it to decimal number 
  var totalBilledTd=$("<td class='totalBilled'>").text(total.toFixed(2));

//append all tds to a new tr
  var employeeRow = $("<tr>")
    .append(employeeNameTd)
    .append(roleTd)
    .append(startDateTd)
    .append(monthsWorkedTd)
    .append(monthlyRateTd)
    .append(totalBilledTd);

//append the dynamically created tr to tbody
  $("tbody").append(employeeRow);

} // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});