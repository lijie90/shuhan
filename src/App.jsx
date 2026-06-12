import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTheme } from './ThemeContext'
import Home from './pages/Home'
import ClaudeCodeDomestic from './pages/ClaudeCodeDomestic'
import DeployGithub from './pages/DeployGithub'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button className="theme-toggle" onClick={toggleTheme} title={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}>
      <span className="toggle-track">
        <span className="toggle-icon light-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </span>
        <span className="toggle-icon dark-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </span>
        <span className="toggle-thumb" />
      </span>
    </button>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="app">
      <ScrollToTop />
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-inner">
          <NavLink to="/" className="logo">
            <span className="logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </span>
            <span className="logo-text">阿杰的空间</span>
          </NavLink>
          <div className="header-actions">
            <a
              href="https://github.com/lijie90"
              target="_blank"
              rel="noopener"
              className="header-icon-link"
              title="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/claude-code-domestic" element={<ClaudeCodeDomestic />} />
          <Route path="/deploy-github" element={<DeployGithub />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L48 52C96 44 192 28 288 24C384 20 480 28 576 40C672 52 768 68 864 72C960 76 1056 68 1152 56C1248 44 1344 28 1392 20L1440 12V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="var(--bg-card)"/>
          </svg>
        </div>
        <div className="footer-body">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                </span>
                <span className="logo-text">阿杰的空间</span>
              </div>
              <p className="footer-desc">汇集 AI 编程工具的实用教程与最佳实践，让 AI 成为你的编程搭档。</p>
              <div className="footer-social">
                <a href="https://github.com/lijie90" target="_blank" rel="noopener" className="social-link" title="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>资源</h4>
                <a href="https://github.com/farion1231/cc-switch" target="_blank" rel="noopener">CC Switch</a>
                <a href="https://code.claude.com" target="_blank" rel="noopener">Claude Code</a>
                <a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener">GitHub</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 阿杰的空间. Built with React & Vite.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
