// const userData = require('../data/users.js')
// const sampleData = require('../data/sample-users.js')

class UserRepository {
  constructor(data) {
    this.data = data

  }

  getUserData(id) {
    //replace with userData
    return this.data.find(user => user.id === id)
  }

  findAvgStepGoal() {
    let average = this.data.reduce((acc, cur) => {
      acc += cur.dailyStepGoal
      return acc;
    }, 0)
    return (average / this.data.length)
  }

  findAvgSleepQuality() {

  }

  findBestQualitySleepers(startDate) {
    // Filter by dates (startDate + next 7 days)
    // Create an array of objects for all sleep averages for that week using reduce {userId: , sleepQualityAvg: }
    // Filter again for sleepQualityAvg > 3

  }

  findWorstQualitySleepers(startDate) {
    // We added this method
    // Potentially, time permitting, we could give these people sleep suggestions/docs in their areas
  }

  findLongestSleeper(date) {
    // Use reduce and Math.max to find the highest sleep number
    // Use filter to find the users who hit that sleep number
  }

  findAvgStairsClimbed(date) {

  }

  findAvgStepsTaken(date) {

  }

  findAvgMinutesActive(date) {

  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
