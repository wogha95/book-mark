<template>
  <div class="nav">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container-fluid">
        <router-link to="/main" class="navbar-brand">Navbar</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <template v-if="!$store.state.logined">
            <form v-on:submit.prevent="loginForm">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <div class="input-group-sm">
                    <input type="text" class="form-control login-input" placeholder="ID (Email)" tabindex="1" aria-label="ID (Email)" aria-describedby="button-addon1" v-model="email" required>
                    <button v-bind:class="isEmail" v-on:click="clearId" type="button" class="btn-close btn-close-white nav1-clear-btn" aria-label="Delete ID inputbox"></button>
                  </div>
                </li>
                <li class="nav-item">
                  <div class="input-group-sm">
                    <input type="text" class="form-control login-input" placeholder="Password" tabindex="2" aria-label="Password"  aria-describedby="button-addon2" v-model="pw" required>
                    <button v-bind:class="isPassword" v-on:click="clearPw" type="button" class="btn-close btn-close-white nav1-clear-btn" aria-label="Delete PW inputbox"></button>
                  </div>
                </li>
                <li class="nav-item">
                  <button v-bind:disabled="!isLoginValid" type="submit" class="btn nav-link" tabindex="3">로그인</button>
                </li>
                <li class="nav-item">
                  <router-link to="/register" class="nav-link" tabindex="4">회원가입</router-link>
                </li>
              </ul>
            </form>
          </template>
          <template v-else>
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/edit" class="nav-link">{{ $store.state.email }}</router-link>
              </li>
              <li class="nav-item">
                <button v-on:click="logout" type="button" class="btn nav-link" aria-label="Logout">Logout</button>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { loginUser } from '../api/index.js';
import { validateEmail } from '../utils/validation.js';

export default {
  data() {
    return {
      email: '',
      pw: '',
    }
  },
  computed: {
    isLoginValid() {
      return validateEmail(this.email) && (this.pw != '');
    },
    isEmail() {
      return (this.email == '')? 'disapper' : null;
    },
    isPassword() {
      return (this.pw == '')? 'disapper' : null;
    }
  },
  methods: {
    async loginForm() {
      try {
        console.log(this.email, this.pw);
        const userData = {
          email: this.email,
          pw: this.pw
        }
        const { data } = await loginUser(userData);
        if(data.login) {
          this.email = '';
          this.pw = '';
          this.$store.commit('setLogin', userData.email);
          this.$router.push('/edit');
        }
        else
          alert('다시 입력바랍니다.');
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      this.$store.commit('setLogout');
      this.$router.push('/main');
    },
    clearId() {
      this.email = '';
    },
    clearPw() {
      this.pw = '';
    },
  },
}
</script>

<style>
.nav {
  height: 56px;
}

.navbar {
  background-color: #363636
}

.router-link-exact-active,
.router-link-active,
.navbar-dark .navbar-brand {
  color: #c7c7c7;
}

.router-link-active,
.router-link-exact-active {
  outline: none;
  box-shadow: none;
}

.navbar-toggler{
  border: none;
}

.navbar-toggler:focus,
.navbar-toggler:active,
.login-input:focus,
.login-input:active {
  outline: none;
  box-shadow: none;
}

#navbarNav {
  justify-content: flex-end;
}

.login-input::placeholder {
  color: rgba(255,255,255,.55);
}

.login-input:focus,
.login-input:active {
  background-color: rgba(70, 70, 70, 0.75);
  color: white;
}

.input-group-sm {
  display: flex;
  justify-content: center;
  position: relative;
}

.login-input {
  margin: 5px;
  background-color: rgba(70, 70, 70, 0.75);
  color: white;
  border: none;
  text-align: center;
}

.disapper {
  display: none;
}

.input-group-sm>.form-control {
  padding-right: 2rem;
  padding-left: 2rem;
}

.nav1-clear-btn {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: url(../assets/x.svg) center center no-repeat;
  background-size: cover;
  border: none;
  padding: 0;
}

.nav1-clear-btn:focus,
.nav1-clear-btn:active {
  outline: none;
  box-shadow: none;
}

.nav-link {
  width: 100%;
  text-align: center;
  border: none;
}

.nav-link:focus {
  outline: none;
  box-shadow: none;
}

.cancelbtn {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: url(../assets/x.svg) center center no-repeat;
  background-size: cover;
  border: none;
  padding: 0;
}

.cancelbtn:focus,
.cancelbtn:active {
  outline: none;
  box-shadow: none;
}

</style>