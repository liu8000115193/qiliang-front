<template>
  <div class="table">
    <div>空间使用<span style="color: #2AC840;">{{ parseInt(stat.usedSize / 1024 /
        1024 / 1024) }}</span>
        /{{ parseInt(stat.totalSize / 1024 / 1024 / 1024) }}G</div>
    <checkbox-group v-model="checked" shape="square">
      <checkbox v-for="item in list" :name="item.id" class="table_item" >
        <div style="display: flex;justify-content: space-between;color: #fff;">
          <div>文件名：{{ item.fileName }}</div>
          <!-- <div>文件大小：{{ item.fileSize }}</div> -->
          <div class="table_item__del" @click="HandleDel(item.id)">删除</div>
        </div>
      </checkbox>
    </checkbox-group>
    <div class="table_menus">
      <div class="table_menus__all" @click="HandleCheck">全选</div>
      <div class="table_menus__del" @click="HandleDel">删除</div>
      <div class="table_menus__del" @click="$emit('update:showList', false);$emit('close')">关闭</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Checkbox, CheckboxGroup } from 'vant';
import {getScanList,deleteScanItem,getStat} from '@/service/use'

onMounted(() => {
  GetList()
  GetInfo()
})
let list = ref([])
function GetList() {
  getScanList().then((res:Record<string, any>) => {
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
    checked.value = list.value.map((item:Record<string, any>) => item.id)
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
</script>

<style lang="less" scoped>
.table {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  max-height: 90vh;
  background-color: #000;
  overflow-y: auto;
  padding-bottom: 10vh;
  box-sizing: border-box;

  &_item {
    padding: 2vw;
    border-bottom: 1px solid #333;
    color: #fff;
    font-size: 5vw;
    display: flex;
    width: auto;

    &__del {
      color: #f56c6c;
      position: absolute;
      right: 5vw;
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
      padding: 2vw 10vw;
      box-sizing: border-box;
    }

    &__del {
      color: #f56c6c;
      font-size: 5vw;
      padding: 2vw 10vw;
      box-sizing: border-box;
    }
  }
}
</style>