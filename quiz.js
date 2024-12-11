// Flashcards data
const questions = [
    ["How many senators are from each state?", "2 senators per state"],
    ["The number of representatives in the House is based on a state’s ______.", "Population"],
    ["Congress is made up of two houses. This is called ______.", "Bicameral"],
    ["How long is a member of the House of Representatives term?", "2 years"],
    ["Who approves the admission of a new state?", "Congress and the President"],
    ["How many current members are in the House of Representatives?", "435 total (in 2011)"],
    ["What is the minimum age of a senator?", "30 years"],
    ["How long must a senator have been a U.S. citizen?", "At least 9 years"],
    ["What is the minimum age of a House of Representatives?", "25 years"],
    ["How long must a representative have been a U.S. citizen?", "At least 7 years"],
    ["What is the title of the leader of the House of Representatives?", "Speaker of the House"],
    ["Who has the power to declare War?", "Congress"],
    ["Who is the jury in a presidential impeachment?", "The Senate"],
    ["Which branch of government consists of Congress and creates the laws?", "Legislative Branch"],
    ["What is the Supreme law of the land?", "The U.S. Constitution"],
    ["What is the shared power between the federal government and the state governments called?", "Federalism"],
    ["What words in the preamble show the U.S. belief in self-government?", "\"We the People\""],
    ["How many articles are there in the Constitution?", "7"],
    ["How long is a term for a senator?", "6 years"],
    ["A bill must be approved by both houses of Congress and the President before it becomes a ______.", "Law"],
    ["Who must approve judges, cabinet members, and ambassadors that the President appoints?", "The Senate"],
    ["The department heads of the Executive Branch make up the President’s ______.", "Cabinet"],
    ["What word means a change in the Constitution?", "Amendment"],
    ["What system allows each branch of government to limit the powers of the other two branches?", "Checks and Balances"],
    ["How long is a term for a President?", "4 years"],
    ["How many terms can a President serve?", "2 terms"],
    ["How many amendments to the Constitution?", "27"],
    ["What vote is required to override a presidential veto?", "Two-thirds of both houses of Congress"],
    ["What branch of government includes the President, and his cabinet and carries out the law?", "Executive Branch"],
    ["Who has the power to veto laws?", "The President"],
    ["The President appoints a _______ to lead each department in the Executive Branch.", "Secretary"],
    ["Which branch of government has the sole power to interpret the law, determine the constitutionality of the law, and apply it to individual cases?", "Judicial Branch"],
    ["The President must be a natural-born citizen. What does that mean?", "Born as a U.S. citizen"],
    ["What are the first 10 amendments to the Constitution called?", "The Bill of Rights"],
    ["What is the correct word for a person who makes laws?", "Legislator"],
    ["What type of court reviews a trial court’s verdict for errors?", "Appellate Court"],
    ["How many justices serve on the Supreme Court today?", "9"],
    ["How many departments are in the executive branch?", "15"],
    ["Who is the commander in chief of the armed forces?", "The President"],
    ["What is the term for a Supreme Court Judge?", "Lifetime appointment"],
    ["Impeach means to charge a public official with a crime done while in office.", "True"],
    ["Who is the jury in a presidential impeachment?", "The Senate"],
    ["When an appellate court agrees with a trial court's decision they ______ it.", "Affirm"],
    ["When an appellate court changes the decision of a trial court’s decision they _______ it.", "Reverse"],
    ["The power of deciding what is constitutional is called?", "Judicial Review"],
    ["What department includes the military and is responsible for protecting our nation’s military?", "Department of Defense"],
    ["What department manages our relationships with foreign countries?", "Department of State"],
    ["Which court hears cases involving federal laws, the U.S. Constitution, and disputes between citizens from different states?", "Federal Courts"],
    ["What court hears cases in which private citizens sue each other in court?", "Civil Court"],
    ["What is the highest court in the country?", "The Supreme Court"],
    ["What is the oldest federal law enforcement agency?", "U.S. Marshals Service"],
    ["What is the decision in a court trial called?", "Verdict"],
    ["What type of trial has no jury - just a judge that gives the verdict?", "Bench Trial"],
    ["How many senators are in the U.S. Senate?", "100"],
    ["What is the term for a federal judge?", "Lifetime appointment"],
    ["What speech is the president required to make annually?", "State of the Union"],
    ["What department includes the Secret Service that protects the President, Vice President, and their families?", "Department of Homeland Security"]
];

// Variables
let currentQuestionIndex = 0;
let score = 0;
let incorrectQuestions = []; // Track incorrect questions

// DOM elements
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-question");
const resultContainer = document.getElementById("result");
const scoreElement = document.getElementById("score");
const feedbackElement = document.createElement("p");
const progressElement = document.createElement("p");
const reviewButton = document.createElement("button"); // Review button

// Append feedback and progress trackers
feedbackElement.style.marginTop = "10px";
feedbackElement.style.fontWeight = "bold";
document.getElementById("quiz-container").append(feedbackElement);
document.getElementById("quiz-container").prepend(progressElement);

// Add review button to the result container
reviewButton.textContent = "Review What You Got Wrong";
reviewButton.classList.add("controls-button");
reviewButton.style.marginTop = "20px";
reviewButton.onclick = reviewIncorrectQuestions;
resultContainer.appendChild(reviewButton);

// Update progress display
function updateProgress() {
    progressElement.textContent = `Question ${currentQuestionIndex + 1} out of ${questions.length}`;
}

// Load a question
function loadQuestion() {
    const [question, correctAnswer] = questions[currentQuestionIndex];
    questionElement.textContent = question;
    feedbackElement.textContent = ""; // Clear feedback

    // Shuffle options
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomOption = questions[Math.floor(Math.random() * questions.length)][1];
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    options.sort(() => Math.random() - 0.5);

    // Display options
    optionsContainer.innerHTML = "";
    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("quiz-option");
        button.onclick = () => checkAnswer(option, correctAnswer);
        optionsContainer.appendChild(button);
    });

    // Update progress
    updateProgress();
    nextButton.disabled = true;
}

// Check if the selected answer is correct
function checkAnswer(selected, correct) {
    if (selected === correct) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
        score++;
    } else {
        feedbackElement.textContent = `Incorrect! The correct answer is: ${correct}`;
        feedbackElement.style.color = "red";
        incorrectQuestions.push(questions[currentQuestionIndex]); // Save incorrect question
    }
    nextButton.disabled = false;
}

// Move to the next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Show results
function showResults() {
    document.getElementById("quiz-container").classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreElement.textContent = `You scored ${score} out of ${questions.length}`;
    if (incorrectQuestions.length === 0) {
        reviewButton.style.display = "none"; // Hide review button if no incorrect answers
    }
}

// Review incorrect questions
function reviewIncorrectQuestions() {
    questions.splice(0, questions.length, ...incorrectQuestions); // Replace questions with incorrect ones
    currentQuestionIndex = 0;
    incorrectQuestions = []; // Clear incorrect questions
    score = 0; // Reset score
    resultContainer.classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
}

// Initialize
loadQuestion();
