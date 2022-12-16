Playwright có thể được sử dụng để test REST API cho ứng dụng của bạn.

# Viết API Test
Để thực hiện ví dụ này. Chúng ta sẽ sử dụng mock api [tại đây](https://gorest.co.in/). Công việc của chúng ta sẽ bao gồm.
- Thêm một user mới
- Lấy danh sách users
- Xóa một user

## Config
Thông thường, với REST API chúng ta sẽ có một Base URL sử dụng chung cho các endpoints khác nhau. Ngoài ra thông thường với mỗi API đều sử dụng JWT để xác thực và chúng thường được gửi lên theo header.

```ts
// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const accessToken = 'd0c3893a5ece5088da7cc59b8428e9aa1e04bee496e35ca70387a567004fa4fa';

const config: PlaywrightTestConfig = {
  use: {
    // All requests we send go to this API endpoint.
    baseURL: 'https://gorest.co.in/public/v2',
    extraHTTPHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
};

export default config;
```

## Viết Test
Bây giờ chúng ta sẽ tạo file tests/api.spec.ts để bắt đầu.

```ts
test('should create a user', async ({ request }) => {
  const newUser = await request.post(`/users`, {
    data: {
      email: 'demo+1@gmail.com',
      name: 'Demo',
      gender: 'male',
      status: 'active',
    },
  });
  expect(newUser.ok()).toBeTruthy();
});

test('should get a list users requests', async ({ request }) => {
  const issues = await request.get(`/users`);
  expect(issues.ok()).toBeTruthy();
});
```

## Setup and teardown
Chúng ta có thể setup sau khi test xong mỗi test case. Sẽ thực hiện clear data để tránh tình trạng có quá nhiều data rác.
```ts
test.afterAll(async ({ request }) => {
  // Delete a user
  const response = await request.delete(`/users/13769?access-token=${accessToken}`);
  expect(response.ok()).toBeTruthy();
});
```

# Tạm kết
Như vậy, chúng ta đã đi qua các ví dụ để có thể tương tác với REST API. Ở các bài tiếp theo, chúng ta sẽ làm việc với các ví dụ phức tạp hơn.