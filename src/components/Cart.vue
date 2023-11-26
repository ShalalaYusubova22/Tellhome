<template>
  <div class="cart-page container section-p1">

  <div  v-if="store.length > 0">
   <table>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Subtotal</th>
      </tr>
      <tr v-for="product in store" :key="product.id">
        <td >
          <div class="cart-info">
            <img :src="product?.thumbnail"  alt="" />
            <div>
              <p>{{product?.title}}</p>
              <small>Price:{{product?.price}} $</small>
              <br />
              <button class="remove" @click="deleteProduct(product?.id)">Remove</button>
            </div>
          </div>
        </td>
        <td><input class="input" type="number"  v-model="product.quantity" :min="1" /></td>
        <td>{{ product?.price * product?.quantity}}$</td>
      </tr>
    </table>
   <div class="total-price">
      <table class="table">
        <tr>
          <td>Total</td>
          <td>{{ totalPrice }}$</td>
        </tr>
      </table>
    </div>
  </div>
  
      <h2 class="else" v-else>No products <i class="fas fa-shopping cart"></i></h2>

  </div>
</template>

<script setup>
import {ref,onMounted,computed} from "vue"
import { useId } from "@/Catalog";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const products = useId();

const store = ref([])



onMounted(async () => {
const data = JSON.parse(localStorage.getItem("products") || [])
store.value = data
})


const notifyDelete = () => {
      toast.error("Product successfully deleted", {
        autoClose: 2500,
        position : "bottom-right"
      }); 
    }

const deleteProduct = (id) =>{
  const tempVal = store.value.filter((item) => item.id !== id);
  store.value = tempVal;
  products.setValue(tempVal?.length)
  localStorage.setItem("products",JSON.stringify(tempVal))
  notifyDelete()
}



const totalPrice = computed(() => {
  return store.value.reduce((total, product) => {
    return total + product?.price * product?.quantity;
  }, 0);
});

</script>

<style lang="scss" scoped>
.cart-page {
  margin: 80px auto;
}
table {
  width: 100%;
  border-collapse: collapse;

  input {
    border: 1px solid #088178;
    width: 40px;
    height: 30px;
    padding: 5px;
    color: brown;
  }
  .cart-info {
    display: flex;
    flex-wrap: wrap;
  }
  p{
    color: brown;
    font-size:25px;
  }
  small {
    color: #088178;
    font-size: 20px;
  }
  th {
    text-align: left;
    padding: 5px;
    color: white;
    background: #088178;
    font-weight: normal;
  }
  td {
    padding: 10px 5px;
    color: #088178;
    font-size: 20px;
    a {
      color: darkred;
      font-size: 12px;
    }
    img {
      width: 20%;
      height: 20%;
      margin-right: 10px;
    }
  }
  }
   .total-price {
    display: flex;
    justify-content: flex-end;
    .table {
        border-top: 3px solid #088178!important;
        width: 100%;
        max-width: 480px;
        td:last-child {
            text-align: right;
        }
    }
   }
   .remove {
    margin-top: 15px;
    border: 1px solid #088178;
    background:#088178;
    padding: 10px;
    color: white;
    border-radius: 6px;
    text-decoration: none;
    &:hover {
        background: white;
        color: #088178;
        
    
    
      
  }
   }
   .else {
    color: brown;
   }

</style>
