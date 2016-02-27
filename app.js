$(document).ready(function(){

  console.log("the javascript is working");



  //store information from form in an object

  //clear form

  //append all the information gathered to the document

  //also calculate the total combined salary of everyone

  $('#employeeForm').on('submit', function(event){   //when you click the submit button we will...

    //remove the default html behavior from the submit button
    event.preventDefault();

    //create an empty object to hold employee values
    var employeeValues = {};

    //fill up that empty object with the form information
    $.each($('#employeeForm').serializeArray(), function(i, field){
      employeeValues[field.name] = field.value;
    });

    //clear out the form information on the webpage now that its been saved
    $('#employeeForm').find('input[type=text]').val('');
    // console.log(empValues);

    //push the new object that was created with the form information into an empty array for holding all the employees
    employeeArray.push(employeeValues);
    // console.log(empArray);

    //append a ul with class=employee to the results-div
    $('.results-div').append('<ul class="employee"></ul>');

    //this is a pre-fix variable that will tell later information to get added to the end
    var $lastUl = $(".results-div").children().last();

    //these are elements to be appended to the ul
    $lastUl.append('<h2>' + employeeValues.firstName + " " + employeeValues.lastName + '</h2>');
    $lastUl.append('<li>' + employeeValues.employeeID + '</li>');
    $lastUl.append('<li>' + employeeValues.jobTitle + '</li>');
    $lastUl.append('<li>' + employeeValues.salary + '</li>');

    //this also appends a button for deleting employees
    $lastUl.append('<button class="delete" data-idNum="' + employeeValues.employeeID + '">ur fired</button>');
    //this runs the aggregate salary calculator on the array of all the employees
    aggregateSalaryCalculator(employeeArray);

    //this console logs the current employee array
    console.log("a new employee was created, here is the current employee array:" , employeeArray);
  });

  //this tells the delete button to run the function that deletes the employee from the list on the right
  $('.results-div').on('click', '.delete', deleteEmployee);



});


var employeeArray = [];


//this is the function that calculates the aggragate empoyee salary
function aggregateSalaryCalculator(arrayOfEmployees) {
  var totalSalary = 0
  for (var i = 0; i < arrayOfEmployees.length; i++) {
    //this adds the most recent salary onto the total salary counter
    totalSalary += parseInt(arrayOfEmployees[i].salary);

  }
  //this updates the total salary counter on the DOM to include the current aggregate salary
  $('.aggregate-salary').html('<h1>' + "aggregate employee salaries:" + totalSalary + '</h1>');
}


function deleteEmployee() {

  //this console logs the id number of the employee being deleted
  console.log("the id number of the employee/button being deleted", $(this).data('idnum'));

  //this is supposed to go through the array of employee objects and find the
  //one that had its delete button pressed and then delete that employee
  //from the array of employees
  for (var k = 0; k < employeeArray.length; k++) {
    if (employeeArray[k].employeeID == $(this).data('idnum')) {
      employeeArray.splice(k, 1);
    };
  };


  //this removes the delete button and the employee div that contains it
  $(this).parent().remove();

  //this recalculates the aggregate employ salary
  aggregateSalaryCalculator(employeeArray);


  //this console logs the current employee array
  console.log("an employee was deleted, here is the current employee array:" , employeeArray);
}
