Nếu bạn là một JavaScript developer chân chính, một trong những điều quan trọng bạn cần biết là sử dụng Linter, cụ thể là ESLint. Nhưng sử dụng thế nào cho hợp lý, cho đúng cách, phát huy đúng tác dụng của ESLint là câu chuyện khác.

## 1. Vì sao lại cần ESLint?

### 1.1. Sự linh hoạt của JavaScript

Chà, lý do đầu tiên có thể kể tới do JavaScript là ngôn ngữ khá linh hoạt (flexible). Viết code kiểu nào cũng chạy được. Từ đó dẫn tới việc chất lượng code không cao.

Yếu tố quan trọng để đánh giá chất lượng source code là tính nhất quán (consistency). Nếu mỗi thành viên đều code theo coding style của riêng mình, consistency không còn được đảm bảo thì project lúc này như một mớ hổ lốn.

![](https://images.viblo.asia/e43d8803-fb8e-47cd-8910-fc3a9db7e39a.jpg)

> Thế nên người ta mới cần code review!

Chà, nếu phải review những đoạn code dài mà coding convention không nhất quán thì mình không làm nổi. Code chừng vài trăm dòng mà phải căng mắt lên xem chỗ nào sai convention cũng là một cực hình. Chưa kể việc comment lại, rồi đợi sửa cũng tốn không ít thời gian.

Trong hoàn cảnh đó, ESLint ra đời như một vị cứu tinh.

### 1.2. ESLint - em là ai?

Như trên trang chủ ESLint có định nghĩa:

> ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

Theo cách hiểu **bình dân** của tớ, thì ESLint là một công cụ:

* Giúp phát hiện và báo cáo các lỗi sai về coding convention
* Mục tiêu là giúp code của chúng ta nhất quán hơn (và tránh bug nữa :joy:)

Trước đây ESLint chỉ hỗ trợ check style cho JavaScript, nhưng cộng đồng đã mở rộng nó ra bằng cách plugin bổ sung. Hiện tại ESLint khá mạnh rồi, có thể check được TypeScript và hỗ trợ các framework khác như Vue hay React.

![](https://images.viblo.asia/2b0e4ec2-2f2d-44b7-8124-0ab51adddac3.png)

## 2. Vài bước setup ESLint cho project

Nếu bạn có sử dụng framework nào đó (React, Vue,...) thì CLI của chúng đều có option để cấu hình ESLint cho bạn. Nên thực hiện chọn option này, vì cấu hình của CLI tạo ra khá chuẩn và đầy đủ support cho framework đó.

Nếu hỗ trợ không có sẵn, không sao, chúng ta vẫn có thể setup bằng cơm, ý lộn bằng tay ESLint cho project chỉ với vài bước dưới đây.

### 2.1. Thêm dependency

Trong thư mục project, bạn mở terminal lên và cài đặt dependency của ESLint (qua NPM **hoặc** Yarn).

```shell
npm install eslint --save-dev
yarn install eslint --dev
```

Sau bước này thì trong tệp `package.json` đã có dependency của ESLint rồi.

Đối với hỗ trợ ESLint cho các tính năng khác, bạn cần cài thêm vài dependency, plugin. Ví dụ như project có dùng TypeScript thì bạn cần cài thêm 2 dev dependencies là `@typescript-eslint/eslint-parser` và `@typescript-eslint/eslint-plugin`.

### 2.2. Cấu hình `.eslintrc.{js,json,yml}` file

Đây là file khai báo các quy tắc cấu hình của ESLint. Tên file lạ thế thôi, chứ nó thực ra chỉ có một file tên là `.eslintrc` với phần đuôi thuộc 3 loại sau:

* File JavaScript `.js`
* File JSON `.json`
* File YAML `.yml`

Khi setup ESLint có bước để chọn lưu cấu hình ở dạng file nào. Theo mình tốt nhất là chọn định dạng JavaScript, bởi vì nó có thể viết được các expression như sau.

![](https://images.viblo.asia/6329524c-4496-4b37-9fdc-0d04b1d50072.png)

Dùng command sau để khởi tạo file cấu hình cơ bản nhất.

```shell
eslint --init
```

ESLint sẽ hỏi bạn vài câu hỏi, bạn chọn và cuối cùng nó sẽ generate file `.eslintrc.{js,json,yml}` tương ứng.

![](https://images.viblo.asia/e213b0ef-698d-4c77-943c-e333c2226e97.png)

Trong trường hợp bạn dùng thêm các tính năng khác như TypeScript, Vue,... ESLint chạy sẽ báo lỗi như trên. Nó chỉ chi tiết cho bạn các dependency nào còn thiếu, bạn chỉ cần cài thêm như bước 1 là được.

### 2.3. Thêm Linter script

Việc cuối cùng chỉ cần thêm một **NPM script** vào file `package.json` và chạy là được. Các bạn mở file `package.json` lên và thêm dòng này vào.

```package.json
{
    ...
    "scripts": {
        ...
        "lint": "eslint ."  // Thêm dòng này
    }
```

Khi đó lúc nào cần chạy lint thì chỉ cần chạy `npm lint` hoặc `yarn lint` là được.

Ngoài ra thì cũng cần chú ý dòng mình mới thêm vào. Đó là yêu cầu NPM hoặc Yarn chạy ESLint với thư mục hiện tại. Nếu bạn chỉ muốn lint các file trong thư mục `src` thôi, thì cần sửa lại như vầy `eslint src`.

Mặc định khi chạy lint như trên, thì các lỗi chỉ hiển thị ra thôi. ESLint có tính năng tự động fix giúp bạn luôn, bằng cách thêm tham số `--fix` vào là được.

```package.json
{
    ...
    "scripts": {
        ...
        "lint": "eslint src --fix"
    }
```

Trông ổn áp hơn nhiều rồi.

---

Okay trong phần một của loại bài ESLint mình đã trình bày cách setup ESLint cho dự án, và cũng chia sẻ một số mẹo vặt để sử dụng ESLint được hiệu quả hơn. Cùng đón chờ phần tiếp theo với nhiều bất ngờ thú vị khác nhé.

À quên, nếu bạn cảm thấy bài viết hữu ích, đừng ngần ngại ấn upvote hoặc clip cho mình nhé. Trong dịp MayFest này mình sẽ ra nhiều bài viết chất lượng hơn nữa, nhớ đón xem và ủng hộ nha :heart: