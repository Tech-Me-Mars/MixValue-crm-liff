<script setup>
import {
    useI18n
} from "vue-i18n";
const {
    t
} = useI18n();
const localPath = useLocalePath();

const couponName = ref('ส่วนลดเครื่องดื่มบาวคาเฟ่มูลค่า 20บ.')
const couponExpire = ref('29 ก.พ 2567')
const couterTime = ref('00:59')
const dateStart =ref('1 ก.พ. 2567')
const dateEnd =ref('29 ก.พ. 2567')
// ตัวแปรเก็บbarcode
const showBarcode = ref(false);
// ฟังชั่นสลับ show barcode
const toggleShowBarcode = () => {
    showBarcode.value = !showBarcode.value;
};
</script>
<template>
    <div class="mb-5" v-if="showBarcode == false">
        <TmmButton @click="toggleShowBarcode()" severity="success" className="w-full py-3 bg-green-800 mb-5"
            :label="$t('กดที่แคชเชียร์เพื่อแสดงบาร์โค้ดส่วนลด')" raised />
        <p class="text-red-700 font-semibold text-center">{{ $t('บาร์โค้ดจะมีอายุ 1 นาที') }}
            {{ $t('เมื่อหมดเวลาแล้วแต่ยังไม่ได้ถูกใช้สามารถกดขอใหม่ได้') }}</p>
    </div>
    <div class="mb-5" v-else>
        <p class="text-center">{{ $t('สแกนเพื่อใช้สิทธิ์') }}</p>
        <img src="/barcode.png" class="my-2">
        <p class="text-red-700 font-semibold text-center">{{ $t('กรุณาสแกนภายใน') }} {{ couterTime }} {{ $t('นาที') }}</p>
    </div>
    <ul class="list-disc text-xs ">
        <li class="mb-1">{{ t('ข้อกำหนดและเงื่อนไข') }}:</li>
        <li class="mb-1">{{ $t('คูปองสามารถใช้ได้ที่ร้าน') }} {{ $t('มิกซ์แวลูส์') }} {{ $t('ทุกสาขา') }}</li>
        <li class="mb-1">{{ $t('คูปองสามารถถใช้ได้ภายในวันที่') }} {{ dateStart }}-{{ dateEnd }} </li>
        <li class="mb-1">{{ $t('1 สามาชิก 1 สิทธิ์ เท่านั้น') }}</li>
        <li class="mb-1">{{ $t('เงื่อนไขเป็นไปตามบริษัทฯกำหนด') }}</li>
        <li class="mb-1">{{ $t('บริษัท มิกซ์แวลูส์ คอร์ปอเรชั่น จำกัด ขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไข โดยไม่ต้องแจ้งให้ทราบล่วงหน้า') }}</li>
    </ul>
</template>
