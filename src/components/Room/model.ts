import { createEvent, createStore, guard, combine } from 'effector';
import socket from 'socket.io-client';

import { Room, $user } from 'components/RoomsDashboard/model';

const io = socket('http://localhost:4000/rooms');

type EditorRoom<T = any> =
    & Pick<Room, 'id' | 'name'>
    & {
        users: string[];
        data: T;
    };

type RoomDataState<T> = EditorRoom<T>[];

interface JoinRoomPayload {
    roomId: string;
    username: string;
}

export const emitJoinRoom = (payload: JoinRoomPayload) => {
    io.emit('join-room', payload);
};

const initialRoomData: RoomDataState<string> = [];

export const $roomId = createStore<string>('');
export const changedRoomId = createEvent<string>();
$roomId.on(changedRoomId, (_, roomId) => roomId);

export const $roomData = createStore<RoomDataState<string>>(initialRoomData);
export const roomJoined = createEvent<EditorRoom>();
$roomData.on(roomJoined, (store, incomingRoom) => {
    const roomExists = store.some(room => room.id === incomingRoom.id);
    return roomExists
        ? store.map(room => room.id === incomingRoom.id
            ? ({
                ...room,
                ...incomingRoom,
            })
            : room)
        : [...store, incomingRoom];
});

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

$roomData.watch(console.log);
