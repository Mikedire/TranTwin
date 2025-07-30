"use client"

import Head from "next/head"
import Image from "next/image"
import React, { useState } from "react"
import Navbar from "@component/navbar/Navbar"
import Footer from "@sections/landing/footer"
import { marginTop } from "styled-system"

export default function Home() {
    // State for button hover effects since inline styles don't support :hover
    const [heroButtonHover, setHeroButtonHover] = useState(false)
    const [ctaButtonHover, setCtaButtonHover] = useState(false)
    const [dbpButtonHover, setDbpButtonHover] = useState(false)

    // Common styles object for reusability and maintainability
    const styles = {
        // Typography styles following the original design
        headingLarge: {
            fontFamily: 'Public Sans, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 4rem)', // Responsive font size
            fontWeight: 300,
            lineHeight: '120%',
            letterSpacing: '-2%',
            color: '#4B465C',
            margin: 0 // Reset default browser margins - this was missing!
        },
        headingMedium: {
            fontFamily: 'Public Sans, sans-serif',
            fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
            fontWeight: 300,
            lineHeight: '150%',
            letterSpacing: '0',
            margin: 0 // Reset default browser margins
        },
        bodyText: {
            fontFamily: 'Public Sans, sans-serif',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            fontWeight: 300,
            lineHeight: '150%',
            letterSpacing: '0',
            color: '#4A4A4A',
            margin: 0 // Reset default browser margins
        },
        // Button styles with primary blue theme
        primaryButton: {
            backgroundColor: heroButtonHover ? '#0070F3' : 'white',
            color: heroButtonHover ? 'white' : 'black',
            padding: '10px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Public Sans, sans-serif',
            marginTop: '2.25rem'
        },
        secondaryButton: {
            backgroundColor: ctaButtonHover ? '#0070F3' : '#3B82F6',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Public Sans, sans-serif'
        },
        // Container styles for consistent spacing
        container: {
            maxWidth: '1200px', // Updated to modern design standard
            margin: '0 auto',
            padding: '0 1rem'
        },
        // Grid system using flexbox for cross-browser compatibility
        gridRow: {
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '2rem',
            alignItems: 'stretch'
        },
        gridCol: {
            flex: '1',
            minWidth: '300px' // Ensures responsive behavior
        }
    }

    return (
        <>
            <Head>
                <title>DTO4T Landing Page</title>
                <meta name="description" content="DTO4T Landing Page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            {/* Hero Section with Overlayed Navbar */}
            <section style={{
                position: 'relative',
                width: '100%',
                minHeight: '50vh'
            }}>
                {/* <Navbar/> */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '75vh',
                    // Responsive height using CSS clamp
                    minHeight: 'clamp(60vh, 100vh, 80vh)'
                }}>
                    {/* Hero background image */}
                    <Image
                        src="/images/Hero 1.png"
                        alt="Hero Image"
                        layout="fill"
                        objectFit="cover"
                        priority
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                    />
                    
                    {/* Hero content overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            color: 'white',
                            padding: '0 1rem',
                            maxWidth: '64rem'
                        }}>
                            {/* Main heading */}
                            <h1 style={{
                                ...styles.headingLarge,
                                color: 'white',
                                marginBottom: '8px', // Fixed: explicit px instead of rem
                                wordBreak: 'break-word'
                            }}>
                                Transform Challenges into Action
                            </h1>
                            
                            {/* Subheading with gradient text effect */}
                            <h1 style={{
                                ...styles.headingLarge,
                                marginBottom: '16px', // Fixed: explicit px instead of rem
                                background: 'linear-gradient(to right, #d1e2ef, #f0f4f8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                with DBP Clinic + DocWriter
                            </h1>
                            
                            {/* Description paragraph */}
                            <div style={{ marginInline: '64px' }}>
                              <p style={{
                                ...styles.headingMedium,
                                color: 'white',
                                textAlign: 'center',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: 8,
                                marginBottom: '0px'
                            }}>
                                Transform your organization with AI-driven diagnostics and automated documentation in
                                one powerful platform.
                            </p>
                            </div>
                            
                            {/* CTA Button with hover effect */}
                            <button
                                style={styles.primaryButton}
                                onMouseEnter={() => setHeroButtonHover(true)}
                                onMouseLeave={() => setHeroButtonHover(false)}
                            >
                                Start your diagnosis
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                padding: 'clamp(3rem, 8vw, 4rem) 1rem',
                backgroundColor: 'white'
            }}>
                <div style={styles.container}>
                    {/* Two-column header layout */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap' as const,
                        gap: '2rem',
                        alignItems: 'flex-end', // Changed from 'stretch' to align items to bottom
                        marginBottom: '3rem'
                    }}>
                        <div style={styles.gridCol}>
                            <h2 style={{
                                fontFamily: 'Public Sans, sans-serif',
                                fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', // Responsive font size
                                fontWeight: 300,
                                lineHeight: '120%',
                                letterSpacing: '-2%',
                                color: '#4B465C',
                                margin: 0, // Reset default browser margins - this was missing!,
                                textAlign: 'left',
                                marginBottom: 0 // Remove bottom margin for precise alignment
                            }}>
                                AI-Driven Platform for Digital Transformation
                            </h2>
                        </div>
                        <div style={{
                            ...styles.gridCol,
                            display: 'flex',
                            alignItems: 'flex-end'
                        }}>
                            <p style={{
                                ...styles.bodyText,
                                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                                color: '#6B7280',
                                marginBottom: 0 // Remove bottom margin for precise alignment
                            }}>
                                Drive your organization's digital transformation, boosts productivity, and automates
                                processes.
                            </p>
                        </div>
                    </div>

                    {/* Four feature cards in responsive grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: 'clamp(1.5rem, 4vw, 2rem)'
                    }}>
                        {/* Feature Card 1 */}
                        <div style={{
                            position: 'relative',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            height: '480px'
                        }}>
                            <Image
                                src="/images/image1.png"
                                alt="Feature 1"
                                layout="fill"
                                objectFit="cover"
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                            {/* Gradient overlay for text readability */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '33.333%',
                                background: 'linear-gradient(to top, #2563EB, transparent)'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    color: 'white',
                                    padding: '1rem'
                                }}>
                                    <h3 style={{
                                        ...styles.headingMedium,
                                        color: 'white',
                                        textAlign: 'left',
                                        marginBottom: '0.5rem'
                                    }}>
                                        AI-Powered Diagnostics (DBP Clinic)
                                    </h3>
                                    <p style={{
                                        ...styles.bodyText,
                                        color: 'white',
                                        textAlign: 'left'
                                    }}>
                                        Leverage AI to automate and optimize operations, driving faster and smarter
                                        digital transformation.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature Card 2 */}
                        <div style={{
                            position: 'relative',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            height: '480px'
                        }}>
                            <Image
                                src="/images/image2.png"
                                alt="Feature 2"
                                layout="fill"
                                objectFit="cover"
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '33.333%',
                                background: 'linear-gradient(to top, #2563EB, transparent)'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    color: 'white',
                                    padding: '1rem'
                                }}>
                                    <h3 style={{
                                        ...styles.headingMedium,
                                        color: 'white',
                                        textAlign: 'left',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Tailored Transformation Initiatives
                                    </h3>
                                    <p style={{
                                        ...styles.bodyText,
                                        color: 'white',
                                        textAlign: 'left'
                                    }}>
                                        We map your challenges to custom digital transformation initiatives, providing
                                        you with a clear action plan.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature Card 3 */}
                        <div style={{
                            position: 'relative',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            height: '480px'
                        }}>
                            <Image
                                src="/images/image3.png"
                                alt="Feature 3"
                                layout="fill"
                                objectFit="cover"
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '33.333%',
                                background: 'linear-gradient(to top, #2563EB, transparent)'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    color: 'white',
                                    padding: '1rem'
                                }}>
                                    <h3 style={{
                                        ...styles.headingMedium,
                                        color: 'white',
                                        textAlign: 'left',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Automated Documentation with DocWriter
                                    </h3>
                                    <p style={{
                                        ...styles.bodyText,
                                        color: 'white',
                                        textAlign: 'left'
                                    }}>
                                        DocWriter automatically generates specification documents, making it easy to
                                        take immediate action.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature Card 4 */}
                        <div style={{
                            position: 'relative',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            height: '480px'
                        }}>
                            <Image
                                src="/images/image4.png"
                                alt="Feature 4"
                                layout="fill"
                                objectFit="cover"
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '33.333%',
                                background: 'linear-gradient(to top, #2563EB, transparent)'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    color: 'white',
                                    padding: '1rem'
                                }}>
                                    <h3 style={{
                                        ...styles.headingMedium,
                                        color: 'white',
                                        textAlign: 'left',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Scalable, Low-Cost Transformation
                                    </h3>
                                    <p style={{
                                        ...styles.bodyText,
                                        color: 'white',
                                        textAlign: 'left'
                                    }}>
                                        DTO4T offers solutions with a low entry cost, allowing your organization to grow
                                        at its own pace while managing costs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DBP Clinic Section */}
            <section style={{
                padding: 'clamp(3rem, 8vw, 4rem) 1rem',
                backgroundColor: 'white'
            }}>
                <div style={styles.container}>
                    {/* Section heading with gradient text */}
                    <h2 style={{
                        ...styles.headingLarge,
                        color: '#2E3A59',
                        marginBottom: '2rem',
                        textAlign: 'left',
                        // Removed paddingLeft to align flush with content below
                    }}>
                        Your AI <span style={{
                            background: 'linear-gradient(to right, #00B5E2, #0070F3)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            DBP Clinic
                        </span> + DocWriter
                    </h2>
                    
                    {/* Two-column layout for images and content */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'clamp(2rem, 6vw, 2.5rem)',
                        alignItems: 'start' // Align items to top for better layout
                    }}>
                        {/* Image gallery column */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap' as const,
                            // justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            {/* First image */}
                            <div style={{
                                position: 'relative',
                                margin: '0.5rem',
                                width: '100%',
                                maxWidth: '260px'
                            }}>
                                <Image
                                    src="/images/Frame 33937.png"
                                    alt="AI Image 1"
                                    width={260}
                                    height={325}
                                    style={{
                                        objectFit: 'cover',
                                        borderRadius: '6px',
                                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            </div>
                            
                            {/* Second image with offset */}
                            <div style={{
                                position: 'relative',
                                margin: '0.5rem',
                                marginTop: 'clamp(1rem, 4vw, 5rem)', // Responsive top margin
                                width: '100%',
                                maxWidth: '260px'
                            }}>
                                <Image
                                    src="/images/Frame 33938.png"
                                    alt="AI Image 2"
                                    width={260}
                                    height={325}
                                    style={{
                                        objectFit: 'cover',
                                        borderRadius: '6px',
                                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            </div>
                        </div>
                        
                        {/* Content column with numbered steps */}
                        <div style={{
                            flex: 1, // Take remaining space
                            minWidth: '300px' // Ensure minimum width for readability
                        }}>
                            {/* Step 1 */}
                            <div style={{
                                marginBottom: '1.5rem'
                            }}>
                                <h3 style={{
                                    ...styles.headingMedium,
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'flex-start'
                                }}>
                                    <span style={{
                                        color: '#0070F3',
                                        marginRight: '0.75rem',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold'
                                    }}>
                                        01
                                    </span>
                                    <span>
                                        Identify Your Organizational Challenges
                                    </span>
                                </h3>
                                <p style={{
                                    ...styles.bodyText,
                                    marginLeft: '2rem'
                                }}>
                                    Engage in a smart conversation with the AI to pinpoint key pain points in your
                                    organization—whether it's automation gaps, workflow inefficiencies, or team productivity hurdles.
                                </p>
                            </div>
                            
                            {/* Step 2 */}
                            <div style={{
                                marginBottom: '1.5rem'
                            }}>
                                <h3 style={{
                                    ...styles.headingMedium,
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'flex-start'
                                }}>
                                    <span style={{
                                        color: '#0070F3',
                                        marginRight: '0.75rem',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold'
                                    }}>
                                        02
                                    </span>
                                    <span>
                                        AI Diagnosis & Initiative Mapping
                                    </span>
                                </h3>
                                <p style={{
                                    ...styles.bodyText,
                                    marginLeft: '2rem'
                                }}>
                                    DTO4T's AI analyzes your inputs and maps them to a relevant digital transformation
                                    initiative, providing a clear path to tackle your organization's challenges.
                                </p>
                            </div>
                            
                            {/* Step 3 */}
                            <div style={{
                                marginBottom: '1.5rem'
                            }}>
                                <h3 style={{
                                    ...styles.headingMedium,
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'flex-start'
                                }}>
                                    <span style={{
                                        color: '#0070F3',
                                        marginRight: '0.75rem',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold'
                                    }}>
                                        03
                                    </span>
                                    <span>
                                        Generate Key Specs with DocWriter
                                    </span>
                                </h3>
                                <p style={{
                                    ...styles.bodyText,
                                    marginLeft: '2rem'
                                }}>
                                    Automatically generate detailed specifications for your digital transformation
                                    initiative using DocWriter, ready to be used for execution and implementation.
                                </p>
                            </div>
                            
                            {/* CTA Button */}
                            <div style={{
                                marginLeft: '2rem',
                                marginTop: '1rem'
                            }}>
                                <button
                                    style={{
                                        backgroundColor: dbpButtonHover ? '#0070F3' : '#3B82F6',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        fontFamily: 'Public Sans, sans-serif'
                                    }}
                                    onMouseEnter={() => setDbpButtonHover(true)}
                                    onMouseLeave={() => setDbpButtonHover(false)}
                                >
                                    Start your diagnosis
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <Footer /> */}
        </>
    )
}