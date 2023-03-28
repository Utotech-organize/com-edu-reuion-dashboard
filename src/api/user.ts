import client from "./client";

export async function getSeats() {
  return client({
    method: "GET",
    url: "/seats",
  });
}

export async function bookingSeat(id: any, data: any) {
  return client({
    method: "PUT",
    url: `/seats/${id}/booking`,
    data,
  });
}

export async function getBookingSeat(id: any) {
  return client({
    method: "GET",
    url: `/seats/${id}/booking`,
  });
}
