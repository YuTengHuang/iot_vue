<template>
  <main>
    <Home />
    <HotTimeProduct />
  </main>
</template>

<script>
  import Home from '../components/Home.vue'
  import HotTimeProduct from '@/components/HotTimeProduct.vue'

  export default {
    components: {
      Home,
      HotTimeProduct
    }
  }

</script>