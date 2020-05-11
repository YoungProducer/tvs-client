import { createEvent, createStore, sample, guard } from 'effector';

import { userUpdated, roomCreated, fxCreateRoom } from '../model';
import { $input as $roomname } from '../CreateRoom/model';

export const $input = createStore<string>('');
export const changedInput = createEvent<React.ChangeEvent<HTMLInputElement>>();
export const resetedInput = createEvent();
$input.on(changedInput, (state, event) => event.currentTarget.value);
$input.reset(resetedInput);

export const $joined = createStore<boolean>(false);
export const submitedJoin = createEvent();
export const resetedJoin = createEvent();
$joined.on(submitedJoin, () => true);
$joined.reset(resetedJoin);

export const submited = createEvent<void>();
submited.watch(resetedInput);

guard({
    source: sample({
        source: $input,
        clock: submited,
        target: userUpdated.prepend((value: string) => ({
            name: value,
        })),
    }),
    filter: (value: string) => value.length !== 0,
    target: submitedJoin,
});

guard({
    source: sample($roomname, roomCreated),
    filter: $joined,
    target: fxCreateRoom,
});

$joined.watch(console.log);
