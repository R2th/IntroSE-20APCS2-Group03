Trong phần 1 mình đã giới thiệu sơ lược qua về ESLint là gì và cách setup cơ bản. Tiếp theo sau đây là nói về các rule cơ bản và vài mẹo hay giúp sử dụng ESLint tốt hơn nhé. Okay let's go.

À cho bạn nào chưa xem phần 1 có thể xem qua để biết cơ bản về ESLint nhé https://viblo.asia/p/tan-dung-toi-da-100-suc-manh-cua-eslint-phan-1-naQZRnGAZvx.

## 1. Cách viết các rules

### 1.1. Cấu trúc file `.eslintrc`

Trước hết cùng xem qua bên trong file `.eslintrc.js` có gì, cấu trúc như thế nào nhé. Như bên dưới đây là một số phần cơ bản trong một file `.eslintrc.js`. Hầu hết đều được cấu hình khi tạo ESLint rồi.

```.eslintrc.js
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: [
        'eslint:recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        ...
    }
}
```

Ý nghĩa các phần trên như sau:

* `root: true` chỉ định đây là file ESLint gốc. Các file trong thư mục con ghi đè lại một số rule, nhưng sẽ không có dòng này.
* `env` chọn ác môi trường để chạy linter, như `browser`, `node`,.... Chú ý hầu hết project có dùng CLI, NPM các kiểu thì phải set `node: true`.
* `extends` danh sách các template có sẵn. Những template này đã đặt các rule mặc định rồi, nên bạn không phải cấu hình lại toàn bộ mà chỉ cần override lại những rule cần thiết thôi.
* `parserOptions` cấu hình trình phân tích code, và parse phiên bản nào. Ví dụ bạn code TypeScript thì phải có typescript parser (là NPM package), và code ở version ECMAScript 2020.
* `plugins` khai báo những plugin hỗ trợ thêm cho ESLint

Những phần trên các bạn chỉ xem sơ để biét chức năng của chúng là gì thôi. Phần quan trọng nhất là `rules`, nơi mà các bạn cấu hình các rule cho ESLint.

### 1.2. Cấu trúc rules

Danh sách các rule được viết trong phần `rules` như đã nói ở trên. Ví dụ như bên dưới, mình có khai báo 2 rule là `linebreak-style` và `indent`.

```.eslintrc.js
{
    rules: {
        'lỉnebreak-style': ['error', 'unix'],
        'indent': [
            'warn', 4,
            {
                'SwitchCase': 1,
                'FunctionDeclaration': {
                    'body': 1,
                    'parameters': 2
                }
            }
        ],
        ...
    }
}
```

Qua ví dụ 2 rule trên, dễ thấy được quy tắc viết từng rule như sau:

* Rule ngắn gọn, tên rule đã nói ra option rồi thì có thể viết dạng `'name': 'level'` (level là `warn`, `error`,...)
* Với rule nhiều option, tùy chọn thì viết dạng đầy đủ là `'name': ['level', 'value', { Object option nếu có }]`

## 2. Sử dụng ESLint

### 2.1. Các rules thường dùng

Khi mới setup thì ESLint chỉ chứa một số rules cơ bản. Và trên trang chủ thì giới thiệu thêm một đống rules khác.

> Thực sự không biết nên chọn setup những rule nào, đâu là những rule phổ biến được dùng trong project thực tế?

Đó là thắc mắc của mình khi mới tìm hiểu ESLint, và mình nghĩ nhiều bạn cũng có cảm giác như vậy. Và rồi khi dùng một thời gian mình mới nhận ra, rằng ESLint đã setup các rule mặc định hết rồi, những rule nào không hợp thì developer chúng ta mới custom lại thôi.

Và đây là các rules phổ biến mà mình "gom" được sau một thời gian code với ESLint.

| Tên rule | Mô tả |
| - | - |
| `no-console` | Không được dùng các lệnh `console.xxx()` |
| `no-debugger` | Không được chứa lệnh `debugger` |
| `no-trailing-spaces` | Không có khoảng trắng thừa cuối dòng |
| `no-multiple-empty-lines` | Không được xuống hàng hai lần |
| `semi` | Chỉ định dấu chấm phẩy có bắt buộc hay không |
| `eol-last` | Bắt buộc phải có 1 dòng trống cuối file |
| `comma-dangle` | Có cho phép trailing comma không |
| `quotes` | Dùng dấu nháy đơn hay nháy kép cho string |
| `linebreak-style` | Chỉ định dấu xuống dòng kiểu Windows `CRLF` hay Unix `LF` |
| `indent` | Chỉ định cách thụt lề |
| `brace-style` | Chỉ định cách đặt dấu ngoặc {} dạng nào

Chi tiết hơn về từng rule và các giá trị của chúng các bạn có thể xem tại docs của ESLint nhé https://eslint.org/docs/rules/. Cá nhân mình thấy ESLint viết document khá rõ ràng, đơn giản và dễ hiểu. Có cả theo code ví dụ nữa, các bạn dễ dàng phân biệt sự khác biệt giữa các rule value.

![](https://images.viblo.asia/43864ea0-71ea-4e85-a4a7-899e66dd1b4e.png)

Ví dụ rule `brace-style`, bạn dễ dàng nhận ra được sự khác nhau giữa hai đoạn code chứ?

### 2.2. Bỏ qua check rule nào đó

Ví dụ trong project bạn đã setup rule `no-console` rồi, tuy nhiên có đoạn code bắt buộc dùng `console.log()`, nhưng bạn lại không muốn xóa rule đi. Trong trường hợp này, ESLint cho phép bạn **tạm thời tắt*** kiểm tra rule `no-console` trên đoạn code đó (hoặc toàn file đó).

Để làm được điều đó, bạn cần thêm 1 dòng comment nho nhỏ. Khi ESLint quét và thấy dòng comment, ESLint sẽ bỏ qua không check scope đó nữa. Comment có dạng như sau.

```js
/* eslint-disable */
console.log('Code ở đây hoàn toàn không bị check bất kì rule nào')
/* eslint-enable */
```

Nếu bạn chỉ muốn tắt 1 rule cụ thể, chỉ cần chỉ định thêm tên rule là được, ví dụ.

```js
/* eslint-disable no-console */
console.log('Code ở đây hoàn toàn không bị check bất kì rule nào')
/* eslint-enable no-console */
```

## 3. Dùng ESLint tốt hơn

Nếu bạn dùng VSCode, text editor này có một extension tuyệt vời cho Linter. Cài đặt tại đây https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint.

Tiện ích này sẽ tự động tìm file cấu hình Linter trong thư mục project hiện tại, và thực hiện check realtime trên từng file khi bạn đang code. Nhờ đó, bạn có thể nhanh chóng biết được đoạn code mình đang viết có bị vi phạm style guide hay không.

![](https://images.viblo.asia/73e542dc-ea7d-4c78-8663-96d07f06fe59.png)

Như hình trên là khi mình cố tình code sai các rule đã thiết lập. Extension sẽ highlight ngay chính vị trí đó cho mình biết. Không cần thiết phải chạy `npm lint` hoặc `yarn lint` script nữa.

Ngoài ra, ESLint còn có các tính năng khác, như **Lint on save**, **Lint on commit**,... các bạn có thể tìm hiểu thêm.

---

Vậy là phần hai của series ESLint đã hết rồi. Hi vọng hai bài viết của mình sẽ giúp bạn có cái nhìn tổng quan hơn về ESLint, sử dụng ESLint tốt và hiệu quả hơn. Và nếu bạn thấy bài viết hữu ích, đừng chần chừ mà nhấn vote và clip cho mình nhé :heart: