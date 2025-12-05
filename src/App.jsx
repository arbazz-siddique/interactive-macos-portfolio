import React from 'react'
import gsap from "gsap";
import {Draggable} from "gsap/Draggable"

import {Dock, Navbar, Welcome} from "#components";
import {Terminal, Safari, Resume, Finder} from "#windows"


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
        </main>
    )
}
export default App
