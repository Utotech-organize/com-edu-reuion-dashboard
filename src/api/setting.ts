import client from "./client";

export async function getSettings() {
  return client({
    method: "GET",
    url: "/settings",
  });
}

export async function updateSetting(data: any) {
  return client({
    method: "PUT",
    url: `/settings/edit`,
    data,
  });
}
