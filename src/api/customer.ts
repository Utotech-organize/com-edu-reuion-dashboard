import client from "./client";

export async function getCustomers() {
  return client({
    method: "GET",
    url: "/customers",
  });
}

export async function getCustomer(id: any) {
  return client({
    method: "GET",
    url: `/customers/${id}`,
  });
}

export async function editCustomer(data: any, id: any) {
  return client({
    method: "PUT",
    url: `/customers/edit/${id}`,
    data,
  });
}

export async function createCustomer(data: any) {
  return client({
    method: "POST",
    url: `/customers/new`,
    data,
  });
}

export async function deleteCustomer(id: any) {
  return client({
    method: "DELETE",
    url: `/customers/delete/${id}`,
  });
}
