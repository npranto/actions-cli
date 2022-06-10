const { program } = require("commander");
const chalk = require("chalk");
const config = require("../config");
const { ACTIONS_LIST } = require("../constants");
const listActionItems = require("./listActionItems");

function removeActionItems(options = {}) {
  const { last = false, items } = options;
  const existingActions = config.get(ACTIONS_LIST) || [];
  if (!existingActions || !existingActions.length) {
    console.log(
      chalk.green("Looks like you don't have any action items right now 👌")
    );
  } else if (last) {
    const recentActionRemovedList = existingActions.filter(
      (_, index) => index !== 0
    );
    config.set(ACTIONS_LIST, recentActionRemovedList);
    console.log(chalk.green("✅ Most recent action item has been removed!\n"));
    listActionItems();
  } else if (items) {
    if (!Array.isArray(items) || !items.length) {
      program.help();
    } else {
      const itemsRemovedList = existingActions.filter((_, i) => {
        return !items.includes(`${i + 1}`);
      });
      config.set(ACTIONS_LIST, itemsRemovedList);
      console.log(
        chalk.green(`✅ [${items.join(", ")}] action ids have been removed!\n`)
      );
      listActionItems();
    }
  } else {
    program.help();
  }
}

module.exports = removeActionItems;
