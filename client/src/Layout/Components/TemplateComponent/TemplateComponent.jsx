import { useState } from 'react';
import TemplateForm from './TemplateForm.jsx';
import './TemplateComponent.css';
function TemplateComponent() {
    const [template, setTemplate] = useState(null);
    const videoList = [
        {
            id: 1,
            url: 'https://cdn.creatomate.com/renders/aad516eb-271c-4cd0-87da-552f5cc8a189.mp4',
            options: {
                image: 1,
                text: 2,
                api: '/video/templateVideo1',
            },
        },
        {
            id: 2,
            url: 'https://cdn.creatomate.com/renders/49b37602-5d98-47bd-9771-5b11f7a2c983.mp4',
            options: {
                image: 1,
                text: 2,
                api: '/video/templateVideo2',
            },
        },
        {
            id: 3,
            url: 'https://cdn.creatomate.com/renders/26ab65a3-5133-4081-b0dc-56d9da97d97c.mp4',
            options: {
                image: 2,
                text: 1,
                api: '/video/templateVideo3',
            },
        },
        {
            id: 4,
            url: 'https://cdn.creatomate.com/renders/30f2ebe4-9ea4-41fc-93f8-2d917c4e0e2d.mp4',
            options: {
                image: 1,
                text: 3,
                api: '/video/templateVideo4',
            },
        },
        {
            id: 5,
            url: 'https://cdn.creatomate.com/renders/9b295a9d-3cb2-4978-8e65-756d97a15770.mp4',
            options: {
                image: 1,
                text: 2,
                api: '/video/templateVideo5',
            },
        },
        {
            id: 6,
            url: 'https://cdn.creatomate.com/renders/5ba73deb-250f-4416-b033-8658f0e9e200.mp4',
            options: {
                image: 4,
                text: 5,
                api: '/video/templateVideo6',
            },
        },
        {
            id: 7,
            url: 'https://cdn.creatomate.com/renders/3e683fb2-38d9-4478-a3e2-fc6c49539ac1.mp4',
            options: {
                image: 3,
                text: 3,
                api: '/video/templateVideo7',
            },
        },
        {
            id: 8,
            url: 'https://cdn.creatomate.com/renders/6e1f42c2-5af0-4402-8645-ff575e5db39c.mp4',
            options: {
                image: 1,
                text: 3,
                api: '/video/templateVideo8',
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
                    <h2 className="template-category">Banners</h2>
                    <div className="stock-videos-list">
                        {videoList.slice(0, 4).map((video) => (
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
                    <h2 className="template-category">Story</h2>
                    <div className="stock-videos-list">
                        {videoList.slice(4).map((video) => (
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
