<template>
  <div class="bg-cover min-h-screen bg-white">
    <!-- Header -->
    <NuxtLink :to="('/')">
      <HeaderMenu>
        <div class="flex justify-between items-center w-full">
          <p class="text-2xl text-white mx-auto">{{ ("บัญชีของฉัน") }}</p>
          <span class="mdi mdi-chevron-left text-white self-end" style="font-size: 25px"></span>
        </div>
      </HeaderMenu>
    </NuxtLink>
    <!-- จบ Header -->

    <section class="p-4">
      <!-- แสดงข้อมูล เมนู -->
      <!-- <PageMainmenuListmenu /> -->
      <DataView :value="menuData" class="p-4" :pt="{
        content: { class: 'bg-transparent' },
      }">
        <template #empty>
          <div class="flex flex-col justify-center items-center">
            <p class="mdi mdi-receipt-text-remove-outline mb-1 text-green-600"></p>
            <p>{{ ("ไม่พบใบเสร็จ") }}</p>
          </div>
        </template>
        <template #list="slotProps">
          <div class="flex flex-wrap">
            <div v-for="(item, index) in slotProps.items" :key="index" class="w-full">
              <NuxtLink :to="(`${item.to}`)">
                <div class="flex justify-between font-bold text-lg py-4 border-b-2 border-dark cursor-pointer">
                  <div>
                    <i :class="`${item.icon} mr-3`" style="font-size: 23px"></i>
                    <span>{{ item.name }}</span>
                    <TmmTypographyLabelForm :label="item.date" className="mb-3 text-sm" />
                  </div>
                  <span class="mdi mdi-menu-right text-red-700" style="font-size: 50px"></span>
                </div>
              </NuxtLink>


            </div>
          </div>
        </template>
      </DataView>
      <!-- จบแสดงข้อมูล เมนู -->
    </section>
  </div>
</template>

<script setup>




// ฟังชั่นในการเปลี่ยนภาษา
const changeLanguage = (param) => {
  language.value = param;
};
const { locales, locale, setLocale } = useI18n();
// เมื่อตัวแปร language เปลี่ยน จะทำกา set ภาษา
const language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value);
  },
});

// ข้อมูลเมนู
const menuData = ref([
  {
    name: ("แก้ไขข้อมูลส่วนตัว"),
    icon: "mdi mdi-human-edit",
    to: "/self_info",
    togglelang: false,
  },
  {
    name: ("คูปองของฉัน"),
    icon: "mdi mdi-ticket-percent-outline",
    to: "/coupon",
    togglelang: false,
  },
  {
    name: ("ใบเสร็จ"),
    icon: "mdi mdi-receipt-text",
    to: "/receipt",
    togglelang: false,
  },
  {
    name: ("ดูประวัติการใช้แต้ม"),
    icon: "mdi mdi-button-pointer",
    to: "/history_points",
    togglelang: false,
  },
  {
    name: ("ติดต่อเรา"),
    icon: "mdi mdi-phone",
    to: "/content/contact",
    togglelang: false,
  },
  {
    name: ("ข้อกำหนดและเงื่อนไข"),
    icon: "mdi mdi-pocket",
    to: "/content/terms-and-conditions",
    togglelang: false,
  },
  {
    name: ("นโยบายความเป็นส่วนตัว"),
    icon: "mdi mdi-shield-account-variant-outline",
    to: "/privacy-personal",
    togglelang: false,
  },
  {
    name: ("การจัดการข้อมูลส่วนบุคคล"),
    icon: "mdi mdi-lock-outline",
    to: "/content/privacy",
    togglelang: false,
  },
]);
// จบข้อมูลเมนู
</script>
