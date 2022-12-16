Khi một trình duyệt đọc một tài liệu HTML, trình duyệt đọc nó từ trên xuống dưới và từ trái sang phải. Các thẻ HTML được sử dụng để tạo các tài liệu HTML và hiển thị thuộc tính của chúng. Mỗi thẻ HTML có các thuộc tính khác nhau. Thẻ HTML chứa ba phần chính: thẻ mở, nội dung và thẻ đóng. 

![](https://images.viblo.asia/4a01c26b-4020-4088-8134-033e94107470.png)

Với đa số các thẻ HTML thì cần thẻ đóng, và như bạn biết… cái gì trên đời này cũng có ngoại lệ và có một số thẻ ngoại lệ đó là nó không có thẻ đóng, mình hay gọi là thẻ tự đóng.
## 1.  Bắt đầu với Self-Closing Tag

Câu chuyện về thẻ tự đóng không mấy thú vị khi bạn chưa quan tâm tới nó. Thẻ tự đóng có liên quan đến những cách mà HTML đã được phát triển trong suốt quá trình sử dụng từ cuối những năm 1980. Thẻ HTML thông thường có thẻ mở và thẻ đóng như bạn đã biết. Tuy nhiên, có các phần tử trong HTML được gọi là các phần tử void, chẳng hạn như hình ảnh và liên kết, không yêu cầu nghiêm ngặt các thẻ đóng vì cấu trúc vốn có của chúng. Và chắc là như thế nên các chuyên gia cho rằng những thứ như hình ảnh và liên kết không cần và không thể có nội dung - chúng chỉ là loại con trỏ đến một yếu tố được cài đặt trong trang.

![](https://images.viblo.asia/86403cfc-1d96-4417-9808-8b1019580c7c.png)

Trong các biến thể gần đây hơn của HTML, chẳng hạn như XHTML, thay vì bao gồm các thẻ mở và đóng riêng lẻ, các nhà phát triển sử dụng thẻ tự đóng có thêm ký tự / : 
<br />
Ví dụ: 
```html
<img src = "img / circle" alt = "" />
```

Bây giờ, với HTML5, ngay cả ký tự gạch chéo đó cũng bị coi là lỗi thời. Các quy tắc W3C và các tiêu chuẩn khác cho thấy rằng các nhà phát triển không còn cần phải bao gồm ký tự để chỉ ra thẻ đóng, bởi vì người ta hiểu rằng các phần tử void đó không cần bất kỳ thẻ đóng nào.

## 2. Một số thẻ tự đóng

![](https://images.viblo.asia/7869449c-188e-4e03-bdbc-55dabc433033.png)

Trong HTML hay HTML5 mới nhất thì đây là một số thẻ mà mình tìm được và nghĩ rằng là nó là cá biệt, dị biệt hay cách gọi khác là cá tính:
- **<area >**: Là một thẻ khá dị có chức năng là định vị khu vực cho một cái ảnh.
- **&lt;base&gt;**: Một thẻ quy định đường dẫn tương đối cho toàn bộ file HTML. (Đặt nó trong thẻ head và nó phải là duy nhất).
- **&lt;br&gt;** : Là một thẻ xuống hàng.
- **&lt;col&gt;** : Chỉ định thuộc tính cho mỗi cột.
- **&lt;command&gt;**: Người dùng có thể gõ lệnh để thực hiện. (Tiếc là chưa thằng browser nào hỗ trợ cả)
- **&lt;embed&gt;**: Nhúng flash hay ứng dụng gì đó bên ngoài vào.
- **&lt;hr&gt; - (horizontal rule)**: Một dấu gạch ngang.
- **&lt;img&gt;**: Nhúng một ảnh thông qua thuộc tính src.
- **&lt;input&gt;**: Nó là input, vậy đó. :sweat_smile:
- **&lt;keygen&gt;**: Định nghĩa khoá mã hoá đi kèm với một trường trong form (key-pair).
- **&lt;source&gt;**: Định nghĩa các nguồn đa phương tiện cho các phần tử đa phương tiên như <video> và <audio>
- **&lt;link&gt;**: Xác định mối quan hệ giữa một tài liệu và một nguồn lực bên ngoài (thường được sử dụng để liên kết đến style sheets).
- **&lt;meta&gt;**: Định nghĩa siêu dữ liệu về một tài liệu HTML.
- **&lt;param&gt;**: Xác định tham số của plugins là object hay video gì đó.
- **&lt;track&gt;**: Định nghĩa nội dung mô tả như chú thích, bình luận, hoặc các loại văn bản khác cho các tập tin đa phương tiện (<video> và <audio>)
- **&lt;wbr&gt;**: Vị trí ngắt hàng tuỳ chỉnh. Quy định đoạn nội dung có thể xuống dòng để tránh hỏng giao diện.
    
> Cái gì cũng có bất quy tắc và đây là bất quy tắc của HTML.

## 3. Lưu ý với các thẻ đóng
Luôn sử dụng thẻ đóng là điều cần thiết không sợ lỗi thời. Trong HTML5, bạn không cần sử dụng thẻ đóng cho tất cả các thẻ ví dụ như các thẻ trên nhưng khuyến khích bạn nên sử dụng thẻ đóng.
Bạn có thể tùy ý đóng những thẻ rỗng (thẻ rỗng là những thẻ không có thẻ đóng) và đâu cũng có nguyên do của nó vì:
- Dấu gạch chéo (/) là bắt buộc nếu bạn sử dụng thẻ trong XHTML và XML.
- Nếu bạn muốn những phần mềm đọc XML có thể hiểu được trang của bạn, tốt nhất là hãy sử dụng cách đóng thẻ.

Cảm ơn bạn đã dành thời gian đọc bài viết!