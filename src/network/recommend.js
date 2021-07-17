import { request } from "./request";

export function getRecommendInfo() {
  return request({
    url:'/recommend'
  })
}