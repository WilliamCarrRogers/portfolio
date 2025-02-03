import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ContactSection from '../components/contact-section.js';
import { useEffect, useState } from 'react'

const About = () => {
    const [sp, setSp] = useState(0);
    const scroll = (id) => {
        var box = window.document.getElementById(id).getBoundingClientRect();
        window.scrollTo(window.scrollX, window.scrollY + box.y - 150);
    }
    useEffect(() => {
        const onScroll = () => {
            setSp(window.scrollY / (document.body.scrollHeight - window.innerHeight - 150));
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);
    return (
        <>
            <Helmet>
                <title>Will Rogers: My Story</title>
                <meta name="description" content={"I am a full-stack web developer from Columbus, Ohio. I graduated from Otterbein University and have been working as web developer for the past " + ((new Date()).getFullYear() - 2016) + " years."} />
                <meta name="keywords" content="web developer, full-stack, otterbein, asp.net" />
                <meta name="author" content="Will Rogers" />
                <meta property="og:title" content="Will Rogers: My Story" />
                <meta property="og:description" content={"I am a full-stack web developer from Columbus, Ohio. I graduated from Otterbein University and have been working as web developer for the past " + ((new Date()).getFullYear() - 2016) + " years."} />
                <meta property="og:image" content="https://example.com/image.jpg" />
                <meta property="og:url" content="https://example.com/my-page" />
                <meta name="twitter:title" content="Will Rogers: My Story" />
                <meta name="twitter:description" content={"I am a full-stack web developer from Columbus, Ohio. I graduated from Otterbein University and have been working as web developer for the past " + ((new Date()).getFullYear() - 2016) + " years."} />
                <meta name="twitter:image" content="https://example.com/image.jpg" />
            </Helmet>
            <div className="time-line">
                <a role="button" onClick={() => scroll("1991")} style={{ color: sp > 0 ? 'var(--primary)' : null, borderColor: sp > 0 ? 'var(--highlight)' : null, background: sp > 0 ? 'var(--highlight)' : null}}>1991</a>
                <div><span style={{ width: Math.max(0, Math.min(1, sp * 4)) * 100 + '%' }}></span></div>
                <a role="button" onClick={() => scroll("2014")} style={{ color: sp > 0.25 ? 'var(--primary)' : null, borderColor: sp > 0.25 ? 'var(--highlight)' : null, background: sp > 0.25 ? 'var(--highlight)' : null }}>2014</a>
                <div><span style={{ width: Math.max(0, Math.min(1, sp * 4 - 1)) * 100 + '%' }}></span></div>
                <a role="button" onClick={() => scroll("2016")} style={{ color: sp > 0.5 ? 'var(--primary)' : null, borderColor: sp > 0.5 ? 'var(--highlight)' : null, background: sp > 0.5 ? 'var(--highlight)' : null }}>2016</a>
                <div><span style={{ width: Math.max(0, Math.min(1, sp * 4 - 2)) * 100 + '%' }}></span></div>
                <a role="button" onClick={() => scroll("2018")} style={{ color: sp > 0.75 ? 'var(--primary)' : null, borderColor: sp > 0.75 ? 'var(--highlight)' : null, background: sp > 0.75 ? 'var(--highlight)' : null }}>2018</a>
                <div><span style={{ width: Math.max(0, Math.min(1, sp * 4 - 3)) * 100 + '%' }}></span></div>
                <a role="button" onClick={() => scroll("2023")} style={{ color: sp > 1 ? 'var(--primary)' : null, borderColor: sp > 1 ? 'var(--highlight)' : null, background: sp > 1 ? 'var(--highlight)' : null }}>2023</a>
            </div>
            <h2>My Story</h2>
            <h3 id="1991">1991</h3>
            <section>
                <img className="img-left" width="190" height="81" style={{ shapeOutside: "polygon(0 50%, 50% 0, 100% 60%, 100% 100%, 0 100%)"}} src="images/grant.webp" alt="Grant Hospital" />
                <p>
                    I was born at Grant Hospital on September 10, 1991, in Columbus, Ohio, and I have lived in Columbus my entire life.
                    I attended Whetstone High School and later went to Otterbein University.
                    Ever since I was a kid, I've been passionate about playing video games and board games,
                    and I would spend a lot of time on the computer. I excelled in school and also participated in
                    track and field for three years during high school.
                </p>
            </section>
            <h3 id="2014">2014</h3>
            <section>
                <img className="img-right" src="images/otterbein.webp" style={{ shapeOutside: "polygon(40% 0, 100% 0, 100% 100%, 40% 100%, 16% 65%, 16% 35%)" }} alt="Otterbein University" />
                <p>
                    I attended Otterbein University and graduated in 2014.
                    I have a strong passion for mathematics, which led me to earn a degree in math and science education.
                    During my final year at Otterbein University, I began learning web development on my own and realized that it was my true calling.
                    After graduation, I continued to teach myself various programming skills, including C#, Java, and game development.
                    Currently, I apply my degree by volunteering as a tutor for GED students in math and science.
                </p>
                <p>
                    After graduating, I met my now-wife. She was pursuing a degree in computer science at a
                    university in the Philippines and needed assistance. I began helping her understand her coursework and complete her projects.
                    This not only helped her, but also helped me learn faster as I had to understand the material in order to help her with her studies.
                </p>
            </section>
            <h3 id="2016">2016</h3>
            <section>
                <img className="img-left" width="165" height="162" style={{
                    shapeOutside: "polygon(0 0, 93% 0, 100% 30%, 79% 52%, 85% 80%, 67% 100%, 0 100%)"
                }} src="images/esv.webp" alt="eSchoolView Web Developer" />
                <p>
                    I started my first web development job in 2016 at eSchoolView,
                    which was later bought by EMS Linq, and I continued to work there until the end of 2021.
                    I worked as a full stack web developer there, using Asp.NET to make the websites and MSSQL server for the database.
                    I made many websites for schools, and some for other businesses, such as one for the National Softball Association.
                    I would ensure that the websites were ADA-compliant and mobile-responsive.
                    The websites that we made used a content management system that was in-house built,
                    and I had made updates to the CMS and made some stored procedures.
                </p>
                <p>
                    I also worked on the online forms for schools as well.
                    I redesigned how the online forms looked, created forms, and improved the performance of the forms portal.
                    I improved the speed at which the reports are generated by over 1000%.
                </p>
                <p>
                    When we lost access to the Google Analytics account for the websites we manage,
                    I developed a custom analytics solution using JavaScript and C# and stored the data in SQL Server.
                    I then integrated the analytics into the CMS to display the data in graphs.
                </p>
            </section>
            <h3 id="2018">2018</h3>
            <section>
                <img className="img-right" width="86" height="81" style={{ shapeOutsite: "circle(50%)" }} src="images/webtech-solutions.webp" alt="WebTech Solutions" />
                <p>
                    In 2018, I started doing freelance work. I have worked for many different people and companies.
                    I have made websites using Asp.NET, React, and WordPress. I also made updates to websites, making them ADA-compliant,
                    mobile responsive, and improving the onsite SEO and performance, and many other updates that were required.
                    I currently do freelance work and if you have work that you need done, <Link to="/contact-me">contact me</Link>.
                </p>
            </section>
            <h3 id="2023">2023</h3>
            <section>
                <img className="img-left" width="209" height="81" src="images/zed.webp" alt="ZED Digital" />
                <p>
                    I started working with ZED Digital at the end of 2023.
                    I created a web trip planner using React for the Colorado Department of Transportation that included the ability to log in,
                    plan trips, save trips, and purchase tickets. We used Google Cloud to host the website and the backend, which I worked on.
                    I also took an online course for Google Cloud and got a Google Cloud Engineer certificate.
                </p>
            </section>
            <ContactSection img={{ src: 'slideshow/me-and-wifex600.webp', alt: 'Will Rogers: Web Developer' }} extraClass="mh-350" altDir={true}>
                Do you have an upcoming web development project coming up? I can help you with that.
            </ContactSection>
        </>
    )
}

export default About;