### Giới thiệu
**Document Object Model** (viết tắt là `DOM`) là một phần thiết yếu giúp cho trang web làm việc một cách có tương tác. Nó là một giao diện cho phép ngôn ngữ lập trình thực hiện các thao tác đối với nội dung, cấu trúc, style của trang, ví dụ: `JavaScript` là một ngôn ngữ kịch bản phía client sẽ kết nối với `DOM` trong trình duyệt web.

Hầu như bất kỳ lúc nào trang web thực hiện một action, chẳng hạn như lướt các ảnh slideshow, hiển thị lỗi khi người dùng cố gắng gửi biểu mẫu chưa hoàn chỉnh, hoặc chuyển đổi menu điều hướng, đó là kết quả của việc truy cập `JavaScript` và thao tác `DOM`. Trong bài này, chúng ta sẽ tìm hiểu `DOM` là gì, cách làm việc với `document object` và sự khác biệt giữa mã nguồn `HTML` và `DOM`.

> **Lưu ý:** Mặc dù DOM được tạo ra để độc lập với bất kỳ ngôn ngữ lập trình nào cụ thể, tuy nhiên trong suốt bài viết này, chúng ta sẽ tập trung vào và đề cập đến việc triển khai HTML DOM của JavaScript.

### Điều kiện tiên quyết
Để hiểu `DOM` một cách hiệu quả và nó liên quan như thế nào đến việc làm việc với web, bạn cần phải có kiến thức cơ bản về HTML,  CSS và sẽ thêm một điểm cộng nếu bạn quen với cú pháp và cấu trúc mã JavaScript cơ bản.

### DOM là gì?
Ở cấp độ cơ bản nhất, một trang web bao gồm một `HTML document`. Trình duyệt mà bạn sử dụng để xem trang web là một chương trình thông dịch HTML và CSS và hiển thị style, nội dung và cấu trúc cho trang mà bạn nhìn thấy.

Ngoài việc phân tích kiểu và cấu trúc của HTML và CSS, trình duyệt tạo ra một bản trình bày của tài liệu được gọi là **Document Object Model**. Mô hình này cho phép JavaScript truy cập nội dung văn bản và các phần tử của tài liệu trang web dưới dạng các đối tượng (`website document` -> `objects`).

Để dễ hiểu hơn, hãy thực hành tạo một trang web đơn giản. Tạo một index.html và lưu nó trong một thư mục dự án mới:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Learning the DOM</title>
  </head>

  <body>
    <h1>Document Object Model</h1>
  </body>
</html>
```

Đây là đoạn mã HTML khá quen thuộc, nó chứa các phần quan trọng và cơ bản nhất của một `website document` - một `doctype` và một thẻ `html` với `head` và `body` được lồng vào bên trong. 

Mở `index.html `bằng trình duyệt bất kỳ, một trang web đơn giản với tiêu đề "Document Object Model" sẽ được hiển thị. Nhấp chuột phải vào bất kỳ đâu trên trang và chọn ""Inspect" (hoặc nhấn tổ hợp phím Ctrl+Shift+I). Thao tác này sẽ mở ra Developer Tools.

Trong tab **Elements**, bạn sẽ thấy `DOM`.

![](https://images.viblo.asia/10db1a51-2c01-4291-97a2-b8f264bdff0e.png)

Trong trường hợp này, nó trông giống hệt như mã nguồn HTML mà chúng ta vừa viết - một `doctype` và một vài thẻ HTML. Di chuột qua từng phần tử sẽ làm nổi bật phần tử tương ứng trong trang web được hiển thị. Các mũi tên nhỏ ở bên trái của các phần tử HTML cho phép bạn chuyển đổi chế độ xem các phần tử lồng nhau. 

### The Document Object

`document object` là một đối tượng được tích hợp sẵn có nhiều **properties** (thuộc tính) và **methods** (phương thức) mà chúng ta có thể sử dụng để truy cập và sửa đổi các trang web. Để hiểu cách làm việc với DOM, bạn phải hiểu cách các đối tượng hoạt động trong JavaScript.

Trong Công cụ dành cho nhà phát triển trên index.html, di chuyển đến tab **Console**. Nhập `document` vào console và nhấn **ENTER**. Chúng ta sẽ thấy rằng output giống như những gì ta thấy trong tab **Elements**.

![image.png](https://images.viblo.asia/4b452c02-51ee-450b-82b4-387156deb08f.png)

### Sự khác biệt giữa mã nguồn DOM và HTML là gì?

Hiện tại, với ví dụ trên, có vẻ như mã nguồn HTML và DOM hoàn toàn giống nhau. Trên thực tế, có hai trường hợp trong đó DOM do trình duyệt tạo ra sẽ khác với mã nguồn HTML:
* DOM được sửa đổi bởi JavaScript phía client.
* Trình duyệt tự động sửa lỗi trong mã nguồn.


Để chứng minh rằng DOM có thể được sửa đổi bằng JavaScript phía máy khách, hãy nhập nội dung sau vào Console: `document.body;`

![image.png](https://images.viblo.asia/2b65224b-7069-4506-8a22-3e3a433ac2a7.png)

`document` là một đối tượng, `body` là một thuộc tính của đối tượng `document` mà chúng ta cần truy cập. Việc chạy `document.body` trên Console sẽ xuất ra phần tử `body` và mọi thứ bên trong nó.

Trong Console, chúng ta cũng có thể thay đổi một số thuộc tính trực tiếp của đối tượng body trên trang web. Ví dụ với tính style, chúng ta sẽ thay đổi màu nền của `body` thành ***fuchsia***. Nhập dòng dưới đây vào Console:

```console
document.body.style.backgroundColor = 'fuchsia';
```

Sau khi nhập và chạy dòng code trên, ta sẽ thấy cập nhật trực tiếp màu nền thay đổi trên trang.

![image.png](https://images.viblo.asia/e1e300c6-7284-4a4a-9243-25e807821e10.png)

Chuyển sang tab **Elements** hoặc nhập lại `document.body` vào Console, bạn sẽ thấy rằng DOM đã thay đổi.

**Tab Elements:**

![image.png](https://images.viblo.asia/9cd90f26-e143-4dfc-97e2-00870ff42909.png)

**Tab Console:**

![image.png](https://images.viblo.asia/adbce730-660f-4bfa-a1eb-5c42b7728564.png)

> Lưu ý: Để thay đổi thuộc tính CSS `background-color`, chúng ta phải nhập `backgroundColor` trong JavaScript. Bất kỳ thuộc tính CSS nào có dấu gạch nối sẽ được viết bằng **camelCase** trong JavaScript.

Mã JavaScript mà chúng ta đã nhập, gán màu **fuchsia** cho background của phần `body`, hiện là một phần của DOM.

Tuy nhiên, nhấp chuột phải vào trang và chọn "View Page Source". Bạn sẽ nhận thấy rằng nguồn của trang web không chứa thuộc tính kiểu mới mà chúng ta đã thêm qua JavaScript. Source của một trang web sẽ không thay đổi và sẽ không bao giờ bị ảnh hưởng bởi JavaScript phía client. Nếu bạn reload trang, mã mới mà chúng ta đã thêm vào Console sẽ biến mất.

Trường hợp khác trong đó DOM có thể có đầu ra khác với mã nguồn HTML là khi có lỗi trong mã nguồn. Một ví dụ phổ biến về điều này là thẻ `table` - cần có thẻ `tbody` bên trong bảng, nhưng các nhà phát triển thường không đưa nó vào HTML của họ. Trình duyệt sẽ tự động sửa lỗi và thêm `tbody` vào DOM, nó cũng có thể tự sửa các thẻ chưa được đóng.

### Kết luận
Trong hướng dẫn này, chúng ta đã xác định DOM, truy cập vào `document object`, sử dụng JavaScript và console để cập nhật thuộc tính của `document object` và tìm hiểu sự khác biệt giữa mã nguồn HTML và DOM. Để biết nghiên cứu kỹ hơn về DOM, hãy xem lại trang [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model(DOM)) trên Mozilla Developer Network.

Trong phần tiếp theo của bài viết, chúng ta sẽ xem xét các thuật ngữ HTML quan trọng, tìm hiểu về cây DOM, khám phá các **nodes** là gì, tìm hiểu về các loại **nodes** phổ biến nhất và bắt đầu tạo các lệnh tương tác với JavaScript.

**Nguồn bài viết:** Tham khảo [tại đây](https://www.taniarascia.com/introduction-to-the-dom/)