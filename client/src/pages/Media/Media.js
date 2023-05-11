import React, { useEffect, useRef, useState } from 'react';
import Video from '~/Layout/Components/Video';
import { useCallback } from 'react';
import { Stack } from '@mui/material';
import VideosUpload from '~/Layout/Components/videosUpload/videosUpload';
import { useDispatch } from 'react-redux';
import { setDuration, uploadFile } from '~/app/videoSlice';
function Cut() {
    return (
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%', overflow: 'hidden' }}>
            <VideosUpload></VideosUpload>

            <Stack sx={{ marginLeft: 1, marginTop: 2 }}>
                <div>
                    <Video route={'trim'}></Video>
                </div>
            </Stack>
        </Stack>
    );
}

export default Cut;
