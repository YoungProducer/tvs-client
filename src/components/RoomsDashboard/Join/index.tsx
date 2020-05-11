import React from 'react';
import { useStore } from 'effector-react';

import {
    $input,
    $joined,
    changedInput,
    submited,
} from './model';
import { $user } from '../model';

const Join = () => {
    const user = useStore($user);
    const input = useStore($input);
    const joined = useStore($joined);

    return (
        <div>
            {joined && <p>You are joined as {user.name}</p>}
            {!joined && (
                <>
                    <input type='text' value={input} onChange={changedInput} />
                    <button onClick={() => submited()}>Join as</button>
                </>
            )}
        </div>
    );
};

export { Join };
