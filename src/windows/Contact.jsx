import React from 'react';
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { socials } from "#constants/index.js";
import { WindowControls } from "#components";

const Contact = () => {
    const copyEmail = () => {
        navigator.clipboard.writeText("arbazzsiddiquecse@gmail.com");
        alert("Email copied to clipboard!");
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
            </div>

            <div className="p-6 space-y-6 bg-white text-gray-800">

                {/* Profile Image with Glow */}
                <div className="flex flex-col items-center space-y-3">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 animate-pulse blur-sm opacity-60"></div>
                        <img
                            src="/images/arbazz4.jpg"
                            alt="arbazz"
                            className="relative z-10 w-24 h-24 rounded-full object-cover"
                        />
                    </div>

                    <h3 className="text-xl font-semibold">Let's Connect</h3>
                    <p className="text-center text-gray-600">
                        Got an idea? Found a bug? Building something cool?
                        I’m always up for a good tech chat — hit me up anytime.
                    </p>

                    {/* Email */}
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={copyEmail}>
                        <p className="font-medium">arbazzsiddiquecse@gmail.com</p>
                        <span className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition">Copy</span>
                    </div>
                </div>

                {/* Social Links */}
                <ul className="grid grid-cols-2 gap-3">
                    {socials.map(({ id, bg, link, icon, text }) => (
                        <li
                            key={id}
                            style={{ backgroundColor: bg }}
                            className="rounded-lg shadow p-3 flex items-center space-x-3 text-white cursor-pointer transform transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 w-full">
                                <img src={icon} alt={text} className="size-5" />
                                <p className="font-medium">{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, 'contact');
export default ContactWindow;
