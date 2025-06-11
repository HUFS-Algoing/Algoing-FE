"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useInsertBOJ } from "@/app/hook/login/use-insertBoj";
import { Loader2 } from "lucide-react";

export default function ProfileForm() {
  const [baekjoonId, setBaekjoonId] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { mutate: submitBOJ, isPending } = useInsertBOJ({
    onSuccess: () => {
      alert("저장 완료!");
      router.push("/main");
    },
    onError: () => {
      alert("저장 실패! 다시 입력해주세요");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 animate-fade-in mb-2">
          프로필 설정
        </h2>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8">
          알고잉 서비스를 시작하기 위해 정보를 입력해주세요
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            백준 아이디
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={20}
              value={baekjoonId}
              onChange={(e) => setBaekjoonId(e.target.value)}
              placeholder="baekjoon123"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500">
              {baekjoonId.length}/20
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            비밀번호
          </label>
          <div className="relative">
            <input
              type="password"
              maxLength={16}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500">
              {password.length}/16
            </span>
          </div>
        </div>

        <button
          onClick={() =>
            submitBOJ({
              bojId: baekjoonId,
              bojPassword: password,
            })
          }
          disabled={isPending}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition active:scale-95 disabled:opacity-50 flex items-center justify-center"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {isPending ? "저장 중..." : "저장하기"}
        </button>
      </div>
    </div>
  );
}
