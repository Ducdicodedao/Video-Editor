import './MediaComponent.css';
import { useEffect, useRef, useState } from 'react';
import { getAudioStock, getVideoStock, getVideoStorage } from '~/api/videoApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectAudioStock, selectVideoStock, splitVideo } from '~/app/editorSlice';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
function MediaComponent() {
    const navigate = useNavigate();

    const [storageVideo, setstorageVideo] = useState([]);
    const [videoList, setvideoList] = useState([]);
    const [musicList, setMusicList] = useState([]);
    const audioRef = useRef(null);
    const [currentSong, setCurrentSong] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const user = useSelector((data) => data.auth.user);

    const dispatch = useDispatch();
    const playMusic = (url) => {
        setCurrentSong(url);
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.src = url;
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    const getFileInStock = async () => {
        if (user !== null) {
            setstorageVideo(await getVideoStorage({ id: user.user._id }));
        }
        setvideoList(await getVideoStock());
        setMusicList(await getAudioStock());
    };
    useEffect(() => {
        getFileInStock();
    }, []);
    return (
        <div className="mediaComponent-container">
            <div className="stock-videos-container">
                <h1 className="stock-videos-title">Stock Videos</h1>
                <div className="stock-videos-list">
                    {videoList.map((video) => (
                        <video
                            key={video.id}
                            src={video.url}
                            className="stock-video"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                                dispatch(selectVideoStock(video));
                            }}
                        />
                    ))}
                </div>
            </div>
            {user && (
                <div className="stock-videos-container">
                    <h1 className="stock-videos-title">Storage Videos</h1>
                    <div className="stock-videos-list">
                        {storageVideo.map((video) => (
                            <video
                                key={video?.id}
                                src={video.url}
                                className="stock-video"
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                    dispatch(selectVideoStock(video));
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="stock-music-container">
                <h1 className="stock-music-title">Stock Music</h1>
                <div className="music-card-list">
                    {musicList.map((music) => (
                        <div key={music._id} style={{ justifyContent: 'space-between' }} className="music-card">
                            <div style={{ display: 'flex' }}>
                                <button className="music-play-button" onClick={() => playMusic(music.url)}>
                                    {music.url === currentSong && isPlaying ? '⏸️' : '▶️'}
                                </button>
                                <div className="music-info" style={{ fontSize: 12 }}>
                                    <p className="music-name">{music.name}</p>
                                    <p className="music-length">{music.duration}</p>
                                </div>
                            </div>
                            <AddIcon
                                sx={{ cursor: 'pointer' }}
                                onClick={() => {
                                    dispatch(selectAudioStock({ ...music, start: 0 }));
                                    navigate('/audio');
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Audio player */}
            <audio ref={audioRef} className="audio-player" controls hidden />
        </div>
    );
}

export default MediaComponent;
