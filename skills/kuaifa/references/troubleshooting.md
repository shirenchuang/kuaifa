# Troubleshooting

| Symptom | Fix |
|---|---|
| `kuaifa: command not found` | `npm install -g kuaifa` |
| `错误：未设置 api-key` | Register at https://www.kuaifa.art（或备用 https://api.kuaifa.art）, then `kuaifa config set api-key <key>` |
| `错误：缺少封面图` | Add `--cover <image>` to publish command |
| `错误：缺少文章标题` | Add `--title "标题"` to publish command |
| `微信凭证验证失败` | Check appid/appsecret on mp.weixin.qq.com |
| Image cache stale | Delete `.kuaifa-images.json` next to the Markdown file and retry |

## Image Handling Details

Kuaifa automatically handles all images in Markdown and in `publish-newspic`:

- **Local images**: resolved relative to the Markdown file directory, also searches `assets/` and `../assets/`
- **Remote images**: `http://` and `https://` URLs are downloaded, re-uploaded to WeChat CDN
- **Auto-compression**: images >5MB are automatically compressed to fit WeChat's limits
- **Caching**: a `.kuaifa-images.json` file is created next to the Markdown file, tracking uploaded images by MD5 hash. Unchanged images skip re-upload on subsequent publishes.
- **Cover image**: `--cover` accepts both local paths and URLs

If image uploads fail or cached URLs are stale, delete `.kuaifa-images.json` and retry.

For more help, visit https://www.kuaifa.art（或备用地址 https://api.kuaifa.art）.
