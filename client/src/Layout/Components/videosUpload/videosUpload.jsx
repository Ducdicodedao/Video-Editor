import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '~/app/editorSlice';
import './videosUpload.css'; // Import the CSS file

function VideosUpload({ videoURL, duration }) {
    const videoState = useSelector((state) => state.video.video);
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
        <div className="container">
            <div className="upload-image"></div>
            <h5 className="upload-heading">Video Uploaded</h5>
            <p className="upload-description">you can choose video to cut</p>
            <label htmlFor="file-upload" className="upload-button">
                Upload File
                <input type="file" id="file-upload" onChange={handleChange} style={{ display: 'none' }} />
            </label>
            {videoState.map((data) => (
                <div
                    key={data.id}
                    className="video-item"
                    onClick={() => {
                        // dispatch(setCurrentVideo(data));
                    }}
                >
                    <div className="video-thumbnail"></div>
                    <p className="video-name">{data.name}</p>
                </div>
            ))}
        </div>
    );
}

export default VideosUpload;
