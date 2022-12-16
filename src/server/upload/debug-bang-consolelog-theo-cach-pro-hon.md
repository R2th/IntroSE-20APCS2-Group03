Khi code các dự án bằng JavaScript (hoặc NodeJS) thì có nhiều tool để debug, nhưng mình vẫn hay debug theo kiểu *nông dân* đó là dùng console.log.
Những ai có cùng sở thích như vậy thì có thể tham khảo bài viết này để có thể *log một cách pro hơn*

## Có nhiều loại log ngoài console.log

**Console** là một object, và nó có nhiều phương thức khác nhau. Trong đó `.log()` là phổ biến nhất.

Tham khảo các phương thức của object `console` ở đây: [https://developer.mozilla.org/en-US/docs/Web/API/console](https://developer.mozilla.org/en-US/docs/Web/API/console).

Khi code ở browser thì có thể dùng 1 số loại log sau, để khi hiển thị có thể lọc theo ý muốn: `console.log()`, `console.info()`, `console.warn()`, `console.error()`. Các phương thức này cách dùng giống nhau nhưng hiển thị khác nhau.

![Custom log levels](https://huydq.dev/images/custom-log-levels.png)
Lọc hiển thị các loại logs

![Logs](https://huydq.dev/images/console-methods.png)
Một số loại logs và cách hiển thị trên Console

Hoặc khi hiển thị dữ liệu là mảng các object thì có thể hiển thị dưới dạng bảng bằng `console.table` (có thể điều chỉnh được độ rộng các cột khi có nhiều thuộc tính).

![Console Log](https://huydq.dev/images/console-log-array-object.png)
Log sử dụng console.log()

![Console Table](https://huydq.dev/images/console-table-array-object.png)
Log sử dụng console.table()

Với NodeJS thì nếu xem log trên Terminal sẽ thấy giống nhau (trừ *console.table*). Có thể kết hợp với một số tool khác để lọc log, remove log, ... ví dụ như dùng `console.log()` để debug nhanh và `console.info()` để thông báo lên terminal (*running server at port ...*).

## Console.log với CSS

Cách này chỉ áp dụng trên trình duyệt. 

Thay vì chỉ `console.log()` như bình thường thì chúng ta có thể thêm chút CSS vào cho nổi bật (nhất là trong trường hợp có nhiều log do nhiều người viết mà chưa xóa 😅).

Ví dụ:

```js
const style = 'color: red; font-size: 30px;';
console.log('%c' + 'Hello World', style);
```

Cách này được áp dụng như ở Facebook, bật developer tools lên sẽ thấy.

![Facebook console](https://huydq.dev/images/facebook-console.png)

## Console.log với mã màu

Cách này áp dụng được cho cả trình duyệt lẫn Terminal, đó là sử dụng mã màu (ANSI escape code) để log ra chữ có màu.

Ví dụ ký hiệu đặc biệt của chữ màu đỏ là `\x1b[31m`, kết thúc màu là `\x1b[0m` (reset). Vậy đoạn log sau sẽ in ra chữ `Hello World` có 2 màu xanh và đỏ:

```js
const textRed = '\x1b[31m';
const textGreen = '\x1b[32m';
const reset = '\x1b[0m';
console.log(textRed + 'Hello' + reset + ' ' + textGreen + 'World' + reset);
```

Ngoài ra còn có mã màu nền đỏ là `\x1b[41m`, vậy đoạn log sau sẽ in ra chữ xanh nền đỏ:

```js
const textGreen = '\x1b[32m';
const bgRed = '\x1b[41m';
const reset = '\x1b[0m';
console.log(textGreen + bgRed + 'Hello World' + reset);
```

Có thể dùng tool sau để chọn màu cho nhanh: [https://console-colors.vercel.app](https://console-colors.vercel.app/).

## Log nhanh hơn với User Snippets của VS Code

VS Code cho phép người dùng tự tạo các **snippets** tùy theo ngôn ngữ để code cho nhanh. Tận dụng chức năng này chúng ta có thể viết sẵn các snippets log khác nhau để không cần mất công gõ dài dòng hoặc nhớ mã màu (nếu muốn log có màu). Lúc này chỉ cần gõ 1 vài ký tự là VS Code sẽ có gợi ý luôn.

Để tạo snippets thì vào mục **File > Preferences > Configure User Snippets**. Sau đó chọn ngôn ngữ áp dụng snippet, ví dụ `javascript.json (JavaScript)`.

Sau đó dựa theo gợi ý có sẵn trong file này để cấu hình. Ví dụ:

```json
{
  "Print to console": {
    "prefix": "cl",
    "body": ["console.log('--- ${1:DATA} ---', ${2:''});", "$0"],
    "description": "Log output to console"
  },
}
```

Như vậy khi code chỉ cần gõ `cl` là sẽ có gợi ý, bấm enter thì sẽ hiển thị ra đoạn log có kèm các vị trí tab stops (điểm dừng khi bấm tab, có bôi đen sẵn) và vị trí con trỏ chuột cuối cùng sau khi gõ lệnh (*$0*):

![Snippet Console Log 1](https://huydq.dev/images/snippet-console-log-1.png)
![Snippet Console Log 2](https://huydq.dev/images/snippet-console-log-2.png)

Trên đây là 1 ví dụ snippet log đơn giản, các bạn có thể tự tùy biến màu mè theo ý thích cho nó trông *nguy hiểm* hơn khi debug. 

Happy coding 😎

---
Nguồn: [https://huydq.dev](https://huydq.dev/blog/debug-bang-console-log-theo-cach-pro-hon/)

Tham khảo:
- [*It’s 2022, Please Don’t Just Use “console.log” Anymore*](https://javascript.plainenglish.io/its-2022-please-don-t-just-use-console-log-anymore-217638337c7d)
- [*How to change node.js's console font color?*](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)
- [*Everything you never wanted to know about ANSI escape codes*](https://notes.burke.libbey.me/ansi-escape-codes/#:~:text=ANSI%20escapes%20always%20start%20with,and%20this%20is%20basically%20why).
- [*Snippets in Visual Studio Code*](https://code.visualstudio.com/docs/editor/userdefinedsnippets)