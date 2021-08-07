<template>
  <div class="radio radio--vertical">
    <div class="radio__title">{{ label }}</div>
    <div v-for="(option, index) in options" :key="index">
      <input 
        type="radio"
        v-model="model"
        :value="option" 
        :id="option"
      />
      <label :for="option"> {{ option }} </label> 
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  props: ["modelValue", "name", "options", "label"],
  setup(props, { emit }) {
    const model = ref(props.modelValue);
    watchEffect(() => {
      emit("update:modelValue", model.value);
    });
    return { model };
  }
}
</script>

<style lang="scss" scoped>
.radio {
  display: flex;
  flex-direction: column;

  &__title {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  label {
    margin-left: 5px;
  }
}
</style>
