import { Divider, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import Audio from './Audio';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import './AudioComponent.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateAudio } from '~/app/editorSlice';
import CloseIcon from '@mui/icons-material/Close';
function AudioComponent() {
    const State = useSelector((state) => state.video);
    const dispatch = useDispatch();
    // useEffect(() => {
    // }, [audioState]);
    return (
        <Stack className="subtitleComponent-container">
            <h1 className="subtitle-title">Audio</h1>
            {State.audio.map((data) => {
                return (
                    <Stack justifyContent="flex-start" sx={{ margin: 1 }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack direction="row">
                                <button
                                    className="music-play-button"
                                    // onClick={() => playMusic(music.url)}
                                >
                                    ⏸️
                                </button>
                                <Stack className="music-info" style={{ fontSize: 12 }}>
                                    <p className="music-name">{data.name}</p>
                                    {/* <p className="music-length">{data.duration}</p> */}
                                </Stack>
                            </Stack>
                            <CloseIcon
                                sx={{ cursor: 'pointer' }}
                                onClick={() => {
                                    const arr = [];
                                    for (let item of State.audio) {
                                        let temp = item;
                                        if (item.name !== data.name) {
                                            arr.push(temp);
                                        }
                                    }
                                    dispatch(updateAudio(arr));
                                }}
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ border: '1px solid #DFE0E5', fontSize: 12 }}
                        >
                            <AccessAlarmIcon />
                            <p style={{ color: '#8F9199' }}>Start</p>
                            <input
                                placeholder={data.start}
                                onBlur={(e) => {
                                    // set
                                    const arr = [];
                                    for (let item of State.audio) {
                                        let temp = item;
                                        if (item.name === data.name) {
                                            if (
                                                State.totalDuration >
                                                parseFloat(e.target.value) + parseFloat(data.duration)
                                            ) {
                                                temp = { ...item, start: parseFloat(e.target.value) };
                                            }
                                        }
                                        arr.push(temp);
                                    }
                                    dispatch(updateAudio(arr));
                                    // dispatch(updateAudio(data));
                                }}
                                style={{ margin: '0', width: 40 }}
                            ></input>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <p>{parseFloat(data.start) + parseFloat(data.duration)}</p>
                            <p style={{ color: '#8F9199' }}>End</p>
                            <AccessAlarmIcon />
                        </Stack>
                    </Stack>
                );
            })}
        </Stack>
    );
}

export default AudioComponent;
