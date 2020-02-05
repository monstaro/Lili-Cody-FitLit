class HydrationProfile {
  constructor(userid, data) {
    this.id = userid
    this.entries = data.filter(user => user.userID === this.id)
  }

  calculateAllTimeOzAvg() {
    return Math.floor(this.entries.reduce((acc, cur) => {
      acc += cur.numOunces;
      return acc
    }, 0) / this.entries.length)
  }

  findOzConsumed(date) {
    return this.entries.find(drinker => drinker.date === date).numOunces
  }

  findOzForWeek(startDate) {
    const firstDate = new Date(startDate)
    console.log(firstDate)
    const addWeek = () => {
      return new Date(firstDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    };
    const lastDate = addWeek();
    const datesInRange = this.entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return firstDate <= entryDate && entryDate < lastDate;
    })
    console.log(datesInRange)
    return datesInRange.map(date => date.numOunces)
  }

  findLastEntry() {
    return this.entries[this.entries.length - 1].date;
  }
}

if (typeof module !== 'undefined') {
  module.exports = HydrationProfile;
}
