import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppInfo, getAllAppIds, getSiteConfig } from "@/lib/itunes";

type Props = {
  params: Promise<{ appId: string }>;
};

export async function generateStaticParams() {
  const appIds = getAllAppIds();
  return appIds.map((appId) => ({ appId }));
}
// ISRで週次更新（604800秒 = 1週間）
export const revalidate = 604800;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { appId } = await params;
  const app = await getAppInfo(appId);
  
  if (!app) {
    return { title: "利用規約" };
  }
  
  return {
    title: `利用規約 - ${app.trackName}`,
    description: `${app.trackName}の利用規約`,
  };
}

export default async function TermsPage({ params }: Props) {
  const { appId } = await params;
  const app = await getAppInfo(appId);
  
  if (!app) {
    notFound();
  }
  
  const processMarkdown = (text: string) => {
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
  };
  
  return (
    <div className="container">
      <div className="legal-page">
        <nav style={{ marginBottom: "var(--space-6)" }}>
          <Link 
            href={`/app/${app.trackId}`}
            style={{ 
              fontSize: "var(--text-sm)", 
              color: "var(--color-accent)" 
            }}
          >
            ← {app.trackName}に戻る
          </Link>
        </nav>
        
        <h1>利用規約</h1>
        <p style={{ 
          color: "var(--color-text-secondary)", 
          marginBottom: "var(--space-8)" 
        }}>
          {app.trackName}
        </p>
        
        <div 
          className="legal-content"
          dangerouslySetInnerHTML={{ 
            __html: `<p>${processMarkdown(app.terms)}</p>` 
          }}
        />
      </div>
    </div>
  );
}
