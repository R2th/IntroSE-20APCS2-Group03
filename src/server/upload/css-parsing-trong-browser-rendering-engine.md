Như chúng ta đã biết, CSS parsing là 1 bước trong việc chuyển đổi data từ response thành dữ liệu render trên page của rendering engine.

Một tệp HTML điển hình với một số CSS sẽ có kiểu được liên kết như hình dưới đây:

```
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
</head>
<body>
    
</body>
</html>
```

Trong khi browser nhận các byte dữ liệu thô và bắt đầu quá trình xây dựng DOM, nó cũng sẽ đưa ra yêu cầu tìm các file định nghĩa styles main.css được liên kết. Ngay sau khi trình duyệt bắt đầu phân tích cú pháp HTML, khi tìm thấy thẻ liên kết đến tệp CSS, nó sẽ đồng thời đưa ra request để lấy thông tin các file css về.

Nói qua 1 tẹo về phần HTML parsing để tạo ra các DOM.

![](https://images.viblo.asia/2fc4e8db-05c5-4d3d-8d62-416ba692c9ae.jpg)

DOM là browser's internal representation của trình duyệt về trang cũng như cấu trúc dữ liệu và API mà nhà phát triển web có thể tương tác thông qua JavaScript.

Có DOM là không đủ để biết trang sẽ trông như thế nào vì chúng ta có thể tạo kiểu cho các phần tử trang trong CSS. Luồng chính phân tích cú pháp CSS và xác định kiểu tính toán cho mỗi nút DOM. Đây là thông tin về loại kiểu được áp dụng cho từng phần tử dựa trên bộ chọn CSS

### From raw bytes of CSS to CSSOM

Một quá trình tương tự với các data của HTML cũng được bắt đầu khi trình duyệt nhận được các data của CSS.

Nói cách khác, các dữ liệu thô được chuyển đổi thành các ký tự, sau đó được mã hóa. Các nút cũng được hình thành, và cuối cùng, một cấu render structure được hình thành.

Tree structure là gì? Hầu hết mọi người đều biết có một thứ gọi là DOM. Theo cách tương tự, cũng có một cấu trúc cây CSS được gọi là Mô hình đối tượng CSS (CSSOM).

Trình duyệt không thể hoạt động với các dữ liệu thô của HTML hoặc CSS. Điều này phải được chuyển đổi thành một dạng mà nó nhận ra - và đó là những tree structure.

![](https://images.viblo.asia/b8fbb189-31eb-4075-b300-2e39ffd7eeeb.jpg)

![](https://images.viblo.asia/4d3cd9eb-f2e6-4fb3-b511-805b414621a5.png)

Ngay cả khi bạn không cung cấp bất kỳ CSS nào, mỗi nút DOM đều có một kiểu tính toán. Thẻ `<h1>` được hiển thị lớn hơn thẻ `<h2>` và lề được xác định cho từng phần tử. Điều này là do trình duyệt có một biểu định kiểu mặc định.

### Render tree construction

Trong khi DOM tree đang được xây dựng, trình duyệt sẽ xây dựng một tree khác, render tree. Tree này là các yếu tố hình ảnh theo thứ tự mà chúng sẽ được hiển thị. Mục đích của tree này là cho phép paint các nội dung theo đúng thứ tự của chúng.

Firefox gọi các phần tử trong render tree là `frames`. WebKit sử dụng thuật ngữ `term render` hoặt `render object`.

Một render object biết cách bố trí và vẽ chính nó và các child của nó.

Lớp RenderObject của WebKit, lớp cơ sở của trình kết xuất, có định nghĩa sau:

```
class RenderObject{
  virtual void layout();
  virtual void paint(PaintInfo);
  virtual void rect repaintRect();
  Node* node;  //the DOM node
  RenderStyle* style;  // the computed style
  RenderLayer* containgLayer; //the containing z-index layer
}
```

Ta có thể hình dung rõ hơn render tree liên hệ với DOM tree qua hình vẽ sau:

![](https://images.viblo.asia/95758d2f-37d7-4b5c-935b-f474eccba605.png)

### Layout

Bây giờ quá trình render đã biết cấu trúc của một document và các styles cho mỗi nodes, nhưng điều đó là không đủ để render một trang. Hãy tưởng tượng bạn đang cố gắng mô tả một bức tranh cho bạn bè của mình qua điện thoại. "Có một hình tròn lớn màu đỏ và một hình vuông nhỏ màu xanh lam" không đủ thông tin để bạn của bạn biết chính xác bức tranh sẽ như thế nào.

![](https://images.viblo.asia/530c5d54-f90a-46cd-95c1-3e76c534c4fe.png)

Layout process là một quá trình để tìm dạng hình học của các thành phần. Main thread đi qua DOM và các style được tính toán và tạo render tree structure có thông tin như tọa độ x y và kích thước hộp giới hạn. Render tree structure có thể có cấu trúc tương tự như DOM tree, nhưng nó chỉ chứa thông tin liên quan đến những gì hiển thị trên trang. Nếu áp dụng `display: none` thì phần tử đó không phải là một phần của render tree structure (tuy nhiên, một phần tử có khả năng `visibility: hidden` nằm trong cây bố cục). Tương tự, nếu một lớp có nội dung như p :: before {content: "Hi!"} Được áp dụng, nó sẽ được đưa vào cây bố cục mặc dù điều đó không có trong DOM.

![](https://images.viblo.asia/7ae434c5-453d-4e50-a32b-b40b01232483.png)

### Paint

Có DOM, styles và layout vẫn không đủ để hiển thị một trang. Giả sử bạn đang cố gắng tái tạo một bức tranh. Bạn biết kích thước, hình dạng và vị trí của các yếu tố, nhưng bạn vẫn phải đánh giá xem bạn vẽ chúng theo thứ tự nào.

Ví dụ: z-index có thể được đặt cho các phần tử nhất định, trong trường hợp đó, việc tô vẽ theo thứ tự các phần tử được viết trong HTML sẽ dẫn đến kết xuất không chính xác.

![](https://images.viblo.asia/eca2c33f-37e9-4b41-a895-48de14bd00b4.png)

Trình duyệt cố gắng thực hiện các hành động tối thiểu có thể xảy ra để đáp ứng với các thay đổi. Nếu màu của phần tử thay đổi, trình duyệt sẽ chỉ paint lại phần tử. Nếu vị trí của phần tử thay đổi, trình duyệt sẽ tiến hành layout và paint lại phần tử, con và có thể là các phần tử liên quan. Nếu DOM node được thêm vào, trình duyệt sẽ thực hiện bố trí và render, paint node. Nếu thay đổi lớn như thay đổi kích thước phông chữ của phần tử gốc xảy ra thì tất cả `layout caches` sẽ bị vô hiệu, việc chuyển đổi lại và paint lại toàn bộ tree sẽ được thực hiện.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.

Bài viết có tham khảo từ nguồn:
- https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#CSS_parsing
- https://www.zeolearn.com/magazine/components-of-web-browsers
- https://developers.google.com/web/updates/2018/09/inside-browser-part3
- https://blog.logrocket.com/how-browser-rendering-works-behind-the-scenes-6782b0e8fb10/