<template>
  <div class="container">
    <section id="prodetails" class="section-p1">
      <div class="single-pro-image">
        <div class="carousel" v-if="current">
           <swiper :pagination="true" watch-slides-progress :modules="[Thumbs]" :thumbs="{ swiper: thumbsSwiper }" >
            <swiper-slide v-for="(img,idx) in current.images" :key="idx">
              <img :src="img" alt="">
            </swiper-slide>
            </swiper>
          <swiper
            @swiper="setThumbsSwiper"
            :modules="modules"
            :slides-per-view="3"
            watch-slides-progress
            :pagination="true"
            :navigation="true"
          >
             <swiper-slide v-for="(img,idx) in current.images" :key="idx">
              <img :src="img" alt="">
            </swiper-slide>
          </swiper>
        </div>

        <div class="small-img-group">
          <div class="small-img-col">
            <img
              src="@/assets/images/pro1.png"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
          <div class="single-pro-detailes">
            <h3>{{ current?.title }}</h3>
            <h5>{{ current?.description }}</h5>
            <h4>{{ current?.model }}</h4>
            <h3>{{ current?.price }}$</h3>
            <span class="saleof">
              Sale of-
              {{
                Math.ceil(
                  current?.price -
                    (current?.price * current?.discountPercentage) / 100
                )
              }}$</span
            >
            <h4>rating:{{ current?.rating }} - 5</h4>
            <h4 class="ship">On shipping: {{ current?.stock }}</h4>
            <button @click="addToCart(), updateCartItemCount()" class="btn">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css"
import "swiper/scss/free-mode"
import "swiper/scss/navigation"
import "swiper/scss/thumbs"

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


import { useId } from "@/Catalog"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination, Navigation, Thumbs } from "swiper/modules"
const modules = ref([Pagination, Navigation, Thumbs])
const thumbsSwiper = ref(null)

const notifyAdd = () => {
      toast.success("Product added", {
        autoClose: 2500,
        position : "bottom-right"
      }); 
    }


    const notifyQuantity = () => {
      toast.info("Product's quantity increded", {
        autoClose: 2500,
        position : "bottom-right"
      }); 
    }

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const storedData = ref(0)
const products = useId()
let current = ref(null)
const updateCartItemCount = async () => {
  const currentBasket = await JSON.parse(localStorage.getItem("products") || [])
  storedData.value = currentBasket.length
  products.setValue(currentBasket.length)
}
onMounted(async () => {
  await products.getItem(useRoute().params.id)
  current.value = products.product
})

function addToCart() {
  const product = { ...current.value, quantity: 1 }
  let currentBasket = JSON.parse(localStorage.getItem("products")) || []
  const existingProductIndex = currentBasket?.findIndex(
    (item) => item.id === product.id
  )

  if (existingProductIndex !== -1) {
    currentBasket[existingProductIndex].quantity += 1
    notifyQuantity()
  } else {
    currentBasket.push(product)
    notifyAdd()
  }

  localStorage.setItem("products", JSON.stringify(currentBasket))
}
</script>

<style lang="scss" scoped>
#prodetails {
  .single-pro-detailes {
    .saleof {
      color: red;
      display: block;
      margin-bottom: 20px;
      margin-top: 10px;
    }

    .ship {
      color: green;
      display: block;
      margin-top: 20px;
      margin-bottom: 40px;
    }

    .btn {
      border: 1px solid #088178;
      background: #088178;
      padding: 10px;
      color: white;
      border-radius: 6px;
      text-decoration: none;
      transition: 0.4s;

      &:hover {
        background: white;
        color: #088178;
        transition: 0.4s;
      }
    }
  }

  .single-pro-image {
    display: flex;
    justify-content: space-between;
    margin-right: 50px;

  @media (max-width:477px) {
    flex-direction: column;
    margin-right: 0 !important;
    justify-content: start;
  }

  }

  .small-img-group {
    display: flex;
    justify-content: space-between;
  }

  .small-img-col {
    flex-basis: 24%;
    cursor: pointer;
  }
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 300px;
  @media (max-width:477px) {
    height: 200px !important;
  }
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper2 {
  height: 80%;
  width: 100%;
}

.mySwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
