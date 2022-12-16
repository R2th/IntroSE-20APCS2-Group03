Gần đây tôi gặp một vấn đề của **jquery validation** trong dự án của mình. Đó là việc các hàm của **jquery validation** không thể hoạt động. Tôi đã mất khá nhiều thời gian để tìm hiểu nguyên nhân gốc của vấn đề. Sau thời gian tìm hiểu cùng với sự gọi ý của những người có kinh nghiệm, tôi đã tìm ra nguyên nhân của lỗi chính là việc load nhiều phiên bản **jquery** trong file bunder của **webpack**. Bài viết này tôi sẽ giúp các bạn giải thích vấn đề cũng như giải pháp cho nó.

# Giải thích nguyên nhân
Dự án tôi thực hiện sử dụng **Laravel**. Trong đó, phần fontend sử dụng **nodejs** và **webpack**. Như các bạn đã biết **webpack** là một bundler rất nổi tiếng và được rất nhiều người sử dụng, với các bạn chưa biết về **webpack** thì thể bắt đầu tìm hiểu ở [đây](https://webpack.js.org/concepts). Đây là tool dùng để build js, minify các file js, image, html, css thành một output duy nhất giúp cho các công việc của fontend trở nên dễ dàng hơn, đồng thời tăng hiệu suất của ứng dụng. Nhược điểm của nó chính là việc config cực kì rối, có nhiều cú pháp xa lạ với lập trình viên dẫn đến khó khăn cho người mới bắt đầu. Tuy nhiên, đối với dự án **Laravel** thì vấn đề này đã được khắc phục với việc dùng thư viện **laravel-mix**. Hầu hết các cấu hình cơ bản đã được **laravel-mix** thực hiện, việc của chúng ta còn lại tương đối đơn giản. Đầu tiên, tôi sẽ giới thiệu các node module được config trong ```package.json```

```json
{
  ...
  "devDependencies": {
    "axios": "^0.17.0",
    "babel-preset-es2017": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "bootstrap": "^3.3.7",
    "cross-env": "^5.1.3",
    "font-awesome": "^4.7.0",
    "jquery": "^3.3.1",
    "laravel-mix": "^1.7.2",
    "less": "^2.7.3",
    "less-loader": "^4.0.6",
    "lodash": "^4.17.5",
    "node-sass": "^4.5.3",
    "vue": "^2.5.13",
    "yarn": "^1.5.1"
  },
  "dependencies": {
    "jquery-validation": "^1.17.0",
    "production": "0.0.2"
  }
}

```
Ở đây, chúng tôi sử dụng ```jquery``` version >=3.3.1, ```jquery-validation``` >=1.17.0.
Tại ```bootstrap.js``` chúng tôi config như sau:

```js
try {
    window.$ = window.jQuery = require('jquery');
} catch (e) {}

require('jquery-validation');

```

Các bạn có thể thấy cả 2 thư viện ```jquery``` và ```jquery-validation``` được ```require```. Trong đó, chúng tôi cũng đã thiết lập các biến global của ```jquery``` để tránh việc conflict với các thư viện khác. Như vậy tất cả những nơi có sử dụng kiểu như ```$(items)```, ```jQuery(iten)``` thì đều được hiểu là ```jquery```.

Trong ```app.js``` chúng tôi có sử dụng một số hàm validate bằng jquery validation như sau:
```js
 jQuery.validator.addMethod("phoneNumber", function(value, element) {
        value = value.replace(/-/g, '');
        if (this.optional(element) || (/^0[1-9][0-9]+$/).test(value)) {
            return true;
        }
        return false;
    }, "Validate message")
```

Sau khi buil bằng webpack và chạy web thì gặp lỗi như thế này:

![](https://images.viblo.asia/107811b2-9dcc-49ae-a904-fd888846d088.png)

Chúng ta có thể hiểu là đối tượng ```jQuery.validator``` đang không tồi tại. Nhưng vì sao đối tượng này lại không tồn tại mặc dù nó đã được require ở ```bootstrap.js```. Đó là vấn đề khó hiểu chúng ta cần lời giải đáp ở đây. Sau khi kiểm tra output của việc build webpack tôi phát hiện ra một điểm là có 2 phiên bản của jquery được load:

Đầu tiên là version **jquery** được config ở ```package.json```:
```js
"./node_modules/jquery/dist/jquery.js":
```

Thứ 2 là phiên bản **jquery** riêng của **jquery validation:**

```js
"./node_modules/jquery-validation/dist/jquery.js":
```

Như vậy có hai phiên bản của jquery được load và có một sự conflict giữa chúng, điều này dẫn đến đối tượng ``` jQuery.validator``` khi thực thi đang được hiểu là đối tượng thuộc **jquery** chứ không phải là của **jquery validation** do vậy nó không hiểu hàm ```addMethod```. Đây chính là nguyên nhân vấn đề mà tôi gặp phải. Với nguyên nhân này, chúng ta cần load một bản **jquery** duy nhất là tương thích với các chức năng đang sử dụng cũng như với **jquery validation**. 

# Giải pháp
### 1. Giải pháp tạm thời
Sử dụng một hack code như bên dưới trong file ```bootstrap.js```:

```js
$(function() {
    window.jQueryValidationHack = require('jquery-validation');
    window.jQuery.validator = window.jQueryValidationHack.validator;
    window.jQuery.fn.validate = window.jQueryValidationHack.fn.validate;
});
```

Vì như đã giải thích ở trên thì đối tượng ```window.jQuery``` luôn được hiểu là thuộc thư viện **jquery**, trong khi đó trong đó **jquery validation** cũng có các đối tượng ```window.jQuery.validator``` hay ```window.jQuery.fn.validate```. Chính vì thế khi có conflict xảy ra thì chúng luôn là ```undefined```. Giải pháp là đặt cho **jquery validation** một định danh khác để không nhầm lẫn với **jquery**. Giải pháp này chỉ là hack code, bởi nguyên nhân gốc là nhiều version **jquery** được load chưa được giải quyết.

### 2. Sử dụng alias trong webpack
Trong **webpack** có một config giúp chúng ta chỉ định một version duy nhất của **jquery** được load. Chúng ta cần xem xét version này đảm bảo có thể hoat động cho tất cả. Trong trường hợp của tôi, tôi đã đưa config trong file ```webpack.mix.js```:
```js
mix.webpackConfig({
    resolve: {
        alias: {
           jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js')
        }
    }
});
```
Với config này tất cả các đối tượng **jquery** dùng trong dự án đều ánh xạ đến thư viện được thiết lập ở mục alias và sẽ không còn vấn đề conflict nào còn xảy ra nữa. Tôi đã áp dụng cách này và mọi thứ hoạt động tốt. Vì vậy tôi vote cho giải pháp này.

### 3. Dùng thẻ script thông thường cho jquery 
Đơn giản để tránh việc load nhiều lần trong **webpack** chúng ta đưa chúng ra thẻ script như trước đây. Tôi không khuyến khích phương án này vì nó làm chậm performace do có thêm request tài nguyên.
Hơn nữa nó cũng là cách làm đi ngược với xu thế phát triển.

```
<script scr="./node_modules/jquery/dist/jquery.js"></script>
<script scr="./node_modules/jquery-validation/dist/jquery-validation.min.js""></script>
```

# Tổng kết
Bài viết này tôi đã giải thích nguyên nhân và giải pháp khắc phục khi có sự xung đột giữa các phiên bản jquery dẫn đến lỗi của jquery validation. Hy vọng điều này sẽ giúp ích được các bạn gặp vấn đề tương tự. Các bạn có thể tìm hiểu thêm một số giải pháp ở tài liệu tham khảo dưới đây, ngoài ba giải pháp tôi đã trình bày ở trên tôi chưa thử các giải pháp còn lại. Chúc các bạn thành công.

Tham khảo:
- [How to avoid jQuery multiple loading with webpack](https://qiita.com/shin-szk-engineering/items/91a8bf2274000005e405)
- [Managing jQuery plugin dependency in webpack](https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack)