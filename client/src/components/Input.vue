<template>
  <div class="form-label-group">
    <input
      class="form-control"
      v-bind="$props"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label :for="id">{{ placeholder }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
  props: {
    id: String,
    placeholder: String,
    type: String,
    autocomplete: String,
    required: Boolean,
    autofocus: Boolean,
    modelValue: String,
  },
  methods: {
    valueHandler(val: string) {
      this.$emit('update:modelValue', val);
    },
  },
});
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;

  input,
  label {
    height: 3.125rem;
    padding: 0.75rem;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    /* Override default `<label>` margin */
    line-height: 1.5;
    color: #495057;
    pointer-events: none;
    cursor: text;
    /* Match the input under the label */
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
    text-align: left;
  }

  input {
    &::placeholder {
      color: transparent;
    }

    &:not(:placeholder-shown) {
      padding-top: 1.25rem;
      padding-bottom: 0.25rem;

      ~ label {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        font-size: 12px;
        color: #777;
      }
    }
  }
}

/* Fallback for Edge
-------------------------------------------------- */
@supports (-ms-ime-align: auto) {
  .form-label-group {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;

    label {
      position: static;
    }

    input::-ms-input-placeholder {
      color: #777;
    }
  }
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
