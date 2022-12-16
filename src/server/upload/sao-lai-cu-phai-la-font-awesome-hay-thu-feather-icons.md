**Nếu bạn tìm kiếm trên Google về icon cho web thì sẽ có vô số kết quả, mà nổi tiếng nhất có lẽ là Font Awesome. Về Font Awesome thì không cần phải nói quá nhiều vì thư viện này có sẵn rất nhiều icon, support cho nhiều nền tảng khác nhau. Nhưng bên cạnh những ưu điểm thì Font Awesome cũng có nhiều nhược điểm ví dụ như: có dung lượng khá lớn, ngoài những icon miễn phí thì bạn sẽ phải mua nếu muốn sử dụng những icon trả phí khác...**

Và nếu bạn lần đầu sử dụng icon fonts cho trang web của mình, nếu không yêu cầu quá nhiều icons, dung lượng nhỏ, và quan trọng nhất là hoàn toàn miễn phí, thì bạn hãy xem qua [Feather Icons](https://feather.netlify.com/). 

Khi xem danh sách các icons của Feather Icons thì cảm giác đầu tiên đem lại cho mình là nhìn khá thân thiện về mặt design, rất gọn gàng và có 1 chút gì đó rất "sạch sẽ", đơn giản nhưng tinh tế.

### Bắt đầu

Hãy bắt đầu với 1 ví dụ trên [Codepen](https://codepen.io/pen?template=WOJZdM) để thấy rằng Feather Icons dễ sử dụng như thế nào.
Hoặc có thể copy và paste đoạn code này vào tài liệu HTML của bạn và chạy thử:

```
<!DOCTYPE html>
<html lang="en">
  <title></title>
  <script src="https://unpkg.com/feather-icons"></script>
  <body>

    <!-- example icon -->
    <i data-feather="circle"></i>

    <script>
      feather.replace()
    </script>
  </body>
</html>
```

### Sử dụng
Về bản chất, Feather là một tập hợp các file SVG. Điều này có nghĩa rằng bạn có thể sử dụng các icon của Feather Icons trong tất cả các cách mà bạn có thể sử dụng file SVGs (ví dụ như img, background-image, inline, object, embed, iframe). Các bạn có thể xem thêm bài viết chi tiết về các cách có thể sử dụng SVG trên web ở [đây](https://svgontheweb.com/#implementation).

Sau đây là những cách bổ sung mà bạn có thể sử dụng Feather Icons trong website của mình.

#### Client-side JavaScript

##### 1. Cài đặt

> *Lưu ý: Nếu bạn có ý định sử dụng Feather thông qua CDN, bạn có thể bỏ qua bước cài đặt này.*


Cài đặt thông qua npm.

> `npm install feather-icons --save`

Hoặc chỉ cần copy 1 trong 2 file `feather.js` hoặc `feather.min.js` vào thư mục project của bạn.


##### 2. Include
Include file `feather.js` hoặc file `feather.min.js` vào source bằng thẻ `<script>`:

>```<script src="path/to/dist/feather.js"></script>```


> Lưu ý: file `feather.js` và `feather.min.js` thường ở trong thư mục `node_modules` nếu bạn cài nó thông qua `npm`.

Hoặc bạn có thể load trực tiếp thông qua CDN

```
<script src="https://unpkg.com/feather-icons"></script>
<script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
```
Sau khi include file script, bây giờ bạn có thể sử dụng các icon của Feather Icons ở mọi nơi trong project của mình.

##### 3. Sử dụng
Để sử dụng một icon bất kỳ trên trang của bạn, hãy thêm một `data-feather` thuộc tính có tên biểu tượng vào một element bất kỳ:

> `<i data-feather="circle"></i>`

Xem danh sách đầy đủ các icons tại [Feathericons.com](https://feathericons.com/).


##### 4. Replace
Gọi phương thức feather.replace():

```
<script>
  feather.replace()
</script>
```

Tất cả các element có thuộc tính `data-feather` sẽ được thay thế bằng code SVG tương ứng với `data-feather` đó. Xem [tài liệu tham khảo API ](https://github.com/feathericons/feather#api-reference) để biết thêm thông tin về phương thức `feather.replace()`.

Trên đây mình đã giới thiệu qua cho các bạn thư viện Feather Icons và cách sử dụng nó trong projects như thế nào. Các bạn có thể tìm hiểu thêm về thư viện Feather Icons ở [đây](https://github.com/feathericons/feather#feather) nhé.

À, có lẽ là 1 thiếu sót lớn với bất kỳ thư viện nào mà không hỗ trợ cho ReactJS. Vì vậy, Feather Icons cũng có phiên bản dành riêng cho ReactJS, các bạn có thể tham khảo ở [đây](https://github.com/carmelopullara/react-feather).

Cảm ơn các bạn đã theo dõi bài viết, xin chào và hẹn gặp lại.