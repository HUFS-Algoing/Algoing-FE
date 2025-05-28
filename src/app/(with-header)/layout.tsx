import Header from "../_components/Header";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Header />
      <body className="pt-[72px]">{children}</body>
    </html>
  );
}
