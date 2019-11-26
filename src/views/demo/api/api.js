import request from '@/utils/http';

export const getBannerList = (params = {}) => {
  return request({
    url: '/getBannerList',
    method: 'get',
    params
  }).then(res => res);
};

export const getHouseList = (params = {}) => {
  return request({
    url: '/getHouseList',
    method: 'post',
    data: params
  }).then(res => res);
};
