---
name: kuaifa
description: "Kuaifa (快发) — publish Markdown articles to WeChat Official Accounts via the kuaifa CLI. Use this skill whenever the user wants to publish an article to WeChat, publish image messages, manage kuaifa configuration or templates, or mentions '快发', 'kuaifa', 'publish to WeChat', '发布公众号', '微信发布', '发文章'. Also trigger when the user has a Markdown file and wants to distribute it to WeChat, or asks about WeChat article formatting and themes."
---

# Kuaifa — Markdown to WeChat, One Command

Kuaifa (快发) is a CLI tool that publishes Markdown articles to WeChat Official Accounts. It handles image uploading and draft creation — the user just writes Markdown and runs one command.

Official website: https://www.kuaifa.art

## Version Check

On **first use in a session**, check the CLI version and compare with latest:

```bash
kuaifa --version
npm view kuaifa version
```

If an update is available, mention it once: `npm update -g kuaifa`

If users report issues, also remind them to update the skill: `cd ~/.claude/skills/kuaifa && git pull origin main`

## Setup

Before any operation, check if kuaifa is installed and configured: `kuaifa config list`

If unconfigured or not installed, read `references/setup.md` and walk the user through the full setup process.

## Workflows

### Generate NEW Article + Publish

When user asks you to **WRITE/GENERATE** a new article, you must fetch the template's writing prompt first — it contains structure, tone, and formatting rules that make the article work with the template's design.

1. **Determine which template to use:**
   - If user specifies a template → use that
   - If not → check `kuaifa config get default-template`
   - If no default either → skip prompt fetch, write freely

2. **Fetch template prompt (when a template is known):**
   ```bash
   kuaifa template prompt <template-id>
   ```
   Read the output carefully and follow all its guidelines when writing.

3. **Write article** following the prompt guidelines.

4. **Publish:**
   ```bash
   kuaifa publish article.md --title "文章标题" --cover cover.jpg --template <template-id>
   ```

**When to skip the template prompt:** User has an existing/finished article, or explicitly says to write without template style.

### Publish EXISTING Article

Already-written article — just publish directly, no template prompt needed:

```bash
kuaifa publish article.md --title "文章标题" --cover cover.jpg --template mint
```

### Publish Image Message (newspic)

For image-focused content (photo collections, image notes, galleries):

```bash
kuaifa publish-newspic --title "今日AI资讯" --images img1.jpg img2.jpg img3.jpg --caption "精选内容"
```

Use this for image-primary content, NOT text articles with embedded images.

## Core Commands

### `kuaifa publish <file>`

Publishes a Markdown file to WeChat as a draft (default) or sends it immediately.

| Parameter | Required | Default | Description |
|---|---|---|---|
| `<file>` | Yes | — | Markdown 文件路径 |
| `--title <title>` | No | 文件名 | 文章标题 |
| `--cover <path\|url>` | Yes | — | 封面图片，本地路径或 URL |
| `--author <name>` | No | config `default-author` | 作者名 |
| `--digest <text>` | No | `""` | 文章摘要 |
| `--template <id>` | No | config `default-template` | 模板 ID 或预设名称/slug |
| `--source-url <url>` | No | `""` | "阅读原文"链接 |
| `--recommend` | No | `false` | 插入往期推荐 |
| `--draft` | No | **default** | 发布到草稿箱 |
| `--send` | No | — | 直接群发（**发送后无法撤回**） |

Global option: `--account <name>` — 放在 `kuaifa` 之后、子命令之前，临时使用指定的 profile。

**Always default to `--draft`** unless the user explicitly asks to send immediately.

### `kuaifa publish-newspic`

Publishes image-focused content to WeChat.

| Parameter | Required | Default | Description |
|---|---|---|---|
| `--title <title>` | Yes | — | 图片消息标题 |
| `--images <paths...>` | Yes | — | 图片路径或 URL 列表（至少1张） |
| `--caption <text>` | No | `""` | 图片描述文字 |
| `--draft` | No | **default** | 发布到草稿箱 |
| `--send` | No | — | 直接群发 |

### Template Management

```bash
kuaifa template list                  # 列出系统模板和用户预设
kuaifa template prompt <template-id>  # 获取模板的写作 Prompt
```

Use `template prompt` when you need to **generate new content** matching a template's style — see "Generate NEW Article" workflow above.

## Configuration & Troubleshooting

For configuration details (config keys, multi-account profiles, remote settings), read `references/config.md`.

For troubleshooting common errors and image handling details, read `references/troubleshooting.md`.
