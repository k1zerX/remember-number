<template lang="pug">
div
  h1 Remember the number!

  div.setup(
    v-show="isSetup"
  )
    h2 Setup

    div.length
      div Length: {{ length }}
      input(
        type="range"
        min="2"
        max="5"
        step="1"
        v-model="length"
      )

    div.showTime
      div Show time: {{ showTime }}
      input(
        type="range"
        min="0.2"
        max="2"
        step="0.1"
        v-model="showTime"
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
    ) Fail
      h2 Success

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
    const { StateEnum, state, number, show, enter, reset, length, showTime, input } = useRememberNumber();

    const isSetup = computed(() => state.value == StateEnum.Setup);
    const isShow = computed(() => state.value == StateEnum.Show);
    const isEnter = computed(() => state.value == StateEnum.Enter);
    const isSuccess = computed(() => state.value == StateEnum.Success);
    const isFail = computed(() => state.value == StateEnum.Fail);
    const isFinished = computed(() => isSuccess.value || isFail.value);

    length.value = 2;
    showTime.value = 0.2;
    
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
