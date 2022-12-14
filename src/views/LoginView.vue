<template>
    <div class="container">
        <form @submit.prevent="submitted">
            <div class="input-container">
                <InputCop placeholder="Enter your Id" :id="id" @update:id="(id = $event)" />
            </div>
            <div class="button-container">
                <Custombutton name="Login"/>
                <Custombutton name="Auto ID" @click="generatedId"/>
                
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useLoginStore } from '../stores/loginStore';
import { useRouter } from 'vue-router';
import InputCop from '../components/InputCop.vue';
import Custombutton from '../components/Custombutton.vue';

const store = useLoginStore()
const router = useRouter()
let id  = ref(null)


onMounted(()=> {
    store.setId()
    if(store.isLogged) router.push('/dashboard')
})

function submitted() {
    if(id.value === null || id.value === '' || id.value === undefined) return alert('You have to enter or generate and ID')
    store.setId(id.value)
    localStorage.setItem('chatapp-id', id.value)
    router.push('/dashboard')
}

function generatedId() {
    id.value = uuidv4()
    store.setId(id.value)
    localStorage.setItem('chatapp-id', id.value)
    router.push('/dashboard')
}
</script>

<style scoped>

.input {
    width:90%;
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
.button {
    padding: 1.3em 3em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
}

.button:hover {
  background-color: #703EFE;
  box-shadow: 0px 15px 20px #7e68ba;
  color: #fff;
}

.button-container{
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    max-width: 150px;
    gap: 1rem;
}
</style>
