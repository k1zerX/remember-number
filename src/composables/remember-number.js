import { computed } from 'vue';

const StateEnum = Object.freeze({
  Setup: 0,
  Show: 1,
  Enter: 2,
  Success: 3,
  Fail: 4,
});

export default function useRememberNumber() {
  let _state = StateEnum.Setup;
  let _number;

  const state = computed(() => _state);
  const number = computed(() => _number);

  const show = async ({ length, showTime }) => {
    if (!Number.isInteger(length)) {
      throw TypeError('Length of number must be an Integer');
    }
    if (length < 1) {
      throw RangeError('Length of number must be at least 1');
    }

    const min = 10 ** length;
    const max = min * 10;

    _number = Math.floor(Math.random() * (max - min)) + min;
    _state = StateEnum.Show;

    setTimeout(() => {
      _state = StateEnum.Enter;
    }, showTime);
  };

  const enter = (input) => {
    _state = _number == input ? StateEnum.Success : StateEnum.Fail;
  };

  const reset = () => {
    _number = undefined;
    _state = StateEnum.Setup;
  };
  
  return {
    StateEnum,
    state,
    number,
    show,
    enter,
    reset,
  };
}
