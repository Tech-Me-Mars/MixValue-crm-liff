<template>
    <fwb-avatar :img="src?src:image404" :size="size" :rounded="rounded" />
    <!-- <img src="@/assets/image/notfound.jpg" /> -->
</template>

<script setup>
import { FwbAvatar } from 'flowbite-vue'
import image404 from "@/assets/image/notfound.jpg"
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    src: {
        type: String,
        default: "",
    },
    size: {
        type: String,
        default: "md",
    },
    rounded :{
        type: Boolean,
        default: false
    }

});
</script>