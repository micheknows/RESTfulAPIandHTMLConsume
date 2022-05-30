var attempts = 0;
var lower = 1;
var upper = 10;
var guess = 0;
var sn = 0;
var fb = "";

function createAttemptLabel() {
    document.getElementById("attemptLabel").innerHTML = "Attempts:  " + attempts.toString();
}

function createGuessLabel() {
    document.getElementById("lowerLimit").value = lower.toString();
    document.getElementById("upperLimit").value = upper.toString();
    document.getElementById("guessLabel").innerHTML =  "Please guess a number between " + lower.toString() + " and " + upper.toString() + ".";
}

function validateLimits() {
    if ((Number.isInteger(parseInt(document.getElementById("lowerLimit").value))) && (Number.isInteger(parseInt(document.getElementById("upperLimit").value)))) {
        lower = parseInt(document.getElementById("lowerLimit").value);
        upper = parseInt(document.getElementById("upperLimit").value);
        if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
        }
    } else {
        lower = 1;
        upper = 10;
    }
}

function readyPlay() {

    document.getElementById("playBtn").disabled = false;
}

function stopPlay() {
    document.getElementById("playBtn").disabled = true;
}

function validateGuess() {
    if (Number.isInteger(parseInt(document.getElementById("makeGuess").value))) 
    {
        return true;
    } else {
        return false;
    }
}

function clearGuess() {
    document.getElementById("makeGuess").value = "";
}

function createFeedbackLabel() {
    document.getElementById("feedbackArea").innerHTML = "You entered " + guess.toString() + ".  That number is " + fb + ".\n" + document.getElementById("feedbackArea").innerHTML;
    if (fb == "correct") {
        endGame();
    }
}

function clearFeedback() {
    document.getElementById("feedbackArea").innerHTML = "";
}

function setFocus(ele) {
    ele.focus();
}

function getSecretNumber() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200)
            return xhttp.responseText;
    }
    var base = "http://localhost:55475/Service1.svc/";
    var api_url = base + "SecretNumber?x=" + lower.toString() + "&y=" + upper.toString();
    xhttp.open("GET", api_url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function getStoredNumber() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200)
            sn = xhttp.responseText;
    }
    var base = "http://localhost:55475/Service1.svc/";
    var api_url = base + "GetNumber";
    xhttp.open("GET", api_url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function generateNumber() {
    attempts = 0;
    createAttemptLabel();

    validateLimits();
    createGuessLabel();

    getSecretNumber();
    getStoredNumber();

    readyPlay();
    setFocus(document.getElementById("makeGuess"));
}

function resetLimits() {
    document.getElementById("upperLimit").value = "";
    document.getElementById("lowerLimit").value = "";
    document.getElementById("guessLabel").innerHTML = "";
}

function endGame() {
    alert("CONGRATULATIONS!!!! You guessed the correct number in " + attempts.toString() + " guesses!  Click OK to try again.");
    stopPlay();
    attempts = 0;
    resetLimits();
    clearGuess();
    createAttemptLabel();
    clearFeedback();
    setFocus(document.getElementById("lowerLimit"));
}

function checkNumber() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            fb = xhttp.responseText.slice(1, -1);
            clearGuess();
            setFocus(document.getElementById("makeGuess"));
            createFeedbackLabel();
        }
    }
    var base = "http://localhost:55475/Service1.svc/";
    var api_url = base + "checkNumber?x=" + guess.toString() + "&y=" + sn.toString();
    xhttp.open("GET", api_url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function playGuess() {
    if (validateGuess()) {
        attempts++;
        createAttemptLabel();
        guess = parseInt(document.getElementById("makeGuess").value);
        checkNumber();

    } else {
        alert("You must enter a valid integer for the guess.");
    }
}