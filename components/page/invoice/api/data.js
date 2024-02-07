import { request } from "@/service/AxiosService.js";


export function readinvoice() {
  const url = `/api/warehouse/v1/invoice`;
  return request("get", url, {}, true);
}

export function readinvoicecancel() {
  const url = `/api/warehouse/v1/invoicecancel`;
  return request("get", url, {}, true);
}

export function saveinvoice(data) {
  console.log(JSON.stringify(data));
  const url = `/api/warehouse/v1/invoice`;
  return request("post", url, data, true);
}

export function deleteinvoice(id) {
  const url = `/api/warehouse/v1/invoice/${id}`;
  return request("delete", url, {}, true);
}

export function getpobyid(id) {
  const url = `/api/warehouse/v1/po/${id}`;
  return request("get", url, {}, true);
}

export function posendsupplier(id, data) {
  const url = `/api/warehouse/v1/po/${id}/po-send-supplier`;
  return request("post", url, data, true);
}

export function advancedSearch(data) {
  const url = `/api/warehouse/v1/invoice/get-advance-search-po`;
  return request("post", url, data, true);
}

// SUPPLIER ID
export function getSupplierAll() {
  const url = `/api/warehouse/v1/supplier`;
 return request("get", url, {}, true);
}

// GET PAYMENT METHOD
export function getPaymentMethod() {
  const url = `/api/warehouse/v1/paymentmethod`;
 return request("get", url, {}, true);
}

// PO STATUS
export function getPoStatusAll() {
  const url = `/api/warehouse/v1/postatus`;
  return request("get", url, {}, true);
}

// Invoice Installment
export function addInvoiceInstallments(data) {
  const url = `/api/warehouse/v1/invoiceinstallments`;
  return request("post", url, data, true);
}

// Generate Invoice Code
export function GenerateInvoiceCode() {
  const url = `/api/warehouse/v1/invoice/generate-invoice-code`;
  return request("post", url, {}, true);
}