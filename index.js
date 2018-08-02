const chalk = require('chalk');
const figlet = require('figlet');
const vorpal = require('vorpal');

const vorpalInstance = vorpal();

figlet('Movies', (_, data) => {
  console.log(chalk.cyan(data));
});
