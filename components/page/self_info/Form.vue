<script setup>
import { format } from "date-fns";
import * as dataApi from "./api/data.js";
import * as addressDataServices from './api/address.js'
//! /////// [validation import] /////////
import { useField, useForm, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();

const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({})

// ตัวเลือกคำนำหน้า
const optionTitleName = ref([
    {id:1,name:"นาย"},
    {id:2,name:"นาง"},
    {id:3,name:"นางสาว"},
])
const requireValue = t('กรุณาระบุข้อมูล')
const validationSchema = toTypedSchema(
    zod.object({
        phone_no: zod.string().nonempty(requireValue).default(''),
        title_name: zod.string().nonempty(requireValue).default(''),
        first_name: zod.string().nonempty(requireValue).default(''),
        last_name: zod.string().nonempty(requireValue).default(''),
        // cid: zod.string().nonempty(requireValue).default(''),
        // nick_name: zod.string().nonempty(requireValue).default(''),
    })
)
const { handleReset, handleSubmit, errors } = useForm({
    validationSchema
})
const profile = JSON.parse(localStorage.getItem("profile"));

const { value: phone_no } = useField('phone_no')
const { value: title_name } = useField('title_name')
const { value: first_name } = useField('first_name')
const { value: last_name } = useField('last_name')
const { value: cid } = useField('cid')
const { value: nick_name } = useField('nick_name', null, {
    initialValue: profile.displayName // กำหนดค่าเริ่มต้นที่นี่
})
const { value: address_no } = useField('address_no', null, {
    initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: province_id } = useField('province_id', null, {
    initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: amphure_id } = useField('amphure_id', null, {
    initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: district_id } = useField('district_id', null, {
    initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: zipcode } = useField('zipcode', null, {
    initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: tax } = useField('tax')
const { value: email } = useField('email')

const onSubmit = handleSubmit((values) => {
    // console.log(values)
    updateProfile()
})

const loadProfileDataToForm = async()=>{
    try{
        const res= await dataApi.getProfile();
    
        title_name.value = res.data.data.customer.title_name
        first_name.value = res.data.data.customer.first_name
        last_name.value = res.data.data.customer.last_name
        nick_name.value = res.data.data.customer.nick_name
        cid.value = res.data.data.customer.cid
        phone_no.value = res.data.data.customer.phone_no
        address_no.value = res.data.data.customer.address_no
        if (
            res.data.data.customer.province_id &&
            res.data.data.customer.amphure_id &&
            res.data.data.customer.district_id
            
        ) {
            province_id.value = parseInt(res.data.data.customer.province_id)
            district_id.value = parseInt(res.data.data.customer.district_id)
            amphure_id.value = parseInt(res.data.data.customer.amphure_id)
            zipcode.value = String(res.data.data.customer.zipcode)
        }

    }catch (error){
        
    }
};

const updateProfile = async () => {
    phone_no.value = phone_no.value.replace(/\D/g, '')
    const formData = new FormData();
    formData.append('phone_no', phone_no.value || "");
    formData.append('title_name', title_name.value || "");
    formData.append('first_name', first_name.value || "");
    formData.append('last_name', last_name.value || "");
    formData.append('cid', cid.value || "");
    formData.append('nick_name', nick_name.value || "");
    formData.append('address_no', address_no.value || "");
    formData.append('province_id', province_id.value || "");
    formData.append('amphure_id', amphure_id.value || "");
    formData.append('district_id', district_id.value || "");
    formData.append('zipcode', zipcode.value || "");
    formData.append('tax', tax.value || "");
    formData.append('email', email.value || "");
    console.log(formData);
    try {
        const res = await dataApi.updateProfile(formData)
        console.log(res.data.data)
        loadProfileDataToForm()
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
}

// ############################################### [ โหลดข้อมูลที่อยู่ ] ##########################################
const resProvincesOption = ref()
const resAmphuresOption = ref()
const resDistrictsOption = ref()

const loadProvinces = async () => {
    // const rs = await addressDataServices.getAddressProvinces()
    // resProvincesOption.value = rs.data.data
    // await handleProvinceChange()
    // await handleAmphureChange()
    // await handleDistrictChange()
    const rsprovinces = await addressDataServices.getAddressProvinces()
    resProvincesOption.value = rsprovinces.data.data

    const rsAmphur = await addressDataServices.getAddressAmphuresById(province_id.value)
    resAmphuresOption.value = rsAmphur.data.data

    const rsDistrict = await addressDataServices.getAddressDistrictsById(amphure_id.value)
    resDistrictsOption.value = rsDistrict.data.data
}
const handleProvinceChange = async () => {
    console.log('เลือกจังหวัด')
    // โหลดอำเภอ
    const rs = await addressDataServices.getAddressAmphuresById(province_id.value)
    resAmphuresOption.value = rs.data.data
    console.log(resAmphuresOption.value)

    amphure_id.value = null
    district_id.value = null
    zipcode.value = null
}

const handleAmphureChange = async () => {
    // โหลดตำบล
    const rs = await addressDataServices.getAddressDistrictsById(amphure_id.value)
    resDistrictsOption.value = rs.data.data
    console.log(amphure_id.value)

    district_id.value = null
    zipcode.value = null
}

const handleDistrictChange = () => {
    for (const item of resDistrictsOption.value) {
        if (item.id == district_id.value) {
            zipcode.value = item.zip_code
            break // Stop the loop since we found the matching item
        }
    }
}
onMounted( async() => {
    await loadProfileDataToForm();
    await loadProvinces();
})
</script>

<template>
    <section class="p-4">

            <!-- เริ่ม ฟอร์ม -->
            <h1 class="my-4 text-lg mb-2"><strong>{{ $t('ข้อมูลส่วนตัว') }}</strong></h1>
            
            <Form @submit="onSubmit">
            <div class="grid grid-cols-1 gap-2 mb-5 card">
                <div class="">
                    <TmmTypographyLabelForm :label="$t('เบอร์โทรศัพท์มือถือ')" />
                    <TmmInputPhon v-model="phone_no" :placeholder="$t('เบอร์โทร')" />
                    <TmmTypographyTextValidator v-if="errors.phone_no" :errors="errors.phone_no" />
                </div>
                <div class="">
                    <TmmTypographyLabelForm label="คำนำหน้า" />
                    <TmmInputDropDown v-model="title_name" :options="optionTitleName" optionLabel="name" optionValue="name"
                        placeholder="คำนำหน้า" className=" w-full" />
                    <TmmTypographyTextValidator v-if="errors.title_name" :errors="errors.title_name" />
                </div>
                <div class="">
                    <TmmTypographyLabelForm :label="$t('ชื่อ')" />
                    <TmmInput v-model="first_name" :placeholder="$t('ชื่อ')" />
                    <TmmTypographyTextValidator v-if="errors.first_name" :errors="errors.first_name" />
                </div>
                <div class="">
                    <TmmTypographyLabelForm :label="$t('นามสกุล')" />
                    <TmmInput v-model="last_name" :placeholder="$t('นามสกุล')" />
                    <TmmTypographyTextValidator v-if="errors.last_name" :errors="errors.last_name" />
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="$t('เลขบัตรประชาชน')" />
                    <TmmInput v-model="cid" :placeholder="$t('เลขบัตรประชาชน')" />
                    <TmmTypographyTextValidator v-if="errors.cid" :errors="errors.cid" />
                </div>
                <div class="">
                    <TmmTypographyLabelForm :label="$t('ชื่อเล่น')" />
                    <TmmInput v-model="nick_name" :placeholder="$t('ชื่อเล่น')" />
                    <TmmTypographyTextValidator v-if="errors.nick_name" :errors="errors.nick_name" />
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="$t('จังหวัด')" />
                    <TmmInputDropDown v-model="province_id" className="w-full" :options="resProvincesOption"
                        optionLabel="name_th" optionValue="id" :placeholder="$t('เลือกจังหวัด')"
                        @change="handleProvinceChange" />
                    <TmmTypographyTextValidator v-if="errors.province_id" :errors="errors.province_id" />
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="$t('อำเภอ')" />
                    <TmmInputDropDown v-model="amphure_id" className="w-full" :options="resAmphuresOption"
                        optionLabel="name_th" optionValue="id" :placeholder="$t('เลือกอำเภอ')"
                        @change="handleAmphureChange" />
                    <TmmTypographyTextValidator v-if="errors.amphure_id" :errors="errors.amphure_id" />
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="$t('ตำบล')" />
                    <TmmInputDropDown v-model="district_id" className="w-full" :options="resDistrictsOption"
                        optionLabel="name_th" optionValue="id" :placeholder="$t('เลือกตำบล')"
                        @change="handleDistrictChange" />
                    <TmmTypographyTextValidator v-if="errors.district_id" :errors="errors.district_id" />
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="$t('ไปรษณีย์')" />
                    <TmmInput v-model="zipcode" :disabled="!district_id" :placeholder="$t('ไปรษณีย์')" />
                    <TmmTypographyTextValidator v-if="errors.zipcode" :errors="errors.zipcode" />
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="$t('ภาษี')" />
                    <TmmInput v-model="tax" :disabled="!district_id" :placeholder="$t('ภาษี')" />
                    <TmmTypographyTextValidator v-if="errors.tax" :errors="errors.tax" />
                </div>

                <div class="">
                    <TmmTypographyLabelForm :label="$t('อีเมลล์')" />
                    <TmmInputEmail v-model="email" :placeholder="$t('อีเมลล์')" />
                    <TmmTypographyTextValidator v-if="errors.email" :errors="errors.email" />
                </div>
            </div>


            <hr class="my-3">
            <!-- คำแนะนำ -->
            <p class="font-light text-sm mb-5">
                {{ $t('หากต้องการแก้ไขข้อมูลส่วนตัว เช่น ชื่อ-นามสกุล วันเดือนปีเกิดหรือที่อยู่ตามทะเบียนบ้านกกรุณานำบัตรประชาชนไปติดต่อแก้ไขที่ร้านมิกซ์แวลูส์ได้ทุกสาขา') }}
            </p>
            <!-- จบคำแนะนำ -->
            <!-- ปุ่มบันทึก -->
            <div class="flex flex-col justify-center">
                <TmmButtonSave :label="$t('บันทึก')" type="submit" class="w-full mb-5" severity="success" />
            </div>
            <!-- จบปุ่มบันทึก -->

            <!-- ปุ่มยกเลิก -->
            <div class="flex justify-center">
                <span class="underline text-center text-green-600 font-bold  self-center cursor-pointer">
                    {{ $t('ยกเลิกการแก้ไข') }}
                </span>
            </div>
             <!-- จบปุ่มยกเลิก -->

            </Form>
            <!-- จบฟอร์ม -->
         
        </section>
        <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>