const { program } = require("commander");
const addActionItem = require("./utils/addActionItem");
const filterActionItems = require("./utils/filterActionItems");
const listActionItems = require("./utils/listActionItems");
const markDoneActionItems = require("./utils/markDoneActionItems");
const markUndoneActionItems = require("./utils/markUndoneActionItems");
const removeActionItems = require("./utils/removeActionItems");

program
  .command("list")
  .description(
    "Lists your actions items\ni.e.\n- `actions list` (lists all of your actions items)\n- `actions list --today` (lists all of your actions items for today)\n- `actions list --yesterday` (lists all of your actions items from yesterday)"
  )
  .option("-t, --today", "All the action items for today")
  .option("-y, --yesterday", "All the action items from yesterday")
  .action(listActionItems);

program
  .command("add <actions...>")
  .description(
    'Add new action item(s), i.e., `actions add "buy milk" "do homework"` (adds 2 new action items to your list)'
  )
  .action(addActionItem);

program
  .command("remove")
  .description(
    "Remove action item(s)\ni.e.\n- `actions remove --last` (removes the most recent action item added to list)\n- `actions remove --items 2 3` (removes the provided action ids, in this case, ids 2 and 3)"
  )
  .option("-l, --last", "Removes the most recent action item added to list")
  .option(
    "-i, --items <items...>",
    "Removes the provided action ids, i.e., (1)"
  )
  .action(removeActionItems);

program
  .command("done")
  .description(
    "Marks action item(s) as complete\ni.e.\n- `actions done --all` (marks all the action items as complete)\n- `actions done --last` (marks the most recent action item as complete)\n- `actions done --items 2 3` (marks the provided action ids as done, in this case, ids 2 and 3)"
  )
  .option("-a, --all", "Marks all the action items as complete")
  .option("-l, --last", "Marks the most recent action item as complete")
  .option(
    "-i, --items <items...>",
    "Marks the provided action ids as complete, i.e., (1)"
  )
  .action(markDoneActionItems);

program
  .command("undone")
  .description(
    "Marks action item(s) as complete\ni.e.\n- `actions undone --all` (marks all the action items as not complete)\n- `actions undone --last` (marks the most recent action item as not complete)\n- `actions undone --items 2 3` (marks the provided action ids as not done, in this case, ids 2 and 3)"
  )
  .option("-a, --all", "Marks all the action items as not complete")
  .option("-l, --last", "Marks the most recent action item as not complete")
  .option(
    "-i, --items <items...>",
    "Marks the provided action ids as not complete, i.e., (1)"
  )
  .action(markUndoneActionItems);

program
  .command("filter")
  .description(
    'Filters action item(s) based on given flags\ni.e.\n- `actions filter --date 6/10/2022` (filters action items created on 6/10/2022, format [MONTH]/[DATE]/[YEAR])\n- `actions filter --includes "[PROJ-43545]"` (filters action items that includes the text ("[PROJ-43545]") in it (Note: either text or regex are allowed as a parameter)'
  )
  .option(
    "-d, --date <date>",
    "Filters action items created on the provided date"
  )
  .option(
    "-sw, --includes <content>",
    "Filters action items that includes provided text"
  )
  .action(filterActionItems);

program.parse();
