function forgetPassord1() {

const otpPopup = document.getElementById("otpPopup");
const otpInputs = document.querySelectorAll(".otp-input");
const countdownElement = document.getElementById("countdown");
let staticOTP = "123456"; // Static OTP
let countdownTimer;

function openOTPPopup(event) {
  event.preventDefault();
  otpPopup.style.display = "flex"; // Open popup

  setTimeout(() => {
    alert(`Your OTP is: ${staticOTP}`); // Show OTP alert after delay
    startCountdown();
  }, 500);
}

function closeOTPPopup() {
  otpPopup.style.display = "none";
  resetOTPInputs();
  clearInterval(countdownTimer);
}

function verifyOTP() {
  let enteredOTP = "";
  otpInputs.forEach((input) => (enteredOTP += input.value));

  if (enteredOTP === staticOTP) {
    alert("OTP Verified Successfully!");
    closeOTPPopup();
  } else {
    alert("Invalid OTP! Please try again.");
  }
}

function resendOTP(event) {
  event.preventDefault();
  alert(`Your OTP is: ${staticOTP}`);
  startCountdown();
}

function startCountdown() {
  let timeLeft = 90; // 1 minute 30 seconds
  clearInterval(countdownTimer);

  countdownTimer = setInterval(function () {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    countdownElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      countdownElement.textContent = "00:00";
    } else {
      timeLeft--;
    }
  }, 1000);
}

function resetOTPInputs() {
  otpInputs.forEach((input) => (input.value = ""));
}

// OTP Input Navigation
otpInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    if (e.inputType !== "deleteContentBackward" && input.value !== "") {
      if (index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      otpInputs[index - 1].focus();
    }
  });
});
}