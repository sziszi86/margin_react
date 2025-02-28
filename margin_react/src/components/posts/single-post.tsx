import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Post típus definíciója (összhangban a PostList.tsx-szel)
interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  custom_fields?: { "at-expiration"?: string };
  better_featured_image?: {
    source_url: string;
    alt_text?: string;
    media_details?: {
      sizes?: { medium?: { source_url: string } };
      width: number;
      height: number;
      source_url?: string;
    };
  };
  categories?: { id: number; name: string }[];
  modified: string;
  slug: string;
}

type SinglePostProps = {
  postId: string;
};

const SinglePost = ({ postId }: SinglePostProps) => {
  const {
    isPending,
    error,
    data: post,
  } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const response = await axios.get(`/wp-json/wp/v2/posts/${postId}`, {
        withCredentials: true, // Hitelesítési sütik küldése
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    enabled: !!postId, // Csak akkor fut, ha postId nem üres
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (!post) return <p>Post not found</p>;

  return (
    <div className="prose max-w-none p-4">
      <h1
        className="text-3xl font-bold"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
};

const SinglePostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const validPostId = postId ?? ""; // Nullish coalescing: undefined/null esetén üres string

  return <SinglePost postId={validPostId} />;
};

export default SinglePostPage;
