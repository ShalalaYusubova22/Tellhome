import {defineStore} from 'pinia'
import axios from 'axios';
export const useId = defineStore({
    id: 'GetId',
    state: () => ({
        data : null,
        categories : null,
        product: null,
        url: 'https://dummyjson.com/products',
        basketLength : JSON.parse(localStorage.getItem('products'))?.length,
        dataForFilter : null
    }),
    actions: {
        async getId(skip = 0,limit=12){
            try {
                const res = await axios.get(`${this.url}?skip=${skip}&limit=${limit}`)
                this.data = res.data.products
            } catch (error) {
                console.error('Product not found', error);
            }
        },

        async getProducts(){
            try {
              const response = await axios.get(`${this.url}?limit=100`)      
              this.dataForFilter = response.data
            } catch (error) {
                throw new Error('error happened')
            }
        },
        async getItem(id){
            try {
                const res = await axios.get(`${this.url}/${id}`)
                this.product = res.data
            } catch (error) {
                console.error('Product not found', error);
            }
        },
        async getCategories(){
            try {
                const res = await axios.get(`${this.url}/categories`)
                this.categories = res.data
            } catch (error) {
                console.error('Product not found', error);
            }
        },

        async getItemsByCategory(cat){
            // const url 
            try {
                const res = await axios.get(`https://dummyjson.com/products/category/${cat}`)
                this.data = res.data.products
            } catch (error) {
                console.error(' Product not found ', error);
            }
        },
        setValue(count){
        
            this.basketLength = count
        }
         

    },
})