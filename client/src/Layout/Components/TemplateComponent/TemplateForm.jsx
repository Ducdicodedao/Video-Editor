import { Button } from '@mui/material';
import { useState } from 'react';
import './TemplateComponent.css';
import * as httpRequest from '../../../util/HttpRequest';
import { upload, uploadPromax, uploadImage } from '../../../api/videoApi';
import { useDispatch } from 'react-redux';
import { selectVideoStock } from '~/app/editorSlice';

function TemplateForm({ template, setTemplate }) {
    const [videos, setVideos] = useState(Array.from({ length: template.options.video }) || []);
    const [images, setImages] = useState(Array.from({ length: template.options.image }) || []);
    const [texts, setTexts] = useState(Array.from({ length: template.options.text }) || []);

    const dispatch = useDispatch();
    const handleVideoUpload = async (event, index) => {
        const file = event.target.files[0];
        const updatedVideos = videos.slice(); // tạo bản sao của mảng videos
        let formData = new FormData();
        formData.append('files', file);
        // const data = await uploadPromax(formData);
        const data = await upload(formData);
        updatedVideos[index] = data.url; // cập nhật giá trị phần tử tại vị trí index của bản sao
        setVideos(updatedVideos); // cập nhật state của mảng videos
    };
    const handleImageUpload = async (event, index) => {
        const file = event.target.files[0];
        const updatedImages = images.slice(); // tạo bản sao của mảng images
        let formData = new FormData();
        formData.append('files', file);
        const data = await uploadImage(formData);
        updatedImages[index] = data.url; // cập nhật giá trị phần tử tại vị trí index của bản sao
        setImages(updatedImages); // cập nhật state của mảng images
    };
    const handleTextUpload = (event, index) => {
        const updatedTexts = texts.slice(); // tạo bản sao của mảng texts
        updatedTexts[index] = event.target.value; // cập nhật giá trị phần tử tại vị trí index của bản sao
        setTexts(updatedTexts); // cập nhật state của mảng texts
    };
    const handleRender = async () => {
        let body = {};
        images.forEach((image, index) => {
            body = {
                ...body,
                ['image' + Number(index + 1)]: images[index],
            };
        });
        texts.forEach((image, index) => {
            body = {
                ...body,
                ['text' + Number(index + 1)]: texts[index],
            };
        });

        const res = await httpRequest.post(template.options.api, body);
        console.log(res);

        dispatch(
            selectVideoStock({
                name: template.name,
                url: res.data[0].url,
                duration: res.data[0].duration,
            }),
        );
    };
    return (
        <>
            <div className="template-title-container">
                <h1 className="template-title">Templates</h1>
                <span className="template-title-back" onClick={() => setTemplate(null)}>
                    🔙
                </span>
            </div>
            <h2 className="template-demo-title">Your video may like that</h2>
            <video src={template?.url} className="template-demo-video" controls />
            {videos.length > 0 && (
                <div className="template-wrap">
                    <h3 className="template-demo-title">Upload Video</h3>
                    {videos.map((item, index) => (
                        <div className="template-item" key={index}>
                            <h3 className="template-index-title">Video {index + 1}</h3>
                            <video key={index} src={videos[index]} className="stock-video" controls />
                            <div className="watermark-upload-container">
                                <input type="file" onChange={(event) => handleVideoUpload(event, index)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {images.length > 0 && (
                <div className="template-wrap">
                    <h3 className="template-demo-title">Upload Image</h3>
                    {images.map((item, index) => (
                        <div className="template-item" key={index}>
                            <h3 className="template-index-title">Image {index + 1}</h3>
                            <div className="watermark-image-container">
                                {images[index] ? (
                                    <img src={images[index]} alt={'item'} />
                                ) : (
                                    <img src="./default-image.png" alt="Your watermark" />
                                )}
                            </div>
                            <div className="watermark-upload-container">
                                <input type="file" onChange={(event) => handleImageUpload(event, index)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {texts.length > 0 && (
                <div className="template-wrap">
                    <h3 className="template-demo-title">Upload Text</h3>
                    {texts.map((item, index) => (
                        <div className="template-item" key={index}>
                            <h3 className="template-index-title">Text {index + 1}</h3>
                            <div className="subtitle-card">
                                <input
                                    type="text"
                                    className="subtitle-input"
                                    placeholder="New Text"
                                    style={{ padding: '10px' }}
                                    value={texts[index]}
                                    onChange={(event) => handleTextUpload(event, index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '22px' }}>
                <Button variant="outlined" style={{ textAlign: 'center' }} onClick={handleRender}>
                    Render 🎬
                </Button>
            </div>
        </>
    );
}

export default TemplateForm;
