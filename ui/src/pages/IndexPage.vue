<template>
  <q-page class="row items-center justify-evenly">
    <NetworkRequestsComponent></NetworkRequestsComponent>
  </q-page>
</template>

<script lang="ts">

import NetworkRequestsComponent from 'components/NetworkRequestsComponent.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { NetworkRequestsComponent },
  setup () {

    return {  };
  }
});
</script>
