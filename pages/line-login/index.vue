<script setup>
import liff from "@line/liff";
import { ref, onMounted } from "vue";
import Button from "primevue/button";
const liftId = useRuntimeConfig().public.LIFFID;
const liftUrl = useRuntimeConfig().public.LIFFURL;

const profile = ref();
const userData = ref();
const disabledLogin = ref(false);
const disabledLogout = ref(false);

const logOut = () => {
  liff.logout();
  window.location.reload();
};

const logIn = () => {
  liff.login({
    redirectUri: window.location.replace(
      liftUrl
    ),
  });
};

onMounted(() => {
  // getUserProfile()
})
const nameToken = ref('')
const getUserProfile = async () => {
  profile.value = await liff.getProfile();
  console.log(profile.value);
  const accessToken = liff.getAccessToken();
  console.log(accessToken);
  const idToken = liff.getIDToken();
  console.log("ID Token", idToken);
  // alert('idToken',idToken.value)
  nameToken.value = idToken;
  console.log("nameToken", nameToken.value);

  localStorage.setItem("lineUserId", profile.value.userId);
};

onMounted(() => {
  loadData();
});

const loadData = async () => {
  await liff.init({ liffId: liftId });
  if (liff.isInClient()) {
    getUserProfile();
  } else {
    if (liff.isLoggedIn()) {
      getUserProfile();

      disabledLogin.value = true;
      disabledLogout.value = false;
    } else {
      disabledLogin.value = false;
      disabledLogout.value = true;
    }
  }
};
</script>

<template>
  <div>
    <h5>Test line login</h5>
    <div class="text-center">
      <img v-if="profile" :src="profile?.pictureUrl" class="w-[10rem] mb-3" />
      <div>{{ profile?.displayName }}</div>
      <div>{{ profile?.userId }}</div>
      <div>Token:{{ nameToken }}</div>
      <div class="flex align-middle justify-between w-[20rem]">
        <Button label="login" :disabled="disabledLogin" @click="logIn"></Button>
        <Button label="logout" :disabled="disabledLogout" @click="logOut"></Button>
      </div>
    </div>
  </div>
</template>
