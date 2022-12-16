## Lời ngỏ
> Đối với lập trình Web, App kiến thức về DOM và khả năng thao tác DOM là hai yếu tố quan trọng nhất. 
> 
> Đơn giản vì DOM cho bạn sức mạnh thay đổi mọi thứ của trang web, khi mà mọi nội dung đều có thể thêm, bớt, xóa, sửa để mang lại trải nghiệm và nội dung tốt nhất. Trong series này sẽ giúp bạn hiểu bản chất và cách sử dụng DOM.
> 
***Quá trình trình duyệt hình thành thành DOM***

![](https://images.viblo.asia/d7df637b-b6b6-4cd3-99cd-52c1811e7c2f.png)

Chi tiết quá trình tìm hiểu [tại đây](https://viblo.asia/p/dom-in-details-hieu-ro-hon-ve-document-object-model-ByEZkppolQ0 ).

## Khái niệm cơ bản
### 1.HTML

> Như các bạn đã biết HTML là ngôn ngữ đánh dấu siêu văn bản. Khi chúng ta nhìn vào một file HTML thì nhìn thấy text, còn trình duyệt nhìn vào sẽ thấy cây DOM.

![](https://images.viblo.asia/9b6bd511-9791-44a8-a1f5-3c37a5c2113c.png)

### 2.DOM

> DOM là viết tắt của chữ Document Object Model, dịch tạm ra là mô hình các đối tượng trong tài liệu HTML.
> 
> DOM là một cấu trúc dạng cây, cho trình duyệt biết cấu trúc của văn bản, từ đó thể hiện dưới dạng hình ảnh trực quan.
> 
> Như các bạn biết trong mỗi thẻ HTML sẽ có những thuộc tính (Properties) và có phân cấp cha - con với các thẻ HTML khác. 
> 
> Sự phân cấp và các thuộc tính của thẻ HTML này ta gọi là selector và trong DOM sẽ có nhiệm vụ xử lý các vấn đề như đổi thuộc tính của thẻ, đổi cấu trúc HTML của thẻ, ...
> 
> Chúng ta cùng xem Cấu trúc cây mà DOM thể hiện:

 ![](https://images.viblo.asia/6f401c10-83c6-4807-a5fc-deb3d83d40f8.png)

> Ngoài ra, DOM giúp thao tác dữ liệu theo mô hình hướng đối tượng. 
> 
> Các phần tử bên trong 1 tài liệu có cấu trúc được định nghĩa thành các đối tượng, phương thức và thuộc tính để có thể truy xuất dễ dàng mà vẫn đảm bảo tính cấu trúc: mỗi phần tử là một đối tượng, sở hữu các thuộc tính và các phương thức để làm việc với các thuộc tính đó như thêm, xóa, sửa, cập nhật. 
> 
> Bên cạnh đó, bạn cũng có thể thêm, bớt các phần tử tùy thích, giúp cho nội dung và cấu trúc của trang web luôn cập nhật động.
## Cấu trúc DOM như thế nào

> Đối với HTML DOM, mỗi thành phần đều được xem là 1 nút (node), được biểu diễn trên 1 cây cấu trúc dạng cây gọi là DOM Tree.
> 
> Các phần tử khác nhau sẽ được phân loại nút khác nhau nhưng quan trọng nhất là 3 loại: 
> 
> 1. Nút gốc (document node)
> 2. Nút phần tử (element node)
> 3. Nút văn bản (text node)
> 
Trong đó :
> Nút gốc: Document  là nút gốc. Điểm bắt đầu xây dựng cây DOM chính là tài liệu HTML, thường được biểu diễn bởi thẻ `<html>`.
> 
> Nút phần tử: biểu diễn cho 1 phần tử HTML.
> 
> Nút văn bản: mỗi đoạn kí tự trong tài liệu HTML, bên trong 1 thẻ HTML đều là 1 nút văn bản.
> 
>Nó có thể là 1 đoạn văn biểu diễn bằng thẻ `<p>`, hay tên đề mục trong thẻ` <h1>`
>
> Ngoài ra còn có nút thuộc tính (attribute node) và nút chú thích (comment node)
> Trong đó nút thuộc tính mô tả thuộc tính của 1 nút phần tử có những đặc điểm riêng.
> 
> Chúng ta cần phân biệt Attribute là thuộc tính của phần tử DOM. Property là thuộc tính của đối tượng Javascript.
> 

###  Quan hệ giữa các node
* Nút gốc (document) luôn là nút đầu tiên.
* Tất cả các nút không phải là nút gốc đều chỉ có 1 nút cha (parent)
* Một node có thể có một hoặc nhiều con, nhưng cũng có thể không có con nào.
* Những node có cùng node cha được gọi là các node anh em.
* Trong các node anh em, node đầu tiên gọi là con cả (firstChild), node cuối cùng gọi là con út (lastChild).

### Đối tượng DOM
Trong javascript một DOM Element là một đối tượng nên có những đặc điểm sau:
- Có thuộc tính (DOM HTML & DOM CSS): innerHTML, name, className, attributes, accessKey...
- Có phương thức: getAttribute(), getElementsByClassName(), getElementsByTagName(), querySelectorAll(), removeAttribute(), scroll(),...
- Có sự kiện (DOM Event & DOM EventListener:): click, mousedown, wheel, focusin, copy,...
- Có kế thừa (DOM Node) : Node.localName, Node.prefix, Node.removeChild(),..

### Phân loại DOM
> Dưới đây là 8 loại DOM thường được sử dụng trong JavaScript:
> 
> 1. DOM Document: có nhiệm vụ lưu trữ toàn bộ các thành phần trong tài liệu của website.
> 
> 2. DOM Element: có nhiệm vụ truy xuất tới thẻ HTML nào đó thông qua các thuộc tính như tên class, id, name của thẻ HTML.
> 
> 3. DOM HTML: Chuyên được dùng đễ xử lý các vấn đề liên quan đến nội dung, thuộc tính của thẻ HTML
> 
> 4. DOM CSS: có nhiệm vụ thay đổi các định dạng CSS của thẻ HTML.
> 
> 5. DOM Event: có nhiệm vụ gán các sự kiện như onclick(), onload() vào các thẻ HTML
> 
> 6. DOM EventListener: có nhiệm vụ lắng nghe các sự kiện tác động lên thẻ HTML đó.
> 
> 7. DOM Navigation: dùng để quản lý, thao tác với các thẻ HTML, thể hiện mối quan hệ cha – con của các thẻ HTML.
> 
> 8. DOM Node, Nodelist: có nhiệm vụ thao tác với HTML thông qua đối tượng (Object).
> 
> Công nghệ thay đổi tạo ra những khái niệm DOM mới thường được sử dụng trong các Framwork nổi tiếng như ReachJS,VueJS,...
> 1. Original DOM
> 2. Shadow DOM
> 3. Virtual DOM


Cũng giống như Javascript được nâng sức mạnh nhờ có vô vàn nững thư viện và framwork khác nhau. Chính vì vậy mà DOM là một đối tượng mà Javascript quản lý cũng liên tục được biến đổi. Nó giúp cho các lập trình viên dễ dàng tương tác với DOM ngày càng ảo diệu hơn sự thuần túy ban đầu.

DOM một khái niệm vô cùng phức tạp đối với bất cứ ai khi bắt đầu muốn làm việc với nó. 

Trong phần mở đầu series này tôi muốn giới thiệu những khái niệm, quá trình hình thành, cấu trúc và liệt kê ra các loại DOM mà chúng ta sẽ bắt đầu và dần đi sau vào khám phá từng khái niệm cụ thể hơn.

Sau khi đã hình dung được tổng thể cách mà DOM hoạt động, chúng ta có thể tự tìm hiểu và thử thách với những kỹ thuật xử lý DOM từ cơ bản đến nâng cao sẽ không gặp nhiều khó khăn.

Trong phần tiếp theo chúng ta sẽ tiếp tục cùng tìm hiểu các phương pháp thao tác với DOM như đã nêu ở trên.

**Nguồn tham khảo:**

Quy trình tạo DOM: (https://viblo.asia/p/dom-in-details-hieu-ro-hon-ve-document-object-model-ByEZkppolQ0

JavaScript and HTML DOM Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

DOM cơ bản: https://viblo.asia/p/nhung-khai-niem-co-ban-ve-dom-DzVkpoDgenW

Thao tác với DOM: https://viblo.asia/p/dom-trong-javascript-can-ban-jdWrvwrGw38D