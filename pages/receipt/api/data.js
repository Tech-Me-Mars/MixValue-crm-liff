import { request } from "@/service/AxiosService.js";
// const apiUrl = useRuntimeConfig().public.URL_API;

export function register(payload) {
  const url = `/api/crm/v1/register`;
  return request("post", url, payload, true);
}

export function getProfile() {
  const url = `/api/crm/v1/profile`;
  return request("get", url, {}, true);
}

export function updateProfile(payload) {
  const url = `/api/crm/v1/profile`;
  return request("post", url, payload, true);
}

export function getETax() {
  const url = `/api/crm/v1/e_tax`;
  return request("get", url, {}, true);
}

export function getETaxById(id) {
  const url = `/api/crm/v1/e_tax/${id}`;
  return request("get", url, {}, true);
}
