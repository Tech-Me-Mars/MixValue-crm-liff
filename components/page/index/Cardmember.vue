<script setup>
const localPath = useLocalePath();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


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
    { id: 1, label: t('บาร์โค้ด'), active: true },
    { id: 2, label: t('คิวอาร์'), active: false },
    { id: 3, label: t('รหัส'), active: false },
])
// *********** [ จบสลับหลัง-หน้าบัตร ]

// ฟังชั่นกดสลับการ์ดหน้า-หลัง
const firstBox = ref(true)
const swapBox = () => {
    firstBox.value = !firstBox.value
}

const props = defineProps({
  cardMemberData: {
    type: Object, // ระบุชนิดของ prop
    required: true // ระบุว่า prop นี้จำเป็นต้องมี
  }
});
</script>

<template>
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
                        <TmmButton v-for="(item, index) in backCard" :key='index' :label="item.label" severity="danger"
                            class="" size="small" :outlined="!item.active" @click="activeBtnCard(item.id)" />
                    </span>
                </div>
                <div class="flex justify-center items-center h-[5rem]">
                    <img :src="`data:image/png;base64,${cardMemberData.barcode}`" class="object-contain pt-4" style="width: 9rem;" alt="barcode"
                        v-if="activeStepCard == 1">
                    <img :src="`data:image/png;base64,${cardMemberData.qrcode}`" class="object-contain pt-4" style="width: 5rem;" alt="qrcode"
                        v-if="activeStepCard == 2">
                    <span class="pt-8 text-2xl font-bold" v-if="activeStepCard == 3">{{ cardMemberData.card_id }}</span>
                </div>
            </div>
            <!-- <p
                class="italic text-gray-700 font-light text-xs text-center pt-1 absolute bottom-7 left-1/2 w-full transform -translate-x-1/2 z-10">
                {{ $t('เชื่อมต่อไลน์เมื่อวันที่') }} 5 ก.พ. 2567
            </p> -->
            <TmmButtonScan severity="danger" rounded
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10 " @click="swapBox" />
        </div>
    </div>
</template>
