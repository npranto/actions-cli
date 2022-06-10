# actions-cli

A Node.js CLI command to keep track of your actions items for each day

## Installation

1. Install `actions-cli` globally on your machine
```sh
npm install actions-cli -g
```

2. Start using the CLI to keep track of all your action items or todos

```sh
actions --help
```

## Usage

```md
Usage: actions [options] [command]

Options:
  -h, --help        display help for command

Commands:
  list [options]    Lists your actions items
                    i.e.
                    - `actions list` (lists all of your actions items)
                    - `actions list --today` (lists all of your actions items for today)
                    - `actions list --yesterday` (lists all of your actions items from yesterday)

  add <actions...>  Add new action item(s), i.e., `actions add "buy milk" "do homework"`
  
  remove [options]  Remove action item(s)
                    i.e.
                    - `actions remove --last` (removes the most recent action item added to list)
                    - `actions remove --items 2 3` (removes the provided action ids, in this case, ids 2 and 3)
  
  done [options]    Marks action item(s) as complete
                    i.e.
                    - `actions done --all` (marks all the action items as complete)
                    - `actions done --last` (Marks the most recent action item as complete)
                    - `actions done --items 2 3` (marks the provided action ids as done, in this case, ids 2 and 3)
  
  undone [options]  Marks action item(s) as complete
                    i.e.
                    - `actions undone --all` (marks all the action items as not complete)
                    - `actions undone --last` (Marks the most recent action item as not complete)
                    - `actions undone --items 2 3` (marks the provided action ids as not done, in this case, ids 2 and 3)
  
  filter [options]  Filters action item(s) based on given flags
                    i.e.
                    - `actions filter --date 6/10/2022` (filters action items created on 6/10/2022, format [MONTH]/[DATE]/[YEAR])
                    - `actions filter --includes "[PROJ-43545]"` (filters action items that includes the text ("[PROJ-43545]") in it
                    (Note: either text or regex are allowed as a parameter)
  
  help [command]    display help for command
```
