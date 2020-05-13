import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';

import { $joined } from '../RoomsDashboard/Join/model';
import { Join } from '../RoomsDashboard/Join';
import { Editor } from './Editor';
import { changedRoomId } from './model';

const Room = () => {
    const params = useParams();
    const joined = useStore($joined);

    React.useEffect(() => {
        changedRoomId((params as any).id);
    }, [params]);

    return (
        <div>
            <Join />
            {joined && <Editor />}
        </div>
    );
};

export { Room };
