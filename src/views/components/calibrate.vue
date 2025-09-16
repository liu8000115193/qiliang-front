<template>
  <div class="table">
    <checkbox-group v-model="checked" shape="square" style="height: 100%;overflow-y: auto;">
      <checkbox v-for="(item, index) in list" :name="item.id" class="table_item">
        <div style="color: #fff;">
          <div class="table_item__text">标定文件：{{ item.scanName }}</div>
          <div class="table_item__text">状态：{{ item.type }}</div>
          <div style="display: flex;">
            <div class="table_menus__all" @click.stop="HandleLook(item)">查看</div>
            <div class="table_item__del" @click.stop="HandleDel(item.id)">删除</div>
          </div>
        </div>
      </checkbox>
    </checkbox-group>

    <div class="table_menus">
      <div class="table_menus__all" @click="HandleCheck">全选</div>
      <div class="table_menus__del" @click="HandleDel('')">删除</div>
      <div class="table_menus__del" @click="$emit('update:showList', false); $emit('close')">关闭</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Checkbox, CheckboxGroup, showNotify } from 'vant';
import { getCalibrations,deleteCalibrations } from '@/service/use'
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

onMounted(() => {
  GetList()
})
let list = ref([])
function GetList() {
  getCalibrations().then((res: Record<string, any>) => {
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
  // 删除接口
  deleteCalibrations(ids).then(() => {
    showNotify({
      type: 'success',
      message: '删除成功'
    })
    checked.value = []
    GetList()
  })
}

let showPopup = ref(false)
let chooseItem = ref<Record<string, any>>({})
function HandleLook(item: Record<string, any>) {
  showPopup.value = true
  chooseItem.value = item
  const img = document.createElement('img');
  img.style.display = 'none';
  img.src = `http://${window.location.host}/result_files/${item.scanName}/calibrate/${item.camera}/${item.resultFileNames}`;
  document.body.appendChild(img);
  const viewer = new Viewer(img, {
    inline: false, // 是否内联显示（默认 false，点击图片弹出全屏预览）
    zoomRatio: 0.1, // 缩放步长
    maxZoomRatio: 10, // 最大缩放倍数
    title: false, // 是否显示标题
    toolbar: { // 自定义工具栏
      zoomIn: '40px',
      zoomOut: true,
      rotateLeft: true,
      download: false
    },
    // 预览关闭后，销毁临时容器和 Viewer 实例（避免内存泄漏）
    hide: function () {
      viewer.destroy(); // 销毁 Viewer
      document.body.removeChild(img); // 移除临时容器
    }
  });
  viewer.show();
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

  &_item {
    padding: 2vw;
    border-bottom: 1px solid #333;
    color: #fff;
    font-size: 5vw;
    display: flex;
    width: auto;
    position: relative;

    &__text {
      text-align: left;
      padding: 2vw;
    }

    &__del {
      color: #f56c6c;
      position: absolute;
      right: 5vw;
      bottom: 4vw;
    }
  }

  &_menus {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    padding: 1vh 0;
    width: 100vw;
    box-sizing: border-box;
    background-color: #333;

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

</style>