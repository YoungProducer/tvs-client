import { createEvent, createStore, sample, guard, createEffect } from 'effector';
import axios from 'axios';

import {
    $joined,
} from './Join/model';
import {
    $input as $roomname,
} from './CreateRoom/model';

export namespace Room {
    export interface State {
        roomId: string;
        linkToRoom: string;
    }
}

export interface UserData {
    name: string;
}

const initialState: Room.State = {
    roomId: '',
    linkToRoom: '',
};

export const fxCreateRoom = createEffect({
    handler: async (username: string) => {
        const response = await axios.post('/room', {
            username,
        });

        return response.data as string;
    },
});

export const $store = createStore(initialState);
$store.on(fxCreateRoom.doneData, (store, roomId) => ({
    ...store,
    roomId,
    linkToRoom: `http://localhost:3000/room/${roomId}`,
}));

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
