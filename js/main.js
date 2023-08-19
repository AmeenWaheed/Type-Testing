// Array of words

const wordEasy = [
    "Hello",
    "Code",
    "Html",
    "Css",
    "NodeJs",
    "Malika",
    "Amin",
    "Town",
    "Fine",
    "Cool",
    "Beat",
    "Well",
    "Great",
    "Busy",
    "Spent",
    "Good"
];

const wordNormal = [
    "Country",
    "Keeping",
    "Pooped",
    "Lousy",
    "Kind",
    "Github",
    "Express",
    "NextJs",
    "MongoDb",
    "Python"
];

const wordHard = [
    "Programming",
    "Javascript",
    "Exhausted",
    "Middling",
    "Documentation",
    "Synchronous",
    "Asynchronous"
];

// Setting Levels
const lvls = {
    "Easy": 6,
    "Normal": 3,
    "Hard": 3,
};



// Catch Selector
let startBtn = document.querySelector(".start");
let lvlName = document.querySelector(".message .lvl");
let select = document.querySelector("select");
let lvlSecond = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcoming = document.querySelector(".upcoming-word");
let input = document.getElementById("input");
let timeLeft = document.querySelector(".time span");
let score = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finish = document.querySelector(".finish");


// Add span to play again
let span = document.createElement("span");
span.innerHTML = "Play Again";
span.className = "again";



// Check local Storage
if (window.localStorage.getItem("select")) {
    select.value = window.localStorage.getItem("select");
}

// Add to lcal storage
function addLocal() {
    window.localStorage.setItem("select", select.value);
}

function fromLocalStorage() {
    addLocal();
    // Default level
    let defaultLevel = window.localStorage.getItem("select");
    let defaultLevelSecond = lvls[defaultLevel];
    lvlName.innerHTML = defaultLevel;
    lvlSecond.innerHTML = defaultLevelSecond;
    timeLeft.innerHTML = defaultLevelSecond;

    if (select.value === "Easy") {
        scoreTotal.innerHTML = wordEasy.length;
    }
    if (select.value === "Normal") {
        scoreTotal.innerHTML = wordNormal.length;
    }
    if (select.value === "Hard") {
        scoreTotal.innerHTML = wordHard.length;
    }
}

// Add localstorage to select and window
window.onload = fromLocalStorage;
select.onchange = fromLocalStorage;




// Disaple Paste
input.onpaste = function () {
    return false;
}

startBtn.onclick = function () {
    this.remove();
    input.focus();
    // Generate Word Function
    generateWord();
}

function generateWord() {
    fromLocalStorage();

    if (select.value === "Easy") {
        let wordRandomEasy = wordEasy[Math.floor(Math.random() * wordEasy.length)];
        let wordIndexEasy = wordEasy.indexOf(wordRandomEasy);
        wordEasy.splice(wordIndexEasy, 1);
        theWord.innerHTML = wordRandomEasy;

        // Empty Upcoming words
        upcoming.innerHTML = '';
        // Generate upcoming words
        for (let i = 0; i < wordEasy.length; i++) {
            // Create Element
            let div = document.createElement("div");
            div.innerHTML = wordEasy[i];
            upcoming.appendChild(div);
        }
        

        // Call Start play function
        startPlay();

    }

    if (select.value === "Normal") {
        let wordRandomNormal = wordNormal[Math.floor(Math.random() * wordNormal.length)];
        let wordIndexNormal = wordNormal.indexOf(wordRandomNormal);
        wordNormal.splice(wordIndexNormal, 1);
        theWord.innerHTML = wordRandomNormal;

        // Empty Upcoming words
        upcoming.innerHTML = '';
        for (let i = 0; i < wordNormal.length; i++) {
            // Create Element
            let div = document.createElement("div");
            div.innerHTML = wordNormal[i];
            upcoming.appendChild(div);
        }

        // Call Start play function
        startPlay();
    }

    if (select.value === "Hard") {
        let wordRandomHard = wordHard[Math.floor(Math.random() * wordHard.length)];
        let wordIndexHard = wordHard.indexOf(wordRandomHard);
        wordHard.splice(wordIndexHard, 1);
        theWord.innerHTML = wordRandomHard;

        // Empty Upcoming words
        upcoming.innerHTML = '';
        for (let i = 0; i < wordHard.length; i++) {
            // Create Element
            let div = document.createElement("div");
            div.innerHTML = wordHard[i];
            upcoming.appendChild(div);
        }

        // Call Start play function
        startPlay();
    }


}


// fucntion to start playing
function startPlay() {
    // call elementfrom local dstorage
    fromLocalStorage();

    let start = setInterval(() => {
        timeLeft.innerHTML--;
        if (timeLeft.innerHTML === "0") {
            clearInterval(start);
            // Compare Words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = '';
                score.innerHTML++;
                input.focus();
                // Check Words
                if (wordEasy.length > 0 && wordNormal.length > 0 && wordHard.length > 0) {
                    generateWord();
                } else {
                    finish.classList.add("good");
                    finish.style.backgroundColor = "black";
                    finish.innerHTML = "Congratuations";
                    upcoming.remove();
                    document.querySelector(".game").appendChild(span);

                    span.onclick = function () {
                        window.open("index.html", "_self");
                    }
                }
            } else {
                finish.classList.add("bad");
                finish.innerHTML = "Game Over";
                finish.style.backgroundColor = "black";

                document.querySelector(".game").appendChild(span);
                
                span.onclick = function () {
                    window.open("index.html", "_self");
                }
            }
        }
    }, 1000);
}


// Function to count number of click to increase second in difficult levels just at first word
// create counter
let count = 0;
startBtn.addEventListener("click", function () {
    // increase counter by clicking
    count++;
    // check count of clicks
    if (count == 1) {
        if (select.value === "Easy") {
            timeLeft.innerHTML = lvls[window.localStorage.getItem("select")];
        } else {
            timeLeft.innerHTML = "6";
        }
    } else {
        timeLeft.innerHTML = window.localStorage.getItem("select");
    }
})