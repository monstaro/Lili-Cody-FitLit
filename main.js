// const userData = require('./data/users.js');
// const User = require ('./src/User.js');
// const UserRepository = require ('./src/UserRepository.js');
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

const loadUser = () => {
  let random = Math.floor(Math.random()*(50));
//We are getting a 'UserRepository is not defined' error on the line below
  const userRepo = new UserRepository(userData);
  const user = new User(userRepo.getUserData(random));
  const friends = user.friends.map(friendID => {
    let friend = new User(userRepo.getUserData(friendID));
    return friend.returnFirstName();
  });
  const userHydration = new HydrationProfile(random, hydrationData);
  const userSleep = new SleepProfile(random, sleepData);
  const lastSleepDate = userSleep.findLastEntry();
  const lastHydroDate = userHydration.findLastEntry();
  console.log(user.returnFirstName())
  userSpan.innerText = user.returnFirstName();
  addressSpan.innerText = user.address;
  emailSpan.innerText = user.email;
  strideSpan.innerText = user.strideLength;
  stepGoalSpan.innerText = user.dailyStepGoal;
  friendsSpan.innerText = friends.join(', ');
  avgStepSpan.innerText = userRepo.findAvgStepGoal();
  todaySleep.innerText = userSleep.findHoursSlept(lastSleepDate);
  todayQuality.innerText = userSleep.findSleepQuality(lastSleepDate);
  todayHydration.innerText = userHydration.findOzConsumed(lastHydroDate);
}

loadUser();
