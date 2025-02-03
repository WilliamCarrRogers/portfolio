import { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    const [grid, setGrid] = useState(null);
    const canvas = useRef(null);
    const animate = () => {
        if (!canvas.current)
            return;
        moveBalls();
        updateGrid();
        var ctx = canvas.current.getContext('2d');
        ctx.fillStyle = '#00FF00';
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        for (var x = 0; x < grid.length - 1; x++) {
            for (var y = 0; y < grid[0].length - 1; y++) {
                var shape = getShape(x, y);
                if (shape.length) {
                    ctx.beginPath();
                    ctx.moveTo(shape[0].x | 0, shape[0].y | 0);
                    for (var i = 1; i < shape.length; i++) {
                        ctx.lineTo(shape[i].x | 0, shape[i].y | 0);
                    }
                    ctx.fill();
                    //ctx.stroke();
                    ctx.closePath();
                }
            }
        }
        //ctx.fillStyle = '#0000ff';
        //for (var k = 0; k < balls.length; k++) {
        //    ctx.beginPath();
        //    ctx.arc(balls[k].x, balls[k].y, 8, 0, 6.283);
        //    ctx.fill();
        //    ctx.closePath();
        //}
    }
    const init = () => {
        var size = { x: 80, y: 50 };
        var g = [];
        var _balls = [];
        var w = canvas.current.width;
        var h = canvas.current.height;
        for (var i = 0; i < 16; i++) {
            _balls.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vel: {
                    x: Math.random() * 2 - 1,
                    y: Math.random() * 2 - 1,
                    max: 2
                },
                acc: {
                    x: Math.random() * 0.1 - 0.05,
                    y: Math.random() * 0.1 - 0.05,
                    max: 0.05
                }
            });
        }
        setBalls(_balls);
        for (var i = 0; i < size.x; i++) {
            var col = [];
            for (var j = 0; j < size.y; j++) {
                var val = 0;
                for (var k = 0; k < _balls.length; k++) {
                    var distSqr = Math.pow(_balls[k].x - i * w / size.x, 2) + Math.pow(_balls[k].y - j * h / size.y, 2);
                    var dist = Math.sqrt(distSqr);
                    if (dist < 5) {
                        val += 1;
                    } else {
                        val += 5 / dist;
                    }
                }
                col.push(val);
            }
            g.push(col);
        }
        setGrid(g);
    }
    const getShape = (x, y) => {
        var w = canvas.current.width / (grid.length - 1);
        var h = canvas.current.height / (grid[0].length - 1);
        var radius = 0.3;
        var p1 = grid[x][y] - radius;
        var p2 = grid[x + 1][y] - radius;
        var p3 = grid[x][y + 1] - radius;
        var p4 = grid[x + 1][y + 1] - radius;
        if (p1 > -0 && p2 > 0 && p3 > 0 && p4 > 0) {
            return [
                {
                    x: x * w,
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h + h
                },
                {
                    x: x * w,
                    y: y * h + h
                },
            ];
        }
        if (p1 < 0 && p2 > 0 && p3 > 0 && p4 > 0) {
            return [
                {
                    x: x * w,
                    y: y * h + h * interpolate(p1, p3)
                },
                {
                    x: x * w + w * interpolate(p1, p2),
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h + h
                },
                {
                    x: x * w,
                    y: y * h + h
                },
            ];
        }
        if (p1 > 0 && p2 < 0 && p3 > 0 && p4 > 0) {
            return [
                {
                    x: x * w,
                    y: y * h
                },
                {
                    x: x * w + w * interpolate(p1, p2),
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h + h * interpolate(p2, p4)
                },
                {
                    x: x * w + w,
                    y: y * h + h
                },
                {
                    x: x * w,
                    y: y * h + h
                },
            ];
        }
        if (p1 > 0 && p2 > 0 && p3 < 0 && p4 > 0) {
            return [
                {
                    x: x * w,
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h + h
                },
                {
                    x: x * w + w * interpolate(p3, p4),
                    y: y * h + h
                },
                {
                    x: x * w,
                    y: y * h + h * interpolate(p1, p3)
                },
            ];
        }
        if (p1 > 0 && p2 > 0 && p3 > 0 && p4 < 0) {
            return [
                {
                    x: x * w,
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h + h * interpolate(p2, p4)
                },
                {
                    x: x * w + w * interpolate(p3, p4),
                    y: y * h + h
                },
                {
                    x: x * w,
                    y: y * h + h
                },
            ];
        }
        if (p1 < 0 && p2 < 0 && p3 > 0 && p4 > 0) {
            return [
                {
                    x: x * w,
                    y: y * h + h * interpolate(p1, p3)
                },
                {
                    x: x * w + w,
                    y: y * h + h * interpolate(p2, p4)
                },
                {
                    x: x * w + w,
                    y: y * h + h
                },
                {
                    x: x * w,
                    y: y * h + h
                },
            ];
        }
        if (p1 < 0 && p2 > 0 && p3 < 0 && p4 > 0) {
            return [
                {
                    x: x * w + w * interpolate(p1, p2),
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h + h
                },
                {
                    x: x * w + w * interpolate(p3, p4),
                    y: y * h + h
                },
            ];
        }
        if (p1 < 0 && p2 > 0 && p3 > 0 && p4 < 0) {
            return [
                {
                    x: x * w,
                    y: y * h + h * interpolate(p1, p3)
                },
                {
                    x: x * w + w * interpolate(p1, p2),
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h + h * interpolate(p2, p4)
                },
                {
                    x: x * w + w * interpolate(p3, p4),
                    y: y * h + h
                },
                {
                    x: x * w,
                    y: y * h + h
                },
            ];
        }
        if (p1 > 0 && p2 < 0 && p3 < 0 && p4 > 0) {
            return [
                {
                    x: x * w,
                    y: y * h
                },
                {
                    x: x * w + w * interpolate(p1, p2),
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h + h * interpolate(p2, p4)
                },
                {
                    x: x * w + w,
                    y: y * h + h
                },
                {
                    x: x * w + w * interpolate(p3, p4),
                    y: y * h + h
                },
                {
                    x: x * w,
                    y: y * h + h * interpolate(p1, p3)
                },
            ];
        }
        if (p1 > 0 && p2 < 0 && p3 > 0 && p4 < 0) {
            return [
                {
                    x: x * w,
                    y: y * h
                },
                {
                    x: x * w + w * interpolate(p1, p2),
                    y: y * h
                },
                {
                    x: x * w + w * interpolate(p3, p4),
                    y: y * h + h
                },
                {
                    x: x * w,
                    y: y * h + h
                },
            ];
        }
        if (p1 > 0 && p2 > 0 && p3 < 0 && p4 < 0) {
            return [
                {
                    x: x * w,
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h + h * interpolate(p2, p4)
                },
                {
                    x: x * w,
                    y: y * h + h * interpolate(p1, p3)
                },
            ];
        }
        if (p1 > 0 && p2 < 0 && p3 < 0 && p4 < 0) {
            return [
                {
                    x: x * w,
                    y: y * h
                },
                {
                    x: x * w + w * interpolate(p1, p2),
                    y: y * h
                },
                {
                    x: x * w,
                    y: y * h + h * interpolate(p1, p3)
                },
            ];
        }
        if (p1 < 0 && p2 > 0 && p3 < 0 && p4 < 0) {
            return [
                {
                    x: x * w + w,
                    y: y * h
                },
                {
                    x: x * w + w * interpolate(p1, p2),
                    y: y * h
                },
                {
                    x: x * w + w,
                    y: y * h + h * interpolate(p2, p4)
                },
            ];
        }
        if (p1 < 0 && p2 < 0 && p3 > 0 && p4 < 0) {
            return [
                {
                    x: x * w,
                    y: y * h + h
                },
                {
                    x: x * w + w * interpolate(p3, p4),
                    y: y * h + h
                },
                {
                    x: x * w,
                    y: y * h + h * interpolate(p1, p3)
                },
            ];
        }
        if (p1 < 0 && p2 < 0 && p3 < 0 && p4 > 0) {
            return [
                {
                    x: x * w + w,
                    y: y * h + h
                },
                {
                    x: x * w + w * interpolate(p3, p4),
                    y: y * h + h
                },
                {
                    x: x * w + w,
                    y: y * h + h * interpolate(p2, p4)
                },
            ];
        }
        if (p1 < 0 && p2 < 0 && p3 < 0 && p4 < 0) {
            return [];
        }
        console.log('Missed');
        return [];
    }
    const interpolate = (n1, n2) => {
        return Math.max(-1, Math.min(1, (-n1 / (n2 - n1))));
        //return 0.5;
        //return Math.abs(n2 / (Math.abs(n1) + Math.abs(n2)));
    }
    const moveBalls = () => {
        setBalls((b) => {
            var _balls = [...b];
            var w = canvas.current.width;
            var h = canvas.current.height;
            for (var k = 0; k < _balls.length; k++) {
                _balls[k].x += _balls[k].vel.x * 0.5;
                _balls[k].y += _balls[k].vel.y * 0.5;
                _balls[k].vel.x += _balls[k].acc.x * 0.5;
                _balls[k].vel.y += _balls[k].acc.y * 0.5;
                _balls[k].vel.x = Math.min(_balls[k].vel.max, Math.max(-_balls[k].vel.max, _balls[k].vel.x));
                _balls[k].vel.y = Math.min(_balls[k].vel.max, Math.max(-_balls[k].vel.max, _balls[k].vel.y));
                _balls[k].acc.x += Math.random() * 0.05 - 0.025;
                _balls[k].acc.y += Math.random() * 0.05 - 0.025;
                if (_balls[k].x < 30) {
                    _balls[k].acc.x += _balls[k].acc.max / 2;
                }
                if (_balls[k].y < 30) {
                    _balls[k].acc.y += _balls[k].acc.max / 2;
                }
                if (_balls[k].x > w - 30) {
                    _balls[k].acc.x -= _balls[k].acc.max / 2;
                }
                if (_balls[k].y > h - 30) {
                    _balls[k].acc.y -= _balls[k].acc.max / 2;
                }
                _balls[k].acc.x = Math.min(_balls[k].acc.max, Math.max(-_balls[k].acc.max, _balls[k].acc.x));
                _balls[k].acc.y = Math.min(_balls[k].acc.max, Math.max(-_balls[k].acc.max, _balls[k].acc.y));
            }
            return _balls;
        });
    }
    const updateGrid = () => {
        setGrid((_g) => {
            var g = [..._g];
            var w = canvas.current.width;
            var h = canvas.current.height;
            for (var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[0].length; j++) {
                    var val = 0;
                    for (var k = 0; k < balls.length; k++) {
                        var distSqr = Math.pow(balls[k].x - i * w / (grid.length - 1), 2) + Math.pow(balls[k].y - j * h / (grid[0].length - 1), 2);
                        var dist = Math.sqrt(distSqr);
                        if (dist < 5) {
                            val += 1;
                        } else {
                            val += 5 / dist;
                        }
                    }
                    g[i][j] = val;
                }
            }
            return g;
        });
    }
    const [balls, setBalls] = useState();
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        setFrame(frame + 1);
        if (grid) {
            window.requestAnimationFrame(animate);
        }
    }, [grid]);
    useEffect(() => {
        init();
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight - 86;
    }, [canvas.current]);
    return (
        <>
            <Helmet>
                <title>404 Page Not Found</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <h2 className="black-highlight">404 Not Found</h2>
            <p className="black-highlight">
                The page you were looking for was not found. Please go <a style={{ cursor: 'pointer' }} role="button" onClick={() => window.history.back()}>back</a> or go to the <Link to='/'>homepage</Link>.
            </p>
            {frame > 1800 ? (
                <>
                    <p className="black-highlight text-center">
                        Deocde the message below to find the pathname to a page and its password.
                    </p>
                    <div className="code-container">
                        <code>
                            0100000111111<br />
                            1000101001001<br />
                            0010010111101<br />
                            1000111000000
                        </code>
                        <code>
                            0100111111011<br />
                            0010101000001<br />
                            0110000101000<br />
                            0110000110011
                        </code>
                    </div>
                </>
            ) : null}
            {frame > 2400 ? (
                <>
                    <p className="black-highlight text-center">
                        Having trouble? Heres a clue: &nbsp; 25 &nbsp; 17 &nbsp; 9
                    </p>
                </>
            ) : null}
            <canvas className="e-canvas" ref={canvas}></canvas>
        </>
    )
}

export default ErrorPage;