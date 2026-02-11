import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppInfo, getAllAppIds, getAppName, isRegisteredApp } from "@/lib/itunes";
import { getContentHtml, getContentModifiedDate } from "@/lib/content";

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
    return { title: "プライバシーポリシー" };
  }
  
  return {
    title: `プライバシーポリシー - ${appName}`,
    description: `${appName}のプライバシーポリシー`,
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { appId } = await params;
  
  if (!isRegisteredApp(appId)) {
    notFound();
  }
  
  const app = await getAppInfo(appId);
  const appName = app?.trackName ?? getAppName(appId) ?? appId;
  const contentHtml = await getContentHtml(appId, 'privacy-policy');
  
  if (!contentHtml) {
    notFound();
  }
  
  const returnId = app?.trackId ?? appId;
  const updatedDate = getContentModifiedDate(appId, 'privacy-policy');
  
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
        
        <h1>プライバシーポリシー</h1>
        <p style={{ 
          color: "var(--color-text-secondary)", 
          marginBottom: "var(--space-2)" 
        }}>
          {appName}
        </p>
        {updatedDate && (
          <p style={{ 
            fontSize: "var(--text-xs)", 
            color: "var(--color-text-tertiary)",
            marginBottom: "var(--space-8)" 
          }}>
            最終更新日: {updatedDate}
          </p>
        )}
        
        <div 
          className="legal-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
}
