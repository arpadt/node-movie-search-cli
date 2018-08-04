const rp = require('request-promise-native');

const getMovieDataFromDB = (movieTitle, movieType, apiKey) => {
  const options = {
    method: 'GET',
    uri: `http://www.omdbapi.com/?s=${ movieTitle }&type=${ movieType }&apikey=${ apiKey }`,
    json: true
  };

  return rp(options);
};

const getMovieDetails = (movieId, apiKey) => {
  const options = {
    method: 'GET',
    uri: `http://www.omdbapi.com/?i=${ movieId }&apikey=${ apiKey }`,
    json: true
  };

  return rp(options);
}

module.exports = {
  getMovieDataFromDB,
  getMovieDetails
};
