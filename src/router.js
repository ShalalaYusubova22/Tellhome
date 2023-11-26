import { createRouter, createWebHistory } from "vue-router";
import HomePage from '@/components/HomePage.vue'
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'homepage', component: HomePage },
        { path: '/product/:id', name: 'product', component: () => import('@/components/CatalogItem.vue') },
        { path: '/cart', name: 'cart', component: () => import('@/components/Cart.vue') },
        { path: '/filter', name: 'filter', component: () => import('@/components/Filter.vue') },
    ]
})