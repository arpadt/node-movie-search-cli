const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const inquirer = require('inquirer');
const sinon = require('sinon');

const {
  createMovieTitleList,
  getSelectedMovieFromUser,
  isTitleEntered
} = require('./user-inputs');

const { expect } = chai.use(chaiAsPromised);

describe('#user-inputs', () => {
  describe('the prompt', () => {
    it('returns error message if movie does not exit in the database', async () => {
      const responseFromDB = { Error: 'Error message from DB' };

      const responseFunc = () => getSelectedMovieFromUser(responseFromDB);

      await expect(responseFunc()).to.be.rejectedWith('The requested movie is not found.');
    });

    it('should return a resolved promise if the movie exists', async () => {
      const inquirerStub = sinon.stub(inquirer, 'prompt');
      inquirerStub.resolves({ movieId: 'tt3896198' });
      const responseFromDB = {
        Response: 'True',
        Search: []
      };

      const responseFunc = () => getSelectedMovieFromUser(responseFromDB);

      await expect(responseFunc()).to.be.fulfilled;
      inquirerStub.restore();
    });
  });

  describe('#createMovieTitleList', () => {
    it('returns name and value properties', () => {
      const responseFromDB = [
        {
          Title: 'Taken',
          Year: '2008',
          imdbID: 'tt0936501',
          Type: 'movie',
        },
        {
          Title: 'Taken 2',
          Year: '2012',
          imdbID: 'tt1397280',
          Type: 'movie',
        }
      ];
      const expectedNameAndValue = [
        {
          name: 'Taken (2008)',
          value: 'tt0936501'
        },
        {
          name: 'Taken 2 (2012)',
          value: 'tt1397280'
        }
      ];

      const nameAndValue = createMovieTitleList(responseFromDB);

      expect(nameAndValue).to.be.deep.equal(expectedNameAndValue);
    });
  });

  describe('#isTitleEntered validations', () => {
    it('should return true if a string is entered', () => {
      const userInput = 'Taken';

      const validationResult = isTitleEntered(userInput);

      expect(validationResult).to.be.true;
    });

    it('returns a warning if nothing is entered', () => {
      const userInput = '';

      const validationResult = isTitleEntered(userInput);

      expect(validationResult).to.be.equal('Please enter a title!');
    });
  });
});
