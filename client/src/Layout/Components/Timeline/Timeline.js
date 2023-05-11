import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Timeline from 'react-visjs-timeline';
import { concatenateVideo } from '~/app/videoSlice';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Stack } from '@mui/system';
function TimeLine({
    videoRef,
    setFrame,
    videoState,
    frame,
    videos,
    setVideos,
    videoSrc,
    setItemSelector,
    timeChangeHandler,
}) {
    const timeValue = 60000;

    const currentVideo = videoState.currentVideo;
    const dispatch = useDispatch();
    const videoss = videos;
    const [itemSize, setItemSize] = useState(90);

    const items = videoState.video.map((data) => {
        const video = videos.filter((e) => e.id === data.name);
        return {
            id: video[0]?.id,
            style: 'height:20px;font-size:12px',
            start: new Date('Fri Apr 14 2023 00:00:00').getTime() + video[0]?.start * timeValue,
            end: new Date('Fri Apr 14 2023 00:00:00').getTime() + video[0]?.end * timeValue,
            content: video[0]?.content,
        };
    });
    var options = {
        width: '99%',
        height: itemSize + 'px',
        maxHeight: '150px',
        stack: true,
        verticalScroll: true,
        showMajorLabels: false,
        showCurrentTime: false,
        editable: true,
        zoomMin: 1, // zoomMax: 1,autoResize: true,type: 'background',
        format: {
            minorLabels: {
                millisecond: 's.SSS',
                second: 's',
                minute: 'HH:mm',
            },
        },
        onMove: function (item, callback) {
            console.log(item);
            const temp = [];
            for (let index = 0; index < videos.length; index++) {
                if (videos[index].id === item.id) {
                    videos[index].start = new Date(item.start).getMinutes() + new Date(item.start).getSeconds() / 60;
                    videos[index].end = new Date(item.end).getMinutes() + new Date(item.end).getSeconds() / 60;
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
        end: new Date('Fri Apr 14 2023 00:00:00').getTime() + videoState?.totalDuration * timeValue,
    };
    const customTimes = {
        d: new Date('Fri Apr 14 2023 00:00:00').getTime() + frame * timeValue,
    };
    useEffect(() => {
        if (videoState.video.length > 1) {
            setItemSize((videoState.video.length - 1) * 30 + itemSize);
        }
    }, [videoState]);
    return (
        <div style={{ marginLeft: '45px' }}>
            {/* <Stack direction="row"> */}
            <Timeline
                id="timeline"
                selectHandler={(e) => {
                    if (e.items.length > 0) {
                        setItemSelector(e.items[0]);
                    } else if (e.items.length === 0) {
                        setItemSelector(null);
                    }
                }}
                items={items}
                timechangeHandler={timeChangeHandler}
                options={options}
                customTimes={customTimes}
            />
            <KeyboardArrowUpIcon sx={{ cursor: 'pointer' }} />
            <KeyboardArrowDownIcon sx={{ cursor: 'pointer' }} />
            {/* </Stack> */}

            {/* <Button
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
            </Button> */}
        </div>
    );
}
export default TimeLine;
