<template>
  <div class="form-label-group">
    <input
      v-if="!inputType"
      class="form-control"
      v-bind="$props"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <textarea
      v-if="inputType === 'textarea'"
      class="form-control"
      rows="3"
      v-bind="$props"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>

    <select
      v-if="inputType === 'select'"
      class="form-control"
      v-bind="$props"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option value="-1" text="Seçiniz..." disabled />
      <option v-for="option in inputOptions" :key="option.id" :value="option.id">
        {{ option.value }}
      </option>
    </select>

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
    inputType: String,
    autocomplete: String,
    required: Boolean,
    autofocus: Boolean,
    modelValue: String,
    inputOptions: Array,
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
  label,
  textarea,
  select {
    height: 3.125rem;
    padding: 0.75rem;
  }

  textarea {
    height: 10rem;
  }
  select {
    padding-left: 0.4rem;
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

  input,
  textarea,
  select {
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
    display: flex;
    flex-direction: column-reverse;

    label {
      position: static;
    }

    input::-ms-input-placeholder,
    textarea::-ms-input-placeholder,
    select::-ms-input-placeholder {
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
