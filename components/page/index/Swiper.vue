<script setup>
import * as dataApi from "./api/data.js";
const slides = [
    'https://img.salehere.co.th/p/1200x0/2022/05/25/5dq0za8grwmw.jpg', "https://files.eventpass.co/eventpass-api/file/1651117266971.jpeg",
    'https://img.salehere.co.th/p/1200x0/2022/11/24/9tkiici1qg7v.jpg', 'https://img.salehere.co.th/p/1200x0/2022/01/25/xq6azmszim4p.jpg'
]

const resSlider =ref([])
const loadSlider = async() =>{
    try{
        const res = await dataApi.getSlider()
        resSlider.value = res.data.data;
    }catch (error){
        console.error(error)
    }
}
onMounted(()=>loadSlider())
</script>
<template>
    <div>
        <Swiper v-if="resSlider.length >0" class="mb-4" :modules="[SwiperAutoplay, SwiperEffectCreative]" :slides-per-view="1" :loop="true"
            :effect="'creative'" :autoplay="{
                delay: 6000,
                disableOnInteraction: true,
            }" :creative-effect="{
    prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
    },
    next: {
        translate: ['100%', 0, 0],
    },
}">
            <SwiperSlide v-for="(item, index) in resSlider" :key="index">
                <img :src="`${item.image}`" />
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style scoped>
.swiper {
    width: 100%;
    height: 100%;
}
</style>