
<template>
    <div class=" flex justify-center">
        <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from "vue";
import * as dataDashboard from './api/dataDashboard'
import Chart from 'primevue/chart';
const data = ref()

const chartData = ref();
const chartOptions = ref({
    plugins: {
        legend: {
            labels: {
                usePointStyle: true
            }
        }
    }
});

onMounted(async () => {
    data.value = await dataDashboard.getDashboardSupplier()
    let res = data.value.data.count_supplier_limit_5
    let labels = []
    let values = []
    res.forEach(function (item, index) {
        labels.push(item.supplier_product_category_name)
        values.push(item.cc)
    });

    // console.log(`labels : ${JSON.stringify(labels)}`);
    // console.log(`values : ${JSON.stringify(values)}`);

    const documentStyle = getComputedStyle(document.body);
    let backgroundColor = [
        documentStyle.getPropertyValue('--blue-500'),
        documentStyle.getPropertyValue('--yellow-500'),
        documentStyle.getPropertyValue('--green-500'),
        documentStyle.getPropertyValue('--orange-500'),
        documentStyle.getPropertyValue('--purple-500'),
    ]

    let hoverBackgroundColor = [
        documentStyle.getPropertyValue('--blue-400'), 
        documentStyle.getPropertyValue('--yellow-400'), 
        documentStyle.getPropertyValue('--green-400'),
        documentStyle.getPropertyValue('--orange-400'),
        documentStyle.getPropertyValue('--purple-400'),

    ]

    chartData.value = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor,
                hoverBackgroundColor
            }
        ]
    };
});

</script>