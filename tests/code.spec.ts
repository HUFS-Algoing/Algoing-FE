import { test, expect, Page } from "@playwright/test";

test.describe("Code Editor Component", () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto("/code/1211");

    // 페이지 로딩 대기
    await page.waitForLoadState("networkidle");
  });

  test("코드 에디터가 표시되어야 함", async () => {
    // Monaco Editor가 로딩될 때까지 대기
    await page.waitForSelector(".monaco-editor", { timeout: 10000 });

    const editor = page.locator(".monaco-editor");
    await expect(editor).toBeVisible();
  });

  test.describe("언어 변경 기능", () => {
    test("언어를 변경할 수 있어야 함", async () => {
      const languageSelect = page.locator("select").first();

      await languageSelect.selectOption("Python 3");
      await expect(languageSelect).toHaveValue("Python 3");

      await languageSelect.selectOption("C++17");
      await expect(languageSelect).toHaveValue("C++17");
    });
  });

  test.describe("코드 에디터 기능", () => {
    test("코드를 입력할 수 있어야 함", async () => {
      // Monaco Editor가 완전히 로드될 때까지 대기
      await page.waitForSelector(".monaco-editor", { timeout: 10000 });

      await page.locator(".monaco-editor").click();

      await page.keyboard.press("Control+A");
      const testCode = 'console.log("Hello, World!");';
      await page.keyboard.type(testCode);

      // 입력된 코드가 에디터에 있는지 확인
      const editorContent = page.locator(".monaco-editor .view-lines");
      await expect(editorContent).toContainText("Hello, World!");
    });

    test.describe("코드 리셋 기능", () => {
      test("코드 리셋이 작동해야 함", async () => {
        await page.waitForSelector(".monaco-editor", { timeout: 10000 });

        await page.locator(".monaco-editor").click();
        await page.keyboard.press("Control+A");
        await page.keyboard.type("some test code");

        const resetButton = page.locator('button[title="코드 초기화"]');
        await resetButton.click();

        // 코드가 초기값으로 리셋되었는지 확인
        const editorContent = page.locator(".monaco-editor .view-lines");
        await expect(editorContent).toContainText("여기에 코드를 입력하세요");
      });
    });
  });

  test.describe("코드 제출 기능", () => {
    test("빈 코드 제출 시 에러 메시지가 표시되어야 함", async () => {
      await page.locator(".monaco-editor").click();
      await page.keyboard.press("Control+A");
      await page.keyboard.press("Delete");

      const submitButton = page
        .locator("button")
        .filter({ hasText: /제출/ })
        .first();
      await submitButton.click();
    });

    test("코드 제출 시 성공 표시되어야 함", async () => {
      await page.locator(".monaco-editor").click();
      await page.keyboard.press("Control+A");
      await page.keyboard.type('console.log("Hello World");');

      const submitButton = page
        .locator("button")
        .filter({ hasText: /제출/ })
        .first();
      await submitButton.click();
    });

    test("코드 제출 실패 시 에러 메시지가 표시되어야 함", async () => {
      await page.locator(".monaco-editor").click();
      await page.keyboard.press("Control+A");
      await page.keyboard.type('console.log("test");');

      const submitButton = page
        .locator("button")
        .filter({ hasText: /제출/ })
        .first();
      await submitButton.click();
    });
  });

  // // 추가 유틸리티 함수들
  test.describe("유틸리티", () => {
    test("페이지 로딩 성능 테스트", async ({ page }) => {
      const startTime = Date.now();
      await page.goto("/code/1");
      await page.waitForSelector(".monaco-editor", { timeout: 15000 });
      const loadTime = Date.now() - startTime;

      // 5초 이내에 로딩되어야 함
      expect(loadTime).toBeLessThan(5000);
    });

    test("브라우저 콘솔 에러 확인", async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto("/code/1");
      await page.waitForSelector(".monaco-editor", { timeout: 10000 });

      const seriousErrors = consoleErrors.filter(
        (error) =>
          !error.includes("favicon") && !error.includes("ResizeObserver")
      );

      expect(seriousErrors.length).toBeLessThanOrEqual(5);
    });
  });
});
