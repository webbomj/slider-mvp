import { IModelOptions } from "../../interfaces/interfaces";

const isNeedRerender = (options: Partial<IModelOptions>): boolean => {
  // if (
  //   options.hasOwnProperty("isInterval") ||
  //   options.hasOwnProperty("isLabel") ||
  //   options.hasOwnProperty("isProgressBar") ||
  //   options.hasOwnProperty("isScale") ||
  //   options.hasOwnProperty("isVertical")
  // ) {
  //   return true;
  // }

  const arr = Object.entries(options);

  if (arr.length !== 0) {
    arr.forEach(([key, value]) => {
      if (
        key === "isInterval" ||
        key === "isLabel" ||
        key === "isProgressBar" ||
        key === "isScale" ||
        key === "isVertical"
      ) {
        return true;
      }
    });
  }

  // if (
  //   options.isInterval != undefined ||
  //   options.isLabel != undefined ||
  //   options.isProgressBar != undefined ||
  //   options.isScale != undefined ||
  //   options.isVertical != undefined
  // ) {
  //   return true;
  // }

  // if (
  //   typeof options.isInterval != "undefined" ||
  //   typeof options.isLabel != "undefined" ||
  //   typeof options.isProgressBar != "undefined" ||
  //   typeof options.isScale != "undefined" ||
  //   typeof options.isVertical != "undefined"
  // ) {
  //   return true;
  // }
  return false;
};

export { isNeedRerender };
