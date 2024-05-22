<template>
  <div class="bg-cover min-h-screen bg-white">
    <!-- Header -->
    <NuxtLink :to="localPath('/main_menu')">
      <HeaderMenu class="mb-5 !bg-lime-700">
        <div class="flex justify-between items-center w-full">
          <p class="text-2xl text-white mx-auto">{{ $t("คูปอง") }}</p>
          <span class="mdi mdi-chevron-left text-white self-end" style="font-size: 25px"></span>
        </div>
      </HeaderMenu>
    </NuxtLink>
    <!--End Header -->

    <!-- แสดงคูปอง -->
    <!-- <PageCouponList_Coupon /> -->
    <!-- ปุ่มหมดคูปอง -->
    <div class="flex justify-center gap-2">
      <TmmButton v-for="(item, index) in buttonCategoryCoupon" :key="index" :label="item.label" rounded outlined
        severity="success" :class="{ 'bg-green-600 text-white': item.active == true }" @click="activeBtn(item.id)" />
    </div>
    <!-- จบปุ่มหมดคูปอง -->

    <!-- Tab คูปองลดสินค้า -->
    <div v-if="activeStepBtn == 1">
      <DataView :value="couponDiscountProducts" class="p-4" :pt="{
        content: { class: 'bg-transparent' },
      }">
        <template #empty>
          <div class="flex flex-col justify-center items-center">
            <p class="mdi mdi-receipt-text-remove-outline mb-1 text-green-600"></p>
            <p>{{ $t("ไม่พบคูปอง") }}</p>
          </div>
        </template>
        <template #list="slotProps">
          <div class="flex flex-wrap">
            <div v-for="(item, index) in slotProps.items" :key="index" class="w-full">
              <NuxtLink :to="localPath(`/coupon/detail/${item.id}`)">
                <div class="flex justify-between font-bold gap-2 text-lg py-2">
                  <div class="w-[8rem]">
                    <img :src="item.image" class="w-full h-full bg-cover" />
                  </div>
                  <div class="">
                    <p class="text-green-500 line-clamp-1 text-md">
                      {{ item.name }}
                    </p>
                    <TmmTypographyLabelForm :label="`${$t('หมดอายุใน')} ${formatDate(item.end_date)}`"
                      className="mb-3 text-xs text-green-500 line-clamp-1" />
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </template>
      </DataView>
    </div>
    <!-- จบ Tab คูปองลดสินค้า -->

    <!-- Tab คูปองส่วนลดเงินสด -->
    <div v-if="activeStepBtn == 2">
      <DataView :value="couponDiscountMoneyList" class="p-4" :pt="{
        content: { class: 'bg-transparent' },
      }">
        <template #empty>
          <div class="flex flex-col justify-center items-center">
            <p class="mdi mdi-receipt-text-remove-outline mb-1 text-green-600"></p>
            <p>{{ $t("ไม่พบคูปอง") }}</p>
          </div>
        </template>
        <template #list="slotProps">
          <div class="flex flex-wrap">
            <div v-for="(item, index) in slotProps.items" :key="index" class="w-full">
              <div class="flex justify-between font-bold gap-2 text-lg py-2 border-b-2 border-lime-600">
                <!-- <div class="w-[8rem]">
                <img :src="item.image" class="w-full h-full bg-cover" />
              </div> -->
                <div class="">
                  <p class="text-green-500 line-clamp-1 text-md">
                    {{ item.name }}
                  </p>
                  <TmmTypographyLabelForm :label="`${$t('หมดอายุใน')} ${formatDate(item.end_date)}`"
                    className="mb-3 text-xs text-green-500 line-clamp-1" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
    <!-- จบ Tab คูปองส่วนลดเงินสด -->
    <!-- จบแสดงคูปอง -->
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();

import {
  formatDate,
  customDateFormat,
  formatCurrency,
  formatNumber,
  roundToTwoDecimalPlaces,
} from "@/helpers/utility";

// ปุ่มสลับหมวดหมู่
const activeStepBtn = ref(1);
// ฟังชั่นสลับปุ่มโชวคูปอง
const activeBtn = (id) => {
  buttonCategoryCoupon.value = buttonCategoryCoupon.value.map((card) => ({
    ...card,
    active: card.id === id ? true : false,
  }));
  activeStepBtn.value = id;
};
// ข้อมูลปุ่มคูปอง
const buttonCategoryCoupon = ref([
  { id: 1, label: t("คูปองส่วนลดสินค้า"), active: true },
  { id: 2, label: t("คูปองส่วนลดเงินสด"), active: false },
]);

// ข้อมูลคูปองส่วนลดเงินสด
const couponDiscountMoneyList = ref([]);
// ข้อมูลคูปองส่วนลดสินค้า
const couponDiscountProducts = ref([
  // {
  //   name: "เอเวอร์รินน้ำแร่ 600 ml. ราคา 60 บาท",
  //   date: "24 วัน(29 ก.พ 2567 เวลา 23:59)",
  //   image: "/image/coupon/coupon-cj-removebg-preview.png",
  //   id: 1,
  // },
]);

const loadCoupon = async () => {
  try {
    const res = await dataApi.getCoupon();
    couponDiscountProducts.value = res.data.data.coupon_for_product;
    couponDiscountMoneyList.value = res.data.data.coupon_for_discount_cash;
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  loadCoupon();
});
</script>
