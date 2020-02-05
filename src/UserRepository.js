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
