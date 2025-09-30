<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../stores/authStore';
import memberServices from '../services/memberServices';

// Reactive data
const memberFirstName = ref("");
const memberLastName = ref("");
const memberPhoneNumber = ref("");
const memberPostCode = ref("");

// Composables
const router = useRouter();
const userStore = useUserStore();

// Run on component mount at startup of webpage
onMounted(async () => {
  try {
    // Check authentication and load data
    if (!userStore.isAuthenticated) {
      console.warn('User not authenticated, redirecting to login.');
      logout();
      return;
    }

    // Use token from store for API calls
    const response = await memberServices.getCurrentUserDetails(userStore.getToken);
    console.log('API Response:', response); // Debug log
    
    memberFirstName.value = response.firstName;
    memberLastName.value = response.lastName;
    memberPhoneNumber.value = response.mobilePhone;
    memberPostCode.value = response.state;
    
  } catch (error) {
    console.error('Failed to load member data:', error);
    logout();
  }
});

// Methods
const logout = async () => {
  // Clear token from store
  userStore.logout();
  await router.push('/login');
};

</script>



<style scoped>
  
</style>

<template>
  <div class="">
    <h1>Member Dashboard</h1>
    <p>First Name: {{ memberFirstName }}</p>
    <p>Last Name: {{ memberLastName }}</p>
    <p>Phone Number: {{ memberPhoneNumber }}</p>
    <p>Postcode: {{ memberPostCode }}</p>
    <button @click="logout">Sign Out</button>
  </div>
</template>
