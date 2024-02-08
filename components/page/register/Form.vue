<script setup>
const optionTitleName = [{ id: 1, name: 'นาย' }, { id: 3, name: 'นาง' }, { id: 2, name: 'นางสาว' }]
const optionGender = [{ name: "ชาย" }, { name: "หญิง" }]
const checked = ref()
</script>
<template>
    <div class="pb-5">
        <div class="grid grid-cols-1 gap-2 mb-5">
            <div class="">
                <TmmTypographyLabelForm :label="$t('เลขบัตรประชาชน')" />
                <TmmInput v-model="cid" :placeholder="$t('เลขบัตรประชาชน')" />
                <!-- <TmmTypographyTextValidator v-if="errors.cid" :errors="errors.cid" /> -->
            </div>
            <div class="">
                <TmmTypographyLabelForm :label="$t('เบอร์โทรศัพท์มือถือ')" />
                <TmmInputPhon v-model="phone_no" :placeholder="$t('เบอร์โทร')" />
                <!-- <TmmTypographyTextValidator v-if="errors.phone_no" :errors="errors.phone_no" /> -->
            </div>
            <div class="">
                <TmmTypographyLabelForm label="คำนำหน้า" />
                <TmmInputDropDown v-model="title_name" :options="optionTitleName" optionLabel="name" optionValue="name"
                    placeholder="คำนำหน้า" className=" w-full" />
                <!-- <TmmTypographyTextValidator v-if="errors.title_name" :errors="errors.title_name" /> -->
            </div>
            <div class="">
                <TmmTypographyLabelForm :label="$t('ชื่อ')" />
                <TmmInput v-model="first_name" :placeholder="$t('ชื่อ')" />
                <!-- <TmmTypographyTextValidator v-if="errors.first_name" :errors="errors.first_name" /> -->
            </div>
            <div class="">
                <TmmTypographyLabelForm :label="$t('นามสกุล')" />
                <TmmInput v-model="last_name" :placeholder="$t('นามสกุล')" />
                <!-- <TmmTypographyTextValidator v-if="errors.last_name" :errors="errors.last_name" /> -->
            </div>
            <div class="">
                <TmmTypographyLabelForm :label="$t('ชื่อเล่น')" />
                <TmmInput v-model="nick_name" :placeholder="$t('ชื่อเล่น')" />
                <!-- <TmmTypographyTextValidator v-if="errors.nick_name" :errors="errors.nick_name" /> -->
            </div>
            <div class="">
                <TmmTypographyLabelForm :label="$t('อีเมลล์')" />
                <TmmInputEmail v-model="email" :placeholder="$t('อีเมลล์')" />
                <!-- <TmmTypographyTextValidator v-if="errors.email" :errors="errors.email" /> -->
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

            <div class="">
                <TmmTypographyLabelForm label="จังหวัด" />
                <TmmInputDropDown className="w-full" v-model="province_id" :options="resProvincesOption"
                    optionLabel="name_th" optionValue="id" placeholder="เลือกจังหวัด" @change="handleProvinceChange" />
                <!-- <TmmTypographyTextValidator v-if="errors.province_id" :errors="errors.province_id" /> -->
            </div>

            <div class="">
                <TmmTypographyLabelForm label="อำเภอ" />
                <TmmInputDropDown className="w-full" v-model="amphure_id" :options="resProvincesOption"
                    optionLabel="name_th" optionValue="id" placeholder="เลือกอำเภอ" @change="handleAmphureChange" />
                <!-- <TmmTypographyTextValidator v-if="errors.amphure_id" :errors="errors.amphure_id" /> -->
            </div>

            <div class="">
                <TmmTypographyLabelForm label="ตำบล" />
                <TmmInputDropDown className="w-full" v-model="district_id" :options="resProvincesOption"
                    optionLabel="name_th" optionValue="id" placeholder="เลือกตำบล" @change="handleDistrictChange" />
                <!-- <TmmTypographyTextValidator v-if="errors.district_id" :errors="errors.district_id" /> -->
            </div>

            <div class="">
                <TmmTypographyLabelForm label="ไปรษณีย์" />
                <TmmInput v-model="zipcode" :disabled="!district_id" placeholder="ไปรษณีย์" />
                <!-- <TmmTypographyTextValidator v-if="errors.zipcode" :errors="errors.zipcode" /> -->
            </div>
            <div class="flex gap-3">
                <Checkbox v-model="checked" :binary="true" class="" />
                <p class="font-semibold text-sm">
                    {{ $t('ฉันตกลงตาม') }}
                    <span class="text-green-700 underline">{{ $t('ข้อกำหนดและเงื่อนไข') }}</span>
                    {{ $t('และรับทราบ') }}
                    <span class="text-green-700 underline">{{ $t('นโยบายความเป็นส่วนตัว') }}</span>
                </p>
            </div>
        </div>
        <TmmButtonSave class="w-full py-2" severity="primary"  label="บันทึกข้อมูลสมัครสมาชิก"  />
    </div>
</template>