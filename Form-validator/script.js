const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const useMinLength = +document.getElementById('username').getAttribute("min");
const useMaxLength = +document.getElementById('username').getAttribute("max");
const pwdMinLength = +document.getElementById('password').getAttribute("min");
const pwdMaxLength = +document.getElementById('password').getAttribute("max");
let eye = document.getElementById("eye");
let eye2 = document.getElementById("eye2");


//error message
function showError(input, message) {

    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
//success outline
function showSuccess(input) {

    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input) {
    if (input.value.trim() !== "") {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(input.value.trim())) {
            showSuccess(input);
        } else {
            showError(input, "Email is not valid");
        }
    }
}

// check required fields

function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() == "") {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input);
        }
    });
}

// check input length
function checkLength(input, min, max) {

    if (input.value.trim() !== "") {
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} has atleast ${min} characters`)
        } else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max} characters`)
        } else {
            showSuccess(input);
        }

    }

}

// check password match

function checkPasswordMatch(input1, input2) {

    if (input1.value !== input2.value) {
        showError(input2, "password doesnot match")
    }


}

function validatePassword(password) {
    // var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    // if (regex.test(password.value.trim())) {
    //     showSuccess(password);
    // } else {
    //     showError(password, "Password must be at least a symbol, upper and lower case letters and a number");
    // }
    if (password.value.trim() != "" && password.value.length >= pwdMinLength && password.value.length <= pwdMaxLength) {
        let regEx = /^(?=.*[0-9])+(?=.*[A-Z])+(?=.*[@#$%^&*])+(.{6,10})$/
        if (regEx.test(password.value.trim())) {

            showSuccess(password);

        } else {
            showError(password, "Atleast 1 number,1 spl char,1 uppercase");
        }
    }
}


// get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//event listener

form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, useMinLength, useMaxLength);
    checkLength(password, pwdMinLength, pwdMaxLength);
    checkEmail(email);
    checkPasswordMatch(password, password2);
    validatePassword(password);


})

eye.addEventListener("click", () => {
    eye.classList.toggle("active");
    password.type == "password" ?
        (password.type = "text") :
        (password.type = "password");

});

eye2.addEventListener("click", () => {
    eye2.classList.toggle("active");

    password2.type == "password" ?
        (password2.type = "text") :
        (password2.type = "password");
});