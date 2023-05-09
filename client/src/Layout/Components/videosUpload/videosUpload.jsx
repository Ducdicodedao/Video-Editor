import { Button, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentVideo, uploadFile } from '~/app/videoSlice';

function VideosUpload({ videoURL, duration }) {
    const videoState = useSelector((state) => state.video.video);
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
    return (
        <Stack direction="column" sx={{ height: '100vh', width: '200px', overflow: 'auto' }}>
            <img
                src="https://th.bing.com/th/id/OIG.9zOWcvVtSRbWObqpxpwf?w=173&h=173&c=6&pcl=1b1a19&r=0&o=5&pid=ImgGn"
                alt="..."
            />
            <h5>Video Uploaded</h5>
            <p style={{ fontSize: 13 }}>you can choose video to cut</p>
            <Button variant="contained" component="label" sx={{ marginTop: 2, marginBottom: 5 }}>
                Upload File
                <input type="file" hidden onChange={handleChange} />
            </Button>
            {videoState.map((data) => {
                return (
                    <>
                        <Stack
                            justifyContent="center"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                dispatch(setCurrentVideo(data));
                            }}
                        >
                            <img
                                src="https://th.bing.com/th/id/OIG.vy_w0zhmpBGcr6Vt5LFC?w=173&h=173&c=6&pcl=1b1a19&r=0&o=5&pid=ImgGn"
                                alt=".."
                            />
                            <p style={{ fontSize: 13, margin: 'auto' }}>{data.name}</p>
                        </Stack>
                    </>
                );
            })}
        </Stack>
    );
}

export default VideosUpload;
