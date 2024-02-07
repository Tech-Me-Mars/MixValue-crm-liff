
// 
import { request } from "@/service/AxiosService.js";
// const apiUrl = useRuntimeConfig().public.URL_API;
export function getUnitAll() {
    const url = `/api/warehouse/v1/unit`;
   return request("get", url, {}, true);
}

export function getUnitById(id) {
    const url = `/api/warehouse/v1/unit/${id}`;
    return request("get", url, {}, true);
 }

 export function saveUnit(data) {
    const url = `/api/warehouse/v1/unit`;
    return request("post", url, data, true);
 }
 
 export function updateUnit(id, data) {
    const url = `/api/warehouse/v1/unit/${id}`;
    return request("put", url, data, true);
 }
 
 export function deleteUnit(id) {
      const url = `/api/warehouse/v1/unit/${id}`;
    return request("delete", url, {}, true);
 }