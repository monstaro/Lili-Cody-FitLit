class SleepSummary {
  constructor(data) {
    this.data = data;
  }

  findAvgSleepQuality() {
    const total = this.data.reduce((acc, entry) => {
      acc += entry.sleepQuality;
      return acc;
    }, 0);
    const avg = total / this.data.length;
    return Math.round(avg * 10) / 10;
  }

  findDateRange(endDate) {
    const lastDate = new Date(endDate);
    const subtractWeek = () => {
      return new Date(lastDate.getTime() - (7 * 24 * 60 * 60 * 1000))
    }
    const firstDate = subtractWeek();
    const datesInRange = this.data.filter(entry => {
      const entryDate = new Date(entry.date);
      return firstDate < entryDate && entryDate <= lastDate;
    });
    return datesInRange;
  }

  findBestQualitySleepers(endDate) {
    // Filter by dates (startDate + next 7 days)
    // Create an array of objects for all sleep averages for that week using reduce {userId: , sleepQualityAvg: }
    // Filter again for sleepQualityAvg > 3
  }

  findWorstQualitySleepers(endDate) {
    // We added this method
    // Potentially, time permitting, we could give these people sleep suggestions/docs in their areas
  }

  findLongestSleeper(date) {
    // Use reduce and Math.max to find the highest sleep number
    // Use filter to find the users who hit that sleep number
  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepSummary;
}
