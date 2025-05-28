import Image from "next/image";
import ShareButton from "../../../../public/problem/Share.svg";
export default function CodeHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b  px-12">
      <div className="flex items-center gap-12 *: text-lg">
        <div className="flex items-center gap-4">
          <Image
            src="/problem/rank.png" // public 폴더 기준 경로
            alt="Rank Icon"
            width={24} // 원하는 크기
            height={24}
          />

          <div>#1</div>
        </div>
        <div className="flex items-center gap-6">
          {" "}
          <div>제출 내역</div>
          <div>코드리뷰</div>
        </div>{" "}
      </div>
      <div className="size-8">
        <Image
          src="/problem/Share.svg"
          alt="Share Icon"
          width={24}
          height={24}
          objectFit="contain"
        />
      </div>
    </header>
  );
}
