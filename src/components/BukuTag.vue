<script setup lang="ts">
import router from '@/router';
import { RouterLink } from 'vue-router';

const props = defineProps({
    name: {
        type: String,
        required: true
    }
})

const tagClick = () => {
    router.replace(`/tag/${encodeURI(props.name)}`)
}
</script>

<template>
    <RouterLink :to="`/tag/${name}`"
        class="cursor-pointer text-xs lg:text-sm bg-green-700/30 text-green-700 hover:(bg-green-900/30 text-green-900) px-2 py-1 rounded ">
        {{ name }}
    </RouterLink>
</template>