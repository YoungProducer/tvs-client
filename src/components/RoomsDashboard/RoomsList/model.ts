import { createEvent, createStore } from 'effector';

const $expandedRoom = createStore<number>(-1);
const changedExpandedRoom = createEvent<number>();
const resetedExpandedRoom = createEvent();
$expandedRoom.on(changedExpandedRoom, (_, index) => index);
$expandedRoom.reset(resetedExpandedRoom);

export { $expandedRoom, changedExpandedRoom, resetedExpandedRoom };
