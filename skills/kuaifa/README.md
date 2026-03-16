# Kuaifa Skill

This skill enables Claude Code to help users publish Markdown articles to WeChat Official Accounts using the [kuaifa CLI](https://www.kuaifa.art).

## What Claude Can Do With This Skill

- Guide first-time setup (API keys, WeChat credentials, default preferences)
- Publish Markdown articles to WeChat as drafts or immediate posts
- Upload images and get CDN URLs
- Render Markdown previews with different themes
- Manage templates and presets
- Configure multi-account profiles
- Troubleshoot common errors

## Trigger Keywords

This skill activates when users mention:

- `kuaifa`, `快发`
- "publish to WeChat", "WeChat Official Account"
- "微信公众号", "发布公众号", "微信发布", "发文章"
- "wechat article", "公众号文章"

## Files

- **SKILL.md** — Main skill prompt that Claude reads. Contains all commands, workflows, and troubleshooting guidance.
- **skill.js** — Skill metadata and utility functions.
- **evals/** — Evaluation tests for measuring skill quality.

## Usage Examples

### First-Time Setup

```
User: "Help me set up kuaifa"
Claude: [Guides through API key registration, credential setup, template selection]
```

### Publishing an Article

```
User: "Publish my article.md to WeChat with title 'AI Weekly' and cover image cover.jpg"
Claude: [Runs kuaifa publish with correct parameters, reports result]
```

### Template Discovery

```
User: "What templates are available?"
Claude: [Runs kuaifa template list, shows options]
```

### Multi-Account Management

```
User: "I want to manage two WeChat accounts"
Claude: [Explains profile system, helps configure second account]
```

## Evaluation

Run evals to measure skill performance:

```bash
claude-code-cli eval run
```

Current eval scenarios:

1. **eval-1-onboarding** — First-time setup experience
2. **eval-2-templates** — Template discovery and selection
3. **eval-3-publish** — End-to-end publishing workflow
4. **eval-4-multi-account** — Multi-account profile management

## Maintenance

When updating this skill:

1. Edit **SKILL.md** with new commands or workflows
2. Update **skill.js** metadata if triggers/structure changes
3. Add new evals for significant new features
4. Run evals to verify quality hasn't regressed
5. Update version number in skill.js

## Resources

- [Kuaifa Official Site](https://www.kuaifa.art)
- [Claude Code Skill Documentation](https://github.com/anthropics/claude-code)
