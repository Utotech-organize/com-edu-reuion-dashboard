import client from "./client";

export async function getUsers() {
  return client({
    method: "GET",
    url: "/users",
  });
}

export async function getUser(id: any) {
  return client({
    method: "GET",
    url: `/users/${id}`,
  });
}

export async function createUser(data: any) {
  return client({
    method: "POST",
    url: `/users/register`,
    data,
  });
}

export async function editUser(id: any, data: any) {
  return client({
    method: "PUT",
    url: `/users/edit/${id}`,
    data,
  });
}

export async function deleteUser(id: any) {
  return client({
    method: "DELETE",
    url: `/users/delete/${id}`,
  });
}

export async function uploadReceipt(data: any) {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return client({
    headers,
    method: "POST",
    url: `/users/upload/receipt`,
    data,
  });
}
