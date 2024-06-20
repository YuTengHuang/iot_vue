<template>
  <div class="container">
    <div class="col h3">
      <button @click="goBack" class="btn btn-primary mt-3">&lsaquo; 返回</button>
    </div>
    <div class="row">
      <div class="col d-grid justify-content-center align-items-center">

        <!--商品卡-->
        <div class="row row-cols-auto justify-content-center">
          <div class="col row-cols-md-2 m-3" v-for="product in products" :key="product.product_id">
            <router-link class="card text-decoration-none" style="width: 18rem;" :to="'/product'+product.get_url">
              <img :src="product.get_thumbnail" class="card-img-top" style="height: 300px; width: auto;">
              <div class="card-body">

                <template v-if="isActive(product)">
                  <h5 class="card-title">(特價){{ product.product_name }}</h5>
                  <p class="card-text h5"><del class="align-top h6 text-body-tertiary">${{ product.product_price }}</del>${{ getActivePrice(product) }}</p>
                </template>

                <template v-else>
                  <h5 class="card-title">{{ product.product_name }}</h5>
                  <p class="card-text h5">${{ product.product_price }}</p>
                </template>

                <div class="col m-3  d-flex justify-content-center">
                  <router-link :to="'/product'+product.get_url" class="btn btn-primary">查看商品</router-link>
                  <!-- <a class="btn btn-primary" @click="AddToCart(product)" id="addCatbtn">+購物車</a> -->
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <!--商品卡-->
        
      </div>
    </div>
  </div>
  
</template>


<script>
import { goBack } from '@/JSFunction/goback';
  import axios from 'axios';
  import { isActive, getActivePrice } from '@/JSFunction/isActive.js'
  import { useToastStore } from '@/JSFunction/toast.js'
  export default {

    setup() {
        const toastStore = useToastStore()

        return {
          toastStore: toastStore
        }
    },

    name: 'ProductPage',
    data() {
      return {
        products:[

        ],
      }
    },

    mounted() {
      this.getLatestProducts()
      document.title = "商品總覽"
    },

    methods: {
      async getLatestProducts(){

        this.toastStore.isLoadingToast()

        await axios
          .get('api/productpageinfo/')
          .then(response => {
            // console.log(response.data)
            this.products = response.data
            // eslint-disable-next-line no-undef
            Swal.close()
          })

          .catch(error => {
            console.log(error)
          })

        
      },
      isActive,

      getActivePrice,

      goBack,

      // AddToCart(product){
      //   if (!this.$store.state.isPass) {
      //       this.$router.push({ name: 'LogIn', query: { to: this.$route.path } });
      //       return;
      //   }
      //   if (isNaN(this.quantity) || this.quantity < 1){
      //       this.quantity = 1
      //   }
      //   const item = {
      //       product: product,
      //       quantity: this.quantity
      //   }

      //   this.$store.commit('AddToCart', item)
      //   this.toastStore.addCartToast()
      // },
    }
  }
</script>
