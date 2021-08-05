<template>
  <div class="button-select">
    <button-icon
      @click="show = !show"
      :label="label"
      :color="color"
      :icon="icon"
    />
    <v-list v-show="show" class="button-select__list">
      <v-list-item @click="onClick">
        <v-list-item-title>Option 1</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Option 2</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { ref } from "vue";
import ButtonIcon from "./ButtonIcon.vue";

export default {
  components: { ButtonIcon },
  props: {
    label: String,
    color: String,
    icon: {
      type: String,
      default: "mdi-dots-vertical",
    },
  },
  setup() {
    const show = ref(false);
    return { show };
  },
};
</script>

<style lang="scss" scoped>
.button-select {
  position: relative;
  &__list {
    position: absolute;
    z-index: 99;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
}
</style>
