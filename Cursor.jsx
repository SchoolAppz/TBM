import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isTrackpad, setIsTrackpad] = useState(false);
    let lastScrollTime = Date.now();

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Get scroll position
            const scrollX = window.pageXOffset;
            const scrollY = window.pageYOffset;

            setMousePosition({
                x: e.clientX + scrollX,
                y: e.clientY + scrollY
            });
        };

        const handleScroll = () => {
            const now = Date.now();
            if (now - lastScrollTime < 50) {
                setIsTrackpad(true);
            }
            lastScrollTime = now;

            // Update cursor position on scroll
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: mousePosition.x,
                clientY: mousePosition.y
            });
            document.dispatchEvent(mouseEvent);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('scroll', handleScroll);
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('scroll', handleScroll);
        };
    }, [mousePosition.x, mousePosition.y]);

    return (
        <>
            <motion.div
                className="cursor"
                animate={{
                    x: mousePosition.x - 10,
                    y: mousePosition.y - 10
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28
                }}
            />
            <motion.div
                className="cursor-follower"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 24,
                    mass: 0.5
                }}
                style={{
                    display: isTrackpad ? 'none' : 'block'
                }}
            />
        </>
    );
};

export default Cursor; 