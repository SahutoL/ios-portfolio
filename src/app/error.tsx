"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="container">
      <div className="not-found">
        <div className="not-found-icon" style={{ fontSize: "48px" }}>⚠️</div>
        <h1 className="not-found-title">エラーが発生しました</h1>
        <p className="not-found-text">
          申し訳ございません。問題が発生しました。<br />
          しばらくしてから再度お試しください。
        </p>
        <button
          onClick={reset}
          className="link-button link-button-primary"
          style={{ cursor: "pointer", border: "none" }}
        >
          再試行
        </button>
      </div>
    </div>
  );
}
