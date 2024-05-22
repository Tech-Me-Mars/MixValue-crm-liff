<template>
  <div
    class="bg-cover min-h-screen bg-[url('https://www.cupsfrozenyogurt.com/content/uploads/2017/10/cups-bubble-bg-white-purple-subtle.jpg')]">

    <!-- Header -->
    <NuxtLink :to="localPath('/main_menu')">
      <HeaderMenu class="mb-5">
        <div class="flex justify-between items-center w-full">
          <p class="text-2xl text-white mx-auto">
            {{ $t("ประวัติการใช้แต้ม") }}
          </p>
          <span class="mdi mdi-chevron-left text-white self-end" style="font-size: 25px"></span>
        </div>
      </HeaderMenu>
    </NuxtLink>
    <!-- จบ Header -->

    <!-- ลิสการใช้แค้ม -->
    <!-- <PageHistory_pointsListpoints /> -->
    <DataView :value="resPoints" class="p-4" :pt="{
      content: { class: 'bg-transparent' },
    }">
      <template #empty>
        <div class="flex flex-col justify-center items-center">
          <p class="mdi mdi-receipt-text-remove-outline mb-1 text-green-600"></p>
          <p>{{ $t("ไม่พบประวัติการใช้แต้ม") }}</p>
        </div>
      </template>
      <template #list="slotProps">
        <div class="flex flex-wrap">
          <div v-for="(item, index) in slotProps.items" :key="index" class="w-full">
            <div class="flex justify-between font-bold text-lg py-2 border-b-2 border-lime-600">
              <div>
                <p class="">{{ $t("ได้รับแต้ม") }}</p>
                <TmmTypographyLabelForm :label="format(new Date(item.created_at), 'dd MMM yyyy, HH:mm', {
                  locale: th,
                })
                  " className="mb-3 text-sm" />
              </div>
              <span class="text-green-500">{{ item.point }} {{ $t("แต้ม") }}</span>
            </div>
          </div>
        </div>
      </template>
    </DataView>
    <!-- ลิสการใช้แค้ม -->
  </div>
</template>

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
