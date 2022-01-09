// @ts-nocheck
import request from '@/utils/request'

export const featureApi = () => {
  return request({
    url: '/user/feature'
  })
}
