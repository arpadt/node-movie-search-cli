const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { getSelectedMovieFromUser } = require('./user-inputs');

const { expect } = chai.use(chaiAsPromised);

describe('#user-inputs', () => {
  it('returns error message if movie does not exit in the database', async () => {
    const errorObj = { Error: 'API error' };

    // const selectedMovie = await getSelectedMovieFromUser(errorObj);
    expect(() => getSelectedMovieFromUser(errorObj)).to.throw();

    // expect(selectedMovie).to.be.equal('The requested movie is not found.');
  });
});
