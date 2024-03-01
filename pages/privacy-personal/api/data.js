import { request } from "@/service/AxiosService.js";
// const apiUrl = useRuntimeConfig().public.URL_API;

export function getPrivacyPersonal() {
  const url = `/api/crm/v1/profile/privacy_personal`;
  return request("get", url, {}, true);
}
