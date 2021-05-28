<template lang="pug">
div.wrapper
  input(
    v-for="index in length"
  )
</template>

<script>
export default {
  name: 'OtpInput',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    length: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  input {
  }
}
</style>
