<template>
  <Form class="form">
    <div
        class="form-group"
        v-for="{ as, name, label, ...attrs } in schema.fields"
        :key="name"
    >
      <label class="form-label" :for="name">{{ label }}</label>
      <Field class="form-field" :as="as" :id="name" :name="name" v-bind="attrs" />
      <ErrorMessage class="form-error" :name="name" />
    </div>
    <button class="form-button">{{ schema.button }}</button>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
  name: 'DynamicForm',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  max-width: 25rem;
  margin: 0 auto;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
}
.form-label {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.form-field {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
.form-error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
.form-button {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: var(--color-primary);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
}
.form-button:hover {
  cursor: pointer;
  background-color: var(--color-primary-light);
}
.form-button:active {
  background-color: var(--color-primary-dark);
}
</style>