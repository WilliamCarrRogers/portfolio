import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ContactSection from '../components/contact-section.js';
import ILB from '../images/ilb.webp';
import RC from '../images/rc.webp';
import RPC from '../images/rpc.webp';
import UTD from '../images/utd.webp';

const Projects = () => {
    const [i, setI] = useState(0);
    const ProjectAnimate = (k) => {
        const images = document.querySelectorAll('.project-container');
        const l = images.length;
        var shuffle = true;
        var t = 750;
        var ease = 'cubic-bezier(.45,1,.65,0)';

        if (shuffle) {
            shuffle = false;
            var next = (i + 1 * k + l) % l;
            var third = (i + 2 * k + l) % l;
            var fourth = (i + 3 * k + l) % l;
            images[next].setAttribute('style', 'z-index: 2');
            images[third].setAttribute('style', 'z-index: 3');
            images[fourth].setAttribute('style', 'z-index: 1');
            images[i].animate([
                {
                    transform: 'translate(-50%, 0%) rotate(0deg)',
                    zIndex: 4
                },
                {
                    transform: 'translate(75%, 00%) rotate(10deg)',
                    zIndex: 4,
                    offset: 0.5
                },
                {
                    transform: 'translate(75%, 00%) rotate(10deg)',
                    zIndex: 1,
                    offset: 0.5
                },
                {
                    transform: 'translate(-50%, 0%) rotate(0deg)',
                    zIndex: 1
                },
            ], {
                duration: t,
                easing: ease
            });
            images[next].animate([
                {
                    transform: 'translate(-50%, 0%) rotate(0deg)',
                    zIndex: 2
                },
                {
                    transform: 'translate(-175%, 10%) rotate(-10deg)',
                    zIndex: 2,
                    offset: 0.5
                },
                {
                    transform: 'translate(-175%, 10%) rotate(-10deg)',
                    zIndex: 4,
                    offset: 0.5
                },
                {
                    transform: 'translate(-50%, 0%) rotate(0deg)',
                    zIndex: 4
                },
            ], {
                duration: t,
                easing: ease
            });
            setTimeout(function () {
                images[i].removeAttribute('style');
                images[next].setAttribute('style', 'z-index: 4');
                images[third].setAttribute('style', 'z-index: 2');
            }, t / 2);
            setTimeout(function () {
                images[fourth].setAttribute('style', 'z-index: 3');
                shuffle = true;
                setI((i + 1 * k + l) % l);
            }, t);
        }
    }
    return (
        <>
            <Helmet>
                <title>Will Rogers: Projects</title>
                <meta name="description" content="As a web developer, I have worked on numerous projects, ranging from entire websites to tools for websites. Check out some of the projects I've worked on." />
                <meta name="keywords" content="web developer, projects, wordpress, shopify" />
                <meta name="author" content="Will Rogers" />
                <meta property="og:title" content="Will Rogers: Projects" />
                <meta property="og:description" content="As a web developer, I have worked on numerous projects, ranging from entire websites to tools for websites. Check out some of the projects I've worked on." />
                <meta property="og:image" content="https://example.com/image.jpg" />
                <meta property="og:url" content="https://example.com/my-page" />
                <meta name="twitter:title" content="Will Rogers: Projects" />
                <meta name="twitter:description" content="As a web developer, I have worked on numerous projects, ranging from entire websites to tools for websites. Check out some of the projects I've worked on." />
                <meta name="twitter:image" content="https://example.com/image.jpg" />
            </Helmet>
            <h2>Projects</h2>
            <div className="projects-outter-container">
                <button className="project-change project-prev" onClick={() => {
                        ProjectAnimate(-1)
                }}>&lsaquo;</button>
                <div className="projects-inner-container">
                    <div className="project-container" style={{ zIndex: 4 }}>
                        <img src={ILB} width="400" height="200" alt="Irene Lee, MSW" />
                        <div className="project-title">Irene Lee, MSW</div>
                        <p>
                            I created a WordPress website for Irene Lee, a licensed social worker in Colorado.
                            It is a small website that is mobile responsive, ADA compliant, and optimized for search engines.
                        </p>
                        <a className="button" href="https://ireneleeboulder.com/" target="_blank">
                            Visit
                        </a>
                    </div>
                    <div className="project-container" style={{ zIndex: 2 }}>
                        <img src={RPC} width="400" loading="lazy" height="200" alt="RentalPropertyCalculator.io" />
                        <div className="project-title">RentalPropertyCalculator.io</div>
                        <p>
                            I developed this website using WordPress, ensuring it is mobile responsive, ADA-compliant,
                            and optimized for search engines. The website features a rental calculator created with JavaScript,
                            allowing users to calculate their return on investment and export results to a CSV file.
                            Additionally, I included a contact form that sends an email upon submission.
                        </p>
                        <a className="button" href="https://rentalpropertycalculator.io/" target="_blank">
                            Visit
                        </a>
                    </div>
                    <div className="project-container" style={{ zIndex: 3 }}>
                        <img src={RC} width="400" loading="lazy" height="200" alt="Sonoran Sky Real Estate" />
                        <div className="project-title">Sonoran Sky Real Estate</div>
                        <p>
                            I created multiple property calculators for the website.
                            There is a debt-to-income calculator, a down payment calculator, a mortgage payment calculator, and more.
                            I made the calculators using HTML, CSS, and JavaScript.
                        </p>
                        <a className="button" href="https://www.sonoranskyproperties.com/" target="_blank">
                            Visit
                        </a>
                    </div>
                    <div className="project-container">
                        <img src={UTD} width="400" loading="lazy" height="200" alt="USA Trading Depot" />
                        <div className="project-title">USA Trading Depot</div>
                        <p>
                            I made improvements to this Shopify website. I improved the page load speed by reducing unused JavaScript,
                            removing unused CSS, using webp and pjpg, lazy loaded images, using image source sets, and more.
                            I also made it more mobile-friendly and ADA-compliant.
                        </p>
                        <a className="button" href="https://www.usatradingdepot.com/" target="_blank">
                            Visit
                        </a>
                    </div>
                </div>
                <button className="project-change project-prev" onClick={() => {
                    ProjectAnimate(1)
                }}>&rsaquo;</button>
            </div>
            <ContactSection img={{ src: 'slideshow/laptop.webp', alt: 'Laptop with a website' }} >
                Do you need a website made? I can design and develop a one-of-a-kind website for you.
            </ContactSection>
            <div className="spacer-30"></div>
        </>
    )
}

export default Projects;