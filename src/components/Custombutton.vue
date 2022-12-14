<template>
    <button class="button">{{name}}</button>
</template>

<script setup>
  const props = defineProps(['name'])
</script>

<style scoped>
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