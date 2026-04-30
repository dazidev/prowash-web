import { AdminForm } from "@/infrastructure";
import api from "@/infrastructure/lib/axios";
import { API, User } from "@/interfaces";

export async function getAdmins() {
  try {
    const res = await api.get("/admin");

    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createAdmin(adminData: AdminForm) {
  const admin = await fetch(`${API}/api/admin/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(adminData),
    cache: "no-store",
  });

  const data = await admin.json();
  // revalidateTag("admins", "default");
  return data;
}

export async function deleteAdmin(id: string) {
  const admin = await fetch(`${API}/api/admin/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  const data = await admin.json();
  // revalidateTag("admins", "default");
  return data;
}

export async function editAdmin(id: string, adminData: AdminForm) {
  const admin = await fetch(`${API}/api/admin/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(adminData),
    cache: "no-store",
  });

  const data = await admin.json();
  // revalidateTag("admins", "default");
  return data;
}

export async function changeAdminPassword(id: string, password: string) {
  const passObj = { password };
  const admin = await fetch(`${API}/api/admin/change-password/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(passObj),
    cache: "no-store",
  });

  const data = await admin.json();
  return data;
}
