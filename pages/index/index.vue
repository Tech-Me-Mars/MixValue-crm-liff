<template>
    <div class="bg-[url('/image/background/bgpos.jpg')]">
        <!-- Header -->
        <HeaderMenu>
            <NuxtLink :to="localPath('/main_menu')" class="flex flex-wrap justify-between items-center w-full">
                <div class="flex flex-wrap">
                    <TmmAvatar v-if="profile && profile.pictureUrl" :src="profile.pictureUrl ? profile.pictureUrl : ''"
                        size="md" rounded class="mr-5" />
                    <div class="font-bold">
                        <p v-if="profile" class="text-lg text-white">{{ profile?.displayName }}</p>
                        <!-- <p class="text-slate-200 text-md">บัญชีของฉัน</p> -->
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
        <PageIndexCardmember :cardMemberData="resCardMember"/>
        <!-- จบการ์ดสมาชิก -->

        <!-- พ้อยคงเหลือ -->
        <PageIndexPoint_remaining :cardMemberData="resCardMember" />
        <!-- จบพ้อยคงเหลือ -->
        
    </div>
</template>
<script setup>
const localPath = useLocalePath();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import * as dataApi from "./api/data.js";

const resCardMember = ref({card_id:null,barcode:null,qrcode:null,point:0,point_expire_date:null});
const loadCardMember = async () => {
    try {
        const res = await dataApi.getCardMember();
        resCardMember.value = res.data.data;
    } catch (error) {
        console.error(error)
    }
}
onMounted(() => loadCardMember())

const profile = ref({ displayName: null, userId: null, pictureUrl: '' })
const loadDataProfile = async () => {
    try {
        profile.value = JSON.parse(localStorage.getItem("profile"));
        console.log('โชวโปรไฟล์',profile.value)
    } catch (error) {
        console.error(error)
    }
}
onMounted(() => {
    loadDataProfile()
})
// definePageMeta({ middleware: ["isregister"], });
</script>
