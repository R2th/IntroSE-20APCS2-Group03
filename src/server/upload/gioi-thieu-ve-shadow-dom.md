# Before start
## DOM là gì?

DOM là viết tắt của chữ **D**ocument **O**bject **M**odel, dịch tạm ra là mô hình các đối tượng trong tài liệu HTML , XML
Như các bạn biết trong mỗi thẻ HTML sẽ có những thuộc tính(Properties) và có phân cấp cha-con với các thẻ HTML khác. Sự phân cấp và các thuộc tính của thẻ HTML này ta gọi là **selector** và trong DOM sẽ có nhiệm vụ xử lý các vấn đề như đổi thuộc tính của thẻ, đổi cấu trúc HTML của thẻ, ...

Bạn có thể tham khảo hình vẽ dưới đây để hiểu rõ hơn về DOM
![](https://viblo.asia/uploads/full/08695712-8988-418c-95ab-a6cef1ce6740.gif)

## Shadow DOM-Tương lai của Front-end
Thuật ngữ **Shadow DOM** bắt nguồn từ HTML5 . Nó là một trong những công nghệ nền tảng để tạo nên sức mạnh của Angular. Chắc các bạn cũng đã ít nhiều sử dụng những thẻ trong HTML như video hay audio như thế này:
![](https://images.viblo.asia/5b5dd334-1950-4709-848d-104fc7ed7a8a.png)
và đây là những gì trình duyệt render ra:
 ![](https://images.viblo.asia/00144dd5-e57d-44f0-9e5d-d3298b9ae03f.png)
 
###  Shadow DOM luôn tồn tại quanh ta
 Có ai tự hỏi là trong khi ta chỉ sử dụng có 1 thẻ video bên trong là 2 thẻ source mà ta lại có những nút như Pause/Start , Zoom, Download không ạ . Đó chính là nhờ  **Shadow DOM**.
 Khi ta bật chức năng **Show user agent shadow DOM** của web tool
 ![](https://images.viblo.asia/03338f0c-428b-4173-b51c-64aae8e2c0af.png)
 
 **Shadow DOM** là một thành phần đặc biệt của DOM .**Shadow DOM** sẽ không được render bởi trình duyệt hay bất cứ Search Engine nào, có thể tách biệt hoàn toàn với DOM . Bạn cũng có thể sử dụng Shadow DOM một mình, bên ngoài một thành phần web.
 
 Tác dụng của Shadow DOM là đóng gói một công việc trong một Web Component cho khả năng tái sử dụng cao. **Shadow DOM** có thể chứa 1 element hoặc là 1 thực thi một logic phức tạp kết hợp với DOM
###  Cấu trúc Shadow DOM
![](https://images.viblo.asia/1c9d4bf9-88fd-4cd2-9a9c-a0b2bc1c2e8d.png)
Với **Shadow DOM** chúng ta sẽ có thêm khái niệm **Shadow Root.** Nội dung Shadow Root sẽ không được trình duyệt render mà thay vào đó là **Shadow Host**. **Shadow Host** được xem như một element bình thường nhưng nội dung bên trong nó (cả style sheet) sẽ được scoped, độc lập với thế giới bên ngoài.

## Cách xây dựng một Shadow DOM cơ bản
Chúng ta ví dụ với một **Shadow DOM** chỉ là 1 element **p** như sau:
![](https://images.viblo.asia/a206d2cb-0bd6-4b2d-b641-0b262fd983c2.png)
Ở đây khi trình duyệt render xong chúng ta sẽ nhận được:
![](https://images.viblo.asia/1db84fe1-21e3-403b-8166-c4451d745180.png)
Thay vì là:
![](https://images.viblo.asia/5cb202cd-2e98-46ac-9dec-cbf5f1009ab1.png)
Và khi inspect ta có được kết quả sau:
![](https://images.viblo.asia/9e21f360-cd42-4fa3-98d2-0d4f9d1c3031.png)
Style bên trong **Shadow DOM** dù conflict selector với bên ngoài (cùng tác động vào element p) nhưng cũng không sao vì đặc tính của **Shadow DOM** (scoped style sheet)
Thêm nữa là khi chúng ta truy xuất innerHTML của element #sd-root thì ta chỉ lấy được đoạn text khởi tạo: “I am Shadow Root” và cũng không thể tác động được gì vào bên trong Shadow Root, cụ thể chính là Shadow Host.
# Kết
**Shadow DOM** là một khái niệm tuy vẫn còn khá mới, hiện tại vẫn chưa được hỗ trợ chính thức từ tất cả trình duyệt. Tuy vậy chúng ta vẫn thấy được những lợi ích to lớn mà nó mang lại. Đặc biệt trong thế giới front end ngày nay hầu hết được lắp ghép từ những mảng ghép (component) nhỏ. Việc giữ cho các component này độc lập với bên ngoài không phải là nhiệm vụ dễ dàng, mà đây lại chính là điểm mạnh nhất của **Shadow DOM**. Mặt khác, các library/framework đình đám hiện nay như React/Vue/Polymer cũng bắt đầu hỗ trợ **Shadow DOM** chứ không riêng gì **Angular**.Còn có rất nhiều những vẫn đề liên quan đến **Shadow DOM** nữa mà mình chưa nói đến trong bài viết này , chúng ta hãy cùng tìm hiểu và chờ xem nó sẽ phát triển như thế nào trong tương lai nhé!
# Tham khảo
Một số resource về **Shadow DOM**:

https://www.webcomponents.org/community/articles/introduction-to-shadow-dom
https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/
https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM