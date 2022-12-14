<script setup>
import { RouterLink, RouterView } from 'vue-router';


// function roomfunc() {
//     socket.emit('join-room', room.value, message => {
//         messageText.value = message
//     })
//   }
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <RouterView />
    </div>
  </div>
  
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
body {
  margin: 0;
  padding: 0;
}
.wrapper {
  font-family: 'Montserrat', sans-serif;
}
  .wrapper {
    background-color: #DDDDDF;
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2rem 0 2rem;
    width: 300px;
    height: 620px;
    border-radius: 30px;
    background: #e0e0e0;
    box-shadow: 15px 15px 30px #bebebe,
                -15px -15px 30px #ffffff;
}
.contacts {
    width: 300px;
    padding: 0.5rem;
    background-color: #999;
    height: 465px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.contact-list {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>
