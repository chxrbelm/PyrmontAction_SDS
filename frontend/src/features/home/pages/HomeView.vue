<template>
    <div class="home float-in">
        <Carousel v-if="isLoaded" class="carousel" v-slot="{ currentSlide }">
            <Slide v-for="(projectItem, index) in project" :key="index">
                <div v-show="currentSlide === index + 1" class="slide-info">
                    <img :src="`/src/assets/Projects/${projectItem.project_image}`" alt="image" />
                    <div class="overlay">
                        <h1 class="overlay-header">{{ projectItem.project_name }}</h1>
                        <ul class="button">
                            <li><router-link class="link" :to="{
                                name: 'Individual Projects', params: {
                                    projectType: projectItem.project_type,
                                    projectId: projectItem.project_id
                                }
                            }">LEARN MORE</router-link></li>
                        </ul>
                    </div>
                </div>
        </Slide>
        </Carousel>
    <CoreValues />
    <BecomeMember />
    </div>
</template>

<script setup>
import Carousel from "../components/Carousel.vue";
import Slide from "../components/Slide.vue";
import CoreValues from "../components/CoreValues.vue"
import BecomeMember from "../components/BecomeMemberSection.vue"

import { ref, onMounted } from 'vue';
import projects from "../../projects/services/projectServices"
const project = ref([]);
let response;
const isLoaded = ref(false);

onMounted(async () => {
  try {
    response = await projects.viewOpenProjects();
    const projectData = await response.json();
    project.value = projectData.projects.slice(-4);
    isLoaded.value = true;
  } catch (error) {
    console.error("Error loading projects:", error);
  }
});
</script>


<style lang="css" scoped>
.float-in {
  animation: floatIn 0.6s ease-out;
}

.carousel {
    position: relative;
    max-height: 100vh;
    height: 80vh;
}

.carousel .slide-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 100%;
    height: 100%;
}

.carousel img {
    min-width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(60%);
}

.carousel .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-65%, -50%);
    width: 60%;
    z-index: 90;
}

.carousel .overlay-header {
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 40px;
}

.carousel .overlay-desc {
    color: #fff;
}

.carousel .button {
    list-style: none;
    padding: 0;
}

.carousel .button li {
    margin-top: 20px;
}

.carousel .link {
    display: inline-block;
    padding: 12px 20px;
    background-color: #EBBD6D;
    color: #fff;
    text-decoration: none;
    border-radius: 30px;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.3s;
}

.carousel .link:hover {
    background-color: #ebae45;
}

@keyframes floatIn {
  0% {
    opacity: 0;
    transform: translateY(8%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>