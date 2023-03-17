<script setup>
import Home from './pages/Home.vue';
import ProductList from './pages/ProductList.vue';
import TheFooter from './components/Layout/TheFooter.vue';
import TheHeader from './components/Layout/TheHeader.vue';
</script>

<template>
  <TheHeader />
<router-link class="backEndButton" to="/backEnd">
    <div class="circle">後台</div>
  </router-link>
  <!-- <router-view v-slot="slotProps">
                <transition name="route" mode="out-in">
                  <component :is="slotProps.Component"></component>
                </transition>
              </router-view> -->
  <div id="main"><router-view /></div>
  <TheFooter />
</template>


<script>
export default {
  components: {
    TheHeader,
    TheFooter,
    Home,
    ProductList,
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

a:-webkit-any-link {
  text-decoration: none;
  color: inherit;
}

html {
  max-width: 100vw;
}

body {
  &::-webkit-scrollbar {
    display: none;
  }

  font-family: 'Manrope',
  'Microsoft JhengHei',
  sans-serif;

  img {
    pointer-events: none;
    user-select: none;
  }

  #main {
    max-width: 100%;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.backEndButton {
  position: fixed;
  top: 12vh;
  left: .5vw;
  z-index: 999;
  text-decoration: none;
  color: white;

  .circle {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #797979;
    font-weight: 700;
    font-size: 1.2rem;
    letter-spacing: .5rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    padding-left: 1.5rem;
    opacity: .4;
    transition: all .3s ease-in;

    &:hover {
      background-color: #D87D4A;
      opacity: 1;
    }
  }
}
</style>
