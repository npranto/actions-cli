const chalk = require('chalk');
const { program } = require('commander');
const config = require('../config');
const { ACTIONS_LIST } = require('../constants');
const listActionItems = require('./listActionItems');

function addActionItem(actions = []) {
	if (!Array.isArray(actions) || !actions.length) {
		program.help();
	}

	const newActionsList = actions.map((action) => ({
		text: action,
		complete: false,
		createdAt: new Date(),
	}));
	const existingActions = config.get(ACTIONS_LIST) || [];
	config.set(ACTIONS_LIST, [...newActionsList, ...existingActions]);
	console.log(
		chalk.green(
			`✅ New ${
				newActionsList.length > 1 ? 'actions have' : 'action has'
			} been added!\n`
		)
	);
	listActionItems();
}

module.exports = addActionItem;
