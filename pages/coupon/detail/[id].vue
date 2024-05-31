<template>
  <div class="bg-cover min-h-screen bg-white">
    <NuxtLink :to="('/coupon')">
      <HeaderMenu class="!bg-lime-700">
        <div class="flex justify-between items-center w-full">
          <p class="text-2xl text-white mx-auto">{{ ("รายละเอียดคูปอง") }}</p>
          <span
            class="mdi mdi-chevron-left text-white self-end"
            style="font-size: 25px"
          ></span>
        </div>
      </HeaderMenu>
    </NuxtLink>
    <!-- <PageCouponDetailImage /> -->
    <div>
      <img
        src="/image/coupon/bao-cage.jpg"
        alt=""
        class="w-full h-full"
        style=""
      />
    </div>
    <section class="px-10">
      <!-- <PageCouponDetailCoupondetail /> -->
      <div class="flex flex-col justify-center py-4">
        <h1 class="text-green-600 font-bold text-3xl text-center mb-2">
          {{ couponName }}
        </h1>
        <p class="text-center">{{ ("หมดอายุใน") }} {{ couponExpire }}</p>
      </div>
      <!-- <PageCouponDetailBarcodescan /> -->
      <div class="mb-5" v-if="showBarcode == false">
        <TmmButton
          @click="toggleShowBarcode()"
          severity="success"
          className="w-full py-3 bg-green-800 mb-5"
          :label="('กดที่แคชเชียร์เพื่อแสดงบาร์โค้ดส่วนลด')"
          raised
        />
        <p class="text-red-700 font-semibold text-center">
          {{ ("บาร์โค้ดจะมีอายุ 1 นาที") }}
          {{ ("เมื่อหมดเวลาแล้วแต่ยังไม่ได้ถูกใช้สามารถกดขอใหม่ได้") }}
        </p>
      </div>
      <div class="mb-5" v-else>
        <p class="text-center">{{ ("สแกนเพื่อใช้สิทธิ์") }}</p>
        <img src="/barcode.png" class="my-2" />
        <p class="text-red-700 font-semibold text-center">
          {{ ("กรุณาสแกนภายใน") }} {{ couterTime }} {{ ("นาที") }}
        </p>
      </div>
      <ul class="list-disc text-xs">
        <li class="mb-1">{{ ("ข้อกำหนดและเงื่อนไข") }}:</li>
        <li class="mb-1">
          {{ ("คูปองสามารถใช้ได้ที่ร้าน") }} {{ ("มิกซ์แวลูส์") }}
          {{ ("ทุกสาขา") }}
        </li>
        <li class="mb-1">
          {{ ("คูปองสามารถถใช้ได้ภายในวันที่") }} {{ dateStart }}-{{
            dateEnd
          }}
        </li>
        <li class="mb-1">{{ ("1 สามาชิก 1 สิทธิ์ เท่านั้น") }}</li>
        <li class="mb-1">{{ ("เงื่อนไขเป็นไปตามบริษัทฯกำหนด") }}</li>
        <li class="mb-1">{{ ('บริษัท มิกซ์แวลูส์ คอร์ปอเรชั่น จำกัด ขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไข โดยไม่ต้องแจ้งให้ทราบล่วงหน้า') }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import * as dataApi from "../api/data.js";




const couponName = ref("ส่วนลดเครื่องดื่มบาวคาเฟ่มูลค่า 20บ.");
const couponExpire = ref("29 ก.พ 2567");

const couterTime = ref("00:59");
const dateStart = ref("1 ก.พ. 2567");
const dateEnd = ref("29 ก.พ. 2567");
// ตัวแปรเก็บbarcode
const showBarcode = ref(false);
// ฟังชั่นสลับ show barcode
const toggleShowBarcode = () => {
  showBarcode.value = !showBarcode.value;
};
</script>
