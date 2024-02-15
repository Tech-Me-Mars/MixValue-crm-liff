import { request } from "@/service/AxiosService.js";
// const apiUrl = useRuntimeConfig().public.URL_API;

export function getCoupon() {
   const url = `/api/crm/v1/coupon`;
   return request("get", url, {}, true);
}
