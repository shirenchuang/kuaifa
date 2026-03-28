---
name: kuaifa
description: "Kuaifa (快发) — publish Markdown articles to WeChat Official Accounts via the kuaifa CLI. Use this skill whenever the user wants to publish an article to WeChat, publish image messages, manage kuaifa configuration or templates, or mentions '快发', 'kuaifa', 'publish to WeChat', '发布公众号', '微信发布', '发文章'. Also trigger when the user has a Markdown file and wants to distribute it to WeChat, or asks about WeChat article formatting and themes."
---

# Kuaifa — Markdown to WeChat, One Command

Kuaifa (快发) is a CLI tool that publishes Markdown articles to WeChat Official Accounts. It handles image uploading and draft creation — the user just writes Markdown and runs one command.

Official website: https://www.kuaifa.art

## Version Check

On **first use in a session** (not every operation), check the CLI version:

```bash
kuaifa --version
```

If you haven't checked before, also compare with the latest published version:

```bash
npm view kuaifa version
```

If an update is available, mention it once:

```bash
npm update -g kuaifa
```

If users report issues or mention missing features, also remind them to update the skill:

```bash
cd ~/.claude/skills/kuaifa && git pull origin main
```

## CRITICAL RULE: Always Fetch Template Prompt Before Writing New Content

**This is the #1 rule for content generation. DO NOT skip this step.**

When the user asks you to **WRITE, GENERATE, or CREATE** a new article:

### Step 1 — Determine which template to use

- If user **specifies a template**: use that template ID/name
- If user **does NOT specify a template**: check for configured default template:
  ```bash
  kuaifa config get default-template
  ```
  - If a default template exists → use that template
  - If no default template → skip prompt fetch, write freely

### Step 2 — Fetch the template's writing prompt (MANDATORY)

```bash
kuaifa template prompt <template-id>
```

Read the output carefully. It contains:
- Required content structure and formatting
- Tone and style conventions
- Special HTML comments or markup rules
- Best practices specific to this template

### Step 3 — Write the article FOLLOWING the prompt guidelines

Apply ALL requirements from the template prompt. Do not improvise structure or formatting — follow what the prompt says.

### Step 4 — Publish with the same template

```bash
kuaifa publish article.md --title "..." --cover ... --template <template-id>
```

**When does this rule NOT apply?**
- User has an **existing/finished** article → just publish directly, no prompt needed
- User explicitly says to write **without any template style** → write freely

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

## Common Workflows

### Workflow 1: Generate NEW Article + Publish with Template

> **See "CRITICAL RULE" above** — you MUST fetch the template prompt before writing.

When user asks you to **WRITE/GENERATE** content and publish with a specific template:

1. **Fetch template prompt:**
   ```bash
   kuaifa template prompt kuaifa
   ```

2. **Write article following the guidelines:**
   - Follow all formatting requirements
   - Match the template's structure
   - Apply special conventions

3. **Publish with the template:**
   ```bash
   kuaifa publish article.md --title "文章标题" --cover cover.jpg --template kuaifa
   ```

**Example:**
```
User: "写一篇关于 AI 的文章并发布到微信，用 kuaifa 模板"
Claude: [Runs kuaifa template prompt kuaifa to get guidelines]
Claude: [Writes article following the guidelines]
Claude: [Runs kuaifa publish with --template kuaifa]
```

### Workflow 2: Publish EXISTING Article with Template

When user has an **existing article file** and wants to publish:

```bash
kuaifa publish article.md --title "文章标题" --cover cover.jpg --template mint
```

**DO NOT fetch template prompt** — the article is already written. Just publish directly.

**Example:**
```
User: "把这个 article.md 发布到微信，用 mint 模板"
Claude: [Directly runs kuaifa publish with --template mint]
Claude: [NO need to fetch template prompt - article already exists]
```

### Workflow 3: Publish WITHOUT Specific Template

When no template is specified:

```bash
kuaifa publish article.md --title "文章标题" --cover cover.jpg
```

**No template prompt needed** — using default or no template.

### Workflow 4: Publish Image Message (newspic)

When user wants to publish visual content, image collections, or photo galleries:

**Example scenarios:**
- "把这些图片发布成一个图文笔记"
- "发布这几张截图到微信"
- "创建一个图片合集"

```bash
kuaifa publish-newspic --title "今日AI资讯" --images img1.jpg img2.jpg img3.jpg --caption "精选内容"
```

**Important:**
- Always use `--draft` by default (can review before sending)
- Require at least `--title` and `--images` parameters
- Images can be local paths or remote URLs
- Use this for image-focused content, NOT text articles with embedded images

## Core Commands

### Publish an Article — `kuaifa publish <file>`

The main command. Takes a Markdown file and publishes it to WeChat as a draft (default) or sends it immediately.

**Use this for:** Regular articles, blog posts, long-form content with text and images.

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

Global option: `--account <name>` — 放在 `kuaifa` 之后、子命令之前，临时使用指定的 profile，不修改当前激活配置。例如：`kuaifa --account my-work publish article.md ...`

**What happens under the hood:**
1. Scans the Markdown for image references (standard `![](path)` and Obsidian `![[image.png]]`)
2. Local images are resolved relative to the Markdown file directory, also checks `assets/` subdirectory
3. Remote images (http/https URLs in Markdown) are automatically downloaded and re-uploaded
4. Images >5MB are automatically compressed (no manual intervention needed)
5. Unchanged images are skipped via MD5-based local cache (`.kuaifa-images.json` in the same directory)
6. Server uploads images to WeChat CDN and creates the draft

**Always default to `--draft`** unless the user explicitly asks to send immediately. This is the safe option — the user can review in WeChat's backend before publishing.

### Publish Image Message (newspic) — `kuaifa publish-newspic`

Publish image-focused content to WeChat as "newspic" type. This format is optimized for visual content like photo collections, image notes, and multi-image posts.

**Use this for:** Image notes, photo galleries, visual content collections, infographic posts where images are the primary content.

**Required parameters:**

| Parameter | Description |
|---|---|
| `--title <title>` | **Required** - Title of the image message |
| `--images <paths...>` | **Required** - One or more image paths or URLs (at least 1 image) |

**Optional parameters:**

| Parameter | Default | Description |
|---|---|---|
| `--caption <text>` | `""` | Caption/description text for the images |
| `--draft` | **default** | Save to draft box (default behavior) |
| `--send` | — | Send immediately to subscribers (**use with caution**) |

**Examples:**

```bash
# Single image
kuaifa publish-newspic --title "Daily AI News" --images photo.jpg

# Multiple images (recommended for image notes)
kuaifa publish-newspic \
  --title "今日AI资讯" \
  --images img1.jpg img2.jpg img3.jpg \
  --caption "精选内容摘要"

# Remote images (URLs)
kuaifa publish-newspic \
  --title "Product Screenshots" \
  --images https://example.com/img1.jpg https://example.com/img2.jpg

# Send immediately
kuaifa publish-newspic --title "Breaking News" --images news.jpg --send
```

**How it works:**
1. Supports both local file paths and remote URLs (http/https)
2. Automatically compresses images >5MB
3. Uses MD5-based caching to avoid re-uploading unchanged images
4. Downloads remote images and re-uploads to WeChat CDN
5. Creates a visual-first post format optimized for image display

**When to use newspic vs regular publish:**
- **Use `publish-newspic`** for: Image collections, visual notes, photo galleries, infographics
- **Use `publish`** for: Text articles, blog posts, long-form content with embedded images

**Always default to `--draft`** unless user explicitly requests `--send`.

### Template Management

#### List Templates

List all available templates and user presets:

```bash
kuaifa template list
```

This shows two sections:
- **System templates** — built-in themes, referenced by ID
- **User presets** — custom presets saved on the server, referenced by name or slug

Use the ID, name, or slug with `--template` when publishing. If a user is unsure which template to use, run `kuaifa template list` first to show their options.

#### Get Template Writing Prompt

Get the writing prompt/style guide for a specific template:

```bash
kuaifa template prompt <template-id>
```

**Examples:**
```bash
kuaifa template prompt kuaifa    # Get prompt for "kuaifa" template
kuaifa template prompt mint      # Get prompt for "mint" template
```

**IMPORTANT RULE: Fetch template prompt when GENERATING NEW content**

**When to use:**
- User asks you to **WRITE/GENERATE** a new article with a specific template
- User is **CREATING** content that will be published with a template

**When NOT to use:**
- User has an **EXISTING/FINISHED** article file
- User just wants to **PUBLISH** an already-written article

**Why?** The template prompt contains writing guidelines:
- Content structure and formatting
- Tone and style conventions
- Special markup or layout rules
- Best practices for that template

These guidelines help you write articles that work perfectly with the template's design.

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

Use `--account <name>` (placed after `kuaifa`, before the subcommand) to temporarily use a different profile:

```bash
kuaifa --account my-second-account publish article.md --title "标题" --cover cover.jpg
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
| Image cache stale | Delete `.kuaifa-images.json` next to the Markdown file and retry |

For more help, visit https://www.kuaifa.art.
