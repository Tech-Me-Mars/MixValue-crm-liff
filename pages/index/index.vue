<template>
    <div class="bg-[url('/image/background/bgpos.jpg')]">
        <!-- Header -->
        <HeaderMenu>
            <NuxtLink :to="localPath('/main_menu')" class="flex flex-wrap justify-between items-center w-full">
                <div class="flex flex-wrap">
                    <TmmAvatar src="https://cdn-icons-png.flaticon.com/512/219/219988.png" size="md" rounded class="mr-5" />
                    <div class="font-bold">
                        <p class="text-lg text-white">ประยุทธ์ จันโอชา</p>
                        <p class="text-slate-200 text-md">บัญชีของฉัน</p>
                    </div>
                </div>
                <span class="mdi mdi-reorder-horizontal text-white" style="font-size: 25px;"></span>
            </NuxtLink>
        </HeaderMenu>
        <!-- จบ Header -->

        <!-- สไลค์โฆษณา -->
        <PageIndexSwiper />
        <!-- จบสไลค์โฆษณา -->

        <!-- การ์ดสมาชิก -->
        <PageIndexCardmember />
        <!-- จบการ์ดสมาชิก -->

        <!-- พ้อยคงเหลือ -->
        <PageIndexPoint_remaining />
        <!-- จบพ้อยคงเหลือ -->

    </div>
</template>
<script setup>
const localPath = useLocalePath();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
