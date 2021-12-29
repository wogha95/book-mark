<template>
  <article class="guest">
    <div class="guest-row">
      <button v-on:click="openNavbar" class="start-btn"><strong class="text-box">시작하기</strong></button>
    </div>
    <div class="guest-row">
      <strong class="text-box">어느 기기든</strong>
      <div class="slide-box">
        <div id="carousel1" class="carousel slide" data-bs-ride="carousel" data-bs-interval="1500" data-bs-pause="false">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../assets/guest-mobile.svg" class="d-block w-100 imgs">
            </div>
            <div class="carousel-item">
              <img src="../assets/guest-tablet.svg" class="d-block w-100 imgs">
            </div>
            <div class="carousel-item">
              <img src="../assets/guest-laptop.svg" class="d-block w-100 imgs">
            </div>
            <div class="carousel-item">
              <img src="../assets/guest-desktop.svg" class="d-block w-100 imgs">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="guest-row">
      <div class="slide-box">
        <div id="carousel2" class="carousel slide" data-bs-ride="carousel" data-bs-interval="1500" data-bs-pause="false">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../assets/guest-chrome.svg" class="d-block w-100 imgs">
            </div>
            <div class="carousel-item">
              <img src="../assets/guest-safari.svg" class="d-block w-100 imgs">
            </div>
            <div class="carousel-item">
              <img src="../assets/guest-edge.svg" class="d-block w-100 imgs">
            </div>
            <div class="carousel-item">
              <img src="../assets/guest-firefox.svg" class="d-block w-100 imgs">
            </div>
            <div class="carousel-item">
              <img src="../assets/guest-iexplore.svg" class="d-block w-100 imgs">
            </div>
          </div>
        </div>
      </div>
      <strong class="text-box">어느 브라우저든</strong>
    </div>
    <div class="guest-row">
      <strong class="text-box text-strong">즐겨찾기</strong>
      <strong class="text-box">를 이용하세요</strong>
    </div>
    
  </article>
</template>

<script>
export default {
  methods: {
    openNavbar() {
      document.querySelector('#navbarNav').classList.add('show');
    }
  },
}
</script>

<style>
.guest {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #969696;
  width: 90vw;
  max-width: 1000px;
  min-width: 300px;
  height: 50vh;
  margin: 20px auto;
  border-radius: 15px;
}

.guest-row {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}

.start-side {
  margin: 10px;
}

.start-btn {
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #C9C9C9;
}

.text-box {
  font-size: 1.5rem;
  letter-spacing: 0.03em;
}

.text-strong {
  color: gold;
}

.slide-box {
  width: 120px;
  margin: auto 10px;
}

.imgs {
  width: 50px;
  height: 50px;
}

@media screen and (max-width: 500px) {
  .guest {
    height: 300px;
  }

  .text-box {
    font-size: 1rem;
    letter-spacing: 0.01em;
  }

  .imgs {
    width: 30px;
    height: 30px;
  }
}

@media screen and (min-width: 992px) {
.guest {
    height: 70vh;
  }

  .text-box {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
  }

  .start-btn {
    width: 250px;
    height: 80px;
  }

  .guest-row {
    margin: 30px auto;
  }
}

</style>