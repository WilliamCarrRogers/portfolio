import SlideShow from '../components/slideshow.js';
import { Helmet } from 'react-helmet';

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>Will Rogers: Web Developer</title>
                <meta name="description" content="I am Will Rogers, an exceptional full-stack web developer from Columbus, Ohio. I have made hundreds of mobile-responsive, ADA-compliant SEO-optimized websites." />
                <meta name="keywords" content="web developer, ada, seo, react" />
                <meta name="author" content="Will Rogers" />
                <meta property="og:title" content="Will Rogers: Web Developer" />
                <meta property="og:description" content="I am Will Rogers, an exceptional full-stack web developer from Columbus, Ohio. I have made hundreds of mobile-responsive, ADA-compliant SEO-optimized websites." />
                <meta property="og:image" content="https://example.com/image.jpg" />
                <meta property="og:url" content="https://example.com/my-page" />
                <meta name="twitter:title" content="Will Rogers: Web Developer" />
                <meta name="twitter:description" content="I am Will Rogers, an exceptional full-stack web developer from Columbus, Ohio. I have made hundreds of mobile-responsive, ADA-compliant SEO-optimized websites." />
                <meta name="twitter:image" content="https://example.com/image.jpg" />
            </Helmet>
            <SlideShow slides={[
                {
                    imageRight: true,
                    title: 'Ohio Web Developer',
                    text: 'My name is Will Rogers. I am a highly skilled web developer from Columbus, Ohio. I have been a web developer for ***' + ((new Date()).getFullYear() - 2016) + ' years***. I have a beautiful wife and daughter and two dogs.',
                    button: {
                        text: 'Learn More About Me',
                        href: 'about-me'
                    },
                    img: {
                        srcs: [
                            {
                                src: 'slideshow/me-and-wife.webp',
                                width: 800
                            },
                            {
                                src: 'slideshow/me-and-wifex600.webp',
                                width: 600
                            },
                            {
                                src: 'slideshow/me-and-wifex380.webp',
                                width: 380
                            }
                        ],
                        alt: 'Me and my wife'
                    }
                },
                {
                    imageRight: false,
                    title: 'High Quality Websites',
                    text: 'I have worked on a variety different projects and always deliver ***excellent results***. Through these many projects and continuous learning, I have honed my skills with ***HTML***, ***CSS***, ***JavaScript***, ***React***, ***Node***, ***PHP***, ***Asp.NET***, ***SQL***, ***ADA Compliance***, and more.',
                    button: {
                        text: 'See What Others Are Saying',
                        href: 'testimonials'
                    },
                    img: {
                        srcs: [
                            {
                                src: 'slideshow/me-and-dogs.webp',
                                width: 450
                            },
                            {
                                src: 'slideshow/me-and-dogsx380.webp',
                                width: 380
                            }
                        ],
                        alt: 'Me and my dogs'
                    }
                },
                {
                    imageRight: true,
                    title: 'Exceptional Worker',
                    text: 'I am a hard worker and I love to make websites. I have made hundreds of websites, making them ***ADA Compliant***, ***Mobile Responsive***, and ***Optimized for Speed and Search Engines***.',
                    button: {
                        text: 'Hire Me',
                        href: 'contact-me'
                    },
                    img: {
                        srcs: [
                            {
                                src: 'slideshow/me-and-dog.webp',
                                width: 520
                            },
                            {
                                src: 'slideshow/me-and-dogx380.webp',
                                width: 380
                            }
                        ],
                        alt: 'Me and my dog'
                    }
                },
                {
                    imageRight: false,
                    title: 'Recent Projects',
                    text: 'I have worked on many different kinds of websites. I have worked on ***WordPress*** and ***Shopify*** websites, and I have built them from scratch. I have also made many tools for websites, such as calculators.',
                    button: {
                        text: 'See My Recent Projects',
                        href: 'projects'
                    },
                    img: {
                        srcs: [
                            {
                                src: 'slideshow/will-rogers.webp',
                                width: 800
                            },
                            {
                                src: 'slideshow/will-rogersx600.webp',
                                width: 600
                            },
                            {
                                src: 'slideshow/will-rogersx380.webp',
                                width: 380
                            }
                        ],
                        alt: 'Will Rogers: Exceptional Web Developer'
                    }
                }
            ]} />
        </>
    )
}

export default HomePage;