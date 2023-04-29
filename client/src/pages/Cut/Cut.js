import { upload } from '@testing-library/user-event/dist/upload';
import React, { useEffect, useRef, useState } from 'react';
import Video from '~/Layout/Components/Video';
import { useCallback } from 'react';
import { Stack } from '@mui/material';
import VideosUpload from '~/Layout/Components/videosUpload/videosUpload';
function Cut() {
    const [videoState, setVideoState] = useState({ type: 'empty' });
    const [duration, setDuration] = useState(0);
    const handleChange = async (event) => {
        if (event.target.files === null) {
            return;
        }

        //----------------------------------------------------------------------------------------------
        const file = event.target.files[0];
        const video = document.createElement('video');
        // Xử lý khi video được tải lên
        video.onloadedmetadata = () => {
            // Lưu trữ độ dài của video vào biến state
            setDuration(video.duration);
        };
        // Thiết lập source của video để bắt đầu tải lên
        video.src = URL.createObjectURL(file);
        //-------------------------------------------------------------------------------------------------
        const blobUrl = URL.createObjectURL(file);
        setVideoState({ type: 'blob', url: blobUrl });
        const cloudUrl = await upload(file); // upload to cloud and get URL
        setVideoState({ type: 'cloud', url: cloudUrl });
        URL.revokeObjectURL(blobUrl);
    };


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
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%', overflow: 'hidden' }}>
            <Stack sx={{ marginLeft: 1, marginTop: 2 }}>
                <div>
                    <Video videoURL={videoState.url} duration={duration * 1000}></Video>
                </div>

                <input type="file" onChange={handleChange} />
            </Stack>
            <VideosUpload></VideosUpload>
        </Stack>
    );
}

export default Cut;
