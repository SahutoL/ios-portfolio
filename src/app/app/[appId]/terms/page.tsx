import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppInfo, getAllAppIds, getAppLegalInfo } from "@/lib/itunes";
import { processMarkdown } from "@/lib/markdown";

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
  const legal = getAppLegalInfo(appId);
  const appName = app?.trackName ?? legal?.appName;
  
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
  const app = await getAppInfo(appId);
  const legal = getAppLegalInfo(appId);
  
  // apps.jsonに登録されていないアプリは404
  if (!legal) {
    notFound();
  }
  
  // iTunes APIから取得できた場合はその名前、できなければapps.jsonの名前を使用
  const appName = app?.trackName ?? legal.appName;
  const terms = app?.terms ?? legal.terms;
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
          dangerouslySetInnerHTML={{ 
            __html: `<p>${processMarkdown(terms)}</p>` 
          }}
        />
      </div>
    </div>
  );
}
