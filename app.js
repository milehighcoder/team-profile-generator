const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let employees = [];

//Prompts user to create a Manager profile
inquirer
  .prompt([
    {
      type: "input",
      message: "What is the name of your Manager?",
      name: "managerName",
    },
    {
      type: "input",
      message: "What is the ID number for your Manager?",
      name: "managerId",
    },
    {
      type: "input",
      message: "What is the email for your Manager?",
      name: "managerEmail",
    },
    {
      type: "input",
      message: "What is the office number for your Manager?",
      name: "managerOfficeNumber",
    },
  ])
  .then((answers) => {
    const manager = new Manager(
      answers.managerName,
      answers.managerId,
      answers.managerEmail,
      answers.managerOfficeNumber
    );
    employees.push(manager);
    createTeam();
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });

//Prompts user to select which team member they would like to create
function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which team member would you like to create?",
        name: "createEmployee",
        choices: ["Engineer", "Intern", "Done"],
      },
    ])
    .then((answers) => {
      switch (answers.createEmployee) {
        case "Engineer":
          createEngineer();
          break;
        case "Intern":
          createIntern();
          break;
        case "Done":
          renderTeam();
          break;
        default:
          renderTeam();
      }
    });
}

//Prompts user to create Engineer Profile
function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of your Engineer?",
        name: "engineerName",
      },
      {
        type: "input",
        message: "What is the ID number for your Engineer?",
        name: "engineerId",
      },
      {
        type: "input",
        message: "What is the email for your Engineer?",
        name: "engineerEmail",
      },
      {
        type: "input",
        message: "What is the Github username for your Engineer?",
        name: "engineerGithub",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.engineerGithub
      );
      employees.push(engineer);
      createTeam();
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
}

//Prompts user to create Intern Profile
function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of your Intern?",
        name: "internName",
      },
      {
        type: "input",
        message: "What is the ID number for your Intern?",
        name: "internId",
      },
      {
        type: "input",
        message: "What is the email for your Intern?",
        name: "internEmail",
      },
      {
        type: "input",
        message: "What school does your Intern attend?",
        name: "internSchool",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.internSchool
      );
      employees.push(intern);
      createTeam();
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
}

function renderTeam() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  return fs.writeFileSync(outputPath, render(employees));
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
