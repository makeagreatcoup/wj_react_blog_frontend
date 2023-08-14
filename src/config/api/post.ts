import request from "@/utils/request";


export async function titleList() {
  return request({
    url: '/content/posts/titleList',
    method: 'GET',
  });
}

export async function tree(data) {
  return request({
    url: '/content/posts/tree',
    method: 'GET',
    params:data,
  });
}
export async function list(data) {
  return request({
    url: '/content/posts/list',
    method: 'GET',
    params:data,
  });
}
export async function detail(data) {
  return request({
    url: `/content/posts/detail/${data.id}`,
    method: 'GET',
    params:data,
  });
}

export async function save(data) {
  return request({
    url: '/content/posts/store',
    method: 'POST',
    data,
  });
}

export async function update(data) {
  return request({
    url: '/content/posts/update',
    method: 'PATCH',
    data,
  });
}

export async function remove(data) {
  return request({
    url:  '/content/posts/delete',
    method: 'DELETE',
    data:{
      ids:[data.id],
    },
  });
}