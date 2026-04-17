<template>
  <div class="table">
    <div>空间使用<span style="color: #2AC840;">{{ parseInt(stat.usedSize / 1024 /
      1024 / 1024) }}</span>
      /{{ parseInt(stat.totalSize / 1024 / 1024 / 1024) }}G</div>
    <div class="wrap" ref="listRef">
      <checkbox-group v-model="checked" shape="square">
        <div v-for="item in list" :key="item.id" class="table_item">
          <checkbox :name="item.id">
            <div style="color: #fff;">文件名：{{ item.fileName }}</div>
          </checkbox>
          <div class="table_item__del" @click.stop="HandleDel(item.id)">删除</div>
        </div>
      </checkbox-group>
    </div>
    <div class="table_menus">
      <div class="table_menus__all" @click="HandleCheck">全选</div>
      <div v-if="showCalibrateBtn" class="table_menus__all" @click="showStandard = true">标定</div>
      <div class="table_menus__del" @click="HandleDel('')">删除</div>
      <div class="table_menus__del" @click="$emit('update:showList', false); $emit('close')">关闭</div>
    </div>

    <!--标定设置-->
    <Popup v-model:showPopup="showStandard" title="标定设置" @confirm="AddStandard">
      <div class="scan_menus">
        <div class="scan_menu" :class="[type == 'left' && 'scan_menu_active']" @click="HandleType('left')">
          <div>左标定</div>
        </div>
        <div class="scan_menu" :class="[type == 'right' && 'scan_menu_active']" @click="HandleType('right')">
          <div>右标定</div>
        </div>
      </div>
    </Popup>
  </div>


</template>

<script setup lang="ts">
import { Checkbox, CheckboxGroup, showNotify } from 'vant';
import { getScanList, deleteScanItem, getStat } from '@/service/use'
import { addCalibrate } from '@/service/hesai'

const props = defineProps({
  showCalibrateBtn: {
    default: true
  }
})
let listRef = ref<HTMLElement | null>(null)
let mousedown = ref(false)
let startY = ref(0)
onMounted(() => {
  GetList()
  GetInfo()
  listRef.value?.addEventListener('mousedown', (e: any) => {
    mousedown.value = true
    startY.value = e.clientY
  })
  listRef.value?.addEventListener('mousemove', (e: any) => {
    if (mousedown.value) {
      e.preventDefault()
      let moveY = (e.clientY - startY.value) / 20
      listRef.value!.scrollTop -= moveY
    }
  })
  listRef.value?.addEventListener('mouseup', (e: any) => {
    mousedown.value = false
  })
})
let list = ref([])
function GetList() {
  getScanList().then((res: Record<string, any>) => {
    if (res.data) {
      list.value = res.data
    }
  })
}

let checked = ref([])

function HandleCheck() {
  if (checked.value.length === list.value.length) {
    checked.value = []
  } else {
    checked.value = list.value.map((item: Record<string, any>) => item.id)
  }
}

function HandleDel(id = null) {
  let ids = id ? id : checked.value.toString()
  if (!ids) {
    return
  }
  deleteScanItem(ids).then(() => {
    GetList()
    checked.value = []
    GetInfo()
  })
  // 删除接口
}

// 设备信息
let stat = ref({})
function GetInfo() {
  getStat().then(res => {
    if (res.data) {
      stat.value = res.data
    }
  })
}

let showStandard = ref(false)
let type = ref('left')
function HandleType(t: string) {
  type.value = t
}

function AddStandard() {
  showStandard.value = false
  if (checked.value.length < 1) {
    showNotify({
      type: 'danger',
      message: '请选择一个文件进行标定'
    })
    return
  }
  let item = list.value.find((i: Record<string, any>) => i.id === checked.value[0])
  addCalibrate(item.fileName, type.value).then(() => {
    showNotify({
      type: 'success',
      message: '新增标定任务成功'
    })
    checked.value = []
  })
}
</script>

<style lang="less" scoped>
.table {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  max-height: 90vh;
  background-color: #000;
  padding-bottom: 10vh;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 1000;

  &_item {
    padding: 2vw;
    border-bottom: 1px solid #333;
    color: #fff;
    font-size: 5vw;
    display: flex;
    justify-content: space-between;
    // width: auto;

    &__del {
      color: #f56c6c;
      // right: 5vw;
    }
  }

  &_menus {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 2vh;
    width: 100vw;
    box-sizing: border-box;

    &__all {
      color: #409eff;
      font-size: 5vw;
      padding: 2vw 6vw;
      box-sizing: border-box;
    }

    &__del {
      color: #f56c6c;
      font-size: 5vw;
      padding: 2vw 6vw;
      box-sizing: border-box;
    }
  }
}

.scan_menus {
  display: flex;
  flex-wrap: wrap;

  .scan_menu {
    width: 27vw;
    height: 16vw;
    background: #262A34;
    border-radius: 3vw;
    // line-height: 16vw;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 3vw;
    margin-right: 10px;

    &_active {
      border: 1px solid #fff;
    }
  }
}

.wrap {
  height: 76vh;
  overflow-y: auto;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 2vw;
  height: 10vh;
}

::-webkit-scrollbar {
  width: 4vw;
  /* 垂直滚动条宽度 */
  width: 4vw;
  /* 水平滚动条高度 */
  // background-color: #fff;
}
</style>