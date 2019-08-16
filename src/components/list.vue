<template>
    <div class="list-form">
    <div v-if="books.length > 0">
        <div v-if="view == 'CART'" >
            <p>Please collect your order from our nearby store. Your request will be processed within a week.</p>
            <button @click="toggleOverlay()" class="button checkout is-info">Checkout for Payment</button>
        </div>
        <table class="table is-bordered is-striped is-narrow is-hoverable" >
            <thead>
                <th align="center" @click="sortBy('authors')">Author Name</th>
                <th align="center" @click="sortBy('title')">Title</th>
                <th align="center" @click="sortBy('price')">PRICE</th>
                <th align="center" @click="sortBy('average_rating')">RATING</th>
                <th align="center">{{cartActionText}} CART</th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in sortedBooks || []" :key="item.id">
                    <td>{{item.authors}}</td>
                    <td>{{item.title}}</td>
                    <td>₹ {{item.price}}</td>
                    <td>{{rating(item.average_rating)}}</td>
                    <td v-if="view == 'ALL ITEMS'" @click="editCart(index, item, 'ADD', $event)">+</td>
                    <td v-if="view == 'CART'" @click="editCart(index, item, 'DELETE')">-</td>
                </tr>
            </tbody>
        </table>
        <p>
            <button class="nav-btn" @click="prevPage">Previous</button> 
            <button class="nav-btn" @click="nextPage">Next</button>
        </p>
        <Modal v-if="showModal"></Modal>
    </div>
    <p v-else>
        No items in the cart!
    </p>
    </div>
</template>
<script>
import Service from '../Service/Service.js'
import Modal from './Modal'
export default {
    props: ['books', 'view'],
    data() {
        return {
            pageSize:10,
            page:1,
            sortOrder:'asc',
            sort:'authors',
            showModal : false
        }
    },  
    components: {
        Modal
    },
    methods: {
        toggleOverlay() {
            if(this.showModal) {
                this.showModal = false;
            } else {
                this.showModal = true;
            }
        },  
        sortBy(key) {
            if(key === this.sort) {
                this.sortOrder = this.sortOrder==='asc'?'desc':'asc';
            }
            this.sort = key;
        },
        editCart(index, item, action, e) {
            Service.editCart(index, item, action);
            this.$parent.count('CART');
            if(action =='ADD') {
                e.target.innerText = 'Added to cart'
            } else {
                this.$parent.searchField('CART');
            }
        },
        nextPage:function() {
            if((this.page*this.pageSize) < this.books.length) this.page++;
        },
        prevPage:function() {
            if(this.page > 1) this.page--;
        },
        initPage() {
            this.pageSize = 10;
            this.page = 1;
        },
        rating(star) {
            let temp = '';
            if(star == 0 || typeof star == 'string') {
                return '-';
            }
            for(let i = 0; i< Math.round(star); i++) {
                temp+=' *';
            }
            return temp;
        }
    },
    computed: {
        cartActionText: function() {
             return this.view == 'CART' ? 'DELETE FROM' : 'ADD TO';
        },
        sortedBooks:function() {
            let self = this;
            return self.books.sort((a,b) => {
                let n = 1;
                if(self.sortOrder === 'desc') n = -1;
                if(a[self.sort] < b[self.sort]) return -1 * n;
                if(a[self.sort] > b[self.sort]) return 1 * n;
                return 0;
            }).filter((asd, index) => {
                let initial = (self.page-1)*self.pageSize;
                let final = self.page*self.pageSize;
                if(index >= initial && index < final) return true;
            });
        }
    },
    created() {
        
    },
}
</script>
<style lang="scss">
.list-form {
    margin: 20px;
    table {
        width: 95%;
        margin:auto;
        table-layout: fixed;
        margin: 20px;
        tr td {
            text-align: center;
        }
    }
    p {
        margin: 20px;
    }
}
</style>