import React from 'react';

import { CreateRoom } from './CreateRoom';
import { Join } from './Join';
import { RoomsList } from './RoomsList';

const RoomsDashboard = () => {
    return (
        <div>
            <Join />
            <RoomsList />
            <CreateRoom />
        </div>
    );
};

export { RoomsDashboard };
