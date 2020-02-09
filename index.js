// add requirements: axios and inqurier
var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");

// link to file-util.js, which will hold functionality to write to page

//use inquirer to ask the following and wrap everything in an object

inquirer
  .prompt([
    {
      type: "input",
      message: "Github username",
      name: "username"
    },
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title"
    },
    //2. Describe your project
    {
      type: "input",
      message: "How would you describe your project?",
      name: "description"
    },

    //3.What do you need to install this project ie inquriere axios etc?
    {
      type: "checkbox",
      message: "What do you need to install this project?",
      name: "need",
      choices: [
        "node",
        "jquery",
        "npm",
        "javascript",
        "sanity",
        "axios",
        "inquirer"
      ]
    },

    //4. What do you use this for?
    {
      type: "input",
      message: "what do you use this for?",
      name: "use"
    },

    //5. Liscense options (radio buttons)?

    {
      type: "list",
      message: "What sort of liscense options do you want to use?",
      name: "liscense",
      choices: [
        "OpenSource",
        "you can steal it, but it sucks",
        "Don't steal it",
        "As long as you make it better than the DNC's app"
      ]
    },

    //6. Names of additional contributors.
    {
      type: "input",
      message: "Who else collabed on this?",
      name: "collaborators"
    },

    //7.How do you test this?
    { type: "input", message: "How do you test this thing?", name: "test" }
  ])
  .then(answers => {
    console.log(answers.title);
    axios
      .get(
        `https://api.github.com/users/${answers.username}/repos?per_page=100`
      )
      .then(function(userInfo) {
        console.log(userInfo.data[0].owner.avatar_url);
        //this is making the MD File
        var profileString = `
# ${answers.title}

## Project Description

${answers.description}

[![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](http://commonmark.org)
## For installation, use:

${answers.need}

## Usage
${answers.use}

## Liscense
${answers.liscense}

## Other contributors
${answers.collaborators}

## To test
${answers.test}

## About the author
![photo](${userInfo.data[0].owner.avatar_url}) `;
        fs.writeFile("./profile/README.md", profileString, error => {
          if (error) {
            console.log(error);
          }
          console.log("file saved");
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  });


