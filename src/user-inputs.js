const inquirer = require('inquirer');
const vorpal = require('vorpal')();

module.exports.getMovieDataFromUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'movieTitle',
      message: 'Enter the title or part of the title',
      filter: (title) => title.toLowerCase(),
      validate: (input) => {
        if (input) return true;

        return 'Please enter title!';
      }
    },
    {
      type: 'list',
      name: 'movieType',
      message: 'Select the type of the movie',
      choices: ['Movie', 'Series', 'Episode', 'All'],
      filter: (type) => type.toLowerCase()
    }
  ]);
};

module.exports.getSelectedMovieFromUser = (movies) => {
  const titlesAndYears = movies.Search.map(({ Title: title, Year: year, imdbID: id }) => {
    return {
      name: `${ title } (${ year })`,
      value: id
    };
  });

  return inquirer.prompt([
    {
      type: 'list',
      name: 'movieId',
      message: 'Select a movie from the list',
      choices: titlesAndYears
    }
  ]);
};
