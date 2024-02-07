<template>
    <div class="my-3" v-if="isloadingAxi">
        <Card>
            <template #content>
                <ProgressBar mode="indeterminate" class="my-1" style="height: 6px"></ProgressBar>
            </template>
        </Card>
    </div>
    <div class="" v-if="!isloadingAxi">
        <form @submit.prevent="onSubmit" class="mt-3" enctype="multipart/form-data">
            <div class="">
                <div class="grid grid-cols-2 gap-4 px-4 card mb-2">
                    <div class="col-span-2 px-4 font-bold text-2xl">รายละเอียด</div>
                    <div class="p-4"><strong>เลขที่ใบสั่งซื้อ:</strong><span>{{ resPodata.po_code }}</span></div>
                    <div class="p-4"><strong>คู่ค้า:</strong><span>{{ resPodata.supplier_name }}</span></div>
                    <div class="p-4"><strong>คลังสินค้า:</strong><span>{{ resPodata.warehouse_name }}</span></div>
                    <div class="p-4"><strong>แผนเงิน:</strong><span>{{ resPodata.type_money_name }}</span></div>
                    <div class="p-4"><strong>วันที่ดำเนินการ:</strong><span>{{ resPodata.po_date_request }}</span></div>
                    <div class="p-4">
                        <strong>สถานะ:</strong>
                        <span v-if="resPodata.po_status == 0">ยังไม่ได้รับการอนุมัติ</span>
                        <span v-else>ได้รับการอนุมัติแล้ว</span>
                    </div>

                </div>

                <!-- <div class="mb-2 bg-white border-round-md px-4 py-4 shadow-7 flex justify-start">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">เลขที่ใบแจ้งหนี้</label>
                        <div class="card flex justify-content-start p-inputtext-sm mr-3">
                            <div class="relative">
                                <span class="absolute left-0 pl-2 flex align-items-center text-dark-700 font-bold"
                                    style="top: 0px; bottom: 0px">เลขที่</span>
                                <InputText readonly="true" v-model="generateInvoiceCode" type="text" :pt="{
                                    root: {
                                        class:
                                            'broder-2 border-black  w-full text-red-600 font-semibold  pl-6 ',
                                    },
                                }" class="p-inputtext-sm" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for="วันที่สร้างใบแจ้งนี้"
                            class="block text-sm font-medium text-gray-700 mb-1">วันที่สร้างใบแจ้งนี้</label>
                        <div class="card flex justify-content-start p-inputtext-sm">
                            <Calendar dateFormat="dd/mm/yy" id="invoice_date" v-model="invoice_date" showIcon
                                style="height: 43px" />
                        </div>
                    </div>

                    <div class="ml-8">
                        <label for="เอกสารแนบ" class="block text-sm font-medium text-gray-700 mb-3">เอกสารแนบ</label>
                        <div class="card flex justify-content-start p-inputtext-sm">
                            <input type="file" accept="application/pdf, image/png, image/jpeg" :maxFileSize="1000000"
                                @change="handleFileUpload" />
                        </div>
                    </div>
                </div> -->
                <div class=" grid grid-cols-1 lg:grid-cols-3 gap-2 card">
                    <div class="">
                        <TmmTypographyLabelForm label="เลขที่ใบแจ้งหนี้" />
                        <TmmInputGroupLabel label="เลขที่" v-model="generateInvoiceCode" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="วันที่สร้างใบแจ้งนี้" />
                        <TmmInputCalendar v-model="invoice_date" placeholder="วันที่สร้างใบแจ้งนี้" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="เอกสารแนบ" />
                        <TmmInputUploadFile @change="handleFileUpload" />
                    </div>

                </div>

                <div class="">
                    <DataTable ref="dt" :value="dataItem" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 20, 50]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Products">
                        <template #header>
                            <div class="flex flex-wrap gap-2 items-center justify-between">
                                <h4 class="m-0">รายละเอียดรายการขอซื้อ</h4>
                                <TmmInputSearchGlobal v-model="filters['global'].value" />
                            </div>
                        </template>

                        <Column field="id" header="ID" sortable style="min-width: 5rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                        <Column field="supplier_product_name" header="ชื่อสินค้า" sortable style="min-width: 10rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                        <Column field="unit_price" header="ราคาต่อหน่วย" sortable style="min-width: 10rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.unit_price) }}
                            </template>
                        </Column>
                        <Column field="qty" header="จำนวน" sortable style="min-width: 5rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                            <template #body="slotProps">
                                {{ formatNumber(slotProps.data.qty) }}
                            </template>
                        </Column>
                        <Column field="total_price" header="จำนวนเงินรวม" sortable style="min-width: 7rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.total_price) }}
                            </template>
                        </Column>
                        <ColumnGroup type="footer">
                            <Row>
                                <Column footer="Totals:" :colspan="4" footerStyle="text-align:right" />
                                <Column :footer="formatCurrency(resPodata.po_total_amount)" />
                            </Row>
                        </ColumnGroup>
                    </DataTable>
                </div>
            </div>

            <div class="card flex flex-wrap gap-3 justify-end">
                <TmmButtonPrint :loading="isloadingAxi" label="พิมพ์เอกสาร" severity="" type="button" />
                <TmmButtonNext :loading="isloadingAxi" label="ต่อไป" severity="success" type="submit" />
            </div>
        </form>
    </div>
    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>
  
<script setup>
import { FilterMatchMode } from "primevue/api";
import { useRouter, useRoute } from "vue-router";
// validation
import * as dataApi from "./api/data.js";
import { format } from "date-fns";
import ProgressBar from "primevue/progressbar";
import { formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';
import axios from "axios";

// ************* [ LOADING BTN ]
const isloadingAxi = useState('isloadingAxi')
const router = useRouter();
const route = useRoute();
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({})
const InvoicestepActive = useState('InvoicestepActive')

const dataItem = ref();
const resPodata = ref({ po_total_amount: null });
const invoice_date = ref(new Date());
const generateInvoiceCode = ref();
onMounted(async () => {
    try {
        const res = await dataApi.getpobyid(route.params.id);
        resPodata.value = res.data.data;
        dataItem.value = res.data.data.po_item;
        // GenerateInvoiceCode
        const resInvoiceCode = await dataApi.GenerateInvoiceCode();
        generateInvoiceCode.value = resInvoiceCode.data.data.invoice_number;
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
});

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
// FILE UPLOAD
let selectedFile = ref(null);

const handleFileUpload = (e) => {
    selectedFile = e.target.files[0];
    console.log(selectedFile);
};

const onSubmit = async () => {
    invoice_date.value = format(new Date(invoice_date.value), "yyyy-MM-dd");
    let formData = new FormData();
    formData.append("po_id", route.params.id);
    formData.append("invoice_date", invoice_date.value);
    formData.append("invoice_file", selectedFile);
    formData.append("invoice_number", generateInvoiceCode.value);
    try {
        const res = await dataApi.saveinvoice(formData);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        InvoicestepActive.value = 1 // ไปยัง step ถัดไป
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
};
</script>
  