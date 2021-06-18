import React from "react";
import { useSpring, animated } from "react-spring";
// import BackgroundImg from "../../img/bg.png";
// import BackgroundImg from "../../img/fl1.png";
import ZeroImg from "../../img/zero.png";
import PackImg from "../../img/pack.png";
import SloganImg from "../../img/slogan.png";
import "./paralax.scss";
const calc = (x: number, y: number) => [
    x - window.innerWidth / 2,
    y - window.innerHeight / 2,
];
const background = (p: number[]) =>
    `translate3d(calc(-50% + ${(p[0] / window.innerWidth) * 10}%),calc(-50% + ${
        (p[1] / window.innerHeight) * 10/2
    }%),0)`;
const zero = (p: number[]) =>
    `translate3d(calc(-50% + ${
        (p[0] / window.innerWidth) * 25
    }px),calc(-50% + ${(p[1] / window.innerHeight) * 25/4}%),0)`;
const pack = (p: number[]) =>
    `translate3d(calc(-50% + ${(p[0] / window.innerWidth) * 50}%),calc(-50% + ${
        (p[1] / window.innerHeight) * 33/4
    }% + 64px),0)`;

export default () => {
    const [props, set] = useSpring(() => ({
        xy: [0, 0],
        config: { mass: 10, tension: 550, friction: 140 },
    }));
    return (
        <>

            <div
                className="container"
                onMouseMove={({ clientX: x, clientY: y }) =>
                    set({ xy: calc(x, y) })
                }
            >
                <div className="slogan">
                    <img src={SloganImg} style={{maxWidth:"100%"}}/>
                </div>
                <animated.div
                    className="card card1"
                    style={{
                        transform: props.xy.interpolate(() =>
                            background(props.xy.getValue())
                        ),
                    }}
                >
                    {/* <img src={BackgroundImg} /> */}
                </animated.div>
                <animated.div
                    className="card card2"
                    style={{
                        transform: props.xy.interpolate(() =>
                            zero(props.xy.getValue())
                        ),
                    }}
                >
                    <img src={ZeroImg} />
                </animated.div>
                <animated.div
                    className="card card3"
                    style={{
                        transform: props.xy.interpolate(() =>
                            pack(props.xy.getValue())
                        ),
                    }}
                >
                    <img src={PackImg} />
                </animated.div>
            </div>
        </>
    );
};
