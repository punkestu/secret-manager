import inquirer from "inquirer";
import inquirerSearchList from "inquirer-search-list";
import storePrompt from "./prompts/store.js";
import listPrompt from "./prompts/peek.js";
import siginthandler from "./utils/siginthandler.js";

siginthandler();

inquirer.registerPrompt("search-list", inquirerSearchList);
inquirer
  .prompt([
    {
      type: "list",
      name: "menu",
      message: "Select an action",
      choices: ["Store", "Peek"],
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please select an action";
        }
      },
    },
  ])
  .then(
    async (answers) => {
      if (answers.menu === "Store") {
        await storePrompt();
      } else if (answers.menu === "Peek") {
        await listPrompt();
      }
    },
    (error) => {
      console.log(error);
    }
  );
