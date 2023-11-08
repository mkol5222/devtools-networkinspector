<template>
    <div @click="dialog = !dialog">
        <q-dialog v-model="dialog">
            <q-card>
                <q-card-section>
                    <span class="headline">Details</span>
                </q-card-section>
                <q-card-section>
                    {{ text }}
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