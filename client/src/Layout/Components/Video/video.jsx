import { Button, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Timeline from 'react-visjs-timeline';
import { setDuration, trimVideo } from '~/app/videoSlice';
var second = 360;

function MyVideo({}) {
    const videoState = useSelector((state) => state.video);
    const [frame, setFrame] = useState(0);
    const [trimStart, settrimStart] = useState(0);
    const [trimDuration, settrimDuration] = useState(1900);
    const videoRef = useRef(null);
    const dispatch = useDispatch();
    const timeChangeHandler = (e) => {
        const date = new Date(e.time);
        if (e.id === 'd') {
            videoRef.current.pause();
            const date = new Date(e.time);
            videoRef.current.currentTime = parseInt(date.getSeconds());
            setFrame(parseInt(date.getSeconds()));
        } else if (e.id === 'start') {
            console.log(parseInt(date.getSeconds() * 1000));
            settrimStart(parseInt(date.getSeconds() * 1000));
        } else {
            console.log(parseInt(date.getSeconds() * 1000));

            settrimDuration(parseInt(date.getSeconds() * 1000));
        }
    };
    const cutVideoHandler = () => {
        console.log((trimDuration - trimStart) / 1000);
        dispatch(
            trimVideo({
                trimStart: trimStart / 1000,
                trimDuration: Math.floor(trimDuration / 1000 - trimStart / 1000),
                source: videoState?.video?.url,
            }),
        );
        settrimStart(0);
    };
    var options = {
        width: '94%',
        height: '100px',
        stack: true,
        showMajorLabels: false,
        showCurrentTime: false,
        zoomMin: 1, // zoomMax: 1,autoResize: true,type: 'background',
        format: {
            minorLabels: {
                second: 's',
                // minute: 'HH:mm',
            },
        },
        start: new Date('Fri Apr 14 2023 00:00:00').getTime(),
        end: new Date('Fri Apr 14 2023 00:00:00').getTime() + videoState?.duration * 1000,
    };
    const customTimes = {
        start: new Date('Fri Apr 14 2023 00:00:00').getTime() + trimStart,
        end: new Date('Fri Apr 14 2023 00:00:00').getTime() + trimDuration - 100,
        d: new Date('Fri Apr 14 2023 00:00:00').getTime() + frame * 1000,
    };
    return (
        <Stack direction="column">
            <video
                src={videoState?.video?.url}
                onTimeUpdate={(e) => {
                    if (frame === 0) {
                        dispatch(setDuration(e.target.duration));
                        settrimDuration(e.target.duration * 1000);
                    }
                    if (e.target.currentTime <= videoState?.duration) {
                        setFrame(e.target.currentTime);
                    }
                }}
                onLoadStart={() => {}}
                // controls
                autoPlay={true}
                ref={videoRef}
                style={{ width: '800px', height: '400px' }}
            />
            <div style={{ marginLeft: '45px' }}>
                <Timeline
                    id="timeline"
                    clickHandler={(e) => {
                        videoRef.current.play();
                    }}
                    timechangeHandler={timeChangeHandler}
                    options={options}
                    customTimes={customTimes}
                />
            </div>
            <Button
                variant="contained"
                component="label"
                sx={{ margin: 'auto', marginTop: 2, marginBottom: 5, width: '200px' }}
                onClick={cutVideoHandler}
            >
                Cut
            </Button>
        </Stack>
    );
}

export default MyVideo;
