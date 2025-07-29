<template>
  <div class="navbar">
    <div class="row">
      <img @click="Close" src="@/assets/shutdown.svg" class="shutdown_logo" alt="关机" />
      {{ today }}
    </div>
    <div class="row">
      <Wifi @update="UpdateIp"></Wifi>
      <div class="elec" :style="elecStyle">
        {{ elec }}
      </div>
      <img v-if="showElec" src="@/assets/elec.svg" style="width: 6vw;height: 6vw;">
      <img @click="Reload" src="@/assets/refresh.svg" class="logo" style="margin-left: 2vw;width: 6vw;height: 6vw;" alt="刷新" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog } from 'vant';
import { getElectricity, closeEquipment } from '@/service/use';
import { useDateFormat, useNow } from '@vueuse/core'
import Wifi from '@/components/Wifi.vue';
const today = useDateFormat(useNow(), 'MM-DD HH:mm (ddd)', { locales: 'zh-CN' })

const emits = defineEmits('update')
onMounted(() => {
  GetElectricity()
})
// 关机
function Close() {
  showConfirmDialog({
    title: '提示',
    className: 'custom-dialog',
    teleport: '.navbar',
    message:
      '是否关闭设备？',
  })
    .then(() => {
      closeEquipment()
    })
}
// 获取电量
let t = null
let elec = ref()
let showElec = ref(false)
let elecStyle = computed(() => {
  if (elec.value < 20) return { background: `linear-gradient(to right, #eb1010 0% ${elec.value}%, #fff ${elec.value}%)` }
  else if (elec.value < 60) return { background: `linear-gradient(to right, #f6f20e 0% ${elec.value}%, #fff ${elec.value}%)` }
  else return { background: `linear-gradient(to right, #fff 0% ${elec.value}%, #000 ${elec.value}%)` }
})
function GetElectricity() {
  clearTimeout(t)
  getElectricity().then(res => {
    if (res.data - elec.value > 0) {
      showElec.value = true
    } else {
      showElec.value = false
    }
    elec.value = res.data
    t = setTimeout(() => {
      GetElectricity()
    }, 60000)
  })
}

// 刷新
function Reload() {
  location.reload()
}

function UpdateIp(){
  emits('update')
}
</script>

<style lang="less" scoped>
.navbar {
  padding: 10px 10px 0 0;
  position: relative;
  width: 100vw;
  left: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  box-sizing: border-box;
  z-index: 100;
  justify-content: space-between;

  .custom-dialog {
    width: 80vw;
    font-size: 16px;
  }

  & .shutdown_logo {
    width: 5vw;
    height: 5vw;
    padding: 3vw 5vw;
  }

  & .elec {
    width: 6vw;
    height: 3vw;
    line-height: 3vw;
    font-size: 12px;
    border: 1vw solid #ccc;
    border-radius: 2px;
    margin: 4vw 2vw;
    position: relative;
    color: #312f2f;

    &::after {
      content: '';
      width: 2px;
      height: 10px;
      background-color: #ccc;
      position: absolute;
      top: 50%;
      right: -6px;
      transform: translateY(-50%);
      border-radius: 2px;
    }
  }

  & .row {
    display: flex;
    align-items: center;
    text-align: center;
  }
}
</style>