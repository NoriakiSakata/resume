# 職務経歴書

このリポジトリは、マークダウン形式で職務経歴書を管理し、GitHub Actionsで自動的にPDFを生成・デプロイするためのプロジェクトです。

## ファイル構成

職務経歴書は複数のファイルに分割して`content/`ディレクトリで管理します：

- `content/main.md` - 基本情報と職務要約
- `content/projects/project_*.md` - 職務経歴（プロジェクトごとに分割、数字の大きい順に結合）
- `content/skills.md` - 言語・フレームワークの経験年数など
- `content/career_vision.md` - キャリアビジョン
- `content/future_skills.md` - 今後身に付けたい技術
- `content/outputs.md` - GitHubやブログURLなどの成果物

PDF化する際は、これらのファイルが自動的に結合されて1つのPDFファイルが生成されます。プロジェクトファイルは数字の大きい順（最新のプロジェクトが先）に結合されます。

## 使い方

### 1. 職務経歴書の編集

`content/`ディレクトリ内の各マークダウンファイルを編集して職務経歴書の内容を更新してください。

- **基本情報**: `content/main.md` を編集
- **職務経歴**: `content/projects/project_*.md` を編集
  - 新しいプロジェクトを追加する場合は、`content/projects/project_6.md`、`content/projects/project_7.md` のようにファイルを作成してください
  - ファイル名は `project_*.md` のパターンに従ってください（ワークフローが自動的に検出し、数字の大きい順に結合します）
- **スキル**: `content/skills.md` を編集
- **キャリアビジョン**: `content/career_vision.md` を編集
- **今後身に付けたい技術**: `content/future_skills.md` を編集
- **成果物**: `content/outputs.md` を編集

### 2. ローカルでPDFを生成する場合

#### 必要なツール
- [Node.js](https://nodejs.org/) (v18以上推奨)
- npm（Node.jsに含まれています）
- Make（通常はシステムにインストール済み）

#### セットアップ

```bash
# 依存関係をインストール
npm install

# またはMakefileを使用
make install
```

#### Makefileを使用したPDF生成（推奨）

```bash
# 必要なツールがインストールされているか確認
make check

# PDFを生成
make

# または明示的に
make pdf

# 生成されたPDFを削除
make clean

# ヘルプを表示
make help
```

#### npmコマンドで直接PDF生成

```bash
# PDFを生成
npm run build

# 生成されたPDFを削除
npm run clean
```

### 3. GitHub Actionsでの自動デプロイ

1. このリポジトリをGitHubにプッシュ
2. `main` ブランチにプッシュすると、自動的にすべてのマークダウンファイルが結合されてPDFが生成されます
3. GitHub Pagesにデプロイされます（設定が必要な場合があります）

## ファイル構成

```
.
├── content/               # マークダウンファイルのディレクトリ
│   ├── main.md           # 基本情報と職務要約
│   ├── projects/         # プロジェクトファイルのディレクトリ
│   │   ├── project_1.md  # プロジェクト1（最古）
│   │   ├── project_2.md  # プロジェクト2
│   │   ├── project_3.md  # プロジェクト3
│   │   ├── project_4.md  # プロジェクト4
│   │   ├── project_5.md  # プロジェクト5（最新）
│   │   └── project_*.md  # その他のプロジェクト（任意）
│   ├── skills.md         # スキル・経験年数
│   ├── career_vision.md  # キャリアビジョン
│   ├── future_skills.md  # 今後身に付けたい技術
│   └── outputs.md        # GitHubやブログURLなど
├── scripts/
│   └── build-pdf.js      # PDF生成スクリプト
├── package.json          # npm設定ファイル
├── Makefile              # PDF生成用のMakefile
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actionsワークフロー
├── .gitignore
└── README.md
```

## GitHub Pagesの設定

1. リポジトリの Settings > Pages に移動
2. Source を "GitHub Actions" に設定

## カスタマイズ

PDFのスタイルを変更したい場合は、`scripts/build-pdf.js` のスタイルシート部分を編集してください。

- フォント: `font-family` を変更
- フォントサイズ: `font-size` を変更
- 余白: `pdf_options.margin` を変更
- ページサイズ: `pdf_options.format` を変更（A4, Letter など）

## ライセンス

このプロジェクトは個人利用を目的としています。

