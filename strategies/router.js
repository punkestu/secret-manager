import keyInputStrategy from "./input/keyStrategy.js";
import sqliteStoreStrategy from "./store/sqliteStrategy.js";
import sqlitePeekStrategy from "./peek/sqliteStrategy.js";

import dataProcesses from "./dataProcesses.js";
import deserialize from "../utils/deserialize.js";

const storeStrategies = {
  sqlite: sqliteStoreStrategy,
};
const inputStrategies = {
  key: keyInputStrategy,
};
const peekStrategies = {
  sqlite: sqlitePeekStrategy,
};

export async function routeInput({ input, store }) {
  const storeStrategy = storeStrategies[store];
  if (!storeStrategy) {
    throw new Error("Invalid store strategy");
  }

  const inputStrategy = inputStrategies[input];
  if (!inputStrategy) {
    throw new Error("Invalid input strategy");
  }

  await inputStrategy(storeStrategy, dataProcesses);
}

export async function routePeek({ store }) {
  const peekStrategy = peekStrategies[store];
  if (!peekStrategy) {
    throw new Error("Invalid store strategy");
  }

  return (await peekStrategy()).map((datum) => ({
    key: datum.key,
    type: datum.type,
    value: deserialize(dataProcesses(datum.value, true), datum),
  }));
}
