<template>
    <div class="container">
        <section class="filter-menu">


            <div class="d-flex search  justify-content-between">
                <div class="d-flex flex-column">
                    <label for="">Search for name</label>
                    <input v-model="inputValue" @input="handleInputChange" type="text">
                </div>
                <ul class="d-flex align-items-center gap-3">
                    <!-- <li @click="sort('price', 'high')">Bahadan ucuza</li>
                    <li @click="sort('price', 'low')">Ucuzdan bahaya</li>
                    <li @click="sort('stock', 'high')">Stok azdan çoxa</li>
                    <li @click="sort('stock', 'low')">Stok çoxdan aza</li>
                    <li @click="sort">Sıfırla</li> -->


                    <li @click="sort('price', 'high')" :class="{ active: isActive('price', 'high') }">Price:High to Low</li>
                    <li @click="sort('price', 'low')" :class="{ active: isActive('price', 'low') }">Price:Low to High</li>
                    <li @click="sort('stock', 'high')" :class="{ active: isActive('stock', 'high') }">Stock:Hight to Low</li>
                    <li @click="sort('stock', 'low')" :class="{ active: isActive('stock', 'low') }">Stock:Low to High</li>
                    <li @click="sort">Refresh</li>

                </ul>
            </div>

            <div id="pagination-link" class="pro-container">
                <router-link :to="'/product/' + product.id" class="pro" v-for="(product, index) in paginatedProducts"
                    :key="index">
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

            <section class="pagination section-p1">
                <vue-awesome-paginate :total-items="totalItems" :items-per-page="perPage" v-model="currentPage"
                    @page-change="updateProducts" />
            </section>
        </section>

    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useId } from '@/Catalog';
const fetchData = useId();
const filteredProduct = ref(null);
const currentPage = ref(1);
const inputValue = ref('');
const filteredResults = ref([]);
const activeItem = ref('');

const perPage = 12;

onMounted(async () => {
    try {
        await fetchData.getProducts();
        if (fetchData.dataForFilter && fetchData.dataForFilter.products) {
            filteredProduct.value = fetchData.dataForFilter.products;
            filteredResults.value = filteredProduct.value || [];
        } else {
            console.error('No products found or incorrect data structure');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

const totalItems = computed(() => filteredResults.value?.length);
const paginatedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredResults.value?.slice(startIndex, endIndex);
});

const updateProducts = (page) => {
    currentPage.value = page;
};
const handleInputChange = (event) => {

    setTimeout(() => {
        filteredResults.value = event.target.value ? filteredProduct.value?.filter((text) => text.title.toLowerCase().includes(event.target.value)): filteredProduct.value;
        currentPage.value = 1
    }, 1000)
    resetFilters()
    
};

const sort = (type, sort) => {


    if (type == 'price') {
        if (sort === 'high') {
            filteredResults.value = filteredProduct.value.slice().sort((a, b) => b.price - a.price);
        } else {
            filteredResults.value = filteredProduct.value.slice().sort((a, b) => a.price - b.price);

        }

    }

    else if (type == 'stock') {
        if (sort === 'high') {
            filteredResults.value = filteredProduct.value.slice().sort((a, b) => b.stock - a.stock);
        } else {
            filteredResults.value = filteredProduct.value.slice().sort((a, b) => a.stock - b.stock);
        }
    }

    else {
        filteredResults.value = filteredProduct.value
    }
    activeItem.value = `${type}-${sort}`;
};
const isActive = (type, sort) => {
    return activeItem.value === `${type}-${sort}`;
};


const resetFilters = () => {
    
    activeItem.value = '';
};
</script>

<style lang="scss" scoped>
.pro-container {
    display: flex;
    justify-content: center;
    gap: 60px;
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

    >img {
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


.fa-shopping-cart {
    color: lightgreen !important;

    .fa-shopping-cart:hover,
    .fa-shopping-cart.active {
        color: #088178;
    }
}


.search{
label {
    color: #00AD33;
}
    input {
        border-radius: 16px;
        border: 1px solid #00AD33;
        padding: 10px;
        
    }

    ul {
        margin-bottom: 0;

        li {
            cursor: pointer;
            
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
    }
}
.active{
    color : blue;
}
</style>