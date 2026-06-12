import './ClaudeCodeDomestic.css'

const steps = [
  {
    id: 'overview',
    title: '前置准备',
    content: (
      <>
        <p>部署到 GitHub Pages 前，确保你已准备好：</p>
        <ul>
          <li><strong>GitHub 账号</strong> — 没有的话去 <a href="https://github.com" target="_blank" rel="noopener">github.com</a> 注册</li>
          <li><strong>Git</strong> — 本地已安装 Git（<code>git --version</code> 验证）</li>
          <li><strong>Node.js 18+</strong> — 用于本地构建项目</li>
        </ul>
        <div className="callout callout-info">
          <span className="callout-icon">💡</span>
          <div>
            <strong>什么是 GitHub Pages？</strong>
            <p>GitHub 提供的免费静态网站托管服务，支持自定义域名，每个仓库都可以部署一个站点。非常适合托管 React、Vue 等前端项目。</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'create-repo',
    title: '创建 GitHub 仓库',
    content: (
      <>
        <h4>方式一：在 GitHub 网页创建</h4>
        <ol>
          <li>登录 GitHub，点击右上角 <strong>+</strong> → <strong>New repository</strong></li>
          <li>仓库名填写 <code>你的用户名.github.io</code>（这是你的主页仓库）</li>
          <li>或者填写任意名称如 <code>claude-code-tutorial</code>（项目仓库）</li>
          <li>选择 <strong>Public</strong>，点击 <strong>Create repository</strong></li>
        </ol>

        <h4>方式二：用命令行创建</h4>
        <pre><code>{`# 安装 GitHub CLI（可选）
brew install gh

# 创建仓库
gh repo create claude-code-tutorial --public --source=. --remote=origin --push`}</code></pre>

        <div className="callout callout-info">
          <span className="callout-icon">💡</span>
          <div>
            <strong>仓库命名规则：</strong>
            <p>• <code>用户名.github.io</code> → 部署到 <code>https://用户名.github.io</code><br/>
            • 其他名称 → 部署到 <code>https://用户名.github.io/仓库名</code></p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'config-project',
    title: '项目配置',
    content: (
      <>
        <p>本项目已预先配置好 GitHub Pages 所需的一切，你无需额外修改。以下是关键配置说明：</p>

        <h4>1. Vite base 配置</h4>
        <p><code>vite.config.js</code> 中已设置 <code>base</code> 路径，CI 环境下自动适配：</p>
        <pre><code>{`// vite.config.js
export default defineConfig({
  plugins: [react()],
  // GitHub Actions 构建时使用项目名作为 base 路径
  base: process.env.GITHUB_ACTIONS ? '/claude-code-tutorial/' : '/',
})`}</code></pre>

        <h4>2. SPA 路由支持</h4>
        <p>GitHub Pages 只托管静态文件，不支持 SPA 路由。项目已配置 <code>404.html</code> 和 <code>index.html</code> 中的重定向脚本来解决这个问题：</p>
        <ul>
          <li><code>public/404.html</code> — 捕获所有 404 请求，将路径编码后重定向到 index.html</li>
          <li><code>index.html</code> 中的脚本 — 还原编码的路径，恢复正确的 URL</li>
        </ul>

        <h4>3. GitHub Actions 工作流</h4>
        <p><code>.github/workflows/deploy.yml</code> 已配置自动构建和部署，推送代码后自动生效。</p>
      </>
    ),
  },
  {
    id: 'push-code',
    title: '推送代码到 GitHub',
    content: (
      <>
        <p>将项目推送到你创建的仓库：</p>
        <pre><code>{`# 初始化 Git（如果还没有）
git init
git add .
git commit -m "初始化项目"

# 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/claude-code-tutorial.git

# 推送代码
git branch -M main
git push -u origin main`}</code></pre>

        <div className="callout callout-warning">
          <span className="callout-icon">⚠️</span>
          <div>
            <strong>注意：</strong>确保你的默认分支名为 <code>main</code>。如果是 <code>master</code>，需要在 GitHub 仓库 Settings 中修改默认分支，或者修改工作流文件中的分支名。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'enable-pages',
    title: '启用 GitHub Pages',
    content: (
      <>
        <p>推送代码后，需要在 GitHub 上启用 Pages 功能：</p>
        <ol>
          <li>打开你的 GitHub 仓库页面</li>
          <li>点击 <strong>Settings</strong>（设置）标签</li>
          <li>左侧菜单找到 <strong>Pages</strong></li>
          <li>Source 选择 <strong>GitHub Actions</strong>（不是 "Deploy from a branch"）</li>
          <li>保存设置</li>
        </ol>

        <div className="callout callout-success">
          <span className="callout-icon">✅</span>
          <div>
            <strong>这样就可以了！</strong> 推送代码后，GitHub Actions 会自动构建并部署。等待 1-2 分钟后，访问 <code>https://你的用户名.github.io/仓库名</code> 即可看到网站。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'verify',
    title: '验证部署',
    content: (
      <>
        <p>部署完成后，检查以下几点：</p>
        <ol>
          <li>访问你的 GitHub Pages 地址，确认网站正常加载</li>
          <li>点击页面上的链接，确认路由跳转正常（不会出现 404）</li>
          <li>刷新页面后确认路由依然正确（SPA 路由支持正常工作）</li>
          <li>切换主题后刷新页面，确认主题状态被正确保存</li>
        </ol>

        <h4>查看部署状态</h4>
        <pre><code>{`# 在仓库页面点击 Actions 标签
# 或使用 GitHub CLI
gh run list --workflow=deploy.yml`}</code></pre>
      </>
    ),
  },
  {
    id: 'custom-domain',
    title: '配置自定义域名（可选）',
    content: (
      <>
        <p>如果你想使用自己的域名：</p>
        <ol>
          <li>在域名服务商处添加 CNAME 记录，指向 <code>你的用户名.github.io</code></li>
          <li>在仓库根目录创建 <code>CNAME</code> 文件，内容为你的域名：</li>
        </ol>
        <pre><code>{`# CNAME 文件内容
www.yourdomain.com`}</code></pre>
        <ol start="3">
          <li>在 GitHub 仓库 Settings → Pages → Custom domain 填入域名</li>
          <li>勾选 <strong>Enforce HTTPS</strong></li>
        </ol>
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
            <h4>Q: 部署后页面空白？</h4>
            <p>A: 检查 <code>vite.config.js</code> 中的 <code>base</code> 路径是否正确。如果你的仓库名不是 <code>claude-code-tutorial</code>，需要修改为对应的名称。</p>
          </div>
          <div className="faq-item">
            <h4>Q: 刷新页面出现 404？</h4>
            <p>A: 确认 <code>public/404.html</code> 文件存在且内容正确。GitHub Pages 需要这个文件来支持 SPA 路由。</p>
          </div>
          <div className="faq-item">
            <h4>Q: Actions 构建失败？</h4>
            <p>A: 进入仓库的 Actions 标签查看构建日志。常见原因：Node.js 版本不匹配、依赖安装失败、构建脚本错误。</p>
          </div>
          <div className="faq-item">
            <h4>Q: 如何手动触发重新部署？</h4>
            <p>A: 在 Actions 标签页，选择 "Deploy to GitHub Pages" 工作流，点击 "Run workflow" 即可手动触发。</p>
          </div>
          <div className="faq-item">
            <h4>Q: 部署后样式丢失？</h4>
            <p>A: 通常是 <code>base</code> 路径问题。打开浏览器开发者工具 Console，查看是否有资源加载 404 的错误，然后修正 base 路径。</p>
          </div>
        </div>
      </>
    ),
  },
]

export default function DeployGithub() {
  return (
    <div className="tutorial-page">
      <div className="tutorial-header">
        <div className="tutorial-breadcrumb">
          <a href="/">首页</a> / 部署到 GitHub Pages
        </div>
        <h1>部署到 GitHub Pages 完全指南</h1>
        <p className="tutorial-meta">
          手把手教你将 React 项目部署到 GitHub Pages，包含自动化 CI/CD 配置和 SPA 路由支持。
        </p>
        <div className="tutorial-tags">
          <span className="tag">GitHub Pages</span>
          <span className="tag">CI/CD</span>
          <span className="tag">React</span>
          <span className="tag">部署教程</span>
        </div>
      </div>

      <div className="tutorial-body">
        <aside className="tutorial-sidebar">
          <nav className="step-nav">
            <h3>目录</h3>
            <ul>
              {steps.map((step, i) => (
                <li key={step.id}>
                  <a href={`#${step.id}`}>
                    <span className="step-num">{i + 1}</span>
                    {step.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
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
