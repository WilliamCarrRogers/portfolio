const ContactSection = ({ children, img, extraClass, altDir }) => {
    return (
        <div className={"contact-section " + extraClass + (altDir ? ' alt-layout' : '')} >
            <img src={img.src} alt={img.alt} />
            <div className="contact-text-container">
                <div className="contact-text">{children}</div>
                <a className="contact-button" href="contact-me">
                    Hire The Best Web Developer
                </a>
            </div>
        </div>
    );
}

export default ContactSection;