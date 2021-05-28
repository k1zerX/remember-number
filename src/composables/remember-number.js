import { ref, computed } from 'vue';

const StateEnum = Object.freeze({
  Setup: 0,
  Show: 1,
  Enter: 2,
  Success: 3,
  Fail: 4,
});

export default function useRememberNumber() {
  let _state = ref(StateEnum.Setup);
  let _number = ref();

  const length = ref();
  const showTime = ref();
  const input = ref();

  const state = computed(() => _state.value);
  const number = computed(() => _number.value);

  const show = async () => {
    const _length = Number.parseInt(length.value);
    const _showTime = Number.parseFloat(showTime.value);

    if (_length < 1) {
      throw RangeError('Length of number must be at least 1');
    }
    if (_showTime <= 0) {
      throw RangeError('Show time of number must be positive');
    }

    const min = 10 ** (_length - 1);
    const max = min * 10;

    _number.value = Math.floor(Math.random() * (max - min)) + min;
    _state.value = StateEnum.Show;

    setTimeout(() => {
      _state.value = StateEnum.Enter;
    }, _showTime * 1000);
  };

  const enter = () => {
    console.log("number: ", _number.value, "input", Number.parseInt(input.value));

    _state.value = _number.value == Number.parseInt(input.value)
        ? StateEnum.Success
        : StateEnum.Fail;
  };

  const reset = () => {
    _number.value = undefined;
    _state.value = StateEnum.Setup;
  };
  
  return {
    StateEnum,
    state,
    number,
    show,
    enter,
    reset,
    length,
    showTime,
    input,
  };
}
