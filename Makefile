# Makefile for Resume PDF Generation

# 変数定義
OUTPUT = resume.pdf
NPM = npm
NODE = node

# デフォルトターゲット
.PHONY: all pdf clean help check install

all: pdf

# 依存関係をインストール
install:
	@echo "Installing npm dependencies..."
	@$(NPM) install
	@echo "✅ Dependencies installed."

# PDFを生成
pdf: node_modules
	@$(NPM) run build

# 生成されたPDFを削除
clean:
	@echo "Removing generated PDF..."
	@rm -f $(OUTPUT) temp_combined.md
	@echo "Clean complete."

# 必要なツールがインストールされているかチェック
check:
	@echo "Checking required tools..."
	@which $(NODE) > /dev/null || (echo "❌ Error: Node.js is not installed" && echo "   Install with: brew install node" && exit 1)
	@echo "✅ Node.js is installed"
	@which $(NPM) > /dev/null || (echo "❌ Error: npm is not installed" && exit 1)
	@echo "✅ npm is installed"
	@if [ ! -d "node_modules" ]; then \
		echo ""; \
		echo "⚠️  Warning: Dependencies not installed"; \
		echo "   Run 'make install' or 'npm install' to install dependencies"; \
	else \
		echo "✅ Dependencies are installed"; \
	fi
	@echo ""
	@echo "✅ All required tools are installed."

# ヘルプを表示
help:
	@echo "Resume PDF Generation Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make install  - Install npm dependencies"
	@echo "  make          - Generate PDF (same as 'make pdf')"
	@echo "  make pdf      - Generate PDF from markdown files"
	@echo "  make clean    - Remove generated PDF"
	@echo "  make check    - Check if required tools are installed"
	@echo "  make help     - Show this help message"
	@echo ""
	@echo "Source files (from content/):"
	@echo "  main.md"
	@echo "  career_vision.md"
	@echo "  outputs.md"
	@echo "  skills.md"
	@echo "  project_*.md"
	@echo ""
	@echo "Output:"
	@echo "  $(OUTPUT)"

