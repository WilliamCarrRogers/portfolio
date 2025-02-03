import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
    const location = useLocation();
    const defaultStyles = {
        left: window.innerWidth,
        right: 0,
        opacity: 0
    }
    const [uStyles, setUStyles] = useState(defaultStyles);
    const hRef = useRef(null);
    const aRef = useRef(null);
    const pRef = useRef(null);
    const tRef = useRef(null);
    const cRef = useRef(null);
    const wRef = useRef(null);
    useEffect(() => {
        var box = null;
        switch (location.pathname) {
            case '/':
                box = hRef.current.getBoundingClientRect();
                break;
            case '/about-me':
                box = aRef.current.getBoundingClientRect();
                break;
            case '/projects':
                box = pRef.current.getBoundingClientRect();
                break;
            case '/testimonials':
                box = tRef.current.getBoundingClientRect();
                break;
            case '/work-history':
                box = wRef.current.getBoundingClientRect();
                break;
            case '/contact-me':
                box = cRef.current.getBoundingClientRect();
                break;
        }
        if (box) {
            var w = document.querySelector('html').clientWidth;
            if (box.left > uStyles.left) {
                setUStyles({
                    right: w - box.right,
                    left: uStyles.left,
                    opacity: 1
                });
            } else {
                setUStyles({
                    right: uStyles.right,
                    left: box.left,
                    opacity: 1
                });
            }
            setTimeout(() => {
                setUStyles({
                    right: w - box.right,
                    left: box.left,
                    opacity: 1
                });
            }, 150);
        } else {
            setUStyles(defaultStyles);
        }
    }, [location.pathname, hRef.current]);
    useEffect(() => {
        function handleResize() {
            var box = null;
            switch (location.pathname) {
                case '/':
                    box = hRef.current.getBoundingClientRect();
                    break;
                case '/about-me':
                    box = aRef.current.getBoundingClientRect();
                    break;
                case '/projects':
                    box = pRef.current.getBoundingClientRect();
                    break;
                case '/testimonials':
                    box = tRef.current.getBoundingClientRect();
                    break;
                case '/contact-me':
                    box = cRef.current.getBoundingClientRect();
                    break;
            }
            if (box) {
                var w = document.querySelector('html').clientWidth;
                setUStyles({
                    right: w - box.right,
                    left: box.left,
                    opacity: 1
                });
            } else {
                setUStyles(defaultStyles);
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        document.addEventListener('click', (e) => {
            if ((e.target.tagName != 'NAV' /*&& e.target.parentElement.tagName != 'NAV'*/ ) && noRef.current == 2) {
                setNavOpen(false);
            } else if (noRef.current == 1) {
                noRef.current = 2;
            }
        });
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const noRef = useRef(false);
    const [navOpen, setNavOpen] = useState(false);
    useEffect(() => {
        noRef.current = navOpen ? 1 : false;
    }, [navOpen]);
    return (
        <header>
            <div className="container">
                <h1>Will Rogers</h1>
                <div className="mobile-menu-button">
                    <button onClick={() => {
                        setNavOpen(true);
                    }} title="Open Mobile Menu" aria-label="Open Mobile Menu">
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                </div>
                <nav className={navOpen ? 'open' : null}>
                    <a className="mobile-nav-close" role="button" onClick={() => setNavOpen(false)}>&times;</a>
                    <Link ref={hRef} to="/" className={location.pathname == '/' ? 'current' : null}>Home</Link>
                    <Link ref={aRef} to="/about-me" className={location.pathname == '/about-me' ? 'current' : null}>About Me</Link>
                    <Link ref={pRef} to="/projects" className={location.pathname == '/projects' ? 'current' : null}>Projects</Link>
                    <Link ref={tRef} to="/testimonials" className={location.pathname == '/testimonials' ? 'current' : null}>Testimonials</Link>
                    <Link ref={wRef} to="/work-history" className={location.pathname == '/work-history' ? 'current' : null}>Work History</Link>
                    <Link ref={cRef} to="/contact-me" className={location.pathname == '/contact-me' ? 'current' : null}>Contact Me</Link>
                </nav>
            </div>
            <div className="nav-underline" style={uStyles}></div>
        </header>
    )
}

export default Header;