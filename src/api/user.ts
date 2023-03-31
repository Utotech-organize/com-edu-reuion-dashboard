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
