import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppInfo, getAllAppIds, getAppName, isRegisteredApp } from "@/lib/itunes";
import { getContentHtml } from "@/lib/content";

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
  const appName = app?.trackName ?? getAppName(appId);
  
  if (!appName) {
    return { title: "利用規約" };
  }
  
  return {
    title: `利用規約 - ${appName}`,
    description: `${appName}の利用規約`,
  };
}

export default async function TermsPage({ params }: Props) {
  const { appId } = await params;
  
  if (!isRegisteredApp(appId)) {
    notFound();
  }
  
  const app = await getAppInfo(appId);
  const appName = app?.trackName ?? getAppName(appId) ?? appId;
  const contentHtml = await getContentHtml(appId, 'terms');
  
  if (!contentHtml) {
    notFound();
  }
  
  const returnId = app?.trackId ?? appId;
  
  return (
    <div className="container">
      <div className="legal-page">
        <nav style={{ marginBottom: "var(--space-6)" }}>
          <Link 
            href={`/app/${returnId}`}
            style={{ 
              fontSize: "var(--text-sm)", 
              color: "var(--color-accent)" 
            }}
          >
            ← {appName}に戻る
          </Link>
        </nav>
        
        <h1>利用規約</h1>
        <p style={{ 
          color: "var(--color-text-secondary)", 
          marginBottom: "var(--space-8)" 
        }}>
          {appName}
        </p>
        
        <div 
          className="legal-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
}
