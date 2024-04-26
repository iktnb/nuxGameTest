import axios from 'axios';
import { defineStore } from 'pinia';

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: [],
        currentUser: null,
    }),

    getters: {
        isLoggedIn() {
            return this.currentUser !== null;
        },
    },

    actions: {
        logout() {
            this.currentUser = null;
            localStorage.removeItem('currentUser');
        },

        async login({ userName, phoneNumber }) {

            try {
                if (this.users.length === 0) {
                    await this.fetchUsers()
                }

                const user = this.users.find(user => user.username === userName && user.phone === phoneNumber);
                if (user) {
                    this.currentUser = user;
                    this.writeToLocalStorage();
                    return user;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async fetchUsers() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                this.users = response.data;
            } catch (error) {
                console.error(error);
            }
        },


        writeToLocalStorage() {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        },
        readFromLocalStorage() {
            const user = localStorage.getItem('currentUser');
            if (user) {
                this.currentUser = JSON.parse(user);
            }

            return this.currentUser;
        }

    },
});