import { Button, CircularProgress, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import Skeleton from '@mui/material/Skeleton';
import TimeLine from '../Timeline/Timeline';
function MyVideo({ route }) {
    const videoState = useSelector((state) => state.video);

    const videoInRedux = videoState.video;
    const audioInRedux = videoState.audio;
    const loading = useSelector((state) => state.video.loading);
    const renderData = useSelector((state) => state.video.renderVideo);

    const [frame, setFrame] = useState(0);
    const [isPlay, setIsPlay] = useState(true);
    const [isSplit, setIsSplit] = useState(false);
    const [isChangeVideo, setIsChangeVideo] = useState(false);
    // const [videos, setVideos] = useState([]);
    const [videoSrc, setVideoSrc] = useState(0);
    const [audioSrc, setAudioSrc] = useState(null);
    const [isDragDrop, setIsDragDrop] = useState(false);

    useEffect(() => {
        if (!isSplit) {
        } else {
            setIsSplit(false);
        }
    }, [videoInRedux]);
    const videoRef = useRef(null);
    const audioRef = useRef(null);
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
        let check = 0;
        for (var element of videoInRedux) {
            if (frame >= element?.start && frame < element?.end) {
                if (element !== videoSrc) {
                    setVideoSrc(element);
                    setIsChangeVideo(true);
                }
                check = 1;
                break;
            }
        }

        if (check === 0) {
            setFrame(0);
        }
        // setVideoSrc(videos[0]);
        // setIsChangeVideo(true);
    }, [videoInRedux, frame]);
    useEffect(() => {
        let count = 0;
        for (var i of audioInRedux) {
            if (frame >= parseFloat(i?.start) && frame < parseFloat(i?.start) + parseFloat(i?.duration)) {
                if (i !== audioSrc) {
                    setAudioSrc(i);
                }
                count = 1;
                break;
            }
        }
        if (count === 0) setAudioSrc(null);
    }, [audioInRedux, frame]);
    useEffect(() => {
        if (isPlay === false) {
            audioRef.current.pause();

            if (videoSrc.start !== undefined && videoSrc.frameSkip !== undefined) {
                videoRef.current.currentTime = frame - videoSrc?.start + videoSrc.frameSkip;
            } else if (videoSrc.start !== undefined) {
                videoRef.current.currentTime = frame - videoSrc?.start;
            } else {
                videoRef.current.currentTime = frame;
            }
        }
        if (audioSrc !== null) {
            const count = audioInRedux.filter((data) => data.name === audioSrc?.name);
            if (count.length === 0) {
                setAudioSrc(null);
            }
            // if()
            if (isPlay) {
                audioRef.current.play();
            }
            // audioRef.current.currentTime = frame - audioSrc?.start;
        }
    }, [frame]);
    return (
        <Stack direction="column" sx={{ position: 'absolute', left: '8%', width: '1100px', top: '0' }}>
            {loading === true ? (
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: '850px', height: '520px', position: 'absolute', left: '33%' }}
                >
                    <CircularProgress sx={{ fontSize: 25 }} />
                </Stack>
            ) : (
                <>
                    <Stack sx={{ width: '850px', height: '520px', position: 'absolute', left: '33%' }}>
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
                            autoPlay={isPlay}
                            ref={videoRef}
                            style={{ width: '100%', height: '100%' }}
                        ></video>
                        <Stack></Stack>
                    </Stack>
                    <audio ref={audioRef} src={audioSrc?.url} controls autoplay style={{ display: 'none' }}></audio>
                </>
            )}
            <TimeLine
                videoRef={videoRef}
                setFrame={setFrame}
                videoState={videoState}
                videoSrc={videoSrc}
                frame={frame}
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
