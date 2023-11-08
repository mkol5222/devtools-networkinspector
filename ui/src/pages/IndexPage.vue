<template>
  <q-page class="row items-center justify-evenly">
    <NetworkRequestsComponent ref="netRequests"></NetworkRequestsComponent>
  </q-page>
</template>

<script lang="ts">

import NetworkRequestsComponent from 'components/NetworkRequestsComponent.vue';
import { defineComponent, } from 'vue';


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
  created() {
    console.log('created', this.$refs.netRequests);

  },
  mounted() {
    console.log('mounted', this.$refs.netRequests);
    for (const req of requests) {
      this.$refs.netRequests?.addRequest({ ...req, ts: Date.now() });

      if (chrome?.devtools?.network) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const thisComponent = this;
        chrome.devtools.network.onRequestFinished.addListener(function (request) {
          if (request.request.method === 'POST' && (request.request.url.indexOf("graphql") !== -1
            || request.request.url.indexOf("app/threathunting/prod-gcp-apollo/") !== -1)) { // URL contains string graphql or is Threat Hunting API
            console.log('request', request);

            let parsedBody;

            try {
              parsedBody = JSON.parse(request.request.postData.text);
            } catch (e) {
              console.log('error parsing body', e);
            }

            const operationName = parsedBody?.operationName;
            const graphQLQuery = parsedBody?.query;
            const graphQLVariables = parsedBody?.variables;

            request.getContent(function (content, encoding) {
              console.log('content', content);

              let parsedResponse;
              try {
                parsedResponse = JSON.parse(content);
              } catch (e) {
                console.log('error parsing response', e);
              }

              const graphQLResponse = parsedResponse;

              thisComponent.$refs.netRequests?.addRequest({
                ts: Date.now(),
                url: request.request.url,
                method: request.request.method,
                status: request.response.status,
                statusText: request.response.statusText,
                operationName,
                graphQLQuery,
                graphQLVariables,
                graphQLResponse
                //graphQLQuery: request.request.postData.text,
              });
            });



          }
        });
      }
    }
  },
  setup() {

    return { requests };
  }
});
</script>
