<template>
    <div class="bg-cover  min-h-screen bg-white  ">
        <!-- <HeaderMenu>
            <p class="text-3xl text-white">คูปอง</p>
        </HeaderMenu> -->
        <div class="m-4 h-[4rem] flex justify-center items-center" style="background-color: rgba(41, 184, 5, 0.904);">
            <h1 class="text-white text-center text-4xl">{{ $t('คูปอง') }}</h1>
        </div>

        <div class="flex justify-center gap-2">
            <TmmButton v-for="(item, index) in buttonCategoryCoupon" :key="index" :label='item.label' rounded outlined
                severity="success" :class="{ 'bg-green-600 text-white': item.active == true }"
                @click="activeBtn(item.id)" />
        </div>

        <div v-if="activeStepBtn == 1">
            <DataView :value="couponDiscountPriceList" class="p-4" :pt="{
                content: { class: 'bg-transparent' }
            }">
                <template #empty>
                    <div class="flex flex-col justify-center items-center">
                        <p class="mdi mdi-receipt-text-remove-outline mb-1 text-green-600"></p>
                        <p>{{ $t('ไม่พบคูปอง') }}</p>
                    </div>
                </template>
                <template #list="slotProps">
                    <div class="flex flex-wrap">
                        <div v-for="(item, index) in slotProps.items" :key="index" class="w-full">
                            <div class="flex justify-between font-bold gap-2 text-lg py-2">
                                <div class="w-[8rem]">
                                    <img :src="item.image" class="w-full h-full bg-cover" />
                                </div>
                                <div class="">
                                    <p class="text-green-500 line-clamp-1 text-md">{{ item.name }}</p>
                                    <TmmTypographyLabelForm :label="$t('หมดอายุใน') + item.date" className="mb-3 text-xs text-green-500 line-clamp-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </DataView>
        </div>

        <div v-if="activeStepBtn == 2">
            <DataView :value="couponDiscountMoneyList" class="p-4" :pt="{
                content: { class: 'bg-transparent' }
            }">
                <template #empty>
                    <div class="flex flex-col justify-center items-center">
                        <p class="mdi mdi-receipt-text-remove-outline mb-1 text-green-600"></p>
                        <p>{{ $t('ไม่พบคูปอง') }}</p>
                    </div>
                </template>
                <template #list="slotProps">
                    <div class="flex flex-wrap">
                        <div v-for="(item, index) in slotProps.items" :key="index" class="w-full">
                            <div class="flex justify-between font-bold gap-2 text-lg py-2 border-b-2  border-lime-600">
                                <div class="w-[8rem]">
                                    <img :src="item.image" class="w-full h-full bg-cover" />
                                </div>
                                <div class="">
                                    <p class="text-green-500 line-clamp-1 text-md">{{ item.name }}</p>
                                    <TmmTypographyLabelForm :label="item.date" className="mb-3 text-xs text-warp" />
                                </div>


                            </div>
                        </div>
                    </div>
                </template>
            </DataView>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const activeStepBtn = ref(1)
const activeBtn = (id) => {
    buttonCategoryCoupon.value = buttonCategoryCoupon.value.map(card => ({
        ...card,
        active: card.id === id ? true : false
    }));
    activeStepBtn.value = id;
}
const buttonCategoryCoupon = ref([
    { id: 1, label: t('คูปองส่วนลดสินค้า'), active: true },
    { id: 2, label: t('คูปองส่วนลดเงินสด'), active: false },
])

const couponDiscountMoneyList = ref([

])
const couponDiscountPriceList = ref([
    { name: "เอเวอร์รินน้ำแร่ 600 ml. ราคา 60 บาท", date: "24 วัน(29 ก.พ 2567 เวลา 23:59)", image: "/image/coupon/coupon-cj-removebg-preview.png" },
    { name: "เอเวอร์รินน้ำแร่ 600 ml. ราคา 60 บาท", date: "24 วัน(29 ก.พ 2567 เวลา 23:59)", image: "/image/coupon/coupon-cj-removebg-preview.png" },
    { name: "เอเวอร์รินน้ำแร่ 600 ml. ราคา 60 บาท", date: "24 วัน(29 ก.พ 2567 เวลา 23:59)", image: "/image/coupon/coupon-cj-removebg-preview.png" },
    { name: "เอเวอร์รินน้ำแร่ 600 ml. ราคา 60 บาท", date: "24 วัน(29 ก.พ 2567 เวลา 23:59)", image: "/image/coupon/coupon-cj-removebg-preview.png" },
    { name: "เอเวอร์รินน้ำแร่ 600 ml. ราคา 60 บาท", date: "24 วัน(29 ก.พ 2567 เวลา 23:59)", image: "/image/coupon/coupon-cj-removebg-preview.png" },
    { name: "เอเวอร์รินน้ำแร่ 600 ml. ราคา 60 บาท", date: "24 วัน(29 ก.พ 2567 เวลา 23:59)", image: "/image/coupon/coupon-cj-removebg-preview.png" },
    { name: "เอเวอร์รินน้ำแร่ 600 ml. ราคา 60 บาท", date: "24 วัน(29 ก.พ 2567 เวลา 23:59)", image: "/image/coupon/coupon-cj-removebg-preview.png" },
    { name: "เอเวอร์รินน้ำแร่ 600 ml. ราคา 60 บาท", date: "24 วัน(29 ก.พ 2567 เวลา 23:59)", image: "/image/coupon/coupon-cj-removebg-preview.png" },
    { name: "เอเวอร์รินน้ำแร่ 600 ml. ราคา 60 บาท", date: "24 วัน(29 ก.พ 2567 เวลา 23:59)", image: "/image/coupon/coupon-cj-removebg-preview.png" },

]);
</script>