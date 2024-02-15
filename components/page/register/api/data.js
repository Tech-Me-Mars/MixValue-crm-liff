import { request } from "@/service/AxiosService.js";
// const apiUrl = useRuntimeConfig().public.URL_API;

export function register(payload) {
   const url = `/api/crm/v1/register`;
   return request("post", url, payload, true);
}