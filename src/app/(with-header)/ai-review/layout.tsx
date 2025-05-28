import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI 코드리뷰 | ALGⓄING",
  description:
    "AI가 당신의 코드를 분석하고 개선점을 제안합니다. 코드 품질, 성능, 보안 측면에서 전문적인 피드백을 받아보세요.",
}

export default function AIReviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
