#! /usr/bin/env node

const { program } = require('commander');
const addActionItem = require('./addActionItem');
const listAllActionItems = require('./listAllActionItems');
const removeLastActionItem = require('./removeLastActionItem');

// - program.command: takes a string that defines the format of the command
// - program.description: describes the command for the user. This is helpful when the user executes our tool with the option --help
// - program.option: the options that this command can take, if any
// - program.action: the action that this command performs, which will be a function

// all commands for cli:
// - ✅actions list
// - actions list --today
// - actions list --yesterday 
// - ✅actions add
// - actions remove --items 1 2
// - actions remove --last
// - actions filter date=1/1/2020
// - actions starts-with="proj:bob"

program
  .command('list')
  .description('Lists all of your actions items, i.e., `actions list`')
  .action(listAllActionItems)

program
  .command('add <action>')
  .description('Add a new action item, i.e., `actions add "write unit tests for utils.js file"`')
  .action(addActionItem)

program
  .command('remove')
  .description('Add a new action item, i.e., `actions add "write unit tests for utils.js file"`')
  .option('-l, --last', 'Removes the most recent action item added to list')
  .action(removeLastActionItem)

program.parse();
