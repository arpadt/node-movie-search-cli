const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const vorpal = require('vorpal')();

const { getMovieDataFromUser, getSelectedMovieFromUser } = require('./src/user-inputs');
const { getMovieDataFromDB, getMovieDetails } = require('./src/requests');

figlet('Movies', (_, data) => {
  console.log(chalk.cyan(data));

  vorpal
    .command('search', 'Start searching')
    .action(async () => {
      try {
        const { movieTitle, movieType } = await getMovieDataFromUser();
        const movieDataFromDB = await getMovieDataFromDB(movieTitle, movieType, process.env.API_KEY);
        const { movieId } = await getSelectedMovieFromUser(movieDataFromDB);
        const result = await getMovieDetails(movieId, process.env.API_KEY);
        vorpal.log(chalk.green(JSON.stringify(result, null, 2)));
      } catch (error) {
        vorpal.log(chalk.red(error));
      }

      return;
    });

  vorpal
    .delimiter('Movies$')
    .show();
});
