<template>
  <div class="container">
    <form class="form-auth">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal" v-if="title">{{ title }}</h1>
        <p v-if="description">
          {{ description }}
        </p>
      </div>

      <div class="alert alert-danger" role="alert" v-if="error">
        {{ error }}
      </div>

      <slot></slot>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthFormContainer',
  props: {
    title: String,
    description: String,
    error: String,
  },
});
</script>

<style lang="scss" scoped>
.form-auth {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}
</style>
