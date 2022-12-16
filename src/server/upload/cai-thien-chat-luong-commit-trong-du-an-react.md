Một dự án phần mềm thường được phát triển bởi một team thay vì một cá nhân, việc thống nhất coding conventions giữa các thành viên là một việc quan trọng nhằm tăng chất lượng code và giúp code thống nhất theo một chuẩn giúp thuận tiện trong việc đọc cũng như cải tiến thay đổi trong tương lai. Chắc hẳn là lập trình viên thường rất khó chịu khi phải đọc code do người khác viết mà không theo một quy chuẩn thống nhất nào :). Chính vì lý do đó mỗi ngôn ngữ lập trình thường có những bộ linter giúp kiểm tra, thiết lập coding conventions. Lập trình viên thường sử dụng những bộ công cụ linter này để kiểm tra cũng như tuân thủ theo coding conventions đã được đề ra. Tuy nhiên làm sao có thể đảm bảo lập trình viên đã kiểm tra lại code của mình một cách kĩ càng trước khi đoạn code đó được tích hợp, liệu có khả năng xảy ra việc quên hay nhầm lẫn? Có một phương pháp giúp giải quyết vấn đề này đó là sử dụng `pre-commit check`. Trong bài viết này chúng ta cùng tìm hiểu về `pre-commit check` và cách thiết lập nó trong một dự án React.

### Pre-commit check là gì?
Pre-commit check là quá trình kiểm tra sau khi staging changes những đoạn code thay đổi để sẵn sàng cho việc tạo một commit mới.   Nếu quá trình này thành công một commit mới sẽ được tạo ra, ngược lại nếu pre-commit check thất bại commit sẽ không được tạo và hiển thị thông báo lỗi cho lập trình viên. Pre-commit check thường được sử dụng cho việc kiểm tra coding styles, coding conventions một cách tự động trước khi các thay đổi code được tích hợp.

### Áp dụng pre-commit check vào dự án React
Trước tiên chúng ta tạo một project demo bằng cách sử dụng `create-react-app`.
#### Thiết lập EsLint
Cài đặt Eslint và một số plugins mình thường sử dụng:

```
npm install --save-dev eslint babel-eslint eslint-config-prettier eslint-config-airbnb-base eslint-plugin-react eslint-plugin-prettier
```

Tạo file .eslinrc và config cho Eslint:

```javascript
{
  "env": {
    "es6": true,
      "browser": true
    },
  "extends": [
    "airbnb-base"
  ],
    "parser": "babel-eslint",
      "parserOptions": {
    "ecmaVersion": 2018,
      "sourceType": "module",
        "ecmaFeatures": {
      "impliedStrict": true,
        "jsx": true
    }
  }
}
```
Trong bài viết này mình không tập trung vào Eslint. Các bạn có thể tìm hiểu thêm để có thể có những config phù hợp với dự án của mình nhất :)
Bây giờ chúng ta thay đổi 1 file không theo chuẩn của Eslint. Sau khi chạy eslint ta thấy một số lỗi xảy ra.

![eslint error](https://images.viblo.asia/7e73bbef-85ef-41af-803e-7d599d4df374.png)

Eslint có hỗ trợ CLI để có thể fix những lỗi cơ bản một cách nhanh chóng bằng cách thêm flag `--fix`. Tuy nhiên chúng ta không sử dụng cách này mà theo đúng chủ đề bài viết chúng ta sẽ sử dụng `pre-commit check`.

#### Thiết lập husky và lint-staged
[husky](https://github.com/typicode/husky) là một library cho phép chúng ta sử dụng các `git hooks` còn [lint-staged](https://github.com/okonet/lint-staged) cho phép ta chạy lint đối với những file đã được staged. Đây là một bộ đôi hoàn hảo giúp chúng ta có thể setup `pre-commit check`.
Trong file `packages.json` ta khai báo một số script và config cho `husky` và `lint-staged` như sau:
```json
  "scripts": {
    "start": "react-scripts start",
    "lint:fix": "eslint src/*.js --fix",
    "lint": "eslint src/*.js",
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    ".js": [
      "npm run lint:fix",
      "npm run lint"
    ]
  },
```

Bây giờ khi ta commit một commit mới bằng lệnh `git commit`. Git hook `pre-commit` sẽ được trigger và gọi `lint-staged`. `lint-staged` sẽ chạy 2 lệnh `npm run lint:fix` và `npm run lint` đối với những file `.js` trong trạng thái staged. Kết quả thu được một commit mà commit đó đã được kiểm tra qua Eslint. Đối với những lỗi Eslint không thể tự động fix sẽ hiển thị thông báo lỗi và quá trình tạo commit bị dừng lại cho đến khi lập trình viên sửa những lỗi đó và commit lại.
Các bạn cũng có thể bỏ qua `pre-commit check` bằng cách sử dụng flag `--no-verify` trong `git commit`.

#### Bonus
Ta có thể cài đặt thêm để khi commit code sẽ được tự động format bằng cách sử dụng `prettier` và thêm một số config trong `packages.json`.
```json
  "lint-staged": {
    "*.(js|css)": [
      "prettier --write",
      "git add"
    ],
    ".js": [
      "npm run lint:fix",
      "npm run lint"
    ]
  },
```
Như vậy trước khi commit các file `.js` và `.css` sẽ được format bằng `prettier`. Thật tuyệt vời phải không.

[Link source code](https://github.com/VuPhong95663/pre-commit-test)

### Kết luận
Bài viết giới thiệu sơ bộ cách thiết lập một tool tự động cho việc `pre-commit check` bằng cách sử dụng thư viện `husky` và `lint-staged`. Còn rất nhiều thứ bạn có thể tự thiết lập cho phù hợp với dự án của bản thân, `husky` hỗ trợ rất nhiều `git hooks` các bạn có thể tìm hiều và tạo ra một số thứ hay ho với chúng (VD: Chạy test trước khi push với `pre-push`, ...). Hy vọng bài viết sẽ có ích với mọi người.