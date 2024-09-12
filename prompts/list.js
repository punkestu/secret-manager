import inquirer from "inquirer";
import inquirerSearchList from "inquirer-search-list";
import sqliteStrategy from "../strategies/list/sqliteStrategy.js";
import dataProcesses from "../strategies/dataProcesses.js";

inquirer.registerPrompt("search-list", inquirerSearchList);
export default async function () {
  const listStrategy = await inquirer.prompt([
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
  var data;
  if (listStrategy.store === "sqlite") {
    data = await sqliteStrategy(dataProcesses);
  }
  const { key } = await inquirer.prompt([
    {
      type: "search-list",
      name: "key",
      message: "Select the key",
      choices: [...data.map((row) => row.key)],
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please select the key";
        }
      },
    },
  ]);
  const row = data.find((row) => row.key === key);
  console.log(row);
}
