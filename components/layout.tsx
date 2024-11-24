// app/layout.tsx
import "./globals.css";
import { Providers } from "../app/Providers";
import SessionGuard from "@/components/SessionGuard";

// ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SessionGuard>{children}</SessionGuard>
        </Providers>
      </body>
    </html>
  );
}
