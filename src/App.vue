<template>
  <v-app>
    <component :is="layout" />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { Layout } from "./types/layout";
import AppLayout from "./views/layouts/AppLayout.vue";
import AuthLayout from "./views/layouts/AuthLayout.vue";

export default defineComponent({
  name: "App",

  setup() {
    const route = useRoute();
    const layout = computed(() => {
      switch (route.meta.layout) {
        case Layout.App:
          return AppLayout;
        case Layout.Auth:
          return AuthLayout;
      }
      return AppLayout;
    });

    return { layout };
  },
});
</script>
