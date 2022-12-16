## Tạo một workflow với Github actions.

**cách 1:**  tạo ra file yml sau đó push lên thư mục .github/workflows/
Với cách này đơn giản là chúng ta tạo ra một file yml trong thư mục .github/workflows/ rồi push lên git
![](https://images.viblo.asia/7aa3cb97-57f1-4ddb-ba9e-16544f9c1b55.png)

**cách 2:** tạo một workflow theo các mẫu có sẵn

bước 1: vào git responsitory của bạn chọp tab Action

![](https://images.viblo.asia/8725e619-850f-4d6f-8c93-2e9927d000ae.png)

bước 2: chọn "Setup this workflow" git sẽ chọn flow default hoặc chọn một mẫu có sẵn trong danh sách git sẽ tạo ra file workflows theo những mẫu có sẵn.

![](https://images.viblo.asia/055db38c-6567-432d-9433-7db5f58ad8e6.png)

bước 3: update file yml theo ý muốn.

![](https://images.viblo.asia/a5c37eea-ec5a-4a40-8180-98c96db7f8de.png)

## Cấu trúc thông thường của một Github actions
đây là một file yml mình đang sử dụng để cấu hình một git action để tự động install, build và publish source vue native lên expo mỗi khi có một người push code lên branch develop.

1. khai báo

```
name:  Develop to Expo Pro2
```
2. sự kiện - trigger

```
on:
  push:
    branches:
      - develop
```
3. công việc - jobs

```
publish:
    name: Install and publish
    runs-on: ubuntu-latest
```
    
* setup enviroment
```
teps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - uses: expo/expo-github-action@v5
        with:
          expo-version: 3.x
          expo-username: ${{ secrets.EXPO_CLI_USERNAME }}
          expo-password: ${{ secrets.EXPO_CLI_PASSWORD }}
```
    
* actions
```
- run: npm install
      - run: expo publish --release-channel=pro2
      - uses: unsplash/comment-on-pr@master
        env:
          GITHUB_TOKEN: ${{ secrets.EXPO_CLI_GIT_TOKEN }}
        with:
          msg: App is ready for review, you can [see it here](https://expo.io/@bycedric/use-expo?release-channel=pro2.
```

## Setup secrets key
**Secrests key để làm gì?** có một số thông tin bảo mật các bạn không muốn public cho mọi người (kể cả những member trong dự án) biết: access token, password..... vậy các bạn cần một cơ chế để public một key ra ngoài để run time có thể access vào value được lưu trong setting của git. chúng ta có thể sử dụng Secrets key

### Tạo một secrets key

**bước 1:** Chuyển đến tab setting

![](https://images.viblo.asia/c6831b34-736c-4eb8-aeda-0a017c19ed6f.png)

**bước 2:** chọn sheet Secrets: ở đây hiển thị danh sách các secrets key trong responsitory

![](https://images.viblo.asia/2a159c3c-4a37-4342-be1a-a1c0b9a1dcf7.png)

**bước 3:** click "new repository secret" để tạo một secret key mới: nhập key và value

![](https://images.viblo.asia/988fa4b6-53bd-4ec7-89c9-f46fe009b3f8.png)

**bước 4:** xong thì add secret thôi nào

![](https://images.viblo.asia/e8b651ed-4e23-4583-a121-c6a9f2639129.png)

Có một đặt điểm là bạn không thể xem giá trị hiện tại của một secret key để tránh việc người khác có thể có được những thông tin bảo mật của bạn.