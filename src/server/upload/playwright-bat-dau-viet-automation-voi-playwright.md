Thông thường, với các bạn QA sẽ hay sử dụng một số framework như Selenium để viết code auto. Tuy nhiên, sẽ hơi khó để tiếp cận nếu chưa từng làm qua Java. Với playwright, mọi thứ sẽ rất đơn giản vì tính phổ biết của NodeJS.

# Playwright là gì?
Playwright được tạo ra để đáp ứng như cầu của end-to-end testing. Nó thực hiện được các mong muốn của người viết automation như:
- Chạy thử nghiệm trên tất cả các trình duyệt.
- Chạy song song các test cases
- Quay video, chụp ảnh màn hình
- Có thể mở rộng thông qua fixture

# Cài đặt Playwright
## Cài đặt NodeJS
Để sử dụng, bạn cần cài đặt NodeJS trước khi bắt đầu. Tùy hệ điều hành mà bạn có thể cài đặt NodeJS [từ đây](https://nodejs.org/en/).

## Cài đặt Playwright
### Sử dụng command init

```
# Run from your project's root directory
npm init playwright@latest
# Or create a new project
npm init playwright@latest new-project
```

### Tự cài đặt từ đầu
```
npm i -D @playwright/test
# install supported browsers
npx playwright install
```



# Viết một ví dụ cơ bản sử dụng Playwright
Mình sẽ lấy ví dụ đơn giản nhất là kiểm tra khi vào trang playwright.dev có xuất hiện từ Playwright ở title không?

### Bước đầu tiên
Tạo một file tests/example.spec.js hoặc tests/example.spec.ts. Ở đây bạn có thể tùy ý sử dụng JS hoặc Typescript. Bạn sẽ không cần phải có config riêng của Typescript.

```ts
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});
```

Chúng ta có thể hiểu đoạn code hoạt động như sau:
- Định nghĩa một test case. Có tên là basic test
- Truy cập vào trang playwright.dev
- Tìm đến selector .navbar__inner .navbar__title. Kiểm tra xem selector đấy có chứa text là Playwright hay không.

### Bước tiếp theo
Chạy test, mặc định playwright sẽ tìm đến thư mục tests để chạy qua các files test có trong đó.

```sh
npx playwright test
```

Khi chạy command, bạn sẽ thấy kết quả của test ở command line.

# Tạm kết
Chỉ với một vài command và một file test cơ bản. Bạn đã có thể bắt đầu với Playwright nói riêng, Automation test nói chung. Ở các bài tiếp theo, mình sẽ hướng dẫn các bạn viết test cho API và các kiến thức nâng cao hơn.