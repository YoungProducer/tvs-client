import React from 'react';
import { useStore } from 'effector-react';

import { roomDataChanged, $roomData } from '../model';

const Editor = () => {
    const roomData = useStore($roomData);

    return (
        <textarea
            value={roomData.data || ''}
            onChange={roomDataChanged}
        />
    );
};

export { Editor };
