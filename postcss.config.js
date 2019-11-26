module.exports = {
  plugins: {
    autoprefixer: {
      "browsers": ["Android >= 4.0", "iOS >= 7"]
    },
    // "postcss-pxtorem": {
    //   "rootValue": 37.5, // 基准值, 例如设计稿元素宽度为375px, 转换为rem为375/37.5 = 10rem
    //   "propList": ["*"],
    //   "mediaQuery": false, // （布尔值）允许在媒体查询中转换px
    //   "minPixelValue": 1.01 //设置要替换的最小像素值(0px会被转rem)。 默认 0
    // },
    // "postcss-px-to-viewport": {
    //   unitToConvert: 'px', //  需要转换的单位，默认为"px"
    //   viewportWidth: 375, // 设计稿的视口宽度
    //   unitPrecision: 5, // 单位转换后保留的精度
    //   propList: ['*'], // 能转化为vw的属性列表
    //   viewportUnit: 'vw', // 希望使用的视口单位
    //   fontViewportUnit: 'vw', //字体使用的视口单位
    //   minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
    //   mediaQuery: false, //媒体查询里的单位是否需要转换单位
    //   replace: true, // 是否直接更换属性值，而不添加备用属性
    //   exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件, 如果传入的值是一个数组，那么数组里的值必须为正则
    // }
  }
}
