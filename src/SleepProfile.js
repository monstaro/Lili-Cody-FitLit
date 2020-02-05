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

  findDateRange(startDate) {
    const firstDate = new Date(startDate);
    const addWeek = () => {
      return new Date(firstDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    }
    const endDate = addWeek();
    const datesInRange = this.entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return firstDate <= entryDate && entryDate < endDate;
    });
    return datesInRange;
  }

  findHoursSleptForWeek(startDate) {
    const datesInRange = this.findDateRange(startDate);
    const sleeps = datesInRange.map(date => date.hoursSlept);
    return sleeps;
  }

  calculateSleepQualityAllTime() {
    const totalSleepQuality = this.entries.reduce((acc, entry) => {
      acc += entry.sleepQuality;
      return acc;
    }, 0);
    const avg = totalSleepQuality / this.entries.length;
    return Math.round(avg * 10) / 10;
  }

  findSleepQualityForWeek(startDate) {
    const datesInRange = this.findDateRange(startDate);
    const qualities = datesInRange.map(date => date.sleepQuality);
    return qualities;
  }

  findHoursSlept(date) {
    const specificEntry = this.entries.find(entry => entry.date === date);
    return specificEntry.hoursSlept;
  }

  findSleepQuality(date) {
    const specificEntry = this.entries.find(entry => entry.date === date);
    return specificEntry.sleepQuality;
  }

  findLastEntry() {
    return this.entries[this.entries.length - 1].date;
  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepProfile;
}
