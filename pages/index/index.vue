<template>
    <div class="bg-[url('/image/background/bgpos.jpg')]">
        <HeaderMenu>
            <NuxtLink to="/main_menu" class="flex flex-wrap justify-between items-center w-full">
                <div class="flex flex-wrap">
                    <TmmAvatar src="https://cdn-icons-png.flaticon.com/512/219/219988.png" size="md" rounded class="mr-5" />
                    <div class="font-bold">
                        <p class="text-lg text-white">ประยุทธ์ จันโอชา</p>
                        <p class="text-slate-200 text-md">บัญชีของฉัน</p>
                    </div>
                </div>
                <span class="mdi mdi-menu-right text-white" style="font-size: 50px;"></span>

            </NuxtLink>
        </HeaderMenu>
        <Swiper class="mb-4" :modules="[SwiperAutoplay, SwiperEffectCreative]" :slides-per-view="1" :loop="true"
            :effect="'creative'" :autoplay="{
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
            <SwiperSlide v-for="(item, index) in slides" :key="index">
                <img :src="`${item}`" />
            </SwiperSlide>
        </Swiper>

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
                    <p class="font-light " style="font-size: 10px;">{{ $t('ศูนย์บริการลูกค้า') }} Mixvalue</p>
                </div>
                <TmmButtonScan severity="danger" rounded
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10 " @click="swapBox" />
            </div>
            <div v-else
                class="relative m-auto h-48 w-80 rounded-xl bg-white text-dark shadow-2xl transition-transform sm:h-56 sm:w-96 sm:hover:scale-110">
                <div class="absolute top-4 w-full px-4">
                    <div class="flex justify-center mb-2">
                        <span class="p-buttonset">
                            <TmmButton v-for="(item, index) in backCard " :key='index' :label="item.label" severity="danger"
                                class="" size="small" :outlined="!item.active" @click="activeBtnCard(item.id)" />
                        </span>
                    </div>
                    <div class="flex justify-center items-center ">
                        <img src="/barcode.png" class="object-contain pt-4" style="width: 9rem;" alt="barcode"
                            v-if="activeStepCard == 1">
                        <img src="/qr-code.png" class="object-contain pt-4" style="width: 5rem;" alt="barcode"
                            v-if="activeStepCard == 2">
                        <span class="pt-8 text-2xl" v-if="activeStepCard == 3">V0754193</span>
                    </div>
                </div>
                <p
                    class="italic text-gray-700 font-light text-xs text-center pt-1 absolute bottom-7 left-1/2 w-full transform -translate-x-1/2 z-10">
                    {{ $t('เชื่อมต่อไลน์เมื่อวันที่') }} 5 ก.พ. 2567
                </p>
                <TmmButtonScan severity="danger" rounded
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10 " @click="swapBox" />
            </div>
        </div>

        <div class="text-center bg-white pt-2">
            <TmmTypographyLabelForm :label="$t('แต้มสะสมคงเหลือ')" className="mb-3 text-2xl font-bold" />
            <p class="mb-3 text-lime-700 text-2xl font-bold">{{ myPoint }}</p>
            <p class="text-semibold text-sm text-red-600 mb-3 font-bold"><span class="text-green-700">{{ myPoint }} แต้ม
                </span>{{ $t('จะหมดอายุใน') }} 31 ธ.ค. 2567</p>
            <TmmButton :label="$t('ดูประวัติการใช้แต้ม')" rounded outlined severity="success"
                class="bg-green-600 text-white mb-3" />
            <div class="flex flex-wrap gap-4 justify-center">
                <div>
                    <TmmButton icon="mdi mdi-ticket-percent" severity="success" className="h-10 w-10 bg-emerald-600" />
                    <div>
                        <TmmTypographyLabelForm :label="$t('คูปองของฉัน')" className="text-xs" />
                    </div>
                </div>
                <div>
                    <TmmButton icon="mdi mdi-ticket-percent" severity="success" className="h-10 w-10 bg-emerald-600" />
                    <div>
                        <TmmTypographyLabelForm :label="$t('ใบเสร็จ(E-Tax)')" className="text-xs" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const myPoint = ref(18)

const activeStepCard = ref(1)
const activeBtnCard = (id) => {
    backCard.value = backCard.value.map(card => ({
        ...card,
        active: card.id === id ? true : false
    }));
    activeStepCard.value = id;
}

const backCard = ref([
    { id: 1, label: t('บาร์โค้ด'), active: true },
    { id: 2, label: t('คิวอาร์'), active: false },
    { id: 3, label: t('รหัส'), active: false },
])
const firstBox = ref(true)
const swapBox = () => {
    firstBox.value = !firstBox.value
}
const slides = [
    'https://img.salehere.co.th/p/1200x0/2022/05/25/5dq0za8grwmw.jpg', "https://files.eventpass.co/eventpass-api/file/1651117266971.jpeg",
    'https://img.salehere.co.th/p/1200x0/2022/11/24/9tkiici1qg7v.jpg', 'https://img.salehere.co.th/p/1200x0/2022/01/25/xq6azmszim4p.jpg'
]

</script>

<style scoped>
.swiper {
    width: 100%;
    height: 100%;
}
</style>