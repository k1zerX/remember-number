import { ref, reactive, computed } from 'vue';

const StateEnum = Object.freeze({
  Setup: 0,
  Show: 1,
  Enter: 2,
  Success: 3,
  Fail: 4,
});

export default function useRememberNumber({ lengthOpt, showTimeOpt }) {

  if (lengthOpt.min < 1 || lengthOpt.max < 1) {
    throw RangeError('Length of number must be at least 1');
  }
  if (showTimeOpt.min <= 0 || showTimeOpt.max <= 0) {
    throw RangeError('Show time of number must be positive');
  }

  let _state = ref(StateEnum.Setup);
  let _number = ref();

  const length = reactive({
    value: lengthOpt.min,
    ...lengthOpt,
  });
  const showTime = reactive({
    value: showTimeOpt.min,
    ...showTimeOpt,
  });
  const input = ref();

  const state = computed(() => _state.value);
  const number = computed(() => _number.value);

  const show = async () => {
    const _length = Number.parseInt(length.value);
    const _showTime = Number.parseFloat(showTime.value);

    if (_length < lengthOpt.min || _length > lengthOpt.max) {
      throw RangeError(`Length of number must be between ${ lengthOpt.min } and ${ lengthOpt.max }`);
    }
    if (_showTime < showTimeOpt.min || _showTime > showTimeOpt.max) {
      throw RangeError(`Show time of number must be between ${ showTimeOpt.min } and ${ showTimeOpt.max }`);
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
    _state.value = _number.value == Number.parseInt(input.value)
        ? StateEnum.Success
        : StateEnum.Fail;
  };

  const reset = () => {
    _number.value = undefined;
    _state.value = StateEnum.Setup;

    input.value = undefined;
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
