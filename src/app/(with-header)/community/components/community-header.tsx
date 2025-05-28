"use client";

import type { FC } from "react";
import { Edit } from "lucide-react";
import { motion } from "framer-motion";

interface CommunityHeaderProps {
  onNewPost: () => void;
  onMyPosts: () => void;
}

const CommunityHeader: FC<CommunityHeaderProps> = ({
  onNewPost,
  onMyPosts,
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            코드리뷰 커뮤니티
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            코딩 문제 해결에 대한 질문과 코드 리뷰를 요청하고 다른 개발자들과
            함께 성장하세요. 서로의 코드를 리뷰하며 더 나은 개발자가 되어보세요.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onMyPosts}
          >
            내가 쓴 글
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onNewPost}
          >
            <Edit className="mr-2 h-4 w-4" />새 글 작성
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
