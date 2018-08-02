const chalk = require('chalk');
const figlet = require('figlet');
const vorpal = require('vorpal')();

figlet('Movies', (_, data) => {
  console.log(chalk.cyan(data));

  vorpal
    .command('search', 'Displays the search options')
    .action(async () => {
      vorpal.log(chalk.yellow('Say hello!'));
    });

  vorpal
    .delimiter('Movies$')
    .show();
});
