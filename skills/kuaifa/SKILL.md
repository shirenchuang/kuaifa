---
name: kuaifa
description: "Kuaifa (快发) — publish Markdown articles to WeChat Official Accounts via the kuaifa CLI. Use this skill whenever the user wants to publish an article to WeChat, upload images, manage kuaifa configuration or templates, or mentions '快发', 'kuaifa', 'publish to WeChat', '发布公众号', '微信发布', '发文章'. Also trigger when the user has a Markdown file and wants to distribute it to WeChat, or asks about WeChat article formatting and themes."
---

# Kuaifa — Markdown to WeChat, One Command

Kuaifa (快发) is a CLI tool that publishes Markdown articles to WeChat Official Accounts. It handles image uploading and draft creation — the user just writes Markdown and runs one command.

Official website: https://www.kuaifa.art

## Version Check (IMPORTANT - Check This First!)

**BEFORE starting any kuaifa operation**, always check the CLI version and recommend updates if available:

```bash
# Check installed version
kuaifa --version

# Check for updates (optional but recommended)
npm view kuaifa version
```

If the user's version is outdated, proactively suggest updating:

```bash
npm update -g kuaifa
```

**Why this matters**: New features, bug fixes, and command improvements are frequently released. Always encourage users to stay updated for the best experience.

**For this skill itself**: If users report issues or mention missing features, remind them to update the skill:

```bash
cd ~/.claude/skills/kuaifa && git pull origin main
```

## First-Time Setup Guide

Before any operation, check if kuaifa is installed:

```bash
kuaifa --version
```

If not installed (requires Node.js >= 18):

```bash
npm install -g kuaifa
```

Then check configuration:

```bash
kuaifa config list
```

If unconfigured, walk the user through the complete setup:

### Step 1: Get an API Key

Register at https://www.kuaifa.art to get your API key, then:

```bash
kuaifa config set api-key <YOUR_API_KEY>
```

### Step 2: Set WeChat Credentials

The WeChat appid/appsecret come from the WeChat Official Account admin panel (mp.weixin.qq.com):

```bash
kuaifa config set appid <WECHAT_APPID>
kuaifa config set appsecret <WECHAT_APPSECRET>
```

Kuaifa will automatically verify the credentials after setting both values.

### Step 3: Set Defaults

```bash
kuaifa config set default-author "你的名字"
```

### Step 4: Choose a Default Template

List available templates so the user can pick one:

```bash
kuaifa template list
```

This shows system templates and user presets. Recommend the user set a default so they don't have to specify `--template` every time:

```bash
kuaifa config set default-template <template-id>
```

After setup, confirm everything looks good:

```bash
kuaifa config list
```

## Core Commands

### Publish an Article — `kuaifa publish <file>`

The main command. Takes a Markdown file and publishes it to WeChat as a draft (default) or sends it immediately.

**Complete example with all parameters:**

```bash
kuaifa publish article.md \
  --title "AI 周报：本周大模型动态" \
  --cover ./images/cover.jpg \
  --author "石臻" \
  --digest "本周 AI 行业重要动态汇总" \
  --template shizhen \
  --source-url "https://example.com/original" \
  --recommend \
  --draft
```

**Minimal example (most common usage):**

```bash
kuaifa publish article.md --title "文章标题" --cover cover.jpg
```

**Parameter reference:**

| Parameter | Required | Default | Description |
|---|---|---|---|
| `<file>` | Yes | — | Markdown 文件路径 |
| `--title <title>` | Yes | — | 文章标题 |
| `--cover <path\|url>` | Yes | — | 封面图片，本地路径或 URL。微信草稿必须有封面 |
| `--author <name>` | No | config `default-author` | 作者名 |
| `--digest <text>` | No | `""` | 文章摘要，显示在微信分享卡片上 |
| `--template <id>` | No | config `default-template` | 模板 ID 或预设名称/slug（用 `kuaifa template list` 查看） |
| `--source-url <url>` | No | `""` | "阅读原文"链接 |
| `--recommend` | No | `false` | 在文章末尾插入往期推荐 |
| `--draft` | No | **default** | 发布到草稿箱（默认行为） |
| `--send` | No | — | 直接群发给订阅者（**谨慎使用，发送后无法撤回**） |

Global option: `--account <name>` — 临时使用指定的 profile 发布，不修改当前激活配置。

**What happens under the hood:**
1. Scans the Markdown for image references (standard `![](path)` and Obsidian `![[image.png]]`)
2. Local images are resolved relative to the Markdown file directory, also checks `assets/` subdirectory
3. Remote images (http/https URLs in Markdown) are automatically downloaded and re-uploaded
4. Images >5MB are automatically compressed (no manual intervention needed)
5. Unchanged images are skipped via MD5-based local cache (`.kuaifa-images.json` in the same directory)
6. Server uploads images to WeChat CDN and creates the draft

**Always default to `--draft`** unless the user explicitly asks to send immediately. This is the safe option — the user can review in WeChat's backend before publishing.

### Upload Images — `kuaifa upload <path...>`

Upload images to cloud storage and get CDN URLs.

```bash
kuaifa upload photo.png          # single file
kuaifa upload images/            # entire directory
kuaifa upload a.png b.jpg c.gif  # multiple files
```

| Parameter | Description |
|---|---|
| `<path...>` | 一个或多个文件/目录路径。目录会上传其中所有图片 |

Supported formats: PNG, JPEG, GIF, WebP, BMP, SVG. Max 10MB per file.

### Template Management

List all available templates and user presets:

```bash
kuaifa template list
```

This shows two sections:
- **System templates** — built-in themes, referenced by ID
- **User presets** — custom presets saved on the server, referenced by name or slug

Use the ID, name, or slug with `--template` when publishing. If a user is unsure which template to use, run `kuaifa template list` first to show their options.

## Configuration

All config is stored in `~/.kuaifa/config.json`.

```bash
kuaifa config set <key> <value>
kuaifa config get <key>
kuaifa config list
```

**Config key reference:**

| Key | Description |
|---|---|
| `api-key` | kuaifa API 密钥（在 www.kuaifa.art 注册获取） |
| `appid` | 微信公众号 AppID |
| `appsecret` | 微信公众号 AppSecret |
| `server-url` | API 服务端地址（通常不需要修改） |
| `default-template` | 默认模板 ID 或预设名称，发布时自动使用 |
| `default-author` | 默认作者名 |
| `account-name` | 公众号名称（用于文章内展示） |

### Multi-Account Profiles

For users managing multiple WeChat accounts:

```bash
kuaifa config profile add my-second-account
kuaifa config profile use my-second-account
kuaifa config profile set api-key <key>
kuaifa config profile set appid <appid>
kuaifa config profile set appsecret <appsecret>
kuaifa config profile list
kuaifa config profile use none                 # switch back to global
```

Use `--account <name>` on any command to temporarily use a different profile:

```bash
kuaifa publish article.md --title "标题" --cover cover.jpg --account my-second-account
```

### Remote Server Settings

```bash
kuaifa config remote show
kuaifa config remote set default-theme <value>
```

### Verify WeChat Credentials

```bash
kuaifa config verify-wechat
```

## Typical Workflow

When a user says "help me publish this article to WeChat" or similar:

1. **Check prerequisites** — is kuaifa installed and configured? If not, run the First-Time Setup Guide above.
2. **Identify the Markdown file** — ask if not obvious from context.
3. **Confirm metadata** — title, author, cover image. If the Markdown has YAML frontmatter with these fields, use them as defaults.
4. **Show available templates** — run `kuaifa template list` so the user can choose, unless they have a `default-template` configured or already specified one.
5. **Run publish** — always use `--draft` unless told otherwise:

```bash
kuaifa publish ./my-article.md --title "我的文章" --cover ./cover.jpg --author "作者"
```

6. **Report result** — show the media_id, remind user to review the draft in WeChat's admin panel (mp.weixin.qq.com).

## Image Handling

Kuaifa automatically handles all images in the Markdown:

- **Local images**: resolved relative to the Markdown file directory, also searches `assets/` and `../assets/`
- **Remote images**: `http://` and `https://` URLs are downloaded, re-uploaded to WeChat CDN
- **Auto-compression**: images >5MB are automatically compressed to fit WeChat's limits
- **Caching**: a `.kuaifa-images.json` file is created next to the Markdown file, tracking uploaded images by MD5 hash. Unchanged images skip re-upload on subsequent publishes.
- **Cover image**: `--cover` accepts both local paths and URLs

If image uploads fail or cached URLs are stale, delete `.kuaifa-images.json` and retry.

## Markdown Features

Kuaifa supports:

- Standard Markdown (headings, lists, code blocks, tables, blockquotes, etc.)
- **Obsidian callouts**: `> [!tip] Title` — supports note, tip, warning, danger, quote types
- **Obsidian highlights**: `==highlighted text==`
- **Obsidian image embeds**: `![[image.png]]` — automatically resolved from `assets/` directories
- **Hidden tags**: `<!-- kuaifa:intro -->...<!-- /kuaifa:intro -->` for structured blocks (`:highlight`, `:cards`, `:summary`, `:prompt`, `:callout`)

## Troubleshooting

| Symptom | Fix |
|---|---|
| `kuaifa: command not found` | `npm install -g kuaifa` |
| `错误：未设置 api-key` | Register at https://www.kuaifa.art, then `kuaifa config set api-key <key>` |
| `错误：缺少封面图` | Add `--cover <image>` to publish command |
| `错误：缺少文章标题` | Add `--title "标题"` to publish command |
| `微信凭证验证失败` | Check appid/appsecret on mp.weixin.qq.com |
| `图片上传失败` | Check file size (<10MB), supported formats (PNG/JPG/GIF/WebP/BMP/SVG) |
| Image cache stale | Delete `.kuaifa-images.json` next to the Markdown file and retry |

For more help, visit https://www.kuaifa.art.
