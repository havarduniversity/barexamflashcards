    // Flashcards data (word-for-word)
    const questions = [
    ["How many senators are from each state?", ["2 senators per state", "2"]],
    ["The number of representatives in the House is based on a state’s ______.", ["Population"]],
    ["Congress is made up of two houses. This is called ______.", ["Bicameral"]],
    ["How long is a member of the House of Representatives term?", ["2 years"]],
    ["Who approves the admission of a new state?", ["Congress and the President"]],
    ["How many current members are in the House of Representatives?", ["435 total (in 2011)", "435"]],
    ["What is the minimum age of a senator?", ["30 years", "30"]],
    ["How long must a senator have been a U.S. citizen?", ["At least 9 years", "9 years"]],
    ["What is the minimum age of a House of Representatives?", ["25 years", "25"]],
    ["How long must a representative have been a U.S. citizen?", ["At least 7 years", "7 years"]],
    ["What is the title of the leader of the House of Representatives?", ["Speaker of the House"]],
    ["Who has the power to declare War?", ["Congress"]],
    ["Who is the jury in a presidential impeachment?", ["The Senate"]],
    ["Which branch of government consists of Congress and creates the laws?", ["Legislative Branch"]],
    ["What is the Supreme law of the land?", ["The U.S. Constitution", "Constitution"]],
    ["What is the shared power between the federal government and the state governments called?", ["Federalism"]],
    ["What words in the preamble show the U.S. belief in self-government?", ["\"We the People\""]],
    ["How many articles are there in the Constitution?", ["7"]],
    ["How long is a term for a senator?", ["6 years"]],
    ["A bill must be approved by both houses of Congress and the President before it becomes a ______.", ["Law"]],
    ["Who must approve judges, cabinet members, and ambassadors that the President appoints?", ["The Senate"]],
    ["The department heads of the Executive Branch make up the President’s ______.", ["Cabinet"]],
    ["What word means a change in the Constitution?", ["Amendment"]],
    ["What system allows each branch of government to limit the powers of the other two branches?", ["Checks and Balances"]],
    ["How long is a term for a President?", ["4 years"]],
    ["How many terms can a President serve?", ["2 terms", "2"]],
    ["How many amendments to the Constitution?", ["27"]],
    ["What vote is required to override a presidential veto?", ["Two-thirds of both houses of Congress", "Two-thirds"]],
    ["What branch of government includes the President, and his cabinet and carries out the law?", ["Executive Branch"]],
    ["Who has the power to veto laws?", ["The President"]],
    ["The President appoints a _______ to lead each department in the Executive Branch.", ["Secretary"]],
    ["Which branch of government has the sole power to interpret the law, determine the constitutionality of the law, and apply it to individual cases?", ["Judicial Branch"]],
    ["The President must be a natural-born citizen. What does that mean?", ["Born as a U.S. citizen"]],
    ["What are the first 10 amendments to the Constitution called?", ["The Bill of Rights"]],
    ["What is the correct word for a person who makes laws?", ["Legislator"]],
    ["What type of court reviews a trial court’s verdict for errors?", ["Appellate Court"]],
    ["How many justices serve on the Supreme Court today?", ["9"]],
    ["How many departments are in the executive branch?", ["15"]],
    ["Who is the commander in chief of the armed forces?", ["The President"]],
    ["What is the term for a Supreme Court Judge?", ["Lifetime appointment"]],
    ["Impeach means to charge a public official with a crime done while in office.", ["True"]],
    ["Who is the jury in a presidential impeachment?", ["The Senate"]],
    ["When an appellate court agrees with a trial court's decision they ______ it.", ["Affirm"]],
    ["When an appellate court changes the decision of a trial court’s decision they _______ it.", ["Reverse"]],
    ["The power of deciding what is constitutional is called?", ["Judicial Review"]],
    ["What department includes the military and is responsible for protecting our nation’s military?", ["Department of Defense"]],
    ["What department manages our relationships with foreign countries?", ["Department of State"]],
    ["Which court hears cases involving federal laws, the U.S. Constitution, and disputes between citizens from different states?", ["Federal Courts"]],
    ["What court hears cases in which private citizens sue each other in court?", ["Civil Court"]],
    ["What is the highest court in the country?", ["The Supreme Court"]],
    ["What is the oldest federal law enforcement agency?", ["U.S. Marshals Service"]],
    ["What is the decision in a court trial called?", ["Verdict"]],
    ["What type of trial has no jury - just a judge that gives the verdict?", ["Bench Trial"]],
    ["How many senators are in the U.S. Senate?", ["100"]],
    ["What is the term for a federal judge?", ["Lifetime appointment"]],
    ["What speech is the president required to make annually?", ["State of the Union"]],
    ["What department includes the Secret Service that protects the President, Vice President, and their families?", ["Department of Homeland Security"]]
    ];
    // Variables
// Variables
let currentQuestionIndex = 0;
let score = 0;
let incorrectQuestions = [];
let isReviewSession = false; // Track whether it's a review session

// DOM Elements
const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer-input");
const submitButton = document.getElementById("submit-answer");
const feedbackElement = document.getElementById("feedback");
const progressElement = document.createElement("p");
const resultContainer = document.getElementById("result");
const reviewButton = document.createElement("button");

// Setup progress tracker
progressElement.style.marginBottom = "20px";
progressElement.style.fontWeight = "bold";
document.getElementById("quiz-container").prepend(progressElement);

// Setup review button
reviewButton.textContent = "Review Incorrect Questions";
reviewButton.classList.add("controls-button");
reviewButton.style.marginTop = "20px";
reviewButton.addEventListener("click", reviewIncorrectQuestions);
resultContainer.appendChild(reviewButton);
reviewButton.classList.add("hidden");
// Function to shuffle the questions array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the questions on reload
shuffleArray(questions);

// Load a question
function loadQuestion() {
    const [question] = questions[currentQuestionIndex];
    questionElement.textContent = question;
    answerInput.value = ""; // Clear input field
    feedbackElement.textContent = ""; // Clear feedback
    progressElement.textContent = `Question ${currentQuestionIndex + 1} out of ${questions.length}`;

    answerInput.classList.remove("hidden");
    submitButton.classList.remove("hidden");
    feedbackElement.classList.remove("hidden");
}

// Check the answer
// Check the answer
function checkAnswer() {
    const [, correctAnswers] = questions[currentQuestionIndex];
    const userAnswer = answerInput.value.trim().toLowerCase();

    // Helper function to calculate Levenshtein distance
    function levenshteinDistance(a, b) {
        const dp = Array(a.length + 1)
            .fill(null)
            .map(() => Array(b.length + 1).fill(0));

        for (let i = 0; i <= a.length; i++) dp[i][0] = i;
        for (let j = 0; j <= b.length; j++) dp[0][j] = j;

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,       // Deletion
                    dp[i][j - 1] + 1,       // Insertion
                    dp[i - 1][j - 1] + cost // Substitution
                );
            }
        }
        return dp[a.length][b.length];
    }

    const isCorrect = correctAnswers.some(answer => {
        const distance = levenshteinDistance(userAnswer, answer.toLowerCase());
        return distance <= 2;
    });

    if (isCorrect) {
        if (!isReviewSession) {
            score++;
        }
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent = `Incorrect. The correct answer is: ${correctAnswers.join(" or ")}`;
        feedbackElement.style.color = "red";
        if (!isReviewSession) {
            incorrectQuestions.push(questions[currentQuestionIndex]);
        }
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

// Show results
function showResults() {
    questionElement.textContent = `Quiz completed! You scored ${score} out of ${questions.length}.`;
    answerInput.classList.add("hidden");
    submitButton.classList.add("hidden");
    feedbackElement.classList.add("hidden");

    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `You scored ${score} out of ${questions.length}.`;

    if (incorrectQuestions.length > 0) {
        reviewButton.classList.remove("hidden");
    }
}

// Review incorrect questions
function reviewIncorrectQuestions() {
    currentQuestionIndex = 0;
    isReviewSession = true;
    questions.splice(0, questions.length, ...incorrectQuestions);
    incorrectQuestions = [];

    document.getElementById("result").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
}

// Event listener
submitButton.addEventListener("click", checkAnswer);
shuffleArray(questions);

// Initialize quiz
loadQuestion();
