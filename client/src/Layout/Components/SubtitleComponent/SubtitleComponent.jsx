import { useState } from 'react';
import Subtitle from './Subtitle';
import './SubtitleComponent.css';
function SubtitleComponent() {
    const [text, setText] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [subtitles, setSubtitles] = useState([]);

    const handleAddSubtitle = () => {
        setSubtitles((pre) => [
            ...pre,
            {
                text,
                startTime,
                endTime,
            },
        ]);
    };

    const handleRemoveSubtitle = (index) => {
        setSubtitles(subtitles.filter((_, i) => i !== index));
    };

    return (
        <div className="subtitleComponent-container">
            <h1 className="subtitle-title">Subtitles</h1>
            <div className="subtitle-card-list">
                <div className="subtitle-card">
                    <input
                        type="text"
                        className="subtitle-input"
                        placeholder="New Text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                    <div className="subtitle-time-wrap">
                        <div className="subtitle-time-container">
                            <span className="subtitle-time-title">Start:</span>
                            <input
                                type="text"
                                className="subtitle-time"
                                placeholder="00:00"
                                onChange={(e) => setStartTime(e.target.value)}
                                value={startTime}
                            />
                        </div>
                        <div className="subtitle-time-container">
                            <span className="subtitle-time-title">End:</span>
                            <input
                                type="text"
                                className="subtitle-time"
                                placeholder="00:00"
                                onChange={(e) => setEndTime(e.target.value)}
                                value={endTime}
                            />
                        </div>
                    </div>
                    <div className="subtitle-add" onClick={() => handleAddSubtitle()}>
                        ➕
                    </div>
                </div>
                {subtitles.map((s, index) => (
                    <Subtitle s={s} key={index} index={index} handleRemoveSubtitle={handleRemoveSubtitle} />
                ))}
            </div>
        </div>
    );
}

export default SubtitleComponent;
