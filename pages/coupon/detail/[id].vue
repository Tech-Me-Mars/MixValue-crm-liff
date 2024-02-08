<template>
  <div class="bg-cover min-h-screen bg-white">
    <NuxtLink :to="localPath('/coupon')">
      <HeaderMenu class="" style="background-color: rgba(36, 158, 5, 0.904)">
        <div class="flex justify-between items-center w-full">
          <p class="text-2xl text-white mx-auto">{{ $t("รายละเอียดคูปอง") }}</p>
          <span class="mdi mdi-chevron-left text-white self-end" style="font-size: 25px"></span>
        </div>
      </HeaderMenu>
    </NuxtLink>
    <PageCouponDetailImage />
    <section class="px-10">
      <PageCouponDetailCoupondetail />
      <PageCouponDetailBarcodescan />
    </section>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();
</script>
