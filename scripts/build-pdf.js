#!/usr/bin/env node

const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// ファイルの順序を定義
const fileOrderBeforeProjects = [
  'content/main.md',
];

const fileOrderAfterProjects = [
  'content/skills.md',
  'content/career_vision.md',
  'content/future_skills.md',
  'content/outputs.md',
  'content/working_style.md',
];

async function buildPdf() {
  try {
    console.log('📄 Generating PDF from markdown files...\n');

    // プロジェクトファイルを取得（数字の大きい順）
    const projectFiles = await glob('content/projects/project_*.md');
    projectFiles.sort((a, b) => {
      // ファイル名から数字を抽出（例: "content/projects/project_5.md" -> 5）
      const numA = parseInt(a.match(/project_(\d+)/)?.[1] || '0');
      const numB = parseInt(b.match(/project_(\d+)/)?.[1] || '0');
      // 降順でソート（大きい数字が先）
      return numB - numA;
    });

    // すべてのファイルを結合（基本情報 → 職務経歴 → その他）
    const allFiles = [...fileOrderBeforeProjects, ...projectFiles, ...fileOrderAfterProjects];
    
    // 存在するファイルのみをフィルタ
    const existingFiles = allFiles.filter(file => fs.existsSync(file));
    
    if (existingFiles.length === 0) {
      console.error('❌ Error: No markdown files found in content/ directory');
      process.exit(1);
    }

    console.log('Files to combine:');
    existingFiles.forEach(file => console.log(`  - ${file}`));
    console.log('');

    // すべてのマークダウンファイルの内容を結合
    let combinedContent = '';
    for (const file of existingFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      combinedContent += content + '\n\n---\n\n';
    }

    // 一時ファイルに書き込み
    const tempFile = 'temp_combined.md';
    fs.writeFileSync(tempFile, combinedContent);

    // スタイルシートを一時ファイルに書き込み
    const stylesheet = `
      * {
        font-family: "Noto Sans CJK JP", "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif !important;
      }
      body {
        font-family: "Noto Sans CJK JP", "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
        font-size: 11pt;
        line-height: 1.6;
      }
      h1 {
        page-break-before: auto;
        page-break-after: avoid;
      }
      h2 {
        page-break-before: auto;
        page-break-after: avoid;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin: 1em 0;
      }
      table th, table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      table th {
        background-color: #f2f2f2;
      }
    `;
    const stylesheetFile = 'temp_styles.css';
    fs.writeFileSync(stylesheetFile, stylesheet);

    // PDF生成の設定
    const pdf = await mdToPdf(
      { path: tempFile },
      {
        dest: 'resume.pdf',
        pdf_options: {
          format: 'A4',
          margin: {
            top: '2cm',
            right: '2cm',
            bottom: '2cm',
            left: '2cm',
          },
          printBackground: true,
        },
        stylesheet: stylesheetFile,
        launch_options: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      }
    );

    // 一時ファイルを削除
    fs.unlinkSync(stylesheetFile);

    // 一時ファイルを削除
    fs.unlinkSync(tempFile);

    if (pdf) {
      const stats = fs.statSync('resume.pdf');
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`✅ PDF generated: resume.pdf (${fileSizeInMB} MB)`);
    } else {
      console.error('❌ Error: PDF generation failed');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

buildPdf();

