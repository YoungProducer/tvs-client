import React from 'react';
import { useParams } from 'react-router-dom';

import { Join } from '../RoomsDashboard/Join';
import { Editor } from './Editor';
import { changedRoomId } from './model';

const Room = () => {
    const params = useParams();

    React.useEffect(() => {
        changedRoomId((params as any).id);
    }, [params]);

    return (
        <div>
            <Join />
            <Editor />
        </div>
    );
};

export { Room };
