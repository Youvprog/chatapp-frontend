import { defineStore } from 'pinia'

export const useUserContactStore = defineStore('userContactStore', {
    state: () => ({
        userContact: []
    }),
    actions: {
        setContacts() {
            if(localStorage.getItem('contact-list2')) {
                this.userContact = JSON.parse(localStorage.getItem('contact-list2'))
            } else {
                localStorage.setItem('contact-list2', JSON.stringify(this.userContact))
            }
        },
        addContact(contactName, contactId) {
            this.userContact.push({name: contactName , id: contactId})
            localStorage.setItem('contact-list2', JSON.stringify(this.userContact))
        }
    },
    getters: {

    }
})