const chalk = require("chalk");
const { program } = require("commander");
const config = require("../config");
const { ACTIONS_LIST } = require("../constants");
const listActionItems = require("../utils/listActionItems");

function validateDate(date) {
  const isDateValid =
    /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/.test(date);

  if (!isDateValid) {
    return {
      isValid: false,
      error:
        "Please provide a valid date to filter action items, i.e., `actions filter --date 3/5/2021`",
    };
  }
  return {
    isValid: true,
    error: null,
  };
}

function filterActionItems(options = {}) {
  console.log(options);
  const { date, includes } = options;
  const allActions = config.get(ACTIONS_LIST);

  if (!allActions || !allActions.length) {
    console.log(chalk.green("Nice! You don't have any action items 👌"));
  } else if (date) {
    const { isValid, error } = validateDate(date);
    if (!isValid) {
      console.log(chalk.red.bold(`${error}\n`));
      program.help();
    }
    const filteredList = allActions.filter((action) => {
      return (
        new Date(action.createdAt).toDateString() ===
        new Date(date).toDateString()
      );
    });
    console.log(
      chalk.gray.bold("List of action items"),
      chalk.green.underline(`filtered by [date=${date}]`),
      chalk.gray.bold(
        `(Total: ${filteredList.length}): ✅ COMPLETE | ❌ NOT COMPLETE \n`
      )
    );
    filteredList.forEach((action = {}, index) =>
      action.complete
        ? console.log(chalk.green.bold(`✅ (${index + 1}) ${action.text}`))
        : console.log(chalk.gray.bold(`❌ (${index + 1}) ${action.text}`))
    );
  } else if (includes) {
    const filteredList = allActions.filter((action) => {
      const includesRegex = new RegExp(`${includes}`, "is");
      const actionMatched = action.text.match(includesRegex);
      return !!actionMatched?.length;
    });
    console.log(
      chalk.gray.bold("List of action items"),
      chalk.green.underline(`filtered by [includes=${includes}]`),
      chalk.gray.bold(
        `(Total: ${filteredList.length}): ✅ COMPLETE | ❌ NOT COMPLETE \n`
      )
    );
    filteredList.forEach((action = {}, index) =>
      action.complete
        ? console.log(chalk.green.bold(`✅ (${index + 1}) ${action.text}`))
        : console.log(chalk.gray.bold(`❌ (${index + 1}) ${action.text}`))
    );
  } else {
    program.help();
  }
}

module.exports = filterActionItems;
