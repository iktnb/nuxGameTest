import axios from 'axios';
import { defineStore } from 'pinia';
import { useUsersStore } from './users';

import { v4 as uuidv4 } from 'uuid';

export const useTodosStore = defineStore({
    id: 'todos',
    state: () => ({
        todos: [],
        favoriteIds: []
    }),
    actions: {
        isFavorite(todo) {
            return this.favoriteIds.includes(todo.id);
        },
        favoriteChange(todo) {
            if (this.isFavorite(todo)) {
                this.removeIdFromFavorites(todo.id);
            } else {
                this.addIdToFavorites(todo.id);
            }
        },

        addIdToFavorites(id) {
            this.favoriteIds.push(id);
            this.writeFavoritesToLocalStorage()
        },

        removeIdFromFavorites(id) {
            const index = this.favoriteIds.findIndex(favId => favId === id);
            if (index !== -1) {
                this.favoriteIds.splice(index, 1);
            }
            writeFavoritesToLocalStorage()
        },

        writeFavoritesToLocalStorage() {
            localStorage.setItem('favorites', JSON.stringify(this.favoriteIds));
        },

        readFavoritesFromLocalStorage() {
            const favorites = localStorage.getItem('favorites');
            if (favorites) {
                this.favoriteIds = JSON.parse(favorites);
            }
        },

        addTodo(todo) {
            const userStore = useUsersStore();
            const newTodo = {
                userId: userStore.currentUser.id || null,
                id: uuidv4(),
                title: todo.title,
                completed: todo.completed
            }

            this.todos.unshift(newTodo);
            this.writeTodosToLocalStorage();
        },

        removeTodo(todo) {
            const index = this.todos.findIndex(t => t.id === todo.id);
            if (index !== -1) {
                this.todos.splice(index, 1);
                this.writeTodosToLocalStorage();
            }
        },

        changeTodoStatus(todo) {
            const foundTodo = this.todos.find(t => t.id === todo.id);
            if (foundTodo) {
                foundTodo.completed = !foundTodo.completed;
                this.writeTodosToLocalStorage();
            }
        },

        async fetchTodos() {
            this.readTodosFromLocalStorage();
            this.readFavoritesFromLocalStorage();
            if (this.todos.length > 0) {
                return;
            }

            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                this.todos = response.data;
                this.writeTodosToLocalStorage();
            } catch (error) {
                console.error(error);
            }
        },

        writeTodosToLocalStorage() {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        readTodosFromLocalStorage() {
            const todos = localStorage.getItem('todos');
            if (todos) {
                this.todos = JSON.parse(todos);
            }
        },
    }
})