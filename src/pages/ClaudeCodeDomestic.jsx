import { useState } from 'react'
import './ClaudeCodeDomestic.css'

const steps = [
  {
    id: 'prerequisites',
    title: '前置条件',
    content: (
      <>
        <p>在开始之前，你需要准备以下环境：</p>
        <ul>
          <li><strong>Node.js 18+</strong> — Claude Code 运行的基础环境</li>
          <li><strong>npm 或 yarn</strong> — 用于安装 Claude Code</li>
          <li><strong>国产大模型 API Key</strong> — 从对应平台获取</li>
        </ul>
        <div className="callout callout-info">
          <span className="callout-icon">💡</span>
          <div>
            <strong>什么是 Claude Code？</strong>
            <p>Claude Code 是 Anthropic 官方推出的 AI 编程助手 CLI 工具，支持在终端中直接与 AI 对话，完成代码编写、调试、重构等任务。</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'install',
    title: '安装 Claude Code',
    content: (
      <>
        <p>推荐使用官方安装脚本：</p>
        <pre><code>{`# macOS / Linux（推荐）
curl -fsSL https://claude.ai/install.sh | bash

# 或使用 Homebrew
brew install --cask claude-code

# 验证安装
claude --version`}</code></pre>
        <p>安装完成后，在终端输入 <code>claude</code> 即可启动。首次启动会要求登录 Anthropic 账号。</p>
        <div className="callout callout-warning">
          <span className="callout-icon">⚠️</span>
          <div>
            <strong>注意：</strong>如果不做额外配置，Claude Code 默认使用 Anthropic 官方 API，需要科学上网且按量付费。接下来我们将配置它使用国产模型。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'models',
    title: '可选的国产大模型',
    content: (
      <>
        <p>目前社区中常用且兼容性较好的国产大模型：</p>
        <div className="model-grid">
          <div className="model-card">
            <h4>DeepSeek</h4>
            <p>深度求索推出的开源大模型，性价比极高，代码能力强。</p>
            <div className="model-meta">
              <span className="model-tag free">免费额度</span>
              <span className="model-tag hot">热门</span>
            </div>
          </div>
          <div className="model-card">
            <h4>通义千问 (Qwen)</h4>
            <p>阿里巴巴推出的大模型，阿里云百炼平台提供 API。</p>
            <div className="model-meta">
              <span className="model-tag free">免费额度</span>
            </div>
          </div>
          <div className="model-card">
            <h4>智谱 GLM-4</h4>
            <p>智谱 AI 推出的大模型，中文理解能力强。</p>
            <div className="model-meta">
              <span className="model-tag free">免费额度</span>
            </div>
          </div>
          <div className="model-card">
            <h4>Moonshot (月之暗面)</h4>
            <p>Kimi 背后的模型，长文本处理能力突出。</p>
            <div className="model-meta">
              <span className="model-tag free">免费额度</span>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'deepseek',
    title: '方案一：接入 DeepSeek（推荐）',
    content: (
      <>
        <p>DeepSeek 是目前最推荐的方案，性价比高且兼容性好。</p>

        <h4>步骤 1：获取 API Key</h4>
        <ol>
          <li>访问 <a href="https://platform.deepseek.com" target="_blank" rel="noopener">DeepSeek 开放平台</a></li>
          <li>注册并登录账号</li>
          <li>进入「API Keys」页面，创建新的 API Key</li>
          <li>复制保存好你的 Key</li>
        </ol>

        <h4>步骤 2：配置环境变量</h4>
        <pre><code>{`# 在终端中设置（临时生效）
export ANTHROPIC_BASE_URL="https://api.deepseek.com"
export ANTHROPIC_API_KEY="sk-你的deepseek-api-key"

# 然后启动 Claude Code
claude`}</code></pre>

        <p>如果你想永久生效，可以将上述 export 命令添加到 <code>~/.zshrc</code>（Mac）或 <code>~/.bashrc</code>（Linux）文件中：</p>
        <pre><code>{`# 添加到 shell 配置文件
echo 'export ANTHROPIC_BASE_URL="https://api.deepseek.com"' >> ~/.zshrc
echo 'export ANTHROPIC_API_KEY="sk-你的key"' >> ~/.zshrc
source ~/.zshrc`}</code></pre>

        <div className="callout callout-success">
          <span className="callout-icon">✅</span>
          <div>
            <strong>验证配置：</strong>启动 Claude Code 后，随便问一个问题。如果能正常回复，说明配置成功。DeepSeek 的 API 价格非常便宜，适合日常开发使用。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'qwen',
    title: '方案二：接入通义千问 (Qwen)',
    content: (
      <>
        <p>通过阿里云百炼平台使用通义千问模型。</p>

        <h4>步骤 1：获取 API Key</h4>
        <ol>
          <li>访问 <a href="https://bailian.console.aliyun.com" target="_blank" rel="noopener">阿里云百炼平台</a></li>
          <li>开通百炼服务（新用户有免费额度）</li>
          <li>在「API-KEY 管理」中创建 API Key</li>
        </ol>

        <h4>步骤 2：配置环境变量</h4>
        <pre><code>{`export ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
export ANTHROPIC_API_KEY="sk-你的dashscope-api-key"

claude`}</code></pre>

        <h4>可选：使用 OpenAI 兼容模式</h4>
        <p>通义千问也支持 OpenAI 兼容的 API 格式，部分工具可能需要这种格式：</p>
        <pre><code>{`export OPENAI_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
export OPENAI_API_KEY="sk-你的dashscope-api-key"`}</code></pre>
      </>
    ),
  },
  {
    id: 'glm',
    title: '方案三：接入智谱 GLM-4',
    content: (
      <>
        <h4>步骤 1：获取 API Key</h4>
        <ol>
          <li>访问 <a href="https://open.bigmodel.cn" target="_blank" rel="noopener">智谱开放平台</a></li>
          <li>注册并获取 API Key</li>
        </ol>

        <h4>步骤 2：配置环境变量</h4>
        <pre><code>{`export ANTHROPIC_BASE_URL="https://open.bigmodel.cn/api/paas/v4"
export ANTHROPIC_API_KEY="你的智谱api-key"

claude`}</code></pre>
      </>
    ),
  },
  {
    id: 'oneapi',
    title: '方案四：使用 One API 统一管理',
    content: (
      <>
        <p>如果你需要在多个模型之间切换，推荐使用 <strong>One API</strong> 或 <strong>New API</strong> 作为中间层。</p>

        <h4>什么是 One API？</h4>
        <p>One API 是一个开源的 API 管理和分发平台，可以将多种国产大模型统一包装成 OpenAI 兼容格式。</p>

        <h4>部署 One API</h4>
        <pre><code>{`# 使用 Docker 一键部署
docker run -d \\
  --name one-api \\
  -p 3000:3000 \\
  -e TZ=Asia/Shanghai \\
  justsong/one-api`}</code></pre>

        <h4>在 One API 中配置模型渠道</h4>
        <ol>
          <li>访问 <code>http://localhost:3000</code> 进入管理后台</li>
          <li>添加渠道，填入国产模型的 API Key 和端点</li>
          <li>创建令牌用于 Claude Code 调用</li>
        </ol>

        <h4>配置 Claude Code 使用 One API</h4>
        <pre><code>{`export ANTHROPIC_BASE_URL="http://localhost:3000"
export ANTHROPIC_API_KEY="你的one-api令牌"

claude`}</code></pre>

        <div className="callout callout-info">
          <span className="callout-icon">💡</span>
          <div>
            <strong>优势：</strong>One API 支持负载均衡、故障转移、用量统计等功能，适合团队使用。你可以在一个界面管理所有模型的配额和访问权限。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'env-file',
    title: '使用 .env 文件管理配置',
    content: (
      <>
        <p>推荐使用 <code>.env</code> 文件来管理环境变量，避免在终端中反复输入。</p>

        <h4>创建 .env 文件</h4>
        <pre><code>{`# ~/.claude/.env（推荐放在 Claude 配置目录下）

# DeepSeek 配置
ANTHROPIC_BASE_URL="https://api.deepseek.com"
ANTHROPIC_API_KEY="sk-your-deepseek-key"

# 如果使用通义千问，替换为：
# ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
# ANTHROPIC_API_KEY="sk-your-dashscope-key"`}</code></pre>

        <h4>使用 dotenv 加载</h4>
        <pre><code>{`# 在启动前加载环境变量
export $(cat ~/.claude/.env | xargs)
claude`}</code></pre>

        <div className="callout callout-warning">
          <span className="callout-icon">⚠️</span>
          <div>
            <strong>安全提醒：</strong>不要将包含 API Key 的 .env 文件提交到 Git 仓库！确保 <code>.gitignore</code> 中包含 <code>.env</code>。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'ccswitch',
    title: '方案五：使用 CC Switch 可视化管理（推荐）',
    content: (
      <>
        <p><strong>CC Switch</strong> 是社区最热门的 Claude Code 配套工具（GitHub 98k+ Stars），提供桌面 GUI 界面一键管理多个模型 Provider，彻底告别手动编辑环境变量。</p>

        <h4>为什么选择 CC Switch？</h4>
        <ul>
          <li><strong>可视化切换</strong> — 无需手动改环境变量，点击即可切换模型</li>
          <li><strong>50+ Provider 预设</strong> — 内置 DeepSeek、Qwen、GLM 等国产模型配置</li>
          <li><strong>多工具统一管理</strong> — 同时管理 Claude Code、Codex、Gemini CLI 等 7 个工具</li>
          <li><strong>系统托盘快捷切换</strong> — 不用打开主界面，托盘菜单一键切换</li>
          <li><strong>MCP / Skills 统一管理</strong> — 跨工具同步 MCP 服务器和 Skills 配置</li>
          <li><strong>用量与成本追踪</strong> — 追踪 API 调用支出、请求量和 Token 用量</li>
          <li><strong>云同步</strong> — 通过 Dropbox / OneDrive / iCloud 跨设备同步配置</li>
        </ul>

        <h4>安装 CC Switch</h4>
        <pre><code>{`# macOS（推荐 Homebrew）
brew install --cask cc-switch

# Windows：从 GitHub Releases 下载 .msi 安装包
# Linux：下载 .deb / .rpm / .AppImage
# https://github.com/farion1231/cc-switch/releases`}</code></pre>

        <div className="callout callout-info">
          <span className="callout-icon">💡</span>
          <div>
            <strong>系统要求：</strong>Windows 10+、macOS 12+、Ubuntu 22.04+ / Debian 11+ / Fedora 34+。安装后支持中文界面。
          </div>
        </div>

        <h4>使用步骤</h4>
        <ol>
          <li><strong>打开 CC Switch</strong> — 首次启动会检测已安装的 AI 工具</li>
          <li><strong>添加 Provider</strong> — 点击 "Add Provider" → 选择预设（如 DeepSeek）→ 填入 API Key</li>
          <li><strong>启用 Provider</strong> — 在列表中选择刚添加的 Provider → 点击 "Enable"</li>
          <li><strong>启动 Claude Code</strong> — CC Switch 会自动配置好环境变量，直接运行 <code>claude</code> 即可</li>
        </ol>

        <pre><code>{`# CC Switch 启用 Provider 后，无需手动设置环境变量
# 直接在终端运行：
claude`}</code></pre>

        <h4>进阶功能</h4>
        <ul>
          <li><strong>代理与故障转移</strong> — 内置本地代理，支持格式转换和自动故障转移</li>
          <li><strong>Universal Provider</strong> — 一个配置同时同步到 Claude Code、Codex 和 Gemini CLI</li>
          <li><strong>Deep Link 导入</strong> — 通过 <code>ccswitch://</code> URL 一键导入 Provider 和 MCP 配置</li>
          <li><strong>Prompts 管理</strong> — Markdown 编辑器管理 CLAUDE.md / AGENTS.md / GEMINI.md</li>
          <li><strong>Skills 安装</strong> — 从 GitHub 仓库一键安装 Skills 到 Claude Code</li>
          <li><strong>会话管理</strong> — 浏览、搜索和恢复跨工具的对话历史</li>
        </ul>

        <div className="callout callout-success">
          <span className="callout-icon">✅</span>
          <div>
            <strong>推荐：</strong>对于不想折腾命令行的用户，CC Switch 是最佳选择。安装后 3 分钟即可完成配置，切换模型只需一次点击。项目地址：<a href="https://github.com/farion1231/cc-switch" target="_blank" rel="noopener">github.com/farion1231/cc-switch</a>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'troubleshooting',
    title: '常见问题排查',
    content: (
      <>
        <div className="faq-list">
          <div className="faq-item">
            <h4>Q: 启动后提示 401 Unauthorized？</h4>
            <p>A: 检查 API Key 是否正确，注意不要有多余的空格或换行符。确认 Key 没有过期。</p>
          </div>
          <div className="faq-item">
            <h4>Q: 连接超时或无法访问？</h4>
            <p>A: 检查 ANTHROPIC_BASE_URL 是否正确。部分模型的 API 可能需要科学上网才能访问，请确认网络环境。</p>
          </div>
          <div className="faq-item">
            <h4>Q: 回复质量不如原版 Claude？</h4>
            <p>A: 这是正常的。国产模型在代码能力上各有差异，DeepSeek-V3 和 Qwen-2.5 是目前表现较好的选择。Claude Code 的部分高级功能（如 extended thinking）可能不兼容。</p>
          </div>
          <div className="faq-item">
            <h4>Q: 工具调用（Tool Use）不工作？</h4>
            <p>A: Claude Code 依赖模型的 Tool Use 能力。确保你使用的国产模型支持函数调用 / Tool Use 功能。DeepSeek-V3 和 Qwen-2.5 都支持此功能。</p>
          </div>
          <div className="faq-item">
            <h4>Q: 如何切换回原版 Claude？</h4>
            <p>A: 取消设置环境变量即可：</p>
            <pre><code>{`unset ANTHROPIC_BASE_URL
unset ANTHROPIC_API_KEY
claude`}</code></pre>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'tips',
    title: '进阶技巧',
    content: (
      <>
        <h4>1. 使用 Shell 脚本快速切换模型</h4>
        <pre><code>{`# 创建切换脚本 ~/.local/bin/switch-model
#!/bin/bash

case $1 in
  deepseek)
    export ANTHROPIC_BASE_URL="https://api.deepseek.com"
    export ANTHROPIC_API_KEY="sk-your-deepseek-key"
    echo "✅ 已切换到 DeepSeek"
    ;;
  qwen)
    export ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
    export ANTHROPIC_API_KEY="sk-your-dashscope-key"
    echo "✅ 已切换到通义千问"
    ;;
  *)
    echo "用法: switch-model [deepseek|qwen]"
    ;;
esac`}</code></pre>

        <h4>2. 使用 Shell Alias 快捷启动</h4>
        <pre><code>{`# 在 ~/.zshrc 中添加
alias cc='ANTHROPIC_BASE_URL="https://api.deepseek.com" ANTHROPIC_API_KEY="sk-xxx" claude'`}</code></pre>

        <h4>3. 利用 CLAUDE.md 文件优化提示</h4>
        <p>在项目根目录创建 <code>CLAUDE.md</code> 文件，可以为 Claude Code 提供项目上下文：</p>
        <pre><code>{`# CLAUDE.md
## 项目说明
这是一个 React + TypeScript 项目

## 代码规范
- 使用函数式组件
- 状态管理使用 Zustand
- 样式使用 Tailwind CSS`}</code></pre>
      </>
    ),
  },
]

function StepNav({ activeId }) {
  return (
    <nav className="step-nav">
      <h3>目录</h3>
      <ul>
        {steps.map((step, i) => (
          <li key={step.id}>
            <a
              href={`#${step.id}`}
              className={activeId === step.id ? 'active' : ''}
            >
              <span className="step-num">{i + 1}</span>
              {step.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function ClaudeCodeDomestic() {
  const [activeId, setActiveId] = useState(steps[0].id)

  return (
    <div className="tutorial-page">
      <div className="tutorial-header">
        <div className="tutorial-breadcrumb">
          <a href="/">首页</a> / 对接国产大模型
        </div>
        <h1>Claude Code 对接国产大模型教程</h1>
        <p className="tutorial-meta">
          本教程介绍如何配置 Claude Code 使用国产大模型 API，让你无需科学上网也能体验 AI 编程。
        </p>
        <div className="tutorial-tags">
          <span className="tag">Claude Code</span>
          <span className="tag">DeepSeek</span>
          <span className="tag">Qwen</span>
          <span className="tag">GLM</span>
          <span className="tag">CC Switch</span>
          <span className="tag">配置教程</span>
        </div>
      </div>

      <div className="tutorial-body">
        <aside className="tutorial-sidebar">
          <StepNav activeId={activeId} />
        </aside>

        <article className="tutorial-content">
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
