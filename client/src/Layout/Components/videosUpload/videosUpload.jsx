import { Button, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function VideosUpload({ videoURL, duration }) {
    return (
        <Stack direction="column" sx={{ height: '100vh', width: '200px', overflow: 'auto' }}>
            <img
                src="https://th.bing.com/th/id/OIG.9zOWcvVtSRbWObqpxpwf?w=173&h=173&c=6&pcl=1b1a19&r=0&o=5&pid=ImgGn"
                alt="..."
            />
            <h5>Video Uploaded</h5>
            <p style={{ fontSize: 13 }}>you can choose video to cut</p>

            <Button variant="contained" component="label" sx={{ marginTop: 2, marginBottom: 5 }}>
                Upload
            </Button>

            <Stack justifyContent="center">
                <img
                    src="https://th.bing.com/th/id/OIG.vy_w0zhmpBGcr6Vt5LFC?w=173&h=173&c=6&pcl=1b1a19&r=0&o=5&pid=ImgGn"
                    alt=".."
                />
                <p style={{ fontSize: 13, margin: 'auto' }}>Video 1</p>
            </Stack>
            <Stack justifyContent="center">
                <img
                    src="https://th.bing.com/th/id/OIG.vy_w0zhmpBGcr6Vt5LFC?w=173&h=173&c=6&pcl=1b1a19&r=0&o=5&pid=ImgGn"
                    alt=".."
                />
                <p style={{ fontSize: 13, margin: 'auto' }}>Video 1</p>
            </Stack>
            <Stack justifyContent="center">
                <img
                    src="https://th.bing.com/th/id/OIG.vy_w0zhmpBGcr6Vt5LFC?w=173&h=173&c=6&pcl=1b1a19&r=0&o=5&pid=ImgGn"
                    alt=".."
                />
                <p style={{ fontSize: 13, margin: 'auto' }}>Video 1</p>
            </Stack>
        </Stack>
    );
}

export default VideosUpload;
