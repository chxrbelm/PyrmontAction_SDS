<!-- src/views/GalleryView.vue -->
<template>
  <div class="gallery-container">
    <GalleryHeader />
    <GalleryGrid
        :images="galleryImages"
        @select-image="openLightbox"
    />
    <GalleryLightbox
        v-if="selectedImage"
        :image="selectedImage"
        @close="closeLightbox"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GalleryHeader from '@/features/gallery/components/GalleryHeader.vue'
import GalleryGrid from '@/features/gallery/components/GalleryCollage.vue'
import GalleryLightbox from '@/features/gallery/components/GalleryLightbox.vue'
import galleryService from '../services/galleryServices'



const galleryImages = ref([])

try{

  async function fetchData(){
      const response = await galleryService.getAllImages();
      const galleryData = await response.json();
      galleryImages.value = galleryData.images;
      console.log(galleryImages.value)

  }
  fetchData();

    

}
catch(error){
    console.log(error)
}



// const galleryImages = ref([
//   {
//     id: 1,
//     alt: 'Description for gallery image 1',
//     caption: 'Caption for Image 1'
//   },
//   {
//     id: 2,
//     alt: 'Description for gallery image 2',
//     caption: 'Caption for Image 2'
//   },
//   {
//     id: 3,
//     alt: 'Description for gallery image 3',
//     caption: 'Caption for Image 3'
//   },
//   {
//     id: 4,
//     alt: 'Description for gallery image 4',
//     caption: 'Caption for Image 4'
//   },
//   {
//     id: 5,
//     alt: 'Description for gallery image 5',
//     caption: 'Caption for Image 5'
//   },
//   {
//     id: 6,
//     alt: 'Description for gallery image 6',
//     caption: 'Caption for Image 6'
//   },
//   {
//     id: 7,
//     alt: 'Description for gallery image 7',
//     caption: 'Caption for Image 7'
//   }
// ])

const selectedImage = ref(null)

function openLightbox(image) {
  selectedImage.value = image
}

function closeLightbox() {
  selectedImage.value = null
}
</script>

<style scoped>
.gallery-container {
  padding: 3rem 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
