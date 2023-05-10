import { Button, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDuration, splitVideo, trimVideo, uploadFile } from '~/app/videoSlice';
import Skeleton from '@mui/material/Skeleton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TimeLine from '../Timeline/Timeline';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
function MyVideo({ route }) {
    const videoState = useSelector((state) => state.video);
    const currentVideo = videoState.currentVideo;
    const loading = useSelector((state) => state.video.loading);
    const [frame, setFrame] = useState(0);
    const [isPlay, setIsPlay] = useState(true);
    const [isSplit, setIsSplit] = useState(false);
    const [isChangeVideo, setIsChangeVideo] = useState(false);
    const [videos, setVideos] = useState([]);
    const [videoSrc, setVideoSrc] = useState(0);
    const [itemSelector, setItemSelector] = useState(null);
    useEffect(() => {
        if (!isSplit) {
            setVideos(
                videoState.video.map((data) => {
                    return {
                        id: data?.name,
                        start: 0,
                        end: data?.duration,
                        content: data?.name,
                        url: data?.url,
                    };
                }),
            );
        } else {
            setIsSplit(false);
        }
    }, [videoState.video]);

    const videoRef = useRef(null);
    const dispatch = useDispatch();
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
    useEffect(() => {
        for (var element of videos) {
            if (frame >= element?.start && frame < element?.end) {
                if (element !== videoSrc) {
                    setVideoSrc(element);
                    setIsChangeVideo(true);
                }
                break;
            }
        }
    }, [videos, frame]);
    return (
        <Stack direction="column">
            {loading ? (
                <Skeleton variant="rectangular" width="100%">
                    <div style={{ width: '800px', height: '400px' }} />
                </Skeleton>
            ) : (
                <>
                    <video
                        src={videoSrc?.url}
                        onTimeUpdate={(e) => {
                            if (isChangeVideo === true) {
                                if (videoSrc?.frameSkip !== undefined) {
                                    videoRef.current.currentTime = frame - videoSrc.start + videoSrc?.frameSkip;
                                } else {
                                    videoRef.current.currentTime = frame - videoSrc.start;
                                }
                                setIsChangeVideo(false);
                                // videoRef.current.pause();
                                // setIsPlay(false);
                            }
                            if (videoSrc.start === 0 && videoSrc.frameSkip !== undefined) {
                                videoRef.current.currentTime = videoSrc.frameSkip;
                            }
                            if (
                                e.target.currentTime <= videoState?.totalDuration &&
                                e.target.currentTime + videoSrc.start >= frame
                            ) {
                                const time = e.target.currentTime;
                                console.log(time);
                                if (videoSrc?.frameSkip !== undefined) {
                                    setFrame(time + videoSrc.start);
                                } else {
                                    setFrame(time + videoSrc.start);
                                }
                            }
                        }}
                        onLoadStart={() => {}}
                        // controls
                        autoPlay={true}
                        ref={videoRef}
                        style={{ width: '1000px', height: '400px' }}
                    />
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ marginLeft: '40px', marginRight: '40px', marginBottom: '10px' }}
                    >
                        <Stack direction="row">
                            <Button sx={{ color: 'black' }} onClick={splitHandler}>
                                <ContentCutIcon /> Split
                            </Button>
                            <Button component="label" sx={{ color: 'black' }}>
                                <AddCircleOutlineIcon />
                                Add Media
                                <input type="file" hidden onChange={handleChange} />
                            </Button>
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
                            >
                                {' '}
                                {isPlay ? <PauseIcon /> : <PlayArrowIcon />}
                            </Button>

                            <p style={{ fontSize: 15, marginLeft: '15px' }}>
                                {frame} / {videoState?.totalDuration}
                            </p>
                        </Stack>
                        <div>
                            <p>|</p>
                        </div>
                    </Stack>
                    <TimeLine
                        videoRef={videoRef}
                        setFrame={setFrame}
                        videoState={videoState}
                        videoSrc={videoSrc}
                        frame={frame}
                        videos={videos}
                        setVideos={setVideos}
                        setItemSelector={setItemSelector}
                    />
                </>
            )}
        </Stack>
    );
}

export default MyVideo;
