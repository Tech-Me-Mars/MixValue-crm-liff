<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();

const couponName = ref('ส่วนลดเครื่องดื่มบาวคาเฟ่มูลค่า 20บ.')
const couponExpire = ref('29 ก.พ 2567')
</script>
<template>

        
        <div class="flex flex-col justify-center py-4">
            <h1 class="text-green-600 font-bold text-3xl text-center mb-2">{{ couponName }}</h1>
            <p class="text-center">{{ $t('หมดอายุใน') }} {{ couponExpire }}</p>
        </div>
</template>
