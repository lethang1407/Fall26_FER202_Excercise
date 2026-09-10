class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

class Student extends Person {
    constructor(name, age, scores = []) {
        super(name, age);
        this.scores = scores;
    }

    calculateAverageScore() {
        if (this.scores.length === 0) return 0;
        const totalScore = this.scores.reduce((sum, score) => sum + score, 0);
        return totalScore / this.scores.length;
    }

    displayInfo() {
        console.log(this.introduce());
        console.log(`Scores: [${this.scores.map(score => score).join(', ')}]`);
        console.log(`Passing Scores (>= 5): [${this.scores.filter(score => score >= 5).join(', ')}]`);
        console.log(`Average Score: ${this.calculateAverageScore().toFixed(2)}`);
    }
}

const createScores = (...scores) => {
    return scores;
};

const evaluatePerformance = (student) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const avg = student.calculateAverageScore();
            if (avg >= 8) {
                resolve("Excellent Student");
            } else {
                resolve("Need Improvement");
            }
        }, 3000);
    });
};

function Slot1() {

    const initialScores = createScores(8, 9, 10);
    const student = new Student("Thang", 20, initialScores);

    const newScores = createScores(4.5, 4, 5);
    student.scores = [...student.scores, ...newScores];

    console.log(`--- Student Full Information ---`);
    student.displayInfo();

    console.log(`\n--- Asynchronous Evaluation ---`);
    console.log("Evaluating academic performance... (3s)");
    evaluatePerformance(student)
        .then((result) => {
            console.log(`Evaluation Result for ${student.name}: ${result}`);
        })
        .catch((error) => {
            console.error("Evaluation failed:", error);
        });
}

export default Slot1;