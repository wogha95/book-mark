<template>
  <article class="mypage">
    <div class="mypage-header">
      <button class="btn cancel-btn"></button>
      <h1>
        My Page
      </h1>
      <button class="btn delete-account-btn"></button>
    </div>
    <div class="mypage-form">
      <div class="form-floating">
        <input type="email" class="form-control mypage-input" value="abc@naver.com" id="email" placeholder="email@abc.com" disabled>
        <label class="mypage-label" for="email">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control mypage-input" id="pw" placeholder="Password">
        <label class="mypage-label" for="pw">Password</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control mypage-input" id="pw2" placeholder="Password Again">
        <label class="mypage-label" for="pw2">Password Again</label>
      </div>
    </div>
  </article>
</template>

<script>
export default {

}
</script>

<style>
.mypage {
  border-radius: 15px;
  background-color: rgb(110, 110, 110);
  width: 95%;
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

.delete-account-btn {
  border-style: none;
  width: 30px;
  height: 30px;
  background: url(../assets/user-slash.svg) center center no-repeat;
  background-size: contain;
}

.cancel-btn,
.done-btn,
.delete-account-btn {
  padding: 0 0;
  border: none;
}

.cancel-btn:focus,
.cancel-btn:active,
.done-btn:focus,
.done-btn:active,
.delete-account-btn:focus,
.delete-account-btn:active {
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
  background-color: rgba(83, 83, 83, 0.7);
  margin: 10px;
}

.mypage-input:focus {
  outline: none;
  border: 0;
  box-shadow: none;
  background-color: rgb(77, 77, 77);
  color: red;
}

.mypage-input:disabled {
  background-color: rgba(83, 83, 83, 0.7);
}

.mypage-label {
  color: rgb(197, 197, 197);
}

</style>