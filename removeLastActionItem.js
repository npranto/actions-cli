const chalk = require('chalk');
const config = require('./config');
const { ACTIONS_LIST } = require('./constants');
const listAllActionItems = require('./listAllActionItems');

function removeLastActionItem({ last } = {}) {
  // remove the last item added to list
  // - get all the items from the list
  const existingActions = config.get(ACTIONS_LIST) || [];
  // - if list is empty, log 'Looks like you don't have any action items right now'
  if (!existingActions || !existingActions.length) {
    console.log(
      chalk.green('Looks like you don\'t have any action items right now 👌')
    );
  } else {
    // - filter out index === 0 and return the new list
    const recentActionRemovedList = existingActions.filter((_, index) => index !== 0)
    // - set config's action list key w/ new list w/ first one removed
    config.set(ACTIONS_LIST, recentActionRemovedList);
    console.log(
      chalk.green('✅ Most recent action item has been removed!\n')
    )
    // - call listAllActionItems();
    listAllActionItems();
  }
}

module.exports = removeLastActionItem;