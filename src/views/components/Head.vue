<template>
  <div class="navbar">
    <div class="row">
      <img @click="Close" src="@/assets/shutdown.svg" class="shutdown_logo" alt="关机" />
      <div @click="showPopup = true">{{ today }}</div>
    </div>
    <div class="row">
      <Wifi @update="UpdateIp"></Wifi>
      <div class="elec" :style="elecStyle">
        {{ elec }}
        <img v-if="showElec" src="@/assets/elec.svg" style="width: 3vw;height: 3vw;">
      </div>

      <img @click="Reload" src="@/assets/refresh.svg" class="logo" style="margin-left: 2vw;width: 6vw;height: 6vw;"
        alt="刷新" />
    </div>
  </div>
  <!-- 圆角弹窗（底部） -->
  <Popup v-model:show="showPopup" round position="bottom" :style="{ height: '50vh' }">
    <!-- <input type="datetime-local" name="datetime-local"/> -->
    <DatePicker v-if="type == 'date'" option-height="10vw" v-model="date" type="date" title="选择日期" @confirm="handleTime('date')" @cancel="ClosePopup" />
    <TimePicker v-else v-model="time" option-height="10vw" title="选择时间" @confirm="handleTime('time')" @cancel="ClosePopup" />
  </Popup>
</template>

<script setup lang="ts">
import { showConfirmDialog, DatePicker, Popup,TimePicker } from 'vant';
import { getElectricity, closeEquipment } from '@/service/use';
import { useDateFormat, useNow } from '@vueuse/core'
import Wifi from '@/components/Wifi.vue';
import '@vant/touch-emulator';

let today = useDateFormat(useNow(), 'MM-DD HH:mm (ddd)', { locales: 'zh-CN' })

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

function UpdateIp() {
  emits('update')
}

// 更新时间弹窗
let showPopup = ref(false)
let date = ref([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()])
let time = ref([new Date().getHours(), new Date().getMinutes()])
let type = ref<'date' | 'time'>('date')
function handleTime(val:string) {
  if (val === 'date') {
    type.value = 'time'
    today = useDateFormat(`${date.value.join('-')} ${time.value.join(':')}`, 'MM-DD HH:mm (ddd)', { locales: 'zh-CN' })
  } else {
    type.value = 'date'
    ClosePopup()
  }
  
}

function ClosePopup() {
  showPopup.value = false
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
    display: flex;
    align-items: center;

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