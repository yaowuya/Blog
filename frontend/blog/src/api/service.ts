import request from "./index";

export function getUserList(params: any) {
  return request({
    url: "/user/",
    method: "get",
    params,
  });
}
