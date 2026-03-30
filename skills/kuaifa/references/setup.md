# First-Time Setup Guide

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

## Step 1: Get an API Key

Register at https://www.kuaifa.art（或备用地址 https://api.kuaifa.art）to get your API key, then:

```bash
kuaifa config set api-key <YOUR_API_KEY>
```

## Step 2: Set WeChat Credentials

The WeChat appid/appsecret come from the WeChat Official Account admin panel (mp.weixin.qq.com):

```bash
kuaifa config set appid <WECHAT_APPID>
kuaifa config set appsecret <WECHAT_APPSECRET>
```

Kuaifa will automatically verify the credentials after setting both values.

## Step 3: Set Defaults

```bash
kuaifa config set default-author "你的名字"
```

## Step 4: Choose a Default Template

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
