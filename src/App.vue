<script setup>
import { ref, onMounted } from 'vue';
import Search from './components/Search.vue';
import Gallery from './components/Gallery.vue';
import { fetchImages } from './fetchers';

const text = ref('');
const timer = ref(false);
function setQuery(e) {
    
        text.value = e.target.value;
      
    }

</script>
<template>
        <Search :onInputChange='setQuery' :value='text'/>
        
        <Gallery :query='text'/>
        
</template>

<style scoped>
.inputWrapper {
    display: flex;
    flex-direction: row;
    
    margin: 5px 35%;
    height: 30px;
    width: 30%;
    font-size: 1.5em;
    align-items: center;
   
    padding: 1px;
    
    color: rgb(69, 69, 199);
    border-radius: 5px;
    
  }
.input {
        width: 98%;
        height: 98%;
        border: none;
        outline: none;
        padding-left: 10px;
    }
</style
</style>

