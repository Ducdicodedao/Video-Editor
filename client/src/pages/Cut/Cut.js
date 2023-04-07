import { Player } from '@remotion/player';
import { upload } from '@testing-library/user-event/dist/upload';
import { useState } from 'react';
import Video from '~/components/Video';

function Cut() {
    const [videoState, setVideoState] = useState({ type: 'empty' });

    const handleChange = async (event) => {
        if (event.target.files === null) {
            return;
        }
        const file = event.target.files[0];
        const blobUrl = URL.createObjectURL(file);
        setVideoState({ type: 'blob', url: blobUrl });
        const cloudUrl = await upload(file); // upload to cloud and get URL
        setVideoState({ type: 'cloud', url: cloudUrl });
        URL.revokeObjectURL(blobUrl);
    };
    return (
        <div>
            {videoState.type !== 'empty' ? (
                <div>
                    <Player
                        component={Video}
                        durationInFrames={120}
                        compositionWidth={1920}
                        compositionHeight={1080}
                        showTimeline={true}
                        fps={30}
                        style={{
                            width: 800,
                            height: 500,
                        }}
                        // controls
                        inputProps={{ videoURL: videoState.url }}
                    />
                </div>
            ) : null}
            <input type="file" onChange={handleChange} />
        </div>
    );
}

export default Cut;
