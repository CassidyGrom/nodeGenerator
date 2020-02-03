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
      message: "What is the title of your project?",
      name: "title"
    },
    {
      type: "input",
      message: "Github username",
      name: "username"
    }
  ])
  .then(answers => {
    console.log(answers.title);
    axios
      .get(
        `https://api.github.com/users/${answers.username}/repos?per_page=100`
      )
      .then(function(userInfo) {
        console.log(userInfo.data[0].owner.avatar_url);

        var profileString =
          //this is making the MD File
          `
        ![photo](${userInfo.data[0].owner.avatar_url})

        # Heading
        `;
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

//1. What is the title of your project?

//2. Describe your project

//3.What do you need to install this project ie inquriere axios etc?

//4. What do you use this for?

//5. Liscense options (radio buttons)?

//6. Names of additional contributors.

//7.How do you test this?

//8. what is your github username?

//Use an AJAX-like call to get github APi

//9. Generate user's bio pick

//.10 Generate user's email

//EC: table of contents
