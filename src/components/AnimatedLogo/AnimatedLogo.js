import { jsx as _jsx } from "react/jsx-runtime";
// src/components/Logo/Logo.tsx
import { useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import "./AnimatedLogo.css";
const Logo = () => {
    const imgRef = useRef(null);
    const startAnimation = () => {
        const element = imgRef.current;
        if (!element)
            return;
        let start = null;
        let animationFrameId;
        const duration = 2000;
        const fullRotation = 360;
        const animate = (timestamp) => {
            if (!start)
                start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const angle = fullRotation * easeOut;
            element.style.transform = `rotate(${angle}deg)`;
            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    };
    useEffect(() => {
        startAnimation();
    }, []);
    return (_jsx("img", { ref: imgRef, src: logo, alt: "Logo", className: "logo-img", onClick: startAnimation }));
};
export default Logo;
