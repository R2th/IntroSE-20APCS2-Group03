> Bài viết gốc: https://manhhomienbienthuy.github.io/2018/05/20/tai-sao-nen-su-dung-eslint-cho-du-an.html (đã xin phép tác giả :D)

JavaScript đã trở thành một ngôn ngữ cực kỳ phổ biến trong lập trình web.  Gần như bất cứ lập trình viên web nào cũng đều phải biết code JavaScript.  Thế nhưng biết là một chuyện, code tốt lại là chuyện khác.  Trong bài viết này, tôi sẽ giới thiệu một công cụ giúp chúng ta code JavaScript tốt hơn, đó chính là ESLint.

# Mở đầu

Hiện nay JavaScript đã có những phát triển rất xa so với những thế hệ ban đầu, khi mà những đặc tả [ES2015](https://www.ecma-international.org/ecma-262/6.0/) (ECMAScript 2015 - ES6) và [ES2017](https://www.ecma-international.org/ecma-262/8.0/) được công bố.  Đặc biệt, rất nhiều thư viện của JavaScript như [ReactJS](https://reactjs.org/), [AngularJS](https://angularjs.org/), [VueJS](https://vuejs.org/), v.v...  giúp chúng ta có thể xây dựng những ứng dụng web cực kỳ cool.

Mặc dù có những đặc tả kỹ thuật như vậy, nhưng việc code JavaScript hiện nay vẫn còn rất nhiều vấn đề.  Vì vậy, việc đảm bảo chất lượng của code JavaScript vẫn luôn là một thách thức lớn.

Có rất nhiều yếu tốt để tạo ra một project tốt như: cấu trúc thư mục rõ ràng, README đầy đủ thông tin, có hướng dẫn set up cũng như build, test.  Và yếu tố quan trọng nhất của một project tốt phải là code dễ đọc, dễ hiểu và dễ bảo trì.

Để đảm bảo những yếu tố đó, sức người không thể làm hết được.  Đó là lúc chúng ta cần đến các công cụ lint.

# Lint là gì?

Muốn project có code đủ tốt thì ngay từ ban đầu cần xây dựng những coding convention để mọi người tuân theo.  Coding convention thường không giúp code chạy nhanh hơn, nhưng nó giúp duy trì code dễ đọc hơn.

Tôi đã trải qua một số project, và thực sự việc dùng con người để đảm bảo coding convention là không tưởng vì công việc quá nhiều.  Mà, ngay cả con người cũng có lúc sai sót, có thể bỏ qua lỗi này, lỗi kia nếu nó nhỏ trong lúc review.  Vì vậy, việc đảm bảo coding convention bằng các công cụ tự động là tốt nhất.

Những việc có tính chất cố định như vậy, máy tính luôn làm tốt hơn con người.  Kết quả vừa chính xác, vừa nhanh chóng, các developer sẽ có thời gian hơn trong việc sáng tạo và viết code cho các chức năng chứ không phải đi soi mói người khác chấm phẩy đã đúng chưa.  Công cụ giúp chúng ta làm việc này gọi là các công cụ lint (linter).

Lint là những công cụ giúp chúng ta phân tích code, từ đó đưa ra các vấn đề mà code đang gặp phải như không tuân thủ coding style, sai coding convention.  Ngoài ra, lint còn có thể giúp chúng ta tìm ra một số bug tiềm ẩn trong code như gán biến chưa khai báo, có thể gây lỗi runtime hoặc lấy giá trị từ một biến toàn cục khiến cho việc debug trở nên khó khăn, v.v...

Lint của thể khiến một vài người cảm thấy đau đầu khi mới làm quen, nhưng nó sẽ giúp code rõ ràng hơn.  Dần dần, khi trình tăng lên rồi, lint sẽ là một trợ thử rất đắc lực.

# Tại sao lại là JavaScript

Nếu bạn là một người code [NodeJS](https://nodejs.org/en/) thì không có gì phải bàn cãi rồi.  JavaScript chính là ngôn ngữ được sử dụng chủ yếu, nên chúng ta cần linter cho nó là đương nhiên.

Ở đây, tôi muốn nói đến các dự án phát triển web khác, nơi mà rất nhiều ngôn ngữ khác nhau được sử dụng, từ backend (Ruby, PHP, Python, v.v...) cho đến frontend (HTML, JavaScript, SCSS, v.v...)

Trong một dự án, tất cả các ngôn ngữ, kể cả HTML và CSS đều phải tuân theo quy tắc thì mới có thể tạo nên một project tốt được.  Không có quy tắc, mọi người code theo những phong cách rất khác nhau sẽ tạo nên một mớ hỗ độn mà người ngoài nhìn vào sẽ chẳng hiểu gì (thậm chí họ còn chẳng muốn đọc).

Tuy nhiên, trong nội dung bài viết này, đề cập đến tất cả các ngôn ngữ chính là JavaScript.  JavaScript có thể không phải là ngôn ngữ quan trọng nhất của dự án, nhưng tôi có thể chắn rằng, nó là ngôn ngữ cần linter nhất.

Nguyên nhân đến từ chính bản thân ngôn ngữ.  JavaScript có một thiết kế tồi, cú pháp của nó là sự pha tạp của Java và C++, lại trộn lẫn nhiều đặc điểm của các ngôn ngữ script như Ruby, Python.

Chưa kể, ngôn ngữ này được support trên các trình duyệt khác nhau lại rất khác nhau.  Mỗi trình duyệt sử dụng một engine riêng nên có nhiều hàm chạy được trên trình duyệt này lại không chạy được trên trình duyệt khác.  Chắc hẳn ai trong số chúng ta cũng đã từng gặp ác mộng với Internet Explorer.  Để code có thể chạy trên nhiều trình duyệt, gần như bắt buộc là code sẽ phải có những code thừa ngoài logic.

Vì sự pha tạp trong cú pháp, JavaScript tồn tại rất nhiều vấn đề.  Bạn có thể tham khảo thêm [ở đây](http://johnkpaul.github.io/presentations/empirejs/javascript-bad-parts/). ES2015 được công bố chỉ giúp làm giảm bớt các vấn đề của nó chứ không thể loại bỏ hoàn toàn.  Chưa nói đến hiệu năng các thứ, ngay cả cú pháp của nó khiến nó rất "mềm dẻo".  Chúng ta có thể thêm dấu cách, ngắt dòng tuỳ ý, khiến cho nó là ngôn ngữ có thể code theo nhiều kiểu nhất trong một project.

Vì vậy, khi project tiến triển theo thời gian, code sẽ tăng dần lên mỗi ngày, mỗi developer lại có những phong cách, ý thích khác nhau khi code, thậm chí cùng một người mà nay code một kiểu, mai lại code một kiểu, khiến JavaScript trở thành ngôn ngữ khó đồng nhất thuộc loại bậc nhất trong một project.

Ngay cả khi đã có coding convention, hai người code cùng một logic vẫn có thể cho ra những code trông "chẳng liên quan" gì đến nhau.

Một yếu tố khiến JavaScript khó có thể duy trì tính thống nhất trong cách code đến từ chính con người.  Phần lớn các full stack developer mà tôi biết chỉ mạnh về backend, họ có kỹ năng về frontend nhưng so với backend thì đúng là một trời một vực.  Hơn nữa, frontend lại là phần dễ bị xem nhẹ trong project, do mọi người tập trung nhiều vào performance, tối ưu code, database, v.v... hơn.

Gần đây, nhất là sau sự xuất hiện của ReactJS khiến JavaScript ngày càng có vai trò quan trọng hơn trong dự án.  Thay vì chỉ là một phần nhỏ, hỗ trợ vài hiệu ứng cho trang đẹp hơn, nay JavaScript đã đảm nhận hoàn toàn phần "hiển thị" của trang.  Nhất là nhiều dự án, phần frontend chỉ còn JavaScript và CSS, HTML thuần hầu như không còn được sử dụng.

Với những dự án như vậy, việc lint JavaScript lại càng cần thiết hơn bao giờ hết.

# Tại sao chọn ESLint?

Có rất nhiều công cụ lint JavaScript khác nhau: [ESLint](https://eslint.org/), [JSLint](https://www.jslint.com/), [JSHint](http://jshint.com/).

Có một [bài so sánh](https://www.sitepoint.com/comparison-javascript-linting-tools/) các công cụ này, các bạn có thể đọc tham khảo.  Có thể tóm tắt các công cụ như sau: JSLint rất gò bó, không cho chúng ta tuỳ chỉnh theo ý mình, JSHint thiếu các cơ chế mở rộng, JSCS thỉ thích hợp để check coding style.

Và cuối cùng ESLint là công cụ hài hoà nhất, là lựa chọn tốt nhất cho các project.  Nó cho phép chúng ta tuỳ chỉnh cầu hình theo coding convention của mình, kiểm tra coding style và tìm ra các bug cũng như các vấn đề tiềm ẩn khác.

ESLint lại càng là lựa chọn cực kỳ thích hợp nếu chúng ta sử dụng ES2015 cũng như JSX (của React).  Trong số tất cả các linter, nó là công cụ hỗ trợ ES2015 JSX tốt nhất và là công cụ duy nhất hiện nay hỗ trợ JSX.

Tất nhiên là nhiều tính năng hơn thì đồng nghĩa với việc nó sẽ chạy chậm hơn.  Vì vậy, trong một số dự án nó có thể không phải công cụ thích hợp nhất.  Tuy nhiên, ý kiến cá nhân của tôi là, nó phù hợp với gần hết, nên cứ dùng cũng không sao đâu.

# Cài đặt và cấu hình ESLint

ESLint có thể được cài đặt thông qua `npm` đơn giản như sau

```console
$ npm install --save-dev eslint
```

Không nhất thiết phải code NodeJS bạn mới cần sử dụng node và npm. Rất nhiều dự án đã sử dụng các package của node để build các thành phần của frontend.  Thế nên, có lẽ tôi không cần phải nói thêm về npm nữa, nếu chưa rõ, bạn có thể tham khảo thêm [ở đây](https://www.npmjs.com/get-npm).

Ngoài ra, ESLint còn cho phép chúng ta sử dụng các plugin để mở rộng hoạt động của nó.  Ví dụ, tôi code ReactJS trong dự án của mình, tôi cần cài thêm plugin sau để ESLint có thể support cho nó:

```console
$ npm install --save-dev eslint-plugin-react
```

Một linter tốt chỉ có thể hoạt động nếu chúng ta config nó đúng mà thôi.  Nếu không, thay vì phục vụ việc nâng cao chất lượng code của chúng ta, nó lại trở thành một trở ngại khi liên tục đưa ra lỗi cho những chỗ dở hơi.

ESLint là công cụ rất mềm dẻo, cho phép chúng ta có thể cấu hình nó rất dễ dàng.  Mọi thứ liên quan đến coding convention đều có thể cấu hình được.  Có hai cách để config cho ESLint, cách đầu tiên là comment trực tiếp vào code JavaScript.  Kiểu như thế này:

```javascript
/* eslint quotes: ["error", "double"], curly: 2 */
```

Cách này có một nhược điểm là mỗi file, chúng ta lại phải config một lần, mà nhiều khi lượng comment này là rất lớn do chúng ta cần config nhiều thứ khác nhau trong convention.  Vì vậy cách hiệu quả hơn là sử dụng một file config chung áp dụng cho toàn bộ dự án.  Nhưng chúng ta vẫn có thể sử dụng comment trong một vài file nếu những file đó bắt buộc phải code khác quy tắc chung.

ESLint sử dụng một [file config](https://eslint.org/docs/user-guide/configuring#configuration-file-formats), có tên là `.eslintrc.*`, phần mở rộng có thể là `js`, `yaml`, `yml`, `json` tương ứng với format của file đó, hoặc ghi trực tiếp config vào file [`package.json`](https://docs.npmjs.com/files/package.json).

Cá nhân tôi thích sử dụng JSON, nên tôi sẽ cấu hình ESLint trong file `.eslintrc.json`.  Sử dụng `package.json` luôn cho tiện cũng được, nhưng như vậy sẽ làm file đó phình to ra không cần thiết, nên tôi nghĩ là nên dùng file riêng thì tốt hơn.

File config cho ESLint có những thành phần chính như sau:

**`plugins`**

Đây là những [plugin](https://eslint.org/docs/user-guide/configuring#using-the-configuration-from-a-plugin) được sử dụng để mở rộng hoạt động của ESLint.  Ví dụ ESLint không hỗ trợ kiểm tra cú pháp JSX thần thánh, thì bắt buộc chúng ta phải sử dụng plugin để kiểm tra các code đó.

```json
{
  "plugins": [
      "react"
  ],
  ...
}
```

**`extends`**

Đây là những config có sẵn được sử dụng, chúng ta sẽ mở rộng chúng bằng cách thêm vào những config của riêng mình.  ESLint có một cơ chế khá hay cho phép chúng ta "dùng lại" cấu hình của người khác.  Ví dụ tôi muốn sử dụng cấu hình có sẵn `eslint:recommended` (tích hợp sẵn trong eslint), và `react/recommended` (tích hợp sẵn trong plugin) thì tôi config như sau:

```json
{
    ...
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    ...
}
```

Tương tự như vậy, chúng ta có thể sử dụng cấu hình của mọi người nếu chúng ta cảm thấy phù hợp, ví dụ [`strongloop`](https://github.com/strongloop/eslint-config-strongloop) chẳng hạn.  Chúng ta có thể cài đặt package tương ứng và `extends` nó thôi.  Lưu ý rằng, chúng ta nên tìm hiểu kỹ về những cấu hình có sẵn này, nhiều khi chúng rất tiện, nhưng không phù hợp thì cũng không nên dùng, kể cả những cấu hình "recommended".

**`rules`**

Đây là chính là phần config những quy tắc mà code cần phải tuân theo. Có nhiều rules đã được config sẵn khi chúng ta `extends` một cấu hình nào đó thì không cần config lại nữa.  Ở đây, chúng ta chỉ cần config thêm những rules mà chúng ta cần tuỳ chỉnh mà thôi.

Mỗi rules cần được [config](https://eslint.org/docs/user-guide/configuring#configuring-rules) hai thông số: giá trị ứng với mức độ áp dụng rules (`off`, `warn`, `error` hoặc `0`, `1`, `2` cho ngắn gọn) và các tuỳ chọn.  Rules ở đây có thể là rules do ESLint cung cấp sẵn hoặc rules của plugin.

Ví dụ, rules sau yêu cầu áp dụng single quote `'` cho các string trong code, và kiểm tra việc import `React` có đúng hay không, nếu không sẽ báo lỗi với exit code là 1.

```json
{
    ...
    "rules": {
        "quotes": [
            2,
            "single"
        ],
        "react/jsx-uses-react": 2,
        ...
    }
    ...
}
```

Lượng rules mà ESLint support là rất lớn, gần như toàn bộ các yếu tố của code đều được support cả, chưa kể plugin còn mở rộng hơn nữa.  Bạn có thể xem toàn bộ rules của ESLint [ở đây](https://eslint.org/docs/rules/).

**`parserOptions`**

Mặc định, ESLint kiểm tra cú pháp của ES5, nếu sử dụng ES6 hoặc các phiên bản mới hơn, chúng ta phải cấu hình bằng [`parserOptions`](https://eslint.org/docs/user-guide/configuring#specifying-parser-options). Ngoài ra, việc support JSX cũng cần phải cấu hình ở đây.  Cấu hình toàn bộ cho phần này như sau:

```json
{
    ...
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    ...
}
```

**`env`**

Đây là nơi cấu hình [môi trường](https://eslint.org/docs/user-guide/configuring#specifying-environments) mà code của chúng ta sẽ chạy.  Môi trường khác nhau thì sẽ có những biến toàn cục khác nhau.  Ví dụ, môi trường `browser` thì sẽ có các biến như `window`, `document`, môi trường `es6` sẽ có một số loại dữ liệu mới như `Set` chẳng hạn.

```json
{
    ...
    "env": {
        "browser": true,
        "es6": true
    },
    ...
}
```

**`globals`**

Đây là nơi chúng ta đưa ra danh sách các biến global dùng trong dự án. Nếu không, khi chúng ta truy cập vào một biến nào đó, ESLint sẽ báo lỗi vì truy cập đến một biến chưa được định nghĩa.

Biến global có thể được định nghĩa bằng comment trong chính file cũng được, hoặc list toàn bộ ở trong file config cũng được.

Một số biến global không cần định nghĩa lại (như `window`, `document`) nếu `env` đã giúp định nghĩa nó rồi.

JavaScript có một object chứa dữ liệu được truyền vào cho hàm là [`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) mà không thấy môi trường nào định nghĩa nó.  Nếu muốn sử dụng object này, chúng ta phải đưa nó vào trong `globals` của config.

```json
{
    ...
    "globals": {
        "arguments": true,
        ...
    }
}
```

Ngoài những phần chính như đã trình bày, ESLint còn rất nhiều config khác.  Bạn tham khảo thêm [ở đây](https://eslint.org/docs/user-guide/configuring) để biết thêm chi tiết về việc tuỳ chỉnh ESLint theo đúng ý của mình.

**Example**

Dưới đây là toàn bộ cấu hình của ESLint mà tôi đang sử dụng để lint code React (Redux).

```json
{
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "indent": [
            2,
            2,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "quotes": [
            2,
            "single"
        ],
        "semi": [
            2,
            "always"
        ],
        "curly": [
            2,
            "all"
        ],
        "camelcase": [
            2,
            {
                "properties": "always"
            }
        ],
        "eqeqeq": [
            2,
            "smart"
        ],
        "one-var-declaration-per-line": [
            2,
            "always"
        ],
        "new-cap": 2,
        "no-case-declarations": 0
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "arguments": true
    }
}
```

# Áp dụng ESLint vào dự án

Sau khi đã config cho ESLint xong xuôi, công việc còn lại của chúng ta là áp dụng nó vào dự án, làm nó hoạt động đúng như chức năng của một linter.

Trước hết, chúng ta cần thêm vào một script để gọi sau này như sau (file `package.json`):

```json
{
    ...
    "scripts": {
        "eslint": "eslint path/to/src",
        ...
    }
    ...
}
```

Việc sử dụng script nào phụ thuộc vào từng project.  Nếu là một project NodeJS thì chúng ta có thể dùng script `preset` hoặc `posttest`, để ESLint được chạy tự động mỗi khi gọi unit test.  Với project web thông thường thì có thể đặt tên script sao cho dễ nhớ là được.

Sau khi có script rồi thì mỗi khi cần gọi ESLint, chúng ta chỉ cần đơn giản:

```console
$ npm run eslint

> package@1.0.0 eslint /absolute/path/to/package
> eslint --fix path/to/src


/absolute/path/to/file.js
   14:8   error  'moment' is defined but never used       no-unused-vars
  163:30  error  'states' is missing in props validation  react/prop-types

✖ 2 problems (2 errors, 0 warnings)
```

Nếu chưa sử dụng linter lần nào, hoặc với những người ít kinh nghiệm, có thể mỗi lần chạy lint sẽ là một (vài) trang màn hình đầy lỗi.  Với người yếu tâm lý có thể bị shock và chán nản không muốn code gì nữa.

Rất may với ESLint, họ đã giúp chúng ta giải quyết (một phần) vấn đề. ESLint có thể tự động sửa một vài lỗi tự động với cách thêm option `--fix`, chúng ta có thể thêm option này vào ngay script ở trên, hoặc gọi nó bằng tay

```
$ npm run eslint -- --fix
```

ESLint có thể sữa rất nhiều lỗi, nhưng không thể sửa hết được.  Nó chỉ có thể sữa những code nào mà đảm bảo không ảnh hưởng đến hoạt động mà thôi.  Tuy nhiên, nó đã giúp đỡ chúng ta rất nhiều, ít nhất thì số lượng lỗi đã giảm đáng kể, nhìn vào sẽ thấy có tương lai hơn.

Nếu muốn một công cụ sữa lỗi mạnh hơn, bạn có thể sử dụng `prettier` ([tham khảo](https://prettier.io/)).  Đây là công cụ chuyên về format code nên nó mạnh hơn ESLint trong việc sữa lỗi.  Sử dụng kết hợp ESLint và prettier sẽ cho kết quả rất tốt (dù không thể sữa hết 100% lỗi được).

# Tự động hoá mọi việc

Phần trên, tôi đã trình bày cách áp dụng ESLint vào dự án, bằng cách gõ lệnh mỗi khi cần.  Một ngày mà phải gõ cùng một lệnh hàng chục lần thì đúng là chán không thể tả, ít nhất là đối với tôi.  Vì vậy, nếu có một phương thức tự động hoá mọi việc thì thật là hoàn hảo.

Sau khi tìm hiểu thì tôi đã tìm ra một cách, đó là sử dụng [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) `pre-commit`.  Sử dụng git hook sẽ giúp chúng ta chạy ESLint mỗi khi commit.  Nếu đã từng sử dụng git hook `pre-commit` rồi thì bạn chỉ cần sửa file `.git/hooks/pre-commit` nữa là xong, nếu không thì chúng ta cần tạo ra file đó.

Cách dễ dàng nhất là sử dụng file mẫu cho chính git cung cấp:

```console
$ cp .git/hooks/pre-commit.sample .git/hooks/pre-commit
```

Nội dung file sẽ có hai dòng cuối như sau:

```
# If there are whitespace errors, print the offending file names and fail.
exec git diff-index --check --cached $against --
```

Chúng ta sẽ thêm lệnh gọi ESLint như sau:

```
set -e
npm run eslint

# If there are whitespace errors, print the offending file names and fail.
exec git diff-index --check --cached $against --
```

Vậy là giờ đây, mỗi lần commit, ESLint sẽ được gọi, hoàn toàn tự động:

```console
$ git commit -m "WIP"

> package@1.0.0 eslint /absolute/path/to/package
> eslint --fix path/to/src

[develop 1f0402978] WIP
 1 file changed, 3 insertions(+), 3 deletions(-)
```

Ngoài ra, có thể chúng ta vẫn sử dụng [`watchify`](https://github.com/browserify/watchify) để theo dõi những thay đổi trong code và tự động build lại.  Tuy nhiên, `watchify` thì rất khó để gọi ESLint mỗi khi thay đổi.  Nếu muốn, chúng ta phải chuyển sang sử dụng các công cụ build khác kiểu như [`gulp`](https://gulpjs.com/) hoặc [`grunt`](https://gruntjs.com/).

Hai công cụ này cho phép chúng ta tuỳ chỉnh rất nhiều, chúng có cơ chế cho phép chạy nhiều hơn một task khi có file thay đổi.  Nhược điểm là watchify có cơ chế cache khiến việc build code khi có thay đổi nhanh hơn rất nhiều, sử dụng `gulp` hay `grunt` việc build code sẽ luôn luôn là thực hiện lại từ đầu nên mất nhiều thời gian hơn.  (Mặc dù vậy, cơ chế cache của `watchify` lại gặp một số vấn đề khi thêm, xoá bớt file.)

Một công cụ khác mới nổi là [`webpack`](https://webpack.js.org/) cũng cho phép chúng ta sử dụng gọi eslint rất tiện, bằng cách sử dụng [`eslint-loader`](https://github.com/webpack-contrib/eslint-loader).

Việc config những công cụ này là một vấn đề khác, nằm ngoài phạm vi bài viết này nên tôi sẽ không trình bày nhiều ở đây.  Lưu ý rằng, khác với việc sử dụng git hook, việc sử dụng những công cụ này sẽ áp dụng cơ chế tự động hoá với toàn bộ dự án, dù nó rất tốt nhưng không phải ai cũng thích điều đó.  Nên nếu muốn áp dụng, bạn nên tìm sự thống nhất ý kiến với các đồng nghiệp.

# Kết luận

ESLint là một công cụ tuyệt vời, hãy sử dụng thường xuyên.  Hy vọng bài viết sẽ giúp ích phần nào cho các bạn và các bạn code càng ngày càng đẹp hơn.