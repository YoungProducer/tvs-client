import { createEvent, createStore, guard, combine, sample, forward, Store } from 'effector';
import socket from 'socket.io-client';

import { Room, $user } from 'components/RoomsDashboard/model';

const io = socket('http://localhost:4000/rooms');

type EditorRoom<T = any> =
    & Pick<Room, 'id' | 'name'>
    & {
        users: string[];
        data?: T;
    };

type RoomDataState<T> = EditorRoom<T>;

interface JoinRoomPayload {
    roomId: string;
    username: string;
}

interface ChangeTextPaylaod {
    roomId: string;
    value: string;
}

export const emitJoinRoom = (payload: JoinRoomPayload) => {
    io.emit('join-room', payload);
};

export const emitChangeText = (payload: ChangeTextPaylaod) => {
    io.emit('text-change', payload);
};

const initialRoomData: RoomDataState<string> = {
    id: '',
    name: '',
    users: [],
};

export const $roomId = createStore<string>('');
export const changedRoomId = createEvent<string>();
$roomId.on(changedRoomId, (_, roomId) => roomId);

export const $roomData = createStore<RoomDataState<string>>(initialRoomData);
export const roomJoined = createEvent<EditorRoom>();
export const roomDataChanged = createEvent<React.ChangeEvent<HTMLTextAreaElement>>();
export const roomDataChangedResponse = createEvent<string>();
$roomData.on(roomJoined, (store, incomingRoom) => ({
    ...store,
    ...incomingRoom,
}));
$roomData.on(roomDataChanged, (store, event) => ({
    ...store,
    data: event.currentTarget.value,
}));
$roomData.on(roomDataChangedResponse, (store, value) => ({
    ...store,
    data: value,
}));

const joinRoom = createEvent<JoinRoomPayload>();
joinRoom.watch(emitJoinRoom);

io.on('join-room-response', roomJoined);

guard<JoinRoomPayload>({
    source: combine($user, $roomId, (user, roomId) => ({
        roomId,
        username: user.name,
    })),
    filter: (data) => data.username.length > 0 && data.roomId.length > 0,
    target: joinRoom,
});

export const changeText = createEvent<ChangeTextPaylaod>();
changeText.watch(emitChangeText);

io.on('text-change-response', roomDataChangedResponse);

sample(
    $roomId,
    roomDataChanged,
    (roomId, event) => changeText({
        roomId,
        value: event.currentTarget.value,
    }),
);
