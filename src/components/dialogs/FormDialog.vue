<template>
  <v-dialog @update:modelValue="$emit('update:visible', $event)" :modelValue="visible">
    <v-card elevation="2" shaped tile class="dialog">

      <v-card-header class="dialog__header">
        <v-card-header-text class="dialog__header__text">
          <v-card-title>{{ title }}</v-card-title>
        </v-card-header-text>
      </v-card-header>

      <div class="dialog__body">
        <slot name="body"></slot>
      </div>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Title',
    },
  },
  setup(props) {
    console.log(props)
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  padding: 0px;
  &__header {
    background: #147BD8;
    color: white;
    display: flex;
    justify-content: center;

    &__text {
      display: block !important;
      width: 100% !important;
    }
  }

  &__body {
    background: white;
    padding: 30px;
    min-width: 500px;
    min-height: 300px;
  }
}
</style>
