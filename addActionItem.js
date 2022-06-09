const chalk = require('chalk');
const config = require('./config');
const { ACTIONS_LIST } = require('./constants');
const listAllActionItems = require('./listAllActionItems');

function addActionItem(action) {
  if (!action) {
    console.log(
      chalk.red.bold('')
    )
  }
  const newActionItem = {
    text: action,
    complete: false,
    createdAt: new Date(),
  }
  const existingActions = config.get(ACTIONS_LIST) || [];
  config.set(ACTIONS_LIST, [newActionItem, ...existingActions]);
  console.log(
    chalk.green('✅ New action has been added!\n')
  )
  listAllActionItems();
}

module.exports = addActionItem;