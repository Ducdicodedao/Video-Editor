import { Button, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import Skeleton from '@mui/material/Skeleton';

import TimeLine from '../Timeline/Timeline';

function MyVideo({ route }) {
    const videoState = useSelector((state) => state.video);

    const videoInRedux = videoState.video;
    const loading = useSelector((state) => state.video.loading);
    const [frame, setFrame] = useState(0);
    const [isPlay, setIsPlay] = useState(true);
    const [isSplit, setIsSplit] = useState(false);
    const [isChangeVideo, setIsChangeVideo] = useState(false);
    const [videos, setVideos] = useState([]);
    const [videoSrc, setVideoSrc] = useState(0);
    const [isDragDrop, setIsDragDrop] = useState(false);


    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const { left, top } = event.target.getBoundingClientRect();

        const x = clientX - left;
        const y = clientY - top;

        console.log({ x, y });
        setMousePosition({ x, y });
    };


    const eventLogger = (e, data) => {
        console.log(e);
    };

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
        for (var element of videos) {
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
    return (
        <Stack direction="column" sx={{ position: 'absolute', left: '8%', width: '1100px', top: '0' }}>
            {loading ? (
                <Skeleton variant="rectangular" width="100%">
                    <div style={{ width: '750px', height: '450px', position: 'absolute', left: '35.5%' }} />
                </Skeleton>
            ) : (
                <>
                    <div style={{ width: '850px', height: '520px', position: 'absolute', left: '33%' }}>
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
                                                    onMouseMove={handleMouseMove}
                            onLoadStart={() => {}}
                            // controls
                            autoPlay={true}
                            ref={videoRef}
                            style={{ width: '100%', height: '100%' }}
                        ></video>
                    </div>
                    <audio
                        ref={audioRef}
                        src="https://firebasestorage.googleapis.com/v0/b/musicplayer-b04ab.appspot.com/o/discovery_song%2F1679834410627.mp3?alt=media&token=beef64b2-2077-4616-86f7-f888d5cddac4"
                        controls
                        autoplay
                        style={{ display: 'none' }}
                    ></audio>
                    <Draggable defaultPosition={{ x: 867, y: 244 }} onStop={eventLogger}>
                        <h6 style={{ cursor: 'grab' }}>hello</h6>
                    </Draggable>

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
