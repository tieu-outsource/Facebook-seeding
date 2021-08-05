<template>
  <v-btn class="ma-2" dark>
    <v-icon left :color="color">
      {{ icon }}
    </v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  props: ["label", "icon", "color"],
};
</script>

<style></style>
