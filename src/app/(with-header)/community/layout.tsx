import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "코드리뷰 커뮤니티 | ALGⓄING",
  description:
    "코딩 문제 해결에 대한 질문과 코드 리뷰를 요청하고 다른 개발자들과 함께 성장하세요",
};

export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
