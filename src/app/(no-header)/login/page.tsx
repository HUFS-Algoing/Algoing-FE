"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState(1); // 1: 아래로, -1: 위로

  const handleGoogleLogin = () => {
    const GOOGLE_LOGIN_URL = `https://api.al-going.com/oauth2/authorization/google`;
    window.location.href = GOOGLE_LOGIN_URL;
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      setIsScrolling(true);

      if (e.deltaY > 0 && currentSlide < slides.length - 1) {
        setDirection(1);
        setCurrentSlide((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentSlide > 0) {
        setDirection(-1);
        setCurrentSlide((prev) => prev - 1);
      }

      setTimeout(() => setIsScrolling(false), 800);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && currentSlide < slides.length - 1) {
        setDirection(1);
        setCurrentSlide((prev) => prev + 1);
      } else if (e.key === "ArrowUp" && currentSlide > 0) {
        setDirection(-1);
        setCurrentSlide((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide, isScrolling]);

  const slides = [
    {
      id: 0,
      content: (
        <div className="min-h-screen flex flex-row justify-center items-center bg-gradient-to-br from-indigo-100 to-white text-black px-4">
          <div className="flex-1 text-center space-y-4 max-w-lg">
            <div className="flex items-center justify-center space-x-2">
              <Image
                src="/img/Logo.svg"
                alt="algoing"
                width={100}
                height={100}
                className="w-52 drop-shadow-md"
              />
              <span className="text-3xl font-semibold">으로,</span>
            </div>
            <h1 className="text-3xl font-semibold">코딩테스트 학습하기</h1>
            <p className="text-gray-600 text-base">
              매일매일 하루에 3문제 챌린지에 도전
              <br />
              지금 바로 시작하세요
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center mt-8 md:mt-0 space-y-6">
            <button
              onClick={handleGoogleLogin}
              className="group relative w-full max-w-md h-14 bg-white border-2 border-gray-200 text-gray-700 flex items-center justify-center gap-3 rounded-xl font-medium text-base transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
            >
              <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <Image
                  src="/assets/icons/logo-google.svg"
                  width={18}
                  height={18}
                  alt="Google"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                구글로 시작하기
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>

            <p className="text-xs text-gray-600 text-center max-w-sm">
              로그인하면 알고잉의{" "}
              <span className="text-purple-600 hover:underline cursor-pointer">
                이용약관
              </span>
              과{" "}
              <span className="text-purple-600 hover:underline cursor-pointer">
                개인정보처리방침
              </span>
              에 동의하게 됩니다.
            </p>
          </div>
        </div>
      ),
    },
    // 나머지 슬라이드는 기존과 동일하므로 생략
  ];

  return (
    <div className="relative overflow-hidden h-screen">
      <motion.div
        key={currentSlide}
        initial={{ y: direction > 0 ? "100%" : "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full h-full"
      >
        {slides[currentSlide].content}
      </motion.div>

      {currentSlide === 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="flex flex-col items-center text-gray-500">
            <span className="text-sm mb-2">스크롤해서 더 알아보기</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
