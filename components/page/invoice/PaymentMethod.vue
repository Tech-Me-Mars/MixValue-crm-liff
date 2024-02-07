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

                <!-- <div class=" grid grid-cols-1 lg:grid-cols-3 gap-2 card">
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

                </div> -->

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

                <div class="lg:w-full mb-5 bg-white border-round-md px-4 py-4 shadow-7">
                    <div class="items-center mb-2">
                        <h1 class="text-neutral-600 font-bold text-2xl">รายการ</h1>
                        <div style="overflow-x: auto" class="mb-3">
                            <table class="min-w-full" style="table-layout: auto">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th class="px-4 py-2" style="min-width: 12rem;">รูปแบบการชำระ</th>
                                        <th class="px-4 py-2" style="min-width: 12rem;">วันที่ชำระ</th>
                                        <th class="px-4 py-2" style="min-width: 12rem;">จำนวนเงิน</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center align-top">
                                    <tr v-for="(item, index) in fields" :key="item.key" class="mb-4">
                                        <td class="w-[2rem] py-3">{{ index + 1 }}</td>
                                        <td class="px-2">
                                            <div class="flex flex-col w-full">
                                                <TmmInputDropDown v-model="item.value.invoice_paid_status_id"
                                                    :options="paymentMethods" optionLabel="payment_method" optionValue="id"
                                                    placeholder="รูปแบบการชำระ" />
                                                <TmmTypographyTextValidator
                                                    v-if="errors[`invoiceInstallments[${index}].invoice_paid_status_id`]"
                                                    :errors="errors[`invoiceInstallments[${index}].invoice_paid_status_id`]" />

                                            </div>
                                        </td>
                                        <td class="px-2">
                                            <div class="flex flex-col w-full">
                                                <TmmInputCalendar v-model="item.value.due_date" placeholder="วันที่ชำระ" />
                                                <TmmTypographyTextValidator
                                                    v-if="errors[`invoiceInstallments[${index}].due_date`]"
                                                    :errors="errors[`invoiceInstallments[${index}].due_date`]" />
                                            </div>
                                        </td>
                                        <td class="pl-2">
                                            <div class="flex flex-col w-full">
                                                <TmmInputNumber v-model="item.value.amount" placeholder="จำนวนเงิน" />
                                                <TmmTypographyTextValidator
                                                    v-if="errors[`invoiceInstallments[${index}].amount`]"
                                                    :errors="errors[`invoiceInstallments[${index}].amount`]" />
                                            </div>
                                        </td>
                                        <td class="pl-2">
                                            <TmmButtonDelete label="ลบ" severity="danger" @click="remove(index)" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="text-center mt-2">
                            <TmmButtonAddNew label="เพิ่มรายการ" @click="
                                push({
                                    invoice_paid_status_id: undefined,
                                    due_date: undefined,
                                    amount: undefined,
                                })
                                " />
                        </div>
                    </div>
                </div>
            </div>
            <div class="card flex flex-wrap gap-3 justify-end">
                <TmmButtonPrint :loading="isloadingAxi" label="พิมพ์เอกสาร" severity="" type="button" />
                <TmmButtonSave :loading="isloadingAxi" type="submit" />
            </div>
        </form>
    </div>
    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>
  
<script setup>
import { FilterMatchMode } from "primevue/api";
import { useRouter, useRoute } from "vue-router";
//! /////// [validation] /////////
import { useFieldArray, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import * as dataApi from "./api/data.js";
import { format } from "date-fns";
import ProgressBar from "primevue/progressbar";
import { formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';

// ************* [ LOADING BTN ]
const isloadingAxi = useState('isloadingAxi')
const router = useRouter();
const route = useRoute();
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({})
const InvoicestepActive = useState('InvoicestepActive')


const requireValue = "กรุณาระบุข้อมูล";

const validationSchema = toTypedSchema(
    zod.object({
        invoiceInstallments: zod.array(
            zod.object({
                invoice_paid_status_id: zod.number({
                    required_error: 'กรุณาเลือกรูปแบบการชำระ',
                    invalid_type_error: "กรุณาเลือกรูปแบบการชำระ",
                }),
                due_date: zod.date({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }),
                amount: zod.number({
                    required_error: requireValue,
                    invalid_type_error: "ราคาต้องเป็นตัวเลขเท่านั้น",
                }),
            })
        ),
    })
);

const dataItem = ref();
const resPodata = ref({ po_total_amount: null });
const invoice_date = ref(new Date());

onMounted(async () => {
    getPoData();
    getPaymentMethod();
});
const getPoData = async () => {
    try {
        const res = await dataApi.getpobyid(route.params.id);
        resPodata.value = res.data.data;
        dataItem.value = res.data.data.po_item;
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
};

const paymentMethods = ref();
const getPaymentMethod = async () => {
    try {
        const res = await dataApi.getPaymentMethod();
        paymentMethods.value = res.data.data;
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
};
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
// Validate and submit
const { handleSubmit, errors } = useForm({
    initialValues: {
        invoiceInstallments: [
            {
                invoice_paid_status_id: undefined,
                due_date: undefined,
                amount: undefined,
            },
        ],
    },
    validationSchema,
});

const { remove, push, fields } = useFieldArray("invoiceInstallments");
const onSubmit = handleSubmit((values) => {
    savePaymentMethod(values);
});
const savePaymentMethod = async (value) => {
    try {
        const formData = {
            po_id: route.params.id,
            invoiceInstallments: value.invoiceInstallments.map((item) => ({
                invoice_paid_status_id: item.invoice_paid_status_id,
                due_date: format(new Date(item.due_date), "yyyy-MM-dd"),
                amount: item.amount,
            })),
        };
        const rs = await dataApi.addInvoiceInstallments(formData);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: rs.data.message,
        };
        setTimeout(() => {
            router.push("/modules/invoice/main");
        }, 1500);

    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
};
</script>
  