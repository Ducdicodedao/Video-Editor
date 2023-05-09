import React, { useEffect, useRef, useState } from 'react';
import Video from '~/Layout/Components/Video';
import { useCallback } from 'react';
import { Stack } from '@mui/material';
import VideosUpload from '~/Layout/Components/videosUpload/videosUpload';
import { useDispatch } from 'react-redux';
import { setDuration, uploadFile } from '~/app/videoSlice';
function Concatenate() {
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
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%', overflow: 'hidden' }}>
            <Stack sx={{ marginLeft: 1, marginTop: 2 }}>
                <div>
                    <Video route={'concatenate'}></Video>
                </div>
            </Stack>
            <VideosUpload></VideosUpload>
        </Stack>
    );
}

export default Concatenate;
