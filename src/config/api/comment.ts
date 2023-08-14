import request from "@/utils/request";

export async function treePaginate(data) {
  return request({
    url: '/content/comments/treePaginate',
    method: 'GET',
    params:data,
  });
}

export async function tree(data) {
  return request({
    url: '/content/comments/tree',
    method: 'GET',
    params:data,
  });
}
export async function list(data) {
  return request({
    url: '/content/comments/list',
    method: 'GET',
    params:data,
  });
}
export async function detail(data) {
  return request({
    url: `/content/comments/detail/${data.id}`,
    method: 'GET',
    params:data,
  });
}

export async function save(data) {
  return request({
    url: '/content/comments/store',
    method: 'POST',
    data,
  });
}

export async function update(data) {
  return request({
    url: '/content/comments/update',
    method: 'PATCH',
    data,
  });
}

export async function remove(data) {
  return request({
    url:  '/content/comments/delete',
    method: 'DELETE',
    data:{
      ids:[data.id],
    },
  });
}