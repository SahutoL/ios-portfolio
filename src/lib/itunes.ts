import { iTunesApp, iTunesLookupResponse, AppInfo, SiteConfig, AppConfig } from '@/types/app';
import config from '@/config/apps.json';

const siteConfig = config as SiteConfig;

/**
 * iTunes Lookup APIからアプリ情報を取得
 * @param appId App Store アプリID
 * @param country 国コード (デフォルト: jp)
 */
export async function fetchAppFromiTunes(appId: string, country: string = 'jp'): Promise<iTunesApp | null> {
  try {
    const url = `https://itunes.apple.com/lookup?id=${appId}&country=${country}&entity=software`;
    const response = await fetch(url, {
      next: { revalidate: siteConfig.revalidateSeconds }
    });
    
    if (!response.ok) {
      console.error(`iTunes API error: ${response.status}`);
      return null;
    }
    
    const data: iTunesLookupResponse = await response.json();
    
    if (data.resultCount === 0 || !data.results[0]) {
      console.error(`App not found: ${appId}`);
      return null;
    }
    
    return data.results[0];
  } catch (error) {
    console.error('Failed to fetch from iTunes API:', error);
    return null;
  }
}

/**
 * 複数のアプリ情報を一括取得
 * @param appIds アプリIDの配列
 */
export async function fetchAppsFromiTunes(appIds: string[]): Promise<(iTunesApp | null)[]> {
  return Promise.all(appIds.map(id => fetchAppFromiTunes(id)));
}

/**
 * 設定ファイルからアプリ設定を取得
 * @param appId アプリID
 */
export function getAppConfig(appId: string): AppConfig | undefined {
  return siteConfig.apps.find(app => app.appId === appId);
}

/**
 * アプリ情報と設定を統合して取得
 * iTunes APIからデータを取得し、AppInfo（= iTunesApp）を返す
 * @param appId アプリID
 */
export async function getAppInfo(appId: string): Promise<AppInfo | null> {
  const appConfig = getAppConfig(appId);
  if (!appConfig) {
    return null;
  }
  
  const iTunesApp = await fetchAppFromiTunes(appId);
  if (!iTunesApp) {
    return null;
  }
  
  return { ...iTunesApp };
}

/**
 * apps.jsonに登録されているアプリ名を取得
 * iTunes API未公開時のフォールバック表示用
 * @param appId アプリID
 */
export function getAppName(appId: string): string | null {
  const appConfig = getAppConfig(appId);
  return appConfig?.appName ?? null;
}

/**
 * アプリがapps.jsonに登録されているか確認
 */
export function isRegisteredApp(appId: string): boolean {
  return siteConfig.apps.some(app => app.appId === appId);
}

/**
 * 全ての登録済みアプリ情報を取得
 */
export async function getAllApps(): Promise<AppInfo[]> {
  const appIds = siteConfig.apps.map(app => app.appId);
  const results = await Promise.all(appIds.map(id => getAppInfo(id)));
  return results.filter((app): app is AppInfo => app !== null);
}

/**
 * 全てのアプリIDを取得（静的生成用）
 */
export function getAllAppIds(): string[] {
  return siteConfig.apps.map(app => app.appId);
}

/**
 * サイト設定を取得
 */
export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

/**
 * 評価を星表示用に変換
 */
export function formatRating(rating?: number): string {
  if (!rating) return '—';
  return rating.toFixed(1);
}

/**
 * ファイルサイズをフォーマット
 */
export function formatFileSize(bytes: string): string {
  const size = parseInt(bytes, 10);
  if (isNaN(size)) return '—';
  
  if (size >= 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (size >= 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }
  return `${size} B`;
}

/**
 * 日付をフォーマット
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * 言語コードをローカライズされた名前に変換
 */
export function formatLanguages(codes: string[]): string {
  const languageNames = new Intl.DisplayNames(['ja'], { type: 'language' });
  return codes
    .slice(0, 5)
    .map(code => {
      try {
        return languageNames.of(code.toLowerCase()) || code;
      } catch {
        return code;
      }
    })
    .join('、') + (codes.length > 5 ? ` 他${codes.length - 5}言語` : '');
}

/**
 * 価格をフォーマット（無料アプリは「無料」と表示）
 */
export function formatPrice(price: number, formattedPrice: string): string {
  if (price === 0) {
    return '無料';
  }
  if (!formattedPrice || formattedPrice === '0' || formattedPrice === '¥0') {
    return '無料';
  }
  return formattedPrice;
}
