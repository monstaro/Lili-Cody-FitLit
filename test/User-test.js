const chai = require('chai');
const expect = chai.expect;


const sampleUsers = require ('../data/sample-users.js')
const User = require ('../src/User.js')
const UserRepository = require ('../src/UserRepository.js')

let userRepo;
let user;
let data;

describe('UserRepo', function() {
  beforeEach(() => {
    userRepo = new UserRepository(sampleUsers)
    data = userRepo.getUserData(3)
    user = new User(data)
  })
  it('should be a function', () => {
    expect(User).to.be.a('function');
  });
  it('should contain the users id', () => {
    expect(user.id).to.equal(3)
  })
  it('should contain the users name', () => {
    expect(user.name).to.equal('Herminia Witting')
  })
  it('should contain the users address', () => {
    expect(user.address).to.equal('85823 Bosco Fork, East Oscarstad MI 85126-5660')
  })
  it('should contain the users email', () => {
    expect(user.email).to.equal('Elwin.Tromp@yahoo.com')
  })
  it('should contain the users strideLength', () => {
    expect(user.strideLength).to.equal(4.4)
  })
  it('should contain the users daily step goal', () => {
    expect(user.dailyStepGoal).to.equal(5000)
  })
  it('should contain the users friends', () => {
    expect(user.friends).to.deep.equal([
      19,
      11,
      42,
      33
    ])
  })
  it('should be able to return the users first name', () => {
    expect(user.returnFirstName()).to.equal('Herminia')
  })
})