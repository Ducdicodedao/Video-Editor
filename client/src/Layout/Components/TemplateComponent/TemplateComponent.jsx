import { useState } from 'react';
import TemplateForm from './TemplateForm.jsx';
import './TemplateComponent.css';
function TemplateComponent() {
    const [template, setTemplate] = useState(null);
    const videoList = [
        {
            id: 1,
            options: {
                text: 2,
                api: '/api/video/storyVideo1',
            },
            url: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
        },

        {
            id: 2,
            url: 'https://cdn.creatomate.com/renders/aad516eb-271c-4cd0-87da-552f5cc8a189.mp4',
            options: {
                image: 1,
                text: 2,
                api: '/api/video/storyVideo1',
            },
        },
        {
            id: 3,
            url: 'https://creatomate-static.s3.amazonaws.com/demo/video3.mp4',
            options: {
                text: 2,
                api: '/api/video/storyVideo1',
            },
        },
    ];

    const handleChooseTemplate = (video) => {
        console.log(video);
        setTemplate(video);
    };

    const handleVideoHover = (event) => {
        event.target.play();
    };

    const handleVideoLeave = (event) => {
        event.target.pause();
        event.target.currentTime = 0;
    };
    return (
        <div className="templateComponent-container">
            {template !== null ? (
                <TemplateForm template={template} setTemplate={setTemplate} />
            ) : (
                <>
                    <div className="template-title-container">
                        <h1 className="template-title">Templates</h1>
                    </div>
                    <h2 className="template-category">Messages</h2>
                    <div className="stock-videos-list">
                        {videoList.map((video) => (
                            <video
                                key={video.id}
                                src={video.url}
                                className="stock-video"
                                onMouseEnter={handleVideoHover}
                                onMouseLeave={handleVideoLeave}
                                muted
                                onClick={() => {
                                    handleChooseTemplate(video);
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default TemplateComponent;
