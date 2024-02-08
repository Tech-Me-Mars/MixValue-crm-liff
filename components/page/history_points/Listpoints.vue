<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();

// ข้อมูล use point
const resPoints = ref([
  { point: 5, date: "09 ธ.ค 2566, 13:53" },
  { point: 5, date: "09 ธ.ค 2566, 13:53" },
  { point: 5, date: "09 ธ.ค 2566, 13:53" },
  { point: 5, date: "09 ธ.ค 2566, 13:53" },
  { point: 5, date: "09 ธ.ค 2566, 13:53" },
  { point: 5, date: "09 ธ.ค 2566, 13:53" },
  { point: 5, date: "09 ธ.ค 2566, 13:53" },
]);
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
                :label="item.date"
                className="mb-3 text-sm"
              />
            </div>
            <span class="text-green-500">{{ item.point }} {{ $t("แต้ม") }}</span>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>


