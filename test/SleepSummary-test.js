const chai = require('chai');
const expect = chai.expect;

const sampleUsers = require ('../data/sample-users.js');
const sampleSleep = require ('../data/sample-sleep.js');
const UserRepository = require ('../src/UserRepository.js');
const SleepSummary = require ('../src/SleepSummary.js');

describe('SleepProfile', function() {
  beforeEach(() => {
    userRepo = new UserRepository(sampleUsers);
    sleepSum = new SleepSummary(sampleSleep);
  })

  it('should be a function', () => {
    expect(SleepSummary).to.be.a('function');
  });

  it('should store all sleep data', () => {
    expect(sleepSum.data).to.deep.equal(sampleSleep);
  });

  it('should be able to find the avg sleep quality for all users', () => {
    expect(findAvgSleepQuality()).to.equal();
  });

  it('should be able to find the best quality sleepers for a week', () => {
    expect(findBestQualitySleepers('2019/06/17')).to.equal();
  });

  it('should be able to find the worst quality sleepers for a week', () => {
    expect(findBestQualitySleepers('2019/06/17')).to.equal();
  });

  it('should be able to find the longest sleepr(s) for a given date', () => {
    expect(findLongestSleeper('2019/06/17')).to.equal();
  });
});
