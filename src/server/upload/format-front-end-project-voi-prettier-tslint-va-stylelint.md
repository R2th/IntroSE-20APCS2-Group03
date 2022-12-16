# Lời mở đầu

Khi thực hiện bất cứ dự án nào, dù là back-end hay front-end thì format code luôn là một tiêu chuẩn chất lượng không thể bỏ qua. Nó luôn nằm trong checklist khi review code. Điều này giúp code dễ đọc và dễ maintain hơn. Chính vì thế mà các IDE luôn có chức năng auto format code. Thế nhưng với các dự án front-end, ít khi phải sử dụng đến cái IDE chuyên dụng thì việc thống nhất một tiêu chuẩn format code cần phải được cân nhắc. Như mình thích dùng VScode, còn bạn mình thì lại dùng IntelliJ hay Webstorm. Và với các ngôn ngữ front-end khác nhau thì thường là có format khác nhau. Đôi khi mình review code, thường xuyên gặp các trường hợp không thống nhất chẳng hạn như lệnh if chỉ có một lệnh thì có cần đặt trong ngoặc nhọn hay không. Hoặc các đơn vị kích thước nào nên được sử dụng trong css file (pixel, em, rem...)

Để giải quyết việc thống nhất format thì tất nhiên không thể nào bằng cách thủ công được rồi, việc này cần phải được thực hiện một cách tự động. Và sau đây làm một số tool phổ biến trong việc format code rất đáng sử dụng trong các front-end project.

# Prettier

Trang chủ: https://prettier.io/

Theo mô tả từ trang chủ thì 

* Prettier là một trình định dạng mã (An opinionated code formatter)
* Hỗ trợ nhiều ngôn ngữ như JavaScript, JSX, Angular, Vue, Flow, TypeScript, CSS, Less, và SCSS, HTML, JSON, GraphQL, Markdown và YAML.
* Tích hợp với hầu hết các trình biên dịch
* Dễ dàng sử dụng chỉ với một vài thiết lập

Một lí do không thể không sử dụng Prettier là nó sinh ra để đáp ứng tất cả các checklist hiện có. Về cơ bản, chức năng chính của prettier là phân tích code của bạn, sau đó tái cấu trúc theo một số quy tắt riêng. Nó sẽ xóa bỏ code cũ và thay thế nó bằng những dòng code đúng định dạng mong muốn. Với prettier, bạn chỉ cần code và không cần quan tâm đến code format. Bạn có thể format code ngay trobg lúc code, hoặc sau khi đã lưu file.

## Hướng dẫn cài đặt và sử dụng

1. Cài đặt Prettier: rất đơn giản với npm

`npm install --save-dev prettier` hay ngắn gọn hơn `npm i -D prettier`

2. Định nghĩa các quy tắc
Về cơ bản thì Prettier cung cấp rất nhiều quy tắc về định dạng, bên cạnh đó thì mình rất lười và chẳng muốn thay đổi những gì mặc định của nó. Cứ để thế mà dùng thì cũng rất là OK tuy nhiên để tỏ ra chuyên nghiệp một tí thì cũng cần một file config để chỉ rõ một số quy tắc và thêm mới sau này. Tạo file`.prettierrc.json`, để nó ngang cấp với file `package.json` và đặt một số quy tắc mẫu như sau:

```
{
  "tabWidth": 2,
  "singleQuote": true
}
```

Quy tắc trên quy định độ rộng của 1 tab và chỉ sử dụng singleQuote (`'   '`) trong project của bạn.

3. Thực thi

Prettier cũng cung cấp các extension nên các bạn cũng có thể cài đặt và sử dụng nó realtime. Tuy nhiên, nếu không thích cài extension thì bạn có thể tạo một npm script để thực thi. Trong file `package.json`, phần script, thêm vào nội dung bên dưới

```
"prettier": "prettier --write src/**/*.{js,tsx,scss}"
"prettier:check": "prettier --list-different src/**/*.{js,tsx,scss}"
```

Chỉ cần nhìn thôi cũng đủ hiểu nó làm gì rồi ha. Và bây giờ bạn chỉ cần chạy lệnh ` npm run prettier`  để format lại tất cả các file của mình rồi (như lệnh trên thì là các file js, tsx, scss trong folder src nhé)

Quá đơn giản phải không.

# Linter: ESLint, TSLint...

Mặc dù khá là thần thánh nhưng Prettier chỉ góp phần duy trì code format chứ không thể kiểm soát code quality được. Ví dụ Prettier không thể xử lý các trường hợp như 

* kiểm tra biến khai báo nhưng không được sử dụng
* kiểm tra  khai báo biến bằng let hay const
* kiểm tra lệnh console.log có nằm trong code

Với những quy tắc nâng cao như thế này thì chỉ Prettier là không đủ. Và tất nhiên chúng ta không muốn phải kiểm tra nó bằng manual. Rất may mắn Linter là giải pháp hoản hảo cho chúng ta.

Linter phổ biến nhất hẳn là ESLint, tuy nhiên đối với các project sử dụng typescript thì TSLint là một lựa chọn không thể bỏ qua

trang chủ ESLint: https://eslint.org/
trang chủ TSLint: https://palantir.github.io/tslint/

Gần đây mình chỉ sử dụng TSLint nên mình sẽ giới thiệu qua về nó nhé. Mô tả từ trang chủ

> TSLint is an extensible static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors. It is widely supported across modern editors & build systems and can be customized with your own lint rules, configurations, and formatters.

TSLint có thể sử dụng để format code nhưng Prettier làm điều này tốt hơn nên mình hay dùng TSLint để đặt các quy tắc về chất lượng code.

## Hướng dẫn cài đặt và sử dụng

1. Cài đặt TSLint: cũng rất đơn giản với npm

`npm i -D tslint`


2. Định nghĩa các quy tắc

Cũng tương tự với Prettier, ta tạo file `tslint.json` như sau

```
{
  "rules": {
    "object-literal-sort-keys": false,
    "quotemark": [true, "single", "jsx-double"],
  },
  "rulesDirectory": []
}
```

Bạn có thể thỏa mái thêm, xóa các rules phù hợp với dự án của bạn. Để hiểu hơn về config rule thì có thể xem tại đây https://palantir.github.io/tslint/rules/
Bên cạnh đó bạn có thể thêm config sau để thiêt lập mức độ nghiêm trọng khi vi phạm rule. 

`"defaultSeverity": "error"`

Mình hay để là error để bắt buộc việc chỉnh sửa phải được thực hiện. Play by the rules of the project.

Lưu ý một điều là các quy tắc ở tslint không nên conflict với quy tắc ở Prettier. Chẳng hạn việc sử dụng quotemark thì cần phải thống nhất là sử dụng single quote hay double quote.

3. Thực thi

Thêm script sau vào `package.json`

```
"tslint:check": "tslint -c tslint.json 'src/**/*.{ts,tsx}'"
```

Để sử dụng bạn chỉ cần chạy `npm run tslint:check`. Bên cạnh đó bạn cũng có thể cài đặt extension để có thể chạy realtime.

# StyleLint

Đã bao giờ bạn review một CSS và cảm giác bực bội vì những gì viết trong đó chưa. Các đơn vị kích thước không thống nhất, lúc thế này lúc thế kia, rồi kiểu trình bày giữa các class parent rồi đến child mà không có dấu enter... Mình biết là viết CSS thực sự không cần dùng nhiều chất xám lắm và việc format nó cũng không cần thiết nhưng mà việc thống nhất trình bày một file CSS cũng nên lắm luôn. Do đó, ta cũng cần một tool chuyên để format các file CSS. Đó không phải là Prettier, không phải là ESLint hay TSLing, mà đó là StyleLine. Từ khi mình biết đến StyleLine, không bao giờ mình cần tìm thêm một thứ gì khác để format css file nữa.

Trang chủ https://stylelint.io/ mô tả StyleLine như sau.

> A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.

Ngắn gọn súc tích. . Bên cạnh đó việc mở rộng và override cũng rất dễ dàng. Chi tiết như sau.

## Hướng dẫn cài đặt và sử dụng

1. Cài đặt StyleLint: 

`npm i -D stylelint`

StyleLine còn cung cấp một số lượng lớn các quy tắc định dạng cơ bản mà bạn dễ dàng cài đặt và sử dụng. Chỉ cần cài đặt và enjoy 

`npm i -D stylelint-config-recommended`

2. Định nghĩa các quy tắc

Vì đã cài các base rule của StyleLint, nên ta chỉ cần tạo file `.stylelintrc.json` với config đơn giản như sau

```
{
  "extends": "stylelint-config-recommended"
}
```

Bạn có thể xem danh sách các rule được cung cấp ở đây https://stylelint.io/user-guide/rules/list. Nếu muốn thêm hay chỉnh sửa bất cứ quy tắc nào, đừng ngại mà thêm nó vào file `.stylelintrc.json`. Chẳng hạn như

```
{
  "extends": "stylelint-config-recommended",
  "rules": {
    "at-rule-no-unknown": [ true, {
      "ignoreAtRules": [
        "extends"
      ]
    }],
    "block-no-empty": null,
    "unit-whitelist": ["em", "rem", "s"]
  }
}
```


3. Thực thi

Thêm script sau vào `package.json`

```
"stylelint:check": "stylelint \"src/**/*.css\""
```

Để sử dụng bạn chỉ cần chạy `npm run stylelint:check`. Ngoài ta mình cũng khuyến khích các bạn cài đặt extension để sử dụng.


# Pre-commit git hooks

Một điều để đảm bảo chắc rằng bạn đã thực thi các tool trên trước bất cứ commit nào được tạo ra. Việc quên chạy này chạy kia hoàn toàn là tự nhiên và để đảm bảo điều này, ta cần sử dụng git hooks và NPM đã có một thư viện tuyệt vời cho vấn đề này. Đó là pre-commit. Bạn có thể xem nó ở đây https://www.npmjs.com/package/pre-commit

pre-commit cho phép bạn thực hiện run npm script trước khi thực hiện commit. Khi script được thực thi và có lỗi xảy ra, việc commit sẽ không xảy ra. Điều này cực kì hữu ích để chắc chắn rằng Prettier, TSLint và StyleLint đã được thực thi, tránh việc quên và push lên bad code. Nếu bạn để ý thì mình có tạo script `prettier:check` nhưng chưa thực thi thì nó được để dành cho giai đoạn này đây. Hehee.

## Hướng dẫn cài đặt và sử dụng

1. Cài đặt StyleLint: 

`npm i -D pre-commit`

2.  Chỉ định script cần thực thi

Trước khi thực thi pre-commit, ta cần chỉ định script nào cần chạy. Mặc dù có thể  thực hiện nhiều script nhưng mình thường gom lại thành 1 lệnh như thế nào ở `package,json`

```
"lint-check-all": "npm run prettier:check && npm run tslint:check && npm run stylelint:check"
```

Với script này thì chúng ta có thể check tuần tự Prettier, TSLint và StyleLint. Việc cuối cùng là chỉ định trong pre-commit ở `package,json`

```
 "pre-commit": [
    "lint-check-all"
  ],
```

và bây giờ bất cứ commit nào được thực hiện thì pre-commit thì Prettier, TSlint và StyleLint sẽ check source code của bạn xem có bất cứ vi phạm nào không. Nếu có lỗi xãy ra, việc commit sẽ được hủy và bạn cần chỉnh sửa lại source của mình trước khi commit lần nữa.

# Lời kết

Hi vọng qua bài viết này, các bạn mới làm quen với front-end  (như mình :D) sẽ có thể bước đầu format code cho bộ source của mình nhìn đẹp code và "xịn" hơn nhé. Ngoài ra vì là mới làm quen nên không tránh khỏi có sai sót trong bài viết này, mình rất mong nhận được nhiều đóng góp cũng như chia sẻ tip từ các bạn!