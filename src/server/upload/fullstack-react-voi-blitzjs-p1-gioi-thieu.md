# Blitz.js là gì?
- Là một framework giống như Rails, để xây dựng một ứng dụng React fullstack
- Blitz.js được xây dựng trên Next.js
- Dễ dàng với người mới bắt đầu và migrate ứng dụng Next.js qua Blitz.js
- Dễ dàng mở rộng
## Chức năng chính
Các chức này được nêu trong docs của Blitz:<br>
    - `Zero-API` lớp data cho phép chúng ta import code server vào component React của chúng ta thay vì phải thêm các APi và thực hiện việc client-side fetching và caching<br>
    - Gom mọi thứ chúng ta cần vào ứng dụng. Mọi thứ end-to-end từ database tới frontend<br>
    - Mang lại sự đơn giản và quy tắc của framework như Ruby on Rails nhưng vẫn bảo toàn mọi thứ của React mà chúng ta yêu thích

Hình ảnh mô tả hoạt động của Blitz.js:

![](https://images.viblo.asia/e3e8df49-2f55-4ada-b367-81e303da4627.jpg)

# Cài đặt Blitz.js
Để cài đặt đảm bảo rằng bạn đã cài node.js từ phiên bản 12 trở lên

Cài đặt `blitz.js` global:
```
npm install -g blitz
```

- Tạo project `blitz.js`
```
blitz new app-name
```

Sau đó bạn cd vào thư mục gốc của app và chạy lệnh sau để run app:
```
blitz start
```

# Cấu trúc thư mục
Sau khi cài đặt cấu trúc thư mục cơ bản như sau:
```
mysite
├── app
│   ├── components
│   │   └── ErrorBoundary.tsx
│   ├── layouts
│   └── pages
│       ├── _app.tsx
│       ├── _document.tsx
│       └── index.tsx
├── db
│   ├── migrations
│   ├── index.ts
│   └── schema.prisma
├── integrations
├── node_modules
├── public
│   ├── favicon.ico
│   └── logo.png
├── utils
├── .babelrc.js
├── .env
├── .eslintrc.js
├── .gitignore
├── .npmrc
├── .prettierignore
├── README.md
├── blitz.config.js
├── package.json
├── tsconfig.json
└── yarn.lock
```

- `app`: là nơi đặt `pages` hoặc các `API routes`
- `db`: Là nơi cấu hình database.
- `public`: là một thư mục nơi chúng ta sẽ đặt bất kỳ nội dung tĩnh nào. 
- `utils`: Là nơi đặt các file share mà chúng ta có thể sử dụng ở các thư mục hay file khác ở trong ứng dụng.
- `.babelrc.js, .env, etc. ("dotfiles")`: Là các tệp cấu hình
- `blitz.config.js`: là file custom config của `Blitz`.<br>
các file còn lại đã quá quen thuộc với chúng ta rồi ^^

Ở phiên bản hiện tại mới nhất của `Blitz` đã tạo cho chúng ta một demo về `sign up` và `login`.

Sau khi cài đặt xong project chúng ta chạy command sau:
```
blitz generate all project name:string
blitz db migrate
```
Sau đó chúng ta sẽ thấy trên terminal `blitz` sẽ tạo chúng ta các file `migration`, tạo các `datamodel`. Chúng ta sẽ tìm hiểu chi tiết các phần này trong các bài viết tiếp theo

Sau khi chạy các lệnh trên các bạn chạy lại `blitz start` và thử demo sẵn của `Blitz`
# Tạo page mới trên blitz
Ở trong `Blitz`, một page là một `React Component` được export từ file `.js, .jsx, .ts, or .tsx` được đặt ở trong thư mục `pages`

Mỗi page được liên kết với một route dựa trên tên file

Các pages hợp lệ sẽ như sau:
- `app/pages/test.tsx`
- `app/projects/pages/projects/index.tsx`
- `app/tasks/pages/projects/[projectId]/tasks/[taskId].tsx`

Ví dụ:
Chúng ta sẽ tạo một file `app/pages/test.tsx`và có nội dung như sau:
```javascript
function Test() {
    return <div>test</div>
}

export default Test
```

Sau đó chúng ta chạy lại `blitz start` và vào đường dẫn `http://localhost:3000/test`, trên trang sẽ hiển thị nội dung như trong component mà chúng ta đã viết

# Blitz shell
Cũng như `Laravel` có tinker thì `Blitz` cũng cấp cho chúng ta shell để thực hiện API Blitz bằng cách thực hiện lệnh
```
blitz console
```

Sau khi thực hiện lệnh trên chúng ta có thể chạy lệnh sau để test:
```
await db.user.findMany()
```

sau khi thực hiện lệnh này sẽ show cho chúng ta tất cả user mà chúng ta đã tạo:
![](https://images.viblo.asia/77801772-d295-4502-b492-72df80655177.jpg)

Đây là kết quả sau khi mình chạy lệnh

# Kết luận
Trong bài viết này mình đã giới thiệu qua với các bạn về một số kiến thức cơ bản về `Blitz`, trong các bài viết tiếp theo chúng ta sẽ tìm hiểu sâu hơn về từng phần của Blitz. Cảm ơn các bạn đã theo dõi bài viết
- Tài liệu tham khảo: https://blitzjs.com/