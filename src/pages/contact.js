import { useState } from 'react';
import { TextBox, TextArea } from '../components/inputs.js';
import { Helmet } from 'react-helmet';
import emailjs from 'emailjs-com';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState([]);
    const [messageSent, setMessageSent] = useState(false);
    const validate = () => {
        var err = [];
        if (!name) {
            err.push('Please include your name.');
        }
        if (!email) {
            err.push('Please include your email.');
        } else {
            if (!String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                err.push('The provided email is not a valid email.');
            }
        }
        if (!message) {
            err.push('Please include a message.');
        }
        return err;
    }
    const sendMessage = (e) => {
        e.preventDefault();
        var err = validate();
        setError(err);
        if (err.length == 0) {
            try {
                emailjs.sendForm(process.env.REACT_APP_S_ID, process.env.REACT_APP_T_ID, e.target, process.env.REACT_APP_U_ID)
                    .then((result) => {
                        console.log(result);
                        setMessageSent(true);
                    }, (_error) => {
                        console.log(_error);
                        setError(['There was an unexpected error. Please try again later.']);
                    }).catch(_error => {
                        console.log(_error);
                        setError(['There was an unexpected error. Please try again later.']);
                    });
            } catch (_error) {
                console.log(_error);
                setError(['There was an unexpected error. Please try again later.']);
            }
        }
    }
    return (
        <>
            <Helmet>
                <title>Will Rogers: Contact Me</title>
                <meta name="description" content="Do you have a website that needs to be made or updated? Then I am the man for the job. Contact me to hire the best web developer for all your web-related needs." />
                <meta name="keywords" content="web developer, contact, hire" />
                <meta name="author" content="Will Rogers" />
                <meta property="og:title" content="Will Rogers: Contact Me" />
                <meta property="og:description" content="Do you have a website that needs to be made or updated? Then I am the man for the job. Contact me to hire the best web developer for all your web-related needs." />
                <meta property="og:image" content="https://example.com/image.jpg" />
                <meta property="og:url" content="https://example.com/my-page" />
                <meta name="twitter:title" content="Will Rogers: Contact Me" />
                <meta name="twitter:description" content="Do you have a website that needs to be made or updated? Then I am the man for the job. Contact me to hire the best web developer for all your web-related needs." />
                <meta name="twitter:image" content="https://example.com/image.jpg" />
            </Helmet>
            <h2>Contact Me</h2>
            <p>
                If you have any work that needs to be done on a website, or if you need one built, or anything else,
                please use the form below to contact me. Thank you, and I look forward to hearing from you.
            </p>
            {messageSent ? (
                <div className="contact-form message-sent">
                    Thank you for your message. I will get back to you as soon as possible.
                </div>
            ): (
                <form className="contact-form" onSubmit={sendMessage}>
                    <TextBox label="Your Name" value={ name } onChange={ (e) => setName(e.target.value)} name="from_name" required />
                    <TextBox label="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="reply_to" required />
                    <TextArea label="Message" value={message} onChange={(e) => setMessage(e.target.value)} name="message" required />
                    <input type="submit" className="button" value="Send" />
                </form>
            )}
            {error.length > 0 ? (
                <div className="error-text">
                    {error.map((e, i) => (
                        <span key={i}>{e}</span>
                    ))}
                </div>
            ) : null}
            <div className="or-container">
                <div></div>
                <span>OR</span>
                <div></div>
            </div>
            <p>
                You can also contact me on my Upwork profile if you have a web development job that you would like me to work on.&nbsp; 
                <a href="https://www.upwork.com/freelancers/willrogers" aria-label="Will Rogers's Upword Profile" title="Will Rogers's Upword Profile" target="_blank">Click here to go to my Upwork profile.</a>
            </p>
            <div className="spacer-30"></div>
        </>
    )
}

export default Contact;