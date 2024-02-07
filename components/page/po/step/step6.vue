
<template>
    <div class="">
        <Form @submit="approvpoAction" class="">
            <div class="grid grid-cols-2 gap-4 px-4 card">
                <div><strong>เลขที่ใบสั่งซื้อ:</strong><span>{{ resPodata.po_code }}</span></div>
                <div><strong>คู่ค้า:</strong><span>{{ resPodata.supplier_name }}</span></div>
                <div><strong>คลังสินค้า:</strong><span>{{ resPodata.warehouse_name }}</span></div>
                <div><strong>แผนเงิน:</strong><span>{{ resPodata.type_money_name }}</span></div>
                <div><strong>วันที่ดำเนินการ:</strong><span>{{ resPodata.po_date_request }}</span></div>
                <div><strong>สถานะ:</strong><span v-if="isApproved">ได้รับการอนุมัติแล้ว</span><span
                        v-else>ยังไม่ได้รับการอนุมัติ</span></div>
            </div>
            <div class="card">

                <div class="mb-3">
                    <DataTable stripedRows ref="dt" v-model:filters="filters1" :value="dataInvoice" paginator :rows="10"
                        filterDisplay="menu" size="small"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
                        currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ">
                        <template #header>
                            <div class="flex flex-wrap justify-between align-items-center">
                                <h6>ข้อมูลใบแจ้งหนี้</h6>
                                <TmmInputSearchGlobal v-model="filters1['global'].value" />
                            </div>
                        </template>
                        <template #empty> No data found. </template>
                        <Column field="id" header="ID" sortable style="min-width: 5rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                        <Column field="_po.po_code" header="เลขที่ใบสั่งซื้อ" sortable style="min-width: 7rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                        <Column field="invoice_number" header="เลขที่ใบแจ้งหนี้" sortable style="min-width: 7rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                        <Column field="invoice_date" header="วันที่สร้างใบแจ้งหนี้" sortable style="min-width: 5rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                        <Column field="total_amount" header="จำนวนเงินรวม" sortable style="min-width: 7rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                            <template #body="slotProps">{{
                                formatCurrency(slotProps.data.total_amount)
                            }}</template>
                        </Column>
                    </DataTable>
                </div>
                <div class="mb-3">
                    <DataTable stripedRows ref="dt" v-model:filters="filters2" :value="dataInvoiceInstallments" paginator
                        :rows="10" filterDisplay="menu" size="small"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
                        currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ">
                        <template #header>
                            <div class="flex flex-wrap justify-between align-items-center">
                                <h6>รูปแบบชำระหนี้</h6>
                                <TmmInputSearchGlobal v-model="filters2['global'].value" />
                            </div>
                        </template>
                        <template #empty> No data found. </template>
                        <Column field="id" header="ID" sortable style="min-width: 5rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                        <Column header="เลขที่ใบสั่งซื้อ" style="min-width: 7rem">
                            <template #body="{ data }">
                                {{ data._po[0].po_code }}
                            </template>
                        </Column>
                        <Column field="invoice_number" header="เลขที่ใบแจ้งหนี้" sortable style="min-width: 12rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                            <template #body="{ data }">
                                {{ data._invoice[0].invoice_number }}
                            </template>
                        </Column>
                        <Column field="installment_number" header="เลขงวด" sortable style="min-width: 7rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                        <Column field="due_date" header="วันที่ครบกำหนด" sortable style="min-width: 12rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                        <Column field="amount" header="เงินรวม" sortable style="min-width: 7rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.amount) }}
                            </template>
                        </Column>
                        <Column field="invoice_paid_status_name" header="รูปแบบการชำระเงิน" sortable
                            style="min-width: 12rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                        <Column field="paid_date" header="วันที่จ่าย" sortable style="min-width: 8rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="mb-3">
                    <DataTable stripedRows ref="dt" v-model:filters="filters3" :value="dataPoPayment" paginator :rows="10"
                        filterDisplay="menu" size="small"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
                        currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ">
                        <template #header>
                            <div class="flex flex-wrap justify-between align-items-center">
                                <h6>ชำระหนี้</h6>
                                <TmmInputSearchGlobal v-model="filters3['global'].value" />
                            </div>
                        </template>
                        <template #empty> No data found. </template>
                        <Column field="id" header="ID" sortable style="min-width: 5rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>

                        <Column header="เลขที่ใบสั่งซื้อ" style="min-width: 7rem">
                            <template #body="{ data }">
                                {{ data._po[0].po_code }}
                            </template>
                        </Column>
                        <Column field="invoice_number" header="เลขที่ใบแจ้งหนี้" sortable style="min-width: 7rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                            <template #body="{ data }">
                                {{ data._invoice[0].invoice_number }}
                            </template>
                        </Column>
                        <Column field="payment_date" header="วันที่ชำระหนี้" sortable style="min-width: 3rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                        <Column field="amount" header="เงินรวม" sortable style="min-width: 3rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.amount) }}
                            </template>
                        </Column>
                        <Column field="payment_method" header="รูปแบบการชำระเงิน" sortable style="min-width: 3rem">
                            <template #sorticon="slotProps">
                                <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                            </template>
                        </Column>
                    </DataTable>
                </div>

            </div>
            <div class="flex justify-end flex-wrap gap-2">
                <TmmButtonNext @click="poStepActive = 6" />
            </div>
        </Form>
    </div>
    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>
  
<script setup>
import { FilterMatchMode } from "primevue/api";
import { useRoute } from "vue-router";
import { format } from "date-fns";
import { formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';
import { Form } from "vee-validate";
import * as dataApi from "../api/data.js";
//**************** ประกาศ PROPS **************
const props = defineProps({
    datapo: {
        type: Object,
        required: true,
    },
    textsome: {
        type: String,
        required: false,
    }
});

const route = useRoute()

// ************* [ LOADING BTN ]
const isloadingAxi = useState('isloadingAxi')
const poStepActive = useState('poStepActive')

const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({})

const dataPo = computed(() => props.datapo);

const resPoItem = ref();
const resPodata = ref({});
const isApproved = ref(false);
// *********** VARIABLE FOR DATATABLE *****************
const dataInvoice = ref();
const dataInvoiceInstallments = ref();
const dataPoPayment = ref();
const loadDataPo = async () => {
    try {
        dataInvoice.value = dataPo.value.status_paid.data_invoice;
        dataInvoiceInstallments.value = dataPo.value.status_paid.data_invoice_installments;
        dataPoPayment.value = dataPo.value.status_paid.data_po_payments;
        resPoItem.value = dataPo.value.supplierProduct;
        resPodata.value = dataPo.value;
        isApproved.value = dataPo.value.aprroved.status_approved;
    } catch (error) {
        console.error(error)
    }
}
watchEffect(() => {
    // เมื่อ props.datapo เปลี่ยนแปลง ให้เรียกใช้ loadDataPo
    loadDataPo();
});
onMounted(() => {
    loadDataPo();
})
const emit = defineEmits(["value-updated"]);
const emitStepData = () => {
    emit('value-updated', false);
};
// ********TABLE FILTER SEARCH **************
const filters1 = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const filters2 = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const filters3 = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const optionappove = [
    { id: 2, name: "ปรับเป็นอนุมัติแล้ว" },
    { id: 1, name: "ปรับเป็นไม่อนุมัติ" },
];

const approveselect = ref(2);
const approvpoAction = async () => {
    try {
        const res = await dataApi.poapprove({ po_status: approveselect.value }, route.params.id);
        emitStepData();
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
};
</script>
  