import { Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Timeline from 'react-visjs-timeline';
var second = 360;

function MyVideo({ videoURL, duration }) {
    const [frame, setFrame] = useState(0);
    const videoRef = useRef(null);

    var options = {
        width: '90%',
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
        end: new Date('Fri Apr 14 2023 00:00:00').getTime() + duration,
    };
    const customTimes = {
        a: new Date('Fri Apr 14 2023 00:00:00').getTime(),
        s: new Date('Fri Apr 14 2023 00:00:00').getTime() + duration,
        d: new Date('Fri Apr 14 2023 00:00:00').getTime() + frame * 1000,
    };
    if (videoURL === undefined) {
        videoURL = 'client/public/video.mp4';
    }
    return (
        <Stack direction="column">
            <video
                src={videoURL}
                onTimeUpdate={(e) => {
                    if (e.target.currentTime <= duration / 1000) {
                        setFrame(e.target.currentTime);
                        console.log(frame);
                    }
                }}
                // controls
                autoPlay={true}
                ref={videoRef}
                style={{ width: '90%', height: '100%' }}
            />
            <Timeline
                id="timeline"
                clickHandler={(e) => {
                    videoRef.current.play();
                }}
                timechangeHandler={(e) => {
                    videoRef.current.pause();
                    const date = new Date(e.time);
                    videoRef.current.currentTime = parseInt(date.getSeconds());
                    setFrame(parseInt(date.getSeconds()));
                }}
                options={options}
                customTimes={customTimes}
            />
        </Stack>
    );
}

export default MyVideo;
