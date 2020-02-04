// const userData = require('./data/users.js');
// const User = require ('./src/User.js');
// const UserRepository = require ('./src/UserRepository.js');
const userSpan = document.getElementById('user-name');

const loadUser = () => {
  let random = Math.floor(Math.random()*(50));
  const userRepo = new UserRepository(userData);
  const user = new User(random);
  console.log(user.returnFirstName())
  userSpan.innerText = user.returnFirstName();
}

loadUser();
