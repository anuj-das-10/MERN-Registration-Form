const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

const confirm_togglePassword = document.querySelector("#togglePassword-confirm");
const confirm_password = document.querySelector("#confirm__password");
  

// THIS IS FOR PASSWORD FIELD------------------------------------------------------->
togglePassword.addEventListener("click", function () {
// Toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);    
// Toggle the icon
    this.classList.toggle("bi-eye");
});


// THIS IS FOR CONFIRM PASSWORD FIELD----------------------------------------------->
confirm_togglePassword.addEventListener("click", function () {
// Toggle the type attribute
    const type = confirm_password.getAttribute("type") === "password" ? "text" : "password";
    confirm_password.setAttribute("type", type);
// Toggle the icon
    this.classList.toggle("bi-eye");
});
