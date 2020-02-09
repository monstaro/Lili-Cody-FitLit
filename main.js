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
const weekHydration = document.getElementById('week-hydration');
const hoursWeekSleep = document.getElementById('hours-week-sleep');
const qualityWeekSleep = document.getElementById('quality-week-sleep');
const allTimeAvgSleep = document.getElementById('alltime-avg-sleep');
const allTimeAvgHydration = document.getElementById('alltime-avg-hydration');
const stepsToday = document.getElementById('today-steps');
const stepsWeek = document.getElementById('week-steps');
const stairsWeek = document.getElementById('week-stairs');
const activityMinsWeek = document.getElementById('week-activity-mins');
const compareStepsToday = document.getElementById('compare-steps')
const compareMinsToday = document.getElementById('compare-mins-active')

const activityToday = document.getElementById('today-activity');
const friendTrends = document.getElementById('friend-trends');
const topSteps = document.getElementById('highest-steps');
const milesToday = document.getElementById('today-miles')

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
weekHydration.innerText = userHydration.findOzForWeek(lastHydroDate);




stepsToday.innerText = userActivity.findSteps(lastActivityDate) + ' steps';


activityToday.innerText = userActivity.findMinutesActive(lastActivityDate) + ' minutes';
hoursWeekSleep.innerText = userSleep.findHoursSleptForWeek(lastSleepDate).map(hour => ' ' + hour + ' hrs');
qualityWeekSleep.innerText = userSleep.findSleepQualityForWeek(lastSleepDate).map(quality => ' ' + quality + '/5 Quality');
weekHydration.innerText = userHydration.findOzForWeek(lastHydroDate).map(date => ' ' + date + ' oz.');
allTimeAvgSleep.innerText = userSleep.calculateAvgHoursAllTime() + ' hrs - ' +
userSleep.calculateSleepQualityAllTime() + '/5 quality';
allTimeAvgHydration.innerText = userHydration.calculateAllTimeOzAvg() + ' oz.';
milesToday.innerText = userActivity.findMilesWalked(lastActivityDate) + ' miles';

stepsWeek.innerText = userActivity.findDateRange(lastActivityDate).map(date => ' ' + date.numSteps + ' steps ');

stairsWeek.innerText = userActivity.findDateRange(lastActivityDate).map(date => ' ' + date.flightsOfStairs + ' flights climbed');

activityMinsWeek.innerText = userActivity.findDateRange(lastActivityDate).map(date => ' ' + date.flightsOfStairs + ' minutes');

compareStepsToday.innerText = userActivity.compareStepsToAllUsers(lastActivityDate)

compareMinsToday.innerText = userActivity.compareMinsActiveToAllUsers(lastActivityDate)




const yourTotalSteps = {
  name: 'you',
  totalSteps: userActivity.showTotalStepsForWeek(lastActivityDate)
}
const friendTotalSteps = friendActivities.map(act => {
  return {
    name: act.user.returnFirstName(),
    totalSteps: act.showTotalStepsForWeek(lastActivityDate)
  }
});
const youAndFriends = [yourTotalSteps, ...friendTotalSteps];
const highestSteps = youAndFriends.reduce((acc, friend) => {
  return Math.max(acc, friend.totalSteps);
}, 0);
const highestStepper = youAndFriends.find(friend => friend.totalSteps === highestSteps);
console.log(highestSteps);

const friendTrendStatements = youAndFriends.map(friend => {
  return `${friend.name} had <span class="step-num">${friend.totalSteps}</span> steps`;
});

friendTrends.innerHTML = `<p>This week, ${friendTrendStatements.join(', ')}.</p>`
topSteps.innerHTML = `<p>The person with the highest number of steps this week was
${highestStepper.name} with <span class="step-num">${highestStepper.totalSteps}</span> steps</p>`


console.log();