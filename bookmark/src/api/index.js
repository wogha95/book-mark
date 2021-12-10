import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// login
function loginUser(userData) {
  return instance.post('/login', userData);
}

// register
function registerUser(userData) {
  return instance.post('/register', userData);
}

// fetch bookmark
function fetchBookmark(email) {
  return instance.post('/bookmark', email);
}

export { loginUser, registerUser, fetchBookmark };