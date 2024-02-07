<template>
    <div class="bg-cover  min-h-screen bg-white">
        <HeaderMenu>
            <p class="text-2xl text-white">{{ $t('บัญชีของฉัน') }}</p>
        </HeaderMenu>
        <section class="p-4">
            <DataView :value="menuData" class="p-4" :pt="{
                content: { class: 'bg-transparent' }
            }">
                <template #empty>
                    <div class="flex flex-col justify-center items-center">
                        <p class="mdi mdi-receipt-text-remove-outline mb-1 text-green-600"></p>
                        <p>{{ $t('ไม่พบใบเสร็จ') }}</p>
                    </div>
                </template>
                <template #list="slotProps">
                    <div class="flex flex-wrap">
                        <div v-for="(item, index) in slotProps.items" :key="index" class="w-full ">
                            <NuxtLink v-if="!item.togglelang" :to="item.to">
                                <div
                                    class="flex justify-between font-bold text-lg py-4 border-b  border-lime-600 cursor-pointer">
                                    <div>
                                        <i :class="`${item.icon} mr-3`" style="font-size: 23px;"></i>
                                        <span>{{ item.name }}</span>
                                        <TmmTypographyLabelForm :label="item.date" className="mb-3 text-sm" />
                                    </div>
                                    <span class="mdi mdi-menu-right text-green-500 " style="font-size: 50px;"></span>
                                </div>
                            </NuxtLink>

                            <div v-else
                                class="flex justify-between font-bold text-lg py-4 border-b  border-lime-600 cursor-pointer">
                                <div>
                                    <i :class="`${item.icon} mr-3`" style="font-size: 23px;"></i>
                                    <span>{{ item.name }}</span>
                                    <TmmTypographyLabelForm :label="item.date" className="mb-3 text-sm" />
                                </div>
                                <!-- <select v-model="language">
                                    <option v-for="item in locales" :key="typeof item === 'object' ? item.code : item"
                                        :value="typeof item === 'object' ? item.code : item">
                                        {{ typeof item === "object" ? item.name : item }}
                                    </option>
                                </select> -->

                                <Dropdown v-model="language" :options="locales" optionValue="code" optionLabel="name"
                                    :placeholder="$t('เลือกภาษา')" class="w-[10rem] text-center" >
                                    <template #option="slotProps">
                                        <div class="flex items-center ">
                                            <img :src="slotProps.option.flag" style="width: 20px; height: 13.4px" />
                                            {{ slotProps.option.name }}
                                        </div>
                                    </template>
                                </Dropdown>


                            </div>

                        </div>
                    </div>
                </template>
            </DataView>
        </section>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { locales, locale, setLocale } = useI18n();
const language = computed({
    get: () => locale.value,
    set: (value) => {
        setLocale(value);
    },
});

const menuData = ref([
    { name: t('แก้ไขข้อมูลส่วนตัว'), icon: "mdi mdi-human-edit", to: '/self_info', togglelang: false },
    { name: t('คูปองของฉัน'), icon: "mdi mdi-ticket-percent-outline", to: '/coupon', togglelang: false },
    { name: t('ใบเสร็จ'), icon: "mdi mdi-receipt-text", to: '/', togglelang: false },
    { name: t('ดูประวัติการใช้แต้ม'), icon: "mdi mdi-button-pointer", to: '/history_points', togglelang: false },
    { name: t('ภาษา'), icon: "mdi mdi-web", to: '/', togglelang: true },
    { name: t('ติดต่อเรา'), icon: "mdi mdi-phone", to: '/', togglelang: false },
    { name: t('ข้อกำหนดและเงื่อนไข'), icon: "mdi mdi-invoice-list-outline", to: '/', togglelang: false },
    { name: t('นโยบายความเป็นส่วนตัว'), icon: "mdi mdi-shield-account-variant-outline", to: '/', togglelang: false },
    { name: t('การจัดการข้อมูลส่วนบุคคล'), icon: "mdi mdi-shield-account-variant-outline", to: '/', togglelang: false },
]);
</script>