import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  getAppInfo, 
  getAllAppIds, 
  formatRating, 
  formatFileSize, 
  formatDate,
  formatLanguages,
  formatPrice,
} from "@/lib/itunes";
import { StarRating } from "@/components/StarRating";

type Props = {
  params: Promise<{ appId: string }>;
};

// 静的生成用のパラメータ
export async function generateStaticParams() {
  const appIds = getAllAppIds();
  return appIds.map((appId) => ({ appId }));
}

// ISRで週次更新（604800秒 = 1週間）
export const revalidate = 604800;

// 動的メタデータ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { appId } = await params;
  const app = await getAppInfo(appId);
  
  if (!app) {
    return { title: "アプリが見つかりません" };
  }
  
  return {
    title: app.trackName,
    description: app.description.slice(0, 160),
    openGraph: {
      title: app.trackName,
      description: app.description.slice(0, 160),
      images: [app.artworkUrl512],
    },
  };
}

export default async function AppDetailPage({ params }: Props) {
  const { appId } = await params;
  const app = await getAppInfo(appId);
  
  if (!app) {
    notFound();
  }
  
  return (
    <div className="container">
      <div className="app-detail">
        {/* Header Section */}
        <header className="app-detail-header">
          <Image
            src={app.artworkUrl512}
            alt={`${app.trackName} アイコン`}
            width={128}
            height={128}
            className="app-icon app-icon-large"
            unoptimized
          />
          <div className="app-detail-info">
            <h1 className="app-detail-title">{app.trackName}</h1>
            <a href="https://apps.apple.com/jp/developer/renzo-ohhama/id1812551739" 
              target="_blank" 
              rel="noopener noreferrer"
              className="app-detail-developer">
                {app.artistName}
            </a>
            <p style={{ color: "var(--color-text-secondary)" }}>
              {app.primaryGenreName}
            </p>
            
            <div className="app-detail-meta">
              <div className="meta-item">
                <div className="meta-label">評価</div>
                <div className="meta-value">
                  <StarRating rating={app.averageUserRating} />
                  <span style={{ marginLeft: "4px" }}>
                    {formatRating(app.averageUserRating)}
                  </span>
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-label">年齢</div>
                <div className="meta-value">{app.contentAdvisoryRating}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">価格</div>
                <div className="meta-value">{formatPrice(app.price, app.formattedPrice)}</div>
              </div>
            </div>
          </div>
        </header>
        
        {/* App Store Link */}
        <div className="links-section" style={{ marginBottom: "var(--space-12)" }}>
          <a 
            href={app.trackViewUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-button link-button-primary"
          >
            App Storeで見る
          </a>
        </div>
        
        {/* Screenshots */}
        {app.screenshotUrls && app.screenshotUrls.length > 0 && (
          <section className="screenshots-section">
            <h2 className="screenshots-title">スクリーンショット</h2>
            <div className="screenshots-scroll">
              {app.screenshotUrls.map((url, index) => (
                <div key={index} className="screenshot-item">
                  <Image
                    src={url}
                    alt={`${app.trackName} スクリーンショット ${index + 1}`}
                    width={230}
                    height={500}
                    unoptimized
                    style={{ width: "auto", height: "auto", maxHeight: "500px" }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Description */}
        <section className="description-section">
          <h2 className="section-title">説明</h2>
          <p className="description-text">{app.description}</p>
        </section>
        
        {/* Release Notes */}
        {app.releaseNotes && (
          <section className="release-notes">
            <div className="release-version">
              <span className="version-badge">バージョン {app.version}</span>
              <span className="release-date">
                {formatDate(app.currentVersionReleaseDate)}
              </span>
            </div>
            <h2 className="section-title">新機能</h2>
            <p className="release-text">{app.releaseNotes}</p>
          </section>
        )}
        
        {/* Information Grid */}
        <section className="info-grid">
          <div className="info-item">
            <span className="info-label">サイズ</span>
            <span className="info-value">{formatFileSize(app.fileSizeBytes)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">互換性</span>
            <span className="info-value">iOS {app.minimumOsVersion} 以降</span>
          </div>
          <div className="info-item">
            <span className="info-label">言語</span>
            <span className="info-value">
              {formatLanguages(app.languageCodesISO2A)}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">リリース日</span>
            <span className="info-value">{formatDate(app.releaseDate)}</span>
          </div>
          {app.userRatingCount !== undefined && app.userRatingCount > 0 && (
            <div className="info-item">
              <span className="info-label">評価件数</span>
              <span className="info-value">
                {app.userRatingCount.toLocaleString()}件
              </span>
            </div>
          )}
        </section>
        
        {/* Links */}
        <section className="links-section">
          <Link 
            href={`/app/${app.trackId}/privacy-policy`}
            className="link-button"
          >
            プライバシーポリシー
          </Link>
          <Link 
            href={`/app/${app.trackId}/terms`}
            className="link-button"
          >
            利用規約
          </Link>
        </section>
      </div>
    </div>
  );
}
