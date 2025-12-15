// postcss.config.js

export default {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿的视口宽度
      // viewportHeight: 667, // 设计稿的视口高度（可选）
      unitPrecision: 5, // px转换后的小数位数
      viewportUnit: 'vw', // 需要转换成的视口单位
      selectorBlackList: ['.ignore', '.hairlines'], // 不需要转换的类
      minPixelValue: 10, // 小于或等于1px不转换
      mediaQuery: false, // 允许在媒体查询中转换px
      include: [/src/] // 忽略某些文件夹下的文件
    }
  }
}
