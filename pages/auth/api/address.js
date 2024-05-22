import { request } from "@/service/AxiosService.js";



export function getAddressProvinces() {
    const url = `/api/address/provinces`;
    return request("get", url, {}, true);
  }

export function getAddressAmphuresById(id) {
const url = `/api/address/amphures/${id}`;
return request("get", url, {}, true);
}

export function getAddressDistrictsById(id) {
const url = `/api/address/districts/${id}`;
return request("get", url, {}, true);
}
