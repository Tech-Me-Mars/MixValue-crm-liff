<script setup>
import { useI18n } from "vue-i18n";
import { formatCurrency } from "@/helpers/utility";
import * as dataApi from "./api/data.js";
import { format } from "date-fns";
import { th } from "date-fns/locale";

const { t } = useI18n();
const localPath = useLocalePath();
const route = useRoute();

const saleDate = ref();
const resItems = ref();
const loadReceipt = async (id) => {
  const res = await dataApi.getETaxById(id);
  resItems.value = res.data.data;
  console.log(resItems.value);
  saleDate.value = format(
    new Date(resItems.value.sale_date),
    "dd MMM yyyy, HH:mm",
    {
      locale: th,
    }
  );
};

onMounted(() => {
  loadReceipt(route.params.id);
});
</script>

<template>
  <div class="p-4">
    <div class="text-green-500 font-bold text-xl mb-1">ข้อมูลทั่วไป</div>
    <div class="text-gray-700 font-bold mb-2">{{ resItems?.branch_name }}</div>
    <div class="text-gray-500 text-sm mb-1">
      {{ saleDate }}
    </div>
    <div class="text-gray-500 text-sm mb-1">
      {{ $t("เลขที่บิล") }} : {{ resItems?.sale_number }}
    </div>

    <div class="text-green-500 font-bold text-xl mb-2 mt-5">รายการสินค้า</div>

    <div
      class="flex w-full mb-2"
      v-for="(saleItem, saleIndex) in resItems?.sale_details"
    >
      <div class="text-gray-900 text-sm w-5">{{ ++saleIndex }}</div>
      <div class="text-gray-900 text-sm w-auto">
        {{ saleItem.supplier_product_name + "x" + saleItem.quantity }}
      </div>
      <div class="text-gray-900 text-sm w-15 ml-auto mr-5">
        {{ saleItem.unit_price }}
      </div>
      <div class="text-gray-900 text-sm w-15">{{ saleItem.total_price }}v</div>
    </div>

    <div class="border-lime-600 border-b-2"></div>
    <div class="p-4">
      <div class="flex justify-between mb-2">
        <div class="text-gray-900 text-xl font-bold">ส่วนลดรวม</div>
        <div class="text-green-600 font-bold text-xl">
          {{ resItems?.discount_amount }} บาท
        </div>
      </div>
      <div class="flex justify-between mb-2">
        <div class="text-gray-900 text-xl font-bold">ยอดรวม</div>
        <div class="text-green-600 font-bold text-xl">
          {{ resItems?.total_amount }} บาท
        </div>
      </div>

      <div class="m-2">
        <div
          class="flex align-middle border-gray-300 border-2 bg-gray-200 p-3 rounded-md"
        >
          <i
            class="mdi mdi-alert-circle-outline text-2xl mr-2 text-gray-500"
          ></i>
          <div class="mt-1 p-0">ไม่สามารถขอใบกำกับภาษีได้</div>
          <TmmButtonCondition
            class="ml-auto border-gray-300"
            :label="$t('ดูเงื่อนไข')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
