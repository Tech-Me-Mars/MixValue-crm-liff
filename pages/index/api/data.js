import { request } from "@/service/AxiosService.js";
// const apiUrl = useRuntimeConfig().public.URL_API;

export function getSlider() {
   const url = `/api/crm/v1/slide`;
   return request("get", url, {}, true);
}

export function getCardMember() {
   const url = `/api/crm/v1/card_member`;
   return request("get", url, {}, true);
}
