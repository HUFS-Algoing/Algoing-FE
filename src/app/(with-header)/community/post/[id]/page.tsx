import CodeReviewDetail from "../../components/code-reivew-detail";

export default function CodeReviewDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <CodeReviewDetail postId={params.id} />;
}
