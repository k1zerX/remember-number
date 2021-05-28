<template lang="pug">
div
  h1 Remember the number!

  div.setup(
    v-show="isSetup"
  )
    h2 Setup

    div.length
      div Length: {{ length.value }}
      input(
        type="range"
        :min="length.min"
        :max="length.max"
        v-model="length.value"
      )

    div.showTime
      div Show time: {{ showTime.value }}
      input(
        type="range"
        :min="showTime.min"
        :max="showTime.max"
        :step="showTime.step"
        v-model="showTime.value"
      )

    button(
      @click="show"
    ) show number

  div.show(
    v-show="isShow"
  )
    h2 Show

    div.number {{ number }}

  div.enter(
    v-show="isEnter"
  )
    h2 Enter

    input(
      type="number"
      v-model="input"
    )
    button(
      @click="enter"
    ) Enter number

  div.finished(
    v-show="isFinished"
  )
    div.success(
      v-show="isSuccess"
    )
      h2 Success

    div.fail(
      v-show="isFail"
    )
      h2 Fail

    button(
      @click="reset"
    ) Try again
</template>

<script>
import { computed } from 'vue';
import useRememberNumber from '@/composables/remember-number.js';

export default {
  name: 'RememberNumber',
  setup() {
    const {
      StateEnum,
      state,
      number,
      show,
      enter,
      reset,
      length,
      showTime,
      input,
    } = useRememberNumber({
      lengthOpt: { min: 2, max: 5 },
      showTimeOpt: { min: 0.2, max: 2, step: 0.1 },
    });

    const isSetup = computed(() => state.value == StateEnum.Setup);
    const isShow = computed(() => state.value == StateEnum.Show);
    const isEnter = computed(() => state.value == StateEnum.Enter);
    const isSuccess = computed(() => state.value == StateEnum.Success);
    const isFail = computed(() => state.value == StateEnum.Fail);
    const isFinished = computed(() => isSuccess.value || isFail.value);
    
    return {
      isSetup,
      isShow,
      isEnter,
      isSuccess,
      isFail,
      isFinished,
      number,
      length,
      showTime,
      input,
      show,
      enter,
      reset,
    };
  },
}
</script>

<style lang="scss" scoped>
</style>
