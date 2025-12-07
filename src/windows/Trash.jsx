import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";

import useWindowStore from "#store/window.js";
import { locations } from "#constants/index.js";

const Trash = () => {
    const trash = locations.trash.children;
    const { openWindow } = useWindowStore();

    const openImage = (file) => {
        if (file.fileType === "img") {
            openWindow("imgfile", file);
        }
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="trash" />
                <h2>Trash</h2>
            </div>

            <div className="p-4 bg-white w-[600px] h-[500px] grid items-start grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-auto">

                {trash.map((file) => (
                    <div
                        key={file.id}
                        onClick={() => openImage(file)}
                        className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-md transition"
                    >
                        <img
                            src={file.imageUrl}
                            alt={file.name}
                            className="w-full h-20 object-cover hover:scale-105 transition-transform"
                        />
                        <p className="text-center text-sm mt-1">{file.name}</p>
                    </div>
                ))}

            </div>
        </>
    );
};

const TrashWindow = WindowWrapper(Trash, "trash");
export default TrashWindow;
