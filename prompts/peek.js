import inquirer from "inquirer";
import { routeFetch } from "../strategies/router.js";

export default function prompt() {
  inquirer
    .prompt([
      {
        type: "list",
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
        type: "input",
        name: "key",
        message: "Enter your Key: ",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your key";
          }
        },
      },
    ])
    .then(
      async (answers) => {
        await routeFetch(answers);
      },
      (error) => {
        console.log(error);
      }
    );
}
