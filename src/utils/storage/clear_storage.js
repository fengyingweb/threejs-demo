import {clearCookie} from '../index'
/**
 * 清除localstorage,sessionStorage,cookie
 */
export function clearStorage () {
  localStorage.clear()
  sessionStorage.clear()
  clearCookie()
}