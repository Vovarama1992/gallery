
<script >
import { ref, onMounted, watch } from 'vue';
import { fetchImages } from '../fetchers';

export default {
  props: {
    query: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const images = ref([]);
    const modalImageUrl = ref('');
    const modalImageAlt = ref('');
    const isModalOpen = ref(false);
    let timer = null;
    

    const openModal = (url, alt) => {
      modalImageUrl.value = url;
      modalImageAlt.value = alt;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const loadImages = async () => {
  try {
    const fetchedImages = await fetchImages(props.query);
    images.value = fetchedImages;
  } catch (error) {
    console.error('Ошибка при загрузке изображений:', error);
  }
};
    

    onMounted(loadImages);

    watch(
      () => props.query,
      (newValue, oldValue) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          loadImages();
        }, 300);
      }
    );

    return {
      images,
      closeModal,
      openModal,
      isModalOpen,
      modalImageUrl,
      modalImageAlt
    };
  }
};
</script>

<template>
  <div class='gallery'>
    <div v-for="(image, index) in images" :key="index" >
      <div class='imageWrapper' @click='openModal(image.full, image.alt)'>
        <img :src="image.url" :alt="image.alt"  >
      </div>
      <span class='span'>Likes: {{ image.likes }} </span><br>
      <span class='span'>Views: {{ image.views }}</span>
      
        
          <Transition>
            <div class="modal" v-if="isModalOpen" >
              <div class="modal-content">
            
            
                <img :src="modalImageUrl"  :alt="modalImageAlt" @click.stop />
            
            
                <button class='button' @click.stop="closeModal">Close</button>
              </div>
            </div>
          </Transition>
        
      
    </div>
  </div>
</template>



<style scoped>
.adder {
  position: fixed;
  left: 100px;
  top: 100px;
  width: 50vw;
  height: 50vh;
  background: green;
}
.gallery {
  
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); 
  row-gap: 20px; 
  column-gap: 10px;
}
.imageWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    overflow: hidden;
}
.button {
    margin: 0 25%;
    width: 50%;
}
.image-wrapper img {
  width: 100%; 
  height: 100%; 
  object-fit: cover;
}

.v-enter-active {
  transition: opacity 2s linear;
}
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}




@media (min-width: 768px) { 
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
  }
  .imageWrapper {
    width: 200px;
    height: 200px;
    
}
}

@media (min-width: 1024px) { 
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
  }
   .imageWrapper {
    width: 250px;
    height: 250px;
    
}
}
.modal {
  position: fixed;
  
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.modal-content {
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.modal img {
  width: 100%;
  max-height: 80vh;
}

.modal button {
  margin-top: 10px;
}



</style>




