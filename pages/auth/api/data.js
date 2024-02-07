import { request } from "@/service/AxiosService.js";


export function login(data) {
    const url = `/api/auth/login`;
   return request("post", url, data, false);
}

export function logOut() {
    const url = `/api/auth/logout`;
   return request("post", url, {}, true);
}

export function register(data) {
    const url = `/api/warehouse/register`;
   return request("post", url, data, false);
}

export function getWelcomeSlide() {
    const url = `/api/warehouse/v1/global-welcome-slide`;
   return request("get", url, {}, false);
}