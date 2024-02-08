<template>
    <div class="bg-[url('')] bg-cover bg-white min-h-screen pt-2">
        <div class="flex justify-end">
            <PageRegisterChangelang />
        </div>
        <div class="px-10">
            <div class="flex items-center justify-center mb-3">
                <img src="/logo/LOGO_MIX_STATION.png" class="w-[9rem]" />
            </div>
            <p class="px-10 text-center mb-8">{{ $t('กรุณากรอกข้อมูลด้านล่างเพื่อสมัครหรือผูกบัญชีสมาชิก') }}</p>
            <PageRegisterForm />
        </div>



    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();

// ฟังชั่นในการเปลี่ยนภาษา
const changeLanguage = (param) => {
    language.value = param;
}
const { locales, locale, setLocale } = useI18n();
// เมื่อตัวแปร language เปลี่ยน จะทำกา set ภาษา
const language = computed({
    get: () => locale.value,
    set: (value) => {
        setLocale(value);
    },
});
</script>