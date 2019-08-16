<template>
  <div class="parent-container">
    <div class="container">
    <h1 class="content is-large"> BOOKS </h1>
      <div class="tabs">
        <div v-for="(item, index) in tabs" :key="index" :class="{selected: item.view == currentView}"  @click="searchField(item.view)">
          {{item.view}} ({{item.count}})
        </div>
      </div>
      <div class="search" v-if="currentView == 'ALL ITEMS'">
        <p>Search by: </p>
        <select class="field" v-model="selectedField">
          <option v-for="item in searchList" :key="item.index">{{item}}</option>
        </select>
        <input class="field" type="text" v-model="fieldValue" @keyup="getBook({field : selectedField, value: fieldValue})"/>
        <button class="field nav-btn" @click="getBook({field : selectedField, value: fieldValue})">Search</button>
      </div>
      <list :books="books" :view="currentView"></list>
    </div>
  </div>
</template>

<script>
import list from './list.vue';
import Service from '../Service/Service.js';
import WebStorage from '../common/WebStorage.js'
import Constants from '../common/Constants.js'

export default {
  name: 'HelloWorld',
  data() {
    return {
      searchList:['TITLE','AUTHORS'],
      tabs:[{
        view: 'ALL ITEMS',
        count: WebStorage.getCollection('ALL_ITEMS').length
      },{
        view: 'CART',
        count:0
      }],
      currentView : '',
      fieldValue:'',
      books: [],
      selectedField : 'TITLE',
      showForm : false, 
      formData : []
    }
  },
  components:{
    list
  },
  methods: {
    searchField(view) {
      this.$children[0].initPage();
      this.currentView = view;
      let res = Service.getDetailsByView(view);
      this.books = res;
    },
    getBook({field, value}) {
      if(value) {
        this.$children[0].initPage();
        let searchResult = Service.getBook(field, value.trim());
        this.books = [];
        this.books.push(searchResult);
      } else {
        this.books = Service.getBookData();
      }
    },
    closeForm() {
      this.showForm = false;
    },
    count : function() {
      this.tabs[1].count = WebStorage.getCollection('CART').length;
    }
  },
  created() {
    Service.getBooksDetail().then(res => {
      WebStorage.setCollection('ALL_ITEMS', res.data);
    })
    .catch(err => {
      WebStorage.setCollection('ALL_ITEMS', Constants.data);
    });
  },
  mounted() {
    this.searchField('ALL ITEMS');
  },
}
</script>

<style lang="scss">
.parent-container {
  top: 20px;
  background-color: #6f45b9;
  height: 100%;
  .container {
    background-color: white;
    margin: auto;
    top: 50px;
    padding: 20px;
    .tabs {
        display: flex;
        justify-content: space-around;
        border-radius: 25px;
        border: 1px solid #d2d2d2;
        width: 80%;
        margin: auto;
        .selected {
          background-color: #4a90e2;
          color: #ffffff;
        }
      div {
        font-size: 16px;
        color: #a5a5a5;
        font-weight: 400;
        width: inherit;
        padding: 10px;
        &:not(:last-child) {
          border-right: 1px solid #d2d2d2;
        }
      }
    }
    .search {
      margin: 20px;
    }
    select, .nav-btn {
      margin: 20px;
      height: 30px;
      width: 70px;
    }
    .list-form {
      cursor: pointer;
    }
    input {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
      border: 1px solid #d2d2d2;
      width: 264px;
      position: relative;
      left: -4px;
      border-radius: 2px;
    }
  }
}
@media only screen 
and (max-width : 320px) {

.parent-container .container .tabs { 
  div {
    font-size : 12px;
  }
}
}
</style>
