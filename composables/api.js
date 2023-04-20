import { $fetch } from "ohmyfetch";

export const $api = $fetch.create({
  baseURL: config.public.apiBase,
  headers: headers,
  credentials: "include",
});
