let students;
if (localStorage.getItem("studentsDATA") == null) {
  students = [];
} else {
  students = JSON.parse(localStorage.getItem("studentsDATA"));
  display(students);
}

document
  .getElementById("my_captcha_form")
  .addEventListener("submit", function (evt) {
    var response = grecaptcha.getResponse();

    console.log(response);
    if (response.length == 0) {
      //reCaptcha not verified

      alert("please verify you are humann!");
      evt.preventDefault();
      return false;
    }
    //captcha verified
  });

let form = document.forms[0];

// Username
let nameDiv = document.querySelector(".name");
let userName = document.getElementById("username");
let nameWarn = document.querySelector(".name .warning");

// birthday
let birthdayDiv = document.querySelector(".birthday");
let birthday = document.getElementById("birthday");
let birthdayWarn = document.querySelector(".birthday .warning");

// phonenumber
let phonenumberDiv = document.querySelector(".phonenumber");
let phonenumber = document.getElementById("phonenumber");
let phonenumberWarn = document.querySelector(".phonenumber .warning");

// studentname
let studentDiv = document.querySelector(".student");
let studentName = document.getElementById("studentname");
let studentWarn = document.querySelector(".student .warning");

let labels = document.getElementsByTagName("label");
let submitBtn = document.querySelector("[type='submit']");

// studentProgram
let studentProgram = "all";

let allInputs = [userName, studentName];

form.onsubmit = (event) => {
  let userValid = false;
  let studentValid = false;
  let phonenumberValid = false;
  let response = grecaptcha.getResponse();

  let userString = "" + userName.value;
  let regUser = /^[A-Z][a-z]+_[0-9]+$/;
  if (
    userName.value !== "" &&
    !userName.value.includes("/") &&
    !userName.value.includes(".") &&
    regUser.test(userName.value) == true
  ) {
    userValid = true;
  }

  let studentString = "" + studentName.value;
  let regStudent = /^[\u0600-\u06FF_ ]+$/;
  if (
    studentName.value !== "" &&
    !studentName.value.includes("/") &&
    !studentName.value.includes(".") &&
    regStudent.test(studentName.value) == true
  ) {
    studentValid = true;
  }

  // validate phone
  let phoneString = "" + phonenumber.value;
  if (
    phonenumber.value !== "" &&
    phonenumber.value.length == 7 &&
    phoneString.startsWith("+963")
  ) {
    phonenumberValid = true;
  }

  // validate all form
  if (
    userValid === false ||
    studentValid === false ||
    phonenumberValid === false
  ) {
    event.preventDefault();
  }
  if (
    userValid === true &&
    studentValid === true &&
    phonenumberValid === true &&
    response.length != 0
  ) {
    addStudent();
  }

  // Warnings if no validation
  if (userValid === false) {
    nameWarn.classList.add("showen");
  } else {
    nameWarn.classList.remove("showen");
  }
  if (studentValid === false) {
    studentWarn.classList.add("showen");
  } else {
    studentWarn.classList.remove("showen");
  }
  if (phonenumberValid == false) {
    phonenumberWarn.classList.add("showen");
  } else {
    phonenumberWarn.classList.remove("showen");
  }
};

// function to capatcha
(function () {
  var w = window,
    C = "___grecaptcha_cfg",
    cfg = (w[C] = w[C] || {}),
    N = "grecaptcha";
  var gr = (w[N] = w[N] || {});
  gr.ready =
    gr.ready ||
    function (f) {
      (cfg["fns"] = cfg["fns"] || []).push(f);
    };
  w["__recaptcha_api"] = "https://www.google.com/recaptcha/api2/";
  (cfg["render"] = cfg["render"] || []).push("onload");
  w["__google_recaptcha_client"] = true;
  var d = document,
    po = d.createElement("script");
  po.type = "text/javascript";
  po.async = true;
  po.src =
    "https://www.gstatic.com/recaptcha/releases/4rwLQsl5N_ccppoTAwwwMrEN/recaptcha__en.js";
  po.crossOrigin = "anonymous";
  po.integrity =
    "sha384-o1nfdUm9cV7Sx6HxXDsnady1EGmCBTwza/JTA6OSowyOK+wq0YF0+F9jejHVacaR";
  var e = d.querySelector("script[nonce]"),
    n = e && (e["nonce"] || e.getAttribute("nonce"));
  if (n) {
    po.setAttribute("nonce", n);
  }
  var s = d.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(po, s);
})();

// get parameter
getParameters = () => {
  // Address of the current window
  address = window.location.search;

  // Returns a URLSearchParams object instance
  parameterList = new URLSearchParams(address);

  // Created a map which holds key value pairs
  let map = new Map();

  // Storing every key value pair in the map
  parameterList.forEach((value, key) => {
    map.set(key, value);
  });

  // Returning the map of GET parameters
  return map;
};
// Gets all the getParameters
console.log(getParameters());
let map = getParameters();

let username = map.get("username");
let user = document.getElementById("username");
user.innerHTML = username;
console.log(username);

let studentname = map.get("studentname");
let student = document.getElementById("studentname");
student.innerHTML = studentname;

let birthday1 = map.get("birthday");
let birthday1Text = document.getElementById("birthday");
birthday1Text.innerHTML = birthday;

let phonenumber1 = map.get("phonenumber");
let phonenumber1Text = document.getElementById("phonenumber");
phonenumber1Text.innerHTML = phonenumber;

// filter with type program(tic , bit)

function filterObjects(event) {
  const programType = event.target.value;
  let filteredData;

  if (programType === "All") {
    filteredData = JSON.parse(localStorage.getItem("studentsDATA"));
  } else {
    filteredData = students.filter(
      (item) => item.studentProgram === programType
    );
  }
  display(filteredData);
}

function addClass(element, name) {
  var i, arr1, arr2;

  arr1 = element.className.split(" ");

  arr2 = name.split(" ");

  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// remove class
function removeClass(element, name) {
  var i, arr1, arr2;

  arr1 = element.className.split(" ");

  arr2 = name.split(" ");

  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }

  element.className = arr1.join(" ");
}

// sort
function addStudent() {
  let student = {
    id: userName.value.split("_")[1],
    userName: userName.value,
    studentName: studentName.value,
    phonenumber: phonenumber.value,
    userName: userName.value,
    studentProgram: studentProgram,
  };
  students.push(student);
  localStorage.setItem("studentsDATA", JSON.stringify(students));
  display(students);
}

function display(arr) {
  var temp = ``;
  for (var i = 0; i < arr.length; i++) {
    temp += `   
        
        <tr>
        <td>${arr[i].studentProgram}</td>
        <td>${arr[i].phonenumber}</td>
        <td>${arr[i].studentName}</td>
        <td>${arr[i].userName}</td>
        <th scope="row">${arr[i].id}</th>
      </tr>
      `;
  }
  document.getElementById("tbody").innerHTML = temp;
}

function changeProgram(event) {
  studentProgram = event.target.value;
}

function orderBy(term) {
  let SortedArr;
  if (term === "programName") {
    SortedArr = students.sort((a, b) => {
      let astudentProgram = a.studentProgram.toLowerCase();
      let bstudentProgram = b.studentProgram.toLowerCase();
      if (astudentProgram < bstudentProgram) return -1;
      if (astudentProgram > bstudentProgram) return 1;
      return 0;
    });
  } else if (term === "studentId") {
    SortedArr = students.sort((a, b) => {
      return a.id - b.id;
    });
  } else {
    SortedArr = students.sort((a, b) => {
      let aStudentName = a.StudentName.toLowerCase();
      let bStudentName = b.StudentName.toLowerCase();

      if (aStudentName < bStudentName) {
        return -1;
      }
      if (aStudentName > bStudentName) {
        return 1;
      }
      return 0;
    });
  }

  display(SortedArr);
}

// convert
function convertToJson() {
  studentsData;
  document.getElementById("studentsData").innerHTML = JSON.stringify(students);
}
