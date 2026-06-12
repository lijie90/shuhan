import { Link } from 'react-router-dom'
import './ClaudeCodeDomestic.css'

const steps = [
  {
    id: 'overview',
    title: '前置准备',
    content: (
      <>
        <p>部署前确保你已准备好：</p>
        <ul>
          <li><strong>Git</strong> — 本地已安装（<code>git --version</code> 验证）</li>
          <li><strong>Node.js 18+</strong> — 用于本地构建项目</li>
          <li><strong>代码托管平台账号</strong> — GitHub 或 码云（Gitee）</li>
        </ul>
        <div className="callout callout-info">
          <span className="callout-icon">💡</span>
          <div>
            <strong>选择哪个平台？</strong>
            <p>
              • <strong>GitHub Pages</strong> — 支持 Actions 自动部署，国际访问好，国内较慢<br/>
              • <strong>Gitee Pages</strong> — 国内访问快，但需要手动点「更新」触发部署
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'github-pages',
    title: '方案一：部署到 GitHub Pages',
    content: (
      <>
        <h4>1. 创建仓库</h4>
        <ol>
          <li>登录 <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>，点击 <strong>+</strong> → <strong>New repository</strong></li>
          <li>仓库名填写 <code>你的用户名.github.io</code>（主页）或任意名称（项目站点）</li>
          <li>选择 <strong>Public</strong>，点击 <strong>Create repository</strong></li>
        </ol>

        <h4>2. 启用 GitHub Pages</h4>
        <ol>
          <li>打开仓库 → <strong>Settings</strong> → 左侧 <strong>Pages</strong></li>
          <li>Source 选择 <strong>GitHub Actions</strong></li>
        </ol>

        <h4>3. 推送代码</h4>
        <pre><code>{`git init && git add . && git commit -m "init"
git remote add origin https://github.com/用户名/仓库名.git
git branch -M main
git push -u origin main`}</code></pre>

        <div className="callout callout-success">
          <span className="callout-icon">✅</span>
          <div>
            <strong>自动部署：</strong>推送后 GitHub Actions 会自动构建部署，1-2 分钟后访问 <code>https://用户名.github.io/仓库名</code> 即可。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'gitee-pages',
    title: '方案二：部署到码云 Gitee Pages',
    content: (
      <>
        <h4>1. 创建仓库</h4>
        <ol>
          <li>登录 <a href="https://gitee.com" target="_blank" rel="noopener">码云 Gitee</a>，点击右上角 <strong>+</strong> → <strong>新建仓库</strong></li>
          <li>仓库名填写任意名称（如 <code>shuhan</code>）</li>
          <li>选择 <strong>公开</strong>，其他默认，点击 <strong>创建</strong></li>
        </ol>

        <h4>2. 推送代码</h4>
        <pre><code>{`git init && git add . && git commit -m "init"
git remote add origin https://gitee.com/用户名/仓库名.git
git branch -M main
git push -u origin main`}</code></pre>

        <h4>3. 本地构建并上传 dist</h4>
        <p>Gitee Pages 不支持自动构建，需要手动构建后上传 <code>dist</code> 目录：</p>
        <pre><code>{`# 构建项目
GITEE_PAGES=true npm run build

# 将 dist 目录内容推送到 gh-pages 分支
# 方法一：使用 gh-pages 工具（推荐）
npm install -D gh-pages
npx gh-pages -d dist

# 方法二：手动操作
cd dist
git init
git add .
git commit -m "deploy"
git push -f https://gitee.com/用户名/仓库名.git main:gh-pages`}</code></pre>

        <h4>4. 启用 Gitee Pages</h4>
        <ol>
          <li>打开仓库页面 → 点击右侧 <strong>服务</strong> → <strong>Gitee Pages</strong></li>
          <li>部署分支选择 <strong>gh-pages</strong>，部署目录选择 <code>/</code>（根目录）</li>
          <li>点击 <strong>启动</strong></li>
        </ol>

        <h4>5. 更新部署</h4>
        <p>每次修改代码后，重新构建并推送：</p>
        <pre><code>{`GITEE_PAGES=true npm run build
npx gh-pages -d dist
# 然后去 Gitee Pages 页面点击「更新」`}</code></pre>

        <div className="callout callout-warning">
          <span className="callout-icon">⚠️</span>
          <div>
            <strong>注意：</strong>码云 Gitee Pages 免费版每次更新需要手动点击「更新」按钮，不支持自动部署。推送代码后页面不会自动刷新。
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'spa-routing',
    title: 'SPA 路由配置',
    content: (
      <>
        <p>静态托管平台不支持 SPA 路由，刷新非首页会 404。项目已内置解决方案：</p>

        <h4>工作原理</h4>
        <ol>
          <li><code>public/404.html</code> — 捕获所有 404 请求，将路径编码后重定向到 index.html</li>
          <li><code>index.html</code> 中的脚本 — 还原编码的路径，恢复正确的 URL</li>
        </ol>

        <h4>本地构建时</h4>
        <p>本地开发（<code>npm run dev</code>）不受影响，Vite 自带 SPA 支持。</p>

        <h4>Gitee Pages 特殊处理</h4>
        <p>Gitee Pages 不会自动处理 <code>404.html</code>。如果路由刷新有问题，可以在 Gitee Pages 设置中开启 <strong>强制 HTTPS</strong>，或改用 Hash 路由：</p>
        <pre><code>{`// main.jsx 中将 BrowserRouter 改为 HashRouter
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)`}</code></pre>
        <div className="callout callout-info">
          <span className="callout-icon">💡</span>
          <div>
            <strong>Hash 路由 vs BrowserRouter：</strong>
            <p>Hash 路由的 URL 格式为 <code>https://域名/#/路径</code>，所有请求都会落到 index.html，天然兼容静态托管平台，无需 404.html。</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'config-detail',
    title: '项目配置说明',
    content: (
      <>
        <h4>Vite base 路径</h4>
        <p><code>vite.config.js</code> 根据构建环境自动适配 base 路径：</p>
        <pre><code>{`// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS
    ? '/claude-code-tutorial/'   // GitHub Pages
    : process.env.GITEE_PAGES
      ? '/shuhan/'               // Gitee Pages
      : '/',                      // 本地开发
})`}</code></pre>

        <h4>GitHub Actions 工作流</h4>
        <p><code>.github/workflows/deploy.yml</code> 已配置自动构建部署，仅 GitHub 使用。</p>

        <h4>gh-pages 分支（Gitee 用）</h4>
        <p>Gitee 部署时，<code>dist</code> 目录推送到 <code>gh-pages</code> 分支，Gitee Pages 从该分支读取静态文件。</p>
      </>
    ),
  },
  {
    id: 'verify',
    title: '验证部署',
    content: (
      <>
        <p>部署完成后检查：</p>
        <ol>
          <li>访问部署地址，确认网站正常加载</li>
          <li>点击页面链接，确认路由跳转正常</li>
          <li>刷新页面，确认路由依然正确（SPA 路由支持正常）</li>
          <li>切换主题后刷新，确认主题状态被保存</li>
        </ol>
        <div className="faq-list">
          <div className="faq-item">
            <h4>GitHub Actions 查看部署状态</h4>
            <pre><code>{`gh run list --workflow=deploy.yml`}</code></pre>
          </div>
          <div className="faq-item">
            <h4>Gitee Pages 查看</h4>
            <p>仓库页面 → 服务 → Gitee Pages，查看当前部署的版本和地址。</p>
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
            <h4>Q: 部署后页面空白？</h4>
            <p>A: 检查 <code>vite.config.js</code> 中的 <code>base</code> 路径是否匹配你的仓库名。GitHub 仓库名需与配置一致，Gitee 同理。</p>
          </div>
          <div className="faq-item">
            <h4>Q: 刷新页面出现 404？</h4>
            <p>A: 确认 <code>public/404.html</code> 存在。Gitee Pages 如果不支持 404.html 重定向，改用 Hash 路由（见 SPA 路由配置章节）。</p>
          </div>
          <div className="faq-item">
            <h4>Q: GitHub Actions 构建失败？</h4>
            <p>A: Actions 标签查看日志。常见原因：Node 版本不对、依赖安装失败。确保 Node 18+。</p>
          </div>
          <div className="faq-item">
            <h4>Q: Gitee Pages 更新后没变化？</h4>
            <p>A: 确认推送的是 <code>gh-pages</code> 分支，且 Gitee Pages 部署分支选择的是 <code>gh-pages</code>。点击「更新」后等待 1 分钟。</p>
          </div>
          <div className="faq-item">
            <h4>Q: 样式丢失？</h4>
            <p>A: 打开浏览器开发者工具 Console，查看是否有资源 404 错误，修正 <code>base</code> 路径即可。</p>
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
          <Link to="/">首页</Link> / 部署教程
        </div>
        <h1>部署到 GitHub Pages / Gitee Pages</h1>
        <p className="tutorial-meta">
          手把手教你将 React 项目部署到 GitHub Pages 和码云 Gitee Pages，包含自动化 CI/CD 和 SPA 路由支持。
        </p>
        <div className="tutorial-tags">
          <span className="tag">GitHub Pages</span>
          <span className="tag">Gitee Pages</span>
          <span className="tag">CI/CD</span>
          <span className="tag">React</span>
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
