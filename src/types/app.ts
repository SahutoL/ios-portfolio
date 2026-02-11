/**
 * iTunes Lookup API のレスポンス型定義
 */
export interface iTunesLookupResponse {
  resultCount: number;
  results: iTunesApp[];
}

export interface iTunesApp {
  // 基本情報
  trackId: number;
  trackName: string;
  bundleId: string;
  
  // 開発者情報
  artistId: number;
  artistName: string;
  artistViewUrl?: string;
  sellerName?: string;
  
  // カテゴリ
  primaryGenreName: string;
  primaryGenreId: number;
  genres: string[];
  genreIds: string[];
  
  // 説明・リリースノート
  description: string;
  releaseNotes?: string;
  
  // バージョン情報
  version: string;
  currentVersionReleaseDate: string;
  releaseDate: string;
  
  // 評価
  averageUserRating?: number;
  userRatingCount?: number;
  averageUserRatingForCurrentVersion?: number;
  userRatingCountForCurrentVersion?: number;
  
  // 価格
  price: number;
  currency: string;
  formattedPrice: string;
  
  // 画像
  artworkUrl60: string;
  artworkUrl100: string;
  artworkUrl512: string;
  screenshotUrls: string[];
  ipadScreenshotUrls?: string[];
  
  // 技術情報
  fileSizeBytes: string;
  minimumOsVersion: string;
  supportedDevices: string[];
  languageCodesISO2A: string[];
  
  // 年齢制限
  contentAdvisoryRating: string;
  trackContentRating: string;
  
  // URL
  trackViewUrl: string;
  
  // その他
  isGameCenterEnabled?: boolean;
  features?: string[];
}

/**
 * アプリ設定型
 */
export interface AppConfig {
  appId: string;
  appName: string;
  privacyPolicy: string;
  terms: string;
}

/**
 * 開発者設定型
 */
export interface DeveloperConfig {
  name: string;
  website: string;
}

/**
 * 特定商取引法表示情報
 */
export interface TokushohoConfig {
  businessName: string;
  representative: string;
  address: string;
  phone: string;
  email: string;
  price: string;
  additionalCost: string;
  paymentTiming: string;
  paymentMethod: string;
  deliveryTiming: string;
  returnPolicy: string;
}

/**
 * 全体設定型
 */
export interface SiteConfig {
  apps: AppConfig[];
  revalidateSeconds: number;
  developer: DeveloperConfig;
  tokushoho: TokushohoConfig;
}

/**
 * 表示用に加工されたアプリ情報
 */
export interface AppInfo extends iTunesApp {
  privacyPolicy: string;
  terms: string;
}
