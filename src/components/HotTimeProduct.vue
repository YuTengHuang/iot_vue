<template>
  <div class="container">

    <div class="row-cols-auto m-3">
      <nav class="nav nav-underline nav-fill justify-content-between" style="background-color: #ed188d;">
        <p class="m-3 h3" style="font-family: 'Roboto', sans-serif; color: white;">折扣商品</p>
        <router-link rel="next" to="/ProductPage" class="m-3 text-light">更多&rarr;</router-link>
      </nav>
    </div>
    <div class="row">
      <div class="col d-grid justify-content-center align-items-center">

        <!--商品卡-->
        <div class="row row-cols-auto justify-content-center" >
          <div class="col mb-3" v-for="product in products" :key="product.product_id">
            <router-link :to="'/product'+product.get_url" class="card text-decoration-none" style="width: 18rem;">
              <img :src="product.get_thumbnail" class="card-img-top" alt="..." style="height: 300px; width: auto;">
              <div class="card-body">
                <h5 class="card-title">(特價){{ product.product_name }}</h5>
                <p class="card-text h5"><del class="align-top h6 text-body-tertiary">${{ product.product_price }}</del>${{ getActivePrice(product) }}</p>
                <div class="col m-3 d-flex justify-content-center">
                  <router-link :to="'/product'+product.get_url" class="btn btn-primary">查看商品</router-link>
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
  import axios from 'axios'
  import {useToastStore} from '@/JSFunction/toast';
  import { getActivePrice } from '@/JSFunction/isActive.js'

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Product',

    setup() {
        const toastStore = useToastStore()

        return {
          toastStore: toastStore
        }
    },
    data() {
      return {
        products:[]
      }
    },

    mounted() {
      this.getLatestProducts()
    },

    methods: {
      async getLatestProducts(){
        
        this.toastStore.isLoadingToast()


        await axios
          .get('api/productsimpleinfo/')
          .then(response => {
            // console.log(response.data)
            this.products = response.data;
          })
          .catch(error => {
            console.log(error)
          })
          // eslint-disable-next-line no-undef
          Swal.close()
      },
      
      getActivePrice,
    }
  }
</script>
