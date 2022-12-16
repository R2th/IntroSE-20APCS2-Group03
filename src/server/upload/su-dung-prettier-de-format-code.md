**Câu chuyện thứ nhất:**

> **Lít Đờ:** Này em, khi em viết component React mà không có state và lifecycle thì chuyển nó về dạng Stateless Component luôn em nhé!
>
> **Junior:** Dạ vâng anh!
>
> **Lít Đờ:** Khai báo biến em dùng `const` cho anh nhé, chỗ nào cần thay đổi giá trị mới dùng `let` thôi, đặc biệt trong dự án React này, đừng dùng khai báo biến với `var` đó nhé.
> 
> **Junior:** Dạ vâng anh! Ơ mà sao nhiều quy tắc thế ạ, em nhớ thế éo nào được? Em vừa mới tìm hiểu được con hàng [ESLint](https://eslint.org/) này ngon đây, đảm bảo keep các rule mà anh đặt ra được tuân theo ngon lành luôn.
> 
> **Lít Đờ:** (LGTM) thế chú đưa vào project của mình ngay, anh cũng đỡ phải dùng đôi mắt thần để review pull tìm lỗi này của chú.

**Câu chuyện thứ hai:**

> **Lít Đờ:** Này chú em, thời nào rồi mà chú viết JS còn để tab 4 hả? tab là 2 thì anh cũng không thích rồi. Chú convert cái file đó indent về dạng space và là space 2 cho anh nhé!
> 
> **Junior:** Dạ vâng anh!
> 
> **Lít Đờ:** Cơ mà đối với file markdown thì chú lại viết space 4 cho anh nhé (bởi vì anh nghe giang hồ recommend như thế :P)
> 
> **Junior:** Vãi rứa anh Lít Đờ. Thế thì anh add cái [http://editorconfig.org](http://editorconfig.org) vào đi, nó sẽ tự động keep rule trên của anh nhé
> 
> **Lít Đờ:** (ngon)

**Câu chuyện thứ ba:**

> **Lít Đờ:** À em! phần tử cuối trong 1 object em luôn đặt dấu phẩy cho anh nhé!
>
> **Junior:** Dạ vâng anh!
> 
> **Lít Đờ:** Em nhớ lưu ý giúp anh là kết thúc mỗi câu lệnh đều phải có dấu chấm phẩy nhé!
>
> **Junior:** Oh. Khó thế, cái này em hay quên lắm. (... 5 phút đi research...) À. anh ơi, em tìm ra có thằng [Prettier](https://prettier.io/) làm được những thứ anh bảo đấy.
> 
> **Lít Đờ:** (baiphuc) Ây dà, chú em tìm ra hay thế. Để anh tìm hiểu nó xem..

### Prettier là gì? làm được gì? tại sao cần dùng nó?

Đây là tool để format code 1 cách tự động. Bạn sẽ không cần phải tốn thời gian với việc đi format từng đoạn code nhìn sao cho đẹp, rồi trong team 9 người 10 ý, mỗi người 1 kiểu format nhìn rất là xấu code. Vậy thì Prettier sẽ giúp thống nhất phong cách code chung của mỗi người. Sẽ không còn phải mỗi lần review pull đi soi format code nữa.

Hãy xem qua đoạn demo dưới đây là bạn sẽ hiểu ngay nó làm gì:

**Đoạn code ban đầu:**
```js
foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());
```

**Sau khi nhờ Prettier format:**
```js
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

### Chơi cũng thân với các tool như ESLint, EditorConfig

**Chơi thân với EditorConfig như thế nào?**

Có EditorConfig trong dự án rồi, dự án chắc chắn đang dùng indent với space là 2, tuy nhiên đôi lúc dev lại vô tình indent thừa, indent thiếu, nhìn trông cũng lởm. Thế thì nay đã có Prettier, nó sẽ đọc qua được config từ file `.editorconfig`  (từ version 1.9 mới có)  và luôn luôn đảm bảo rằng đoạn code được format đúng chuẩn indent mỗi khi viết xong.

**Chơi thân với ESLint như thế nào?**

Chắc chắn sẽ có 1 số dev còn đang mơ hồ về chức năng giữa thằng ESLint vs Prettier này. Đôi khi được yêu cầu đưa Prettier này vào dự án, thì có dev cho rằng đã có ESLint vô đối rồi, đưa cái này vào làm gì. Có thể nói ngắn gọn, xúc tích, dễ hiểu như thế này:

* **ESLint** đánh vào mảng quality của code: no unused variables, no global variables, prefer stateless...v..v
* **Prettier** đánh vào mảng formatting của code: maximum length, mixed tabs and spaces, quote style...v...v

Trên cộng đồng hiện tại vẫn đang có repo để sử dụng gộp 2 thằng này lại như:
+ [prettier-eslint](https://github.com/prettier/prettier-eslint)
+ [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
+ Trong document của trang chủ Prettier cũng có đề cập [cái này](https://prettier.io/docs/en/eslint.html)

### Hỗ trợ format cho nhiều ngôn ngữ

Ở 3 mẫu chuyện trên thì chỉ là đang xoay quanh việc format cho Javascript (ES6), JSX. Ngoài ra Prettier còn hỗ trợ format cho các ngôn ngữ khác như:
* TypeScript
* CSS, Less, and SCSS
* JSON
* GraphQL
* Markdown

### Thực hiện format như thế nào?

Tức là sẽ có nhiều cách để mình thực hiện format với Prettier:

+ Qua [Editor plugins](https://prettier.io/docs/en/editors.html),  cài package Prettier tương ứng cho Editor/IDE của bạn, follow theo hướng dẫn của package sẽ tự động format code dựa trên Prettier.

Ví dụ mình đang dùng VSCode, vậy thì sẽ cài package [Prettier formatter for Visual Studio Code](https://github.com/prettier/prettier-vscode). Và muốn mỗi lần viết code xong, save lại thì code được tự động format, thì ở package cũng đã hướng dẫn rõ cách thức như thế này:

```json
// Set the default
"editor.formatOnSave": false,
// Enable per-language
"[javascript]": {
    "editor.formatOnSave": true
}
```

+ Qua [CLI](https://prettier.io/docs/en/cli.html). Mình thường luôn muốn việc format code phải tự động, tức là chỉ config khi bắt đầu 1 dự án và trong lúc code thì không cần phải lo lắng gì về nó nữa. **Format On Save** của Editor cũng hay nhưng dường như là chưa đủ vì đôi lúc member trong dự án chưa được training về cái này, thì họ quên cài package Prettier cho Editor của họ, thế là việc tự động format khi save không được thực hiện. Cho nên mình thích giải pháp kết hợp CLI + Pre-commit hook.
+ Qua [Pre-commit Hook](https://prettier.io/docs/en/precommit.html), giờ thì hầu hết dự án đều sử dụng Git để quản lý source code, và dự án code gì đi nữa, có quên cài package cho editor đi chăng nữa, thì code xong cũng phải commit lên, và lúc này code sẽ được tự động format trước khi commit lên Github, Bitbucket hoặc là Gitlab...Chẳng cần phải lo lắng gì nữa, các member còn lại trong dự án khi pull code về thì chắc chắn luôn nhận được đoạn code đã được format đúng chuẩn của team đặt ra.

### Tài liệu tham khảo

+ https://medium.com/@vnknowledge/javascript-%C4%91%E1%BB%8Bnh-d%E1%BA%A1ng-code-javascript-v%E1%BB%9Bi-prettier-75de9e4afe8d
+ https://www.wisdomgeek.com/web-development/using-prettier-format-javascript-code/
+ https://medium.com/front-end-hacking/prettier-an-opinionated-code-formatter-excellent-for-open-source-5ecd2685238f