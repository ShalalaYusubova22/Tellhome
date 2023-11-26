<template>
  <div class="container">
    <section id="hero_container" class="container">
      <div id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <RouterLink to="">Shop Now</RouterLink>
      </div>
      <carousel :settings="settings" :breakpoints="breakpoints">
        <slide v-for="product in allProducts" :key="product.id">
          <div class="carousel__item">
            <img :src="product.thumbnail" alt="" />
          </div>
        </slide>
      </carousel>
    </section>

    <section id="product1" class="section-p1">
      <h2>Catalog of Products</h2>
      <router-link to="/filter" class="filtern">Filtering by stock & price</router-link>


      <!-- <Filter /> -->
      <section class="filter-menu">
        <h1>Filtering by Categories</h1>
        <ul class="ul">
          <li
            :class="{ current: !selectedCategory }"
            @click="selectCategory(category)"
          >
            All products
          </li>
          <li
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="{ current: category === selectedCategory }"
          >
            {{ category }}
          </li>
        </ul>

      </section>
      <div id="pagination-link" class="pro-container">
        <router-link
          :to="'/product/' + product.id"
          class="pro"
          v-for="product in allProducts"
          :key="product.id"
        >
          <img :src="product.thumbnail" alt="" />
          <div class="des">
            <span>{{ product.title?.substring(0, 30) + "..." }}</span>
            <h5>{{ product.description?.substring(0, 40) + "..." }}</h5>
            <div class="star">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <h4>{{ product.price }}$</h4>
            <h4 class="saleof">
              Sale of-
              {{
                Math.ceil(
                  product.price -
                    (product.price * product.discountPercentage) / 100
                )
              }}$
            </h4>
            <h4>{{ product.stock }} on shipping</h4>
          </div>
          <a href=""><i class="fas fa-shopping-cart"></i></a>
        </router-link>
      </div>
    </section>

    <section class="pagination section-p1">
     <vue-awesome-paginate
    :total-items="100"
      :items-per-page="12"
    v-model="currentPage"
    :on-click="goToPage"
  />

    </section>

    <section id="banner" class="section-m1">
      <h4>Repair Services</h4>
      <h2>Up to <span>50% Off</span> - All Phones & Accesories</h2>
      <a href=""><button class="normal">Explore More</button></a>
    </section>

    <section id="newsletter" class="section-p1 section-m1">
      <div class="newstext">
        <h4>Sign Up For Newsletter</h4>
        <p>
          Get E-mail updates about our latest shop and
          <span>special offers.</span>
        </p>
      </div>
      <div class="form">
        <input type="text" placeholder="Your email adress" />
        <a href=""><button class="normal">Sign Up</button></a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useId } from "@/Catalog";

import CatalogItem from "@/components/CatalogItem.vue";
import Cart from "@/components/Cart.vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
components: {
  CatalogItem, Cart, Carousel, Slide, Pagination, Navigation;
}
const products = useId();
let allProducts = ref(null);
let categories = ref(null);
let selectedCategory = ref(null);
const currentPage = ref(1);

const settings = ref({
  itemsToShow: 1,
  snapAlign: "center",
  autoplay: 3000,
  transition: 3000,
});

const breakpoints = ref({
  // 700: {
  //   itemsToShow: 1,
  //   snapAlign: "center",
  //   autoplay: 3000,
  //   transition: 3000,
  // },
  1024: {
    itemsToShow: 1,
    snapAlign: "start",
    autoplay: 3000,
    transition: 3000,
  },
});

async function selectCategory(category) {
  selectedCategory.value = category;
}

watch(selectedCategory, async (newCategory) => {
  if (newCategory) {
    await products.getItemsByCategory(newCategory);
    allProducts.value = products.data;
  } else if (!newCategory) {
    if(newCategory == 'allProducts') await products.getId(0, 100);
    else await products.getId()
    allProducts.value = products.data;
  }
});

// UseEffcet

// React.useEffcet(()=>{

//  },[selectedCategory])

onMounted(async () => {
  await products.getId();
  allProducts.value = products.data;
  await products.getCategories();
  categories.value = products.categories;
});


    const goToPage = async (page) => {
      if (page >= 1 && page <= 13) {
        currentPage.value = page;
        await products.getId((page - 1) * 12);
        allProducts.value = products.data
      }
    };
</script>

<style lang="scss" scoped>
#product1 {
  text-align: center;
  h1{
    margin-bottom: 50px !important;
  }
  .filtern {
    border-bottom: 3px solid #2dd06e;
      padding: 9px 25px;
      background-color: black;
      cursor: pointer;
      margin: 7px 10px;
      color: white;
      font-weight: bolder;
      font-size: 1.1em;
      border-radius: 15px;
      &:hover {
        background: #9adc9a;
      }
      &.current {
        background: #9adc9a;
        
      }
    }
  
  
  .pro-container {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    flex-wrap: wrap;
  }
  .saleof {
    color: red !important;
  }
  .pro {
    width: 23%;
    min-width: 250px;
    padding: 10px 12px;
    border: 1px solid #cce7d0;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.02);
    margin: 15px 0;
    transition: 0.2 ease;
    position: relative;
    > img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 20px;
    }
    .des {
      text-align: start;
      padding: 10px 0;

      span {
        color: #606063;
        font-size: 14px;
        font-weight: 500;
      }
      h5 {
        padding-top: 7px;
        color: #1a1a1a;
        font-size: 13px;
        font-weight: 700;
      }
      i {
        font-size: 12px;
        color: rgb(243, 181, 25);
      }
      h4 {
        padding-top: 7px;
        font-size: 15px;
        font-weight: 700;
        color: #088178;
      }
      .cart {
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50px;
        background-color: #e8f6ea;
        font-weight: 500;
        color: #088178;
        border: 1 px solid #cce7d0;
        position: absolute;
        bottom: 20px;
        right: 10px;
      }
    }
  }
}
.carousel__item {
  width: 100%;
  height: 100%;
}

.fa-shopping-cart {
  color: lightgreen !important;
  .fa-shopping-cart:hover,
  .fa-shopping-cart.active {
    color: #088178;
  }
}

#banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  text-align: left;
  background-image: url("@/assets/images/banner.png");
  width: 100%;
  height: 300px;
  background-repeat: no-repeat;
  background-position: right;
  background-color: #0881794d;
  border-radius: 5px;
  padding: 15px 15px;
  h4 {
    color: #fff;
    font-size: 16px;
  }
  h2 {
    color: #fff;
    font-size: 30px;
    padding: 10px 0;
    span {
      color: darkmagenta;
    }
  }
  button:hover {
    background-color: #088178;
    color: #fff;
  }
}

#newsletter {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  background-color: rgba(139, 0, 139, 0.274);
  width: 100%;
  height: 150px;
  padding: 15px 15px;
  border-radius: 5px;
  h4 {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
  }
  p {
    font-size: 14px;
    font-weight: 600;
    color: #818ea0;
    span {
      color: darkred;
    }
  }
  .form {
    display: flex;
    width: 40%;
  }

  input {
    height: 3.125rem;
    padding: 0 1.25em;
    font-size: 14px;
    width: 100%;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  button {
    background-color: #0881794d;
    color: darkred;
    white-space: nowrap;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.filter-menu {
  width: 85%;
  margin: 50px auto;
  h1 {
    text-align: center;
    text-transform: uppercase !important;
    font-size: 1.5rem;
    margin: 20px 0;
    color: #088178;
  }
  .ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-bottom: 3px solid #2dd06e;
    padding-bottom: 10px;
    margin-bottom: 10px;
    li {
      padding: 9px 25px;
      background-color: black;
      cursor: pointer;
      margin: 7px 10px;
      color: white;
      font-weight: bolder;
      font-size: 1.1em;
      border-radius: 15px;
      &:hover {
        background: #484848;
      }
      &.current {
        background: #9adc9a;
        &:hover {
          background: #9adccc;
        }
      }
    }
  }
}
.pagination {

  margin: 0 auto;
  &-lnk {
    background: #fff;
    padding: 1.2rem 1.6rem;
    margin: 1rem 0;
    border-radius: 2rem;
    li {
      display: inline-block;
      line-height: 2.8;
      margin: 0.1rem;
      .active:link,
      .active:visited {
        background: #088178;
        color: white;
      }
    }
    a:link,
    a:visited {
      font-size: 1.5rem;
      font-weight: 400;
      background: #f4f4f4;
      border-radius: 1.5rem;
      color: #555;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.4s;
    }
    a:hover {
      background-color: #088178;
      color: white;
      padding: 1.2rem;
    }
  }
}
  .pagination{
    padding: 0 !important;
  }
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }

@media only screen and (max-width: 768px) {
  .ul {
    flex-direction: column;
    text-align: center;
  }
}

</style>
