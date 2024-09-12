import inquirer from "inquirer";
import { routeInput } from "../strategies/router.js";

export default function prompt() {
  inquirer
    .prompt([
      {
        type: "search-list",
        name: "store",
        message: "Enter your Store Strategy: ",
        choices: ["sqlite"],
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your store strategy";
          }
        },
      },
      {
        type: "search-list",
        name: "input",
        message: "Enter your Input Strategy: ",
        choices: ["key"],
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your input strategy";
          }
        },
      },
    ])
    .then(
      async (answers) => {
        await routeInput(answers);
      },
      (error) => {
        console.log(error);
      }
    );
}
