<template>
  <article class="register">
    <form v-on:submit.prevent="registerForm">
      <div class="register-header">
        <router-link to="/main">
          <button
            type="button"
            class="btn cancel-btn"
            v-on:click="goBack"
          ></button>
        </router-link>
        <h1><strong>Register</strong></h1>
        <button
          type="submit"
          class="btn done-btn"
          v-bind:disabled="!isFormValid"
        ></button>
      </div>
      <div class="register-form">
        <div class="form-floating">
          <input
            type="email"
            class="form-control register-input"
            id="email"
            placeholder="email@abc.com"
            tabindex="11"
            v-model="email"
            required
          />
          <label class="register-label" for="email">ID (Email address)</label>
          <button
            type="button"
            class="btn-close btn-close-white register-clear-btn"
            v-bind:class="isEmail"
            v-on:click="clearId"
            aria-label="Delete ID inputbox"
          ></button>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control register-input"
            id="pw"
            placeholder="Password"
            tabindex="12"
            v-model="pw"
            required
          />
          <label class="register-label" for="pw">Password</label>
          <button
            type="button"
            class="btn-close btn-close-white register-clear-btn"
            v-bind:class="isPassword"
            v-on:click="clearPw"
            aria-label="Delete PW inputbox"
          ></button>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control register-input"
            id="pw2"
            placeholder="Password Again"
            tabindex="13"
            v-model="pw2"
            required
          />
          <label class="register-label" for="pw2">Password Again</label>
          <button
            type="button"
            class="btn-close btn-close-white register-clear-btn"
            v-bind:class="isPassword2"
            v-on:click="clearPw2"
            aria-label="Delete PW2 inputbox"
          ></button>
        </div>
      </div>
    </form>
  </article>
</template>

<script>
import { registerUser } from "../api/index.js";
import { validateEmail } from "../utils/validation.js";

export default {
  data() {
    return {
      email: "",
      pw: "",
      pw2: "",
    };
  },
  computed: {
    isFormValid() {
      return (
        validateEmail(this.email) &&
        this.pw === this.pw2 &&
        this.pw != "" &&
        this.pw2 != ""
      );
    },
    isEmail() {
      return this.email == "" ? "disapper" : null;
    },
    isPassword() {
      return this.pw == "" ? "disapper" : null;
    },
    isPassword2() {
      return this.pw2 == "" ? "disapper" : null;
    },
  },
  methods: {
    async registerForm() {
      try {
        const userData = {
          email: this.email,
          pw: this.pw,
        };
        const { data } = await registerUser(userData);
        if (data.register) {
          this.$router.push("/main");
        } else {
          alert("이미 있는 ID (Email) 입니다.");
        }
      } catch (error) {
        console.log(error);
      }
    },
    clearId() {
      this.email = "";
    },
    clearPw() {
      this.pw = "";
    },
    clearPw2() {
      this.pw2 = "";
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  beforeCreate() {
    if (sessionStorage.getItem("bookmark")) this.$router.push("/main");
  },
};
</script>

<style>
.register {
  border-radius: 15px;
  background-color: #969696;
  width: 90vw;
  max-width: 1000px;
  min-width: 300px;
  margin: 15px auto;
}

h1 {
  margin: 0;
}

.register-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.cancel-btn,
.done-btn {
  padding: 0 0;
  border: none;
}

.cancel-btn:focus,
.cancel-btn:active,
.done-btn:focus,
.done-btn:active {
  outline: none;
  box-shadow: none;
}

.cancel-btn {
  border-style: none;
  width: 30px;
  height: 30px;
  background: url(../assets/arrow-left.svg) center center no-repeat;
  background-size: contain;
}

.done-btn {
  border-style: none;
  width: 30px;
  height: 30px;
  background: url(../assets/check-circle.svg) center center no-repeat;
  background-size: contain;
  background-color: green;
  border-radius: 50%;
}

.done-btn:disabled {
  background-color: rgba(255, 0, 0, 0.6);
  border-radius: 50%;
}

.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px;
}

.form-floating {
  width: 90%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  position: relative;
}

.disapper {
  display: none;
}

.register-input {
  border: 0;
  opacity: 0.7;
  background-color: rgba(18, 18, 18, 1);
  margin: 10px;
  color: #c7c7c7;
}

.register-input:focus {
  outline: none;
  border: 0;
  box-shadow: none;
  background-color: rgba(18, 18, 18, 1);
  color: #c7c7c7;
}

.register-label {
  color: rgb(197, 197, 197);
}

.form-floating > .form-control {
  padding-right: 2.5rem;
}

.register-clear-btn {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  background: url(../assets/x.svg) center center no-repeat;
  background-size: cover;
  border: none;
  padding: 0;
  margin-right: 10px;
}

.register-clear-btn:focus,
.register-clear-btn:active {
  outline: none;
  box-shadow: none;
}
</style>
