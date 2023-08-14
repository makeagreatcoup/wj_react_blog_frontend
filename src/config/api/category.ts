import request from "@/utils/request";

export async function tree(data) {
  return request({
    url: '/content/categories/tree',
    method: 'GET',
    params:data,
  });
}
export async function list(data) {
  return request({
    url: '/content/categories/list',
    method: 'GET',
    params:data,
  });
}
export async function detail(data) {
  return request({
    url: `/content/categories/detail/${data.id}`,
    method: 'GET',
    params:data,
  });
}

export async function save(data) {
  return request({
    url: '/content/categories/store',
    method: 'POST',
    data,
  });
}

export async function update(data) {
  return request({
    url: '/content/categories/update',
    method: 'PATCH',
    data,
  });
}

export async function remove(data) {
  return request({
    url:  '/content/categories/delete',
    method: 'DELETE',
    data:{
      ids:[data.id],
    },
  });
}