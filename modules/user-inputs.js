const inquirer = require('inquirer');

const getMovieTitleFromUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'movieTitle',
      message: 'Enter the title or part of the title',
      filter: (title) => title.toLowerCase(),
      validate: isTitleEntered
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

const isTitleEntered = (title) => {
  if (title) return true;
  return 'Please enter a title!';
};

const getSelectedMovieFromUser = (movies) => {
  if (movies.Error) {
    return Promise.reject('The requested movie is not found.');
  }

  return inquirer.prompt([
    {
      type: 'list',
      name: 'movieId',
      message: 'Select a movie from the list',
      choices: createMovieTitleList(movies.Search)
    }
  ]);
};

const createMovieTitleList = (movies) => {
  return movies.map(({ Title: title, Year: year, imdbID: id }) => {
    return {
      name: `${ title } (${ year })`,
      value: id
    };
  });
};

module.exports = {
  createMovieTitleList,
  isTitleEntered,
  getMovieTitleFromUser,
  getSelectedMovieFromUser
};
