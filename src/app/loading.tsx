export default function Loading() {
  return (
    <div className="container">
      <div className="not-found" style={{ minHeight: "40vh" }}>
        <div
          style={{
            width: 32,
            height: 32,
            border: "3px solid var(--color-divider)",
            borderTopColor: "var(--color-accent)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
