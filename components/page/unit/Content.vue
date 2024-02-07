<template>
  <div>
    <div class=" flex justify-between">
            <TmmTypographyHeaderPage headerMenu="หน่วยนับ" />
            <div>
                <TmmButtonAddNew label="เพิ่มหน่วยนับ" :loading="loadingBtn" @click="openNew()" />
            </div>
        </div>
    <div class="">
      <DataTable stripedRows ref="dt" v-model:filters="filters" :value="resUnits" paginator :rows="10"
        filterDisplay="menu" size="small"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
        currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ"
        :exportFilename="`ข้อมูลหน่วยนับ${format(new Date(), 'ddMMyyyyHHmmss')}`"
        :globalFilterFields="['indexkey', 'unit_name','status']">
        <template #header>
          <div class="flex flex-wrap justify-between align-items-center">
            <div class="flex gap-2">
              <TmmButtonClearFilter @click="clearFilter()" />
              <TmmInputSearchGlobal v-model="filters['global'].value" />
            </div>
            <TmmButtonExport @export-csv="exportCSV" />
          </div>
        </template>
        <template #empty> No data found. </template>
        <Column field="indexkey" header="#" sortable style="min-width: 3rem">
          <template #sorticon="slotProps">
            <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
          </template>
          <template #filter="{ filterModel }">
            <TmmInput v-model="filterModel.value"  placeholder="Search..." />
          </template>
          <template #body="{ data }">
            {{ data.indexkey }}
          </template>
        </Column>
        <Column field="unit_name" header="ชื่อหน่วยนับ" sortable style="min-width: 10rem">
          <template #sorticon="slotProps">
            <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
          </template>
          <template #filter="{ filterModel }">
            <TmmInput v-model="filterModel.value"  placeholder="Search..." />
          </template>
        </Column>
        <Column field="status" header="สถานะ" sortable style="min-width: 10rem">
          <template #sorticon="slotProps">
            <TmmTableSortIcon :sortOrder="slotProps.sortOrder" />
          </template>
          <template #filter="{ filterModel }">
            <TmmTableSearchcolumnInputtext v-model="filterModel.value" />
          </template>
          <template #body="{data}">
          <TmmBadgeStatusOpen v-if="data.status == 'เปิด'" />
          <TmmBadgeStatusDisable v-if="data.status == 'ปิด'" />
          </template>
        </Column>
        <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
          <template #body="{ data }">
            <div class="flex">
              <TmmButtonEdit :loading="loadingBtn" @click="editRow(data)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

  </div>
  <Dialog v-model:visible="showDialog" maximizable header="รายละเอียดหน่วยนับ" :modal="true" class="p-fluid"
      :style="{ width: '600px' }">
      <hr class="mb-3" />
      <Form @submit="onSubmit">
        <div class="grid grid-cols-1">
          <div class="col-span-1">
            <TmmTypographyLabelForm label="ชื่อหน่วยนับ" />
            <TmmInput v-model="unit_name"  placeholder="ชื่อหน่วยนับ" />
            <TmmTypographyTextValidator v-if="errors.unit_name" :errors="errors.unit_name" />
          </div>

          <div class="">
            <TmmTypographyLabelForm label="สถานะการใช้งาน" />
            <TmmInputRadioOnOff v-model="status" />
            <TmmTypographyTextValidator v-if="errors.status" :errors="errors.status" />
          </div>
        </div>
        <hr class="my-3" />
        <div class="flex justify-between gap-1">
          <TmmButtonDelete v-if="isEdit == true" @click="confirmDelete()" :loading="loadingBtn" />
          <div v-else></div>
          <div class="flex  gap-1">
            <TmmButtonCancel @click="handleReset" :loading="loadingBtn" />
            <TmmButtonSave :loading="loadingBtn" />
          </div>
        </div>
      </Form>
    </Dialog>
  <TmmDialogConfirmDelete ref="conFirmation" />
  <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { format } from "date-fns";
import * as dataApi from "./api/data.js";
//! /////// [validation import] /////////
import { useField, useForm, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const breadcrumbItems = [{ label: "หน่วยนับ", to: "/modules/manage_data/unit" }];
// ************* [ LOADING BTN ]
const loadingBtn = ref(false);

const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({})

const dt = ref(/* your datatable initialization */);

const exportCSV = () => {
  dt.value.exportCSV();
};
const filters = ref()
const advanceFilter = {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    }
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    indexkey: advanceFilter,
    unit_name: advanceFilter,
    status:advanceFilter
  }
}
initFilters()
const clearFilter = () => {
  initFilters()
}

const resUnits = ref();
const loadUnit = async () => {
  loadingBtn.value = true;
  try {
  const res = await dataApi.getUnitAll();
  resUnits.value = res.data.data;
  resUnits.value = resUnits.value.map((e, i) => ({ ...e, indexkey: i + 1,  status: Math.round(Math.random()) === 1 ? "เปิด" : "ปิด"}));
} catch (error) {
    loadingBtn.value = false
    console.error(error)
  }
  loadingBtn.value = false
};
onMounted(() => {
  loadUnit();
});

// *************  [[ OJECT SCHEMA VALIDATION ]] ***************
const requireValue = "กรุณาระบุข้อมูล";
// *************  VARIDATOR
const validationSchema = toTypedSchema(
  zod.object({
    unit_name: zod.string().nonempty(requireValue).default(""),
  })
);
const { handleSubmit, handleReset, errors } = useForm({
  validationSchema,
});
// *************  VARIABLE SCHEMA
const { value: editObj } = useField('editObj', null, {
  initialValue: null // กำหนดค่าเริ่มต้นที่นี่
})
const { value: isEdit } = useField('isEdit', null, {
  initialValue: false // กำหนดค่าเริ่มต้นที่นี่
})
const { value: showDialog } = useField('showDialog', null, {
  initialValue: false
})
const { value: unit_name } = useField("unit_name");
// *************  [[ END OJECT SCHEMA VALIDATION ]] ***************
const openNew = () => {
  handleReset();
  showDialog.value = true;
};
const onSubmit = handleSubmit((values) => {
  saveData(values);
});
const saveData = async () => {
  loadingBtn.value = true;
  try {
    const payload = {
      unit_name: unit_name.value
    }
    const res = editObj.value ? await dataApi.updateUnit(editObj.value.id, payload) : await dataApi.saveUnit(payload);
    handleReset()
    loadUnit();
    errorAlert.value = false; //[ต้องวางติดบรรทัด alertToast เท่านั้น]
    alertToast.value = {
      severity: "success",
      summary: "ทำรายการสำเร็จ",
      detail: res.data.message,
    };
  } catch (error) {
    loadingBtn.value = false;
    errorAlert.value = true;
    dataError.value = error;
    console.error(error)
  } //END CATCH
  loadingBtn.value = false;
}

const editRow = (data) => {
  handleReset();
  isEdit.value = true;
  showDialog.value = true;
  editObj.value = data
  loadDatatoForm();
}
const loadDatatoForm = async () => {
  loadingBtn.value = true;
  try {
    const res = await dataApi.getUnitById(editObj.value.id)
    unit_name.value = res.data.data.unit_name;
  } catch (error) {
    loadingBtn.value = false;
    errorAlert.value = true;
    dataError.value = error;
    console.error(error)
  }
  loadingBtn.value = false;
};

// ******CONFIRM COMPONENT************
const conFirmation = ref(null); //ตัวพร็อพค่าลงไปในคอมโพเนนซ์
const confirmDelete = () => {
  const proCessConfirm = {
    // ส่งชื่อที่จะไปแสดง
    message: editObj.value.unit_name,
    accept: () => {
      // เรียกฟังชั่นลบ แล้วส่งID ไป
      deleteData();
    },
  };
  if (conFirmation.value) {
    conFirmation.value.openDialog(proCessConfirm);
  }
};

const deleteData = async () => {
  loadingBtn.value = true;
  try {
    const res = await dataApi.deleteData(editObj.value.id);
    handleReset()
    loadUnit();
    errorAlert.value = false; //[ต้องวางติดบรรทัด alertToast เท่านั้น]
    alertToast.value = {
      severity: "success",
      summary: "ทำรายการสำเร็จ",
      detail: res.data.message,
    };
  } catch (error) {
    loadingBtn.value = false;
    errorAlert.value = true;
    dataError.value = error;
    console.error(error)
  } //END CATCH
  loadingBtn.value = false;
}
</script>