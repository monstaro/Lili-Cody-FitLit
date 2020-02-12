const chai = require('chai');
const expect = chai.expect;


const sampleUsers = require ('../data/sample-users.js')
const UserRepository = require ('../src/UserRepository.js')

let userRepo;

describe('UserRepo', function() {

  beforeEach(() => {
    userRepo = new UserRepository(sampleUsers)
  });

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should load in all user data', () => {
    expect(userRepo.data).to.deep.equal(sampleUsers)
  });

  it('should return a users data when given a certain id', () => {
    expect(userRepo.getUserData(2)).to.equal(sampleUsers[1])
  });

  it('should determine the avg step goal of all users', () => {
    expect(userRepo.findAvgStepGoal()).to.equal(6400)
  });
})
