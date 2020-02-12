const chai = require('chai');
const expect = chai.expect;

const sampleUsers = require ('../data/sample-users.js');
const sampleSleep = require ('../data/sample-sleep.js');
const User = require ('../src/User.js');
const UserRepository = require ('../src/UserRepository.js');
const SleepProfile = require ('../src/SleepProfile.js');

let userRepo;
let user;
let userData;
let sleep;

describe('SleepProfile', function() {
  beforeEach(() => {
    userRepo = new UserRepository(sampleUsers);
    userData = userRepo.getUserData(4);
    user = new User(userData);
    sleep = new SleepProfile(user.id, sampleSleep);
  })

  it('should be a function', () => {
    expect(SleepProfile).to.be.a('function');
  });

  it('should store a list of sleep entries for its user', () => {
    expect(sleep.entries).to.deep.equal([{
      "userID": 4,
      "date": "2019/06/15",
      "hoursSlept": 5.4,
      "sleepQuality": 3
    }, {
      "userID": 4,
      "date": "2019/06/16",
      "hoursSlept": 8.3,
      "sleepQuality": 4.5
    }, {
      "userID": 4,
      "date": "2019/06/17",
      "hoursSlept": 5.7,
      "sleepQuality": 1.1
    }]);
  });

  it('should be able to calculate average hours of sleep for all time', () => {
    expect(sleep.calculateAvgAllTime('hoursSlept')).to.equal(6.5);
  });

  it('should be able to calculate average quality of sleep for all time', () => {
    expect(sleep.calculateAvgAllTime('sleepQuality')).to.equal(2.9);
  });

  it('should be able to return an array of entries for a week given an end date', () => {
    expect(sleep.findDateRange('2019/06/17')).to.deep.equal([
      { userID: 4, date: '2019/06/15', hoursSlept: 5.4, sleepQuality: 3 },
      { userID: 4, date: '2019/06/16', hoursSlept: 8.3, sleepQuality: 4.5 },
      { userID: 4, date: '2019/06/17', hoursSlept: 5.7, sleepQuality: 1.1 }
    ]);
  });

  it('should be able to return an array of hours slept for a week', () => {
    expect(sleep.findSleepInfoWeek('2019/06/17', 'hoursSlept')).to.deep.equal([5.4, 8.3, 5.7]);
  });

  it('should be able to return an array of sleep quality for a week', () => {
    expect(sleep.findSleepInfoWeek('2019/06/17', 'sleepQuality')).to.deep.equal([3, 4.5, 1.1]);
  });

  it('should be able to find hours slept for a given night', () => {
    expect(sleep.findSleepDay('2019/06/17', 'hoursSlept')).to.equal(5.7);
  });

  it('should be able to find sleep quality for a given night', () => {
    expect(sleep.findSleepDay('2019/06/17', 'sleepQuality')).to.equal(1.1);
  });

  it('should be able to return the latest entry', () => {
    expect(sleep.findLastEntry()).to.equal('2019/06/17');
  });
})
