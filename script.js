
const authForm = document.getElementById("authForm");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const switchButton = document.getElementById("switchButton");

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const submitBtn = document.getElementById("submitBtn");
const switchText = document.getElementById("switchText");
const statusMessage = document.getElementById("statusMessage");

const nameField = document.getElementById("nameField");
const confirmField = document.getElementById("confirmField");
const loginOptions = document.getElementById("loginOptions");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

let isRegister = false;


function setMode(registerMode) {
  isRegister = registerMode;

  loginTab.classList.toggle("active", !isRegister);
  registerTab.classList.toggle("active", isRegister);

  nameField.hidden = !isRegister;
  confirmField.hidden = !isRegister;
  loginOptions.hidden = isRegister;

  formTitle.textContent = isRegister
    ? "Create your account"
    : "Welcome back!";

  formSubtitle.textContent = isRegister
    ? "Fill in your details to get started."
    : "Sign in to continue to your account.";

  submitBtn.textContent = isRegister
    ? "Create Account"
    : "Sign In";

  switchText.firstChild.textContent = isRegister
    ? "Already have an account? "
    : "Don't have an account? ";

  switchButton.textContent = isRegister
    ? "Login"
    : "Create one";

  password.autocomplete = isRegister
    ? "new-password"
    : "current-password";

  statusMessage.textContent = "";
  statusMessage.className = "status";

  clearErrors();
}

loginTab.addEventListener("click", () => setMode(false));
registerTab.addEventListener("click", () => setMode(true));

switchButton.addEventListener("click", () => {
  setMode(!isRegister);
});


function validateField(input, errorId, message) {
  const error = document.getElementById(errorId);

  input.classList.remove("invalid", "valid");
  input.removeAttribute("aria-invalid");

  if (message) {
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
    error.textContent = message;
    return false;
  }

  error.textContent = "";

  if (input.value.trim()) {
    input.classList.add("valid");
  }

  return true;
}

function validateName() {
  if (!fullName.value.trim()) {
    return validateField(
      fullName, "nameError", "Please enter your full name."
    );
  }

  return validateField(fullName, "nameError", "");
}

function validateEmail() {
  const value = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    return validateField(
      email, "emailError", "Email is required."
    );
  }

  if (!emailPattern.test(value)) {
    return validateField(
      email, "emailError", "Enter a valid email address."
    );
  }

  return validateField(email, "emailError", "");
}

function validatePassword() {
  if (password.value.length < 8) {
    return validateField(
      password,
      "passwordError",
      "Password must contain at least 8 characters."
    );
  }

  return validateField(password, "passwordError", "");
}

function validateConfirmPassword() {
  if (!confirmPassword.value) {
    return validateField(
      confirmPassword,
      "confirmError",
      "Please confirm your password."
    );
  }

  if (confirmPassword.value !== password.value) {
    return validateField(
      confirmPassword,
      "confirmError",
      "Passwords do not match."
    );
  }

  return validateField(confirmPassword, "confirmError", "");
}


fullName.addEventListener("input", () => {
  if (isRegister) validateName();
});

email.addEventListener("input", validateEmail);

password.addEventListener("input", () => {
  validatePassword();

  if (isRegister && confirmPassword.value) {
    validateConfirmPassword();
  }
});

confirmPassword.addEventListener(
  "input", validateConfirmPassword
);

// Show or hide passwords
document.querySelectorAll(".eye").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target);
    const showing = input.type === "password";

    input.type = showing ? "text" : "password";
    button.textContent = showing ? "Hide" : "Show";
    button.setAttribute("aria-pressed", String(showing));
    button.setAttribute(
      "aria-label",
      `${showing ? "Hide" : "Show"} ${
        button.dataset.target === "password"
          ? "password"
          : "confirm password"
      }`
    );
  });
});

function clearErrors() {
  document.querySelectorAll(".error").forEach((error) => {
    error.textContent = "";
  });

  document.querySelectorAll(".field input").forEach((input) => {
    input.classList.remove("invalid", "valid");
    input.removeAttribute("aria-invalid");
  });
}

authForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValid = !isRegister || validateName();
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  const confirmValid =
    !isRegister || validateConfirmPassword();

  if (!nameValid || !emailValid ||
      !passwordValid || !confirmValid) {
    statusMessage.textContent =
      "Please correct the errors above.";
    statusMessage.className = "status failure";

    const firstInvalid = authForm.querySelector(".invalid");
    if (firstInvalid) firstInvalid.focus();

    return;
  }

  statusMessage.className = "status success";

  if (isRegister) {
    statusMessage.textContent =
      "Registration form validated successfully! Demo only.";
  } else {
    statusMessage.textContent =
      "Login form validated successfully! Demo only.";
  }
});


setMode(false);
