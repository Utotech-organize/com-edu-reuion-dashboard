import client from "./client";

export async function getDesks() {
  return client({
    method: "GET",
    url: "/desks",
  });
}

export async function getDesk(id: any) {
  return client({
    method: "GET",
    url: `/desks/${id}`,
  });
}

export async function createDesk(data: any) {
  return client({
    method: "POST",
    url: `/desks/new`,
    data,
  });
}

export async function updateDesk(id: any, data: any) {
  return client({
    method: "PUT",
    url: `/desks/edit/${id}`,
    data,
  });
}

export async function deleteDesk(id: any) {
  return client({
    method: "DELETE",
    url: `/desks/delete/${id}`,
  });
}
