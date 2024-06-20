<template>
  <div class="container">
    <div class="row row-cols-md-1 row-cols-lg-1">
      <div class="col">

        <div class="row-cols-auto">
          
          <!--搜尋欄位-->
          <form class="d-flex justify-content-center mt-3" @submit.prevent="submitForm">
            <div class="position-relative input-group w-50">
              <input class="form-control" type="search" v-model.trim="search" placeholder="Search" aria-label="Search" 
              @keydown="keyboardEvent" aria-describedby="button-addon2">
              <ul class="position-absolute shadow bg-white z-3 list-group-numbered p-0" 
              :class=" autoComplete ? '' : 'd-none'" style="top: calc(100% + 5px); left: 0; right: 0;">

                <li class="p-2 w-100" v-for="(item, i) in filterProducts" :key="item.id" 
                :class="{'hover-bg-light': hoverIndex === i || selectedIndex === i}"
                @mouseenter="hoverIndex = i, selectedIndex = hoverIndex"
                @mouseleave="hoverIndex = null, selectedIndex = -1">
                  <router-link class="text-decoration-none text-dark d-inline-block w-100" :to="'/product'+item.get_url">{{ item.product_name }}</router-link>
                </li>
              </ul>
              <router-link :to="searchProductUrl" class="btn btn-primary" :class=" {'disabled':searchProductUrl? false : true}" type="submit" >Search &raquo;</router-link>
            </div>
          </form>
          <!--搜尋欄位-->
          
        </div>

          
        <div class="row-cols-auto my-3">
          <nav class="nav nav-underline nav-fill" style="background-color: #ed188d;">
            <router-link class="nav-link" aria-current="page" to="/ProductPage" style="font-family: 'Roboto', sans-serif; color: white;">衣裝服飾</router-link>
            <a class="nav-link" style="font-family: 'Roboto', sans-serif; color: white;">美妝保養</a>
            <a class="nav-link" style="font-family: 'Roboto', sans-serif; color: white;">食品保健</a>
            <a class="nav-link" style="font-family: 'Roboto', sans-serif; color: white;">服飾包鞋</a>
          </nav>
        </div>

        <!--跑馬燈板-->
        <div class="row-cols-auto mb-4 w-75 mx-auto">
          <div id="carousels" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carousels" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carousels" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carousels" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner carousel-img">
              <div class="carousel-item active" data-bs-interval="5000">
                <router-link to="/log-in"><img src="/pexels-photo-325876.jpeg" class="d-block w-100" alt="..."></router-link>
              </div>
              <div class="carousel-item" data-bs-interval="5000">
                <router-link to="/log-in"><img src="/pexels-photo-298863.jpeg" class="d-block w-100" alt="..."></router-link>
              </div>
              <div class="carousel-item" data-bs-interval="5000">
                <router-link to="/log-in"><img src="/pexels-photo-250290.jpeg" class="d-block w-100" alt="..."></router-link>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousels" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousels" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <!--跑馬燈板-->



      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default {
  name: 'TheHome',
  data() {
    return {
      products: [],
      search: '',
      autoComplete: false,
      selectedIndex: -1,
      hoverIndex: null,
      searchProductUrl: ''
    }
  },
  mounted() {
    document.title = "iot-shopping"
    var myCarousel = document.getElementById('carousels')
    new bootstrap.Carousel(myCarousel)
    this.getProducts()
  },
  methods: {
    getProducts() {
      axios
        .get('api/product/')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    submitForm(){
      this.$router.push(this.searchProductUrl)
    },

    keyboardEvent(e) {

      if (e.keyCode === 38) {  // 上
        this.selectedIndex--
        if (this.selectedIndex < 0){
          this.selectedIndex = this.filterProducts.length - 1
        }

      } else if (e.keyCode === 40) {  // 下
        
        this.selectedIndex++

        if (this.selectedIndex > this.filterProducts.length - 1){
          this.selectedIndex = 0
        }
    
      } else if (e.keyCode === 13) {  // Enter
        const selectedProduct = this.filterProducts[this.selectedIndex];
        if (selectedProduct && selectedProduct.get_url) {
            this.search = selectedProduct.product_name;
            this.searchProductUrl = "/product"+selectedProduct.get_url;
            this.autoComplete = false;
        }
      }
    }
  },
  watch: {
    search(val) {
      if (val) {
        this.autoComplete = true;
      } else {
        this.autoComplete = false;
        this.getProducts();
      }
    },
    products () {
      if (this.filterProducts.length <= 1) {
        this.autoComplete = false;
      }
    }
  },
  computed: {
    filterProducts() {

      const cleanedSearch = this.search.trim().replace(/\s+/g, ' ');  // 將連續空格替換為單個空格

      if (!this.search.trim()) return [];
      const arr = [];
      const strArr = cleanedSearch.split(' ')
      strArr.forEach((str) => {
        this.products.forEach((item) => {
          if (item.product_name.includes(str)) {
            arr.push(item)
          }
        })
      })
      return [...new Set(arr)]
    }
  }
}
</script>
<style>
  .hover-bg-light {
    background-color: #eee;
  }

  .carousel-img img{
    width: 972px;
    height: 547px; 
  }
  
</style>