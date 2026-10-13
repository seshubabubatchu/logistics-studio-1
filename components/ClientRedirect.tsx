"use client";

import { useEffect } from "react";

export default function ClientRedirect({ to }: { to: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const targetUrl = `${basePath}/${to}`;

  useEffect(() => {
    window.location.replace(targetUrl);
  }, [targetUrl]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <meta httpEquiv="refresh" content={`0;url=${targetUrl}`} />
      <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
        Redirecting to{" "}
        <a href={targetUrl} style={{ color: "var(--brand-blue)", textDecoration: "underline" }}>
          {targetUrl}
        </a>
        ...
      </p>
    </div>
  );
}
