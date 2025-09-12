<template>
  <div v-if="showPopup" class="wrap" @click.stop="Close">
    <div class="popup" @click.stop="">
      <div class="title">{{ title }}</div>
      <slot class="content"></slot>
      <button class="btn" @click="Update">确定</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props =defineProps(['title','showPopup'])
const emits = defineEmits(['update:showPopup','confirm'])

function Close(){
  console.log('close :>> ');
  emits('update:showPopup',false)
}

function Update(){
  emits('confirm')
  Close()
}
</script>
<style lang="less" scoped>
.wrap {
  background-color: #000;
  opacity: 0.77;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  box-sizing: border-box;
  z-index: 999;
  font-size: 4vw;

  .popup {
    width: 100vw;
    opacity: 1;
    margin: 40vw 6vw;
    align-items: center;

    .title {
      font-size: 5vw;
      font-weight: 500;
      line-height: 6vw;
      margin-bottom: 12vw;
    }

    .btn {
      background-color: #294BC2;
      width: 35vw;
      height: 13vw;
      color: #fff;
      border: none;
      border-radius: 3vw;
      margin-top: 18vw;
    }
  }
}
</style>