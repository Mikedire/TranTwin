"use client"

import React from "react"
import { useResponsive } from "@hook/useResponsive"

const Footer = () => {
    const { isMobile, isTablet, isDesktop } = useResponsive()

    // Styles object for better organization
    const styles = {
        footerSection: {
            borderBottom: '1px solid #DBDADE',
            paddingLeft: isMobile ? '16px' : isTablet ? '24px' : '84px',
            paddingRight: isMobile ? '16px' : isTablet ? '24px' : '84px',
            margin: '0 auto',
            width: '100%',
            paddingTop: '40px',
            paddingBottom: '40px',
            background: 'linear-gradient(to right, #d1e2ef, #f0f4f8)',
            backdropFilter: 'blur(16px)'
        },
        footerContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: (isMobile ? 'column' : 'row') as React.CSSProperties['flexDirection'],
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-end',
            gap: isMobile ? '32px' : '0',
            paddingTop: '40px'
        },
        newsletterSection: {
            display: 'flex',
            flexDirection: 'column' as React.CSSProperties['flexDirection'],
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: '16px',
            width: isMobile ? '100%' : 'auto'
        },
        logoImage: {
            width: '125px',
            height: 'auto'
        },
        newsletterText: {
            color: '#4B465C',
            textAlign: (isMobile ? 'center' : 'left') as React.CSSProperties['textAlign'],
            fontFamily: 'Public Sans, sans-serif',
            fontSize: '15px',
            lineHeight: '22px',
            letterSpacing: '0'
        },
        inputContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            maxWidth: '400px',
            height: '38px',
            borderTop: '1px solid #3b82f6',
            borderBottom: '1px solid #3b82f6',
            borderLeft: '1px solid #3b82f6',
            borderRadius: '6px',
            background: 'linear-gradient(to right, #d1e2ef, #f0f4f8)'
        },
        emailInput: {
            width: '100%',
            height: '100%',
            color: '#4A4A4A',
            fontSize: '15px',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: '12px',
            paddingRight: '12px',
            outline: 'none',
            border: 'none',
            borderRadius: '6px 0 0 6px',
            backgroundColor: 'transparent'
        },
        subscribeButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3b82f6',
            color: 'white',
            minWidth: '124px',
            height: '38px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '10px',
            paddingBottom: '10px',
            borderRadius: '0 6px 6px 0',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
        },
        linksContainer: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(3, 1fr)' : 'none',
            gap: isMobile ? '32px' : isTablet ? '32px' : '40px',
            width: isMobile ? '100%' : 'auto',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            ...(isDesktop && !isTablet && {
                display: 'flex'
            })
        },
        linkSection: {
            display: 'flex',
            flexDirection: 'column' as React.CSSProperties['flexDirection'],
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        },
        sectionTitle: {
            fontWeight: '600',
            fontSize: '15px',
            lineHeight: '21px',
            fontFamily: 'Public Sans, sans-serif',
            letterSpacing: 'normal',
            color: '#4B465C'
        },
        linkList: {
            listStyle: 'none',
            padding: '0',
            margin: '0',
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'column' as React.CSSProperties['flexDirection'],
            gap: isMobile ? '16px' : '16px'
        },
        linkItem: {
            color: '#4B465C',
            fontFamily: 'Public Sans, sans-serif',
            fontWeight: 'normal',
            fontSize: '15px',
            lineHeight: '22px',
            letterSpacing: 'normal',
            textDecoration: 'none',
            transition: 'text-decoration 0.3s ease'
        },
        newBadge: {
            backgroundColor: '#0070F3',
            color: 'white',
            fontSize: '13px',
            lineHeight: '14px',
            fontFamily: 'Public Sans, sans-serif',
            fontWeight: '500',
            letterSpacing: 'normal',
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '2px',
            paddingBottom: '2px',
            borderRadius: '4px',
            marginLeft: '4px'
        },
        copyrightSection: {
            width: '100%',
            backgroundColor: '#1A1A1A',
            display: 'flex',
            flexDirection: (isMobile ? 'column' : 'row') as React.CSSProperties['flexDirection'],
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: isMobile ? '16px' : '24px',
            paddingRight: isMobile ? '16px' : '24px',
            paddingTop: isMobile ? '16px' : '0',
            paddingBottom: isMobile ? '16px' : '0',
            height: isMobile ? 'auto' : '77px'
        },
        copyrightText: {
            color: 'white',
            textAlign: (isMobile ? 'center' : 'left') as React.CSSProperties['textAlign'],
            marginLeft: isMobile ? '0' : '64px',
            fontFamily: 'Public Sans, sans-serif',
            fontSize: '15px',
            fontWeight: 'bold',
            lineHeight: '22px',
            letterSpacing: '0px',
            marginBottom: isMobile ? '16px' : '0'
        },
        yearSpan: {
            fontWeight: 'normal',
            color: '#B0B0B0'
        },
        socialLinks: {
            display: 'flex',
            gap: '24px',
            marginLeft: isMobile ? '0' : 'auto'
        },
        socialLink: {
            color: 'white',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 'normal',
            lineHeight: '22px',
            letterSpacing: '0px',
            transition: 'color 0.3s ease'
        }
    }

    return (
        <>
            {/* Footer */}
            <footer style={styles.footerSection}>
                <div style={styles.footerContainer}>
                    {/* Newsletter Subscription */}
                    <div style={styles.newsletterSection}>
                        {/* Image Section */}
                        <img 
                            src="/images/Vector.png" 
                            alt="DTO4T" 
                            style={styles.logoImage}
                        />
                        {/* Text Section */}
                        <p style={styles.newsletterText}>
                            Subscribe to our newsletter to receive the latest
                            {!isMobile && <br />} insights on Digital Transformation!
                        </p>
                        {/* Input and Button Section */}
                        <div style={styles.inputContainer}>
                            <input
                                type="email"
                                placeholder="Your email"
                                style={styles.emailInput}
                            />
                            <button
                                style={styles.subscribeButton}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0070F3'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div style={styles.linksContainer}>
                        {/* Quick Links Section */}
                        <div style={styles.linkSection}>
                            <p style={styles.sectionTitle}>
                                Quick Links
                            </p>
                            <ul style={styles.linkList}>
                                <li>
                                    <a 
                                        href="#" 
                                        style={styles.linkItem}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        DBP Clinic
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        style={styles.linkItem}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        Insight
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        style={styles.linkItem}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        Your Account
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Get to Know Us Section */}
                        <div style={styles.linkSection}>
                            <p style={{...styles.sectionTitle, color: '#4A4A4A'}}>
                                Get to Know Us
                            </p>
                            <ul style={styles.linkList}>
                                <li>
                                    <a 
                                        href="#" 
                                        style={{...styles.linkItem, color: '#4A4A4A'}}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        About DTO4T
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        style={{...styles.linkItem, color: '#4A4A4A'}}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        Updates{" "}
                                        <span style={styles.newBadge}>
                                            New
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        style={{...styles.linkItem, color: '#4A4A4A'}}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Legal Section */}
                        <div style={styles.linkSection}>
                            <p style={{...styles.sectionTitle, color: '#4A4A4A'}}>
                                Legal
                            </p>
                            <ul style={styles.linkList}>
                                <li>
                                    <a 
                                        href="#" 
                                        style={{...styles.linkItem, color: '#4A4A4A'}}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        style={{...styles.linkItem, color: '#4A4A4A'}}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        Cookie Policy
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        style={{...styles.linkItem, color: '#4A4A4A'}}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Copyright Section */}
            <section style={styles.copyrightSection}>
                <p style={styles.copyrightText}>
                    &copy; <span style={styles.yearSpan}>2024</span> DTO4T
                </p>
                {/* Social Media Links */}
                <div style={styles.socialLinks}>
                    <a 
                        href="#"
                        style={styles.socialLink}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#93c5fd'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                    >
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a 
                        href="#"
                        style={styles.socialLink}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#93c5fd'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a 
                        href="#"
                        style={styles.socialLink}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#93c5fd'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                    >
                        <i className="fab fa-youtube"></i>
                    </a>
                    <a 
                        href="#"
                        style={styles.socialLink}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#93c5fd'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </section>
        </>
    )
}

export default Footer