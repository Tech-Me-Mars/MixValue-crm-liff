<template>
  <div v-if="isLineConnected">
    <!-- หาก Connect Line เสร็จแล้วให้ Render Child Component ได้ -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import liff from "@line/liff";
import { initFlowbite } from "flowbite";
import { jwtDecode } from "jwt-decode";

import * as dataApi from "@/service/CheckRegisterService";
const { locales, locale, setLocale } = useI18n();
const liftId = useRuntimeConfig().public.LIFFID;
const liftUrl = useRuntimeConfig().public.LIFFURL;

// เช็คว่าทำการConnect และLoginเสร็จยัง
const isLineConnected = ref(false);

const loadDefaultLanguage = async () => {
  // โหลดจาก Localมา
  const defaultLangguage = localStorage.getItem('defaultlangguage');
  // หากไม่มี ให้เก็บลง Local
  if (defaultLangguage == null || defaultLangguage == undefined) {
    localStorage.setItem("defaultlangguage", 'th-TH');
  } else {
    // หากมี ให้ดึงมาใช้เมื่อเว็บเปิด
    setLocale(defaultLangguage)
  }
}
loadDefaultLanguage()
const connectLine = async () => {
  isLineConnected.value = false;
  try {
    await liff.init({ liffId: liftId });
    if (liff.isInClient()) {
      console.log('liff.isInClient', liff.isInClient)
      console.log('isInClient == true')
      await loadProfile();

    } else {
      if (liff.isLoggedIn()) {
        console.log('loginแล้ว isLoggedIn == true')
        loadProfile();
      } else {
        logIn()
      }
    }
  } catch (error) {
    isLineConnected.value = true;
    console.error(error)
  }
};

const logIn = () => {
  liff.login({
    redirectUri: window.location.replace(
      liftUrl
    ),
  });
};

//  ทุกครั้งที่เปิดเว็บใหม่ จะทำการขอ Token ใหม่ Profile ใหม่ แล้วเก็บลงLocal Storage
const loadProfile = async () => {
  // liff.closeWindow();
  try {
    await liff.init({ liffId: liftId });
    console.log('loading ... Profile')
    const profile = await liff.getProfile();
    console.log('profile', profile)
    const token = await liff.getIDToken();
    await decodeTokenDetail(token)
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("token", token);

    // สร้างฟังชั่นCheck-registerทุกครั้งที่initใหม่ หากfalseวิ่งไปRegister(ยังไม่เป็นสมาชิก) true=>วิ่งไปหน้าHome

  }
  catch (error) {
    isLineConnected.value = true;
    console.error(error)
  }

}

const checkRegister = async () => {

  try {
    const res = await dataApi.checkRegister();
    console.log('res register', res.status)
  }
  catch (error) {
    // หาก401 จะไปเช็คที่ไฟล์AxiosService เอง

    console.error(error)
  }
}
const decodeTokenDetail = async (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    isLineConnected.value = true;
  }
  catch (error) {
    isLineConnected.value = true;
    console.error(error)
  }
  // โยนเข้าฟังชั่นไปคำนวนเวลาที่เหลือ expire
  // convertTodiff(decoded.exp)
}

// const converted = ref(null);
// const convertTodiff = async (expTimestamp) => {
//   const expDate = new Date(expTimestamp * 1000); // แปลง Unix timestamp เป็น milliseconds
//   const now = new Date();
//   const diffTime = expDate - now;
//   const diffMinutes = Math.ceil(diffTime / (1000 * 60)); // แปลงเป็นนาทีและปัดขึ้น
//   // ตรวจสอบว่า diffMinutes เหลือ 10 หรือน้อยกว่า หากใช่ให้เรียก loadProfile
//   if (diffMinutes <= 10) {
//     await liff.closeWindow();
//     await liff.init({ liffId: "2002791368-w9PAddNB" });
//     loadProfile();
//   }
//   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'GMT' };
//   const gmtDate = expDate.toLocaleString('en-US', options);
//   const localOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
//   const localDate = expDate.toLocaleString('en-US', localOptions);
//   const relative = `In ${diffMinutes} minutes`;
//   startCounter(diffMinutes)
//   converted.value = {
//     GMT: gmtDate,
//     "Your time zone": localDate,
//     Relative: relative
//   };
// }

// const counter = ref(0);
// let intervalId = null;

// const startCounter = async (minutes) => {
//   minutes = await parseInt(minutes)
//   if (minutes <= 10) {
//     stopCounter();
//     await liff.closeWindow();
//     await liff.init({ liffId: "2002791368-w9PAddNB" });
//     return loadProfile();
//   }
//   counter.value = minutes * 60;
//   intervalId = setInterval(() => {
//     if (counter.value > 0) {
//       counter.value--;
//     }
//     if (counter.value <= 1200) {//1200
//       liff.closeWindow();
//       liff.init({ liffId: "2002791368-w9PAddNB" });
//       stopCounter();
//       loadProfile();
//     }
//   }, 1000);
// };

// const stopCounter = () => {
//   clearInterval(intervalId);
// };
// onBeforeUnmount(() => {
//   stopCounter(); // หยุดการนับเมื่อ component ถูกลบ
// });


onMounted(async () => {
  initFlowbite();
  await connectLine();
  checkRegister();
});
</script>
<style>
/* html *{
  padding: 0;
  margin: 0;
} */
body {
  margin: 0px !important;
  padding: 0px !important;
  font-family: "Noto Sans Thai", sans-serif;
}

* {
  font-family: "Noto Sans Thai", sans-serif;
}

.p-datatable.p-datatable-striped .p-datatable-tbody>tr:nth-child(even) {
  background: #f3f3f3;
}

.p-inputtext {
  height: 2.7rem;
}
</style>