import client from "./client";

export async function login(data: any) {
  return client({
    method: "POST",
    url: "/auth/login",
    data,
  });
}

export async function getMe() {
  return client({
    method: "GET",
    url: `/auth/me`,
  });
}

export async function register(data: any) {
  return client({
    method: "POST",
    url: `/auth/register`,
    data,
  });
}
