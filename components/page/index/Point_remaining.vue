<script setup>
const localPath = useLocalePath();
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  cardMemberData: {
    type: Object, // ระบุชนิดของ prop
    required: true, // ระบุว่า prop นี้จำเป็นต้องมี
  },
});
</script>
<template>
  <div class="text-center bg-white pt-2">
    <TmmTypographyLabelForm
      :label="$t('แต้มสะสมคงเหลือ')"
      className="mb-3 text-2xl font-bold"
    />
    <p class="mb-3 text-lime-700 text-2xl font-bold">
      {{ cardMemberData.point }}
    </p>
    <p class="text-semibold text-sm text-red-600 mb-3 font-bold">
      <span class="text-green-700"
        >{{ cardMemberData.point_expire_date }} แต้ม </span
      >{{ $t("จะหมดอายุใน") }} {{ cardMemberData.point_expire_date }}
    </p>
    <TmmButton
      :label="$t('ดูประวัติการใช้แต้ม')"
      rounded
      outlined
      severity="success"
      class="bg-green-600 text-white mb-3"
    />
    <div class="flex flex-wrap gap-4 justify-center">
      <div>
        <NuxtLink :to="localPath('/coupon')">
          <TmmButton
            icon="mdi mdi-ticket-percent"
            severity="success"
            class="h-10 w-10 bg-emerald-600"
          />
        </NuxtLink>
        <div>
          <TmmTypographyLabelForm
            :label="$t('คูปองของฉัน')"
            className="text-xs"
          />
        </div>
      </div>
      <div>
        <TmmButton
          icon="mdi mdi-ticket-percent"
          severity="success"
          className="h-10 w-10 bg-emerald-600"
        />
        <div>
          <TmmTypographyLabelForm
            :label="$t('ใบเสร็จ(E-Tax)')"
            className="text-xs"
          />
        </div>
      </div>
    </div>
  </div>
</template>
