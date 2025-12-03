<template>
  <div @click.stop="" v-if="showKeyboard" :class="keyboardClass"></div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./keyboard.css";

const props = defineProps({
  keyboardClass: {
    default: "simple-keyboard",
    type: String
  },
  showKeyboard: {
    type: Boolean,
    default: true
  },
  showNumber: {
    type: Boolean,
    default: false
  },
  onChange: Function,
})
const emits = defineEmits(['onChange', 'update:showKeyboard'])
const keyboard = ref(null);

onMounted(() => {
  keyboard.value = new Keyboard({
      onChange: input => {
        props.onChange(input);
      },
      onKeyPress: button => {
        handleKeyPress(button);
      },
      theme: "hg-theme-default hg-theme-ios",
      layout: {
        default: [
          "1 2 3 4 5 6 7 8 9 0 - +",
          "q w e r t y u i o p {bksp}",
          "a s d f g h j k l {enter}",
          "{shift} z x c v b n m {shift}",
          "{space}"
        ],
        shift: [
          "! @ # $ % ^ & * ( ) _",
          "Q W E R T Y U I O P {bksp}",
          "A S D F G H J K L {enter}",
          "{shiftactivated} Z X C V B N M {shiftactivated}",
          "{space}"
        ],
        alt: [
          "1 2 3",
          `4 5 6`,
          "7 8 9",
          "{enter} 0 {bksp}"
        ],
      },
      display: {
        "{alt}": ".?123",
        "{shift}": "⇧",
        "{shiftactivated}": "⇧",
        "{enter}": "确认",
        "{bksp}": "⌫",
        "{altright}": ".?123",
        "{space}": " ",
        "{default}": "ABC",
        "{back}": "⇦"
      }
    });
  if (props.showNumber) {
    handleLayoutChange("{alt}")
  } 
});

const handleKeyPress = (button) => {
  // 处理按键事件
  // event.stopPropagation()
  // console.log("Button pressed", button);
  if (button.includes("{") && button.includes("}")) {
    handleLayoutChange(button);
  }
}
function handleLayoutChange(button) {
  let currentLayout = keyboard.value.options.layoutName;
  let layoutName;
  switch (button) {
    case "{shift}":
    case "{shiftactivated}":
    case "{default}":
      layoutName = currentLayout === "default" ? "shift" : "default";
      break;

    case "{alt}":
    case "{altright}":
      layoutName = currentLayout === "alt" ? "default" : "alt";
      break;

    case "{smileys}":
      layoutName = currentLayout === "smileys" ? "default" : "smileys";
      break;

    case "{enter}":
      // 增加延迟，直接执行会显示去噪设置弹窗
      setTimeout(() => {
        emits('update:showKeyboard', false)
      }, 200)
      break;
    default:
      break;
  }

  if (layoutName) {
    keyboard.value.setOptions({
      layoutName: layoutName
    });
  }
}
</script>
<style lang="less" scoped>
.simple-keyboard {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 3000;
}

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
}
</style>