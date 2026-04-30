// "use client";

// import { ActionResponse } from "@/interfaces";
// import api from "@/infrastructure/lib/axios";
// import { getErrorMessage } from "@/infrastructure";

// export async function logoutUser(): Promise<ActionResponse<undefined>> {
//   try {
//     const res = await api.post("/auth/logout");
//     if (res.status === 200) {
//       return {
//         success: true,
//       };
//     } else {
//       throw new Error("Unknow error");
//     }
//   } catch (error) {
//     const message = getErrorMessage(error);
//     return {
//       success: false,
//       message: message,
//     };
//   }
// }

"use server";

import { signOut } from "@/infrastructure/lib/auth";

export const logout = async () => {
  await signOut();
};
