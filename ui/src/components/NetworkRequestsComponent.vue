<template>

    <q-card class="my-card bg-secondary text-white full-width">
      <q-card-section>
        <q-table
          title="Network Requests"
          :rows="requests"
          :columns="columns"
          row-key="name"
        />
      </q-card-section>
    </q-card>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NetworkRequestsComponent',
  props: {},
  data: () => ({
    requests: [
      {
        url: 'https://www.google.com',
        method: 'GET',
        status: 200,
        statusText: 'OK!',
      },
      {
        url: 'https://www.dev.to',
        method: 'POST',
        status: 200,
        statusText: 'OK',
      },
    ],
    columns: [
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
