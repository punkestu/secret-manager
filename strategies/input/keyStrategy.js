import inquirer from "inquirer";

export default async function keyStrategy(storeFunction, dataProcesses = []) {
  console.log("--- Key Secret Store ---");
  await inquirer
    .prompt([
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
      {
        type: "input",
        name: "secret",
        message: "Enter your Secret: ",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your secret key";
          }
        },
      },
    ])
    .then(async (answers) => {
      const result = dataProcesses(answers.secret);
      console.log(result);
      await storeFunction({
        key: answers.key,
        type: "key",
        value: result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
