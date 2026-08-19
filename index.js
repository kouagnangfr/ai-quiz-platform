//List of questions
const questions = [
    createQuestion("Quelle est la capitale du Canada ?",
        ["Toronto", "Ottawa", "Montréal", "Vancouver"],
        "Ottawa",
        "easy",
        "geography",
        1
    ),
    createQuestion("Quel est le plus grand océan ?",
        ["Atlantique", "Indien", "Pacifique", "Arctique"],
        "Pacifique",
        "medium",
        "geography",
        2
    ),
    createQuestion("Quel élément possède le symbole Au ?",
        ["Argent", "Or", "Aluminium", "Cuivre"],
        "Or",
        "hard",
        "science",
        3
    )
];

//class Quiz for each Quiz
class Quiz {
    constructor(questions){
        this.score = 0
        this.questions = questions
        this.totalPoints = 0
        this.correctAnswersCount = 0
        this.currentQuestionIndex = 0
        this.filteredQuestions = []
    }
    nextQuestion(){
        this.currentQuestionIndex++;
    }
    checkAnswer(userAnswer){
        const currentQuestion = this.filteredQuestions[this.currentQuestionIndex];
        this.totalPoints += currentQuestion.points;
        if(userAnswer===currentQuestion.goodAnswer){
            this.score += currentQuestion.points;
            console.log("Correct !"  + "\n");
            this.correctAnswersCount += 1;
        }
        else{
            console.log("Wrong answer !\n" +
                "The correct answer was : " + 
                currentQuestion.goodAnswer + "\n"
            );
        }
    }
    displayQuestion(){
        const currentQuestion = this.filteredQuestions[this.currentQuestionIndex];
        console.log(currentQuestion.text);
        console.log("Category : " + currentQuestion.category);
        console.log("Difficulty : " + currentQuestion.difficulty);
        currentQuestion.choices.forEach(element => {
            console.log(element);
        });
    }
    displayResult(){
        const successRate = this.calculateSuccessRate();
        const mention = this.getMention(successRate);
        console.log("Quiz finished!\n"+
            "Correct answers : " +  (this.correctAnswersCount) + 
            "/"+ this.filteredQuestions.length +
            "\nYour score is : " +  this.score + 
            "/" + this.totalPoints +
            "\nSuccess rate : " + successRate.toFixed(2) + 
            "%\n" + mention + "\n"
        );
    }
    calculateSuccessRate(){
        if (this.filteredQuestions.length === 0){
            return 0;
        }
        else{
            return ((this.correctAnswersCount*100)/this.filteredQuestions.length);
        }
    }
    getMention(successRate){
        if(successRate>=80){
            return "Excellent!"
        }
        else if(successRate<60){
            return "keep practicing!"
        }
        else{
            return "Good job!"
        } 
    }
    filterQuestions(difficulty, category){
        this.reset();
        this.filteredQuestions = this.questions.filter((question) =>{
            const matchesDifficulty = (difficulty === question.difficulty ) || (difficulty === "all" ) ;
            const matchesCategory = (category === question.category) || (category === "all");
            return matchesCategory && matchesDifficulty;
        });
    }
    //lauch quiz
    startQuiz(userAnswers){
        while(this.currentQuestionIndex < this.filteredQuestions.length){
            this.displayQuestion();
            this.checkAnswer(userAnswers[this.currentQuestionIndex]);
            this.nextQuestion();
        }
        this.displayResult();
    }

    //reset properties
    reset(){
        this.score = 0; 
        this.totalPoints = 0;
        this.correctAnswersCount = 0;
        this.currentQuestionIndex = 0;
    }


}


const testAnswers = ["Ottawa", "Atlantique", "Or"]
const geographyAnswers = ["Montréal","Pacifique"]
const scienceAnswers = ["Or"]

const quiz = new Quiz(questions);
const geographyQuiz = new Quiz(questions);
const scienceQuiz = new Quiz(questions);

geographyQuiz.filterQuestions("all", "geography");
scienceQuiz.filterQuestions("all", "science");


let selectedDifficulty = "all";
let selectedCategory = "all";
quiz.filterQuestions(selectedDifficulty,selectedCategory);

function createQuestion(text, choices, goodAnswer, difficulty, category, points){
    return ({
            text,
            choices,
            goodAnswer,
            difficulty,
            category,
            points
        }
    )
}


//quiz.startQuiz(testAnswers);
geographyQuiz.startQuiz(geographyAnswers);
const newGeographyAnswers = ["Ottawa","Pacifique"];
geographyQuiz.reset();
geographyQuiz.startQuiz(newGeographyAnswers);
//scienceQuiz.startQuiz(scienceAnswers);





