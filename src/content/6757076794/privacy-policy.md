[English](#english) | [日本語](#japanese)

---

<a name="english"></a>
## Privacy Policy (English)

### 1. Introduction

AdsOps ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Apple Search Ads management application ("Service").

### 2. Information We Collect

#### 2.1 Information You Provide
- **Account Information**: Email address, name, and password when you create an account
- **Apple Search Ads Credentials**: OAuth tokens obtained through Apple's authentication flow to access your Apple Search Ads account
- **Apple Search Ads Data**: Campaign, ad group, keyword, and performance data accessed through the Apple Search Ads API

#### 2.2 Automatically Collected Information
- **Device Information**: Device type, operating system version, device token for push notifications
- **Usage Data**: Features used, actions taken, timestamps
- **Log Data**: Access times, error logs for service maintenance

### 3. How We Use Your Information

We use the collected information to:
- Provide and maintain the Service
- Display your Apple Search Ads performance data and analytics
- Execute automation rules that you have configured and approved
- Send push notifications and email alerts about your campaigns
- Maintain audit logs of all changes for accountability
- Improve the Service

### 4. Data Storage and Security

#### 4.1 Infrastructure
- Data is stored on cloud infrastructure (PostgreSQL database, Redis cache)
- The Service backend is hosted on Vercel (serverless functions)

#### 4.2 Encryption
- All API credentials (Apple Ads OAuth tokens) are encrypted at rest using AES-256 (Fernet)
- Passwords are hashed using bcrypt and never stored in plaintext
- Data in transit is protected using TLS
- Two-factor authentication (email OTP) is available for account security

#### 4.3 Access Control
- Role-based access control (RBAC) limits data access within workspaces
- Sensitive operations (approving changes, modifying connections) require biometric authentication (Face ID/Touch ID)

#### 4.4 Audit Logging
- All data modifications are logged with tamper-proof hash chains
- Logs are retained for compliance and accountability purposes

### 5. Data Sharing

We do NOT:
- Sell your personal information to third parties
- Share your data with third parties for marketing purposes
- Access your Apple Ads account data without your explicit authorization

We may share data only:
- With infrastructure service providers necessary to operate the Service (under strict confidentiality)
- When required by law, regulation, or legal process
- To protect our rights, safety, or property

### 6. Third-Party Services

Our app integrates with:
- **Apple Search Ads API**: Subject to [Apple's Privacy Policy](https://www.apple.com/privacy/)
- **Apple Push Notification service (APNs)**: For delivering push notifications to your device

### 7. Your Rights

You have the right to:
- **Access**: View your data through the app at any time
- **Correction**: Update your account information through the app settings
- **Deletion**: Delete your account and all associated data through the account settings. Upon deletion, all data including credentials, metrics, rules, and workspace data is permanently removed. Audit logs may be retained for legal compliance purposes.
- **Revocation**: Revoke Apple Search Ads API access at any time through your Apple account settings

### 8. Data Retention

- Account data is retained while your account is active
- Performance metrics are retained based on your plan (Free: 7 days, Pro: 90 days)
- Upon account deletion, all data is permanently deleted. Audit logs may be retained for legal compliance.

### 9. Children's Privacy

The Service is not intended for users under 18 years of age. We do not knowingly collect personal information from anyone under 18.

### 10. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of material changes via in-app notification or email. Continued use of the Service after changes constitutes acceptance of the updated policy.

### 11. Contact Us

For privacy inquiries, please contact us at:
- Email: qursur@gmail.com

---

<a name="japanese"></a>
## プライバシーポリシー（日本語）

### 1. はじめに

AdsOps（以下「当社」）は、お客様のプライバシー保護に努めています。本プライバシーポリシーは、当社のApple Search Ads管理アプリケーション（以下「本サービス」）をご利用いただく際の情報の収集、使用、開示、保護について説明します。

### 2. 収集する情報

#### 2.1 お客様から提供される情報
- **アカウント情報**: アカウント作成時のメールアドレス、氏名、パスワード
- **Apple Search Ads認証情報**: Apple Search Adsアカウントにアクセスするため、Appleの認証フローを通じて取得するOAuthトークン
- **Apple Search Adsデータ**: Apple Search Ads APIを通じてアクセスするキャンペーン、広告グループ、キーワード、パフォーマンスデータ

#### 2.2 自動的に収集される情報
- **デバイス情報**: デバイスタイプ、OSバージョン、プッシュ通知用デバイストークン
- **利用データ**: 使用機能、実行アクション、タイムスタンプ
- **ログデータ**: アクセス時刻、サービス保守のためのエラーログ

### 3. 情報の利用目的

収集した情報は以下の目的で使用します：
- サービスの提供および維持
- Apple Search Adsパフォーマンスデータおよび分析の表示
- お客様が設定・承認した自動化ルールの実行
- キャンペーンに関するプッシュ通知およびメールアラートの送信
- 説明責任のためのすべての変更の監査ログの維持
- サービスの改善

### 4. データの保存とセキュリティ

#### 4.1 インフラストラクチャ
- データはクラウドインフラストラクチャ（PostgreSQLデータベース、Redisキャッシュ）に保存されます
- サービスのバックエンドはVercel（サーバーレス関数）でホスティングされています

#### 4.2 暗号化
- すべてのAPI認証情報（Apple Ads OAuthトークン）はAES-256（Fernet）で保存時に暗号化
- パスワードはbcryptでハッシュ化され、平文で保存されることはありません
- 転送中のデータはTLSで保護
- アカウントセキュリティのために二要素認証（メールOTP）をご利用いただけます

#### 4.3 アクセス制御
- ロールベースアクセス制御（RBAC）によりワークスペース内のデータアクセスを制限
- 機密操作（変更の承認、接続の変更）には生体認証（Face ID/Touch ID）が必要

#### 4.4 監査ログ
- すべてのデータ変更は改ざん防止ハッシュチェーンで記録
- ログはコンプライアンスおよび説明責任の目的で保持

### 5. データの共有

当社は以下を行いません：
- 個人情報を第三者に販売すること
- マーケティング目的で第三者とデータを共有すること
- 明示的な許可なくApple Adsアカウントデータにアクセスすること

以下の場合にのみデータを共有することがあります：
- サービス運営に必要なインフラストラクチャサービスプロバイダー（厳格な機密保持の下）
- 法律、規制、または法的手続きにより要求された場合
- 当社の権利、安全、または財産を保護するため

### 6. サードパーティサービス

当アプリは以下と連携しています：
- **Apple Search Ads API**: [Appleのプライバシーポリシー](https://www.apple.com/jp/privacy/)に準拠
- **Apple Push Notification service（APNs）**: お客様のデバイスへのプッシュ通知の配信

### 7. お客様の権利

お客様には以下の権利があります：
- **アクセス**: アプリを通じていつでもデータを閲覧
- **訂正**: アプリの設定からアカウント情報を更新
- **削除**: アカウント設定からアカウントおよび関連するすべてのデータを削除。削除時、認証情報、指標、ルール、ワークスペースデータを含むすべてのデータが完全に削除されます。監査ログは法的コンプライアンスのため保持される場合があります。
- **取り消し**: Appleアカウント設定からいつでもApple Search Ads APIアクセスを取り消し

### 8. データ保持

- アカウントデータはアカウントがアクティブな間保持されます
- パフォーマンス指標はプランに基づいて保持されます（Free: 7日間、Pro: 90日間）
- アカウント削除時、すべてのデータは完全に削除されます。監査ログは法的コンプライアンスのため保持される場合があります。

### 9. 未成年者のプライバシー

本サービスは18歳未満のユーザーを対象としていません。18歳未満の方から意図的に個人情報を収集することはありません。

### 10. ポリシーの変更

本プライバシーポリシーは随時更新する場合があります。重要な変更はアプリ内通知またはメールでお知らせします。変更後もサービスを継続使用することで、更新されたポリシーに同意したものとみなされます。

### 11. お問い合わせ

プライバシーに関するお問い合わせ：
- メール: greef.pandl@gmail.com
