const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const vorpal = require('vorpal')();

figlet('Movies', (_, data) => {
  console.log(chalk.cyan(data));

  vorpal
    .command('search', 'Start searching')
    .action(async () => {
      const movieTitle = await inquirer.prompt([
        {
          type: 'input',
          name: 'movieTitle',
          message: 'Enter the title or part of the title',
          validate: (input) => {
            if (input) return true;

            return 'Please enter title!';
          }
        }
      ]);
      vorpal.log(chalk.green(JSON.stringify(movieTitle, null, 2)));
      return;
    });

  vorpal
    .delimiter('Movies$')
    .show();
});
