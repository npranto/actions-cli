const chalk = require('chalk');
const config = require('./config');
const { ACTIONS_LIST } = require('./constants');

function listAllActionItems() {
  const allActions = config.get(ACTIONS_LIST);
  if (!allActions || !allActions.length) {
    console.log(
      chalk.green('Nice! You don\'t have any action items 👌')
    )
  } else {
    console.log(
      chalk.gray.bold(`List of all your actions (Total: ${allActions.length}): ✅ = COMPLETE  ||  ❌ = NOT COMPLETE\n`)
    )
    allActions.forEach((action = {}, index) => (
      action.complete
        ? console.log(
          chalk.green.bold(`✅ (${index + 1}) ${action.text}`)
        )
        : console.log(
          chalk.gray.bold(`❌ (${index + 1}) ${action.text}`)
        )
    ))
  }
}

module.exports = listAllActionItems;