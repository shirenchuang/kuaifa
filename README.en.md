<p align="center">
  <a href="https://www.kuaifa.art">
    <img src="./assets/banner.png" alt="Kuaifa — Write it, ship it." width="100%" />
  </a>
</p>

<h1 align="center">Kuaifa Skill for Claude Code</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/kuaifa"><img src="https://img.shields.io/npm/v/kuaifa?color=cb3837&label=kuaifa%20CLI" alt="npm version" /></a>
  <a href="https://github.com/shirenchuang/kuaifa/blob/main/LICENSE"><img src="https://img.shields.io/github/license/shirenchuang/kuaifa" alt="license" /></a>
  <a href="https://github.com/shirenchuang/kuaifa/stargazers"><img src="https://img.shields.io/github/stars/shirenchuang/kuaifa?style=social" alt="stars" /></a>
</p>

<p align="center">
  A Claude Code skill that enables seamless publishing of Markdown articles to WeChat Official Accounts using the <a href="https://www.kuaifa.art">kuaifa CLI</a>.
</p>

## What is Kuaifa?

Kuaifa (快发) is a CLI tool that simplifies publishing Markdown content to WeChat Official Accounts. It handles:

- Automatic image uploading and CDN hosting
- Draft creation in WeChat backend
- Image message (newspic) publishing for photo galleries and visual content
- Multi-account management
- Image caching and compression

With this skill, Claude can help you publish articles, manage templates, configure accounts, and troubleshoot issues — all through natural conversation.

## Installation

### Prerequisites

- Node.js >= 18
- kuaifa CLI: `npm install -g kuaifa`
- A kuaifa account (register at https://www.kuaifa.art)
- Claude Code (or any AI coding assistant that supports Skills)

### Install this skill

**Option 1 (Recommended): One-line install**

```bash
npx skills add shirenchuang/kuaifa --skill kuaifa
```

Works with Claude Code, Cursor, Copilot, Goose, and other AI coding assistants — automatically installs to the correct location.

**Option 2: Let your AI install it**

Just send the following message to your Claude Code or other AI assistant:

> Install this skill: https://github.com/shirenchuang/kuaifa/tree/main/skills/kuaifa

The AI will clone the repo and place it in the correct directory automatically.

**Option 3: Manual clone**

```bash
cd ~/.claude/skills/
git clone https://github.com/shirenchuang/kuaifa.git
```

The skill files live under `skills/kuaifa/` in the repository. Claude Code will detect them automatically.

**Option 3: Symlink (for development)**

```bash
ln -s /path/to/kuaifa ~/.claude/skills/kuaifa
```

**Verify installation**

```bash
ls ~/.claude/skills/kuaifa/SKILL.md
# File exists = installed successfully
```

## Quick Start

### First-Time Setup

Ask Claude to help you set up kuaifa:

```
Claude, help me set up kuaifa for my WeChat Official Account
```

Claude will guide you through:

1. Getting your API key from https://www.kuaifa.art
2. Configuring WeChat credentials (appid/appsecret)
3. Setting default author and template preferences
4. Verifying the setup

### Publishing an Article

Once configured, publishing is simple:

```
Claude, publish my article.md to WeChat with title "My Article" and cover image cover.jpg
```

Claude will:

- Upload images referenced in your Markdown
- Apply your chosen theme
- Create a draft in your WeChat backend
- Provide you with the media ID for review

### Publishing Image Messages

For image-focused content like photo galleries or visual notes:

```
Claude, publish these screenshots as an image note with title "AI News Today"
```

Claude will use `kuaifa publish-newspic` to create a visual-first post optimized for image display.

### Other Capabilities

- **Template management**: "Show me available kuaifa templates"
- **Image uploads**: "Upload these images to kuaifa"
- **Image messages**: "Publish these photos as a newspic post"
- **Multi-account**: "Publish this to my second account"
- **Troubleshooting**: "Why is my kuaifa publish failing?"

## What This Skill Does

This skill teaches Claude how to:

1. **Detect kuaifa requests** — trigger on keywords like "publish to WeChat", "kuaifa", "快发", etc.
2. **Guide first-time setup** — walk users through getting API keys, setting credentials, choosing templates
3. **Execute publish workflows** — handle all parameters, defaults, and edge cases correctly
4. **Manage configuration** — profiles, templates, remote settings
5. **Troubleshoot issues** — diagnose common errors and suggest fixes

## 🔄 Updates

### Updating kuaifa CLI

Keep your kuaifa CLI up to date to access the latest features and bug fixes:

```bash
# Check current version
kuaifa --version

# Check latest version
npm view kuaifa version

# Update to latest
npm update -g kuaifa
```

**Claude will proactively remind you**: When using this skill, Claude checks your kuaifa version and suggests updates when a newer version is available.

### Updating This Skill

When the skill is updated with new features or support for new CLI commands:

**If installed via git clone**:
```bash
cd ~/.claude/skills/kuaifa
git pull origin main
```

**If manually downloaded**:
Download the latest version and replace the `~/.claude/skills/kuaifa` directory.

### Version Check Mechanism

This skill includes automatic version checking:

1. **CLI Version Check**: Claude verifies kuaifa CLI installation and version on first use
2. **Update Reminders**: Proactively suggests updates when newer versions are available
3. **Feature Compatibility**: Ensures skill features match your installed CLI version

### Update Notifications

Stay informed about updates:

- 📢 **GitHub Releases**: https://github.com/shirenchuang/kuaifa/releases
- ⭐ **Star this repo**: Get notified of new releases
- 🐛 **Issue Tracker**: https://github.com/shirenchuang/kuaifa/issues

## Development

### Running Evals

This skill includes evaluation tests to measure performance:

```bash
cd skills/kuaifa
claude-code-cli eval run
```

Evals cover:

- First-time onboarding experience
- Template discovery and selection
- End-to-end publishing workflow
- Multi-account management

### Skill Structure

```
kuaifa/
├── README.md           # This file
├── skill.js            # Skill entry point and metadata
├── skills/
│   └── kuaifa/
│       ├── SKILL.md    # Main skill prompt (Claude reads this)
│       └── evals/      # Evaluation tests
│           └── evals.json
└── kuaifa-workspace/   # Eval results and benchmarks
```

## Contributing

Contributions are welcome! To improve this skill:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Run evals to verify quality (`claude-code-cli eval run`)
5. Commit with descriptive messages
6. Push and create a pull request

### Improvement Ideas

- Add more eval scenarios (error handling, edge cases)
- Support for batch publishing
- Integration with content management workflows
- Enhanced template customization guidance

## License

MIT License

## Resources

- [Kuaifa Official Site](https://www.kuaifa.art)
- [Claude Code Documentation](https://github.com/anthropics/claude-code)
- [WeChat Official Account Platform](https://mp.weixin.qq.com)

## Support

- For kuaifa CLI issues: https://www.kuaifa.art
- For skill issues: Open an issue in this repository
- For Claude Code questions: https://github.com/anthropics/claude-code/issues
