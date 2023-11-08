<template>
    <q-badge v-if="show" align="middle" color="grey">
        <q-icon size="xs" name="file_copy" @click="copy" />
        <q-tooltip :hide-delay="1000" ref="tooltip" :no-parent-event="true"
            anchor="center left" self="center right" :offset="[5, 0]">Copied</q-tooltip>
    </q-badge>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { copyTextToClipboard } from '../utils/clipboard';


function truncateText(text: string, maxlength: number) {
    if (text.length > maxlength) {
        return text.substring(0, maxlength) + "...";
    }
    return text;
}

export default defineComponent({
    props: ["text"],
    name: 'CopyTextButton',

    computed: {
        show() {
            return this.text.length > 0;
        }
    },
    methods: {
        copy() {
            copyTextToClipboard(this.text);
            this.$refs?.tooltip?.show();
            
            setTimeout(() => {
                this.$refs?.tooltip?.hide();
            }, 1000);
           
        },
    }
});
</script>