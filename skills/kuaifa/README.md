# Kuaifa Skill - 快发技能

[English](./README.en.md) | 简体中文

这个技能让 Claude Code 能够帮助用户使用 [kuaifa CLI](https://www.kuaifa.art) 将 Markdown 文章发布到微信公众号。

## Claude 可以做什么

- 引导首次设置（API 密钥、微信凭证、默认配置）
- 将 Markdown 文章发布到微信（草稿或立即发布）
- 上传图片并获取 CDN URL
- 使用不同主题渲染 Markdown 预览
- 管理模板和预设配置
- 配置多账号 profile
- 排查常见错误

## 触发关键词

当用户提到以下内容时，此技能会自动激活：

- `kuaifa`、`快发`
- "publish to WeChat"、"WeChat Official Account"
- "微信公众号"、"发布公众号"、"微信发布"、"发文章"
- "wechat article"、"公众号文章"

## 文件说明

- **SKILL.md** — Claude 读取的主要技能提示词，包含所有命令、工作流程和问题排查指南
- **skill.js** — 技能元数据和工具函数
- **evals/** — 用于衡量技能质量的评估测试

## 使用示例

### 首次设置

```
用户："帮我设置 kuaifa"
Claude：[引导完成 API 密钥注册、凭证配置、模板选择]
```

### 发布文章

```
用户："把 article.md 发布到微信，标题是《AI 周报》，封面用 cover.jpg"
Claude：[使用正确的参数运行 kuaifa publish，报告结果]
```

### 发现模板

```
用户："有哪些可用的模板？"
Claude：[运行 kuaifa template list，显示选项]
```

### 多账号管理

```
用户："我想管理两个微信账号"
Claude：[解释 profile 系统，帮助配置第二个账号]
```

## 评估测试

运行评估以衡量技能性能：

```bash
claude-code-cli eval run
```

当前的评估场景：

1. **eval-1-onboarding** — 首次设置体验
2. **eval-2-templates** — 模板发现和选择
3. **eval-3-publish** — 端到端发布流程
4. **eval-4-multi-account** — 多账号 profile 管理

## 维护指南

更新此技能时：

1. 编辑 **SKILL.md** 添加新命令或工作流程
2. 如果触发关键词或结构变化，更新 **skill.js** 元数据
3. 为重要的新功能添加新的评估测试
4. 运行评估以验证质量没有退化
5. 更新 skill.js 中的版本号

## 相关资源

- [快发官方网站](https://www.kuaifa.art)
- [Claude Code Skill 文档](https://github.com/anthropics/claude-code)
