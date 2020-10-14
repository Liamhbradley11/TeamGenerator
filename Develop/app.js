const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const starterQuestion = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?"
    },
    {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    }
];


const managerQuestion = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is the Manager's office number?"
    }
];

const engineerQuestion = {
    type: "input",
    name: "githubUserName",
    message: "Github username?"
}

const internQuestion = {
    type: "input",
    name: "schoolName",
    message: "Where does your intern go to school?"
}

const addEmployee = {
    type: "list",
    name: "addEmployee",
    message: "Would you like to add another employee?",
    choices: [
        "Yes",
        "No"
    ]
}

const employeeArray = []
let employee = "";

async function userData() {
    try {

        await inquirer.prompt(starterQuestion).then(function (response) {
            return employeeData = response;
        });

        switch (employeeData.role) {
            case "Manager":
                await inquirer.prompt(managerQuestion).then(function (response) {
                    employeeData.officeNumber = response.officeNumber;
                });

                employee = new Manager(employeeData.name, employeeData.id, employeeData.email, employeeData.officeNumber);

                break;

            case "Engineer":
                await inquirer.prompt(engineerQuestion).then(function (response) {
                    employeeData.github = response.githubUserName;
                });

                employee = new Engineer(employeeData.name, employeeData.id, employeeData.email, employeeData.github);

                break;

            case "Intern":
                await inquirer.prompt(internQuestion).then(function (response) {
                    employeeData.school = response.schoolName;
                });

                employee = new Intern(employeeData.name, employeeData.id, employeeData.email, employeeData.school);

                break;

            default:

                break;
        };

        employeeArray.push(employee);
        console.log("Employee added!");

        await inquirer.prompt(addEmployee).then(function (response) {
            return decision = response.addEmployee;
        });

        if (decision === "Yes") {
            await userData();
        } else {
            console.log(employeeArray);

            let allEmployees = render(employeeArray);

            fs.writeFile(outputPath, allEmployees, function (err) {
                if (err) {
                    console.log(err);
                }
                console.log("Data entered!");
            })
        }

    } catch (err) {
        console.log(err);
    }
}

userData();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
