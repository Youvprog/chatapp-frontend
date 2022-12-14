<template>
    <div class="container">
        <div class="navbar">
            <ul class="options">
                <li class="option"><img src="../assets/contacts.png" @click="open = !open"></li>
                <li class="option"><img src="../assets/plus.png" @click="openModal = !openModal"></li>
            </ul>
        </div>
        <Modal :open="openModal" @close-modal="openModal = !openModal" width="50%">
            <template v-slot:modal-header>
                Add new Contact
            </template>
            <template v-slot:modal-body>
                <input type="text" v-model="contact.id" class="input2" placeholder="Contact id">
                <input type="text" v-model="contact.name" class="input2" placeholder="Contact name">
            </template>
            <template v-slot:modal-footer>
                <Custombutton name="Add" @click="addContact"/>
                <Custombutton name="Close" @click="closeModal"/>
            </template>
        </Modal>
        <div v-if="open" class="add-contact">
            <span class="user-id">Your id: {{store.id}}</span>
            <h4 class="title">Your contacts</h4>
            <ul class="contact-list">
                <li v-for="ctc in contacts">
                    <span class="user-contact">{{ctc.name}}</span>
                </li>
            </ul>
        </div>
        <div class="messages">
            <Message v-for="message in messages" 
                    :message="message"
                    :id="store.id"
                    :from="message.from"
                />
            <div ref="bottom" class="myDiv"></div>
        </div>
        <form class="form" @submit.prevent="submittedMsg">
            <div class="messaging-container">
                <input type="text" class="input" v-model="message">
                <button class="button-send">
                    <div class="arrow-up"></div>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import io from 'socket.io-client'
import { useLoginStore } from '../stores/loginStore'
import { useUserContactStore } from '../stores/userContactStore'
import Custombutton from '../components/Custombutton.vue'
import Message from '../components/Message.vue'
import Modal from '../components/Modal.vue'


const contactStore = useUserContactStore()
const store = useLoginStore()
let message = ref('')
let messages = ref([])
let bottom = ref(null)
let socket = io('https://chat-app-backend-l31b.onrender.com', {query: {id: store.id}, transports: ['websocket']})
let open = ref(false)
let contact = ref({name: '', id: ''})
let openModal = ref(false)

onMounted(() => {
    watch(
        messages,
        () => {
            nextTick(() => {
                bottom.value?.scrollIntoView({behavior: 'smooth'})
            })
        },
        { deep: true}
    )
    contactStore.setContacts()
})

const contacts = computed(() => {
    return contactStore.userContact
})


function submittedMsg() {
    if(message.value === '') return
    else {
        messages.value.push({msg: message.value, time:new Date().getHours() +":" + new Date().getMinutes(), to: contactStore.userContact, from: store.id })
        socket.emit('send-message', message.value, contactStore.userContact, store.id)
        message.value = ''
    }
}

function receiveMessages() {
    socket.on('receive-message', (message, id, contacts) => {
        const msgFrom = contactStore.userContact.filter(item => item.id === id)
        messages.value.push({msg: message, time:new Date().getHours() +":" + new Date().getMinutes(), to: contacts, from: msgFrom[0].name })
    })
}


function addContact(){
    if(contact.value.id === '' && contact.value.name === '') return
    contactStore.addContact(contact.value.name, contact.value.id)
    contact.value.id = ''
    contact.value.name =''
    openModal.value = !openModal.value
}
function closeModal() {
    openModal.value = !openModal.value
}

receiveMessages()

socket.on('connect_error', (err) => {
    console.log('error due to ', err.message)
})

socket.on('disconnect', () => {
    console.log(`socket with id ${store.id} disconnected`)
})

</script>

<style scoped>
img {
    width: 32px;
    height: 32px;
}
img:hover {
    transform: scale(1.1);
}
.title {
    margin: 0;
}
.messages {
    margin: 0 0 1rem 0;
    background-color: #FFF;
    height: 450px;
    border-radius: 15px;
    padding: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
}

.messaging-container {
    display: flex;
    justify-content: space-between;
}
.input {
    border: none;
    border-radius: 15px;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1),
                -6px -6px 12px #c5c5c5;
    font-size: medium;
}

.input:focus {
    outline-color: #703EFE;
}
.button-send {
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #703EFE;
  color: #FFF;
  border-radius: 60px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  z-index: 100;
  border: #004dff;
  transition: 0.5s;
}

.button-send:hover {
  transform: scale(1.1);
}

.button-send:active {
  background-color: #020cd1;
}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  margin-left: auto;
  margin-right: auto;
  margin-top: 35%;
  margin-bottom: 60%;
  border-bottom: 15px solid white;
}

::-webkit-scrollbar{
    display: none;
}

.navbar {
    display: flex;
    justify-content: center;
    background-color: #e0e0e0;
    border-radius: 15px;
    border: 1px #fff solid;
    margin-bottom: 0.2rem;
}
.options {
    margin: 0;
    padding: 0.2rem;
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: space-around;
}

.option {
    cursor: pointer;
}
.add-contact {
    background-color: #e0e0e0;
    border: 1px #fff solid;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    position: absolute;
    z-index: 3;
}

.input2 {
 line-height: 28px;
 border: 2px solid transparent;
 border-bottom-color: #777;
 padding: .2rem 0;
 outline: none;
 background-color: transparent;
 color: #0d0c22;
 transition: .3s cubic-bezier(0.645, 0.045, 0.355, 1);
 margin-bottom: 0.2rem;
}

.input2:focus, input:hover {
 outline: none;
 padding: .2rem 1rem;
 border-radius: 1rem;
 border-color: #703EFE;
}

.input2::placeholder {
 color: #777;
}

.input2:focus::placeholder {
 opacity: 0;
 transition: opacity .3s;
}
.contact-list {
    word-break: break-all;
}
.user-id {
    word-break: break-all;
    font-size: 11px;
    opacity: 1;
}
.user-contact {
    word-break: break-all;
    font-size: 13px;
    opacity: 1;
}
</style>
