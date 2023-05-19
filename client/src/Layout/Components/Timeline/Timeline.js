import { Button, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Timeline from 'react-visjs-timeline';
import {
    concatenateVideo,
    removeVideo,
    renderVideo,
    setRenderVideo,
    splitVideo,
    uploadAudio,
    uploadFile,
} from '~/app/editorSlice';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Stack } from '@mui/system';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DownloadIcon from '@mui/icons-material/Download';
import RenderVideo from '../RenderVideo/RenderVideo';
function TimeLine({
    videoRef,
    setFrame,
    videoState,
    frame,
    videos,
    setVideos,
    videoSrc,
    timeChangeHandler,
    setIsSplit,
    isSplit,
    setIsPlay,
    isPlay,
}) {
    const timeValue = 60000;
    const renderData = useSelector((state) => state.video.renderVideo);
    const dispatch = useDispatch();
    const [itemSize, setItemSize] = useState(85);
    const [itemSelector, setItemSelector] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (videos.length > 0) {
            dispatch(setRenderVideo({ videos: videos, audio: videoState.audio, videoState: videoState }));
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // setVideos(renderData.videos);
        dispatch(setRenderVideo(null));
    };
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
    const handleChange = async (event) => {
        if (event.target.files === null) {
            return;
        }

        //----------------------------------------------------------------------------------------------
        const file = event.target.files[0];

        let formData = new FormData();
        formData.append('files', file);
        dispatch(uploadFile(formData));
    };
    const handleChangeMp3 = async (event) => {
        if (event.target.files === null) {
            return;
        }

        //----------------------------------------------------------------------------------------------
        const file = event.target.files[0];

        let formData = new FormData();
        formData.append('files', file);
        dispatch(uploadAudio(formData));
    };
    const splitHandler = () => {
        console.log(itemSelector);
        if (itemSelector !== null) {
            const temp = videos.filter((data) => data.id === itemSelector);
            const video = videoState.video.filter((data) => data.name === temp[0].content);
            const removeOriginalVideo = videos.filter((data) => data.id !== itemSelector);
            removeOriginalVideo.push({
                id: temp[0].content,
                start: temp[0].start,
                end: frame,
                content: temp[0].content,
                url: temp[0].url,
            });
            removeOriginalVideo.push({
                id: temp[0].content + ' source2',
                start: frame,
                end: temp[0].end,
                content: temp[0].content,
                url: temp[0].url,
                frameSkip: frame,
            });
            setIsSplit(true);
            setVideos(removeOriginalVideo);
            dispatch(splitVideo({ name: video[0].name + ' source2', url: video[0].url, duration: video[0].duration }));
        }
    };
    const handleRender = () => {
        dispatch(renderVideo({ videos: videos, audio: videoState.audio, videoState: videoState }));
    };
    var options = {
        width: '1200px',
        height: itemSize + 'px',
        maxHeight: '120px',
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
        onRemove: function (item, callback) {
            const temp = [];
            for (let index = 0; index < videoState.video.length; index++) {
                if (item.id !== videoState.video[index].name) {
                    temp.push(videoState.video[index]);
                }
            }
            console.log(temp);
            dispatch(removeVideo(temp));
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
            if (itemSize < 120) setItemSize((videoState.video.length - 1) * 20 + itemSize);
        }
    }, [videoState]);
    useEffect(() => {
        if (renderData !== null) {
            setOpen(true);
            videoRef.current.pause();
        }
    }, []);
    return (
        <div style={{ position: 'absolute', top: '535px' }}>
            <Stack direction="row" justifyContent="space-between" sx={{}}>
                <Stack direction="row">
                    <Button sx={{ color: 'black', fontSize: 8 }} onClick={splitHandler}>
                        <ContentCutIcon sx={{ fontSize: 15 }} /> Split
                    </Button>
                    <Button component="label" sx={{ color: 'black', fontSize: 8 }}>
                        <AddCircleOutlineIcon sx={{ fontSize: 15 }} />
                        Add Media
                        <input type="file" hidden onChange={handleChange} />
                    </Button>
                    <Button component="label" sx={{ color: 'black', fontSize: 8 }}>
                        <AddCircleOutlineIcon sx={{ fontSize: 15 }} />
                        Add Audio
                        <input type="file" accept=".mp3" hidden onChange={handleChangeMp3} />
                    </Button>
                    <Button sx={{ fontSize: 8, color: 'black' }} onClick={handleOpen}>
                        <DownloadIcon />
                        Download Section
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <RenderVideo handleClose={handleClose}></RenderVideo>
                    </Modal>
                </Stack>
                <Stack alignItems="center" direction="row">
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            if (isPlay === true) {
                                videoRef.current.pause();
                                setIsPlay(!isPlay);
                            } else {
                                videoRef.current.play();
                                setIsPlay(!isPlay);
                            }
                        }}
                        sx={{ fontSize: 8, width: 30, height: 20 }}
                    >
                        {' '}
                        {isPlay ? <PauseIcon /> : <PlayArrowIcon />}
                    </Button>

                    <p style={{ fontSize: 10, marginLeft: '15px' }}>
                        {frame.toFixed(2)} / {videoState?.totalDuration.toFixed(2)}
                    </p>
                </Stack>
                <div>
                    <p>|</p>
                </div>
            </Stack>
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
            {/* <KeyboardArrowUpIcon sx={{ cursor: 'pointer' }} />
            <KeyboardArrowDownIcon sx={{ cursor: 'pointer' }} /> */}
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
