import sqliteStoreStrategy from "./store/sqliteStrategy.js";
import keyInputStrategy from "./input/keyStrategy.js";
import sqliteFetchStrategy from "./fetch/sqliteStrategy.js";

import dataProcesses from "./dataProcesses.js";

const storeStrategies = {
  sqlite: sqliteStoreStrategy,
};
const inputStrategies = {
  key: keyInputStrategy,
};
const fetchStrategies = {
  sqlite: sqliteFetchStrategy,
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

export async function routeFetch({ store, key }) {
  const fetchStrategy = fetchStrategies[store];
  if (!fetchStrategy) {
    throw new Error("Invalid store strategy");
  }

  await fetchStrategy(key, dataProcesses);
}
