
<template>
    <div class="">
        <Form @submit="onSubmit" class="">
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
                <h6>รายละเอียดการขอซื้อ</h6>
                <DataTable stripedRows ref="dt" v-model:filters="filters" :value="resPoItem" paginator :rows="10"
                    filterDisplay="menu" size="small"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
                    currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ">
                    <template #header>
                        <div class="flex flex-wrap justify-between align-items-center">
                            <div class="flex gap-2">
                                <TmmButtonClearFilter @click="clearFilter()" />
                                <TmmInputSearchGlobal v-model="filters['global'].value" />
                            </div>
                        </div>
                    </template>
                    <template #empty> No data found. </template>
                    <Column field="indexkey" header="#" sortable style="min-width: 3rem">
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
                    </Column>
                    <Column field="unit_price" header="ราคาต่อหน่วย" sortable style="min-width: 10rem">
                        <template #sorticon="slotProps">
                            <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                        </template>
                    </Column>
                    <Column v-if="isReceive == false" header="จำนวน" sortable sortField="qty" style="min-width: 6rem">
                        <template #sorticon="slotProps">
                            <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                        </template>
                        <template #body="slotProps">
                            <TmmInputInteger v-model="slotProps.data.qty" class="h-[2rem] mx-1" />
                        </template>
                    </Column>
                    <Column v-else field="qty" header="จำนวน" sortable style="min-width: 5rem">
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
                    <Column field="expired_date" header="วันหมดอายุ" sortable style="min-width: 7rem">
                        <template #sorticon="slotProps">
                            <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                        </template>
                        <template #body="slotProps">
                            <TmmInputCalendar v-model="slotProps.data.expired_date" class="h-[2rem] w-[5rem] mx-1" />
                        </template>
                    </Column>
                    <Column field="sku_id" header="SKU" sortable style="min-width: 7rem">
                        <template #sorticon="slotProps">
                            <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
                        </template>
                        <template #body="slotProps">
                            <div class="flex items-center gap-3">
                                <TmmInputDropDown v-model="slotProps.data.sku_id" :options="skus" optionLabel="sku_code"
                                    optionValue="id" class="h-[2.5rem] mr-2" placeholder="เลือก SKU"
                                    @change="checkAddNew(slotProps.data.sku_id)" />
                                <TmmButton type="button" label="อัพเดท"
                                    @click="updateQty(slotProps.data.id, slotProps.data.qty, slotProps.data.sku_id, slotProps.data.expired_date)"
                                    size="small" class="h-[2rem]" severity="success">
                                </TmmButton>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <hr />
            <div class="card">
                <div class="">
                    <TmmTypographyLabelForm label="วันที่ได้รับ" />
                    <TmmInputCalendar placeholder="วันที่ได้รับ" v-model="received_date" />
                    <TmmTypographyTextValidator v-if="errors.received_date" :errors="errors.received_date" />
                </div>

                <div class="">
                    <div>
                        <TmmTypographyLabelForm label="หมายเหตุใบสั่งซื้อ" />
                    </div>
                    <TmmInputTextarea v-model="po_note" class="w-full" placeholder="หมายเหตุใบสั่งซื้อ" />
                    <TmmTypographyTextValidator v-if="errors.po_note" :errors="errors.po_note" />
                </div>
            </div>

            <hr />
            <div class="flex justify-end flex-wrap gap-2 mb-3">
                <TmmButton v-if="isReceive" label="รับสินค้าเข้าคลังแล้ว" type="submit" disabled :loading="isloadingAxi"
                    severity="primary" />
                <TmmButton v-else label="รับสินค้าเข้าคลัง" class="" :loading="isloadingAxi" type="submit"
                    severity="success" />
                <TmmButtonNext @click="poStepActive = 5" />
            </div>

        </Form>
    </div>

    <Dialog v-model:visible="skuDialog" maximizable :style="{ width: '700px' }" header="รายละเอียดคุณลักษณสินค้า"
        :modal="true" class="p-fluid">
        <hr class="mb-3" />
        <form @submit="onSubmit2">
            <div class="grid grid-cols-1 gap-2">
                <div class="">
                    <TmmTypographyLabelForm label="ชื่อคุณลักษณะสินค้า" />
                    <TmmInput v-model="sku_attribute_name" placeholder="ชื่อคุณลักษณะสินค้า" />
                    <TmmTypographyTextValidator v-if="errors2.sku_attribute_name" :errors="errors2.sku_attribute_name" />
                </div>

                <div class="">
                    <TmmTypographyLabelForm label="ชนิดคุณลักษณะสินค้า" />
                    <TmmInput v-model="sku_attribute_value" placeholder="ชนิดคุณลักษณะสินค้า" />
                    <TmmTypographyTextValidator v-if="errors2.sku_attribute_value" :errors="errors2.sku_attribute_value" />
                </div>

                <div class="">
                    <TmmTypographyLabelForm label="รายละเอียดคุณลักษณสินค้า" />
                    <TmmInput v-model="sku_description" placeholder="รายละเอียดคุณลักษณสินค้า" />
                    <TmmTypographyTextValidator v-if="errors2.sku_description" :errors="errors2.sku_description" />
                </div>

                <div class="">
                    <TmmTypographyLabelForm label="code" />
                    <TmmInput v-model="sku_code" placeholder="code" />
                    <TmmTypographyTextValidator v-if="errors2.sku_code" :errors="errors2.sku_code" />
                </div>

                <div class="">
                    <TmmTypographyLabelForm label="barcode" />
                    <TmmInput v-model="sku_barcode" placeholder="barcode" />
                    <TmmTypographyTextValidator v-if="errors2.sku_barcode" :errors="errors2.sku_barcode" />
                </div>
            </div>

            <hr class="mb-3" />
            <div class="flex justify-end gap-1">
                <div class="flex gap-1">
                    <TmmButtonCancel @click="skuDialog = false" :loading="isloadingAxi" />
                    <TmmButtonSave label="บันทึก" type="submit" :loading="isloadingAxi" />
                </div>
            </div>
        </form>
    </Dialog>

    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>
  
<script setup>
import { FilterMatchMode } from "primevue/api";
import { useRoute } from "vue-router";
import { format } from "date-fns";
import { formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';
import * as dataApi from "../api/data.js";
//! /////// [validation import] /////////
import { useField, useForm, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
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

const isReceived = ref(false);

const resPoItem = ref();
const resPodata = ref({});
const isApproved = ref(false);
const loadDataPo = async () => {
    try {
        if (Object.keys(dataPo).length) { //รอให้มีข้อมูล
            resPoItem.value = dataPo.value.supplierProduct;
            resPodata.value = dataPo.value;
            isApproved.value = await dataPo.value.aprroved.status_approved;
            console.log(dataPo.value.aprroved.status_approved)
            isReceived.value = dataPo.value.status_recevie_inventory.status_recevie_inventory;
        }

    } catch (error) {
        console.error(error)
    }
}
watchEffect(() => {
    // เมื่อ props.datapo เปลี่ยนแปลง ให้เรียกใช้ loadDataPo
    loadDataPo();
});
const skus = ref([]);

const loadSKU = async () => {
    try {
        const res = await dataApi.getSkuAttribute();
        skus.value = [
            { id: null, sku_code: "ไม่มีข้อมูล (เพิ่มรายการ SKU)" },
            ...res.data.data,
        ];
    } catch (error) {
        console.error(error)
    }

};
onMounted(() => {
    loadDataPo();
    loadSKU()
})
const emit = defineEmits(["value-updated"]);
const emitStepData = () => {
    emit('value-updated', false);
};
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

//*********** VALIDATETION ****************
const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        received_date: zod.date({
            required_error: requireValue,
            invalid_type_error: "กรุณาเลือกวันที่",
        }),
        po_note: zod.string().nonempty(requireValue).default(""),
    })
);
const { handleSubmit, errors } = useForm({
    validationSchema,
});

//*********** CONST VARIABLE FORM ****************
const { value: received_date } = useField("received_date");
const { value: po_note } = useField("po_note");

// **************** UPDATE QTY ON TABLE ********************
const updateQty = async (id, qty, sku_id, expired_date) => {

    try {
        if (expired_date) {
            expired_date = format(new Date(expired_date), "yyyy-MM-dd");
        }
        const dataobj = { qty: qty, sku_id: sku_id, expired_date: expired_date };
        const res = await dataApi.updatepoitem(id, dataobj);
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

// *******************SUBMIT*****************
const onSubmit = handleSubmit(async (values) => {
    try {
        const rs = await dataApi.approvedconfirm(route.params.id, {
            received_date: format(new Date(values.received_date), "yyyy-MM-dd"),
            po_note: values.po_note,
        });
        emitStepData();
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: rs.data.message,
        };

    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
});

const skuDialog = ref(false);
const checkAddNew = (id) => {
    console.log(id);
    if (id == null) {
        skuDialog.value = true;
    }
};

//! /////// [validation] /////////
const validationSchema2 = toTypedSchema(
    zod.object({
        sku_attribute_name: zod.string().nonempty(requireValue).default(""),
        sku_attribute_value: zod.string().nonempty(requireValue).default(""),
        sku_description: zod.string().nonempty(requireValue).default(""),
        sku_code: zod.string().nonempty(requireValue).default(""),
        sku_barcode: zod.string().nonempty(requireValue).default(""),
    })
);

const { handleSubmit: handleSubmit2, errors: errors2 } = useForm({
    validationSchema: validationSchema2,
});

const { value: sku_attribute_name } = useField("sku_attribute_name");
const { value: sku_attribute_value } = useField("sku_attribute_value");
const { value: sku_description } = useField("sku_description");
const { value: sku_code } = useField("sku_code");
const { value: sku_barcode } = useField("sku_barcode");

const onSubmit2 = handleSubmit2((values) => saveSkuattribute(values));


const saveSkuattribute = async (value) => {
    try {
        const rs = await dataApi.saveSkuattribute(value);
        loadSKU();
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: rs.data.message,
        };
        skuDialog.value = false;
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
};
</script>
  