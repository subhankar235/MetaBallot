import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";

// INTERNAL IMPORT
import { VotingContext } from "../../context/Voter";

// MetaBallot Logo SVG
function MetaBallotLogo({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2L36.5 11V29L20 38L3.5 29V11L20 2Z"
        stroke="#FF9D00"
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse cx="20" cy="20" rx="9" ry="6" stroke="#FF9D00" strokeWidth="1.2" fill="none" />
      <circle cx="20" cy="20" r="3" fill="#FF9D00" />
      <circle cx="20" cy="20" r="5" stroke="rgba(255,157,0,0.4)" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "FAQ", href: "#faq" },
];

const dropdownLinks = [
  { label: "Home", path: "/home" },
  { label: "Register Candidate", path: "/candidate-regisration" },
  { label: "Register Voter", path: "/allowed-voters" },
  { label: "Voter List", path: "/voterList" },
];

const syne = { fontFamily: "'Syne', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

const NavBar = () => {
  const { connectWallet, error, currentAccount } = useContext(VotingContext);
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const isLandingPage = router.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenNav(false);
    if (openNav) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openNav]);

  return (
    <>
      {/* Error banner */}
      {error && error !== "" && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100000,
            background: "rgba(255,60,60,0.15)", backdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(255,60,60,0.3)",
            padding: "8px 24px", textAlign: "center",
            ...mono, fontSize: "0.75rem", color: "#ff9d9d",
          }}
        >
          {error}
        </div>
      )}

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: "16px 24px", display: "flex", alignItems: "center",
          justifyContent: "space-between", transition: "all 0.5s ease",
          background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid transparent",
        }}
      >
        {/* Logo — Next.js 12 requires a single <a> child inside <Link> */}
        <Link href="/" passHref>
          <a style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <MetaBallotLogo size={32} />
            <span style={{ ...syne, color: "#F5F5F5", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
              MetaBallot
            </span>
          </a>
        </Link>

        {/* Nav links — only show on landing page, hidden on mobile */}
        {isLandingPage && (
          <div className="nav-links-desktop" style={{ display: "none", gap: "28px", alignItems: "center" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ ...syne, fontSize: "0.875rem", color: "#888", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "#F5F5F5")}
                onMouseLeave={(e) => (e.target.style.color = "#888")}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Wallet / account section */}
        <div style={{ position: "relative" }}>
          {currentAccount ? (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setOpenNav((prev) => !prev); }}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "10px 20px", borderRadius: "9999px",
                  border: "1px solid rgba(255,157,0,0.4)",
                  background: "rgba(255,157,0,0.08)", color: "#FF9D00",
                  cursor: "pointer", transition: "all 0.3s", ...mono, fontSize: "0.8rem",
                }}
              >
                {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                <span style={{ fontSize: "1rem" }}>
                  {openNav ? <AiFillUnlock /> : <AiFillLock />}
                </span>
              </button>

              <AnimatePresence>
                {openNav && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute", top: "calc(100% + 12px)", right: 0,
                      minWidth: "200px", background: "rgba(15,15,15,0.95)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px", padding: "8px", zIndex: 1000,
                    }}
                  >
                    {dropdownLinks.map((item) => (
                      <Link key={item.path} href={item.path} passHref>
                        <a
                          onClick={() => setOpenNav(false)}
                          style={{
                            display: "block", padding: "10px 14px", borderRadius: "8px",
                            ...syne, fontSize: "0.875rem", color: "#888",
                            textDecoration: "none", transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,157,0,0.08)";
                            e.currentTarget.style.color = "#FF9D00";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#888";
                          }}
                        >
                          {item.label}
                        </a>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => connectWallet()}
              style={{
                padding: "10px 22px", borderRadius: "9999px",
                border: "none", background: "#FF9D00", color: "#0A0A0A",
                fontWeight: 700, fontSize: "0.875rem",
                cursor: "pointer", transition: "box-shadow 0.3s", ...syne,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 30px rgba(255,157,0,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              Connect Wallet
            </motion.button>
          )}
        </div>
      </motion.nav>

      <style>{`
        @media (min-width: 768px) {
          .nav-links-desktop { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default NavBar;