import { Button, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDuration, trimVideo } from '~/app/videoSlice';
import Skeleton from '@mui/material/Skeleton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TimeLine from '../Timeline/Timeline';
function MyVideo({ route }) {
    const videoState = useSelector((state) => state.video);
    const currentVideo = videoState.currentVideo;
    const loading = useSelector((state) => state.video.loading);
    const [frame, setFrame] = useState(0);
    const [isPlay, setIsPlay] = useState(true);
    const [isChangeVideo, setIsChangeVideo] = useState(false);
    const [videos, setVideos] = useState([]);
    const [videoSrc, setVideoSrc] = useState(0);
    useEffect(() => {
        setVideos(
            videoState.video.map((data) => {
                return {
                    start: 0,
                    end: data?.duration,
                    content: data?.name,
                    url: data?.url,
                };
            }),
        );
    }, [videoState.video]);

    const videoRef = useRef(null);
    const dispatch = useDispatch();
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
                                videoRef.current.currentTime = frame - videoSrc.start;
                                setIsChangeVideo(false);
                                // videoRef.current.pause();
                                // setIsPlay(false);
                            }
                            if (
                                e.target.currentTime <= videoState?.totalDuration &&
                                e.target.currentTime + videoSrc.start >= frame
                            ) {
                                const time = e.target.currentTime;
                                setFrame(time + videoSrc.start);
                            }
                        }}
                        onLoadStart={() => {}}
                        // controls
                        autoPlay={true}
                        ref={videoRef}
                        style={{ width: '800px', height: '400px' }}
                    />
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ marginLeft: '40px', marginRight: '40px' }}
                    >
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

                        <div>
                            <p style={{ fontSize: 15 }}>
                                {frame} / {videoState?.totalDuration}
                            </p>
                        </div>
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
                    />
                </>
            )}
        </Stack>
    );
}

export default MyVideo;
