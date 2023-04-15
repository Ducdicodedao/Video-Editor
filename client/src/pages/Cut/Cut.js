import { upload } from '@testing-library/user-event/dist/upload';
import React, { useState, useCallback } from 'react';
import Video from '~/components/Video';
import Timeline from 'react-visjs-timeline';
var second = 1000;

function Cut() {
    const [videoState, setVideoState] = useState({ type: 'empty' });
    // const [Time, setTime] = useState(0);

    const TimeRef = React.useRef(0);

    const handleChange = async (event) => {
        if (event.target.files === null) {
            return;
        }
        const file = event.target.files[0];
        const blobUrl = URL.createObjectURL(file);
        setVideoState({ type: 'blob', url: blobUrl });
        const cloudUrl = await upload(file); // upload to cloud and get URL
        setVideoState({ type: 'cloud', url: cloudUrl });
        URL.revokeObjectURL(blobUrl);
    };
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: videoState.url,
                type: 'video/mp4',
            },
        ],
    };
    const handlePlayerReady = useCallback((player) => {
        playerRef.current = player;
        // You can handle player events here, for example:
        player.on('waiting', () => {
            console.log('player is waiting');
        });
        player.on('dispose', () => {
            console.log('player will dispose');
        });
        player.on('timeupdate', function () {
            // get the current time of the player
            // set the state of the player with the current time
            // setTime(this.currentTime());
            TimeRef.current = this.currentTime();
            console.log(TimeRef.current);
        });
    }, []);
    var options = {
        width: '900px',
        height: '200px',
        stack: true,
        showMajorLabels: false,
        showCurrentTime: true,
        zoomMin: 1,
        // zoomMax: 1,
        autoResize: true,
        type: 'background',
        format: {
            minorLabels: {
                millisecond: 'SSS',
                second: 's',
                minute: 'HH:mm',
            },
        },
        start: new Date().getTime(),
        end: new Date().getTime() + second + 500,
    };

    const customTimes = {
        one: new Date().getTime() + 100,
        two: new Date().getTime() + second,
        three: new Date().getTime() + TimeRef.current * second,
    };
    return (
        <div>
            {videoState.type !== 'empty' ? <div>sss</div> : null}
            <div>Rest of app here</div>
            <Video options={videoJsOptions} onReady={handlePlayerReady} />
            <div>Rest of app here</div>
            <Timeline
                id="timeline"
                onChange={() => {}}
                // items={items}
                options={options}
                customTimes={customTimes}
            />
            <input type="file" onChange={handleChange} />
        </div>
    );
}

export default Cut;
