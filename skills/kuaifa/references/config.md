# Configuration Reference

All config is stored in `~/.kuaifa/config.json`.

```bash
kuaifa config set <key> <value>
kuaifa config get <key>
kuaifa config list
```

## Config Keys

| Key | Description |
|---|---|
| `api-key` | kuaifa API 密钥（在 www.kuaifa.art 或 api.kuaifa.art 注册获取） |
| `appid` | 微信公众号 AppID |
| `appsecret` | 微信公众号 AppSecret |
| `server-url` | API 服务端地址（通常不需要修改） |
| `default-template` | 默认模板 ID 或预设名称，发布时自动使用 |
| `default-author` | 默认作者名 |
| `account-name` | 公众号名称（用于文章内展示） |

## Multi-Account Profiles

For users managing multiple WeChat accounts:

```bash
kuaifa config profile add <name>        # 新建 profile
kuaifa config profile use <name>        # 切换激活的 profile
kuaifa config profile del <name>        # 删除 profile
kuaifa config profile list              # 列出所有 profile
kuaifa config profile use none          # 取消激活，回到全局配置
kuaifa config profile set <key> <value> # 在当前 profile 中设置配置项
```

Profile set 可用 key: `api-key`, `appid`, `appsecret`, `default-author`, `default-theme`, `account-name`, `default-template`

Use `--account <name>` (placed after `kuaifa`, before the subcommand) to temporarily use a different profile without switching:

```bash
kuaifa --account my-second-account publish article.md --title "标题" --cover cover.jpg
```

## Remote Server Settings

```bash
kuaifa config remote show
kuaifa config remote set <key> <value>
```

可用 key: `wechat-appid`, `wechat-appsecret`, `default-theme`, `default-preset`

## Verify WeChat Credentials

```bash
kuaifa config verify-wechat
```
