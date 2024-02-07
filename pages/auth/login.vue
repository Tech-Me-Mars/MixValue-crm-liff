<template>
    <div class="h-screen flex w-full surface-ground">
        <div class="flex flex-1 flex-column surface-ground items-center justify-center">
            <form @submit="onSubmit">
                <div class="w-[18rem] sm:w-[30rem]">
                    <div class="flex flex-col">
                        <div class="mt-4">
                            <h1 class="m-0 text-primary font-semibold text-4xl">ERP System</h1>
                            <span class="block text-700 mt-2">กรุณากรอกอีเมลล์และรหัสผ่านเพื่อเข้าใช้งานระบบERP</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3 mt-6">
                        <div >
                            <TmmInputEmail v-model="email" class="w-full" />
                            <TmmTypographyTextValidator v-if="errors.email" :errors="errors.email" />
                        </div>
                        <div class="">
                            <TmmInputPassword v-model="password" class="w-full" />
                            <TmmTypographyTextValidator v-if="errors.password" :errors="errors.password" />
                        </div>
                        <div>
                            <button class="p-button p-component w-full" type="submit" aria-label="LOGIN">
                                <span class="p-button-label">LOGIN</span>
                            </button>
                        </div>
                        <div>
                            <button class="p-button p-component p-button-text w-full text-primary-500" type="submit"
                                aria-label="FORGOT PASSWORD?">
                                <span class="p-button-label">FORGOT PASSWORD?</span>
                            </button>
                            <!-- <TmmButton label="เข้าสู่ระบบ" /> -->
                            
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="hidden lg:flex flex-1 items-center justify-center bg-cover"
            style="background-image: url('https://ultima.primevue.org/demo/images/pages/accessDenied-bg.jpg');">
            <img src="https://ultima.primevue.org/layout/images/logo/vector_logo.png" alt="">
        </div>
    </div>

    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
import * as dataApi from './api/data.js';
import { useRouter } from "vue-router";
//! /////// [validation import] /////////
import { useField, useForm, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

// *******USE ROUTER *************
const router = useRouter();
// ************* [ LOADING BTN ]
const loadingBtn = ref(false);

const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({})

//! /////// [validation] /////////
const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        password: zod.string().nonempty(requireValue).default(""),
        email: zod.string().email({ message: 'กรุณาระบุข้อมูลในรูปแบบอีเมลล์' }).default(""),

    })
);
const { handleSubmit, errors } = useForm({
    validationSchema,
});
const { value: password } = useField("password");
const { value: email } = useField("email");

const onSubmit = handleSubmit(async (values) => {
    loadingBtn.value = true
    try {
        const rs = await dataApi.login(values);
        alertToast.value = { severity: 'success', summary: 'ทำรายการสำเร็จ', detail: rs.data.message };
        localStorage.setItem("token", rs.data.data.authorization.token);
        // เก็บรูปและชื่อ
        localStorage.setItem("avatar", rs.data.data.user._employee.avatar_image);
        localStorage.setItem("fullname", `${rs.data.data.user._employee.title_name} ${rs.data.data.user._employee.first_name} ${rs.data.data.user._employee.last_name}`);
        if (rs.data.data.user_position.warehouse) {
            localStorage.setItem("position_code", rs.data.data.user_position.warehouse.position_code ? rs.data.data.user_position.warehouse.position_code : "");
            localStorage.setItem("position_name", rs.data.data.user_position.warehouse.position_name ? rs.data.data.user_position.warehouse.position_name : "");
            if (rs.data.data.user_position.warehouse.can_approved == 1) {
                localStorage.setItem("can_approved", true);
            } else {
                localStorage.setItem("can_approved", false);
            }
        }
        await router.push("/");
    }
    catch (error) {
        loadingBtn.value = false;
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
    loadingBtn.value = false;
});

definePageMeta({
    layout: false,
});
</script>