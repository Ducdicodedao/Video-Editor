import React, { useEffect, useRef, useState } from 'react';
import Video from '~/Layout/Components/Video';
import { useCallback } from 'react';
import { Stack } from '@mui/material';
import VideosUpload from '~/Layout/Components/videosUpload/videosUpload';
import { useDispatch } from 'react-redux';
import { setDuration, uploadFile } from '~/app/videoSlice';
function Cut() {
    const [videoState, setVideoState] = useState({ type: 'empty' });
    const dispatch = useDispatch();
    const handleChange = async (event) => {
        if (event.target.files === null) {
            return;
        }

        //----------------------------------------------------------------------------------------------
        const file = event.target.files[0];

        const video = document.createElement('video');
        // Xử lý khi video được tải lên
        video.onloadedmetadata = () => {
            // Lưu trữ độ dài của video vào biến state
        };
        let formData = new FormData();
        formData.append('files', file);
        dispatch(uploadFile(formData));
        // // Thiết lập source của video để bắt đầu tải lên
        // video.src = URL.createObjectURL(file);
        // //-------------------------------------------------------------------------------------------------
        // const blobUrl = URL.createObjectURL(file);
        // setVideoState({ type: 'blob', url: blobUrl });
        // const cloudUrl = await upload(file); // upload to cloud and get URL
        // setVideoState({ type: 'cloud', url: cloudUrl });
        // URL.revokeObjectURL(blobUrl);
    };

    return (
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%', overflow: 'hidden' }}>
            <Stack sx={{ marginLeft: 1, marginTop: 2 }}>
                <div>
                    <Video videoURL={videoState}></Video>
                </div>

                <input type="file" onChange={handleChange} />
            </Stack>
            <VideosUpload></VideosUpload>
        </Stack>
    );
}

export default Cut;
