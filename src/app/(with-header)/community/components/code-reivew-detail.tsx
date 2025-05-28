"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  User,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  Check,
} from "lucide-react";
import CodeEditor from "./code-editor";
import CommentEditor from "./comment-editor";

interface CodeReviewDetailProps {
  postId: string;
}

interface Comment {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  code?: string;
  timestamp: string;
  isAuthor?: boolean;
  approvals?: {
    user: string;
    userImage: string;
    timestamp: string;
  }[];
}

export default function CodeReviewDetail({ postId }: CodeReviewDetailProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const commentRef = useRef<HTMLDivElement>(null);

  // Mock data for the post
  const post = {
    id: postId,
    title: "이거 코드개선점 코드리뷰 부탁드립니다~~",
    author: "coder123",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "2025.03.05",
    code: `module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  
  if (req.query.name || (req.body && req.body.name)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "Hello " + (req.query.name || req.body.name)
    };
  }
  else {
    context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    };
  }
};`,
    tags: ["JavaScript", "Azure Functions", "HTTP Trigger"],
    views: 432,
    comments: 5,
    likes: likeCount,
  };

  // Mock data for comments
  const comments: Comment[] = [
    {
      id: 1,
      author: "nickname123",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "p4: result1 이런 부분에서 논리 및 연 결이상노 것 같습니다.\n각 사나리오별로 테스트 케이스를 별도로 만들고 테스트 어떨까 다 상세하게 뭐만 어떻게하죠?",
      code: `if (req.query.name || (req.body && req.body.name)) {
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "Hello " + (req.query.name || req.body.name)
  };
}`,
      timestamp: "2025.03.05 14:32",
      isAuthor: true,
    },
    {
      id: 2,
      author: "nickname123",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "p4: result1 이런 부분에서 논리 및 연 결이상노 것 같습니다.\n각 사나리오별로 테스트 케이스를 별도로 만들고 테스트 어떨까 다 상세하게 뭐만 어떻게하죠?",
      code: `if (req.query.name || (req.body && req.body.name)) {
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "Hello " + (req.query.name || req.body.name)
  };
}`,
      timestamp: "2025.03.05 14:45",
      isAuthor: true,
      approvals: [
        {
          user: "jlamb",
          userImage: "/placeholder.svg?height=40&width=40",
          timestamp: "3 minutes ago",
        },
      ],
    },
  ];

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const scrollToComment = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">
                홈
              </Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li>
              <Link href="/community" className="hover:text-gray-700">
                커뮤니티
              </Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li className="text-gray-900 font-medium truncate max-w-xs">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Post Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={post.authorImage || "/placeholder.svg"}
                    alt={post.author}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {post.author}
                  </p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 text-sm ${
                    liked
                      ? "text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <ThumbsUp
                    className={`h-5 w-5 ${liked ? "fill-indigo-600 text-indigo-600" : ""}`}
                  />
                  <span>{likeCount}</span>
                </button>
                <button
                  onClick={scrollToComment}
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={handleBookmark}
                  className={`flex items-center space-x-1 text-sm ${
                    bookmarked
                      ? "text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Bookmark
                    className={`h-5 w-5 ${bookmarked ? "fill-indigo-600 text-indigo-600" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Code Block */}
            <div className="mb-6">
              <CodeEditor code={post.code} language="javascript" />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              댓글 {post.comments}
            </h2>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex">
                    {/* Left sidebar with user image */}
                    <div className="mr-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={comment.authorImage || "/placeholder.svg"}
                          alt={comment.author}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Comment content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 mr-2">
                            {comment.author}
                          </span>
                          {comment.isAuthor && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                              작성자
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {comment.timestamp}
                        </span>
                      </div>

                      {comment.code && (
                        <CodeEditor
                          code={comment.code}
                          language="javascript"
                          className="mb-3"
                        />
                      )}

                      <p className="text-gray-700 whitespace-pre-line">
                        {comment.content}
                      </p>

                      {comment.approvals && comment.approvals.length > 0 && (
                        <div className="mt-3 flex items-center bg-green-50 p-2 rounded-md">
                          <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                            <Image
                              src={
                                comment.approvals[0].userImage ||
                                "/placeholder.svg"
                              }
                              alt={comment.approvals[0].user}
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex items-center text-sm text-green-700">
                            <Check className="h-4 w-4 mr-1" />
                            <span className="font-medium">
                              {comment.approvals[0].user}
                            </span>
                            <span className="mx-1">approved these changes</span>
                            <span className="text-green-600">
                              {comment.approvals[0].timestamp}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="mt-3 flex items-center space-x-4">
                        <button className="text-xs text-gray-500 hover:text-indigo-600">
                          답글
                        </button>
                        <button className="text-xs text-gray-500 hover:text-indigo-600">
                          좋아요
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comment Editor */}
        <div
          ref={commentRef}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start">
              <div className="mr-4">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-green-100 flex items-center justify-center">
                  <span className="text-green-700 font-bold">T</span>
                </div>
              </div>
              <div className="flex-1">
                <CommentEditor />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
