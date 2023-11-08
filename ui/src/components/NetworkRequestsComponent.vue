<template>
  <q-card style="min-height:100vh" class="my-card bg-secondary text-white full-width">
    <q-card-section>
      <q-table title="Network Requests" :rows="requests" :columns="columns" row-key="name" :filter="filter">

        <template v-slot:body-cell-method="props">
          <q-td :props="props">
            <div>
              <q-badge color="purple" :label="props.value" />
            </div>
            <div class="my-table-details">
              {{ props.row.details }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-url="props">
          <q-td :props="props">
            <div>





              <!-- <q-badge color="blue" :label="props.value" > -->
              <div >
                
                {{ props.value }}
                <q-badge  align="middle" color="grey">
                  <q-icon size="xs" name="file_copy" @click="copy(props.value, props.rowIndex)" />
                <q-tooltip :hide-delay="1000" :ref="(el => storeElRef(el, props.rowIndex))" :no-parent-event="true"
                  anchor="center left" self="center right" :offset="[5, 0]">Copied</q-tooltip>
                </q-badge>
              </div>
              <!-- </q-badge> -->
            </div>
            <div class="my-table-details">
              {{ props.row.details }}
            </div>
          </q-td>
        </template>

        <template v-slot:top-right  >
          <div class="row q-gutter-md">
          <q-btn @click="deleteAllRequests" size="md" round color="red" icon="delete"  />

          <q-input style="width: 250px;" clearable borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { copyTextToClipboard } from '../utils/clipboard';
import { transpileModule } from 'typescript';
import { TouchSwipe } from 'quasar';
console.log(copyTextToClipboard);

export default defineComponent({
  name: 'NetworkRequestsComponent',
  props: [ 
  ],
  methods: {
    addRequest(request) {
      console.log('addRequest', request);
      this.requests.push(request);
    },
    deleteAllRequests() {
      this.requests = [];
      console.log('deleteAllRequests');
    
    },
    storeElRef(el, rowIndex) {
      console.log('storeElRef', el)
      this.copiedTooltips[rowIndex] = el;
    },
    copy(text: string, rowIndex) {
      copyTextToClipboard(text);
      console.log('tooltip', this.copiedTooltips?.[rowIndex])
      const tooltip = this.copiedTooltips?.[rowIndex];
      tooltip?.show();
      setTimeout(() => {
        tooltip?.hide();
      }, 1000);
      // this.copiedTooltip[rowIndex].show();
      // this.showCopied(rowIndex);
    },

  },
  data: () => ({
    requests: [],
    copiedTooltips: [],
    filter: null,
    showingCopied: [],
    columns: [
      {
        name: 'operationName',
        align: 'left',
        label: 'GraphQL Operation',
        field: 'operationName',
        sortable: true,
      },
      {
        name: 'graphQLQuery',
        align: 'left',
        label: 'GraphQL Query',
        field: 'graphQLQuery',
        sortable: true,
      },
      {
        name: 'graphQLResponse',
        align: 'left',
        label: 'GraphQL Response',
        field: 'graphQLResponse',
        sortable: true,
      },
      {
        name: 'method',
        align: 'left',
        label: 'Method',
        field: 'method',
        sortable: true,
      },
      {
        name: 'url',
        align: 'left',
        label: 'URL',
        field: 'url',
        sortable: true,
      },
      {
        name: 'status',
        align: 'left',
        label: 'Status',
        field: 'status',
        sortable: true,
      },
      {
        name: 'statusText',
        align: 'left',
        label: 'Status text',
        field: 'statusText',
        sortable: true,
      },
    ],
  }),
});
</script>
