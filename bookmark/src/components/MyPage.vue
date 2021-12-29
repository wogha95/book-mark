<template>
  <article class="mypage">
    <div class="mypage-header">
      <button v-on:click="goBack" type="button" class="btn cancel-btn"></button>
      <h1><strong>My Page</strong></h1>
      <label class="just-space"></label>
    </div>
    <div class="mypage-form">
      <div class="form-floating">
        <input type="email" class="form-control mypage-input" v-bind:value="$store.state.email" id="email" placeholder="email@abc.com" disabled>
        <label class="mypage-label" for="email">ID (Email)</label>
      </div>
      <div class="update-delete-bg">
        <modal-page>
          <button slot="modal-btn" v-on:click="updatePw" type="button" class="btn btn-outline-primary update-pw-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">비밀번호 변경</button>
          <h5 slot="title">비밀번호를 입력해주세요.</h5>
          <span slot="body1" class="modal-body1">기존 비밀번호</span>
          <input slot="input1" v-model="pwBefore" type="password" class="form-control modal-input" required>
          <span slot="body2">변경할 비밀번호</span>
          <input slot="input2" v-model="pwAfter" type="password" class="form-control modal-input" required>
          <button slot="modal-clost-btn" v-on:click="clearModal" type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">닫기</button>
          <button slot="modal-submit-btn" v-bind:disabled="!isPwValid" type="button" class="btn btn-success" v-on:click="updatePw">변경</button>
        </modal-page>
        <span>|</span>
        <button v-on:click="deleteAccount" type="button" class="btn btn-outline-primary delete-account-btn">회원 탈퇴</button>
      </div>
    </div>
  </article>
</template>

<script>
import ModalPage from './ModalPage.vue';
import {
  updateUser,
  deleteUser
  } from '../api/index.js';

export default {
  data() {
    return {
      pwBefore: '',
      pwAfter: ''
    }
  },
  computed: {
    isPwValid() {
      return (this.pwBefore !== '') && (this.pwAfter !== '');
    }
  },
  components: {
    ModalPage
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    clearModal() {
      this.pwBefore = '';
      this.pwAfter = '';
    },
    async updatePw() {
      try {
        let pwBefore = this.pwBefore;
        let pwAfter = this.pwAfter;
        pwBefore = pwBefore.trim();
        pwAfter = pwAfter.trim();
        
        // 정확한 비밀번호를 입력한 경우
        if(pwBefore && pwAfter) {
          const user = {
            email: this.$store.state.email,
            pwBefore: pwBefore,
            pwAfter: pwAfter
          }
          
          const { data } = await updateUser(user);
          
          if(data.update)
            alert('비밀번호가 변경되었습니다.');
          else
            alert('[ERROR] 다시 시도해주세요');
        }
        
      } catch (error) {
        alert('[ERROR] 다시 시도해주세요');
        console.log(error);
      }
    },
    async deleteAccount() {
      try {
        let checkPw = prompt('비밀번호를 입력해주세요');
        checkPw = checkPw.trim();
        
        // ESC 키를 누른 경우
        if(checkPw === null)
          return;
        // 정확한 비밀번호를 입력한 경우
        else if(checkPw) {
          const user = {
            email: this.$store.state.email,
            pw: checkPw
          }

          const { data } = await deleteUser(user);
          
          if(data.delete) {
            alert('계정 삭제되었습니다.');
            this.$store.commit('setLogout');
            this.$router.push('/main');
          }
          else
            alert('[ERROR] 다시 시도해주세요');
        }
        
      } catch (error) {
        alert('[ERROR] 다시 시도해주세요');
        console.log(error);
      }
    }
  },
  beforeCreate() {
    if(!sessionStorage.getItem('bookmark'))
      this.$router.push('/main');
  },
}
</script>

<style>
.mypage {
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

.mypage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
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
}

.just-space {
  border-style: none;
  width: 30px;
  height: 30px;
  background-color: transparent;
  padding: 0 0;
  border: none;
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

.mypage-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px;
}

.form-floating {
  width: 90%;
  max-width: 600px;
}

.mypage-input {
  border: 0;
  color: #c7c7c7;
  background-color: rgba(83, 83, 83, 0.7);
  margin: 10px;
}

.mypage-input:focus {
  outline: none;
  border: 0;
  box-shadow: none;
  background-color: rgb(77, 77, 77);
  color: #c7c7c7;
}

.mypage-input:disabled {
  opacity: 0.7;
  background-color: rgba(18, 18, 18, 1);
}

.mypage-label {
  color: rgb(197, 197, 197);
}

.update-delete-bg {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.update-pw-btn {
  border: none;
  margin: 10px;
  color: black;
  background-color: transparent;
}

.update-pw-btn:hover {
  background-color: rgba(83, 83, 83, 0.7);
  border: none;
}

.delete-account-btn {
  border: none;
  margin: 10px;
  color: black;
  background-color: transparent;
}

.delete-account-btn:hover {
  background-color: rgba(83, 83, 83, 0.7);
  border: none;
}

.modal-input:focus {
  border: thin solid #005A34;
  outline: none;
  box-shadow: none;
}

.modal-ta {
  resize: none;
}

</style>