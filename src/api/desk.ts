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
