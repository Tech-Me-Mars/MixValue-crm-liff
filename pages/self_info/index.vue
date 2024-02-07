<template>
    <div
        class=" bg-cover  min-h-screen  bg-[url('https://www.cupsfrozenyogurt.com/content/uploads/2017/10/cups-bubble-bg-white-purple-subtle.jpg')]">
        <HeaderMenu>
                <p class="text-2xl text-white">{{ $t('แก้ไขข้อมูลส่วนตัว') }}</p>
            </HeaderMenu>
        <section class="p-4">
            <h1 class="my-4 text-lg mb-2"><strong>{{ $t('ข้อมูลส่วนตัว') }}</strong></h1>
            <div class="grid grid-cols-1 gap-2 card">
                <div class="">
                    <TmmTypographyLabelForm :label="$t('เลขบัตรประชาชน')" />
                    <TmmInput v-model="cid" :placeholder="$t('เลขบัตรประชาชน')" />
                    <!-- <TmmTypographyTextValidator v-if="errors.cid" :errors="errors.cid" /> -->
                </div>
                <div class="">
                    <TmmTypographyLabelForm :label="$t('ชื่อ')" />
                    <TmmInput v-model="fname" :placeholder="$t('ชื่อ')" />
                    <!-- <TmmTypographyTextValidator v-if="errors.fname" :errors="errors.fname" /> -->
                </div>
                <div class="">
                    <TmmTypographyLabelForm :label="$t('นามสกุล')" />
                    <TmmInput v-model="lname" :placeholder="$t('นามสกุล')" />
                    <!-- <TmmTypographyTextValidator v-if="errors.lname" :errors="errors.lname" /> -->
                </div>
                <div class="">
                    <TmmTypographyLabelForm :label="$t('วันเกิด')" />
                    <TmmInputCalendar v-model="birthDate" className="w-full" :placeholder="$t('วันเกิด')" />
                    <!-- <TmmTypographyTextValidator v-if="errors.birthDate" :errors="errors.birthDate" /> -->
                </div>
                <div class="">
                    <TmmTypographyLabelForm :label="$t('สัญชาติ')" />
                    <Dropdown filter autoFilterFocus v-model="title_name" :options="national" optionLabel="name"
                        optionValue="name" :placeholder="$t('สัญชาติ')" class=" w-full" />
                    <!-- <TmmTypographyTextValidator v-if="errors.title_name" :errors="errors.title_name" /> -->
                </div>
                <div class="">
                    <TmmTypographyLabelForm :label="`${$t('สถานภาพ')} (${$t('ถ้ามี')})`" />
                    <Dropdown filter autoFilterFocus v-model="title_name" :options="optionTitleName" optionLabel="name"
                        optionValue="name" :placeholder="$t('สถานภาพ')" class=" w-full" />
                    <!-- <TmmTypographyTextValidator v-if="errors.title_name" :errors="errors.title_name" /> -->
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="`${$t('อาชีพ')}  (${$t('ถ้ามี')})`" />
                    <Dropdown filter autoFilterFocus v-model="title_name" :options="career" optionLabel="name"
                        optionValue="name" :placeholder="$t('อาชีพ')" class=" w-full" />
                    <!-- <TmmTypographyTextValidator v-if="errors.title_name" :errors="errors.title_name" /> -->
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="`${$t('รายได้ต่อเดือน')} (${$t('ถ้ามี')})`" />
                    <TmmInputNumber v-model="lname" :placeholder="`${$t('รายได้ต่อเดือน')}`" />
                    <!-- <TmmTypographyTextValidator v-if="errors.lname" :errors="errors.lname" /> -->
                </div>
            </div>

            <h1 class="my-4 text-lg mb-2"><strong>{{ $t('ที่อยู่ตามบัตรประชาชน') }}</strong></h1>
            <div class="grid grid-cols-1 gap-2 card">
                <div class="">
                    <TmmTypographyLabelForm :label="$t('จังหวัด')" />
                    <TmmInputDropDown v-model="province_id" className="w-full" :options="resProvincesOption"
                        optionLabel="name_th" optionValue="id" :placeholder="$t('เลือกจังหวัด')" @change="handleProvinceChange" />
                    <!-- <TmmTypographyTextValidator v-if="errors.province_id" :errors="errors.province_id" /> -->
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="$t('อำเภอ')" />
                    <TmmInputDropDown v-model="amphure_id" className="w-full" :options="resProvincesOption"
                        optionLabel="name_th" optionValue="id" :placeholder="$t('เลือกอำเภอ')" @change="handleAmphureChange" />
                    <!-- <TmmTypographyTextValidator v-if="errors.amphure_id" :errors="errors.amphure_id" /> -->
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="$t('ตำบล')" />
                    <TmmInputDropDown v-model="district_id" className="w-full" :options="resProvincesOption"
                        optionLabel="name_th" optionValue="id" :placeholder="$t('เลือกตำบล')" @change="handleDistrictChange" />
                    <!-- <TmmTypographyTextValidator v-if="errors.district_id" :errors="errors.district_id" /> -->
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="$t('ไปรษณีย์')" />
                    <TmmInput v-model="zipcode" :disabled="!district_id" :placeholder="$t('ไปรษณีย์')" />
                    <!-- <TmmTypographyTextValidator v-if="errors.zipcode" :errors="errors.zipcode" /> -->
                </div>
            </div>

            <h1 class="my-4 text-lg mb-2"><strong>{{ $t('ข้อมูลติดต่อ') }}</strong></h1>
            <div class="grid grid-cols-1 gap-2 card ">
                <div class="">
                    <TmmTypographyLabelForm :label="`${$t('อีเมลล์')} (${$t('ถ้ามี')})`" />
                    <TmmInputEmail v-model="email" :placeholder="$t('อีเมลล์')" />
                    <!-- <TmmTypographyTextValidator v-if="errors.email" :errors="errors.email" /> -->
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="$t('เบอร์โทรศัพท์มือถือ')" />
                    <TmmInputPhon v-model="phon_no" :placeholder="$t('เบอร์โทร')" />
                    <!-- <TmmTypographyTextValidator v-if="errors.phon_no" :errors="errors.phon_no" /> -->
                </div>
            </div>
            <hr class="my-3">

            <p class="font-light text-sm mb-5">{{ $t('หากต้องการแก้ไขข้อมูลส่วนตัว เช่น ชื่อ-นามสกุล วันเดือนปีเกิดหรือที่อยู่ตามทะเบียนบ้านกกรุณานำบัตรประชาชนไปติดต่อแก้ไขที่ร้านมิกซ์แวลูส์ได้ทุกสาขา') }}</p>

            <div class="flex flex-col justify-center">
                <TmmButtonSave :label="$t('บันทึก')" class="w-full mb-5" severity="success" />
                
            </div>
            <div class="flex justify-center">
                <span class="underline text-center text-green-600 font-bold  self-center cursor-pointer">{{ $t('ยกเลิกการแก้ไข') }}</span>
            </div>
         
        </section>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const national = ref([
    { name: "ไทย" }
])
const statusPersonal = ref([
    { name: "โสด" },
    { name: "แต่งงาน" },
    { name: "ไม่ระบุ" },
])
const career = ref([
    { name: "พนักงานบริษัท" },
    { name: "ข้าราชการ" },
    { name: "ธุรกิจส่วนตัว" },
    { name: "เกษตรกร" },
    { name: "นักเรียน/นักศึกษา" },
    { name: "อื่นๆ" },
])
</script>