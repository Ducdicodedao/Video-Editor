import { useState, useEffect } from 'react';
import TemplateForm from './TemplateForm.jsx';
import './TemplateComponent.css';
import http from '~/util/HttpRequest.js';
function TemplateComponent() {
    const [template, setTemplate] = useState(null);
    const [templateList, setTemplateList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await http.get('/template/getAllTemplate');
            setTemplateList(data.templates);
        };
        fetchData();
    }, []);

    const handleChooseTemplate = (video) => {
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
                        {templateList
                            .filter((video) => video.type === 'banner')
                            .map((video) => (
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
                        {templateList
                            .filter((video) => video.type === 'story')
                            .map((video) => (
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
