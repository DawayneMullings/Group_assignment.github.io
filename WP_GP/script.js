const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName");
const dob = document.getElementById("dob");
const age = document.getElementById("age");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const task = document.getElementById("task");

const registrationForm = document.getElementById("registrationForm");
const register =document.getElementById("register");

const registerButton = document.getElementById("registerButton");
const startButton = document.getElementById("startButton");
const endButton = document.getElementById("endButton");
const checkAnswerButton = document.getElementById("checkAnswerButton");
const nextButton = document.getElementById("nextButton");
const percentageScoreButton = document.getElementById("percentageScoreButton"); 
const equationid =document.getElementById("equationid");
const answerInput = document.getElementById("answerInput");

const showpercentage = document.getElementById("showpercentage");
const showallplayers = document.getElementById("showallplayers");
const playArea = document.getElementById("playArea");
const textAreas = document.getElementById("textAreas");
const chartsContainer = document.getElementById("chartsContainer")


dob.max = new Date().toISOString().split("T")[0];
let answer, player, PlayerRegistrationData =[];

        function calculateAge()
        {
            let today = new Date();
            let birthDate = new Date(dob.value);
            let ageCalculated = today.getFullYear() - birthDate.getFullYear();
                                                   
            age.value = ageCalculated;   
            return ageCalculated;
        }

        function Register()
        {
            
            if ((firstName.value).length < 4)
            {
                alert("Firstname must be alteast 4 charcters long")
                return;  
            }
            
            if ((lastName.value).length < 4)
            {
                alert("Lastname must be alteast 4 charcters long")
                return;  
            }
            
            if(dob.value ==='')
            {
                alert("No date of birth selected");
                return;
            }
            
            if(age.value < 8 || age.value > 12)
            {
                alert("Age must be within 8 and 12 years");
                return;  
            }
            
            if ((email.value).endsWith("@gmail.com"));
            else
            {
                alert("Email must be of type '@gmail.com");
                return; 
            }   

            if(gender.value !== "Male" && gender.value !== "Female")
            {
                alert("Ensure gender is 'Male' or 'Female'");
                return; 
            }

            PlayerRegistrationData.push({
                firstName: firstName.value,
                lastName: lastName.value,
                dob: dob.value,
                age: age.value,
                email: email.value,
                gender: gender.value,
                questions: [],
                answers: [],
                correct: 0,
                incorrect: 0
            });
    registerButton.disabled = true;
    startButton.disabled = false;

    firstName.disabled = true;
    lastName.disabled = true;
    dob.disabled = true;
    email.disabled = true;
    gender.disabled = true;
}

function PlayGame() 
{
    
    register.style.maxHeight = "0";
    register.style.overflow = 'hidden';
    startButton.disabled = true;
    checkAnswerButton.disabled = false;
    nextButton.disabled = true;

    chartsContainer.style.maxHeight = "100%";
    chartsContainer.style.overflow = "visible";

    calculateHighScore();

    let num1 = Math.floor(Math.random() * 9) + 1;
    let num2 = Math.floor(Math.random() * 5) + 1;

    let equation = num1 + " x " + num2 + " = ";
    answer = num1 * num2;

    playArea.style.maxHeight="100%";
    playArea.style.overflow = "visible";

    equationid.textContent = equation;
    answerInput.value = "";
}

function CheckAnswer() 
{
    if(answerInput.value == "")
    {
        alert('No value entred');
    }
    else
    {
        checkAnswerButton.disabled = true;
        endButton.disabled = false;
        percentageScoreButton.disabled =false;
    
        var player = PlayerRegistrationData[PlayerRegistrationData.length - 1];
    
    
        if (parseInt(answerInput.value) === answer) 
        {
            alert('Well Done! Answer is correct');
            player.correct++;
            player.questions.push(equationid.textContent);
            player.answers.push(answerInput.value + " (Correct)");
        } 
        else 
        {
            alert("You'll get 'em next time! The correct answer is: " + answer);
            player.incorrect++;
            player.questions.push(equationid.textContent);
            player.answers.push(answerInput.value + " (Incorrect)");
        }
        
        nextButton.disabled = false;
        calculateHighScore();

        showAllStats();
    }
}
function End() 
{
    findPercentageScore();


    firstName.disabled = false;
    lastName.disabled = false;
    dob.disabled = false;
    email.disabled = false;
    gender.disabled = false;


    registrationForm.reset();
    register.style.maxHeight = "100%";
    register.style.overflow = "visible";
    playArea.style.maxHeight = "0";
    textAreas.style.overflow = "hidden";
    textAreas.style.maxHeight = "0";
    playArea.style.overflow = "hidden";
    playArea.style.maxHeight = "0";
    chartsContainer.style.overflow = "hidden";
    chartsContainer.style.maxHeight = 0;
    endButton.disabled = true;
    startButton.disabled = true;
    checkAnswerButton.disabled = true;
    percentageScoreButton.disabled = true;
    showpercentage.value = "";
    registerButton.disabled = false;
    nextButton.disabled =true;
    document.getElementById("usernamedisplay").innerHTML = "";
    document.getElementById("highscoredisplay").innerHTML = "";
}


function showAllStats() 
{
    textAreas.style.maxHeight = "100%";
    textAreas.style.overflow ="visible";
    var displayText = "";

    for (var i = 0; i < PlayerRegistrationData.length; i++) {
        var player = PlayerRegistrationData[i];
        displayText += player.firstName + " " + player.lastName + ", Age: " + player.age + "\n";

        for (var j = 0; j < player.questions.length; j++) {
            displayText += "Question: " + player.questions[j] + ", Answer: " + player.answers[j] + "\n";
        }

        var totalQuestions = player.questions.length;
        var correctAnswers = player.correct;
        var incorrectAnswers = player.incorrect;
        var percentage = (correctAnswers / totalQuestions) * 100;

        displayText += "Total Questions: " + totalQuestions + ", Correct Answers: " + correctAnswers +
            ", Incorrect Answers: " + incorrectAnswers + ", Percentage Score: " + percentage.toFixed(2) + "%\n\n";
    }

    showallplayers.value = displayText;
}

function showCharts() {
    var totalPlayers = PlayerRegistrationData.length;

    // Calculate gender percentages
    var femaleCount = PlayerRegistrationData.filter(player => player.gender === 'Female').length;
    var maleCount = PlayerRegistrationData.filter(player => player.gender === 'Male').length;
    var femalePercentage = (femaleCount / totalPlayers) * 100;
    var malePercentage = (maleCount / totalPlayers) * 100;

    // Create gender frequency bar chart
    var genderChart = "<b>Gender Chart:</b><br>";
    genderChart += "Females: <img src='thinbar.png' height = 20px width='" + femalePercentage + "px'/> " + femalePercentage.toFixed(1) + "%<br>";
    genderChart += "Males: <img src='thinbar.png' height = 20px width='" + malePercentage + "px'/> " + malePercentage.toFixed(1) + "%<br>";

    // Calculate percentage score range percentages
    var scoreRanges = [0, 0, 0, 0, 0, 0, 0];
    PlayerRegistrationData.forEach(player => {
        var percentage = (player.correct / (player.correct + player.incorrect)) * 100;
        if (percentage < 50) scoreRanges[0]++;
        else if (percentage >= 50 && percentage < 60) scoreRanges[1]++;
        else if (percentage >= 60 && percentage < 70) scoreRanges[2]++;
        else if (percentage >= 70 && percentage < 80) scoreRanges[3]++;
        else if (percentage >= 80 && percentage < 90) scoreRanges[4]++;
        else if (percentage >= 90 && percentage < 100) scoreRanges[5]++;
        else if (percentage === 100) scoreRanges[6]++;
    });

    // Create percentage score range frequency bar chart
    var scoreChart = "<b>Percentage Score Chart:</b><br></b><br></b><br>";
    scoreChart += "< 50%:  <img src='thinbar.png' height = 20px width='" + scoreRanges[0]*50 + "px'/> " + (scoreRanges[0] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "50-59%: <img src='thinbar.png' height = 20px width='" + scoreRanges[1]*50 + "px'/> " + (scoreRanges[1] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "60-69%: <img src='thinbar.png' height = 20px width='" + scoreRanges[2]*50 + "px'/> " + (scoreRanges[2] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "70-79%: <img src='thinbar.png' height = 20px width='" + scoreRanges[3]*50 + "px'/> " + (scoreRanges[3] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "80-89%: <img src='thinbar.png' height = 20px width='" + scoreRanges[4]*50 + "px'/> " + (scoreRanges[4] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "90-99%: <img src='thinbar.png' height = 20px width='" + scoreRanges[5]*50 + "px'/> " + (scoreRanges[5] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "100%: <img src='thinbar.png' height = 20px width='" + scoreRanges[6]*50 + "px'/> " + (scoreRanges[6] / totalPlayers * 100).toFixed(1) + "%<br>";

    document.getElementById("showcharts").innerHTML = genderChart + "<br>" + scoreChart;
}

function findPercentageScore() {
    currDate= new Date().toISOString().split("T")[0];
    var player = PlayerRegistrationData[PlayerRegistrationData.length - 1];
    var totalQuestions = player.questions.length;
    var correctAnswers = player.correct;
    var percentage = (correctAnswers / totalQuestions) * 100;

    var displayText = player.firstName + " " + player.lastName + ": " +
        "Total Questions: " + totalQuestions + ", " +
        "Correct Answers: " + correctAnswers + ", " +
        "Percentage Score: " + percentage.toFixed(2) + "%" +", "+
        "Current Date: " + currDate; 


        calculateHighScore();

    document.getElementById("showpercentage").value = displayText;

    alert("You Scored: "+ percentage.toFixed(2) + "%");
}
function calculateHighScore() {
    let highestScore = 0;
    let highestScoreQuestionAmount=0;
    let highestScorePlayer = null;

    for (let i = 0; i < PlayerRegistrationData.length; i++) {
        let player = PlayerRegistrationData[i];
        let totalQuestions = player.questions.length;
        let correctAnswers = player.correct;
        let percentage = (correctAnswers / totalQuestions) * 100;
        if (percentage > highestScore && totalQuestions>=highestScoreQuestionAmount|| (percentage === highestScore && totalQuestions >= highestScoreQuestionAmount)) {
            highestScore = percentage;
            highestScorePlayer = player;
            highestScoreQuestionAmount = totalQuestions;
        }
    }

    if (highestScorePlayer !== null) {

        document.getElementById("highscoredisplay").innerHTML = highestScore.toFixed(2) + "%";
        document.getElementById("usernamedisplay").innerHTML = highestScorePlayer.firstName;

    }
    
}


// Call showCharts() every 5 seconds after the page loads
window.onload = function () 
{
    showCharts();
    setInterval(showCharts, 5000);
}
