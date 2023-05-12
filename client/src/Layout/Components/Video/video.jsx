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
    const [isDragDrop, setIsDragDrop] = useState(false);
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

    const timeChangeHandler = (e) => {
        if (e.id === 'd') {
            videoRef.current.pause();
            const date = new Date(e.time);

            // console.log(parseInt(date.getSeconds()) - videoSrc.start);
            videoRef.current.pause();
            setFrame(parseFloat((date.getMinutes() + date.getSeconds() / 60).toFixed(2)));

            // console.log(date.getMinutes() + date.getSeconds() / 60);
            setIsDragDrop(true);
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
        // setVideoSrc(videos[0]);
        // setIsChangeVideo(true);
    }, [videos, frame]);
    useEffect(() => {
        if (isPlay === false) {
            if (videoSrc.start !== undefined && videoSrc.frameSkip !== undefined) {
                videoRef.current.currentTime = frame - videoSrc?.start + videoSrc.frameSkip;
            } else if (videoSrc.start !== undefined) {
                videoRef.current.currentTime = frame - videoSrc?.start;
            } else {
                videoRef.current.currentTime = frame;
            }
        }
    }, [frame]);
    console.log(videos);
    return (
        <Stack direction="column" sx={{ position: 'absolute', left: '13%', width: '1100px', top: '10%' }}>
            {/* {loading ? (
                <Skeleton variant="rectangular" width="100%">
                    <div style={{ width: '800px', height: '400px' }} />
                </Skeleton>
            ) : ( */}
            {loading ? (
                <Skeleton variant="rectangular" width="100%">
                    <div style={{ width: '750px', height: '450px', position: 'absolute', left: '35.5%' }} />
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

                            if (e.target.currentTime + videoSrc.start >= frame) {
                                const time = e.target.currentTime;
                                if (isDragDrop) {
                                    setIsDragDrop(false);
                                } else if (videoSrc.frameSkip !== undefined) {
                                    setFrame(time + videoSrc.start - videoSrc.frameSkip);
                                } else {
                                    setFrame(time + videoSrc.start);
                                }
                            }
                        }}
                        onLoadStart={() => {}}
                        // controls
                        autoPlay={true}
                        ref={videoRef}
                        style={{ width: '750px', height: '450px', position: 'absolute', left: '35.5%' }}
                    />
                </>
            )}
            <TimeLine
                videoRef={videoRef}
                setFrame={setFrame}
                videoState={videoState}
                videoSrc={videoSrc}
                frame={frame}
                videos={videos}
                setVideos={setVideos}
                timeChangeHandler={timeChangeHandler}
                isSplit={isSplit}
                setIsSplit={setIsSplit}
                setIsPlay={setIsPlay}
                isPlay={isPlay}
            />
        </Stack>
    );
}

export default MyVideo;
