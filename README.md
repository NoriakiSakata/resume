# 職務経歴書

このリポジトリは、マークダウン形式で職務経歴書を管理し、GitHub Actionsで自動的にPDFを生成・デプロイするためのプロジェクトです。

## ファイル構成

職務経歴書は複数のファイルに分割して`content/`ディレクトリで管理します：

- `content/main.md` - 基本情報と自身の概要
- `content/career_vision.md` - キャリアビジョン
- `content/outputs.md` - GitHubやブログURLなどの成果物
- `content/skills.md` - 言語・フレームワークの経験年数など
- `content/projects/project_1.md` - プロジェクト1の詳細
- `content/projects/project_2.md` - プロジェクト2の詳細
- `content/projects/project_*.md` - その他のプロジェクト（任意の数だけ追加可能）

PDF化する際は、これらのファイルが自動的に結合されて1つのPDFファイルが生成されます。

## 使い方

### 1. 職務経歴書の編集

`content/`ディレクトリ内の各マークダウンファイルを編集して職務経歴書の内容を更新してください。

- 新しいプロジェクトを追加する場合は、`content/projects/project_3.md`、`content/projects/project_4.md` のようにファイルを作成してください
- ファイル名は `project_*.md` のパターンに従ってください（ワークフローが自動的に検出します）

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
│   ├── main.md           # 基本情報と自身の概要
│   ├── career_vision.md  # キャリアビジョン
│   ├── outputs.md        # GitHubやブログURLなど
│   ├── skills.md         # スキル・経験年数
│   └── projects/         # プロジェクトファイルのディレクトリ
│       ├── project_1.md  # プロジェクト1
│       ├── project_2.md  # プロジェクト2
│       └── project_*.md  # その他のプロジェクト（任意）
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

