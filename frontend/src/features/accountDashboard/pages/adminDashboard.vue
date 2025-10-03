<script setup>
import { ref } from 'vue';
import Tab1Content from '../components/AccountTab.vue';

const activeTab = ref('tab1');

function switchTab(tab) {
    activeTab.value = tab;
}
</script>

<template>
    <div class="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard page.</p>

        <!-- Tab Buttons -->
        <div>
            <button @click="switchTab('tab1')">My Account</button>
            <button @click="switchTab('tab2')">Meeting Minutes</button>
            <button @click="switchTab('tab3')">Account Manager</button>
        </div>

        <!-- Tab Content -->
        <div v-if="activeTab === 'tab1'">
            <Tab1Content />
        </div>
        <div v-if="activeTab === 'tab2'">
            <p>This is content for Tab 2.</p>
        </div>
        <div v-if="activeTab === 'tab3'">
            <p>This is content for Tab 3.</p>
        </div>
    </div>
</template>

<style scoped>
.admin-dashboard {
    padding: 2rem;
}
</style>