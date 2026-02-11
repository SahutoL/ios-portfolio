import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="not-found">
        <div className="not-found-icon">404</div>
        <h1 className="not-found-title">ページが見つかりません</h1>
        <p className="not-found-text">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link href="/app" className="link-button link-button-primary">
          アプリ一覧に戻る
        </Link>
      </div>
    </div>
  );
}
