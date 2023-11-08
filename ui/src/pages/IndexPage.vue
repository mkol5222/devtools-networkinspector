<template>
  <q-page class="row items-center justify-evenly">
    <NetworkRequestsComponent ref="netRequests"></NetworkRequestsComponent>
  </q-page>
</template>

<script lang="ts">

import NetworkRequestsComponent from 'components/NetworkRequestsComponent.vue';
import { TouchSwipe } from 'quasar';
import { defineComponent, ref } from 'vue';


const requests = [
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
];

export default defineComponent({
  name: 'IndexPage',
  components: { NetworkRequestsComponent },
  mounted() {
    console.log('mounted', this.$refs.netRequests);
    for (const req of requests) {
      this.$refs.netRequests?.addRequest(req);
    }
  },
  setup() {

    return { requests };
  }
});
</script>
