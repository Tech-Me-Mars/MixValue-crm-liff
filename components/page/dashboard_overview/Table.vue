<template>
    <div class="card min-h-[33rem]" >
        <span>ประเภทสินค้า</span>
        <DataTable :value="products" stripedRows scrollable scrollHeight="480px">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';

onMounted(() => {
    ProductService.getProductsMini().then((data) => (products.value = data));

});

const products = ref();

</script>