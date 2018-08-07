const chalk = require('chalk');
const figlet = require('figlet');
const vorpal = require('vorpal')();

const { getMovieDataFromDB, getMovieDetails } = require('./modules/requests');
const { getMovieTitleFromUser, getSelectedMovieFromUser } = require('./modules/user-inputs');

figlet('Movies', (_, data) => {
  console.log(chalk.cyan(data));

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.log(chalk.red('Please enter your API key!'));
    return;
  }

  vorpal
    .command('search', 'Start searching')
    .action(async () => {
      try {
        const { movieTitle, movieType } = await getMovieTitleFromUser();
        const movieDataFromDB = await getMovieDataFromDB(movieTitle, movieType, apiKey);
        const { movieId } = await getSelectedMovieFromUser(movieDataFromDB);
        const {
          Title: title,
          Year: year,
          Runtime: runtime,
          Director: director,
          Actors: actors,
          Plot: plot,
          imdbRating: rating
        } = await getMovieDetails(movieId, apiKey);

        vorpal.log(chalk.green(
          JSON.stringify({ title, year, runtime, director, actors, plot, rating }, null, 2)
        ));
      } catch (error) {
        vorpal.log(chalk.red(error));
      }
    })
    .cancel(() => {
      vorpal.log(chalk.red('Search has been interrupted.'));
    });

  vorpal
    .delimiter('Movies$')
    .show();
});
