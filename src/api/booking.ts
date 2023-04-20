import client from "./client";

export async function getBookings() {
  return client({
    method: "GET",
    url: "/bookings",
  });
}

export async function getBooking(id: any) {
  return client({
    method: "GET",
    url: `/bookings/${id}`,
  });
}

export async function createBooking(data: any) {
  return client({
    method: "POST",
    url: `/bookings/new`,
    data,
  });
}

export async function editBooking(id: any, data: any) {
  return client({
    method: "PUT",
    url: `/bookings/edit/${id}`,
    data,
  });
}

export async function cancelBooking(id: any) {
  return client({
    method: "DELETE",
    url: `/bookings/delete/${id}`,
  });
}

export async function getBookingTicket(slug: any) {
  return client({
    method: "GET",
    url: `/bookings/ticket`,
  });
}
