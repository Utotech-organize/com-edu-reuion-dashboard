import client from "./client";

export async function getProducts() {
  return client({
    method: "GET",
    url: "/products",
  });
}

export async function getProduct(id: any) {
  return client({
    method: "GET",
    url: `/products/${id}`,
  });
}

export async function createProduct(data: any) {
  return client({
    method: "POST",
    url: `/products/new`,
    data,
  });
}

export async function updateProduct(id: any, data: any) {
  return client({
    method: "PUT",
    url: `/products/edit/${id}`,
    data,
  });
}

export async function deleteProduct(id: any) {
  return client({
    method: "DELETE",
    url: `/products/delete/${id}`,
  });
}
