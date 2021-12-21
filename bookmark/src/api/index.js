import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// login
function loginUser(userData) {
  return instance.post('/login', userData);
}

// logout 아직 서버 작업이 없어서 사용되는 곳 없음
function logoutUser() {
  return instance.get('/logout');
}

// register user
function registerUser(userData) {
  return instance.post('/registerUser', userData);
}

// update password
function updateUser(userData) {
  return instance.post('/updateUser', userData);
}

// delete user account
function deleteUser(user) {
  return instance.post('/deleteUser', user);
}

// fetch bookmark
function fetchBookmark(email) {
  return instance.post('/bookmark', email);
}

// create bookmark
function createBookmark(user) {
  return instance.post('/createBookmark', user);
}

// edit bookmark
function editBookmark(user) {
  return instance.post('/editBookmark', user);
}

// delete bookmark
function deleteBookmark(user) {
  return instance.post('/deleteBookmark', user);
}

export {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  deleteUser,
  fetchBookmark,
  createBookmark,
  editBookmark,
  deleteBookmark,
};