import { Stack } from '@mui/material';
import { useState } from 'react';
import { Video, useVideoConfig, useCurrentFrame } from 'remotion';
function MyVideo({ videoURL }) {
    const [frame, setFrame] = useState(useCurrentFrame());
    return (
        <Stack direction="column">
            <Video src={videoURL} startFrom={parseInt(frame)} endForm={120} style={{ width: '90%', height: '90%' }} />
            <input
                type="range"
                onChange={(e) => setFrame(e.target.value)}
                min="0"
                max="120"
                style={{ height: '50px', width: '100%', fontSize: 20 }}
                value={frame}
            />
        </Stack>
    );
}

export default MyVideo;
