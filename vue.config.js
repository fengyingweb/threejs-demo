const path = require('path')
const fs = require('fs-extra')
const glob = require('glob')
const ip = require('ip')
const TerserPlugin = require('terser-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

function rootSrc (args) {
  return path.join(__dirname, 'src', args)
}

function getEntrys () {
  let entrysPath = rootSrc('entrys')
  let entrys = {}
  let files = fs.readdirSync(entrysPath)
  files.forEach(file => {
    entrys[file] = path.resolve(entrysPath, file, 'main.js')
  })
  // console.log(entrys)
  return entrys
}

function getHtmlTemplate () {
  let htmlFiles = {}
  let pageName = ''
  let pages = glob.sync(`${resolve('public')}/*.html`)
  pages.forEach(pagePath => {
    let basename = path.basename(pagePath, path.extname(pagePath))
    pageName = basename
    htmlFiles[pageName] = {}
    htmlFiles[pageName]['chunk'] = basename
    htmlFiles[pageName]['path'] = pagePath
  })
  // console.log(htmlFiles)
  return htmlFiles
}

function getPages () {
  let pages = {}
  let entrys = getEntrys()
  let htmlFiles = getHtmlTemplate()

  Object.keys(entrys).forEach(key=> {
    pages[key] = {}
    pages[key]['entry'] = entrys[key]
    pages[key]['template'] = htmlFiles[key].path
    pages[key]['filename'] = key + '.html'
    pages[key]['chunks'] = ['chunk-vendors', 'chunk-common', htmlFiles[key].chunk]
  })
  console.log(pages)
  return pages
}

module.exports = {
  pages: getPages(),
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: 'static',
  productionSourceMap: false, // 打包生产时不要把源码暴露出去
  devServer: {
    host: ip.address(),
    port: 8088,
    open: true,
    openPage: 'demo.html',
    hot: true,
    overlay: {
      warnings: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        logLevel: 'debug',
        changeOrigin: true,
        secure: false // 可以接受https
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = "production";
      config.optimization = {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
                warnings: false,
                pure_funcs: ['console.log'] //移除console
              }
            }
          })
        ]
      }
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
  }
}