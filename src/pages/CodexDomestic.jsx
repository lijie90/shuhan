import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './ClaudeCodeDomestic.css'

const steps = [
  {
    id: 'overview',
    title: '什么是 Codex',
    content: (
      <>
        <p><strong>Codex</strong> 是 OpenAI 推出的 AI 编程助手 CLI 工具，类似 Claude Code，可以在终端中与 AI 对话完成代码编写、调试、重构等任务。</p>
        <p>Codex 默认使用 OpenAI 的 API（如 GPT-4o），但通过 <strong>CC Switch</strong> 可以无缝切换到国产大模型，无需修改任何配置。</p>
        <div className="callout callout-info">
          <span className="callout-icon">💡</span>
          <div>
            <strong>Codex vs Claude Code：</strong>
            <p>两者功能类似，都是终端 AI 编程助手。Codex 使用 OpenAI 兼容 API 格式，而 Claude Code 使用 Anthropic API 格式。CC Switch 同时支持两者。</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'install-codex',
    title: '安装 Codex',
    content: (
      <>
        <p>通过 npm 全局安装 Codex：</p>
        <pre><code>{`# 安装 Codex
npm install -g @openai/codex

# 验证安装
codex --version`}</code></pre>
        <p>安装完成后，在终端输入 <code>codex</code> 即可启动。首次启动需要登录 OpenAI 账号或设置 API Key。</p>
        <div className="callout callout-warning">
          <span className="callout-icon">⚠️</span>
          <div>
            <strong>注意：</strong>Codex 默认使用 OpenAI 官方 API，需要科学上网且按量付费。接下来我们将通过 CC Switch 配置它使用国产模型。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'install-ccswitch',
    title: '安装 CC Switch',
    content: (
      <>
        <p>CC Switch 是一个桌面 GUI 工具，支持同时管理 Claude Code、Codex、Gemini CLI 等多个 AI 编程工具。</p>
        <pre><code>{`# macOS（推荐）
brew install --cask cc-switch

# Windows：从 GitHub Releases 下载 .msi
# Linux：下载 .deb / .rpm / .AppImage
# https://github.com/farion1231/cc-switch/releases`}</code></pre>
        <div className="callout callout-info">
          <span className="callout-icon">💡</span>
          <div>
            <strong>CC Switch 同时管理多个工具：</strong>一个界面就能管理 Claude Code、Codex、Gemini CLI、OpenCode 等 7 个工具的配置，支持一键切换 Provider。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'add-provider',
    title: '添加国产模型 Provider',
    content: (
      <>
        <p>打开 CC Switch，为 Codex 添加国产模型 Provider：</p>

        <h4>步骤 1：获取 API Key</h4>
        <p>选择一个国产模型平台，获取 API Key：</p>
        <div className="model-grid">
          <div className="model-card">
            <h4>DeepSeek</h4>
            <p>访问 <a href="https://platform.deepseek.com" target="_blank" rel="noopener">platform.deepseek.com</a></p>
            <div className="model-meta">
              <span className="model-tag free">性价比高</span>
              <span className="model-tag hot">推荐</span>
            </div>
          </div>
          <div className="model-card">
            <h4>通义千问 (Qwen)</h4>
            <p>访问 <a href="https://bailian.console.aliyun.com" target="_blank" rel="noopener">阿里云百炼平台</a></p>
            <div className="model-meta">
              <span className="model-tag free">免费额度</span>
            </div>
          </div>
          <div className="model-card">
            <h4>智谱 GLM-4</h4>
            <p>访问 <a href="https://open.bigmodel.cn" target="_blank" rel="noopener">智谱开放平台</a></p>
            <div className="model-meta">
              <span className="model-tag free">免费额度</span>
            </div>
          </div>
        </div>

        <h4>步骤 2：在 CC Switch 中添加 Provider</h4>
        <ol>
          <li>打开 CC Switch → 点击 <strong>"Add Provider"</strong></li>
          <li>在预设列表中选择对应的模型（如 <strong>DeepSeek</strong>）</li>
          <li>填入你的 API Key</li>
          <li>点击保存</li>
        </ol>

        <h4>步骤 3：开启路由代理</h4>
        <p>添加 Provider 后，需要在 CC Switch 中<strong>开启路由（Proxy）</strong>功能：</p>
        <ol>
          <li>在 CC Switch 主界面，找到你添加的 Provider</li>
          <li>点击 Provider 旁边的 <strong>Proxy</strong> 开关，将其打开</li>
          <li>确认状态显示为 <strong>Running</strong></li>
        </ol>
        <div className="callout callout-warning">
          <span className="callout-icon">⚠️</span>
          <div>
            <strong>必须开启路由！</strong>不开 Proxy 的话，CC Switch 只是设置了环境变量，但国产模型的 API 格式与 OpenAI 不完全一致，需要通过本地代理进行格式转换。开启路由后，CC Switch 会启动本地代理服务，自动将请求格式转换为目标模型兼容的格式。
          </div>
        </div>

        <h4>步骤 4：启用 Provider</h4>
        <p>路由开启后，在 Provider 列表中选择刚添加的模型 → 点击 <strong>"Enable"</strong>。</p>
        <p>CC Switch 会自动配置好环境变量并启动本地代理：</p>
        <pre><code>{`# CC Switch 自动设置（无需手动操作）
# 1. 环境变量指向本地代理
OPENAI_BASE_URL="http://localhost:3456"
OPENAI_API_KEY="sk-your-deepseek-key"

# 2. 本地代理接收请求 → 格式转换 → 转发到国产模型 API`}</code></pre>
      </>
    ),
  },
  {
    id: 'use-codex',
    title: '使用 Codex',
    content: (
      <>
        <p>启用 Provider 后，直接启动 Codex：</p>
        <pre><code>{`# 启动 Codex
codex`}</code></pre>
        <p>Codex 会自动使用 CC Switch 配置的国产模型 API，无需额外设置。</p>

        <h4>切换模型</h4>
        <p>需要切换到其他模型时：</p>
        <ol>
          <li>打开 CC Switch</li>
          <li>在 Provider 列表中选择目标模型</li>
          <li>点击 <strong>"Enable"</strong></li>
          <li>重启 Codex（或在 CC Switch 中确认热切换）</li>
        </ol>

        <div className="callout callout-success">
          <span className="callout-icon">✅</span>
          <div>
            <strong>提示：</strong>CC Switch 支持系统托盘快捷切换，不用打开主界面就能切换模型。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'env-config',
    title: '手动配置方式（不用 CC Switch）',
    content: (
      <>
        <p>如果你不想安装 CC Switch，也可以通过环境变量手动配置：</p>

        <h4>DeepSeek</h4>
        <pre><code>{`export OPENAI_BASE_URL="https://api.deepseek.com/v1"
export OPENAI_API_KEY="sk-your-deepseek-key"
codex`}</code></pre>

        <h4>通义千问 (Qwen)</h4>
        <pre><code>{`export OPENAI_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
export OPENAI_API_KEY="sk-your-dashscope-key"
codex`}</code></pre>

        <h4>智谱 GLM-4</h4>
        <pre><code>{`export OPENAI_BASE_URL="https://open.bigmodel.cn/api/paas/v4/chat/completions"
export OPENAI_API_KEY="your-zhipu-key"
codex`}</code></pre>

        <div className="callout callout-warning">
          <span className="callout-icon">⚠️</span>
          <div>
            <strong>注意：</strong>Codex 使用 OpenAI 兼容 API 格式，所以设置的是 <code>OPENAI_BASE_URL</code> 和 <code>OPENAI_API_KEY</code>（不是 Anthropic 的变量）。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'ccswitch-features',
    title: 'CC Switch 进阶功能',
    content: (
      <>
        <p>CC Switch 不只是切换 Provider，还提供很多实用功能：</p>

        <h4>同时管理多个工具</h4>
        <p>CC Switch 可以同时管理 Claude Code、Codex、Gemini CLI 等 7 个工具。一个 Provider 可以同步到多个工具（Universal Provider）。</p>

        <h4>代理与故障转移</h4>
        <p>内置本地代理，支持格式转换、自动故障转移、熔断器。当一个 Provider 不可用时自动切换到备用 Provider。</p>

        <h4>MCP 和 Skills 管理</h4>
        <p>统一管理 Claude Code、Codex、Gemini CLI 的 MCP 服务器和 Skills 配置，支持跨工具双向同步。</p>

        <h4>用量追踪</h4>
        <p>追踪 API 调用支出、请求量和 Token 用量，含趋势图表和详细请求日志。</p>

        <h4>云同步</h4>
        <p>通过 Dropbox、OneDrive、iCloud 或 WebDAV 跨设备同步配置。</p>

        <div className="callout callout-info">
          <span className="callout-icon">💡</span>
          <div>
            <strong>项目地址：</strong><a href="https://github.com/farion1231/cc-switch" target="_blank" rel="noopener">github.com/farion1231/cc-switch</a>（98k+ Stars）
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'comparison',
    title: 'Codex vs Claude Code 对比',
    content: (
      <>
        <div className="faq-list">
          <div className="faq-item">
            <h4>API 格式</h4>
            <p>Codex 使用 OpenAI 兼容格式（<code>OPENAI_BASE_URL</code>），Claude Code 使用 Anthropic 格式（<code>ANTHROPIC_BASE_URL</code>）。CC Switch 两种都支持。</p>
          </div>
          <div className="faq-item">
            <h4>国产模型兼容性</h4>
            <p>大多数国产模型（DeepSeek、Qwen、GLM）都提供 OpenAI 兼容 API，因此 Codex 和 Claude Code 都能使用。部分模型对 OpenAI 格式的支持更完善。</p>
          </div>
          <div className="faq-item">
            <h4>模型选择</h4>
            <p>Codex 默认使用 GPT-4o，Claude Code 默认使用 Claude。切换到国产模型后，两者体验差异主要取决于底层模型能力。</p>
          </div>
          <div className="faq-item">
            <h4>推荐选择</h4>
            <p>如果你已有 OpenAI 账号或更习惯 OpenAI 生态，选 Codex；如果你喜欢 Anthropic 的模型风格，选 Claude Code。两者都可以通过 CC Switch 使用国产模型。</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'troubleshooting',
    title: '常见问题',
    content: (
      <>
        <div className="faq-list">
          <div className="faq-item">
            <h4>Q: Codex 启动后报 401 错误？</h4>
            <p>A: 检查 API Key 是否正确。确认 CC Switch 中 Provider 已启用，或者环境变量已正确设置。</p>
          </div>
          <div className="faq-item">
            <h4>Q: CC Switch 切换后 Codex 没变化？</h4>
            <p>A: 部分工具需要重启才能生效。退出 Codex 重新启动即可。CC Switch 对 Claude Code 支持热切换，但 Codex 可能需要重启。</p>
          </div>
          <div className="faq-item">
            <h4>Q: 回复质量不好？</h4>
            <p>A: 尝试切换到更强的模型（如 DeepSeek-V3 或 Qwen-2.5）。不同模型在代码能力上差异较大。</p>
          </div>
          <div className="faq-item">
            <h4>Q: 如何同时使用 Claude Code 和 Codex？</h4>
            <p>A: 在 CC Switch 中分别为两个工具配置不同的 Provider，或者使用 Universal Provider 同时应用到两个工具。</p>
          </div>
        </div>
      </>
    ),
  },
]

export default function CodexDomestic() {
  const [activeId, setActiveId] = useState(steps[0].id)
  const contentRef = useRef(null)

  useEffect(() => {
    const headings = contentRef.current?.querySelectorAll('.step-section')
    if (!headings) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="tutorial-page">
      <div className="tutorial-header">
        <div className="tutorial-breadcrumb">
          <Link to="/">首页</Link> / Codex 对接国产大模型
        </div>
        <h1>Codex 对接国产大模型教程</h1>
        <p className="tutorial-meta">
          通过 CC Switch 将 OpenAI Codex 配置为使用 DeepSeek、通义千问、智谱 GLM 等国产大模型。
        </p>
        <div className="tutorial-tags">
          <span className="tag">Codex</span>
          <span className="tag">CC Switch</span>
          <span className="tag">DeepSeek</span>
          <span className="tag">Qwen</span>
        </div>
      </div>

      <div className="tutorial-body">
        <aside className="tutorial-sidebar">
          <nav className="step-nav">
            <h3>目录</h3>
            <ul>
              {steps.map((step, i) => (
                <li key={step.id}>
                  <a href={`#${step.id}`} className={activeId === step.id ? 'active' : ''}>
                    <span className="step-num">{i + 1}</span>
                    {step.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="tutorial-content" ref={contentRef}>
          {steps.map((step, i) => (
            <section key={step.id} id={step.id} className="step-section">
              <h2>
                <span className="step-badge">{i + 1}</span>
                {step.title}
              </h2>
              {step.content}
            </section>
          ))}
        </article>
      </div>
    </div>
  )
}
