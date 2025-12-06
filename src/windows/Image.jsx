import React from 'react'
import useWindowStore from "#store/window.js";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

const Image = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;
    if(!data) return null;
    const { name, imageUrl, image } = data;
    const src = imageUrl || image;

    return <>
        <div id="window-header">
            <WindowControls target="imgfile" />
            <h2>{name}</h2>
        </div>

        <div className="bg-white p-4 max-h-[75vh] overflow-auto flex justify-center">
            <img
                src={src}
                alt={name}
                className="rounded shadow-md max-w-full h-auto"
            />
        </div>
    </>
}
const ImageWindow = WindowWrapper(Image,'imgfile')
export default ImageWindow
