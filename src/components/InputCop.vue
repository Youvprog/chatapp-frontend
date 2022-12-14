<template>
    <div class="input-container">
        <input 
            type="text" 
            class="input" 
            :placeholder="placeholder" 
            :value="id"
            @input="(event) => $emit('update:id', event.target.value)"
            >
    </div>
</template>

<script setup>

const props = defineProps(['id','placeholder'])


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
</style>