const { program } = require('commander');
const chalk = require('chalk');
const config = require('../config');
const { ACTIONS_LIST } = require('../constants');
const listActionItems = require('./listActionItems');

function markUndoneActionItems(options = {}) {
	const { last = false, all = false, items } = options;
	const existingActions = config.get(ACTIONS_LIST) || [];
	if (!existingActions || !existingActions.length) {
		console.log(
			chalk.green("Looks like you don't have any action items right now 👌")
		);
	} else if (last) {
		const markedActionsList = existingActions.map((action, index) => {
			if (index === 0) {
				return {
					...action,
					complete: false,
				};
			}
			return action;
		});
		config.set(ACTIONS_LIST, markedActionsList);
		console.log(
			chalk.green('✅ Most recent action item has been marked not complete!\n')
		);
		listActionItems();
	} else if (items) {
		if (!Array.isArray(items) || !items.length) {
			program.help();
		} else {
			const markedActionsList = existingActions.map((action, i) => {
				if (items.includes(`${i + 1}`)) {
					return {
						...action,
						complete: false,
					};
				}
				return action;
			});
			config.set(ACTIONS_LIST, markedActionsList);
			console.log(
				chalk.green(
					`✅ [${items.join(', ')}] action ids have been marked not complete!\n`
				)
			);
			listActionItems();
		}
	} else if (all) {
		const markedActionsList = existingActions.map((action) => ({
			...action,
			complete: false,
		}));
		config.set(ACTIONS_LIST, markedActionsList);
		console.log(chalk.green(`All actions have been marked not complete!\n`));
		listActionItems();
	} else {
		program.help();
	}
}

module.exports = markUndoneActionItems;
