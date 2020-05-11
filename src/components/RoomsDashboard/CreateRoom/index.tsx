import React from 'react';
import { useStore } from 'effector-react';

import {
    $input,
    changedInput,
    submited,
} from './model';
import {
    $joined,
} from '../Join/model';

const CreateRoom = () => {
    const input = useStore($input);
    const joined = useStore($joined);

    return (
        <div>
            {joined ? (
                <>
                    <input type='text' value={input} onChange={changedInput} />
                    <button onClick={() => submited()}>Create room</button>
                </>
            ) : (
                <p>To create room you must be joined!</p>
            )}
        </div>
    );
};

export { CreateRoom };
