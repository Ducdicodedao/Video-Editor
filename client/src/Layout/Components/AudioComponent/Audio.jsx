import './AudioComponent.css';
function Subtitle({ s, index, handleRemoveSubtitle }) {
    return (
        <div className="subtitle-card">
            <input type="text" className="subtitle-input" placeholder="New Text" value={s.text} disabled />
            <div className="subtitle-time-wrap">
                <div className="subtitle-time-container">
                    <span className="subtitle-time-title">Start:</span>
                    <input type="text" className="subtitle-time" placeholder="00:00" value={s.startTime} disabled />
                </div>
                <div className="subtitle-time-container">
                    <span className="subtitle-time-title">End:</span>
                    <input type="text" className="subtitle-time" placeholder="00:00" value={s.endTime} disabled />
                </div>
            </div>
            <div className="subtitle-add" onClick={() => handleRemoveSubtitle(index)}>
                ❌
            </div>
        </div>
    );
}

export default Subtitle;
