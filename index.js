import inquirer from "inquirer";
import storePrompt from "./prompts/store.js";
import peekPrompt from "./prompts/peek.js";
import listPrompt from "./prompts/list.js";
import siginthandler from "./utils/siginthandler.js";

siginthandler();

inquirer
  .prompt([
    {
      type: "list",
      name: "menu",
      message: "Select an action",
      choices: ["Store", "Peek", "List"],
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
        await peekPrompt();
      } else if (answers.menu === "List") {
        await listPrompt();
      }
    },
    (error) => {
      console.log(error);
    }
  );
