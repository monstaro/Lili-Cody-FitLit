class SleepSummary {
  constructor(data) {
    this.data = data;
  }
  findAvgSleepQuality() {

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