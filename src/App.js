import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Change } from './components/inputs.js';
import { useState, useEffect } from 'react';
import Header from './components/header.js'
import Home from './pages/home.js'
import About from './pages/about.js'
import Projects from './pages/projects.js'
import Testimonials from './pages/testimonials.js'
import WorkHistory from './pages/work-history.js'
import Contact from './pages/contact.js'
import Secret from './pages/secret.js'
import Error from './pages/404.js'

function App() {
    const _p = "/" + Change('):/(52)9');
    const [consoleOpen, setConsoleOpen] = useState(false);
    const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (!consoleOpen) {
                var currentSize = {
                    w: window.innerWidth,
                    h: window.innerHeight
                };
                if (currentSize.w < windowSize.w - 80 || currentSize.h < windowSize.h - 80) {
                    setConsoleOpen(true);
                    setTimeout(() => {
                        console.log('Hello.');
                        setTimeout(() => console.log('Would you like to solve a puzzle?'), 1500);
                        setTimeout(() => console.log('If so, find what is not found and wait 30 seconds.'), 3500);
                    }, 1500);
                }
                setWindowSize(currentSize);
            }
        });
    }, []);
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-me" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/work-history" element={<WorkHistory />} />
                    <Route path="/contact-me" element={<Contact />} />
                    <Route path={_p} element={<Secret />} />
                    <Route path="/*" element={<Error />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;