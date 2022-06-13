const chalk = require('chalk');
const config = require('../config');
const { ACTIONS_LIST } = require('../constants');
const getYesterdayDate = require('./getYesterdayDate');

function listActionItems(options = {}) {
	const { today = false, yesterday = false } = options;
	const allActions = config.get(ACTIONS_LIST);
	if (!allActions || !allActions.length) {
		console.log(chalk.green("Nice! You don't have any action items 👌"));
	} else if (today) {
		const actionsForToday = allActions.filter(
			(action) =>
				new Date(action.createdAt).toDateString() === new Date().toDateString()
		);
		console.log(
			chalk.gray.bold(`List of all your actions for`),
			chalk.green.underline('TODAY'),
			chalk.gray.bold(
				`(Total: ${actionsForToday.length}): ✅ COMPLETE | ❌ NOT COMPLETE \n`
			)
		);
		actionsForToday.forEach((action, index) =>
			action?.complete
				? console.log(chalk.green.bold(`✅ (${index + 1}) ${action.text}`))
				: console.log(chalk.gray.bold(`❌ (${index + 1}) ${action.text}`))
		);
	} else if (yesterday) {
		const actionsFromYesterday = allActions.filter(
			(action) =>
				new Date(action.createdAt).toDateString() ===
				getYesterdayDate().toDateString()
		);
		console.log(
			chalk.gray.bold(`List of all your actions from`),
			chalk.green.underline('YESTERDAY'),
			chalk.gray.bold(
				`(Total: ${actionsFromYesterday.length}): ✅ COMPLETE | ❌ NOT COMPLETE \n`
			)
		);
		actionsFromYesterday.forEach((action, index) =>
			action?.complete
				? console.log(chalk.green.bold(`✅ (${index + 1}) ${action.text}`))
				: console.log(chalk.gray.bold(`❌ (${index + 1}) ${action.text}`))
		);
	} else {
		console.log(
			chalk.gray.bold(
				`List of all your actions (Total: ${allActions.length}): ✅ COMPLETE | ❌ NOT COMPLETE \n`
			)
		);
		allActions.forEach((action, index) =>
			action?.complete
				? console.log(chalk.green(`✅ (${index + 1}) ${action.text}`))
				: console.log(chalk.gray(`❌ (${index + 1}) ${action.text}`))
		);
	}
}

module.exports = listActionItems;
