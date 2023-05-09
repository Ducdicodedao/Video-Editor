import { Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Timeline from 'react-visjs-timeline';
import { concatenateVideo } from '~/app/videoSlice';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
function TimeLine({ videoRef, setFrame, videoState, frame, videos, setVideos, videoSrc }) {
    const currentVideo = videoState.currentVideo;
    const dispatch = useDispatch();
    const timeChangeHandler = (e) => {
        if (e.id === 'd') {
            videoRef.current.pause();
            const date = new Date(e.time);
            videoRef.current.currentTime = parseInt(date.getSeconds());
            console.log(parseInt(date.getSeconds()) - videoSrc.start);
            videoRef.current.pause();

            setFrame(parseInt(date.getSeconds()));
        }
    };
    const items = videoState.video.map((data) => {
        const video = videos.filter((e) => e.content === data.name);
        return {
            start: new Date('Fri Apr 14 2023 00:00:00').getTime() + video[0]?.start * 1000,
            end: new Date('Fri Apr 14 2023 00:00:00').getTime() + video[0]?.end * 1000,
            content: video[0]?.content,
        };
    });
    var options = {
        width: '94%',
        height: '180px',
        maxHeight: '180px',
        stack: true,
        verticalScroll: true,
        showMajorLabels: false,
        showCurrentTime: false,
        editable: true,
        zoomMin: 1, // zoomMax: 1,autoResize: true,type: 'background',

        format: {
            minorLabels: {
                second: 's',
                minute: 'HH:mm',
            },
        },
        onMove: function (item, callback) {
            const temp = [];
            for (let index = 0; index < videos.length; index++) {
                if (videos[index].content === item.content) {
                    videos[index].start = new Date(item.start).getSeconds();
                    videos[index].end = new Date(item.end).getSeconds();
                }
                temp.push(videos[index]);
            }
            setVideos(temp);

            if (item.content != null) {
                callback(item); // send back adjusted item
            } else {
                callback(null); // cancel updating the item
            }
        },
        start: new Date('Fri Apr 14 2023 00:00:00').getTime(),
        end: new Date('Fri Apr 14 2023 00:00:00').getTime() + videoState?.totalDuration * 1000,
    };
    const customTimes = {
        d: new Date('Fri Apr 14 2023 00:00:00').getTime() + frame * 1000,
    };
    return (
        <div style={{ marginLeft: '45px' }}>
            <Timeline
                id="timeline"
                clickHandler={(e) => {}}
                items={items}
                timechangeHandler={timeChangeHandler}
                options={options}
                customTimes={customTimes}
            />
            <KeyboardArrowUpIcon sx={{ cursor: 'pointer' }} />
            <KeyboardArrowDownIcon sx={{ cursor: 'pointer' }} />
            <Button
                variant="contained"
                component="label"
                sx={{ marginLeft: '250px', marginTop: 2, marginBottom: 5, width: '200px' }}
                onClick={(e) => {
                    const arr = [];
                    videoState.video.forEach((data) => {
                        if (arr.length < 2) {
                            arr.push(data.url);
                        }
                    });
                    dispatch(concatenateVideo(arr));
                }}
            >
                Concatenate
            </Button>
        </div>
    );
}
export default TimeLine;
