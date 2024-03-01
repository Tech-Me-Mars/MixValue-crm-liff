<script setup>
import { useI18n } from "vue-i18n";
import * as dataApi from "./api/data.js";

import { format } from "date-fns";
import { th } from "date-fns/locale";

const { t } = useI18n();
const localPath = useLocalePath();

const resPoints = ref();
const loadReceipt = async () => {
  const res = await dataApi.getDataLog();
  resPoints.value = res.data.data;
};

onMounted(() => {
  loadReceipt();
});
</script>

<template>
  <DataView
    :value="resPoints"
    class="p-4"
    :pt="{
      content: { class: 'bg-transparent' },
    }"
  >
    <template #empty>
      <div class="flex flex-col justify-center items-center">
        <p class="mdi mdi-receipt-text-remove-outline mb-1 text-green-600"></p>
        <p>{{ $t("ไม่พบประวัติการใช้แต้ม") }}</p>
      </div>
    </template>
    <template #list="slotProps">
      <div class="flex flex-wrap">
        <div
          v-for="(item, index) in slotProps.items"
          :key="index"
          class="w-full"
        >
          <div
            class="flex justify-between font-bold text-lg py-2 border-b-2 border-lime-600"
          >
            <div>
              <p class="">{{ $t("ได้รับแต้ม") }}</p>
              <TmmTypographyLabelForm
                :label="
                  format(new Date(item.created_at), 'dd MMM yyyy, HH:mm', {
                    locale: th,
                  })
                "
                className="mb-3 text-sm"
              />
            </div>
            <span class="text-green-500"
              >{{ item.point }} {{ $t("แต้ม") }}</span
            >
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
