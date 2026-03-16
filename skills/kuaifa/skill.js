/**
 * Kuaifa Skill for Claude Code
 *
 * Enables Claude to help users publish Markdown articles to WeChat Official Accounts
 * using the kuaifa CLI tool.
 *
 * Official website: https://www.kuaifa.art
 */

export default {
  // Skill metadata
  name: "kuaifa",
  version: "1.0.0",
  description: "Kuaifa (快发) — publish Markdown articles to WeChat Official Accounts via the kuaifa CLI. Use this skill whenever the user wants to publish an article to WeChat, upload images, preview article rendering, manage kuaifa configuration or templates, or mentions '快发', 'kuaifa', 'publish to WeChat', '发布公众号', '微信发布', '发文章'. Also trigger when the user has a Markdown file and wants to distribute it to WeChat, or asks about WeChat article formatting and themes.",

  // Trigger keywords - when to activate this skill
  triggers: [
    "kuaifa",
    "快发",
    "publish to wechat",
    "wechat official account",
    "微信公众号",
    "发布公众号",
    "微信发布",
    "发文章",
    "wechat article",
    "公众号文章"
  ],

  // Skill configuration
  config: {
    // Path to the main skill prompt
    promptFile: "SKILL.md",

    // Whether this skill has eval tests
    hasEvals: true,

    // Supported languages
    languages: ["zh-CN", "en"],

    // External dependencies
    dependencies: {
      cli: {
        name: "kuaifa",
        packageManager: "npm",
        package: "kuaifa",
        global: true,
        requiredVersion: ">=1.0.0"
      }
    }
  },

  // Utility functions (optional)
  utils: {
    /**
     * Check if kuaifa CLI is installed
     */
    async checkInstallation() {
      try {
        const { execSync } = require('child_process');
        const version = execSync('kuaifa --version', { encoding: 'utf-8' }).trim();
        return { installed: true, version };
      } catch (error) {
        return { installed: false, version: null };
      }
    },

    /**
     * Get installation instructions based on system
     */
    getInstallInstructions(platform = process.platform) {
      const instructions = {
        darwin: "npm install -g kuaifa",
        linux: "npm install -g kuaifa",
        win32: "npm install -g kuaifa"
      };
      return instructions[platform] || instructions.darwin;
    },

    /**
     * Common kuaifa commands reference
     */
    commands: {
      publish: "kuaifa publish <file> --title <title> --cover <image>",
      upload: "kuaifa upload <path...>",
      render: "kuaifa render <file>",
      templateList: "kuaifa template list",
      configList: "kuaifa config list",
      configSet: "kuaifa config set <key> <value>",
      verifyWechat: "kuaifa config verify-wechat",
      profileList: "kuaifa config profile list",
      profileAdd: "kuaifa config profile add <name>",
      profileUse: "kuaifa config profile use <name>"
    },

    /**
     * Common error messages and solutions
     */
    troubleshooting: {
      "command not found": {
        problem: "kuaifa CLI is not installed",
        solution: "Run: npm install -g kuaifa"
      },
      "未设置 api-key": {
        problem: "API key not configured",
        solution: "Register at https://www.kuaifa.art and run: kuaifa config set api-key <key>"
      },
      "缺少封面图": {
        problem: "Missing cover image",
        solution: "Add --cover parameter with local path or URL"
      },
      "缺少文章标题": {
        problem: "Missing article title",
        solution: "Add --title parameter"
      },
      "微信凭证验证失败": {
        problem: "WeChat credentials invalid",
        solution: "Check appid/appsecret on mp.weixin.qq.com"
      },
      "图片上传失败": {
        problem: "Image upload failed",
        solution: "Check file size (<10MB) and format (PNG/JPG/GIF/WebP/BMP/SVG)"
      }
    }
  },

  // Skill author and maintainer info
  author: {
    name: "shirenchuang",
    url: "https://github.com/shirenchuang/kuaifa"
  },

  // Links
  links: {
    homepage: "https://www.kuaifa.art",
    repository: "https://github.com/shirenchuang/kuaifa",
    issues: "https://github.com/shirenchuang/kuaifa/issues",
    documentation: "https://www.kuaifa.art/docs"
  }
};
