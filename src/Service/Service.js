import Urls from '../common/Urls.js'
import Proteus from '../common/Proteus.js'
import WebStorage from '../common/WebStorage';
/* eslint-disable */
export default {
    getBooksDetail() {
        return Proteus().get(Urls.getBooksDetail().GET_BOOKS_DETAIL);
    },
    getBookData() {
        return WebStorage.getCollection('ALL_ITEMS');
    },
    getDetailsByView(status) {
        if(status == 'CART') {
            return WebStorage.getCollection('CART');
        } else {
            return WebStorage.getCollection('ALL_ITEMS');
        }
    },
    editCart(index, book, action) {
        let cart = WebStorage.getCollection('CART');
        if(action == 'ADD') {
            cart.push(book);
        } else {
            cart.splice(index, 1);
        }
        WebStorage.setCollection('CART', cart);
    },
    getBook(field, value){
        let form = {};
        this.data = WebStorage.getCollection('ALL_ITEMS');        
        this.data.forEach(item => {
            field = field.toLowerCase();
            if(item[field] == value) {
                form = item;
            }
        });
        return form;
    }
}