import caesarStrategy, { isUsed as caesarIsUsed } from "./crypto/caesar.js";
import getenv from "../utils/getenv.js";

export default function (data, dec = false) {
  const processor = [];

  if (caesarIsUsed(getenv.processor)) {
    processor.push(caesarStrategy(getenv.caesarshift));
  }

  return processor.reduce((result, currFunc) => currFunc(result, dec), data);
}
