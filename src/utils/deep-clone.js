import {isArray} from './tools';
import {deepAssign} from './deep-assign';

export function deepClone(value) {
  if (isArray(value)) {
    return value.map(val => deepClone(val));
  }

  if (typeof value === 'object') {
    return deepAssign({}, value);
  }

  return value;
}
