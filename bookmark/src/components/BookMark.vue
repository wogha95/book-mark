<template>
  <div>
    <article v-for="(bookmark, index) in bookmarks" :key="bookmark.name" class="bookmark">
      <div class="accordion accordion-flush" v-bind:id="'parent' + index">
        <div class="accordion-item">
          <!-- address Name -->
          <div class="bookmark-header">
            <h2 class="accordion-header address" v-bind:id="'addressName' + index">
              <a href="#" class="name-site" target="_blank" v-bind:id="'addressAnchor' + index">{{ bookmark.name }}</a>
            </h2>
            <!-- if EDIT, address input -->
            <input type="text" class="form-control edit-name display-none" v-bind:id="'addressInput' + index" v-bind:value="bookmark.name" v-bind:placeholder="bookmark.name" v-bind:aria-label="bookmark.name" aria-describedby="button-addon1">
            <!-- COPY-btn, MORE-btn -->
            <div class="copy-more">
              <button class="btn copy-btn" v-on:click="copyAddress(index)"></button>
              <button class="accordion-button collapsed more-btn" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#target' + index" aria-expanded="false" v-bind:aria-controls="'target' + index"></button>
            </div>
          </div>
          <!-- ADDRESS, EDIT-btn, DELETE-btn -->
          <div v-bind:id="'target' + index" class="accordion-collapse collapse" v-bind:aria-labelledby="'addressName' + index" v-bind:data-bs-parent="'#parent' + index">
            <div class="accordion-body bookmark-body">
              <textarea class="form-control address-ta" name="address" v-bind:id="'address' + index" rows="2" v-model="bookmark.address" disabled></textarea>
              <div class="edit-delete">
                <button class="btn edit-btn" v-on:click="editAddress(index)"></button>
                <button class="btn delete-btn" v-on:click="deleteAddress(index)"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
    <div class="footer"></div>
    <div class="fixed-bottom plus-btn-bg">
      <button class="plus-btn" id="plus" v-on:click="createAddress"></button>
    </div>
  </div>
</template>

<script>
import {
  fetchBookmark,
  createBookmark,
  editBookmark,
  deleteBookmark,
  } from '../api/index.js';

export default {
  data() {
    return {
      bookmarks: [],
    }
  },
  methods: {
    async bookmarkData() {
      if(this.$store.state.email != '') {
        const user = {
          email: this.$store.state.email,
        };
        const { data } = await fetchBookmark(user);
        this.bookmarks = data.rows;
      }
    },
    async createAddress() {
      try {
        let name = prompt('저장할 이름을 정해주세요.');
        if(name === null) return;
        let address = prompt('저장할 주소를 입력해주세요.');
        if(address === null) return;

        name = name.trim();
        address = address.trim();

        if(name && address && this.$store.state.email != '') {
          if(address.substring(0, 8) !== 'https://' && address.substring(0, 7) !== 'http://')
            address = 'https://' + address;

          const user = {
            email: this.$store.state.email,
            name,
            address
          };
          await createBookmark(user);
          
          this.$router.go(this.$router.currentRoute);
        }
        else
          alert('[ERROR] 다시 입력해주세요.');
      } catch (error) {
        alert('[ERROR] 다시 시도해주세요.');
        console.log(error);
      }
    },
    copyAddress(index) {
      let copyText = document.querySelector(`#address${index}`);
      copyText.select();

      navigator.clipboard.writeText(copyText.value);
      console.log(copyText.value);
    },
    async deleteAddress(index) {
      try {
        let name = document.querySelector(`#addressAnchor${index}`).textContent;

        let confirmflag = confirm('삭제하시겠습니까?');

        if(confirmflag) {
          if(this.$store.state.email != '') {
            const user = {
              email: this.$store.state.email,
              name
            };
            await deleteBookmark(user);
            alert('삭제되었습니다');
            this.$router.go(this.$router.currentRoute);
          }
          else
            alert('[ERROR] 다시 시도해주세요');
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editAddress(index) {
      try {
        // addressName 주소이름틀
        // nextAddress 변경될 주소
        // input 입력된 주소이름 (변경될)
        // anchor 변경전 주소이름
        let addressName = document.querySelector(`#addressName${index}`);
        let nextAddress = document.querySelector(`#address${index}`);
        let input = document.querySelector(`#addressInput${index}`);
        let anchor = document.querySelector(`#addressAnchor${index}`);
        
        // 수정모드
        if(!addressName.classList.contains('display-none')) {
          addressName.classList.toggle('display-none');
          input.classList.toggle('display-none');
          nextAddress.disabled = false;
        }
        // 수정완료
        else {
          let confirmflag = confirm('저장하시겠습니까?');

          if(confirmflag) {
            input.value = input.value.trim();
            nextAddress.value = nextAddress.value.trim();

            if(this.$store.state.email != '' && input.value != '' && nextAddress.value != '') {
              // https로 저장 (http는 그대로 저장)
              let checkHttps = nextAddress.value;

              if(checkHttps.substring(0, 8) !== 'https://' && checkHttps.substring(0, 7) !== 'http://')
                checkHttps = 'https://' + checkHttps;

              // 서버 작업
              const user = {
                email: this.$store.state.email,
                name: anchor.textContent,
                nextName: input.value,
                nextAddress: checkHttps
              };
              await editBookmark(user);

              // 화면 작업
              addressName.classList.toggle('display-none');
              input.classList.toggle('display-none');
              nextAddress.value = checkHttps;
              nextAddress.disabled = true;
              anchor.textContent = input.value;
              anchor.href = nextAddress.value;
            }
            else
              alert('[ERROR] 다시 시도해주세요');
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created() {
    await this.bookmarkData();
    if(this.bookmarks.length !== 0) {
      this.bookmarks.forEach(function(element, index) {
        document.querySelector(`#addressAnchor${index}`).href = element.address;
      });
    }
  },
}
</script>

<style>
.bookmark {
  background-color: rgb(110, 110, 110);
  width: 95%;
  margin: 15px auto;
  border-radius: 15px;
}

.accordion-item {
  background-color: rgba(255, 117, 117, 0);
}

.bookmark-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
}

/* address, edit-name */
/* only display one */
.display-none {
  display: none;
}

.address {
  height: 30px;
  margin-bottom: 1px;
}

.name-site {
  color: rgb(12, 12, 12);
}

.edit-name {
  width: 200px;
  margin: 0 0;
  padding: 0 0;
  font-size: 20px;
  border: none;
  border-bottom: thin ridge silver ;
  color: aquamarine;
  background-color: transparent;
}

.edit-name:focus,
.edit-name:active {
  outline: none;
  box-shadow: none;
  border: none;
  border-bottom: thin ridge black ;
  color: aquamarine;
  background-color: transparent;
}

/* Copy, More Btn */
.more-btn {
  width: 20px;
  height: 20px;
  padding: auto 0px;
  background-color: none;
  padding: 0 0;
  margin-left: 15px;
}

.collapsed {
  background-color: transparent;
}

.more-btn::after {
  background-color: transparent;
}

.accordion-button:not(.collapsed) {
  background-color: transparent;
  outline: none;
  box-shadow: none;
}

.accordion-button:focus {
  outline: none;
  box-shadow: none;
}

.copy-more {
  display: flex;
  justify-content: center;
  align-items: center;
}

.copy-btn {
  width: 20px;
  height: 20px;
  background: url(../assets/copy.svg) center center no-repeat;
  background-size: contain;
}

.copy-btn,
.edit-btn,
.delete-btn {
  padding: 0 0;
  border: none;
}

.copy-btn:active,
.copy-btn:focus,
.delete-btn:focus,
.delete-btn:active,
.edit-btn:focus,
.edit-btn:active {
  outline: none;
  box-shadow: none;  
}

.bookmark-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}


/* textarea Enable - Disable */
.address-ta {
  background-color: rgba(18, 18, 18, 1);
  color: #c7c7c7;
  overflow: auto;
  resize: none;
  border: 0;
  margin-right: 10px;
}
.address-ta:disabled {
  opacity: 0.7;
  background-color: rgba(18, 18, 18, 1);
}


/* textarea Scroll */
.address-ta:focus {
  background-color: rgba(18, 18, 18, 1);
  outline: none;
  box-shadow: none;
  color: #c7c7c7;
}
.address-ta::-webkit-scrollbar {
  width: 6px;
}
.address-ta::-webkit-scrollbar-track {
  background-color: rgba(18, 18, 18, 1);  
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.address-ta::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(172, 172, 172, 0.7);
}
.address-ta::-webkit-scrollbar-corner,
.address-ta::-webkit-scrollbar-button {
  width: 0;
  height: 0;
}


/* Edit, Delete Btn */
.edit-delete {
  height: 55px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
}

.edit-btn {
  border-style: none;
  width: 20px;
  height: 20px;
  background: url(../assets/edit.svg) center center no-repeat;
  background-size: contain;
}

.delete-btn {
  border-style: none;
  width: 20px;
  height: 20px;
  background: url(../assets/trash.svg) center center no-repeat;
  background-size: contain;
}

.footer {
  height: 4rem;
  background-color: transparent;
}

.plus-btn-bg {
  background-color: transparent;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plus-btn {
  border-style: none;
  border-radius: 20px;
  width: 10rem;
  height: 2.5rem;
  background: url(../assets/plus.svg) center center no-repeat;
  background-size: contain;
  background-color: rgb(255, 255, 255);
}
</style>