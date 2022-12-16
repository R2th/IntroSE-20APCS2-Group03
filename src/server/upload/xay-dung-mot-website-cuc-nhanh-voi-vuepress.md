Hiện nay, ứng dụng web là một trong những công cụ giúp mọi người dễ dàng tiếp cận thông tin, chia sẻ nội dung tới đông đảo cộng đồng. Chính vì sự tiện lợi của nó, mọi người đều muốn tạo cho mình 1 trang web để làm chia sẻ, xây dựng profile rồi portfolio cho bản thân, và cách tiếp cận tới việc xây dựng một website cũng càng dễ dàng. Trong series này, mình mong muốn chia sẻ tới mọi người những công cụ, hướng dẫn mọi người có thể tạo ra một website, một blog cho bản thân.

Mình sẽ bắt đầu luôn với công cụ đầu tiên, đó là `VuePress`.

## Về VuePress
VuePress được tạo ra để xây dựng các trang static web hoặc sử dụng để xây dựng một website đưa documentation lên đó. Để xây dựng được một trang web bằng VuePress, bạn chỉ cần 1 chút kiến thức về Markdown như vậy là đủ. `Markdown` được sử dụng để viết ra nội dung cho trang web, mỗi file `Markdown` sẽ được `VuePress` biên dịch sang HTML, người dùng sẽ truy cập trực tiếp đến file HTML được biên dịch qua VuePress. Những trang này được tối ưu khá tốt cho việc `SEO`, cũng như trải nghiệm người dùng khi `VuePress` có lựa chọn cho bạn generate ra một `Single Page App` từ` vue, vue-router và webpack.`
## Bắt đầu thôiii

Đầu tiên chúng ta **init project ** nhé 
```
mkdir my-vuepress && cd my-vuepress
touch package.json

```

Bổ sung nội dung của file package.json
```json:package.json
{
  "name": "my-vuepress",
  "version": "1.0.0",
  "author": "Dao Thai Son",
  "private": true,
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  },
  "dependencies": {
    "vuepress": "^1.4.1"
  },
  "devDependencies": {
  }
}

```

Trong file `package.json` này mình có define một vài câu lệnh trước, trong đó

- `vuepress dev docs` : Được sử dụng cho môi trường phát triển, nó sẽ tiến hành dựng một local server dưới máy tính của bạn, cho bạn một địa chỉ web và hỗ trợ reload lại web mỗi khi bạn có chỉnh sửa trong source code.
- `vuepress build docs` : Sẽ compile toàn bộ dự án của bạn, các file Markdown thành file HTML tĩnh, và bạn có thể sử dụng chúng để triển khai web lên server, public lên internet.

Sau khi tạo xong file package.json trên, bạn quay lại Terminal và chạy tiếp các lệnh

```
yarn install

mkdir docs  // Thư mục chưa các file Markdown và cấu hình cho VuePress trong dự án

echo '# Hello VuePress' > docs/README.md

# Chỉ cần chạy tiếp lệnh này nữa
yarn dev 

# Kết bạn nhận được như này là bạn đã thành công trong việc bật local server lên
success [20:07:43] Build e034f6 finished in 111 ms! ( http://localhost:8080/ )

```
![](https://images.viblo.asia/05190c96-3182-4f0f-bebf-46d31aa9cdf0.png)

Ta da, đây là giao diện trang web của bạn.

Cấu trúc thư mục dự án cũng khá đơn giản

```
.
├── docs
│   ├── .vuepress (Optional)
│   │ 
│   ├── README.md
│ 
└── package.json
```

Các cấu hình cho website sẽ được đặt trong thư mục docs/.vuepress

Các trang nội dung sẽ được đặt trong thư mục docs.

Các đường dẫn trong trang web được `VuePress` tự động resolve theo cấp bậc, lấy thực mục docs là gốc, các file `Readme.MD` sẽ tương ứng với trang index.
Ví dụ: 
```
docs/README.md => http://localhost:8080/
docs/trang-1.md => http://localhost:8080/trang-1.html
docs/trang-con/README.md => http://localhost:8080/trang-con/
```

## Thêm 1 chút code để làm trang web sinh động hơn

Trang mặc định trong cũng khá đơn sơ nhỉ ? 
Để người dùng dễ dàng xây dựng web cho bản thân, `VuePress` cũng đã xây dựng kha khá các plugin, các theme, chúng ta chỉ cần thêm cài thêm thư viện vào để sử dụng được chúng.

```json:package.json
...
"dependencies": {
    "node-sass": "^4.14.0",
    "sass-loader": "^8.0.2",
    "vuepress": "^1.4.1"
  },
  "devDependencies": {
    "@vuepress/plugin-back-to-top": "1.4.1",
    "@vuepress/plugin-medium-zoom": "1.4.1",
    "@vuepress/theme-vue": "1.4.1"
  }
```
bổ sung 1 vài plugin và thư viện vào dự án.

Và để sử dụng chúng, ta cần cấu hình 1 chút trong file docs/.vuepress/config.js

```js:docs/.vuepress/config.js
module.exports = {
    description: 'My VuePress Website',
    theme: '@vuepress/vue',
    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Go to app', link: 'https://facebook.com/sonkunn.96'},
            {text: 'Github', link: 'https://github.com/daothaison'}
        ],
        sidebar: [
            {
                title: 'Homepage',
                path: '/',
                collapsable: false,
            },
        ],
    },
    plugins: [
        ['@vuepress/back-to-top', true],
        ['@vuepress/medium-zoom', true],
    ],
}

```

Ngay khi bạn chỉnh sửa file config.js, trang web sẽ tự động reload và hiển thị nội dung mới nhất lên đó.
![](https://images.viblo.asia/4f5b0a49-a5ba-43e2-8c43-3bda013f530e.png)

Và chúng ta đã có Thanh điều hướng `Navbar`, và một phần `Sidebar` bên cạnh trái rồi. `VuePress` cũng cực kỳ tiện, chúng ta có thể cấu hình Sidebar nhiều cấp, đóng mở các thứ chỉ bằng config trong file config.js

```js:docs/.vuepress/config.js
...
sidebar: [
            {
                title: 'Homepage',
                path: '/',
                collapsable: false,
            },
            {
                title: 'Get started',
                path: '/get-started',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    '/get-started/installation'
                ]
            },
        ],
        
        ...
```

![](https://images.viblo.asia/04c6daea-0a11-467f-b942-9da66a396b7c.png)

Trông cũng bớt đơn sơ hơn chút rồi đó (lol) , bây giờ bạn chỉ cần bổ sung nội dung vào các trang Markdown để làm website của mình sinh động hơn thôi.

## Tạm kết

VuePress thực sự rất dễ tiếp cận, việc chỉnh sửa nội dung cũng khá đơn giản trong quá trình phát triển. 

Cảm ơn các bạn đã đọc đến đây nha, tiếp tục đọc tiếp các bài trong series này nhé :D 

## Nguồn tham khảo

- https://vuepress.vuejs.org/
- Source code: [daothaison/my-vuepress-website](https://github.com/daothaison/my-vuepress-website)