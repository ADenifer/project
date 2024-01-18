
// Get a reference to the login form and submit button
// const loginForm = document.getElementById('loginForm');
// const submitButton = document.getElementById('submitButton');

// // Add a submit event listener to the form
// loginForm.addEventListener('submit', function (e) {
//     // Prevent the default form submission behavior
//     e.preventDefault();

//     // Redirect to the next page when the form is submitted
//     window.location.href = 'FruitHomePage.html';
// });


// function validate() {

//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     if (username == "Admin" && password == "123") {
//         //  alert("Succesfully logined");
//         //window.location.assign('C:/Users/denif/3D Objects/PumoTech/3.FruitShop_WithJS/FruitHomePage.html');
//         //window.location.href = "C:/Users/denif/3D Objects/PumoTech/3.FruitShop_WithJS/FruitHomePage.html";
//         var filePath = "/FruitHomePage.html";
//         window.location.href = filePath;
//     }
//     else {
//         alert("Login Failed");

//     }
// }

// document.getElementById("username").focus();
function validate() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // if (username === "Admin" && password === "123") {
    //     // Set the username in localStorage
    //     localStorage.setItem('loggedInUsername', username);

    //     // // Redirect to the redirected page
    //     // window.location.href = 'FruitHomePage.html'; 
    //     // return true;
    // } else {
    //     alert("Login Failed Please try again!");

    //     setTimeout(function () {
    //         document.getElementById("username").value = "";
    //         document.getElementById("password").value = "";
    //         document.getElementById("username").focus();

    //     });
    //     return false;

    // }
    if (!username || !password) {
         alert("Please provide both username and password.");
        return false; // Prevent form submission
    }
    localStorage.setItem('loggedInUsername', username);
    return true; // Allow form submission
    // Set the username in localStorage
    

}
