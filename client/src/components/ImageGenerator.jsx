//imagegenrator,jsx

import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../assets/default_image.svg'
import axios from 'axios'

const ImageGenerator = () => {

    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);



    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        }

        try {
            setLoading(true)
            const response = await axios.post("https://ai-image-generator-obq2.vercel.app/api/generate-image", {
                prompt: inputRef.current.value,
            });
            console.log(response)

            const imageBase64 = response.data.image;
            const imageUrl = `data:image/png;base64,${imageBase64}`;
            setImage_url(imageUrl);

        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-image-generator">
            <div className="header">Ai image <span>generator</span></div>
            <div className="img-loading">
                <div className="image"><img src={image_url === "/" ? default_image : image_url} alt="" /></div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading....</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
                <div className="generate-btn" onClick={() => { imageGenerator() }}>Generate</div>
            </div>
        </div>
    )
}

export default ImageGenerator