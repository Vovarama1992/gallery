<script lang='ts'>

import { defineProps } from 'vue';

export default {
  props: {
    onInputChange: Function,
    value: String,

  },
  setup(props) {
    const handleInput = (event) => {
      props.onInputChange(event);
    };

    return {
      handleInput
    };
  }
};
</script>







<template>

    <div class='inputWrapper'>
            
            <label htmlFor='search'></label>
            <input type='text' placeholder='picture you are looking for' @input="handleInput" :value="value"  class='input'  id='search' name='search' />
            
                
                
            
        </div>
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
</style>



