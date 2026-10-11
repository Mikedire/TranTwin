"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
// import { loginUrl, registerUrl } from "@/app/authUtils"
import { useResponsive } from "@hook/useResponsive";
import { buildAuthorizeUrl } from "@lib/config";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { isMobile, isDesktop } = useResponsive();

  // Login/register URLs are driven by env config (see src/lib/config.ts)
  const loginUrl = buildAuthorizeUrl("login");
  const registerUrl = buildAuthorizeUrl("register");
  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Styles object for better organization
  const styles = {
    nav: {
      position: "fixed" as const,
      top: isMobile ? "0px" : "40px",
      left: isMobile ? "0px" : "60px",
      right: isMobile ? "0px" : "60px",
      width: isMobile ? "100%" : "calc(100% - 120px)",
      height: isMobile ? "60px" : "80px",
      backgroundColor: "white",
      borderBottom: "4px solid #DBDADE",
      borderRadius: isMobile ? "0px" : "6px",
      paddingLeft: isMobile ? "16px" : "24px",
      paddingRight: isMobile ? "16px" : "24px",
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      color: "#0070F3",
      fontSize: "24px",
      fontFamily: "Public Sans, sans-serif",
    },
    logoImage: {
      width: "auto",
      height: "auto",
    },
    mobileMenuButton: {
      display: isMobile ? "block" : "none",
      marginLeft: "auto",
      marginRight: "16px",
      color: "#0070F3",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    desktopNavContainer: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      gap: "24px",
      position: "absolute" as const,
      left: "50%",
      transform: "translateX(-50%)",
    },
    navLink: (isActive: boolean) => ({
      color: "#0070F3",
      fontSize: "14px",
      textDecoration: "none",
      transition: "color 0.3s ease",
      position: "relative" as const,
      paddingBottom: "4px",
      borderBottom: isActive ? "2px solid #0070F3" : "none",
    }),
    desktopButtonsContainer: {
      display: isMobile ? "none" : "flex",
      marginLeft: "auto",
      alignItems: "center",
      gap: "16px",
    },
    globeIcon: {
      width: "32px",
      height: "32px",
    },
    buttonGroup: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
    },
    signInButton: {
      backgroundColor: "white",
      color: "#0070F3",
      fontSize: "15px",
      paddingTop: "6px",
      paddingBottom: "6px",
      paddingLeft: "24px",
      paddingRight: "24px",
      borderRadius: "6px",
      border: "1px solid #0070F3",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      whiteSpace: "nowrap" as const,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    getStartedButton: {
      backgroundColor: "#2563eb",
      color: "white",
      fontSize: "15px",
      paddingTop: "6px",
      paddingBottom: "6px",
      paddingLeft: "24px",
      paddingRight: "24px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      whiteSpace: "nowrap" as const,
    },
    mobileMenu: {
      display: isMenuOpen && isMobile ? "flex" : "none",
      position: "absolute" as const,
      top: "60px",
      left: "0",
      right: "0",
      backgroundColor: "white",
      borderBottom: "4px solid #DBDADE",
      padding: "16px",
      flexDirection: "column" as const,
      gap: "16px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    mobileNavLink: {
      color: "#0070F3",
      fontSize: "16px",
      textDecoration: "none",
      transition: "color 0.3s ease",
      paddingTop: "8px",
      paddingBottom: "8px",
    },
    mobileButtonGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
      paddingTop: "8px",
    },
    mobileSignInButton: {
      backgroundColor: "white",
      color: "#0070F3",
      fontSize: "15px",
      paddingTop: "6px",
      paddingBottom: "6px",
      paddingLeft: "24px",
      paddingRight: "24px",
      borderRadius: "6px",
      border: "1px solid #0070F3",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      whiteSpace: "nowrap" as const,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    mobileGetStartedButton: {
      backgroundColor: "#2563eb",
      color: "white",
      fontSize: "15px",
      paddingTop: "6px",
      paddingBottom: "6px",
      paddingLeft: "24px",
      paddingRight: "24px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      whiteSpace: "nowrap" as const,
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <img
          src="/images/Vector%20(1).png"
          alt="TranTwin"
          style={styles.logoImage}
        />
      </div>

      {/* Mobile menu button */}
      <button
        style={styles.mobileMenuButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: "24px", width: "24px" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Desktop nav links */}
      <div style={styles.desktopNavContainer}>
        <a
          href="/"
          style={styles.navLink(isActiveLink("/"))}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1d4ed8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#0070F3")}
        >
          Home
        </a>
        <a
          href="/clinic"
          style={styles.navLink(isActiveLink("/clinic"))}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1d4ed8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#0070F3")}
        >
          Diagnose
        </a>
        <a
          href="#"
          style={styles.navLink(isActiveLink("/insight"))}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1d4ed8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#0070F3")}
        >
          Insight
        </a>
      </div>

      {/* Desktop buttons */}
      <div style={styles.desktopButtonsContainer}>
        <Image
          src="/icons/globe.svg"
          alt="TranTwin Logo"
          width={32}
          height={32}
          style={styles.globeIcon}
        />
        <div style={styles.buttonGroup}>
          <button
            style={styles.signInButton}
            onClick={() => (window.location.href = loginUrl)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#dbeafe")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "white")
            }
          >
            Sign In
          </button>
          <button
            style={styles.getStartedButton}
            onClick={() => (window.location.href = registerUrl)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0070F3")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563eb")
            }
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={styles.mobileMenu}>
        <a
          href="#"
          style={styles.mobileNavLink}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#93c5fd")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#0070F3")}
        >
          Home
        </a>
        <a
          href="/clinic"
          style={styles.mobileNavLink}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#93c5fd")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#0070F3")}
        >
          DBP Clinic
        </a>
        <a
          href="#"
          style={styles.mobileNavLink}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#93c5fd")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#0070F3")}
        >
          Insight
        </a>
        <div style={styles.mobileButtonGroup}>
          <button
            style={styles.mobileSignInButton}
            onClick={() => (window.location.href = loginUrl)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#dbeafe")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "white")
            }
          >
            <span>Sign In</span>
          </button>
          <button
            style={styles.mobileGetStartedButton}
            onClick={() => (window.location.href = registerUrl)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0070F3")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563eb")
            }
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
