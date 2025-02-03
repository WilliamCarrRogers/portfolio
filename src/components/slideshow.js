import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SlideShow = ({ slides, slideTimeout }) => {
    const timeout = slideTimeout ?? 10000
    const [slideIndex, setSlideIndex] = useState(0);
    useEffect(() => {
        var intId = setInterval(() => {
            setSlideIndex(i => {
                i++;
                if (i == slides.length)
                    return 0;
                return i;
            });
        }, timeout);
        return () => {
            clearInterval(intId);
        }
    }, []);
    return (
        <div className="slide-show">
            {slides.map((slide, i) => (
                <div key={i} className={"slide" + (i == slideIndex ? ' is-active' : '') + (slide.imageRight ? ' layout-1' : ' layout-2')}>
                    {slide.imageRight ? (
                        <>
                            <div className="slide-text">
                                <h2 className="black-highlight">{slide.title}</h2>
                                <span className="black-highlight">{slide.text.split('***').map((val, z) => {
                                    if (z % 2 == 0)
                                        return <span key={z}>{val}</span>
                                    return <strong key={z}>{val}</strong>
                                })}</span>
                                {slide.button ? (
                                    <Link to={slide.button.href} className="slide-button">
                                        {slide.button.text}
                                    </Link>
                                ): null}
                            </div>
                            <img className="slide-img" src={slide.img.srcs[0].src} alt={slide.img.alt}
                                srcSet={slide.img.srcs.reverse().map((src, j) => {
                                    return src.src + ' ' + src.width + 'w';
                                }).join(', ')}
                                sizes={slide.img.srcs.reverse().map((src, j) => {
                                    if (j == slide.img.srcs.length - 1)
                                        return src.width + 'w';
                                    return '(max-width: ' + (src.width + 50) + 'px) ' + src.width + 'w';
                                }).join(', ')} />
                        </>
                    ): (
                        <>
                            <img className="slide-img" src={slide.img.src} alt={slide.img.alt}
                                srcSet={slide.img.srcs.reverse().map((src, j) => {
                                    return src.src + ' ' + src.width + 'w';
                                }).join(', ')}
                                sizes={slide.img.srcs.reverse().map((src, j) => {
                                    if (j == slide.img.srcs.length - 1)
                                        return src.width + 'w';
                                    return '(max-width: ' + (src.width + 50) + 'px) ' + src.width + 'w';
                                }).join(', ')} />
                            <div className="slide-text">
                                <h2 className="black-highlight">{slide.title}</h2>
                                <span className="black-highlight">{slide.text.split('***').map((val, z) => {
                                    if (z % 2 == 0)
                                        return <span key={z}>{val}</span>
                                    return <strong key={z}>{val}</strong>
                                })}</span>
                                {slide.button ? (
                                    <Link to={slide.button.href} className="slide-button">
                                        {slide.button.text}
                                    </Link>
                                ): null}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default SlideShow;