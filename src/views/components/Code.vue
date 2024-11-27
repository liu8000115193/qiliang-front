<template>

  <overlay :show="showPopup" @click="Close">
    <img class="img_code" @click="Close" :src="codeUrl" />
  </overlay>
  <div class="logo_wrap">
    <img src="@/assets/code.svg" class="logo" @click="HandleInfo">
  </div>
</template>

<script lang="ts" setup>
import QRCode from 'qrcode';
import { Overlay } from 'vant';

const props = defineProps(['ip'])

let codeUrl = ref('')
let showPopup = ref(false)
function HandleInfo() {
  QRCode.toDataURL(props.ip, {
    width:500,
    height:500
  }, function (err, url) {
    codeUrl.value = url
    showPopup.value = true
  })
}

function Close() {
  showPopup.value = false
}
</script>

<style lang="less" scoped>
.code {
  position: relative;

}

.logo {
  width: 8vw;
  height: 8vw;
  margin-right: 2vw;

  &_wrap {
    display: flex;
    position: fixed;
    top: 30vw;
    right: 0;
    width: 14vw;
    height: 11vw;
    background-color: #fff;
    align-items: center;
    justify-content: flex-end;
    border-top-left-radius: 5vw;
    border-bottom-left-radius: 5vw;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
}

.img_code {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  transform: translate(-50%, -50%);
}
</style>