import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './Home.css'

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: '实战驱动',
    desc: '每篇教程都附带可运行的代码示例，边学边练',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: '国产模型',
    desc: 'DeepSeek、Qwen、GLM 等主流国产大模型全覆盖',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: '从零到一',
    desc: '环境搭建、配置调优、最佳实践，循序渐进',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: '持续更新',
    desc: '紧跟 AI 编程工具发展，内容定期迭代',
  },
]

const tutorials = [
  {
    path: '/claude-code-domestic',
    title: 'Claude Code 对接国产大模型',
    description: '手把手教你配置 Claude Code 使用 DeepSeek、通义千问、智谱 GLM 等国产大模型，无需科学上网，低成本享受 AI 编程体验。',
    tags: ['DeepSeek', 'Qwen', 'GLM', '配置教程'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    level: '入门',
    time: '15 min',
  },
  {
    path: '/codex-domestic',
    title: 'Codex 对接国产大模型',
    description: '通过 CC Switch 将 OpenAI Codex 配置为使用 DeepSeek、通义千问、智谱 GLM 等国产大模型，一键切换 Provider。',
    tags: ['Codex', 'CC Switch', 'DeepSeek', 'Qwen'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    level: '入门',
    time: '10 min',
  },
  {
    path: '/deploy-github',
    title: '部署到 GitHub / 码云',
    description: '将 React 项目部署到 GitHub Pages 或 Gitee Pages，支持自动化 CI/CD 和 SPA 路由，国内推荐码云。',
    tags: ['GitHub Pages', 'Gitee', '部署'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    level: '入门',
    time: '10 min',
  },
]

function FloatingShape({ className }) {
  return <div className={`floating-shape ${className}`} />
}

export default function Home() {
  const heroRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <FloatingShape className="shape-1" />
          <FloatingShape className="shape-2" />
          <FloatingShape className="shape-3" />
          <div className="hero-grid" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            阿杰的空间
          </div>
          <h1>
            探索 AI 编程的
            <br />
            <span className="gradient-text">无限可能</span>
          </h1>
          <p className="hero-desc">
            汇集 AI 编程工具的实用教程与最佳实践，从环境配置到高效开发，
            <br />
            助你快速上手前沿技术，让 AI 成为你的编程搭档。
          </p>
          <div className="hero-actions">
            <Link to="/claude-code-domestic" className="btn btn-primary">
              开始学习
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <a href="#tutorials" className="btn btn-ghost">
              浏览教程
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features fade-in-up">
        {features.map((f, i) => (
          <div key={i} className="feature-item">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Tutorials */}
      <section className="tutorials" id="tutorials">
        <div className="section-header fade-in-up">
          <span className="section-tag">教程</span>
          <h2>精选教程</h2>
          <p>从基础配置到高级技巧，一站式掌握 AI 编程工具</p>
        </div>
        <div className="tutorial-grid">
          {tutorials.map((t, i) => (
            <Link key={i} to={t.path} className="tutorial-card fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="card-header">
                <div className="card-icon">{t.icon}</div>
                <div className="card-meta">
                  <span className="meta-level">{t.level}</span>
                  <span className="meta-time">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {t.time}
                  </span>
                </div>
              </div>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <div className="card-footer">
                <div className="card-tags">
                  {t.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <span className="card-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="cta-section fade-in-up">
        <div className="cta-card">
          <h2>更多教程正在路上</h2>
          <p>持续关注，获取最新 AI 编程技巧与工具评测</p>
        </div>
      </section>
    </div>
  )
}
