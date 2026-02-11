/**
 * MarkdownテキストをシンプルなHTMLに変換
 * h1除去、h2/h3変換、太字、リンク、リスト、段落を処理
 */
export function processMarkdown(text: string): string {
  return text
    .replace(/^# (.+)$/gm, '')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.+<\/li>\n?)+/gm, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .trim();
}
