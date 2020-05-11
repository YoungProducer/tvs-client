import React from 'react';

import { CreateRoom } from './CreateRoom';
import { Join } from './Join';

const RoomsDashboard = () => {
    return (
        <div>
            <Join />
            <CreateRoom />
        </div>
    );
};

export { RoomsDashboard };
