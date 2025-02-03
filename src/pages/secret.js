import { Change, TextBox } from '../components/inputs.js';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const chars = "SUPERMETROID";
    const l = chars.length;
    const _p = Change('-25477:/');
    const [unlocked, setUnlocked] = useState(false);
    const [title, setTitle] = useState();
    const [error, setError] = useState([]);
    const [password, setPassword] = useState('');
    useEffect(() => {
        var intId = setInterval(() => {
            setTitle("0000000000000000".replace(/[0]/g, c =>
                chars[(Math.random() * l) | 0]
            ));
        }, 500);
        return () => {
            clearInterval(intId);
        }
    }, []);
    const validate = (e) => {
        e.preventDefault();
        var err = [];
        if (password != _p) {
            err.push('That is the incorrect password.');
        } else {
            setUnlocked(true);
        }
        setError(err);
    }
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <h2>Top Secret</h2>
            {unlocked ? (
                <div className="contact-form message-sent">
                    <div>Find the missing items to make the below true and <Link to="/contact-me">send me a message</Link> with your answer for a prize:</div><br />
                    <div className="trivia">
                        ∀ n ∈ ℤ
                        <blank data-index="1"></blank>
                        ∧ ∀ m ∈ ℝ, m ≠ 0 → ∀ i ∈ [1,
                        <blank data-index="2"></blank>
                        ] ∈ ℤ, ∃ xᵢ ∈
                        <blank data-index="3"></blank>
                        (∀ i ∈ [1,
                        <blank data-index="4"></blank>
                        ] ∈ ℤ, xᵢⁿ = m ∧ ∀ i, k ∈ [1,
                        <blank data-index="5"></blank>
                        ] ∈ ℤ, i
                        <blank data-index="6"></blank>
                        k, (xᵢ
                        <blank data-index="7"></blank>
                        xₖ))
                    </div>
                </div>
            ): (
                <form className = "contact-form" onSubmit = { validate }>
                    <TextBox label = "Password" value = { password } onChange = { (e) => setPassword(e.target.value)} name="password" required />
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
        </>
    )
}

export default HomePage;