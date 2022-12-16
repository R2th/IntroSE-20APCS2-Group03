### Table of Contents
1. [What does a doctype do?](#_1-what-does-a-doctype-do-0)
1. [How do you serve a page with content in multiple languages?](#_2-how-do-you-serve-a-page-with-content-in-multiple-languages-1)
1. [What kind of things must you be wary of when design or developing for multilingual sites?](#_3-what-kind-of-things-must-you-be-wary-of-when-designing-or-developing-for-multilingual-sites-2)
1. [What are `data-` attributes good for?](#_4-what-are-data--attributes-good-for-3)
1. [Consider HTML5 as an open web platform. What are the building blocks of HTML5?](#_5-consider-html5-as-an-open-web-platform-what-are-the-building-blocks-of-html5-4)
1. [Describe the difference between a `cookie`, `sessionStorage` and `localStorage`.](#_6-describe-the-difference-between-a-cookie-sessionstorage-and-localstorage-5)
1. [Describe the difference between `<script>`, `<script async>` and `<script defer>`.](#_7-describe-the-difference-between-script-script-async-and-script-defer-6)
1. [Why is it generally a good idea to position CSS `<link>`s between `<head></head>` and JS `<script>`s just before `</body>`? Do you know any exceptions?](#_8-why-is-it-generally-a-good-idea-to-position-css-links-between-headhead-and-js-scripts-just-before-body-do-you-know-any-exceptions-7)
1. [What is progressive rendering?](#_9-what-is-progressive-rendering-8)
1. [Why you would use a `srcset` attribute in an image tag? Explain the process the browser uses when evaluating the content of this attribute.](#_10-why-you-would-use-a-srcset-attribute-in-an-image-tag-explain-the-process-the-browser-uses-when-evaluating-the-content-of-this-attribute-9)
1. [Have you used different HTML templating languages before?](#_11-have-you-used-different-html-templating-languages-before-10)

>Trả lời cho các câu hỏi: [Front-end Job Interview Questions - HTML Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/questions/html-questions.md).<br>
>Link tiếng Anh: [HTML Questions](https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/html-questions.md)

*Note: Đây là bài dịch cá nhân nên không tránh khỏi sai sót về ngữ nghĩa, các bạn cảm thấy từ nào mình dịch không tốt thì comment ở dưới để mình sửa và cải thiện bài dịch nhé*

### 1. What does a `DOCTYPE` do?
*DOCTYPE có tác dụng gì?*
<br><br>
`DOCTYPE` là viết tắt của **"document type"**. Nó là một `khai báo` được sử dụng trong HTML để phân biệt giữa chế độ tiêu chuẩn và chế độ [quirks](https://quirks.spec.whatwg.org/#history) (không tiêu chuẩn). Sự hiện diện của nó cho phép trình duyệt hiển thị trang web ở chế độ tiêu chuẩn.

Để sử dụng bạn chỉ cần thêm `<!DOCTYPE html>` tại đầu của trang web của bạn :smile:
<br><br>
###### References

* https://stackoverflow.com/questions/7695044/what-does-doctype-html-do
* https://www.w3.org/QA/Tips/Doctype
* https://quirks.spec.whatwg.org/#history


### 2. How do you serve a page with content in multiple languages?
*Làm thế nào để bạn "phân phát" một trang có nội dung bằng nhiều ngôn ngữ*
<br><br>

Câu hỏi này hơi mơ hồ, mình giả định rằng nó đang hỏi về trường hợp phổ biến nhất, đó là cách phân phát một trang có nội dung bằng nhiều ngôn ngữ, nhưng nội dung trong trang sẽ chỉ được hiển thị bằng một ngôn ngữ nhất quán.

Khi một `HTTP request` được gửi đến máy chủ, người dùng thường gửi thông tin về các tùy chọn ngôn ngữ, chẳng hạn như trong header `Accept-Language`. Sau đó, máy chủ có thể sử dụng thông tin này để trả lại phiên bản của trang bằng ngôn ngữ thích hợp nếu. Code HTML trả về cũng nên khai báo thuộc tính `lang` trong thẻ `<html>`, chẳng hạn như `<html lang = "vi"> ... </ html>`.


Ở phía server, code HTML sẽ chứa các `i18n placeholder`  và các nội dung đa ngôn ngữ cụ thể được lưu trữ trong các định dạng `YML` hoặc `JSON`,.... Máy chủ đó sẽ tự động tạo trang HTML có nội dung bằng ngôn ngữ cụ thể mà người dùng mong muốn, thường là với sự trợ giúp của một `framework`.
<br><br>
###### References

* https://www.w3.org/International/getting-started/language


### 3. What kind of things must you be wary of when designing or developing for multilingual sites?
*Bạn phải thận trọng với những điều gì khi thiết kế hoặc phát triển cho các trang web đa ngôn ngữ?*

* Sử dụng thuộc tính `lang` trong HTML
* Hướng người dùng đến ngôn ngữ mẹ đẻ của họ: Cho phép người dùng dễ dàng thay đổi quốc gia/ngôn ngữ của mình mà không gặp rắc rối.
* Đặt văn bản trong hình ảnh không phải là phương pháp có thể mở rộng: việc này vẫn là cách phổ biến để có phông chữ đẹp, không phụ thuộc vào `font` cũng như thiết bị. Tuy nhiên, để dịch văn bản hình ảnh, mỗi chuỗi văn bản sẽ cần phải có một hình ảnh riêng biệt được tạo cho từng ngôn ngữ. Bất cứ khi nào có nhiều hơn một thay đổi có thể vượt khỏi tầm kiểm soát một cách nhanh chóng.
* Giới hạn từ/độ dài câu: một số nội dung có thể dài hơn khi được viết bằng ngôn ngữ khác. Hãy thận trọng với các vấn đề bố trí hoặc `overflow` trong thiết kế. Vậy nên tốt nhất nên tránh thiết kế nơi mà số lượng văn bản sẽ có thể phá vỡ thiết kế. Số ký tự với những thứ như tiêu đề, nhãn và nút - ít có vấn đề hơn so với văn bản tự do như văn bản hoặc nhận xét.
* Hãy chú ý đến màu sắc được cảm nhận như thế nào: màu sắc được nhận thức khác nhau giữa các ngôn ngữ và văn hóa. Thiết kế nên sử dụng màu sắc phù hợp. Ví dụ: đối với đám cưới, phương tây yêu thích màu trắng còn ở Việt Nam hay các nước phương đông thì thích màu đỏ hơn.
* Định dạng ngày và đơn vị tiền tệ - lịch ngày đôi khi được trình bày theo nhiều cách khác nhau. Ví dụ. "May 31, 2012" ở Hoa Kỳ so với "31 May 2012" ở các phần của Châu Âu.
* Không ghép các chuỗi đã dịch: Không làm bất cứ điều gì như `"The date today is " + date`. Nó sẽ không chính xác trong các ngôn ngữ với thứ tự từ khác nhau. Sử dụng một chuỗi mẫu với tham số cho từng ngôn ngữ thay thế. Ví dụ: hai câu sau bằng tiếng Anh và tiếng Trung: `I will travel on {% date %}` và `{% date%} 我 会 出发`. Lưu ý rằng vị trí của biến khác nhau do các quy tắc ngữ pháp của ngôn ngữ.
* Hướng đọc ngôn ngữ: trong tiếng Anh, chúng ta đọc từ trái sang phải, từ trên xuống dưới, trong tiếng Nhật truyền thống, văn bản được đọc lên-xuống-xuống, từ phải sang trái.
<br><br>
###### References

* https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites


### 4. What are `data-` attributes good for?

Trước khi các framework/thư viện JavaScript trở nên phổ biến, các `front end developers` đã sử dụng các thuộc tính `data-` để lưu trữ dữ liệu phụ trong chính DOM như các thuộc tính bổ sung trong DOM. Nó được dự định để lưu trữ dữ liệu tùy chỉnh `private` cho trang hoặc ứng dụng khi mà không có `attributes` hoặc `elements` thích hợp hơn.

Ngày này, việc sử dụng các thuộc tính `data-` không được khuyến khích. Một lý do là người dùng có thể sửa đổi thuộc tính dữ liệu dễ dàng bằng cách sử dụng `inspect` trong trình duyệt. Trong khi đó, mô hình dữ liệu (data model) được lưu trữ tốt hơn trong chính JavaScript và luôn được cập nhật với DOM thông qua các ràng buộc dữ liệu, bắng cách sử dụng một thư viện hoặc framework.
<br><br>
###### References

* http://html5doctor.com/html5-custom-data-attributes/
* https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes


### 5. Consider HTML5 as an open web platform. What are the building blocks of HTML5?
*Xem xét HTML5 như một nền tảng web mở.  Những gì cấu thành nên HTML5?*

* Ngữ nghĩa (Semantics): Cho phép bạn mô tả chính xác hơn nội dung của bạn.
* Kết nối (Connectivity): Cho phép bạn giao tiếp với máy chủ theo những cách mới và sáng tạo.
* Ngoại tuyến và lưu trữ (Offline and storage): Cho phép các trang web lưu trữ dữ liệu ở phía máy client và hoạt động ngoại tuyến hiệu quả hơn.
* Đa phương tiện (Multimedia): Video và âm thanh hoàn hảo hơn trong `Open Web`.
* Đồ họa và hiệu ứng (2D/3D graphics and effects): Cho phép nhiều tùy chọn trình bày đa dạng hơn.
* Hiệu suất và tích hợp (Performance and integration): Cung cấp việc tối ưu hóa tốc độ và sử dụng phần cứng máy tính tốt hơn.
* Truy cập thiết bị (Device access): Cho phép sử dụng các thiết bị đầu vào và đầu ra khác nhau.
* Styling: Cho phép tác giả viết các chủ đề phức tạp hơn.

###### References

* https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5


### 6. Describe the difference between a `cookie`, `sessionStorage` and `localStorage`.
*Mô tả sự khác biệt giữa `cookie`, `sessionStorage` và `localStorage`.*
<br><br>

Tất cả các công nghệ nêu trên là cơ chế lưu trữ khóa-giá (key-value) trị ở phía client. Chúng chỉ có thể lưu trữ các giá trị dưới dạng chuỗi.
Sự khác biệt được trình bày ở bảng dưới đây. *Bảng này khá là dễ hiểu nên mình không dịch nhé* :smile:

|                                        | `cookie`                                                 | `localStorage` | `sessionStorage` |
| -------------------------------------- | -------------------------------------------------------- | -------------- | ---------------- |
| Initiator                              | Client or server. Server can use `Set-Cookie` header     | Client         | Client           |
| Expiry                                 | Manually set                                             | Forever        | On tab close     |
| Persistent across browser sessions     | Depends on whether expiration is set                     | Yes            | No               |
| Sent to server with every HTTP request | Cookies are automatically being sent via `Cookie` header | No             | No               |
| Capacity (per domain)                  | 4kb                                                      | 5MB            | 5MB              |
| Accessibility                          | Any window                                               | Any window     | Same tab         |

###### References

* https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
* http://tutorial.techaltum.com/local-and-session-storage.html


### 7. Describe the difference between `<script>`, `<script async>` and `<script defer>`.
*Mô tả sự khác biệt giữa `<script>`, `<script async>` và`<script defer>`*

* `<script>`: Quá trình phân tích HTML bị chặn, tập lệnh được tìm nạp và được thực hiện ngay lập tức, cú pháp HTML sẽ tiếp tục phân tích sau khi tập lệnh được thực thi.
* `<script async>`: Tập lệnh sẽ được tìm nạp song song với phân tích cú pháp HTML và được thực thi ngay sau khi nó có sẵn (có khả năng trước khi phân tích cú pháp HTML hoàn thành). Sử dụng async khi tập lệnh độc lập với bất kỳ tập lệnh nào khác trên trang, ví dụ: `analytics`.
* `<script defer>`: Tập lệnh sẽ được tìm, nạp song song với phân tích cú pháp HTML và được thực thi khi trang đã phân tích xong. Nếu có nhiều tập lệnh thì chúng được thực thi theo thứ tự trong tài liệu. Nếu tập lệnh được đặt hoàn toàn trong DOM, thuộc tính `defer` sẽ hữu ích trong việc đảm bảo rằng HTML được phân tích cú pháp đầy đủ trước khi thực thi. Không có nhiều khác biệt trong việc đặt `<script>` bình thường ở cuối `<body>`. `defer` script không được chứa `document.write`.

***Note***: *Lưu ý: Các thuộc tính `async` và `defer` được bỏ qua cho các tập lệnh không có thuộc tính `src`.*
<br><br>
###### References

* http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
* https://stackoverflow.com/questions/10808109/script-tag-async-defer
* https://bitsofco.de/async-vs-defer/


### 8. Why is it generally a good idea to position CSS `<link>`s between `<head></head>` and JS `<script>`s just before `</body>`? Do you know any exceptions?
*Tại sao bạn nên đặt các thẻ CSS `<link>` trong thẻ `<head>` và các thẻ JS `<script>` ngay trước thẻ `</body>`? Bạn có biết bất kỳ ngoại lệ nào không?*
<br><br>
##### Đặt thẻ `<link>` trong thẻ `<head>`
Đặt thẻ `<link>` vào đầu là một phần của đặc tả. Bên cạnh đó, việc đặt ở trên cùng cho phép trang hiển thị dần dần giúp cải thiện trải nghiệm người dùng. Đối với việc đặt các `stylesheets` gần cuối trang, nó sẽ chặn việc hiển thị trong nhiều trình duyệt, bao gồm cả Internet Explorer. Một số trình duyệt chặn hiển thị để tránh phải vẽ lại các  thành phần của trang nếu `styles` của chúng thay đổi. Người dùng bị kẹt lại ở việc xem một trang trắng trống.
<br><br>
##### Đặt thẻ `<script>` ngay trước thẻ `</body>`
Thẻ `<script>` chặn việc phân tích cú pháp HTML trong khi chúng đang được tải xuống và thực thi. Tải xuống các `script` ở dưới cùng sẽ cho phép HTML được phân tích cú pháp và hiển thị cho người dùng trước tiên.

Một ngoại lệ cho việc đặt thẻ `<script>` ở phía dưới là khi `script` của bạn chứa `document.write()`, nhưng ngày nay chúng ta ít sử dụng `document.write()`. Ngoài ra, việc đặt `<script>` ở dưới cùng có nghĩa là trình duyệt không thể bắt đầu tải xuống các script cho đến khi toàn bộ tài liệu được phân tích cú pháp. Một cách giải quyết khác là đặt `<script>` vào `<head>` và sử dụng thuộc tính `defer`.
<br><br>
###### References

* https://developer.yahoo.com/performance/rules.html#css_top


### 9. What is progressive rendering?
*Hiển thị liên tục là gì?*
<br><br>
`Progressive rendering` là tên được đặt cho các kỹ thuật được sử dụng để cải thiện hiệu suất của trang web (cụ thể là cải thiện thời gian tải) để hiển thị nội dung nhanh nhất có thể.

Nó được sử dụng phổ biến hơn nhiều trong những ngày trước khi internet băng thông rộng trở nên phổ biến, nhưng ngày nay nó vẫn được sử dụng khi kết nối dữ liệu di động đang trở nên ngày càng phổ biến.

Ví dụ về các kĩ thuật này:

* Lazy loading of images: Hình ảnh trên trang không được tải cùng lúc. JavaScript sẽ tải ảnh khi người dùng `scroll` tới phần mà hình ảnh được hiển thị.

* Hiển thị ưu tiên (Prioritizing visible content): chỉ bao gồm CSS/nội dung/scripts tối thiểu cần thiết cho một phần của trang để hiển thị trước nhanh nhất có thể, sau đó bạn có thể sử dụng tập `defer script` hoặc lắng nghe sự kiện `DOMContentLoaded/load` để tải các tài nguyên và nội dung khác.

* Các đoạn HTML không đồng bộ (Async HTML fragments): Làm nổi bật các phần của HTML cho trình duyệt khi trang được xây dựng ở backend. Bạn có thể đọc thêm chi tiết về kỹ thuật này tại [đây](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/).
<br><br>
###### References

* https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
* http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/


### 10. Why you would use a `srcset` attribute in an image tag? Explain the process the browser uses when evaluating the content of this attribute.
*Tại sao bạn quyết định sử dụng thuộc tính `srcset` trong thẻ hình ảnh? Giải thích quá trình trình duyệt sử dụng khi đánh giá nội dung của thuộc tính này.*
<br><br>

Bạn sẽ sử dụng thuộc tính `srcset` khi bạn muốn cung cấp các hình ảnh khác nhau cho người dùng tùy thuộc vào độ rộng hiển thị của thiết bị. Cung cấp hình ảnh chất lượng cao hơn cho các thiết bị có màn hình có độ phân giải cao để nâng cao trải nghiệm người dùng. Trong khi đó cung cấp hình ảnh có độ phân giải thấp hơn cho thiết bị cấp thấp để tránh lãng phí (vì sử dụng một hình ảnh lớn hơn sẽ không có bất kỳ sự khác biệt rõ ràng nào).


Ví dụ: đoạn code `<img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w" src="..." alt="">` cho trình duyệt biết khi nào thì hiển thị hình ảnh lớn, trung bình hay nhỏ tùy thuộc vào độ phân giải màn hình của client. Giá trị đầu tiên là tên hình ảnh và thứ hai là chiều rộng của hình ảnh theo pixel. Đối với chiều rộng thiết bị `320px`, các tính toán sau được thực hiện như sau:
* 500 / 320 = 1.5625
* 1000 / 320 = 3.125
* 2000 / 320 = 6.25

Nếu độ phân giải của client là 1x, `1.5625` gần với giá độ phân giải này nhất nên browser sẽ sử dụng ảnh `small.jpg`.

Nếu độ phân giải là 2x (retina), browser sẽ sử dụng độ phân giải lớn hơn gần nhất. Có nghĩa là nó sẽ không chọn `500w` (1.5625) bởi vì nó lớn hơn 1 (2x) and và bức ảnh sẽ bị vỡ khi hiển thị. Browser sẽ chọn ảnh với tỉ lệ lớn hơn 2 ít nhất, đó là 1000w (3.125).


`srcsets` giải quyết các vấn đề khi bạn muốn cung cấp các hình ảnh nhỏ hơn cho các thiết bị màn hình có màn hình nhỏ, vì chúng không cần các hình ảnh lớn như màn hình máy tính để bàn - và bạn cũng có thể tùy ý cung cấp các hình ảnh có độ phân giải khác với màn hình có mật độ điểm ảnh cao/thấp khác nhau.
<br><br>
###### References

* https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
* https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/

**Note:** các bạn có thể tìm đọc bài viết về `srcsets` trên viblo với thông tin chi tiết hơn trong: [Thẻ <picture> và ứng dụng](https://viblo.asia/p/the-picture-va-ung-dung-bWrZn1RYKxw)

### 11. Have you used different HTML templating languages before?
*Bạn đã sử dụng các ngôn ngữ lập trình HTML khác nhau chưa?*
<br><br>
Có, `Pug` (trước đây là `Jade`), `ERB`, `Slim`, `Handlebars`, `Jinja`, `Liquid`. Theo tôi, chúng ít nhiều giống nhau và cung cấp chức năng tương tự như thoát khỏi nội dung và các `filter` hữu ích để thao tác dữ liệu được hiển thị. Hầu hết `templating engine` cho phép bạn thêm vào các `filter` của riêng bạn trong trường hợp bạn cần xử lý/tùy chỉnh dữ liệu trước khi hiển thị.


### Other Answers

* https://neal.codes/blog/front-end-interview-questions-html/
* http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/