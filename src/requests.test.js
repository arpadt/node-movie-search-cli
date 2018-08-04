const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');

const { getMovieDataFromDB } = require('./requests');

const { expect } = chai.use(chaiAsPromised);

describe('GET omdbapi', () => {
  it('returns an error if there is no API key', async () => {
    const movieTitle = 'bourne';
    const movieType = 'movie';

    const responseFromOmdb = {
      Response: 'False',
      Error: 'No API key provided.'
    };
    nock('http://www.omdbapi.com')
      .get(`/?s=${ movieTitle }&type=${ movieType }&apikey=${ undefined }`)
      .reply(401, responseFromOmdb);

    const movieData = await getMovieDataFromDB(movieTitle, movieType);

    // expect(() => getMovieDataFromDB(movieTitle, movieType)).to.throw();
    expect()
  })
});
