import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: sessionStorage.getItem('auth_token') || null,
    }),
    actions: {
        setToken(token) {
            this.token = token;
            sessionStorage.setItem('auth_token', token);
        },
        clearToken() {
            this.token = null;
            sessionStorage.removeItem('auth_token');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
});