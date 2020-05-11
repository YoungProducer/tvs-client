import React from 'react';
import { Link } from 'react-router-dom';
import { useList, useStore } from 'effector-react';

import { $store } from '../model';
import { $expandedRoom, changedExpandedRoom } from './model';
import styles from './styles.module.css';

const RoomsList = () => {
    const rooms = useList($store, (room, index) => {
        const expandedRoomIndex = useStore($expandedRoom);
        const expanded = expandedRoomIndex === index;

        const handleOnClick = () => changedExpandedRoom(index);

        return (
            <li key={index} className={styles.room}>
                <p>{room.name}</p>
                <button onClick={handleOnClick}>Show more</button>
                {expanded && <p>Link: <Link to={room.link}>{room.fullLink}</Link></p>}
            </li>
        );
    });

    return (
        <ul>
            {rooms}
        </ul>
    );
};

export { RoomsList };
