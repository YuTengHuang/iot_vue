<template>
  <div id="wrapper">
    <nav class="navbar navbar-expand-lg p-3" data-bs-theme="dark" style="background-color: rgb(155, 155, 155);">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand ms-5"><strong class="h2">iot-shopping商城</strong></router-link>
      
        <div class="nav-item">
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbar-title" aria-controls="navbar-title" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span> 
          </button>

          <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="navbar-title" aria-labelledby="navbar-title">
            
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="navbar-title">iot-shopping商城</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            
            <template v-if="store.state.isPass"> 

              <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li class="nav-item">
                    <p to="/" class="m-2 nav-link"><strong>Hi {{ getName() }}</strong></p>
                  </li>
                  <li class="nav-item">
                    <router-link to="/" class="btn btn-secondary m-2 nav-link"><strong>首頁</strong></router-link>    
                  </li>
                  <li class="nav-item">
                    <router-link to="/ShoppingCart" class="btn btn-danger m-2 nav-link"><strong>購物車({{ cartLength }})</strong></router-link>          
                  </li>
                  <li class="nav-item">
                    <router-link to="/my-account" class="btn btn-primary m-2 nav-link"><strong>會員中心</strong></router-link> 
                  </li>
                  <li class="nav-item">
                    <a @click="logout()" class="btn btn-danger m-2 nav-link"><strong>登出</strong></a>
                  </li>
                </ul>
              </div>
            </template>
            
            <template v-else>                  
              <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li class="nav-item">
                    <router-link to="/" class="btn btn-secondary m-2 nav-link"><strong>首頁</strong></router-link>    
                  </li>
                  <li class="nav-item">
                    <router-link to="/ShoppingCart" class="btn btn-danger m-2 nav-link"><strong>購物車</strong></router-link>          
                  </li>
                  <li class="nav-item">
                    <router-link to="/my-account" class="btn btn-primary m-2 nav-link"><strong>會員中心</strong></router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/log-in" class="btn btn-success m-2 nav-link"><strong>登入</strong></router-link>
                  </li>
                </ul>
              </div>
            </template>

          </div>
        </div>

      </div>
    </nav> 
  
    <section class="section">
      <RouterView @cart-updated="getLengthFunc" @login="getLengthFunc"/>
    </section>

    <footer class="text-center footer-text" style="background-color: #ed188d;">
      <div class="container">
        <div class="row">
          <!--分三塊-->
          <!--1-->
          <div class="col-md-3">
            <div class="row">
              <div class="col m-3">
                <img style="width: 75%" src="@/components/icons/iotLOGO.png" alt="Company Logo"/>
              </div>
            </div>
 
            <div class="col">
                <a class="m-3" href="https://www.facebook.com/?locale=zh_TW"><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/da968fd63882528f7b71cde2d1411c727733448d0a8174f420683a152b5c054b?apiKey=67555212a233482cb20868f58213074b" alt="Facebook Icon"/></a>
                <a class="m-3" href="https://www.instagram.com/"><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/be9b062be6909b824756f101637d4faff762f9624b7fb2808b2ae56b4ea03c65?apiKey=67555212a233482cb20868f58213074b" alt="Instagram Icon" /></a>
                <a class="m-3" href="https://line.me/tw/"><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/59e6e44eab8b7d847ff1220a89b0512ae29d15e3cd978ab20d37aeb75a26b029?apiKey=67555212a233482cb20868f58213074b" alt="Line Icon"/></a>
                <a class="m-3" href="https://www.youtube.com/"><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/022fb6f07d89a44e28ca64f5d1d8aed3bf8f7cab200b594ad129dc11d299dcc1?apiKey=67555212a233482cb20868f58213074b" alt="YouTube Icon"/></a>
            </div>
            <div class="row m-3">
              <div class="col col-sm-12 col-md-12 col-lg-12">
                <p class="h6 text-light"><strong>xxx xx市xx區xxx路x段xxx號xx樓</strong></p>
                <p class="h6 text-light"><strong>統一編號: 12345678</strong></p>
              </div>
            </div>
          </div>
          <!--1-->

          <!--2-->
          <div class="col-md-6">
            <div class="row m-3 text-light">
              <div class="col-4 text-start col-md-4">
                <div class="row">
                  <p class="h5"><strong>關於我們</strong></p>
                </div>
                <div class="row fw-bolder text-break mt-3" style="font-size: 13px;">
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">榮耀時刻</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">大事記</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">人才招募</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">隱私權聲明</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">服務條款</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">商品專櫃總覽</a>
                </div>
              </div>
              <div class="col-4 text-start col-md-4">
                <div class="row">
                  <p class="h5"><strong>顧客服務</strong></p>
                </div>
                <div class="row fw-bolder text-break mt-3" style="font-size: 13px;">
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">聯絡我們</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">常見Q&amp;A</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">防詐騙宣導</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">退換貨說明</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">24h到貨說明</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">政令宣導</a>
                </div>

              </div>
              <div class="col-4 text-start col-md-4">
                <div class="row">
                  <p class="h5"><strong>會員中心</strong></p>
                </div>
                <div class="row fw-bolder text-break mt-3" style="font-size: 13px;">
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">iot-shopping</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">幫助中心</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">會員獨享</a>
                  <a href="#" class="mb-2 text-light text-decoration-none a-hover">折價券</a>
                </div>

              </div>
            </div>
          </div>
          <!--2-->
        
          <!--3-->
          <div class="col-md-3 qrcode">
            <div class="col my-3">
              <a><img src="@/components/icons/qrcode.png" alt="QRcode"></a>
            </div>
            
            <div class="badge text-bg-dark text-wrap" style="width: 9rem;">
              <p class="m-3 h6">下載 iotshop 24h購物 APP</p>
            </div>
          </div>
          <!--3-->
          <!--分三塊-->
        </div>
      </div>
      <p>Copyright@ 2024</p>
    </footer>

  </div>
</template>


<script>
  import axios from 'axios'
  import { useUserStore } from '@/store/user' 
  import { useToastStore } from '@/JSFunction/toast.js'
  import store from './store';
  export default{

    setup() {
        const userStore = useUserStore()
        const toastStore = useToastStore()

        return{
          toastStore,
          userStore,
          store
        } 
    },

    name: 'App',
    data(){
      return {
        cartLength: null,
      }
    },

    

    beforeCreate() {
      this.userStore.initializeStore()

      const token = this.userStore.user.access
      if (token){
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      }else{
        axios.defaults.headers.common["Authorization"] = "";
      }
    },

    created(){
      this.getLengthFunc()
    },

    methods: {

      async getLengthFunc(){
        if(this.$store.state.isPass){
          const len = await this.cartTotalLength()
          this.cartLength = len
        }
      },
      
      async cartTotalLength() {
        try {
          const response = await axios.get('api/shop/getlength/');
          return response.data.length;

        } catch (error) {

          console.log(error);
          return 0;

        }
      },

      getName(){
        return (this.userStore.user.nikename === null || this.userStore.user.nikename === '') ? this.userStore.user.username : this.userStore.user.nikename
      },

      
      logout () {

        this.userStore.removeToken()

        this.$router.push('/')

        this.toastStore.showSingupToast('success', "登出成功!")
          
      },

    },
  }
  
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  .a-hover:hover{
    color: blue !important;
    font-weight: bold !important;
    transition: .3s;
  }

  @media (min-width: 768px) {
    .qrcode img{
      width: 70%;
      height: 70%;
    }
    .footer-text .h5{
      font-size: 15px !important;
    }
  }
  @media (min-width: 992px) {
    .qrcode img{
      width: 50%;
      height: 50%;
    }
    .footer-text .h5{
      font-size: 1.25rem !important;
    }
  }
  #wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .section {
    flex: 1;
  }
</style>
