<template>
  <img @click="GetWifi" src="../assets/WIFI.svg" class="logo" alt="wifi" />
  <span @click="GetWifi">{{ useWifi.ssid || '' }}</span>
  <Loading v-if="isRefresh" size="6vw" />
  <Popup position="top" v-model:show="showWifi">
    <div class="wifi" ref="wifiHtml">
      <div style="text-align: left;margin-top: 6vh;padding: 10px 0;">已保存网络</div>
      <div v-for="item in saveList" :key="item" class="item" :class="[item == useWifi.ssid && 'item_active']"
        @click="HandleWifi(item, true)">
        <span>{{ item }}</span>
        <span>{{ item == useWifi.ssid ? '(使用中)' : '' }}</span>
      </div>
      <div style="text-align: left;padding: 20px 0;">可用网络</div>
      <div v-for="item in wifiList" :key="item.ssid" class="item" @click="HandleWifi(item)">
        <span>{{ item.ssid }}</span>
      </div>
      <div class="between">
        <span style="color: #ccc;">可用网络</span>
        <span v-if="!isRefresh" style="color: #0080ff;" @click="RefreshWifi">刷新</span>
        <Loading v-else size="6vw" />
      </div>
    </div>
  </Popup>

  <ConfigProvider :theme-vars="themeVars">
    <Dialog v-model:show="showConnect" show-cancel-button @confirm="Connect" @cancel="showConnect = false" width="70vw">
      <template #title>
        <div style="height: 6vh;line-height: 6vh;">
          {{ params.name }}
        </div>
      </template>
      <div style="height: 10vh;">
        <Field style="line-height: 5vh;font-size: 3vh;color: #000;" v-model="params.password" 
          label="密码" label-width="12vw" placeholder="请输入密码" border readonly></Field>
      </div>
    </Dialog>
    <SimpleKeyboard v-if="showConnect" :onChange="handleKeyboardInput" />
  </ConfigProvider>
</template>

<script setup>
import { getWifiList, connectWifi } from '@/service/use';
import { Popup, Dialog, Loading, Field, ConfigProvider, showNotify } from 'vant';
import SimpleKeyboard from "./Keyboard.vue";
import { useSwipe, useEventListener } from '@vueuse/core'

const emits = defineEmits('update')
let wifiList = ref([])
let saveList = ref([])
let wifiHtml = ref()
let useWifi = ref({ ssid: '' })
let isDragging, startY, startScrollTop
onMounted(() => {
  getWifiList().then(res => {
    wifiList.value = res.data.list.filter(x => !res.data.saveList.includes(x.ssid))
    saveList.value = res.data.saveList
    let r = res.data.list.find(x => x.inUse)
    if (r) useWifi.value = r
  })
  useEventListener(wifiHtml, 'pointerdown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startScrollTop = wifiHtml.value.scrollTop;
  })

  useEventListener(wifiHtml, 'pointerup', (e) => {
    isDragging = false;
  })

  useEventListener(wifiHtml, 'pointermove', (e) => {
    const threshold = 10
    if (!isDragging) return;
    const deltaY = (startY - e.clientY) * 0.5;
    if (threshold < Math.abs(deltaY)) {
      const scrollFraction = deltaY / wifiHtml.value.clientHeight;
      // wifiHtml.value.scrollTop = startScrollTop - scrollFraction * wifiHtml.value.clientHeight
      wifiHtml.value.scrollTop = startScrollTop + scrollFraction * wifiHtml.value.clientHeight
    }
  })
})

// 获取wifi,连接wifi
let showWifi = ref(false)
function GetWifi() {
  showWifi.value = true
  if (wifiList.value.length == 0) {
    isRefresh.value = true
    getWifiList().then(res => {
      isRefresh.value = false
      wifiList.value = res.data.list.filter(x => !res.data.saveList.includes(x.ssid))
      saveList.value = res.data.saveList
      useWifi.value = res.data.list.find(x => x.inUse)
    })
  }
}
let params = reactive({ name: '', password: '' })
let showConnect = ref(false)
function HandleWifi(item, type) {
  showWifi.value = false
  isRefresh.value = true
  if (type) {
    params.name = item
    Connect()
    return
  }
  if (item.isUse) return
  params.name = item.ssid
  params.password = ''
  showConnect.value = true
}
function Connect() {
  showConnect.value = false
  isRefresh.value = true
  // 定时查询，切换wifi后无法获取响应
  // setTimeout(() =>{
  //   getWifiList().then(res => {
  //     isRefresh.value = false
  //     wifiList.value = res.data.list.filter(x =>!res.data.saveList.includes(x.ssid))
  //     saveList.value = res.data.saveList
  //     useWifi.value = res.data.list.find(x =>x.inUse)
  //   })
  // },13000)
  connectWifi(params).then(res => {
    ChangeWifi()
  }).catch(e => {
    ChangeWifi()
  })
}
function ChangeWifi() {
  setTimeout(() => {
    getWifiList().then(res => {
      // 可能找不到正在使用的wifi，重试
      if (!res.data.list.find(x => x.inUse)) {
        ChangeWifi()
      } else {
        isRefresh.value = false
        wifiList.value = res.data.list.filter(x => !res.data.saveList.includes(x.ssid))
        saveList.value = res.data.saveList
        useWifi.value = res.data.list.find(x => x.inUse)
        emits('update')
      }
    }).catch(e => {
      ChangeWifi()
    })
  }, 1000)
}
let isRefresh = ref(false)
function RefreshWifi() {
  wifiList.value = []
  GetWifi()
}

let handleKeyboardInput = (input) => {
  params.password = input
}
const themeVars = reactive({
  dialogFontSize: '3vh',
  dialogButtonHeight: '6vh',
  buttonDefaultFontSize: '3vh',
  fieldInputTextColor: '#000'
});
</script>

<style lang="less" scoped>
.logo {
  width: 4vw;
  height: 3vw;
  padding: 4vw 2vw;
}

.wifi {
  padding: 20px;
  height: 40vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  /* 允许垂直滑动 */
  user-select: none; //禁止选择文本
  // color: #000;
  background-color: #272934 ;

  .between {
    top: 0px;
    padding-top: 20px;
    width: calc(100vw - 40px);
    position: absolute;
    display: flex;
    justify-content: space-between;
  }

  .item {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #CCC;

    &_active {
      color: #0080ff;
    }
  }
}
</style>