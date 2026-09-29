import { CommentGenerator } from '../../features/generation/components/comment-generator';

export default async function GeneratePage({ searchParams }: { searchParams: Promise<{ postId?: string; commentId?: string }> }) {
  const params = await searchParams;
  return <CommentGenerator postId={params.postId} commentId={params.commentId} />;
}