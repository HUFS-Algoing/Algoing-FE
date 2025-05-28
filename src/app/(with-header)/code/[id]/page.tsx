import CodeEditor from "@/app/(with-header)/code/components/code/CodeEditor";
import CodeHeader from "@/app/(with-header)/code/components/code/CodeHeader";
import Footer from "@/app/(with-header)/code/components/code/Footer";

export default function Code() {
  return (
    <div className="flex flex-col h-screen relative">
      <CodeHeader />

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-2/5 py-6 border-r overflow-y-auto px-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">숫자 카드</h2>
            <p>
              숫자 카드는 정수 하나가 적혀져 있는 카드이다. 상근이는 숫자 카드
              N개를 가지고 있다. 정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자
              카드를 상근이가 가지고 있는지 아닌지를 구하는 프로그램을
              작성하시오.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">입력</h2>
            <p className="mb-2">
              첫째 줄에 상근이가 가지고 있는 숫자 카드의 개수 N(1 ≤ N ≤
              500,000)이 주어진다. 둘째 줄에는 숫자 카드에 적혀있는 정수가
              주어진다. 숫자 카드에 적혀있는 수는 -10,000,000보다 크거나 같고,
              10,000,000보다 작거나 같다. 두 숫자 카드에 같은 수가 적혀있는
              경우는 없다.
            </p>
            <p>
              셋째 줄에는 M(1 ≤ M ≤ 500,000)이 주어진다. 넷째 줄에는 상근이가
              가지고 있는 숫자 카드인지 아닌지를 구해야 할 M개의 정수가
              주어지며, 이 수는 공백으로 구분되어져 있다. 이 수도
              -10,000,000보다 크거나 같고, 10,000,000보다 작거나 같다.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">출력</h2>
            <p className="mb-2">
              첫째 줄에 입력으로 주어진 M개의 수에 대해서, 각 수가 적힌 숫자
              카드를 상근이가 가지고 있으면 1을, 아니면 0을 공백으로 구분해
              출력한다.
            </p>
          </div>
        </aside>

        <main className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex-1 p-4">
            <div className="flex justify-between items-center mb-2">
              <select className="border rounded px-2 py-1">
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++</option>
              </select>

              <div className="flex gap-2">
                <button>코드 초기화</button>
                <button>다크 모드</button>
              </div>
            </div>

            <div className="border rounded">
              <CodeEditor />
            </div>
          </div>

          <div className="border-t">
            <button className="h-[60px] border border-1 border-neutral-800 text-black px-4 py-2 rounded">
              실행 결과
            </button>

            <div className="h-60 border rounded p-2">
              <p>...</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
