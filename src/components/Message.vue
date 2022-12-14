<template>
    <div :class="(id !== from ? 'receiver': 'sender')">
        <div class="msg">
            <div class="sended">
                {{message.msg}}
            </div>
            <div class="time">
                {{message.time}}
            </div>
        </div>
        <p v-if="(id === from)" class="from">me</p>
        <p v-else class="from"> {{message.from}}</p>
    </div>
</template>

<script setup>
const props = defineProps(['message','id','from'])
</script>

<style scoped>
.msg {
    margin: 0 0 0.2rem 0;
    background-color: #703EFE;
    border-radius: 7px;
    padding: 0.5rem;
    color: #fff;
    max-width: fit-content;
    display: flex;
    flex-direction: column;
}
.sended {
    word-break: break-all;
    font-size: 13px;
}
.time {
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
}
.sender {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.receiver {
    display: flex;
    flex-direction: column;
}
.receiver .msg {
    background-color: #e0e0e0;
    color: #000;
}
p {
    margin: 0;
    padding: 0;
    opacity: 0.5;
    font-size: 11px;
}
</style>