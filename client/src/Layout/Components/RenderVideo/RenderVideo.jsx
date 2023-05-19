import { Avatar, Button, Stack, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { fontSize } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';
import { Link, useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { renderVideo, setRenderVideo, storeVideo } from '~/app/editorSlice';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
function RenderVideo({ handleClose }) {
    const [isRender, setIsRender] = useState(false);
    const [Src, setSrc] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((data) => data.auth.user);
    const video = useSelector((data) => data.video);
    const videoInState = video.video;
    const renderData = useSelector((state) => state.video.renderVideo);
    const navigate = useNavigate();
    if (renderData) {
        // dispatch(renderVideo(renderData));
        // dispatch(setRenderVideo(null));
    }
    const RenderHandler = () => {
        dispatch(renderVideo(renderData));
        setIsRender(true);
    };
    const DownloadHandler = () => {
        console.log('here');
        fetch(Src.url)
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.mp4');
                // Append to html link element page
                document.body.appendChild(link);
                // Start download
                link.click();
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    };
    const StorageHandler = () => {
        dispatch(storeVideo({ name: Src.name, url: Src.url, duration: Src.duration, ownerId: user.user._id }));
    };
    useEffect(() => {
        setSrc(videoInState[0]);
    }, [videoInState]);
    return (
        <Stack>
            {user !== null ? (
                <Stack
                    direction="row"
                    sx={{
                        width: '900px',
                        height: '80vh',
                        margin: 'auto',
                        marginTop: 5,
                        marginRight: 15,
                        position: 'relative',
                    }}
                >
                    {video.loading ? (
                        <Stack
                            sx={{ width: '100%', height: '100%', backgroundColor: '#383838' }}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <CircularProgress sx={{ fontSize: 25 }} />
                        </Stack>
                    ) : (
                        <>
                            {isRender ? (
                                <>
                                    <video
                                        src={Src.url}
                                        style={{ width: '100%', height: '100%', backgroundColor: '#383838' }}
                                        controls
                                    ></video>
                                    <Tooltip title="Download This Video">
                                        <Avatar
                                            sx={{
                                                position: 'absolute',
                                                fontSize: 30,
                                                top: 40,
                                                left: 20,
                                                height: '50px',
                                                width: '50px',
                                                cursor: 'pointer',
                                                color: 'black',
                                            }}
                                            onClick={DownloadHandler}
                                        >
                                            <DownloadIcon />
                                        </Avatar>
                                    </Tooltip>
                                    <Tooltip title="Storage This Video">
                                        <Avatar
                                            sx={{
                                                position: 'absolute',
                                                fontSize: 30,
                                                top: 40,
                                                left: 80,
                                                height: '50px',
                                                width: '50px',
                                                cursor: 'pointer',
                                                color: 'black',
                                            }}
                                            onClick={StorageHandler}
                                        >
                                            <CloudUploadIcon />
                                        </Avatar>
                                    </Tooltip>
                                </>
                            ) : (
                                <Stack sx={{ width: '100%', height: '100%', backgroundColor: '#383838' }}>
                                    <Button variant="contained" onClick={RenderHandler}>
                                        Render
                                    </Button>
                                </Stack>
                            )}
                        </>
                    )}

                    <Avatar
                        sx={{
                            backgroundColor: 'white',
                            color: 'black',
                            marginTop: 1,
                            marginLeft: 1,
                            cursor: 'pointer',
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon> </CloseIcon>
                    </Avatar>
                </Stack>
            ) : (
                <Stack
                    direction="column"
                    alignItems="center"
                    sx={{
                        width: '300px',
                        height: '80vh',
                        margin: 'auto',
                        marginTop: 5,
                        backgroundColor: 'white',
                        position: 'relative',
                    }}
                >
                    <img
                        src="https://res.cloudinary.com/dccblvpyz/image/upload/v1684339694/clone-discord/wyrmrrbm2mo7ppk7qaew.jpg"
                        alt=""
                        style={{ width: '100%', height: '200px' }}
                    />
                    <CloseIcon sx={{ position: 'absolute', right: '0', cursor: 'pointer' }} onClick={handleClose} />
                    <Stack>
                        <p style={{ fontSize: '16px', margin: 'auto' }}>
                            <strong> Sign Up to Download</strong>
                        </p>
                        <p style={{ fontSize: '12px', margin: 'auto' }}>Create a free account to download</p>
                        <p style={{ fontSize: '12px', margin: 'auto' }}> share and save this video to your workspace</p>
                    </Stack>
                    <Button
                        variant="contained"
                        startIcon={<LoginIcon />}
                        sx={{ width: '150px' }}
                        onClick={() => {
                            navigate('/login');
                        }}
                    >
                        Login
                    </Button>
                    <p style={{ fontSize: 13 }}>Or</p>
                    <Button
                        variant="contained"
                        startIcon={<EmailIcon />}
                        sx={{ width: '150px' }}
                        onClick={() => {
                            navigate('/register');
                        }}
                    >
                        SignUp
                    </Button>
                </Stack>
            )}
        </Stack>
    );
}

export default RenderVideo;
