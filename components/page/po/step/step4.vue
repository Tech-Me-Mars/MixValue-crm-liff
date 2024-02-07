
<template>
    <div class="">
        <Form @submit="sendsubmit" class="">
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
                <div class="flex align-center">
                    <TmmTypographyLabelForm class="w-[10rem]" label="วันที่นัดส่งสินค้า" />
                    <TmmInputCalendar class="w-[10rem]" v-model="poDateDelivery" />
                </div>
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
                            <Column footer="รวมทั้งหมด:" :colspan="5" footerStyle="text-align:right" />
                            <Column :footer="formatCurrency(resPodata.po_total_amount)" />
                        </Row>
                    </ColumnGroup>
                </DataTable>
            </div>
            <div class="flex justify-end flex-wrap gap-2">
                <TmmButton v-if="isReceived" label="ยืนยันวันนัดส่งสินค้า" type="submit" disabled :loading="isloadingAxi"
                    severity="primary" />
                <TmmButton v-else label="อัพเดทวันนัดส่งสินค้า" class="" :loading="isloadingAxi" type="submit"
                    severity="success" />
                <TmmButtonNext @click="poStepActive = 4" />
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
const poDateDelivery = ref(new Date());
const isReceived = ref(false);

const resPoItem = ref();
const resPodata = ref({});
const isApproved = ref(false);
const loadDataPo = async () => {
    try {

        if (Object.keys(dataPo).length) { //รอให้มีข้อมูล
            console.log('has data',dataPo.value)
            if (dataPo.value.po_date_booking_delivery != null && dataPo.value.po_date_booking_delivery != undefined && dataPo.value.po_date_booking_delivery != '') {
                poDateDelivery.value = new Date(dataPo.value.po_date_booking_delivery)
            }
            resPoItem.value = dataPo.value.supplierProduct;
            resPodata.value = dataPo.value;
            isApproved.value = await dataPo.value.aprroved.status_approved;
            console.log(dataPo.value.aprroved.status_approved)
            isReceived.value = dataPo.value.status_recevie.status_recevie;
        }

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
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});


const sendsubmit = async () => {
    // ******** CONVERT FORMAT DATE *****************
    poDateDelivery.value = format(new Date(poDateDelivery.value), "yyyy-MM-dd");
    const data = { po_date_booking_delivery: poDateDelivery.value };
    try {
        const res = await dataApi.poBooking(route.params.id, data);
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
  