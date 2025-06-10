"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
export default function LoginPage() {
  const handleGoogleLogin = () => {
    const GOOGLE_LOGIN_URL = `https://api.al-going.com/oauth2/authorization/google`;
    window.location.href = GOOGLE_LOGIN_URL;
  };
  //TODO: 스크롤 이벤트 추가
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-100">
      <section className="min-h-screen flex flex-col lg:flex-row justify-center items-center px-4 py-8">
        <div className="flex-1 max-w-2xl space-y-8 text-center lg:text-left">
          <div className="space-y-6 mr-24">
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

            <div className="space-y-4 text-center justify-center">
              <h1 className="text-3xl lg:text-3xl font-bold text-slate-900 leading-tight">
                코딩테스트 준비,
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  이제 쉽고 재미있게
                </span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                매일 3문제씩 체계적으로 학습하고,
                <br />
                실력을 단계별로 향상시켜보세요
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md w-full mt-8 lg:mt-0">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">시작하기</h2>
                <p className="text-slate-600">모든 기능을 체험해보세요</p>
              </div>

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
                로그인하면{" "}
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
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-300">
          <div className="flex flex-col items-center text-slate-800">
            <span className="text-md mb-2">스크롤해서 더 알아보기</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* 두 번째 섹션 - 실시간 문제 추천 */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-12 section-content">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 max-w-xl space-y-6 order-2 lg:order-1 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                경험 기반 문제 추천
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  맞춤형 학습 경험
                </span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                AI가 분석한 당신의 실력에 맞는 문제를 추천하고,
                <br />
                실력을 올릴 수 있는 문제를 제공해줍니다.
              </p>
            </div>

            <div className="flex-1 max-w-lg order-1 lg:order-2 mb-8 lg:mb-0">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 transform transition-all duration-500 hover:scale-105">
                <Image
                  src="/img/section.png"
                  alt="문제 추천 시스템"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 세 번째 섹션 - 실시간 코�� 실행과 힌트 */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-12 section-content">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 max-w-lg mb-8 lg:mb-0">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 transform transition-all duration-500 hover:scale-105">
                <Image
                  src="/img/section.png"
                  alt="코드 실행 환경"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>

            <div className="flex-1 max-w-xl space-y-6 text-center lg:text-left ml-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                실시간 코드 실행과
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  스마트 힌트 시스템
                </span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                브라우저에서 바로 코드를 작성하고 실행해보세요.
                <br />
                막힐 때마다 단계별 힌트를 제공받아 스스로 문제를 해결할 수
                있어요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 네 번째 섹션 - 코드 품질 분석 */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-12 section-content">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 max-w-xl space-y-6 order-2 lg:order-1 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                코드 품질 분석과
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  상세한 통계 제공
                </span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                작성한 코드의 품질을 자동으로 분석하고,
                <br />
                개선점과 최적화 방법을 상세한 통계로 제공합니다.
              </p>
            </div>

            <div className="flex-1 max-w-lg order-1 lg:order-2 mb-8 lg:mb-0">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 transform transition-all duration-500 hover:scale-105">
                <Image
                  src="/img/section.png"
                  alt="코드 품질 분석 차트"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 다섯 번째 섹션 - 학습 관리 */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-12 section-content">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 max-w-lg mb-8 lg:mb-0">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 transform transition-all duration-500 hover:scale-105">
                <Image
                  src="/img/section.png"
                  alt="학습 진도 관리"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>

            <div className="flex-1 max-w-xl space-y-6 text-center lg:text-left ml-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                체계적인 학습 관리와
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  상세한 진도 추적
                </span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                학습 진도를 시각적으로 확인하고,
                <br />
                부족한 부분을 집중적으로 보완하세요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
