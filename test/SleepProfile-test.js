const chai = require('chai');
const expect = chai.expect;

const sampleUsers = require ('../data/sample-users.js');
const sampleSleep = require ('../data/sample-sleep.js');
const User = require ('../src/User.js');
const UserRepository = require ('../src/UserRepository.js');
const SleepProfile = require ('../src/SleepProfile.js');

let userRepo;
let user;
let data;
let sleep;

describe('UserRepo', function() {
  beforeEach(() => {
    userRepo = new UserRepository(sampleUsers);
    data = userRepo.getUserData(4);
    user = new User(data);
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
    },{
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
    expect(sleep.calculateAvgHoursAllTime()).to.equal(6.5)
  });

  it('should be able to calculate average hours of sleep for a given week', () => {
    expect(sleep.calculateAvgHoursWeek('2019/06/15')).to.equal(6.5)
  });
})
