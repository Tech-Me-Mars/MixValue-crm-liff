import { request } from "@/service/AxiosService.js";

function getDashboardPo() {
  console.log("getDashboardPo");
  return request(
    "get",
    `/api/warehouse/v1/dashboard/get-dashboard-po`,
    {},
    true
  );
}

function getDashboardSupplier() {
  console.log("getDashboardSupplier");
  return request(
    "get",
    `/api/warehouse/v1/dashboard/get-dashboard-supplier`,
    {},
    true
  );
}

function getDashboardSupplierForProduct() {
  console.log("getDashboardSupplierForProduct");
  return request(
    "get",
    `/api/warehouse/v1/dashboard/get-dashboard-supplier-for-product`,
    {},
    true
  );
}

function getDashboardSupplierForProductById(id) {
  console.log("getDashboardSupplierForProductById");
  return request(
    "get",
    `/api/warehouse/v1/dashboard/get-dashboard-supplier-for-product-by-id/${id}`,
    {},
    true
  );
}

function getDashboardPlan(limit = null) {
  console.log(limit);

  if (limit == null) {
    return request(
      "get",
      `/api/warehouse/v1/dashboard/get-dashboard-plan`,
      {},
      true
    );
  } else {
    return request(
      "get",
      `/api/warehouse/v1/dashboard/get-dashboard-plan?limit=${limit}`,
      {},
      true
    );
  }
}

function getDashboardDeadStock() {
  return request(
    "get",
    `/api/warehouse/v1/dashboard/get-dashboard-plan`,
    {},
    true
  );
}

function getMainReportWarehouseInventory() {
  return request(
    "get",
    `/api/warehouse/v1/dashboard/get-main-report-warehouse-inventory`,
    {},
    true
  );
}

function getWarehouse() {
  return request("get", `/api/warehouse/v1/warehouse`, {}, true);
}
function getWarehouseInventoryById(id) {
  return request(
    "get",
    `/api/warehouse/v1/warehouse/get-warehouse-inventory/${id}`,
    {},
    true
  );
}

export {
  getDashboardPo,
  getDashboardSupplier,
  getDashboardSupplierForProduct,
  getDashboardSupplierForProductById,
  getDashboardPlan,
  getMainReportWarehouseInventory,
  getDashboardDeadStock,
  getWarehouse,
  getWarehouseInventoryById,
};
