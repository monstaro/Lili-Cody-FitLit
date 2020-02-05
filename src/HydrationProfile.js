const sampleHydration = require ('../data/sample-hydration.js')
const sampleUsers = require('../data/sample-users.js')

// const hydrationData = require('../data/hydration.js')


class HydrationProfile {
  constructor(userid) {
    this.id = userid
  }

  calculateAllTimeOzAvg() {
    let usersOunces = sampleHydration.filter(drinker => drinker.userID === this.id);

    return Math.floor(usersOunces.reduce((acc, cur) => {
      acc += cur.numOunces;
      return acc
    }, 0) / usersOunces.length)
  }

  findOzConsumed(date) {
    // Filter entries array for specific date
    // Reduce those ounces to one return value

    return sampleHydration.filter(drinker => drinker.userID === this.id).find(drinker => drinker.date === date).numOunces
  }

  calculateWeekAvg(startDate) {
    // Filter for date startDate < x < startDate + 7 (a week later)
    // Reduce to get avg
    let matchId = sampleHydration.filter(drinker => drinker.userID === this.id);
    return Math.floor(matchId.reduce((acc, cur) => {
      acc += cur.numOunces
      return acc
    }, 0) / matchId.length)
  }
}

if (typeof module !== 'undefined') {
  module.exports = HydrationProfile;
}
