
<template>
    <div>
        <!-- {{props.chartData}} -->
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';
import * as dataDashboard from './api/dataDashboard';

const chartData = ref();
const chartOptions = ref();
const data = ref();

onMounted(async () => {
    data.value = await dataDashboard.getDashboardPo();
    let res = data.value.data.sum_po_total
    let labels = []
    let values = []
    res.forEach(function (item) {
        labels.push(item.date)
        values.push(item.cc)
    });

    // console.log(`Label : ${labels}`);
    // console.log(`chartData : ${values}`);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    chartData.value = {
        labels: labels,
        datasets: [
            {
                label: 'ข้อมูลใบสั่งซื้อ',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--green-500'),
                yAxisID: 'y',
                tension: 0.4,
                data: values
            }
        ]
    };
    chartOptions.value = {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    drawOnChartArea: false,
                    color: surfaceBorder
                }
            }
        }
    };
});

</script>