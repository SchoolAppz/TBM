import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, useScroll } from 'framer-motion';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const ScrollSection = ({ children, direction = 'left', delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const controls = useAnimation();
    const scrollY = useSmoothScroll();
    const [hasAnimated, setHasAnimated] = React.useState(false);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const elementTop = rect.top + scrollY;
            
            if (elementTop < viewportHeight * 0.8 && !hasAnimated) {
                controls.start('visible');
                setHasAnimated(true);
            }
        }
    }, [scrollY, controls, hasAnimated]);

    const variants = {
        hidden: {
            opacity: 0,
            x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
            y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 1,
                delay: delay,
                ease: "easeOut",
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className="scroll-section"
            style={{ 
                WebkitOverflowScrolling: 'touch',
                willChange: 'transform',
                transform: `translateY(${-scrollY * 0.1}px)`
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollSection; 
