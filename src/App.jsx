import React from 'react'
import gsap from "gsap";
import {Draggable} from "gsap/Draggable"

import {Dock, Home, Navbar, Welcome} from "#components";
import {Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos, Trash} from "#windows"



gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main >
            <Navbar/>
            <Welcome/>
            <Dock/>
            <Terminal/>
            <Safari/>
            <Resume/>
            <Finder/>
            <Text/>
            <Image/>
            <Contact />
            <Home/>
            <Photos/>
            <Trash/>
        </main>
    )
}
export default App
