## 1. Lời mở đầu
  Xin chào các bạn chắc các bạn nếu trong ngành công nghệ thông tin lập trình website thì không còn xa lạ gì với thư viện javascript đang được ưa chuộng nhất đó là ReactJS. Nó là một thư viện của Javascript xây dựng giao diện người dùng với rất nhiều ưu điểm vượt trội mà các framework khác không thể theo kịp.
  Qua các phiên bản của ReactJS thì ngày càng hoàn thiện hơn, tính năng nhiều hơn hỗ trợ tốt cho việc trải nghiệm của người dùng. Hôm nay mình sẽ chia sẻ với các bạn về vấn đề này.
## 2 Những tính năng mới của version 16
###  2.1 Kiểu trả về mới của mảng và chuỗi.
 Các bạn có thể trả về một mảng các phẩn  tử khi render.
 
   ![](https://images.viblo.asia/d2cfdff0-e7e4-4769-b9d2-5d59d7d5fc49.png)
    
 Ok cũng giống như các mảng khác bạn cần thêm một khóa trong mỗi thành phẩn để tránh cảnh báo thiếu key trong thành phần, ở ví dụ trên là thẻ li.
###  2.2 Xử lý lỗi (Error Handling)
 Một trong những thay đổi lớn nhất của React là xử lý các lỗi Javascript.
Lỗi javascript trong một thành phần của giao diện người dùng không nên phá vỡ toàn bộ ứng dụng. Để giải quyết vấn đề này React 16 giới thiệu một vấn đế mới về ranh giới lỗi.
 Ranh giới lỗi là các thành phần của react bắt lỗi javascript ở bất kì đâu trong cây thành phần con của chúng, khi thấy lỗi chúng lưu lại và hiển thị các UI dự phòng thay vì cây thành phần bị lỗi.
 
Một phương thức vòng đời áp dụng bắt lỗi là componentDidCatch(). Component này được chạy bất cứ khi nào render chức năng của một thành phần gây ra lỗi.

Ví dụ bạn tạo một ranh giới lỗi dưới dạng một thành phần của lớp:

  ![](https://images.viblo.asia/62d4c533-5be7-4c50-b346-bc1da009726d.png)
  
Bạn có thể bao lớp ranh giới lỗi này bên ngoài toàn bộ ứng dụng hoặc các thành phần cụ thể:

![](https://images.viblo.asia/8709b27c-ac4c-498d-9dfb-dc2b3f7a1d3b.png)

Trong lớn ErrorBoundary, componentDidCatch() để setState() và hiển thị các UI dự phòng khi xảy ra lỗi ở bất kỳ nơi nào trong cây thành phần con của nó. Nó có thể bắt lỗi trong khi kết xuất(render), trong các phương thức của vòng đời, thậm chí trong hàm tạo của một thành phần con.
###  2.3 Tùy chỉnh thuộc tính DOM
 Trước đây, React được sử dụng để bỏ qua các thuộc tính DOM không xác định. Nếu bạn code React JSX với một thuộc tính mà React không có, không xác định được thì React xẽ tự động bỏ qua nó:
 VD: khi bạn đặt tên thuộc tính là mycustomattribute="something"
 
 ![](https://images.viblo.asia/1a1b3bdc-b16f-4e59-b744-44c2eef6ad26.png)
 
 Nếu ở version 15 thì đầu ra sẽ trả về 1 div trống như hình dưới:
 
 ![](https://images.viblo.asia/3740ca50-c1aa-4c2c-80d9-6ea943c79a98.png)
 
 Còn ở version 16 thì React cho phép tạo các thuộc tính không xác định.
 
 ![](https://images.viblo.asia/426d0cfb-4de6-4302-bcc0-135c6e2220c9.png)
 
###  2.4 Cổng thông tin(Portals)
Ở version 16 cho phép bạn chèn một phần tử con vào một vị trí khác trong DOM, bên ngoài cây DOM chính của bạn.
Ví dụ trong file index.html của bạn sẽ có môt thẻ div gốc với id 'root', đó là nơi toàn bộ ứng dụng được render vào DOM thoogn `ReactDOM.render()`.
>  ReactDOM.render (<Ứng dụng />, document.getEuityById ('root'));

Với tính năng mới bạn có thể thêm một thẻ div thứ 2 có thể tương tự như thẻ div id là "root":
```
 <body> 
  <div id = "root"> </ div> 
  <div id = "my-Portal"> </ div> 
 <body>
```
Bạn có thể render phần div thông qua chức năng mới là `createPortal(child, container)`
```
return (
  ReactDOM.createPortal(
    <h1>Hello from inside the portal!</h1>,
    document.getElementById('my-portal')
  )
);
```
    
###  2.5 Giảm kích thước tập tin
  Phiên bản mới version 16 ReactJS giảm đáng kể về kích thước của các tập tin:
 -  `react`: là 5,3 kb (khi nén là 2,2 kb), giảm từ 20,7 kb (khi nén 6,9 kb).
 
  - ` react-dom`: là 103,7 kb (khi nén là 32,6 kb), giảm từ 141 kb (khi nén là 42,9 kb).
  
  - `react + react-dom` : là 109 kb (khi nén là 34,8 kb) giảm từ 161,7 kb (khi nén là 49,8 kb).
  
Việc giảm kích thước tập tin đáng kể như thế đã giúp cho hiệu suất và thời gian chạy website tăng đáng kể, vượt trội hơn so với version cũ rất nhiều.
## 3. Kết luận
  Ok. Bài chia sẻ mình đến đây kết thúc, không chỉ riêng mình mà còn rất nhiều bạn lập trình viên ưa thích framework này thì đều mong chờ những bản version mới hoàn thiện hơn, tốt hơn. Cám ơn các bạn đã theo dõi bài viết của mình!