import request from "./index";

export function getUserList(params: any) {
  return request({
    url: "/user/",
    method: "get",
    params,
  });
}

export async function login(data: any) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}


export function register(data: any) {
  return request({
    url: '/user/',
    method: 'post',
    data
  })
}

export function forgetPassword(data: any) {
  return request({
    url: '/user/pwd/reset',
    method: 'post',
    data
  })
}
