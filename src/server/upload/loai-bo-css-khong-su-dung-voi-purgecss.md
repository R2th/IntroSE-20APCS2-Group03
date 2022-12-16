# I. Giới thiệu.
Bài trước mình có chia sẻ về freeze để cải thiện hiệu suất cho vue.js. Với freeze mọi người có thể làm tăng hiệu suất thông qua việc không cho vue theo giõi sự thay đổi của dữ liệu. Hôm nay mình giới thiệu một cách cải thiện hiệu suất cũng rất hay đó là loại bỏ tất cả các tập tin JS CSS mà chúng ta không sử dụng đến trong ứng của mình.

Đây là cách khá hay và hữu ích nhưng lại ít được để tâm tới.

Đối với CSS, việc loại bỏ css rất quan trọng khi chúng ta sử dụng các thư viện lớn như Bootstrap, Bulma hoặc Tailwind, những thư viện này thường khá nặng nên còn gì tuyệt hơn nếu chúng ta tối giản được nó cho ứng dụng của mình.

# II. Tại sao phải loại bỏ css không sử dụng.

## 1. CSS không sử dụng là gì?

Người lập trình viết giao diện theo cách nó cần hỗ trợ cho hầu kết các kiểu website như blog, WooCommerce, diễn đàn, vân vân.

Tất cả các kiểu website này có thể cần một số thành phần HTML (với các biến thể của riêng chúng), chẳng hạn như:

* Typography (kiểu chữ)
* Icons
* Bảng biểu
* Form và Nút bấm (button)
* Widgets (ví dụ bài viết gần đây, bài xem nhiều, lượt xem)
* Thanh điều hướng (navigation bar)
* WooCommerce (dành cho các trang thương mại điện tử)
* Hộp tác giả (thường ở cuối bài viết để cung cấp thêm thông tin về tác giả bài viết)
* Thanh tìm kiếm (mặc định của WP hoặc plugin hoặc app của bên thứ ba như Google)
* Bình luận
* Galleries
* Các nút mạng xã hội (như nút like, share)
* Danh sách này cứ kéo dài mãi…

99% thời gian, các nhà phát triển giao diện viết mọi mã CSS họ cần vào trong file duy nhất có tên style.css. Dù bạn có sử dụng hay không, người dùng của bạn sẽ phải nhận CSS cho tất cả các phần tử (element).

## 2. Nếu bạn không sử dụng tất cả các phần tử này thì sao?
Trong blog của tôi, tôi không cần WooCommerce, bình luận (vì tôi sử dụng ứng dụng của bên thứ ba là Disqus), và nhiều thành phần tương tự khác. Ngoài ra, một số thành phần như bảng, form, hộp tác giả, nút chia sẻ chỉ cần trong trang dạng post, không cần thiết trong trang chủ.

Vâng, đây chính là “CSS không sử dụng”.

P/S: Không chỉ có các giao diện, các plugin cũng có thể chèn (injecting) nhiều CSS bên ngoài vào.

## 3. Tại sao việc loại bỏ CSS không sử dụng lại rất khó?
Các class động
Bạn có thể nghe nói về critical CSS. Nó là những CSS quan trọng cần thiết cho việc render nội dung thuộc màn hình đầu tiên (above the fold). Phần CSS còn lại sẽ được tải trong chân trang (footer) để loại bỏ CSS chặn hiển thị. Có một số công cụ và plugin giúp trích xuất critical CSS trong vue.js.

Dù vậy thì việc trích xuất “CSS không sử dụng” không dễ dàng như việc trích xuất critical CSS. Lý do nằm ở chỗ file JS có thể chèn thêm class CSS khi có thao tác click vào button hoặc hành động tương tác nào đó.

Khi bạn thử click vào icon tìm kiếm trên phần đầu blog của tôi, một div và class mới sẽ được chèn thêm vào bằng JavaScript.

Class CSS cần thiết cho các hiệu ứng này nằm trong JavaScript và rất khó để tìm thấy tên những class đó. Trường hợp tương tự cũng xảy ra với trang giỏ hàng (cart page), các trang bắt buộc phải đăng nhập (account restricted pages), vân vân.

## 4. Phương pháp tách mã (code-splitting)
Một cách tiếp cận để làm giảm CSS không sử dụng trong giao diện đó là chia file CSS lớn style.css thành nhiều file nhỏ như base.css, form.css, typography.css, table.css, comment.css, vân vân và chèn các file cần thiết trong các trang tương ứng (tức là trang cần CSS nào thì chèn CSS đó vào, các trang không cần thì không chèn). Đây là một cách được dùng khá nhiểu trong vue.js mà có lẽ các bạn không hay để ý. Thế còn với các thư viện thì chúng ta có thời gian để chia không khi mà hầu hết các thử viện hỗ chợ css đều viết chung vào một file. Đây là lúc cần đến những module để giải quyết mọi chuyện dễ dàng hơn. Với vua đó là purgerCSS, đây là module mình thấy dễ dùng và rất hiệu quả.


# III. PurgeCSS có thể làm được gì.

PurgeCSS là một công cụ dùng để loại bỏ CSS không sử dụng.Bạn nên xem nó là một phần của quy trình phát triển ứng dụng của mình.  Khi bạn đang xây dựng một trang web, bạn có thể quyết định sử dụng thư viện CSS như TailwindCSS, Bootstrap, MaterializeCSS, Foundation, v.v ... Nhưng bạn sẽ chỉ sử dụng được một phần nhỏ và sẽ còn rất nhiều kiểu CSS không được sử dụng  tới.

Đây là lúc PurgeCSS phát huy tác dụng. PurgeCSS phân tích nội dung của bạn và các tệp css của bạn. Sau đó, nó so sánh với các file  được sử dụng trong các tệp của thư viện bạn dùng. Nó loại bỏ các đoạn css không được bạn sử dụng ra khỏi file, dẫn đến các tệp css nhỏ hơn.

Ví dụ, trang web của VueDose được xây dựng trên Nuxt (được tạo tĩnh) bằng Tailwind và nó sử dụng PurgeCSS để tối ưu hóa CSS được tạo.

Nếu tôi tắt PurgeCSS, bạn có thể thấy rằng file css lúc này khá lớn 485 KB :
![](https://images.viblo.asia/2da34f80-47a4-45ad-8314-3569f405a0f5.png)



Trong khi nếu tôi kích hoạt nó, nó sẽ giảm xuống 16 KB :

![](https://images.viblo.asia/f143e000-cbb7-4480-84ca-058c402c75c5.png)


Cấu hình PurgeCSS có thể khác nhau trong mỗi dự án. Nó có thể được đặt làm plugin webpack hoặc plugin postcss.

Trong trường hợp của VueDose, tôi đang sử dụng nó như một plugin postcss. Vì vậy, tôi có một postcss.config.jstập tin với nội dung này:
```php
const purgecss = require("@fullhuman/postcss-purgecss");

const plugins = [...];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    purgecss({
      content: [
        "./layouts/**/*.vue",
        "./components/**/*.vue",
        "./pages/**/*.vue"
      ],
      whitelist: ["html", "body"],
      whitelistPatternsChildren: [/^token/, /^pre/, /^code/],
    })
  );
}

module.exports = { plugins };
```
Về cơ bản, tất cả những gì bạn cần là cho biết nơi cần tìm file css để so sánh bằng cách sử dụng thuộc tính content.

Ngoaif ra bạn có thể chọn các danh sách trắng để ngăn PurgeCSS xóa chúng khỏi CSS của bạn. Điều này có thể được thực hiện với các tùy chọn PurgeCSS whitelist, whitelistPatterns, whitelistPatternsChildren, hoặc trực tiếp trong CSS của bạn bằng cách dụng comment đặc biệt như dưới đây.

```php
/* purgecss start ignore */
h1 {
  color: blue;
}

h3 {
  color: green;
}
/* purgecss end ignore */

h4 {
  color: purple;
}

/* purgecss start ignore */
h5 {
  color: pink;
}

h6 {
  color: lightcoral;
}

/* purgecss end ignore */
```


Mọi người có thể tham khảo  toàn bộ postcss.config.js tệp cho VueDose có nội dung như dưới đây:
```php
const join = require("path").join;
const tailwindJS = join(__dirname, "tailwind.js");
const purgecss = require("@fullhuman/postcss-purgecss");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

const plugins = [require("tailwindcss")(tailwindJS), require("autoprefixer")];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    purgecss({
      content: [
        "./layouts/**/*.vue",
        "./components/**/*.vue",
        "./pages/**/*.vue"
      ],
      whitelist: ["html", "body"],
      whitelistPatternsChildren: [/^token/, /^pre/, /^code/],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["html", "vue"]
        }
      ]
    })
  );
}

module.exports = {
  plugins
};
```

Bên trên mình cũng đã giới thiệu qua về purgeCSS và hiệu quả mà nó mang lại. Còn muốn hiểu rõ hơn về module này thì các bạn có thể vào thẳng doc để đọc cho hiệu quả. Mình thấy họ viết cũng rất rõ ràng và dễ hiểu.

https://purgecss.com/
# IV. Kết.
Vỉ chỉ là những bài viết chia sẻ những thứ hay ho của vue.js mà mình tìm hiểu được nên bài viết khá ngắn gọn. Chủ yếu đưa ra giải pháp để mọi người có key để tìm kiếm cách giải quyết. Giống như bài trên mục đích mình cũng chỉ muốn chia sẻ vể purgeCSS một module mình thấy rất là hay và nên được sử dụng cho bất kì dự án nào.

Cuối cùng thì không thể thiếu link mà mình tình cờ đọc được về purgeCSS: https://vuedose.tips/tips/remove-unused-css-with-purge-css