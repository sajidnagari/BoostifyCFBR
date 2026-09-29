import { CommentDetail } from '../../../features/comments/components/comment-detail';

export default async function CommentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CommentDetail commentId={id} />;
}