import request from "@/utils/request";

export async function searchList() {
  return request({
    url: '/content/customers/searchList',
    method: 'GET',
  });
}

export async function tree(data) {
  return request({
    url: '/content/customers/tree',
    method: 'GET',
    params:data,
  });
}
export async function list(data) {
  return request({
    url: '/content/customers/list',
    method: 'GET',
    params:data,
  });
}
export async function detail(data) {
  return request({
    url: `/content/customers/detail/${data.id}`,
    method: 'GET',
    params:data,
  });
}

export async function save(data) {
  return request({
    url: '/content/customers/store',
    method: 'POST',
    data,
  });
}

export async function update(data) {
  return request({
    url: '/content/customers/update',
    method: 'PATCH',
    data,
  });
}

export async function remove(data) {
  return request({
    url:  '/content/customers/delete',
    method: 'DELETE',
    data:{
      ids:[data.id],
    },
  });
}