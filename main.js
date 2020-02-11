const userSpan = document.getElementById('user-name');
const addressSpan = document.getElementById('address');
const emailSpan = document.getElementById('email');
const strideSpan = document.getElementById('stride-length');
const stepGoalSpan = document.getElementById('step-goal');
const friendsSpan = document.getElementById('friends');
const avgStepSpan = document.getElementById('avg-step-goal');
const todaySleep = document.getElementById('today-sleep');
const todayHydration = document.getElementById('today-hydration');
const todayQuality = document.getElementById('today-quality');
// const weekHydration = document.getElementById('week-hydration');
const hoursWeekSleep = document.getElementById('hours-week-sleep');
const qualityWeekSleep = document.getElementById('quality-week-sleep');
const allTimeAvgSleep = document.getElementById('alltime-avg-sleep');
const allTimeAvgHydration = document.getElementById('alltime-avg-hydration');
const stepsToday = document.getElementById('today-steps');
// const stepsWeek = document.getElementById('week-steps');
const stairsWeek = document.getElementById('week-stairs');
const activityMinsWeek = document.getElementById('week-activity-mins');
const compareStepsToday = document.getElementById('compare-steps');
const compareMinsToday = document.getElementById('compare-mins-active')

const activityToday = document.getElementById('today-activity');
const stepTrends = document.getElementById('step-trends');
const stairTrends = document.getElementById('stair-trends');
const minsTrends = document.getElementById('mins-trends');
const milesToday = document.getElementById('today-miles');
const stepsBox = document.getElementById('step-box');
const stairsBox = document.getElementById('stairs-box');
const minsBox = document.getElementById('mins-box');
const infoButton = document.querySelector('.info-btn')


let random = Math.floor(Math.random() * (50));
const userRepo = new UserRepository(userData);
const user = new User(userRepo.getUserData(random));
const friends = user.friends.map(friendID => {
  return friend = new User(userRepo.getUserData(friendID));
});
const friendNames = friends.map(friend => {
  return friend.returnFirstName();
});
const friendActivities = friends.map(friend => {
  return new ActivityProfile(friend, activityData);
})
const userHydration = new HydrationProfile(random, hydrationData);
const userSleep = new SleepProfile(random, sleepData);
const userActivity = new ActivityProfile(user, activityData);
const lastHydroDate = userHydration.findLastEntry();
const lastSleepDate = userSleep.findLastEntry();
const lastActivityDate = userActivity.findLastEntry();

userSpan.innerText = user.returnFirstName();
addressSpan.innerText = user.address;
emailSpan.innerText = user.email;
strideSpan.innerText = user.strideLength;
stepGoalSpan.innerText = user.dailyStepGoal;
friendsSpan.innerText = friendNames.join(', ');
avgStepSpan.innerText = userRepo.findAvgStepGoal();
todaySleep.innerText = userSleep.findHoursSlept(lastSleepDate);
todayQuality.innerText = userSleep.findSleepQuality(lastSleepDate);
todayHydration.innerText = userHydration.findOzConsumed(lastHydroDate);
// weekHydration.innerText = userHydration.findOzForWeek(lastHydroDate, 'numOunces');




stepsToday.innerText = userActivity.findSteps(lastActivityDate) + ' steps';


activityToday.innerText = userActivity.findMinutesActive(lastActivityDate) + ' minutes';
hoursWeekSleep.innerText = userSleep.findHoursSleptForWeek(lastSleepDate).map(hour => ' ' + hour + ' hrs');
qualityWeekSleep.innerText = userSleep.findSleepQualityForWeek(lastSleepDate).map(quality => ' ' + quality + '/5 Quality');
// weekHydration.innerText = userHydration.findOzForWeek(lastHydroDate, 'numOunces').map(date => ' ' + date + ' oz.');
allTimeAvgSleep.innerText = userSleep.calculateAvgHoursAllTime() + ' hrs - ' +
userSleep.calculateSleepQualityAllTime() + '/5 quality';
allTimeAvgHydration.innerText = userHydration.calculateAllTimeOzAvg() + ' oz.';
milesToday.innerText = userActivity.findMilesWalked(lastActivityDate) + ' miles';

// stepsWeek.innerText = userActivity.findDateRange(lastActivityDate).map(date => ' ' + date.numSteps + ' steps ');

stairsWeek.innerText = userActivity.findDateRange(lastActivityDate).map(date => ' ' + date.flightsOfStairs + ' flights climbed');

activityMinsWeek.innerText = userActivity.findDateRange(lastActivityDate).map(date => ' ' + date.flightsOfStairs + ' minutes');

compareStepsToday.innerText = userActivity.compareStepsToAllUsers(lastActivityDate)

compareMinsToday.innerText = (userActivity.compareMinsActiveToAllUsers(lastActivityDate) + userActivity.compareFlightsClimbedToAllUsers(lastActivityDate))




const yourTotalSteps = {
  name: 'you',
  totalSteps: userActivity.showTotalForWeek('numSteps', lastActivityDate),
  totalStairs: userActivity.showTotalForWeek('flightsOfStairs', lastActivityDate),
  totalMins: userActivity.showTotalForWeek('minutesActive', lastActivityDate)
}
const friendTotalSteps = friendActivities.map(act => {
  return {
    name: act.user.returnFirstName(),
    totalSteps: act.showTotalForWeek('numSteps', lastActivityDate),
    totalStairs: act.showTotalForWeek('flightsOfStairs', lastActivityDate),
    totalMins: act.showTotalForWeek('minutesActive', lastActivityDate)
  }
});
const youAndFriends = [yourTotalSteps, ...friendTotalSteps];
const sortHighToLow = (activity) => {
  const sorted = [...youAndFriends].sort((a, b) => {
    return b[activity] - a[activity];
  })
  return sorted;
}

const highestStepper = sortHighToLow('totalSteps');
const highestStairClimber = sortHighToLow('totalStairs');
const mostActive = sortHighToLow('totalMins');

const friendTrendStatements = (ranking, activity) => {
  const statements = ranking.map((person, indx) => {
    return `<p class="scoreboard-name ${person.name}">${indx + 1}. ${person.name} (${person[activity]})</p>`;
  })
  return statements;
}

stepsBox.innerHTML = friendTrendStatements(highestStepper, 'totalSteps').join('');
stairsBox.innerHTML = friendTrendStatements(highestStairClimber, 'totalStairs').join('');
minsBox.innerHTML = friendTrendStatements(mostActive, 'totalMins').join('');

const displayIncreases = (activity) => {
  const increases = userActivity.findThreeDayTrends(activity);
  const abrv = increases.map(inc => {
    const dates = inc.map(date => {
      return date.slice(5);
    })
    return dates;
  })
  return `${abrv[abrv.length - 1].join(' - ')}, ${abrv[abrv.length - 2].join(' - ')}, ${abrv[abrv.length - 3].join(' - ')}, and ${abrv.length - 3} other times`
}

stepTrends.innerText = displayIncreases('numSteps');
stairTrends.innerText = displayIncreases('flightsOfStairs');
minsTrends.innerText = displayIncreases('minutesActive');

// const userDetails = document.querySelector('.user-details')
// infoButton.onclick = function () {
//   userDetails.classList.toggle('hide')
// }

// console.log(userHydration.findOzForWeek(lastHydroDate, 'numOunces').map(entry => entry + 'oz'))

let hydrationChart = document.getElementById('week-hydration').getContext('2d');



var hydroChart = new Chart(hydrationChart, {
  // The type of chart we want to create
  type: 'polarArea',

  // The data for our dataset
  data: {
    labels: userHydration.findOzForWeek(lastHydroDate, 'date').map(entry => entry.slice(5)),
    datasets: [{
      label: 'Hydration',
      backgroundColor: ['rgb(255, 0, 0, 0.8)', 'rgb(255, 144, 0, 0.8)', 'rgb(255, 255, 0, 0.8)', 'rgb(17, 175, 0, 0.8)', 'rgb(0, 0, 255, 0.8)', 'rgb(153, 5, 183, 0.8)', 'rgb(0, 0, 0, 0.8)'],
      borderColor: 'rgb(0, 174, 255, 0.9)',
      hoverBackgroundColor: 'rgb(255, 255, 255, 0.3',
      data: userHydration.findOzForWeek(lastHydroDate, 'numOunces'),
    }],
  },

  // Configuration options go here
  options: {

  }
});
console.log(userActivity.findDateRange(lastActivityDate))
var activityMinsGraph = document.getElementById('week-activity-mins').getContext('2d');

var chartMinsActive = new Chart(activityMinsGraph, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: userActivity.findDateRange(lastActivityDate).map(entry => entry.date.slice(5)),
        datasets: [{
            label: 'Minutes Active',
            backgroundColor: ['rgb(10, 10, 10, 0.5), 0.8)', 'rgb(255, 144, 0, 0.8)', 'rgb(255, 255, 0, 0.8)', 'rgb(17, 175, 0, 0.8)', 'rgb(0, 0, 255, 0.8)', 'rgb(153, 5, 183, 0.8)', 'rgb(0, 0, 0, 0.8)'],
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});
// var activityMinsChart = new Chart(activityMinsGraph, {
//   // The type of chart we want to create
//   type: 'polarArea',

//   // The data for our dataset
//   data: {
//     labels: userActivity.findMinutesActive(lastActivityDate),
//     datasets: [{
//       label: 'Activity Minutes',
//       backgroundColor: ['rgb(255, 0, 0, 0.8)', 'rgb(255, 144, 0, 0.8)', 'rgb(255, 255, 0, 0.8)', 'rgb(17, 175, 0, 0.8)', 'rgb(0, 0, 255, 0.8)', 'rgb(153, 5, 183, 0.8)', 'rgb(0, 0, 0, 0.8)'],
//       borderColor: 'rgb(0, 174, 255, 0.9)',
//       hoverBackgroundColor: 'rgb(255, 255, 255, 0.3',
//       data: userActivity.findMinutesActive(lastActivityDate),
//     }],
//   },

//   // Configuration options go here
//   options: {

//   }
// });


