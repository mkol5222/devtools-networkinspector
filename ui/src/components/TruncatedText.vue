<template>
    <div @click="dialog = !dialog">
        <q-dialog full-width v-model="dialog">
            <q-card>
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Details</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                    <pre>{{ text }}</pre>
                </q-card-section>

            </q-card>
        </q-dialog>
        {{ truncatedText }}
        <q-tooltip>
            {{ tooltipText }}
        </q-tooltip>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

function truncateText(text: string, maxlength: number) {
    if (text.length > maxlength) {
        return text.substring(0, maxlength) + "...";
    }
    return text;
}

export default defineComponent({
    props: ["text", "maxChars"],
    name: 'TruncatedText',
    data: () => ({
        dialog: false,
    }),
    computed: {
        truncatedText() {
            return truncateText(this.text, this.maxChars);
        },
        tooltipText() {
            return truncateText(this.text, 512);
        }
    }
});
</script>