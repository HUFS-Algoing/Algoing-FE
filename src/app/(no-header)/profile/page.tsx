// app/(no-header)/profile/page.tsx
"use client";

import { useState, ChangeEvent } from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";
import { useInsertBOJ } from "@/app/hook/login/use-insertBoj";

export default function ProfileForm() {
  const [baekjoonId, setBaekjoonId] = useState("");
  const [password, setPassword] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [, setImageFile] = useState<File | null>(null);

  const router = useRouter();

  const { mutate: submitBOJ, isPending } = useInsertBOJ({
    onSuccess: () => {
      alert("저장 완료!");
      router.push("/main");
    },
    onError: () => {
      alert("저장 실패");
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f5f6ff] to-[#eaefff] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-2">
          프로필 정보를 입력해주세요
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          알고잉 서비스를 이용하기 위해 필요해요
        </p>

        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-4xl text-gray-400">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="프로필 미리보기"
                className="w-full h-full object-cover"
              />
            ) : (
              "👤"
            )}
          </div>
          <label
            htmlFor="profileImage"
            className="mt-2 text-sm text-blue-600 hover:underline cursor-pointer"
          >
            사진 변경하기 (선택)
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* 백준 아이디 */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            백준 아이디
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={20}
              value={baekjoonId}
              onChange={(e) => setBaekjoonId(e.target.value)}
              placeholder="백준 아이디를 입력해주세요"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
              {baekjoonId.length}/20
            </span>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">비밀번호</label>
          <div className="relative">
            <input
              type="password"
              maxLength={16}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
              {password.length}/16
            </span>
          </div>
        </div>

        {/* 저장 버튼 */}
        <button
          onClick={() =>
            submitBOJ({
              bojId: baekjoonId,
              bojPassword: password,
            })
          }
          disabled={isPending}
        >
          {isPending ? "저장 중..." : "저장하기"}
        </button>
      </div>
    </div>
  );
}
