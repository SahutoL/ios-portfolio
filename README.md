# iOS App Portfolio

iOSアプリ開発者としてApp Storeで公開しているアプリのポートフォリオサイト。

## サイト構成

| URL | 内容 |
|-----|------|
| `/app` | アプリ一覧 |
| `/app/{appId}` | アプリ詳細 |
| `/app/{appId}/privacy-policy` | プライバシーポリシー |
| `/app/{appId}/terms` | 利用規約 |
| `/tokushoho` | 特定商取引法に基づく表示 |

## アプリの追加・編集

`src/config/apps.json` を編集:

```json
{
  "apps": [
    {
      "appId": "App Store ID",
      "privacyPolicy": "プライバシーポリシー（Markdown）",
      "terms": "利用規約（Markdown）"
    }
  ]
}
```

**App Store IDの確認方法**: App Storeのアプリページを開き、URLの `id` 以降の数字を確認。  
例: `https://apps.apple.com/jp/app/.../id6755771956` → `6755771956`

## 開発

```bash
npm install
npm run dev
# → http://localhost:3000
```

## デプロイ

Vercelにプッシュすると自動デプロイ。アプリ情報はiTunes APIから自動取得され、週次で更新される（ISR）。

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Vanilla CSS
- iTunes Lookup API
