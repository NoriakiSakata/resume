## 成果物・アウトプット

- [GitHub](https://github.com/NoriakiSakata)
- [Zenn](https://zenn.dev/enjoy_nori)

### GitHub
主にUIUXやライブラリの技術検証

### 技術ブログ

- コミュニティ
学生時代よりエンジニアコミュニティに所属し、定期的に技術ブログを執筆しています。  
[コミュニティプロフィール](https://www.kamo-it.org/member/Nori/)

- Zenn
主に個人開発で試したことなどを執筆

- X
主に技術記事を引用した感想や意見を投稿

### 個人開発アプリ：Vintage Tracker
- **概要**  
  日本国内の古着屋をマップで探せるアプリの開発・運用
- **URL（iOS版）**: [https://apps.apple.com/jp/app/vintage-tracker-%E5%8F%A4%E7%9D%80%E5%B1%8B%E3%83%9E%E3%83%83%E3%83%97/id6447299193](https://apps.apple.com/jp/app/vintage-tracker-%E5%8F%A4%E7%9D%80%E5%B1%8B%E3%83%9E%E3%83%83%E3%83%97/id6447299193)

- **URL（Android版）**: [https://play.google.com/store/apps/details?id=com.noriaki.vintage_tracker&pcampaignid=web_share](https://play.google.com/store/apps/details?id=com.noriaki.vintage_tracker&pcampaignid=web_share)

- **URL（Web）**: [https://vintage-tracker-web.vercel.app/](https://vintage-tracker-web.vercel.app/)

※アプリのソースコードは公開しておりませんが、実際の動作や機能は上記リンクから確認可能です。

- **技術的ポイント / 実装例**
  - **モバイルアプリ（Flutter）**
    - サブスクリプション機能（RevenueCat）
    - 地図表示（Google Maps / Mapbox 両方対応経験）
    - GPT API × Supabaseベクトル検索による自然言語検索チャットボット
    - プッシュ通知（Firebase Messaging）
    - ログ収集 / 分析（Firebase Analytics、API Gateway + Lambda + BigQuery）
  - **Web版（Next.js）**
    - App RouterやUIフレームワークの活用
    - API Routesによるフルスタック開発（フロントエンドとAPIを同一プロジェクトで開発）