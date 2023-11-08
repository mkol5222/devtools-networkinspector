<template>
    <div @click="dialog = !dialog">
        <q-dialog v-model="dialog">
            <v-card>
                <v-card-title>
                    <span class="headline">Hello World</span>
                </v-card-title>
            {{ text  }}
        </v-card>
        </q-dialog>
        {{ truncatedText }}
        <q-tooltip>
            {{ text }}
        </q-tooltip>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["text", "maxChars"],
    name: 'TruncatedText',
    data: () => ({
        dialog: false,
    }),
    computed: {
        truncatedText() {
            if (this.text.length > this.maxChars) {
                return this.text.substring(0, this.maxChars) + "...";
            }
            return this.text;
        }
    }
});
</script>