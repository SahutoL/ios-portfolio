import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllApps, formatRating, formatPrice, getSiteConfig } from "@/lib/itunes";
import { StarRating } from "@/components/StarRating";

export const metadata: Metadata = {
  title: "アプリ一覧",
  description: "公開中のiOSアプリ一覧",
};

// ISRで週次更新（604800秒 = 1週間）
export const revalidate = 604800;

export default async function AppsPage() {
  const apps = await getAllApps();
  const config = getSiteConfig();
  
  return (
    <div className="container">
      <header className="page-header">
        <h1 className="page-title">Apps</h1>
        <p className="page-subtitle">
          {config.developer.name}が開発・公開しているiOSアプリ
        </p>
      </header>
      
      {apps.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📱</div>
          <h2 className="empty-state-title">アプリがありません</h2>
          <p className="empty-state-text">
            現在公開中のアプリはありません
          </p>
        </div>
      ) : (
        <section className="app-grid" style={{ paddingBottom: "var(--space-16)" }}>
          {apps.map((app) => (
            <Link 
              key={app.trackId} 
              href={`/app/${app.trackId}`}
              className="app-card"
            >
              <div className="app-card-header">
                <Image
                  src={app.artworkUrl100}
                  alt={`${app.trackName} アイコン`}
                  width={64}
                  height={64}
                  className="app-icon"
                  unoptimized
                />
                <div className="app-card-info">
                  <h2 className="app-name">{app.trackName}</h2>
                  <p className="app-developer">{app.artistName}</p>
                </div>
              </div>
              
              <p className="app-description">{app.description}</p>
              
              {app.averageUserRating !== undefined && app.averageUserRating > 0 && (
                <div className="app-rating">
                  <StarRating rating={app.averageUserRating} />
                  <span>{formatRating(app.averageUserRating)}</span>
                  {app.userRatingCount !== undefined && app.userRatingCount > 0 && (
                    <span>({app.userRatingCount.toLocaleString()}件)</span>
                  )}
                </div>
              )}
              
              <div className="app-card-badges">
                <span className="badge badge-category">{app.primaryGenreName}</span>
                <span className="badge badge-price">{formatPrice(app.price, app.formattedPrice)}</span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
