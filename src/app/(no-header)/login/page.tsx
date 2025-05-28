'use client';

import React, { useEffect, useState } from 'react';

const USER = {
  email: 'abc@gmail.com',
  pw: '12341234',
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const regex = /\S+@\S+\.\S+/;
    setEmailValid(regex.test(value));
  };

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPw(value);
    const regex = /^.{4,}$/;
    setPwValid(regex.test(value));
  };

  const onClickConfirmButton = () => {
    if (email === USER.email && pw === USER.pw) {
      alert('로그인에 성공했습니다.');
    } else {
      alert('등록되지 않은 회원이거나 입력한 값이 일치하지 않습니다.');
    }
  };

  useEffect(() => {
    setNotAllow(!(emailValid && pwValid));
  }, [emailValid, pwValid]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-around items-center bg-gradient-to-br from-indigo-100 to-white text-black px-4">
      <div className="text-center space-y-4 md:w-1/">
    <div className="flex items-center justify-center space-x-2">
      <img
        src="/img/algoing.png"
        alt="algoing"
        className="w-40 drop-shadow-md"
      />
      <span className="text-3xl font-semibold">으로,</span>
    </div>
    <h1 className="text-3xl font-semibold">코딩테스트 학습하기</h1>
    <p className="text-gray-600 text-base">
      '매일매일' 하루에 문제 챌린지에 도전
      <br />
      지금 바로 시작하세요
    </p>
  </div>


      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl mt-10 md:mt-0 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">로그인</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">이메일</label>
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleEmail}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={handlePw}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClickConfirmButton}
            disabled={notAllow}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 text-white ${
              notAllow
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
          >
            로그인
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-3 text-sm text-gray-500 font-semibold">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <div className="text-center">
          <button className="w-full py-3 bg-[#13134D] text-white rounded-lg font-medium hover:bg-[#1f1f6b]">
            Solved.ac 계정 로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}
