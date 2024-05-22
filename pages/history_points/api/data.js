import { request } from "@/service/AxiosService.js";
// const apiUrl = useRuntimeConfig().public.URL_API;

export function getData() {
  const url = `/api/crm/v1/point`;
  return request("get", url, {}, true);
}

export function getDataLog() {
  const url = `/api/crm/v1/point/log`;
  return request("get", url, {}, true);
}
