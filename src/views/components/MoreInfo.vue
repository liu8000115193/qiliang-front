<template>
  <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOutDown">
    <div v-if="showInfo" class="info" ref="htmlRefHook">
      <div class="status">存储：存储{{ stat.fileNum }}站，空间使用<span style="color: #2AC840;">{{ parseInt(stat.usedSize / 1024 /
        1024 / 1024) }}</span>
        /{{ parseInt(stat.totalSize / 1024 / 1024 / 1024) }}G</div>
      <div class="status" style="margin: 1vw 0;">状态：{{ status }}</div>
      <div class="status">网卡： {{ equipment.mac || '' }}</div>
      <div class="status">IP： {{ equipment.wlanIp }}</div>
      <div class="status">PTP： {{ equipment.ptpStatus }}</div>
    </div>
  </Transition>

  <img src="@/assets/more_info.svg" class="logo" :class="[showInfo && 'logo_rotate']" @click="HandleInfo">
</template>

<script lang="ts" setup>
import { getStat,startRotate } from '@/service/use';
import { showConfirmDialog } from 'vant';
import { onLongPress } from '@vueuse/core'
import { onMounted } from 'vue'

const props = defineProps(['showInfo','equipment','isRotate'])
const emits = defineEmits(['update:showInfo'])
// let equipment = ref({})
let stat = ref({})
let status = ref('待机状态')
// 设备信息
function GetInfo() {
  // getEquipment().then(res => {
  //   equipment.value = res.data
  // })

  getStat().then(res => {
    if (res.data) {
      stat.value = res.data
    }
  })
}

function HandleInfo() {
  emits('update:showInfo', !props.showInfo)
}

onMounted(() => {
  GetInfo()
})

let timer: any = null

let htmlRefHook = ref()
onLongPress(
  htmlRefHook,
  HandleRotate,
  {
    modifiers: {
      prevent: true
    }
  }
)
function HandleRotate(e: PointerEvent) {
  showConfirmDialog({
    title: '提示',
    message:
      `是否${props.isRotate ? '退出' : '进入'}展示模式？`,
  })
    .then(() => {
      startRotate(props.isRotate).then(res =>{
        if (res.code == 0) {
          emits('update:isRotate', !props.isRotate)
        }
      })
    })
}

function clearTimer() {
  clearTimeout(timer)
}
</script>

<style lang="less" scoped>
.info {
  width: 90vw;
  height: 36vw;
  background-color: #272934;
  border-radius: 3vw;
  padding: 3vw 5vw;
  text-align: left;
  box-sizing: border-box;
  margin: 0 auto;
}

.logo {
  width: 7vw;
  height: 6vw;

  &_rotate {
    margin-top: 4vw;
    transform: rotate(180deg);
  }
}
</style>