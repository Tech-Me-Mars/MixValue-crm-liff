<template>
  <div class="bg-cover min-h-screen bg-white">
    <!-- Header -->
    <NuxtLink :to="localPath('/')">
      <HeaderMenu>
        <div class="flex justify-between items-center w-full">
          <p class="text-2xl text-white mx-auto">{{ $t("บัญชีของฉัน") }}</p>
          <span class="mdi mdi-chevron-left text-white self-end" style="font-size: 25px"></span>
        </div>
      </HeaderMenu>
    </NuxtLink>
    <!-- จบ Header -->

    <section class="p-4">
      <!-- แสดงข้อมูล เมนู -->
      <PageMainmenuListmenu />
      <!-- จบแสดงข้อมูล เมนู -->
    </section>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();


</script>
