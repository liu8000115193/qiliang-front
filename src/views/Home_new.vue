<template>
  <main class="table">

    <Head @update="GetEquipment"></Head>
    <div v-if="!showInfo">
      <img class="alpcer" src="@/assets/alpcer.svg">
    </div>
    <div>

      <Circle @click="StopScan" v-if="showTime" class="start" v-model:current-rate="currentRate" :rate="rate"
        size="32vw" text="| |" />
      <img @click="HandleScan" v-else class="start" src="@/assets/start.svg">
      <div v-if="!showInfo" style="display: flex;align-items: center;justify-content: center;">
        <div v-if="!showTime">预计耗时</div>
        <CountDown :auto-start="false" class="time" :time="time" ref="countDown"
          style="color: #fff;margin-left: 10px;font-size: 4vw;" />
      </div>
    </div>
    <div class="text_menus">
      <Code v-if="equipment.wlanIp" :ip="equipment.wlanIp"></Code>
      <div class="text_menu" @click="HandleName">
        项目: {{ params.name }}
      </div>
      <div class="text_menu" @click="HandleIndex">
        序号: {{ params.index }}
      </div>
    </div>
    <div class="switch_menus">
      <div @click="HandleColor">
        <div class="switch_menu">
          <img class="menu_icon" src="@/assets/color.svg">
          <div @click.stop="" class="mt-3">
            <Switch v-model="params.colorSwitch" size="3vw"></Switch>
            <!-- <input class="switch" type="checkbox" :checked="params.colorSwitch"></input> -->
          </div>
        </div>
        <div class="mt-3">彩色扫描</div>
      </div>
      <div @click="HandleScanMode">
        <div class="switch_menu">
          <img class="menu_icon" src="@/assets/speed.svg">
          <div class="mt-3">{{ modeArr[params.scanMode] }}</div>
        </div>
        <div class="mt-3">扫描速度</div>
      </div>
      <div @click="HandleDenoise">
        <div class="switch_menu">
          <img class="menu_icon" src="@/assets/setting.svg">
          <div class="mt-3 text-ellipsis">{{ denoiseVal }}</div>
        </div>
        <div class="mt-3">去噪设置</div>
      </div>
    </div>
    <MoreInfo v-model:showInfo="showInfo" :equipment="equipment"></MoreInfo>
  </main>
  <!--扫描速度设置-->
  <Popup v-model:showPopup="showPopup" title="彩色扫描">
    <div class="scan_menus">
      <div class="scan_menu" :class="[params.scanMode === 0 ? 'scan_menu_active' : '']" @click="HandleParams(0)">快速
      </div>
      <div class="scan_menu" :class="[params.scanMode === 900 ? 'scan_menu_active' : '']" @click="HandleParams(900)">标准
      </div>
      <div class="scan_menu" :class="[params.scanMode === 2 ? 'scan_menu_active' : '']" @click="HandleParams(2)">高密
      </div>
    </div>
  </Popup>

  <!--去噪设置-->
  <Popup v-model:showPopup="showDenoisePopup" title="去噪设置">
    <div class="scan_menus">
      <div class="scan_menu" :class="[params.stitchDenoise ? 'scan_menu_active' : '']"
        @click="HandleParams('stitchDenoise')">黏连
      </div>
      <div class="scan_menu" :class="[params.rainFogDenoise ? 'scan_menu_active' : '']"
        @click="HandleParams('rainFogDenoise')">灰尘
      </div>
      <div class="scan_menu" :class="[params.otherDenoise ? 'scan_menu_active' : '']"
        @click="HandleParams('otherDenoise')">其他
      </div>
    </div>
  </Popup>

  <!--项目名-->
  <Popup v-model:showPopup="showNamePopup">
    <div class="text_popup" @click="HandleKeyboard('name')">
      <div>项目:</div>
      <Field contenteditable="true" style="font-size: 5vw;width: 50vw;background: #000;color: #fff;opacity: 1;"
        v-model="params.name" readonly></Field>
    </div>
  </Popup>

  <!--序号-->
  <Popup v-model:showPopup="showIndexPopup">
    <div class="text_popup" @click="HandleKeyboard('index')">
      <div>序号:</div>
      <Field contenteditable="true" style="font-size: 5vw;width: 50vw;background: #000;color: #fff;opacity: 1;"
      v-model="params.index" readonly></Field>
    </div>
  </Popup>
  <SimpleKeyboard v-model:showNumber="showIndexPopup" v-if="showKeyboard" v-model:showKeyboard="showKeyboard"
    :onChange="handleKeyboardInput" />
</template>

<script setup>
import Head from './components/Head.vue'
import MoreInfo from './components/MoreInfo.vue';
import Popup from '@/components/Popup.vue';
import Code from './components/Code.vue';
import { Switch, Field, CountDown, Circle, showNotify, showConfirmDialog } from 'vant';
import SimpleKeyboard from "@/components/Keyboard.vue";
import { scanning, getScanType, getSetting, updateSetting, wakeScreen, stopScan, getEquipment } from '@/service/use';
// let timeArr = {
//   900:[165 * 1000,165 * 1000,165 * 1000]
// }
onMounted(() => {
  GetScanResult()
  GetInfoByInterVal()
  GetEquipment()
})
// 获取设备信息
let equipment = ref({})
function GetEquipment(){
  getEquipment().then(res => {
    equipment.value = res.data
  })
}

// 显示更多信息
let showInfo = ref(false)
// 去噪设置
let denoiseVal = computed(() => {
  let arr = []
  if (params.stitchDenoise) {
    arr.push('黏连')
  }
  if (params.rainFogDenoise) {
    arr.push('灰尘')
  }
  if (params.otherDenoise) {
    arr.push('其他')
  }
  return arr.toString() || '未设置'
})

// 扫描
let loading = ref(false)
let time = ref(0)
let countDown = ref()
let showTime = ref(false)
function HandleScan() {
  loading.value = true
  scanning(params).then((res) => {
    if (res.code == -5) {
      showConfirmDialog({
        title: '提示',
        message:
          '已存在扫描成功的项目，是否覆盖？',
      })
        .then(() => {
          params.notCover = false
          HandleScan()
        })
    }
  })
}
// 扫描进度
let rate = computed(() => 100 - (time.value / timeArr[params.scanMode][params.colorSwitch ? 1 : 0] * 100))
// 处理耗时显示
function HandleTime() {
  timer1 = setInterval(() => {
    time.value = time.value - 1000 > 0 ? time.value - 1000 : 0
    console.log('time.value :>> ', time.value);
  }, 1000)
}

let timer, timer1 = null
// 定时轮询获取参数设置
function GetInfoByInterVal() {
  clearInterval(timer)
  timer = setInterval(() => {
    GetScanResult()
  }, 2000);
}

const statusArr = ['待机状态', '采样状态', '错误状态', '自检状态', '电机启动状态', '升级状态', '就绪状态']
let status = ref('待机状态')
let params = reactive({
  name: 'Scan',
  index: '',
  scanMode: 0,
  colorSwitch: false,
  rainFogDenoise: 0,
  otherDenoise: 0,
  stitchDenoise: 0
})
let needTip = ref(false)
let startTime = ref(0)
let originParams = {}
function GetScanResult() {
  getSetting().then(res => {
    Object.keys(params).forEach(x => {
      // 判断非空，否则值为0时为false
      if (res.data[x] != null) params[x] = res.data[x]
    })
    let { id, ...p } = res.data
    originParams = p
  })
  getScanType(params.name + "_" + params.index).then(res => {
    let t = timeArr[params.scanMode]
    let index = params.colorSwitch ? 1 : 0
    if (res.data.isScanning) {
      if (!showTime.value) {
        time.value = t[index] - res.data.startTime
        showTime.value = true
        status.value = statusArr[1]
        HandleTime()
        needTip.value = true
      }
    } else if (res.data.isFinish) {
      clearInterval(timer1)
      
      time.value = t[index]
      console.log('t :>> ', t[index]);
      showTime.value = false
      loading.value = false
      status.value = statusArr[0]
      if (needTip.value) {
        wakeScreen()
        showNotify({
          type: 'success',
          message: '扫描完成',
          className: 'status'
        })
        needTip.value = false
        params.index = (parseInt(res.data.index) + 1).toString().padStart(3, '0')

      }
    } else if (res.data.isError) {
      clearInterval(timer1)
      time.value = t[index]
      showTime.value = false
      loading.value = false
      status.value = statusArr[0]
      if (needTip.value) {
        wakeScreen()
        showConfirmDialog({
          title: '提示',
          message:
            `${res.data.errMsg}，是否重新扫描？`,
        })
          .then(() => {
            params.notCover = false
            HandleScan()
          })
        needTip.value = false
        // countDown.value.reset()
      }
    }
  })
}

// 设置项目名
let showNamePopup = ref(false)
function HandleName() {
  showNamePopup.value = true
}
// 设置项目序号
let showIndexPopup = ref(false)
function HandleIndex() {
  showIndexPopup.value = true
}
// 键盘输入
let showKeyboard = ref(false)
let paramKey = ref('name')
let handleKeyboardInput = (input) => {
  params[paramKey.value] = input
}
// 显示键盘并清除定时器
function HandleKeyboard(key) {
  clearInterval(timer)
  showKeyboard.value = true
  paramKey.value = key
  params[key] = ''
}

// 设置彩色扫描
function HandleColor() {
  params.colorSwitch = !params.colorSwitch
}

// 设置扫描速度
let showPopup = ref(false)
let title = ref('彩色扫描')
function HandleScanMode() {
  showPopup.value = true
}
// 去噪设置
let showDenoisePopup = ref(false)
function HandleDenoise() {
  showDenoisePopup.value = true
}

let modeArr = {
  0:'快速', 
  900:'标准', 
  2:'高密'
}
function HandleParams(value) {
  console.log('value instanceof Number :>> ',);
  if (typeof value == 'number') {
    params.scanMode = value

  } else {
    if (params[value] == 0) params[value] = 1
    else params[value] = 0
  }
}

// 停止扫描
function StopScan() {
  showConfirmDialog({
    title: '提示',
    message:
      `是否停止扫描？`,
  })
    .then(() => {
      stopScan()
    })

}

// 监听参数变化，更新到数据库
let updateSettingTimer
watch(params, (newValue, oldValue) => {
  console.log('newValue :>> ', newValue);
  console.log('originParams :>> ', params.name);
  if (!showKeyboard.value && newValue.name != '' && newValue.index != '' && !isNaN(Number(newValue.index, 10))) {
    Object.keys(newValue).forEach(x => {
      if (newValue[x] !== originParams[x]) {
        clearTimeout(updateSettingTimer)
        clearInterval(timer)
        updateSetting(newValue).then(res => {
          GetInfoByInterVal()
        })
        console.log('执行update :>> ', x);
        return;
      }
    })
  }
})

// 监听键盘变化，弹出时停止定时请求，收起后重新轮询
watch(showKeyboard, (newValue, oldValue) => {
  if (!newValue) {
    showIndexPopup.value = false
    showNamePopup.value = false
    if (params.name != '' && params.index != '' && !isNaN(Number(params.index, 10))) {
      updateSetting(params)
    }
    clearInterval(timer)
    GetInfoByInterVal()
  }
})

watch(showIndexPopup, (newValue, oldValue) => {
  if (!newValue) {
    showKeyboard.value = false
  }
})

watch(showNamePopup, (newValue, oldValue) => {
  if (!newValue) {
    showKeyboard.value = false
  } 14
})
</script>
<style lang="less" scoped>
.table {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-size: 4vw;

  .alpcer {
    width: 52vw;
    height: 13vw;
    margin-top: 16vw;
  }

  .start {
    width: 32vw;
    height: 32vw;
    margin-top: 14vw;
  }

  .text_menus {
    display: flex;
    margin: 13vw 5vw 3vw 5vw;
    justify-content: space-between;
    text-align: left;
    position: relative;

    .text_menu {
      width: 43vw;
      height: 15vw;
      background-color: #272934;
      border-radius: 3vw;
      // line-height: 15vw;
      padding: 5vw;
      box-sizing: border-box;
    }
  }

  .switch_menus {
    display: flex;
    justify-content: space-between;
    margin: 0 5vw 7vw 5vw;
    font-size: 3vw;

    .switch_menu {
      width: 28vw;
      height: 21vw;
      border-radius: 3vw;
      background: #262A34;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4vw;
      line-height: 5vw;
      box-sizing: border-box;

      .menu_icon {
        width: 6vw;
        height: 6vw;
        display: block;
      }

      .speed_icon {
        width: 7vw;
        height: 7vw;
        display: block;
      }

      .switch {
        width: 7vw;
        height: 3vw;
        border: none;
        padding: 0;
      }
    }

  }
}

.scan_menus {
  display: flex;
  justify-content: space-between;

  .scan_menu {
    width: 27vw;
    height: 16vw;
    background: #262A34;
    border-radius: 3vw;
    line-height: 16vw;

    &_active {
      border: 1px solid #fff;
    }
  }
}

.mt-3 {
  margin-top: 3vw;
}

.text_popup {
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  padding-left: 7vw;
  width: 87vw;
  height: 16vw;
  border-radius: 3vw;
  box-sizing: border-box;
}
</style>
