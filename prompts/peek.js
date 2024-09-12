import inquirer from "inquirer";
import { routePeek } from "../strategies/router.js";

export default async function () {
  const { store } = await inquirer.prompt([
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
  ]);
  var data = await routePeek({ store: store });
  const { key } = await inquirer.prompt([
    {
      type: "search-list",
      name: "key",
      message: "Select the key",
      choices: [...data.map((datum) => datum.key)],
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please select the key";
        }
      },
    },
  ]);
  const found = data.find((datum) => datum.key === key);
  console.log(found);
}
