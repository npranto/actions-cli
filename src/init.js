const { program } = require('commander');
const addActionItem = require('./utils/addActionItem');
const listActionItems = require('./utils/listActionItems');
const markDoneActionItems = require('./utils/markDoneActionItems');
const markUndoneActionItems = require('./utils/markUndoneActionItems');
const removeActionItems = require('./utils/removeActionItems');

// - program.command: takes a string that defines the format of the command
// - program.description: describes the command for the user. This is helpful when the user executes our tool with the option --help
// - program.option: the options that this command can take, if any
// - program.action: the action that this command performs, which will be a function

// all commands for cli:
// - ✅actions list
// - ✅actions list --today
// - ✅actions list --yesterday 
// - ✅actions add "get milk" "buy bike"
// - ✅actions remove --items 1 2
// - ✅actions remove --last
// - actions done --items 1 2
// - actions filter date=1/1/2020
// - actions starts-with="proj:bob"

program
  .command('list')
  .description('Lists all of your actions items, i.e., `actions list`')
  .option('-t, --today', 'All the action items for today')
  .option('-y, --yesterday', 'All the action items from yesterday')
  .action(listActionItems)

program
  .command('add <actions...>')
  .description('Add new action item(s), i.e., `actions add "buy milk" "do homework"`')
  .action(addActionItem)

program
  .command('remove')
  .description('Remove action item(s)\ni.e.\n- `actions remove --last` (removes the most recent action item added to list)\n- `actions remove --items 2 3` (removes the provided action ids, in this case, ids 2 and 3)')
  .option('-l, --last', 'Removes the most recent action item added to list')
  .option('-i, --items <items...>', 'Removes the provided action ids, i.e., (1)')
  .action(removeActionItems)

program
  .command('done')
  .description('Marks action item(s) as complete\ni.e.\n- `actions done --all` (marks all the action items as complete)\n- `actions done --last` (Marks the most recent action item as complete)\n- `actions done --items 2 3` (marks the provided action ids as done, in this case, ids 2 and 3)')
  .option('-a, --all', 'Marks all the action items as complete')
  .option('-l, --last', 'Marks the most recent action item as complete')
  .option('-i, --items <items...>', 'Marks the provided action ids as complete, i.e., (1)')
  .action(markDoneActionItems)

program
  .command('undone')
  .description('Marks action item(s) as complete\ni.e.\n- `actions undone --all` (marks all the action items as not complete)\n- `actions undone --last` (Marks the most recent action item as not complete)\n- `actions undone --items 2 3` (marks the provided action ids as not done, in this case, ids 2 and 3)')
  .option('-a, --all', 'Marks all the action items as not complete')
  .option('-l, --last', 'Marks the most recent action item as not complete')
  .option('-i, --items <items...>', 'Marks the provided action ids as not complete, i.e., (1)')
  .action(markUndoneActionItems)

program.parse();
