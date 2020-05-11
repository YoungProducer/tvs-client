import React from 'react';
import { useList } from 'effector-react';

import { $store } from '../model';
import styles from './styles.module.css';

const RoomsList = () => {
    const rooms = useList($store, (room, index) => (
        <li key={index} className={styles.room}>
            <p>{room.name}</p>
        </li>
    ));

    return (
        <ul>
            {rooms}
        </ul>
    );
};

export { RoomsList };
