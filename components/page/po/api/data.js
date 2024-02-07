import { request } from "@/service/AxiosService.js";

export function readpo() {
  const url = `/api/warehouse/v1/po/get-po`;
  return request("get", url, {}, true);
}

export function readpobyid(id) {
  console.log("1", id);
  const url = `/api/warehouse/v1/po/${id}`;
  return request("get", url, {}, true);
}

export function getpobyid(id) {
  const url = `/api/warehouse/v1/po/${id}`;
  return request("get", url, {}, true);
}

export function savepo(data) {
  console.log(JSON.stringify(data));
  const url = `/api/warehouse/v1/po`;
  return request("post", url, data, true);
}
export function savePoFile(data, id) {
  const url = `/api/warehouse/v1/po/po-save-file/${id}`;
  return request("post", url, data, true);
}

// po-approve
export function poapprove(data, id) {
  console.log(JSON.stringify(data));
  const url = `/api/warehouse/v1/po/${id}/approve-po`;
  return request("post", url, data, true);
}

export function posendsupplier(id, data) {
  const url = `/api/warehouse/v1/po/${id}/po-send-supplier`;
  return request("post", url, data, true);
}

// update datedelivery
export function poupdatedelivery(data, id) {
  console.log(JSON.stringify(data));
  const url = `/api/warehouse/v1/po/${(data, id)}/update-delivery`;
  return request("post", url, data, true);
}

export function poBookingDate(id, data) {
  console.log(JSON.stringify(data));
  const url = `/api/warehouse/v1/po/${id}/po-booking-delivery-date`;
  return request("post", url, data, true);
}

export function updatedelivery(data, id) {
  const url = `/api/warehouse/v1/po/${id}/approve-po`;
  return request("post", url, data, true);
}

export function savetypemoney(data) {
  const url = `/api/warehouse/v1/typemoney`;
  return request("post", url, data, true);
}

// supli
export function readsupplier() {
  const url = `/api/warehouse/v1/supplier`;
  return request("get", url, {}, true);
}
export function readsupplierproduct() {
  const url = `/api/warehouse/v1/supplierproduct`;
  return request("get", url, {}, true);
}

// plan
export function readplan() {
  const url = `/api/warehouse/v1/plan`;
  return request("get", url, {}, true);
}

export function getPlanNoneReject() {
  const url = `/api/warehouse/v1/plan/get-plan-non-reject`;
  return request("get", url, {}, true);
}



// warehouse
export function readwarehouse() {
  const url = `/api/warehouse/v1/warehouse`;
  return request("get", url, {}, true);
}

// typemoney
export function readtypemoney() {
  const url = `/api/warehouse/v1/typemoney`;
  return request("get", url, {}, true);
}

// forstep

export function stepdata(id) {
  const url = `/api/warehouse/v1/po/get-po-tabs/${id}`;
  return request("get", url, {}, true);
}

// GENERATE PO CODE

export function generatePoCode() {
  const url = `/api/warehouse/v1/po/generate-po-code`;
  return request("get", url, {}, true);
}

export function getAutocomplete(data) {
  const url = `/api/warehouse/v1/po/po-code-autocomplete`;
  return request("post", url, data, true);
}


// step4
export function poBooking(id, data) {
  const url = `/api/warehouse/v1/po/${id}/po-booking-delivery-date`;
  return request("post", url, data, true);
}

// step 5
export function updatepoitem(id, data) {
  const url = `/api/warehouse/v1/porecevie/${id}/update-po-item`;
  return request("post", url, data, true);
}

export function approvedconfirm(id, data) {
  const url = `/api/warehouse/v1/porecevie/${id}/approved-confirm`;
  return request("post", url, data, true);
}

export function updatePONote(id, data) {
  const url = `/api/warehouse/v1/inventory/${id}/confirm-inventory`;
  return request("post", url, data, true);
}

// SKU ATTRIBUTE
export function saveSkuattribute(data) {
  console.log(`createSkuAttribute : ${JSON.stringify(data)}`);
  const url = `/api/warehouse/v1/skuattribute`;
  return request("post", url, data, true);
}

// SKU ATTRIBUTE
export function getSkuAttribute() {
  const url = `/api/warehouse/v1/skuattribute`;
  return request("get", url, {}, true);
}