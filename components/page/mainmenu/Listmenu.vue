<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();

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
    name: t("แก้ไขข้อมูลส่วนตัว"),
    icon: "mdi mdi-human-edit",
    to: "/self_info",
    togglelang: false,
  },
  {
    name: t("คูปองของฉัน"),
    icon: "mdi mdi-ticket-percent-outline",
    to: "/coupon",
    togglelang: false,
  },
  {
    name: t("ใบเสร็จ"),
    icon: "mdi mdi-receipt-text",
    to: "/receipt",
    togglelang: false,
  },
  {
    name: t("ดูประวัติการใช้แต้ม"),
    icon: "mdi mdi-button-pointer",
    to: "/history_points",
    togglelang: false,
  },
  { name: t("ภาษา"), icon: "mdi mdi-web", to: "/", togglelang: true },
  {
    name: t("ติดต่อเรา"),
    icon: "mdi mdi-phone",
    to: "/content/contact",
    togglelang: false,
  },
  {
    name: t("ข้อกำหนดและเงื่อนไข"),
    icon: "mdi mdi-pocket",
    to: "/content/terms-and-conditions",
    togglelang: false,
  },
  {
    name: t("นโยบายความเป็นส่วนตัว"),
    icon: "mdi mdi-shield-account-variant-outline",
    to: "/privacy-personal",
    togglelang: false,
  },
  {
    name: t("การจัดการข้อมูลส่วนบุคคล"),
    icon: "mdi mdi-lock-outline",
    to: "/content/privacy",
    togglelang: false,
  },
]);
// จบข้อมูลเมนู
</script>

<template>
  <DataView
    :value="menuData"
    class="p-4"
    :pt="{
      content: { class: 'bg-transparent' },
    }"
  >
    <template #empty>
      <div class="flex flex-col justify-center items-center">
        <p class="mdi mdi-receipt-text-remove-outline mb-1 text-green-600"></p>
        <p>{{ $t("ไม่พบใบเสร็จ") }}</p>
      </div>
    </template>
    <template #list="slotProps">
      <div class="flex flex-wrap">
        <div
          v-for="(item, index) in slotProps.items"
          :key="index"
          class="w-full"
        >
          <NuxtLink v-if="!item.togglelang" :to="localPath(`${item.to}`)">
            <div
              class="flex justify-between font-bold text-lg py-4 border-b-2 border-dark cursor-pointer"
            >
              <div>
                <i :class="`${item.icon} mr-3`" style="font-size: 23px"></i>
                <span>{{ item.name }}</span>
                <TmmTypographyLabelForm
                  :label="item.date"
                  className="mb-3 text-sm"
                />
              </div>
              <span
                class="mdi mdi-menu-right text-red-700"
                style="font-size: 50px"
              ></span>
            </div>
          </NuxtLink>

          <div
            v-else
            class="flex justify-between font-bold text-lg py-4 border-b-2 dark cursor-pointer"
          >
            <div>
              <i :class="`${item.icon} mr-3`" style="font-size: 23px"></i>
              <span>{{ item.name }}</span>
              <TmmTypographyLabelForm
                :label="item.date"
                className="mb-3 text-sm"
              />
            </div>
            <!-- <Dropdown
              v-model="language"
              :options="locales"
              optionValue="code"
              optionLabel="name"
              :placeholder="$t('เลือกภาษา')"
              class="w-[10rem] text-center"
            >
              <template #option="slotProps">
                <div class="flex items-center">
                  <img
                    :src="slotProps.option.flag"
                    style="width: 20px; height: 13.4px"
                  />
                  {{ slotProps.option.name }}
                </div>
              </template>
            </Dropdown> -->
            <!-- <span class="p-buttonset">
              <TmmButton @click="changeLanguage('th-TH')" severity="danger"  class="h-auto" :outlined="language!='th-TH'" >
                <img src="/image/flag/flag-thailand.png" class="w-[1.5rem]" />
              </TmmButton>
              <TmmButton @click="changeLanguage('en-US')" severity="danger"  class="h-auto" :outlined="language!='en-US'">
                <img src="/image/flag/flag-us.png" class="w-[1.5rem]" />
              </TmmButton>
            </span> -->
            <!-- <div class="flex gap-2">
              <span  @click="changeLanguage('th-TH')" :class="['fi', 'fi-th', { 'grayscale': language !== 'th-TH' }]"></span>
              <span @click="changeLanguage('en-US')" :class="['fi', 'fi-gb', { 'grayscale': language !== 'en-US' }]"></span>
            </div> -->
            <Changelang />
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
