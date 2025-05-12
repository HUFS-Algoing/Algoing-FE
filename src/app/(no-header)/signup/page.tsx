'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호 확인 로직 등은 실제 프로젝트에서 검증 필요
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const formData = {
      email,
      password,
      name,
      nickname,
    };

    console.log('회원가입 데이터:', formData);
    // 서버 전송 로직 추가 가능
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-6xl flex justify-between items-center mb-10">
        <Image src="/img/algoing.png" alt="ALGOING" width={150} height={50} />
        <nav className="space-x-4">
          <a href="/login" className="text-sm font-medium text-indigo-600">로그인</a>
          <a href="/home" className="text-sm font-medium text-indigo-600">홈</a>
        </nav>
      </div>

      <main className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">비밀번호 (확인)</label>
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">닉네임</label>
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition duration-300"
            >
              가입하기
            </button>
          </div>
        </form>
      </main>

      <footer className="mt-10 text-sm text-gray-500">
        © 2025 ALGOING. All rights reserved.
      </footer>
    </div>
  );
}