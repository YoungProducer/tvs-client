import { createEvent, createStore, createEffect } from 'effector';
import axios from 'axios';

export interface Room {
    name: string;
    id: string;
    link: string;
    fullLink: string;
}

export type RoomsState = Room[];

export interface UserData {
    name: string;
}

const initialState: RoomsState = [];

export interface CreateRoomResponse {
    room: {
        id: string;
        name: string;
    };
}

export const fxCreateRoom = createEffect({
    handler: async (roomName: string) => {
        const response = await axios.post('http://localhost:4000/room', {
            roomName,
        });

        return response.data as CreateRoomResponse;
    },
});

export const $store = createStore(initialState);
$store.on(fxCreateRoom.doneData, (store, { room }) => [
    ...store,
    {
        id: room.id,
        name: room.name,
        link: `/room/${room.id}`,
        fullLink: `http://localhost:3000/room/${room.id}`,
    }],
);

const userInitialState: UserData = {
    name: '',
};

export const $user = createStore(userInitialState);
export const userUpdated = createEvent<Partial<UserData>>();
$user.on(userUpdated, (store, data) => ({
    ...store,
    ...data,
}));

export const roomCreated = createEvent<React.FormEvent>();
