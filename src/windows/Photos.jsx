import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import { gallery, photosLinks } from "#constants/index.js";
import useWindowStore from "#store/window.js";

const Photos = () => {
    const { openWindow } = useWindowStore();

    const handleOpenImage = (img) => {
        openWindow("imgfile", {
            name: "Photo",
            imageUrl: img, // THIS sends the clicked image
        });
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="photos" />
                <h2>Gallery</h2>
            </div>

            <div className="flex h-full bg-white">

                {/* Sidebar */}
                <div className="w-40 border-r p-4 space-y-4 bg-gray-50">
                    {photosLinks.map(({ id, icon, title }) => (
                        <div key={id} className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-black transition">
                            <img src={icon} alt={title} className="w-5" />
                            <p className="text-sm font-medium">{title}</p>
                        </div>
                    ))}
                </div>

                {/* Gallery */}
                <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-auto">
                    {gallery.map(({ id, img }) => (
                        <div
                            key={id}
                            className="w-full h-32 rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => handleOpenImage(img)}
                        >
                            <img
                                src={img}
                                alt="gallery"
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const PhotosWindow = WindowWrapper(Photos, "photos");
export default PhotosWindow;
