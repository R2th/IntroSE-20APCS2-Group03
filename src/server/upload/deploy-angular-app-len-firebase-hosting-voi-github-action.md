# 1. Chuẩn bị:
- 1 project angular đã kết nối với firebase trên github (có rất nhiều hướng dẫn cho việc này, bạn có thể tham khảo tại [đây](https://www.tiepphan.com/angular-trong-5-phut-deploy-angular-application-firebase-hosting/))
- Đã cài đặt firebase-tools ở máy. (` npm i -g firebase-tools`)

# 2. Thực hiện:
## 2.1. Tạo và cài đặt FIREBASE_TOKEN
Github action yêu cầu một FIREBASE_TOKEN để deploy Angular app lên firebase hosting. Vì vậy, hãy generate một token cho firebase CI, lưu ý rằng bạn phải cài đặt firebase tools trước đó nhé.

* `firebase login:ci`

Bạn sẽ thấy kết quả như sau
```
Waiting for authentication...

✔ Success! Use this token to login on a CI server:

1/A29..............y

Example: firebase deploy --token "\$FIREBASE_TOKEN"
```
Mở repo github, vào setting, chọn Secrets, và copy token vừa gen được (1/A29..............y) copy vào phần Value.
![](https://images.viblo.asia/9ba0d574-beca-477e-ab1a-e6f76496c303.png)

## 2.2. Tạo workflow trên github

Tại repo github của bạn, chọn vào phần Action
![](https://images.viblo.asia/241a56c4-8e2c-456d-92d1-6c400c247a6a.png)

Để tạo workflow đầu tiên, nhấp vào button **Set up a workflow yourself**

Bạn sẽ thấy rất nhiều mẫu sample action có sẵn. Chọn 1 cái và đổi lại tên thành main.yml và nội dung của file yaml như sau:

main.yml
```

name: CI

on:
  push:
    branches:
    - master
    - release/*

jobs:
  firebase-deploy:

    runs-on: ubuntu-latest

    steps:
     - uses: actions/checkout@master
     - uses: actions/setup-node@master
       with:
        node-version: '10.x'
     - run: npm install
     - run: npm run build --prod
     - uses: w9jds/firebase-action@master
       with:
         args: deploy --only hosting
       env:
         FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}

```

Click vào Start commit để ở phía bên phải để commit new workflow của bạn. Vậy là xong phần thực hiện rồi đó.


## 2.3. Phân tích file main.yml
Mục này bạn nào hiểu file này rồi có thể bỏ qua nhé.
```
on:
  push:
    branches:
    - master
    - release/*
```
Phần này là định nghĩa xem khi nào workflow sẽ hoạt động, ở đây nó sẽ chỉ trigger vào workflow khi có hành động push vào master hoặc release/. Bạn có thể thay đổi tùy theo yêu cầu của dự án nhé.

```

jobs:
  firebase-deploy:
```
Tên của job sẽ chạy, ở đây mình đặt là firebase-deploy cho dễ hiểu

    
Tiếp theo là phần steps, bạn tưởng tượng ở máy tính muốn deploy lên hosting thì cần phải cài cắm thư viện, config các kiểu, thì tương tự ở trên này cũng vậy, chỉ có điều là nó làm tự động thôi. 

Đầu tiên trong step, bạn sẽ thấy dòng chọn sử dụng actions/checkout mới nhất
```

- uses: actions/checkout@master
```

Giờ thì cần cài các thư viện và build Angular app. Chúng ta sẽ dùng Setup Node.js để sử dụng với các action và cập nhật các step, install các thư viện, chạy lệnh build của angular.

```
steps:
- uses: actions/checkout@master
- uses: actions/setup-node@master
  with:
    node-version: '10.x'
- run: npm install
- run: npm run build --prod
```
Bước cuối cùng là deploy Angular app lên Firebase Hosting. 

```
- uses: w9jds/firebase-action@master
  with:
    args: deploy --only hosting
  env:
    FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```
FIREBASE_TOKEN trong mục này chính là lấy từ phần bạn đã config ở bước 2.1

# 3. Kết quả
 Sau khi xong bước 2.2, bạn sẽ thấy mỗi lần push code mới lên master hoặc release/* bạn sẽ thấy code mới được deploy tự động lên firebase hosting. Bạn cũng có thể kiểm tra các lần CI chạy, các step trên github nữa
 ![](https://images.viblo.asia/00175eba-ab56-4024-bd20-707ca18b52a9.PNG)
 
 Cảm ơn các bạn đã theo dõi bài viết. Hi vọng bài viết có thể giúp ích cho các bạn.
 
 Github: https://github.com/trangnt58/changchenglazy
 
 Firebase hosting: https://changuet-a2794.firebaseapp.com/
 
 Tham khảo: https://fireship.io/snippets/github-actions-deploy-angular-to-firebase-hosting/