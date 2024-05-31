<template>
    <div class="bg-[url('/image/background/bgpos.jpg')]">
        <!-- Header -->
        <HeaderMenu>
            <NuxtLink :to="('/main_menu')" class="flex flex-wrap justify-between items-center w-full">
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
        <!-- <PageIndexSwiper /> -->
        <div>
            <Swiper v-if="resSlider.length > 0" class="mb-4" :modules="[SwiperAutoplay, SwiperEffectCreative]"
                :slides-per-view="1" :loop="true" :effect="'creative'" :autoplay="{
                    delay: 6000,
                    disableOnInteraction: true,
                }" :creative-effect="{
                    prev: {
                        shadow: false,
                        translate: ['-20%', 0, -1],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }">
                <SwiperSlide v-for="(item, index) in resSlider" :key="index">
                    <img :src="`${item.image}`" />
                </SwiperSlide>
            </Swiper>
        </div>
        <!-- จบสไลค์โฆษณา -->

        <!-- การ์ดสมาชิก -->
        <!-- <PageIndexCardmember :cardMemberData="resCardMember" /> -->
        <div class="mb-8">
            <div v-if="firstBox"
                class="relative m-auto h-48 w-80 rounded-xl bg-white text-dark shadow-2xl transition-transform sm:h-56 sm:w-96 sm:hover:scale-110">
                <div class="absolute top-4 w-full px-4 ">
                    <div class="flex justify-between items-center">
                        <img class="h-14 w-14 object-contain" src="/logo/LOGO_MIX_STATION.png" />
                        <div class="flex items-center gap-2">
                            <img src="/image/icon/mastercard.png" class="" style="width: 2.5rem;" alt="barcode">
                            <img src="/image/icon/paypal.png" class="" style="width: 2.5rem;" alt="barcode">
                        </div>
                    </div>
                    <div class="pt-1">
                        <p class="font-light">
                        </p>
                    </div>
                </div>
                <div class="absolute bottom-0 w-full text-start pb-2 px-3">
                    <p class="font-light " style="font-size: 10px;">{{ ('ศูนย์บริการลูกค้า') }} Mixvalue</p>
                </div>
                <TmmButtonScan severity="danger" rounded
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10 " @click="swapBox" />
            </div>
            <div v-else
                class="relative m-auto h-48 w-80 rounded-xl bg-white text-dark shadow-2xl transition-transform sm:h-56 sm:w-96 sm:hover:scale-110">
                <div class="absolute top-4 w-full px-4">
                    <div class="flex justify-center mb-2">
                        <span class="p-buttonset">
                            <TmmButton v-for="(item, index) in backCard" :key='index' :label="item.label"
                                severity="danger" class="" size="small" :outlined="!item.active"
                                @click="activeBtnCard(item.id)" />
                        </span>
                    </div>
                    <div class="flex justify-center items-center h-[5rem]">
                        <img :src="`data:image/png;base64,${resCardMember?.barcode}`" class="object-contain pt-4"
                            style="width: 9rem;" alt="barcode" v-if="activeStepCard == 1">
                        <img :src="`data:image/png;base64,${resCardMember?.qrcode}`" class="object-contain pt-4"
                            style="width: 5rem;" alt="qrcode" v-if="activeStepCard == 2">
                        <span class="pt-8 text-2xl font-bold" v-if="activeStepCard == 3">{{ resCardMember?.card_id
                            }}</span>
                    </div>
                </div>
                <TmmButtonScan severity="danger" rounded
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10 " @click="swapBox" />
            </div>
        </div>
        <!-- จบการ์ดสมาชิก -->

        <!-- พ้อยคงเหลือ -->
        <!-- <PageIndexPoint_remaining :cardMemberData="resCardMember" /> -->
        <div class="text-center bg-white pt-2">
            <TmmTypographyLabelForm :label="('แต้มสะสมคงเหลือ')" className="mb-3 text-2xl font-bold" />
            <p class="mb-3 text-lime-700 text-2xl font-bold">
                {{ resCardMember?.point }}
            </p>
            <p class="text-semibold text-sm text-red-600 mb-3 font-bold">
                <span class="text-green-700">{{ resCardMember?.point_expire_date }} แต้ม </span>{{ ("จะหมดอายุใน") }}
                {{ resCardMember?.point_expire_date }}
            </p>
            <TmmButton :label="('ดูประวัติการใช้แต้ม')" rounded outlined severity="success"
                class="bg-green-600 text-white mb-3" />
            <div class="flex flex-wrap gap-4 justify-center">
                <div>
                    <NuxtLink :to="('/coupon')">
                        <TmmButton icon="mdi mdi-ticket-percent" severity="success" class="h-10 w-10 bg-emerald-600" />
                    </NuxtLink>
                    <div>
                        <TmmTypographyLabelForm :label="('คูปองของฉัน')" className="text-xs" />
                    </div>
                </div>
                <div>
                    <TmmButton icon="mdi mdi-ticket-percent" severity="success" className="h-10 w-10 bg-emerald-600" />
                    <div>
                        <TmmTypographyLabelForm :label="('ใบเสร็จ(E-Tax)')" className="text-xs" />
                    </div>
                </div>
            </div>
        </div>
        <!-- จบพ้อยคงเหลือ -->

    </div>
</template>
<script setup>

import { useI18n } from 'vue-i18n';

import * as dataApi from "./api/data.js";

const resCardMember = ref({ card_id: null, barcode: null, qrcode: null, point: 0, point_expire_date: null });
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
        console.log('โชวโปรไฟล์', profile.value)
    } catch (error) {
        console.error(error)
    }
}
onMounted(() => {
    loadDataProfile()
    loadSlider()
})
// definePageMeta({ middleware: ["isregister"], });


//################## swiper Slider ###########

const resSlider = ref([])
const loadSlider = async () => {
    try {
        const res = await dataApi.getSlider()
        resSlider.value = res.data.data;
    } catch (error) {
        console.error(error)
    }
}

//######### Card Memeber ############
const activeStepCard = ref(1)
// ฟังชั่น Active ด้านหลังการ์ด
const activeBtnCard = (id) => {
    backCard.value = backCard.value.map(card => ({
        ...card,
        active: card.id === id ? true : false
    }));
    activeStepCard.value = id;
}

// *********** [ ข้อมูลหลังบัตร ]
const backCard = ref([
    { id: 1, label: ('บาร์โค้ด'), active: true },
    { id: 2, label: ('คิวอาร์'), active: false },
    { id: 3, label: ('รหัส'), active: false },
])
// *********** [ จบสลับหลัง-หน้าบัตร ]

// ฟังชั่นกดสลับการ์ดหน้า-หลัง
const firstBox = ref(true)
const swapBox = () => {
    firstBox.value = !firstBox.value
}
</script>

<style scoped>
.swiper {
    width: 100%;
    height: 100%;
}
</style>