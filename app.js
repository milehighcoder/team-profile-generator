const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];

//Creates a Manager profile
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
    });
}

//writes the team.html page to the output folder
function renderTeam() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  return fs.writeFileSync(outputPath, render(employees));
}
