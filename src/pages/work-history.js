import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContactSection from '../components/contact-section.js';

const WorkHistoryBody = ({ job }) => {
    return (
        <>
            <Helmet>
                <title>Will Rogers: Work History</title>
                <meta name="description" content="I've worked various web development jobs for different companies and as a freelance developer. Learn about my responsibilities for the jobs I've worked." />
                <meta name="keywords" content="web developer, work history, jobs" />
                <meta name="author" content="Will Rogers" />
                <meta property="og:title" content="Will Rogers: Work History" />
                <meta property="og:description" content="I've worked various web development jobs for different companies and as a freelance developer. Learn about my responsibilities for the jobs I've worked." />
                <meta property="og:image" content="https://example.com/image.jpg" />
                <meta property="og:url" content="https://example.com/my-page" />
                <meta name="twitter:title" content="Will Rogers: Work History" />
                <meta name="twitter:description" content="I've worked various web development jobs for different companies and as a freelance developer. Learn about my responsibilities for the jobs I've worked." />
                <meta name="twitter:image" content="https://example.com/image.jpg" />
            </Helmet>
            <div className={"work-item" + (job == 0 ? ' active' : '')}>
                <h3 className="work-title">React Web Developer <div className="work-date">Dec 2023 - Jun 2024</div></h3>
                <p>
                    I created a web trip planner for the Colorado Department of Transportation using React.
                    With the trip planner, you can plan trips on buses and find different places (eg. restaurants, stores, bars...)
                    that are on the way for the trip, save the trips that are planned, get the bus schedules, keep track of
                    all trips planned, the distanced ridden on the bus, how many miles were walked, the CO<sub>2</sub> emissions,
                    calories burned from walking, and much more. The trip planner is hosted on Google Cloud.
                </p>
                <p>
                    I also did some work on the API endpoint for the trip planner. The API endpoint for the trip planner is
                    written in Asp.NET and uses Microsoft SQL Server for the database. I updated the GTFS data in the database.
                </p>
                <p>
                    I also worked on a new website for the Cuyahoga Board of Health. Their website is a WordPress site. I updated some styles
                    for the website, did usability testing for the website, and made improvements to make it easier and faster to get information.
                </p>
            </div>
            <div className={"work-item" + (job == 1 ? ' active' : '')}>
                <h3 className="work-title">WordPress Web Developer <div className="work-date">Dec 2022 - Present</div></h3>
                <p>
                    I manage the AccuPOS website, which is built with WordPress.
                    My responsibilities include updating and maintaining the website.
                    I have added new images of their products and incorporated customer reviews.
                </p>
                <p>
                    Additionally, I create HTML for AccuPOS' email campaigns based on provided designs.
                    I ensure that the email lists are current by removing bounced and unresponsive email addresses to improve the open rate.
                </p>
            </div>
            <div className={"work-item" + (job == 2 ? ' active' : '')}>
                <h3 className="work-title">Web Developer <div className="work-date">June 2018 - Present</div></h3>
                <p>
                    I am involved in various web development projects for multiple clients.
                    I have created websites using platforms such as WordPress, Shopify, and Asp.NET.
                    I have also carried out website updates to ensure ADA compliance, mobile responsiveness,
                    improved speed, and search engine optimization. Additionally, I have developed different
                    types of calculators using JavaScript, HTML, and CSS.
                </p>
            </div>
            <div className={"work-item" + (job == 3 ? ' active' : '')}>
                <h3 className="work-title">Asp.NET Web Developer <div className="work-date">June 2016 - Dec 2021</div></h3>
                <p>
                    During my time at EMS Linq, I served as a full stack web developer, utilizing Asp.NET to build numerous ADA compliant,
                    mobile responsive websites, mainly for school districts. These websites utilized a custom content management system,
                    which I also updated. Additionally, I enhanced the system by making modifications to its components
                    and incorporating a photo cropper.
                </p>
                <p>
                    I also worked on improving the online forms portal.
                    This involved a complete redesign to enhance its usability and mobile responsiveness.
                    Furthermore, I significantly optimized the generation speed of reports for each form.
                </p>
            </div>
            <div className={"work-item" + (job == 4 ? ' active' : '')}>
                <h3 className="work-title">Math & Science Tutor <div className="work-date">July 2022 - Present</div></h3>
                <p>
                    I volunteered as a math and science tutor at the Alvis House to assist individuals in obtaining their GED.
                    I have successfully guided many individuals in passing their math and science tests to achieve their GED.
                </p>
            </div>
        </>
    );
}
const WorkHistory = () => {
    const [job, setJob] = useState(0);
    const zRef = useRef(null);
    const aRef = useRef(null);
    const fRef = useRef(null);
    const eRef = useRef(null);
    const vRef = useRef(null);
    const parentRef = useRef(null);
    const defaultStyles = {
        height: 0,
        left: 0,
        width: 10
    }
    const [addClass, setAddClass] = useState('');
    const [uStyles, setUStyles] = useState(defaultStyles);
    const changeJob = (j) => {
        setJob(j);
        var box = null;
        var parentBox = parentRef.current.getBoundingClientRect();
        switch (j) {
            case 0:
                box = zRef.current.getBoundingClientRect();
                break;
            case 1:
                box = aRef.current.getBoundingClientRect();
                break;
            case 2:
                box = fRef.current.getBoundingClientRect();
                break;
            case 3:
                box = eRef.current.getBoundingClientRect();
                break;
            case 4:
                box = vRef.current.getBoundingClientRect();
                break;
        }
        if (box) {
            setUStyles({
                height: 0,
                left: uStyles.left,
                width: uStyles.width
            });
            setTimeout(() => {
                console.log(parentRef.current.scrollLeft);
                setUStyles({
                    height: box.height + 2,
                    left: box.left - parentBox.left + parentRef.current.scrollLeft,
                    width: box.width
                });
                if (j == 0) {
                    setAddClass(' no-outline-left');
                } else {
                    setAddClass('');
                }
            }, 150);
        } else {
            setUStyles(defaultStyles);
        }
    }
    useEffect(() => {
        changeJob(0);
    },[]);
    return (
        <>
            <h2>Work History</h2>
            <div className="work-history-container">
                <div ref={parentRef} className="work-history-header">
                    <div className={"outline" + addClass} style={uStyles}></div>
                    <button ref={zRef} onClick={() => changeJob(0)}>ZED Digital</button>
                    <button ref={aRef} onClick={() => changeJob(1)}>AccuPOS</button>
                    <button ref={fRef} onClick={() => changeJob(2)}>Freelance</button>
                    <button ref={eRef} onClick={() => changeJob(3)}>EMS Linq</button>
                    <button ref={vRef} onClick={() => changeJob(4)}>Volunteer</button>
                </div>
                <div className={"work-history-body" + addClass}>
                    <WorkHistoryBody job={job} />
                </div>
            </div>
            <ContactSection img={{ src: 'slideshow/me-and-dog.webp', alt: 'Will Rogers: Web Developer' }} extraClass="mh-350" altDir={true} >
                Do you need a website made or updated? I can create or improve any website for you.
            </ContactSection>
        </>
    )
}

export default WorkHistory;