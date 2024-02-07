<template>
    <div
        class="bg-cover  min-h-screen  bg-[url('https://www.cupsfrozenyogurt.com/content/uploads/2017/10/cups-bubble-bg-white-purple-subtle.jpg')]">
        <HeaderMenu>

            <p class="text-2xl text-white">{{ $t('ประวัติการใช้แต้ม') }}</p>

        </HeaderMenu>

        <div class="">
            <DataView :value="products" class="p-4" :pt="{
                content: { class: 'bg-transparent' }
            }">
                <template #empty>
                    <div class="flex flex-col justify-center items-center">
                        <p class="mdi mdi-receipt-text-remove-outline mb-1 text-green-600"></p>
                        <p>{{ $t('ไม่พบประวัติการใช้แต้ม') }}</p>
                    </div>
                </template>
                <template #list="slotProps">
                    <div class="flex flex-wrap">
                        <div v-for="(item, index) in slotProps.items" :key="index" class="w-full">
                            <div class="flex justify-between font-bold text-lg py-2 border-b-2  border-lime-600">
                                <div>
                                    <p class="">{{ $t('ได้รับแต้ม') }}</p>
                                    <!-- <p class="text-gray">{{ item.date }}</p> -->
                                    <TmmTypographyLabelForm :label="item.date" className="mb-3 text-sm" />
                                </div>
                                <span class="text-green-500"> {{ item.point }} {{ $t('แต้ม') }}</span>

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

const products = ref([
    { point: 5, date: "09 ธ.ค 2566, 13:53" },
    { point: 5, date: "09 ธ.ค 2566, 13:53" },
    { point: 5, date: "09 ธ.ค 2566, 13:53" },
    { point: 5, date: "09 ธ.ค 2566, 13:53" },
    { point: 5, date: "09 ธ.ค 2566, 13:53" },
    { point: 5, date: "09 ธ.ค 2566, 13:53" },
    { point: 5, date: "09 ธ.ค 2566, 13:53" },
]);
</script>