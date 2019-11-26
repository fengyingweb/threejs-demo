import {isObject, isDef, hasOwnProperty} from './tools';

function assignKey(to, from, key) {
  let value = from[key];

  if (!isDef(value) || (hasOwnProperty.call(to, key) && !isDef(to[key]))) {
    return
  }

  if (!hasOwnProperty.call(to, key) || !isObject(to[key])) {
    to[key] = value;
  } else {
    to[key] = deepAssign(Object(to[key]), from[key]);
  }
}

export function deepAssign(to, from) {
  Object.keys(from).forEach(key=> {
    assignKey(to, from, key);
  });
  return to;
}
