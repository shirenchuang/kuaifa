# Kuaifa Skill - 快发技能

[English](./README.en.md) | 简体中文

这是一个为 Claude Code 开发的技能（Skill），让 Claude 能够帮助用户使用 [kuaifa CLI](https://www.kuaifa.art) 工具将 Markdown 文章发布到微信公众号。

## ✨ 功能特性

Claude 可以帮助你：

- 🚀 **发布文章** - 将 Markdown 文件发布到微信公众号（草稿或立即发布）
- 🖼️ **发布图文** - 将图片集发布为微信图文消息（适合图片笔记、图集类内容）
- 📷 **上传图片** - 上传图片到微信素材库并获取 CDN URL
- 📝 **管理模板** - 浏览和选择文章样式模板
- ⚙️ **配置管理** - 设置 API 密钥、微信凭证、默认偏好设置
- 👥 **多账号管理** - 支持配置和切换多个微信公众号
- 🔧 **问题排查** - 诊断和解决常见错误

## 📦 安装

### 前提条件

- **Node.js >= 18**
- **kuaifa CLI 工具**：
  ```bash
  npm install -g kuaifa
  ```
- **Claude Code**（或其他支持 Skill 的 AI 编程助手）

### 安装本技能

**方法 1（最简单）：让 AI 帮你安装**

把下面这段话直接发给你的 Claude Code / 小龙虾 / 其他 AI 编程助手：

> 帮我安装这个 skill：https://github.com/shirenchuang/kuaifa/tree/main/skills/kuaifa

AI 会自动帮你克隆仓库并放到正确的位置。

**方法 2：手动克隆**
```bash
cd ~/.claude/skills/
git clone https://github.com/shirenchuang/kuaifa.git
```

技能文件位于仓库的 `skills/kuaifa/` 目录下，Claude Code 会自动识别。

**方法 3：手动下载**
1. 下载此仓库
2. 将 `skills/kuaifa` 目录复制到 `~/.claude/skills/kuaifa`

**验证安装**
```bash
ls ~/.claude/skills/kuaifa/SKILL.md
# 文件存在即安装成功
```

## 🚀 快速开始

安装后，Claude 会在你提到以下关键词时自动激活此技能：

- `kuaifa`、`快发`
- "发布到微信"、"微信公众号"
- "publish to WeChat"、"WeChat Official Account"

### 示例对话

**首次设置**
```
你：帮我设置 kuaifa
Claude：[引导你完成 API 密钥注册、凭证配置、模板选择]
```

**发布文章**
```
你：把 article.md 发布到微信，标题是《AI 周报》，封面用 cover.jpg
Claude：[运行 kuaifa publish 命令，报告结果]
```

**发布图文消息**
```
你：把这几张截图发布成图文笔记，标题《今日AI资讯》
Claude：[运行 kuaifa publish-newspic 命令，将图片发布为图文消息]
```

**浏览模板**
```
你：有哪些可用的模板？
Claude：[运行 kuaifa template list，显示选项]
```

**多账号管理**
```
你：我想管理两个微信账号
Claude：[解释 profile 系统，帮助配置第二个账号]
```

## 📁 项目结构

```
kuaifa/
├── README.md              # 项目说明文档（中文）
├── README.en.md           # 项目说明文档（英文）
├── LICENSE                # MIT 开源协议
├── skills/
│   └── kuaifa/
│       ├── README.md      # Skill 说明文档（中文）
│       ├── README.en.md   # Skill 说明文档（英文）
│       ├── SKILL.md       # Skill 提示词（给 Claude 看的）
│       ├── skill.js       # Skill 入口和元数据
│       └── evals/         # 评估测试用例
│           ├── eval-1-onboarding/     # 首次设置流程
│           ├── eval-2-templates/      # 模板发现和选择
│           ├── eval-3-publish/        # 端到端发布流程
│           └── eval-4-multi-account/  # 多账号管理
└── kuaifa-workspace/      # 评估测试结果（不提交到 Git）
```

## 🔄 更新

### 更新 kuaifa CLI 工具

当 kuaifa CLI 有新版本发布时，你可以随时更新：

```bash
# 检查当前版本
kuaifa --version

# 检查最新版本
npm view kuaifa version

# 更新到最新版本
npm update -g kuaifa
```

**Claude 会主动提醒你更新**：当你使用这个 skill 时，Claude 会检查你的 kuaifa 版本，如果有新版本可用，会建议你更新。

### 更新本 Skill

当 skill 有新功能或改进时（比如支持 CLI 的新命令），更新方法：

**如果是通过 Git 克隆安装的**：
```bash
cd ~/.claude/skills/kuaifa
git pull origin main
```

**如果是手动下载的**：
重新下载最新版本并覆盖到 `~/.claude/skills/kuaifa` 目录。

### 版本检查机制

这个 skill 包含自动版本检查功能：

1. **CLI 版本检查**：Claude 会在首次使用时检查 kuaifa CLI 是否安装和版本情况
2. **更新提醒**：如果发现有新版本，会主动建议更新
3. **功能兼容性**：确保 skill 的功能与你安装的 CLI 版本兼容

### 更新通知

关注以下渠道获取更新通知：

- 📢 **GitHub Releases**：https://github.com/shirenchuang/kuaifa/releases
- ⭐ **Star 本仓库**：第一时间收到更新通知
- 🐛 **问题反馈**：https://github.com/shirenchuang/kuaifa/issues

## 🧪 开发与测试

### 运行评估测试

评估测试（evals）用于衡量技能的质量和性能：

```bash
# 进入 skill 目录
cd skills/kuaifa

# 运行所有评估测试
claude-code-cli eval run

# 运行特定评估
claude-code-cli eval run --eval eval-1-onboarding
```

### 当前的评估场景

1. **eval-1-onboarding** - 首次设置体验
2. **eval-2-templates** - 模板发现和选择
3. **eval-3-publish** - 端到端发布流程
4. **eval-4-multi-account** - 多账号配置管理

### 修改技能

更新此技能时：

1. 编辑 **SKILL.md** 添加新命令或工作流程
2. 更新 **skill.js** 元数据（如果触发关键词或结构变化）
3. 为重要的新功能添加新的评估测试
4. 运行评估以验证质量没有退化
5. 更新 skill.js 中的版本号

## 🤝 贡献

欢迎贡献！以下是一些方式：

- 报告 Bug 或建议功能
- 改进文档
- 添加新的评估测试用例
- 优化提示词（SKILL.md）

## 📄 许可证

本项目采用 [MIT 许可证](./LICENSE)。

## 🔗 相关链接

- [快发官方网站](https://www.kuaifa.art)
- [Claude Code 文档](https://github.com/anthropics/claude-code)
- [问题反馈](https://github.com/shirenchuang/kuaifa/issues)

## 👤 作者

**shirenchuang**
- GitHub: [@shirenchuang](https://github.com/shirenchuang)

---

如果这个技能对你有帮助，欢迎 ⭐️ Star 支持！
