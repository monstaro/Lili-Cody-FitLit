const sampleHydration = require ('../data/sample-hydration.js')
const sampleUsers = require('../data/sample-users.js')

// const hydrationData = require('../data/hydration.js')


class HydrationProfile {
  constructor(userid, data) {
    this.id = userid
    this.entries = data.filter(user => user.userID === this.id)
  }

  calculateAllTimeOzAvg() {
    // let usersOunces = sampleHydration.filter(drinker => drinker.userID === this.id);
    return Math.floor(this.entries.reduce((acc, cur) => {
      acc += cur.numOunces;
      return acc
    }, 0) / this.entries.length)
  }

  findOzConsumed(date) {
    // Filter entries array for specific date
    // Reduce those ounces to one return value

    return this.entries.find(drinker => drinker.date === date).numOunces
  }

  calculateWeekAvg(startDate) {
    // Filter for date startDate < x < startDate + 7 (a week later)
    // Reduce to get avg

    // take startDate and create an array that increments the day 7 times

    const firstDate = new Date(startDate)
    console.log(firstDate)
    return Math.floor(this.entries.reduce((acc, cur) => {
      acc += cur.numOunces
      return acc
    }, 0) / this.entries.length)
  }
}

if (typeof module !== 'undefined') {
  module.exports = HydrationProfile;
}
