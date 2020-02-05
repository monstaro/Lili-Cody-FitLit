class SleepProfile {
  constructor(userID, data) {
    this.entries = data.filter(user => user.userID === userID)
  }

  calculateAvgHoursAllTime() {
    const totalSleep = this.entries.reduce((acc, entry) => {
      acc += entry.hoursSlept;
      return acc;
    }, 0);
    const avg = totalSleep / this.entries.length;
    return Math.round(avg * 10) / 10;
  }

  calculateAvgHoursWeek(startDate) {
    
  }

  calculateSleepQualityAllTime() {

  }

  calculateSleepQualityWeek() {

  }

  findHoursSlept(date) {

  }

  findSleepQuality(date) {

  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepProfile;
}
