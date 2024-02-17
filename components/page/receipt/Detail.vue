<script setup>
import { useI18n } from "vue-i18n";
import { formatCurrency } from "@/helpers/utility";
const { t } = useI18n();
const localPath = useLocalePath();
</script>

<template>
  <div class="p-4">
    <div class="text-green-500 font-bold text-xl mb-1">ข้อมูลทั่วไป</div>
    <div class="text-gray-700 font-bold mb-2">สาขาที่00029 อู่ทอง</div>
    <div class="text-gray-500 text-sm mb-1">10 ก.พ. 2567, 11:25</div>
    <div class="text-gray-500 text-sm mb-1">
      {{ $t("เลขที่บิล") }} : S24020020001-004058
    </div>

    <div class="text-green-500 font-bold text-xl mb-2 mt-5">รายการสินค้า</div>

    <div class="flex w-full mb-2">
      <div class="text-gray-900 text-sm w-5">1</div>
      <div class="text-gray-900 text-sm w-auto">ไวตามิ้ลค์ออริจินัล300mlx6</div>
      <div class="text-gray-900 text-sm w-15 ml-auto mr-5">348.00</div>
      <div class="text-gray-900 text-sm w-15">348.00v</div>
    </div>
    <div class="flex w-full mb-2">
      <div class="text-gray-900 text-sm w-5">1</div>
      <div class="text-gray-900 text-sm w-auto">ไวตามิ้ลค์ออริจินัล300mlx6</div>
      <div class="text-gray-900 text-sm w-15 ml-auto mr-5">348.00</div>
      <div class="text-gray-900 text-sm w-15">348.00v</div>
    </div>
    <div class="flex w-full mb-2">
      <div class="text-gray-900 text-sm w-5">1</div>
      <div class="text-gray-900 text-sm w-auto">ไวตามิ้ลค์ออริจินัล300mlx6</div>
      <div class="text-gray-900 text-sm w-15 ml-auto mr-5">348.00</div>
      <div class="text-gray-900 text-sm w-15">348.00v</div>
    </div>
    <div class="flex w-full mb-2">
      <div class="text-gray-900 text-sm w-5">1</div>
      <div class="text-gray-900 text-sm w-auto">ไวตามิ้ลค์ออริจินัล300mlx6</div>
      <div class="text-gray-900 text-sm w-15 ml-auto mr-5">348.00</div>
      <div class="text-gray-900 text-sm w-15">348.00v</div>
    </div>
    <div class="flex w-full mb-2">
      <div class="text-gray-900 text-sm w-5">1</div>
      <div class="text-gray-900 text-sm w-auto">ไวตามิ้ลค์ออริจินัล300mlx6</div>
      <div class="text-gray-900 text-sm w-15 ml-auto mr-5">348.00</div>
      <div class="text-gray-900 text-sm w-15">348.00v</div>
    </div>
    <div class="flex w-full mb-2">
      <div class="text-gray-900 text-sm w-5">1</div>
      <div class="text-gray-900 text-sm w-auto">ไวตามิ้ลค์ออริจินัล300mlx6</div>
      <div class="text-gray-900 text-sm w-15 ml-auto mr-5">348.00</div>
      <div class="text-gray-900 text-sm w-15">348.00v</div>
    </div>

    <div class="border-lime-600 border-b-2"></div>
    <div class="p-4">
      <div class="flex justify-between mb-2">
        <div class="text-gray-900 text-xl font-bold">ส่วนลดรวม</div>
        <div class="text-green-600 font-bold text-xl">60.00 บาท</div>
      </div>
      <div class="flex justify-between mb-2">
        <div class="text-gray-900 text-xl font-bold">ยอดรวม</div>
        <div class="text-green-600 font-bold text-xl">417.00 บาท</div>
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
