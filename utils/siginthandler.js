export default function () {
  let stdin = process.stdin;
  stdin.on("data", (key) => {
    if (key == "\u0003") {
      console.log("\nGoodbye...");
      process.exit();
    }
  });
}
