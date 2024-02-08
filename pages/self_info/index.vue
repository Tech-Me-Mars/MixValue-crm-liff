<template>
  <div
    class="bg-cover min-h-screen bg-[url('https://www.cupsfrozenyogurt.com/content/uploads/2017/10/cups-bubble-bg-white-purple-subtle.jpg')]"
  >
    <!-- header -->
    <NuxtLink :to="localPath('/main_menu')">
      <HeaderMenu>
        <div class="flex justify-between items-center w-full">
          <p class="text-2xl text-white mx-auto">{{ $t("แก้ไขข้อมูลส่วนตัว") }}</p>
          <span class="mdi mdi-chevron-left text-white self-end" style="font-size: 25px"></span>
        </div>
      </HeaderMenu>
    </NuxtLink>
    <!-- end header -->
    <PageSelf_infoForm />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();
</script>
