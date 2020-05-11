import { createEvent, createStore } from 'effector';

export const $input = createStore<string>('');
export const changedInput = createEvent<React.ChangeEvent<HTMLInputElement>>();
export const resetedInput = createEvent();
$input.on(changedInput, (state, event) => event.currentTarget.value);
$input.reset(resetedInput);

export const submited = createEvent<void>();
submited.watch(resetedInput);
