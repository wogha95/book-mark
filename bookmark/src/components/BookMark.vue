<template>
  <div>
    <article v-for="(bookmark, index) in bookmarks" :key="bookmark.name" class="bookmark">
      <div class="accordion accordion-flush" v-bind:id="'parent' + index">
        <div class="accordion-item">
          <div class="bookmark-header">
            <h2 class="accordion-header address" id="flush-headingOne">
              <a href="#" class="name-site">{{ bookmark.name }}</a>
            </h2>
            <input type="text" class="form-control edit-name" v-bind:value="bookmark.name" v-bind:placeholder="bookmark.name" v-bind:aria-label="bookmark.name" aria-describedby="button-addon1">
            <div class="copy-more">
              <button class="btn copy-btn"></button>
              <button class="accordion-button collapsed more-btn" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#target' + index" aria-expanded="false" v-bind:aria-controls="'target' + index"></button>
            </div>
          </div>
          <div v-bind:id="'target' + index" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" v-bind:data-bs-parent="'#parent' + index">
            <div class="accordion-body bookmark-body">
              <textarea class="form-control address-ta" name="address" id="address" rows="2" v-model="bookmark.address"></textarea>
              <div class="edit-delete">
                <button class="btn edit-btn"></button>
                <button class="btn delete-btn"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { fetchBookmark } from '../api/index.js';

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
        }
        const { data } = await fetchBookmark(user);
        this.bookmarks = data.rows;
      }
    },
  },
  created() {
    this.bookmarkData();
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
.address {
  /* display: none; */
  height: 30px;
}

.name-site {
  color: rgb(12, 12, 12);
}

.edit-name {
  display: none;
  width: 200px;
  margin: 0 0;
  padding: 0 0;
  font-size: 20px;
  background-color: transparent;
}

.edit-name:focus,
.edit-name:active {
  outline: none;
  box-shadow: none;
  border: none;
  background-color: rgba(18, 18, 18, 0.3);
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


</style>