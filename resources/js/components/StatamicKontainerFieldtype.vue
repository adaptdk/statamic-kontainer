<template>
    <div>
        <text-input type="text" :value="value" @input="updateDebounced" />
    </div>
</template>

<script>
export default {
    mixins: [Fieldtype],
};
</script>
