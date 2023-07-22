import request from "@/utils/request";

export async function login(data) {
  return request({
    url: '/user/auth/login',
    method: 'POST',
    data,
  });
}

export async function logout() {
  return request({
    url: '/user/auth/logout',
    method: 'POST',
  });
}