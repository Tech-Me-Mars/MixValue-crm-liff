import { request } from "@/service/AxiosService.js";
// const apiUrl = useRuntimeConfig().public.URL_API;

export function getContent(data) {
  const url = `/api/crm/v1/content?data=${data}`;
  return request("get", url, {}, true);
}
