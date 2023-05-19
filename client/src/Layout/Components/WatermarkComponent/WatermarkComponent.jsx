import { useState } from 'react';
import { useSelector } from 'react-redux';
import './WatermarkComponent.css';

function WatermarkComponent() {
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const videoState = useSelector((state) => state.video);
    const videoInRedux = videoState.video;
    console.log(videoInRedux);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result);
            setImageName(file.name);
        };

        reader.readAsDataURL(file);
    };
    return (
        <div className="watermarkComponent-container">
            <h1 className="watermark-title">Watermark</h1>
            <h2 className="watermark-demo-title">Your video may like that</h2>
            <video
                src={'https://cdn.creatomate.com/renders/aa6aad38-152e-488a-9a01-1b755b517021.mp4'}
                className="watermark-demo-video"
                controls
            />
            <div className="watermark-image-container">
                {image ? <img src={image} alt={imageName} /> : <img src="./default-image.png" alt="Your watermark" />}
            </div>
            <div className="watermark-upload-container">
                <input type="file" onChange={handleImageUpload} />
            </div>
        </div>
    );
}

export default WatermarkComponent;
