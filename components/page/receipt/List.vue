<script setup>
import { useI18n } from "vue-i18n";
import { formatCurrency } from "@/helpers/utility";
import * as dataApi from "./api/data.js";
const { t } = useI18n();
const localPath = useLocalePath();

const resItems = ref();
const loadReceipt = async () => {
  const res = await dataApi.getETax();
  resItems.value = res.data.data;
};

onMounted(() => {
  loadReceipt();
});
</script>

<template>
  <DataView
    :value="resItems"
    class="p-4"
    :pt="{
      content: { class: 'bg-transparent' },
    }"
  >
    <template #empty>
      <div class="flex flex-col justify-center items-center">
        <p class="mdi mdi-receipt-text-remove-outline mb-1 text-green-600"></p>
        <p>{{ $t("ไม่พบประวัติใบเสร็จ") }}</p>
      </div>
    </template>
    <template #list="slotProps">
      <div class="flex flex-wrap">
        <div
          v-for="(item, index) in slotProps.items"
          :key="index"
          class="w-full"
        >
          <div class="border-bottom-1 border-green-600 py-2">
            <div class="flex justify-between font-bold text-lg">
              <div>
                <p class="">{{ $t("ซื้อสินค้า") }}</p>
                <TmmTypographyLabelForm
                  :label="item.sale_date"
                  className="font-normal text-sm"
                />
              </div>
              <div class="text-green-500 text-right">
                <div>
                  {{ formatCurrency(item.total_amount) }} {{ $t("บาท") }}
                </div>
                <TmmButtonExpand
                  class="m-0 p-0"
                  @click="item.visible = !item.visible"
                  :icon="
                    item.visible == true
                      ? 'mdi mdi-chevron-up'
                      : 'mdi mdi-chevron-down'
                  "
                />
              </div>
            </div>

            <div
              v-if="item.visible == true"
              class="flex justify-between font-bold text-lg w-full"
            >
              <div class="w-full">
                <div class="font-normal text-600 text-sm mb-2">
                  {{ $t("สาขา: ") + item.branch_name }}
                </div>
                <div class="font-normal text-600 text-sm mb-4">
                  {{ $t("เลขที่บิล: ") + item.sale_number }}
                </div>
                <div class="mb-2 text-right w-full">
                  <NuxtLink :to="`/receipt/${item.id}`">
                    <TmmButtonDetail />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
