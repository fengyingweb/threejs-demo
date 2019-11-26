import VueI18n from 'vue-i18n'
import Vue from 'vue'
import localStorageTool from '../utils/storage/local_storage'

// 语言包
import cn from './cn'
import en from './en'

export default {
  initLanguage () {
    let fdLangType = navigator.browserLanguage ? navigator.browserLanguage : navigator.language
    let storage = JSON.parse(localStorageTool.getItem('fdLangType'))
    if (storage && storage.langType) {
      fdLangType = storage.langType
    }
    console.log(fdLangType)
    Vue.use(VueI18n)
    Vue.config.lang = fdLangType
    let i18n = new VueI18n({
      locale: fdLangType,
      messages: {
        'zh-CN': Object.assign({}, cn),
        'en-US': Object.assign({}, en)
      }
    })
    return i18n
  }
}
