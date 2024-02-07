<template>
    <div class="card ">
        <span>ผลิตภัณฑ์</span>
        <div class="flex justify-center">
            <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [540, 325, 702],
                backgroundColor: [
                    documentStyle.getPropertyValue('--blue-500'),
                    documentStyle.getPropertyValue('--yellow-500'),
                    documentStyle.getPropertyValue('--green-500'),
                    documentStyle.getPropertyValue('--orange-500'),
                    documentStyle.getPropertyValue('--purple-500'),
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--blue-400'),
                    documentStyle.getPropertyValue('--yellow-400'),
                    documentStyle.getPropertyValue('--green-400'),
                    documentStyle.getPropertyValue('--orange-400'),
                    documentStyle.getPropertyValue('--purple-400'),

                ]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};
</script>
