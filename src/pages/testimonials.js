import Stars from '../components/stars.js';
import { Helmet } from 'react-helmet';
import ContactSection from '../components/contact-section.js';
import { Container, Col } from '../components/layout.js'

const Testimonials = () => {
    return (
        <>
            <Helmet>
                <title>Will Rogers: Testimonials</title>
                <meta name="description" content="I have worked for many different people, and have left them all very happy with the work that I did for them. Read the testimonials of my past clients." />
                <meta name="keywords" content="web developer, testimonials, positive" />
                <meta name="author" content="Will Rogers" />
                <meta property="og:title" content="Will Rogers: Testimonials" />
                <meta property="og:description" content="I have worked for many different people, and have left them all very happy with the work that I did for them. Read the testimonials of my past clients." />
                <meta property="og:image" content="https://example.com/image.jpg" />
                <meta property="og:url" content="https://example.com/my-page" />
                <meta name="twitter:title" content="Will Rogers: Testimonials" />
                <meta name="twitter:description" content="I have worked for many different people, and have left them all very happy with the work that I did for them. Read the testimonials of my past clients." />
                <meta name="twitter:image" content="https://example.com/image.jpg" />
            </Helmet>
            <h2>Testimonials</h2>
            <Container>
                <Col size="4">
                    <Stars rating="5" />
                    <q>
                        William was fantastic to work with, very knowledgeable and quick to respond/offer help.
                        Would definitely recommend William and I will be back when I have other projects. Thanks again.
                    </q>
                    <div className="quote-attr">Riley</div>
                </Col>
                <Col size="4">
                    <Stars rating="5" />
                    <q>
                        William is a math genius! He built numerous calculators for me and figures out all the formulas without my help!
                        So very impressed by the design and function of the work William did for my company.
                        William is professional, punctual, and easy to work with. I will happily use Will on other
                        web site needs and highly recommend him.
                    </q>
                    <div className="quote-attr">Marcella</div>
                </Col>
                <Col size="4">
                    <Stars rating="5" />
                    <q>
                        William's commitment to getting the project done right is very much appreciated.
                        We will continue using William's services on future projects. AAA+
                    </q>
                    <div className="quote-attr">Roy</div>
                </Col>
                <Col size="4">
                    <Stars rating="5" />
                    <q>
                        Great work, good communicator, quick response.
                    </q>
                    <div className="quote-attr">Bradford</div>
                </Col>
                <Col size="4">
                    <Stars rating="5" />
                    <q>
                        Fantastic job, very happy with the results. Thanks again.
                    </q>
                    <div className="quote-attr">Riley</div>
                </Col>
                <Col size="4">
                    <Stars rating="5" />
                    <q>
                        William was very thorough and honest with his analysis.
                        He could have easily swindled me as other freelancers tried in an attempt to create more work,
                        but he was 100% honest and diligent. Will use again.
                    </q>
                    <div className="quote-attr">Eric</div>
                </Col>
            </Container>
            <ContactSection img={{ src: 'slideshow/will-rogers.webp', alt: 'Laptop with a website' }} >
                Do you want to be the next satisfied customer? Contact me for your web development project.
            </ContactSection>
        </>
    )
}

export default Testimonials;