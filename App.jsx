import React from 'react';
import { motion } from 'framer-motion';
import ScrollSection from './components/ScrollSection';
import GridItem from './components/GridItem';
import Cursor from './components/Cursor';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <Cursor />
            <nav className="navbar">
                {/* Navigation content */}
            </nav>

            <section id="home" className="hero">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="glitch" data-text="Hello, I'm TBM">
                        Hello, I'm TBM
                    </h1>
                    {/* Other hero content */}
                </motion.div>
            </section>

            <ScrollSection direction="left">
                <section id="projects" className="section">
                    <div className="content-wrapper">
                        <h2 className="section-title">Featured Projects</h2>
                        <div className="project-grid">
                            {/* Project cards */}
                        </div>
                    </div>
                </section>
            </ScrollSection>

            <ScrollSection direction="right">
                <section id="skills" className="section">
                    <div className="content-wrapper">
                        <h2 className="section-title">Tech Stack</h2>
                        <div className="grid-container">
                            {['Frontend', 'Backend', 'Tools'].map((category, index) => (
                                <GridItem key={category} index={index}>
                                    <div className="content-box">
                                        <h3>{category}</h3>
                                        {/* Skill content */}
                                    </div>
                                </GridItem>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollSection>

            <ScrollSection direction="left">
                <section id="contact" className="section">
                    {/* Contact content */}
                </section>
            </ScrollSection>

            <Footer />
        </>
    );
}

export default App; 