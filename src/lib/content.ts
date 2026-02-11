import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

/**
 * Markdownファイルを読み込んでHTMLに変換
 * @param appId アプリID
 * @param type 'privacy-policy' | 'terms'
 * @returns HTML文字列。ファイルが存在しない場合はnull
 */
export async function getContentHtml(appId: string, type: 'privacy-policy' | 'terms'): Promise<string | null> {
  const filePath = path.join(CONTENT_DIR, appId, `${type}.md`);
  
  try {
    const markdown = fs.readFileSync(filePath, 'utf8');
    if (!markdown.trim()) return null;
    
    const result = await remark()
      .use(html, { sanitize: false })
      .process(markdown);
    
    return result.toString();
  } catch {
    return null;
  }
}

/**
 * Markdownファイルの生テキストを取得
 * @param appId アプリID
 * @param type 'privacy-policy' | 'terms'
 * @returns Markdown文字列。ファイルが存在しない場合はnull
 */
export function getContentRaw(appId: string, type: 'privacy-policy' | 'terms'): string | null {
  const filePath = path.join(CONTENT_DIR, appId, `${type}.md`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.trim() || null;
  } catch {
    return null;
  }
}

/**
 * 指定アプリのコンテンツディレクトリが存在するか確認
 */
export function hasContent(appId: string): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, appId));
}
