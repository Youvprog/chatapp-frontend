import { defineStore } from 'pinia'


export const useLoginStore = defineStore('loginStore', {
    state: () => ({
        id: null,
        isLogged: false,
    }),
    actions: {
        setId(id) {
            if(localStorage.getItem('chatapp-id')) {
                this.id = localStorage.getItem('chatapp-id')
                this.isLogged = true
            } else if( id !== undefined) {
                this.id = id
                this.isLogged = true
            } else {
                this.id = null
                this.isLogged = false
            }
        }
    },
    getters: {

    }
})