import React from "react";
import useWindowStore from "#store/window.js";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    // If no data -> don't show window
    if (!data) return null;

    const {
        name,
        subtitle,
        description,
        image,      // Some files use "image"
        imageUrl,   // Some use "imageUrl"
    } = data;

    const displayImage = image || imageUrl;

    return (
        <>
            {/* Window Header */}
            <div id="window-header">
                <WindowControls target="txtfile" />
                <h2>{name}</h2>
            </div>

            {/* Window Content */}
            <div className="p-5 space-y-6 bg-white overflow-auto max-h-[70vh] text-gray-800">

                {/* Image (optional) */}
                {displayImage && (
                    <div className="w-full">
                        <img
                            src={displayImage}
                            alt={name}
                            className="w-full h-auto rounded"
                        />
                    </div>
                )}

                {/* Subtitle (optional) */}
                {subtitle && (
                    <h3 className="text-lg font-semibold">{subtitle}</h3>
                )}

                {/* Description paragraphs */}
                {Array.isArray(description) && description.length > 0 && (
                    <div className="space-y-3 leading-relaxed text-base">
                        {description.map((para, idx) => (
                            <p key={idx}>{para}</p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
