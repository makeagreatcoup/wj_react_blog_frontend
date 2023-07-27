import request from "@/utils/request";

export async function list(data) {
  return request({
    url: '/content/tags/list',
    method: 'GET',
    params:data,
  });
}
export async function detail(data) {
  return request({
    url: `/content/tags/detail/${data.id}`,
    method: 'GET',
    params:data,
  });
}

export async function store(data) {
  return request({
    url: '/content/tags/store',
    method: 'POST',
    data,
  });
}

export async function update(data) {
  return request({
    url: '/content/tags/update',
    method: 'PATCH',
    data,
  });
}

export async function remove(data) {
  return request({
    url:  '/content/tags/delete',
    method: 'DELETE',
    data:{
      ids:[data.id],
    },
  });
}