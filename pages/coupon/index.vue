<template>
  <div class="bg-cover min-h-screen bg-white">
    <!-- Header -->
    <NuxtLink :to="localPath('/main_menu')">
      <HeaderMenu class="mb-5 !bg-lime-700" >
        <div class="flex justify-between items-center w-full">
          <p class="text-2xl text-white mx-auto">{{ $t("คูปอง") }}</p>
          <span class="mdi mdi-chevron-left text-white self-end" style="font-size: 25px"></span>
        </div>
      </HeaderMenu>
    </NuxtLink>
    <!--End Header -->

    <!-- แสดงคูปอง -->
    <PageCouponList_Coupon />
    <!-- จบแสดงคูปอง -->
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();
</script>
