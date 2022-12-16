### Giới thiệu
Bạn có một ứng dụng ReactJS, và bạn muốn deploy ứng dụng của bạn lên internet và chia sẻ cho mọi người nhưng chưa biết phải làm thế nào.  

Bài viết này là một giải pháp cho bạn, hướng dẫn bạn public ứng dụng lên **GitHub Pages**, hãy cùng bắt đầu nhé.

### Tạo project
Phần này giành cho các bạn chưa có ứng dụng, hãy tạo 1 ứng dụng ReactJS với package **create-react-app**, nếu bạn chưa biết về package này, có thể tìm hiểu thêm tại bài viết này [link](https://viblo.asia/p/tao-ung-dung-reactjs-bang-create-react-app-Eb85oXr0K2G)

Mình sẽ tạo ứng dụng có tên là **deploy-github** với câu lệnh sau:
```
$npx create-react-app deploy-github
```
**Sau đó mở và chạy app ở dưới local:**
```
// mở thư muc app
$ cd deploy-github

// khởi chạy app
$ npm start
```

### Tạo repository
Mở github của bạn lên, tạo một repository để chứa code của app bạn mới tạo
Ở đây mình tạo repository có tên là **deploy-github**

![](https://images.viblo.asia/db3826db-4c78-429c-9a56-a1caabe63817.png)

**Commit code của app bạn tạo vào repo github**
```
// Tạo mới git
$ git init

// Commit source code
$ git add .
$ git commit -m 'first commit'
```

**Add remote và push code lên github**
```
// Add remote
$ git remote add origin git@github.com:minhlq-0928/deploy-github.git

// Push code
$ git push origin master
```

### Cài đặt gh-pages
Cài đặt package **gh-pages** với lệnh sau
```
$ npm install --save gh-pages
```
**Cần thêm code ở file package.json như sau:**
```
// Thêm đường dẫn homepage
// https://[your-user-name].github.io/[your-repo-name]/
"homepage": "https://minhlq-0928.github.io/deploy-github/",

// Thêm command predeploy & deploy app
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
```
![](https://images.viblo.asia/6273ae6b-ccb2-4fc6-8416-0c8d9a63f584.png)

**Chạy deploy app**
```
$ npm run deploy
```
**Vào link homepage để xem kết quả nào**

![](https://images.viblo.asia/e180f038-6267-40a2-9e92-79798081b8a1.png)

### Demo
Các bạn xem kết quả demo tại đây nhé:
[Demo](https://minhlq-0928.github.io/deploy-github/)

Nguồn tham khảo: [link](https://codeburst.io/deploy-react-to-github-pages-to-create-an-amazing-website-42d8b09cd4d) và [link](pluralsight.com/guides/how-to-create-react-application-and-deploy-on-github-pages)

### Note
Có một vài bạn đã feedback là cách này không còn hoạt động, mình đã kiểm tra lại và đã cập nhật lại bài viết vào hôm nay ngày (23/10/2019). Cảm ơn các bạn đã đọc và phản hồi lại bài viết của mình :).