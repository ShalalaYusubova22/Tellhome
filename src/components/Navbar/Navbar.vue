<template>
  <div class="container">
    <section id="header">
      <!-- <a> - Внешние ссылки -->
      <!-- <RouterLink> - Внутренние ссылки -->
      <RouterLink to="/">
        <img src="@/assets/images/logo.svg" class="logo" alt="" />
        <span class="lgs">TellHome</span>
      </RouterLink>

      <div>
        <ul id="navbar" :class="{ active: isNavActive }">
          <li><a class="active" href="#home">Home</a></li>
          <li><RouterLink to="">Shop</RouterLink></li>
          <li><RouterLink to="">Blog</RouterLink></li>
          <li><RouterLink to="">About</RouterLink></li>
          <li><RouterLink to="">Contact</RouterLink></li>
          <li>
            <RouterLink to="/cart"
              ><i class="fas fa-shopping-bag mobile-non"></i
            ></RouterLink>
          </li>
          <span class="count_basket mobile-non">{{basket?.basketLength || 0}}</span>
          <a href="#" id="close" @click="isNavActive = false"
            ><i class="fas fa-times"></i
          ></a>
        </ul>
      </div>
      <div id="mobile">
        <RouterLink to="/cart"><i class="fas fa-shopping-bag"></i></RouterLink>
        <i id="bar" class="fas fa-outdent" @click="isNavActive = true"></i>
          <span class="count_basket mobile-show">{{basket?.basketLength || 0}}</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { useId } from "@/Catalog";

const isNavActive = ref(false);
const basket = useId()

</script>

