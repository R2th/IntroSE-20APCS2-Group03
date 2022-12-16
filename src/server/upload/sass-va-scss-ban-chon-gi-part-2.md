Tiếp nối bài viết [SASS và SCSS- Bạn chọn gì? (Part 1)](https://viblo.asia/posts/gAm5yR1XKdb/edit), hôm nay chúng ta hãy cùng xem cụ thể những ưu điểm của từng phương pháp. Mình tìm được một [bài viết](http://thesassway.com/editorial/sass-vs-scss-which-syntax-is-better) khá hay, xin phép được dịch và chia sẻ lại (có vấn đề gì mọi người góp ý giúp mình với)
# Ưu điểm của Sass:
### 1: Cú pháp của Sass ngắn gọn, đơn giản hơn:
Thật vậy, cú pháp thụt lề của Sass đã lược bỏ đi cặp dấu `{}` và `;`. Ngoài ra, nó cũng không yêu cầu sử dụng `@include` để khai báo và sử dụng mixin, thay vào đó là sử dụng `+`. Như vậy, việc viết code sẽ ngắn gọn hơn rất nhiều, đơn giản và dễ đọc hơn.
### 2: Cú pháp của Sass dễ đọc hơn:
Với những quy tắc về thụt lề, Sass bắt buộc bạn phải viết theo cùng một kiểu với những yêu cầu nghiêm ngặt, không có bất cứ tùy chọn nào để có thể tạo ra phong cách viết code của chính bạn. Điều này nghe có vẻ gò bó, nhưng khi làm việc với một đội, bạn sẽ thấy nó tuyệt vời thế nào: mọi người đều tuân theo một quy tắc, do đó bạn có thể dễ dàng đọc hiểu code của người khác như chính code của mình vậy.
### 3: Sass không "than phiền" về việc thiếu dấu chấm phẩy (; semi-colon):
Bạn sẽ không cần phải gõ **semi-colons** sau mỗi cặp **attribute/value** nữa mà Sass vẫn đảm bảo rằng kết quả trả về chính xác. Điều này sẽ loại bỏ việc code của bạn không chạy chỉ vì thiếu dấu `;`
![](https://images.viblo.asia/3bd10311-db60-4cba-a5df-b79193cf7e89.png)
# Ưu điểm của Scss:
### 1: SCSS is more expressive:
Bạn có thể tùy chọn viết một vài cặp **attribute/value** trên cùng một dòng (thông thường thì mỗi cặp sẽ nằm trên một dòng). Khi bạn chỉ có một hoặc hai cặp **attribute/value** thì cấu trúc nén này sẽ rất hữu ích.

Với cách này, bạn có thể rút ngắn một đoạn code dài ở Sass chỉ còn vài dòng ở Scss. Ở Scss, bạn có thể rút ngắn số dòng code cho thuận tiện và mở rộng ra thành nhiều dòng khi phải làm những phần phức tạp.

### 2: Nhiều tools hỗ trợ CSS cũng làm việc được với SCSS:
Ví dụ như tool highlight syntax: tùy thuộc vào trình biên dịch code khác nhau, có thể có hoặc không hỗ trợ cú pháp thụt lề của Sass. Nhưng phần lớn trình biên dịch đều hỗ trợ CSS và sẽ làm việc tốt với SCSS, nhưng khá ít  cái hỗ trợ cho cú pháp của Sass.
### 3: Dễ dàng tích hợp với phần code CSS cũ:
Khi xây dựng một website, việc tích hợp code CSS thường xuyên xảy ra. Và với việc khác nhau về cú pháp, quá trình chuyển đổi từ CSS sang Sass và ngược lại sẽ tốn rất nhiều thời gian. Kể cả khi sử dụng các tools hỗ trợ chuyển đổi Sass thì cũng không thể chuyển đổi được hoàn toàn.

Còn đối với Scss, sự khác biệt là khá nhỏ nên việc tích hợp lại với code Css cũ hay thư viện sẽ dễ dàng hơn. 
### 4: SCSS dễ dàng làm quen và sử dụng hơn:
Nhận xét một cách công bằng, việc thuyết phục ai đó sử dụng Scss sẽ dễ dàng hơn là Sass. So với việc sử dụng cú pháp mới hoàn toàn (Sass) thì việc chỉ giới thiệu một vài khái niệm mới (Scss) sẽ dễ dàng hơn rất nhiều.

Bản thân con người rất thận trọng trước những thay đổi, vì vậy việc Scss gần giống với Css là một lợi thế lớn của Scss.
### 5: SCSS có thể sẽ trở thành phiên bản tiếp theo của CSS:
Từ khi Sass ra đời, nó đã thu hút được sự chú ý của rất nhiều người. Một số người đã nghĩ về việc thêm những tính năng của Sass vào CSS. Và rất có thể những cú pháp được giới thiệu trong Scss sẽ trở thành phiên bản **CSS4**!
# Cài đặt và sử dụng Sass:
### Sử dụng cửa sổ dòng lệnh (command-line)
**Cài đặt độc lập:**
Bạn có thể cài đặt Sass trên Windows, Mac hoặc Linux bằng cách tải các gói từ GitHub và thêm vào đường dẫn. Với cách này, bạn sẽ không cần phải cài đặt bất kì phần mềm nào khác.

**Sử dụng npm để cài đặt:** Nếu bạn đang sử dụng Node.js, bạn cũng có thể sử dụng npm để cài đặt gói Sass với câu lệnh:

`npm install -g sass`
### Sử dụng ứng dụng:
Nếu như không quen hoặc không muốn sử dụng **cmd**, bạn cũng có thể sử dụng các ứng dụng với  giao diện dễ sử dụng, thân thiện với người dùng. Có rất nhiều ứng dụng cho bạn lựa chọn từ thu phí đến open source, hỗ trợ trên nhiều hệ điều hành Mac, Linux, Windows. Ví dụ:


| App Name | Type | 
| -------- | -------- |
| [CodeKit](https://codekitapp.com/)    | Paid     | 
| [Compass.app ](http://compass.kkbox.com/)    | Paid, Open Source     | 
| [Ghostlab](http://www.vanamco.com/ghostlab/)    | Paid     | 
| [Koala](http://koala-app.com/)     | Open Source     | 
| [Prepros](https://prepros.io/)     | Paid     | 
| [Scout-App](http://scout-app.io/)    | Free, Open Source    | 

Mình thì dùng **cmd** chứ không dùng app nhưng thấy có vẻ nhiều người lựa chọn sử dụng [Koala](http://koala-app.com/) 

## Chuyển Sass/Scss thành file Css:
Sau khi cài đặt xong, ta có thể kiểm tra phiên bản bằng câu lệnh `sass --version` hoặc tìm hiểu tất cả các câu lệnh liên quan bằng `sass --help`.

![](https://images.viblo.asia/ffe2ab69-6547-4346-b734-9eeed41e9e53.png)

Vậy là đã cài đặt thành công, bây giờ khi muốn biên dịch một file .sass hay .scss thành file .css thì chỉ cần thực hiện câu lệnh:

`sass 'path_file_sass/scss'  'path_file_css'`


# Viết thế nào để đạt chuẩn Framgia-CI
   - Các thuộc tính cha con theo "Quy tắc xếp chồng" chúng ta nên chỉ dùng cho 3 cấp thuộc tính chồng nhau.
   - Khoảng cách từ selector đến dấu ngoặc nhọn mở "{" phải có 1 khoảng trắng.
   - Khoảng cách từ tên thuộc tinh đến giá trị thuộc tính phải có 1 khoảng trắng.
   - Có một dòng trắng giữa 2 blocks.
   - Các thuộc tính trong một khối phải được sắp xếp theo bảng chữ cái.
   - Tên selector chỉ chứa các ký tự a-z, -, 0-9.
   - Giá trị thuộc tính là none chuyển thành 0 (trừ display).
# Kết:
Với 2 bài viết về Sass, hy vọng rằng mình đã cung cấp được những thông tin cơ bản giúp các bạn làm quen và sử dụng Sass/Scss. Nếu cần tìm hiểu sâu hơn thì các bạn nên vào [trang chủ](https://sass-lang.com/) để xem document, mình thấy cũng khá dễ đọc và tìm hiểu.

Mong rằng bài viết sẽ được các bạn đón nhận và góp ý thật nhiều để mình có thể có những bài viết chất lượng hơn. Cảm ơn các bạn rất nhiều!

# Tài liệu tham khảo:
Ưu điểm của Sass và Scss: http://thesassway.com/editorial/sass-vs-scss-which-syntax-is-better

Chuẩn Framgia CI: https://viblo.asia/p/sass-dung-sao-cho-chuan-ci-3-de-Eb85oEm6Z2G

Function https://viblo.asia/p/code-css-chuyen-nghiep-va-don-gian-hon-voi-sass-phan-2-eW65Gopj5DO

So sánh cú pháp Sass và Scss: https://sass-lang.com/guide