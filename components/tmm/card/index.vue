<template>
    <fwb-card href="#">
        <div class="p-5">
            <div class="flex items-center gap-3">
                <img :src="src" class="w-20 h-20" />
                <span class="lg:text-lg md:text-md text-sm font-bold">{{ header }} :  <slot /></span>
            </div>
            <!-- <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center text-center">
                <slot />
            </h5> -->
        </div>
    </fwb-card>
</template>
<script setup>
import { FwbCard } from 'flowbite-vue'

const props = defineProps({
    header: {
        type: String,
        default: "",
    },
    src: {
        type: String,
        default: "/image/image404.jpg",
    },
    content: {
        type: String,
        default: "0",
    },
});

</script>