## 1. Giới thiệu về Reactjs

React.JS là một thư viện Javascript dùng để xây dựng giao diện người dùng. Được tạo ra bởi Facebook, React càng ngày càng được sử dụng rộng rãi, đặc biệt là trong các trang web đòi hỏi yêu cầu cao về giao diện với các khả năng nổi bật như nhanh, dễ học, code ngắn và tái sử dụng tốt. <br>
React chỉ là View, nên việc kết hợp với Redux, Flux, hay bất cứ mô hình luồng dữ liệu là cần thiết. Hiện tại mình thấy Redux đang có khá nhiều người sử dụng, và tư duy của nó cũng khá hay. Sau khi học React bạn tiếp tục kết hợp với Redux trong các ứng dụng.

## 2. Đặc điểm chính

Khi nói về react thì có 3 đặc điểm chính mà bất cứ người lập trình nào muốn thao tác với React đều phải nắm đó là:
+ Chỉ là UI:
Nghĩa là chúng ta chỉ sử dụng React để xây dựng View người dùng, hiểu đơn giản thì với mô hình MVC, React được xem như là phần View.
Vì vậy, nếu chúng ta muốn xây dựng một trang Web hoàn chỉnh thì ko thể dùng mỗi mình React được mà cần thêm tầng Model và Controller nữa.
+ Virtual DOM
Công nghệ DOM (Document Object Model) ảo giúp tăng hiệu năng cho ứng dụng
+ Data Flow
React sử dụng luồng dữ liệu 1 chiều giúp chúng ta thao tác và kiểm soát dữ liệu 1 cách dễ dàng hơn


## 3. Cấu trúc và các thành phần của React

Với những ai đã từng làm với AngularJS thì chắc đều biết đến về khái niệm Separation of concerns, có thể hiểu đơn giản là chia các thành phần liên quan với nhau ra làm nhiều phần. Ví dụ trong AngularJS nếu bạn có 1 Directive thì thường sẽ được chia làm các file: js (xử lý các logic, điều hướng,..), css (chỉnh giao diện), html (template của Directive) và đây được gọi là Template Language. Còn đối với React thì sao? Có giống như AngularJS không ? Có thể nói là React khác biệt hoàn toàn với những ý trên. Cụ thể là:
+ React không phải là Template Language
+ Separation of component: React chia các thành phần trong View là các Component
+ Mọi thứ trong React đều là JavaScript Component
+ Sử dụng JSX ( JavaScript syntax extension)

## 4. Tìm hiểu sâu hơn về các khái niệm

### + Component trong React:

Mọi thứ trong React đều có thể coi là Component; ví dụ:
![](https://images.viblo.asia/11231fbd-bd5f-43a0-9a24-8123bd2f66d3.png)

Trong ví dụ này chúng ta sẽ chia khung danh sách sản phẩm là 1 component, khung tìm kiếm là 1 component, các item sản phẩm là 1 component.
Như vậy, Component giúp cho React thực hiện tốt các nguyên tắc trong OOP như: 
- Composable: Đóng gói
- Reusable: Tái sử dụng 
- Maintainable: dễ bảo trì
- Testable: dễ dàng cho test và fix bug.


### + Virtual DOM:
![](https://images.viblo.asia/2a6979b1-3346-497b-958b-c5782b92589a.png)

Có thể hiểu Virtual DOM là một bản sao của DOM. Khi ứng dụng hoạt động, các thay đổi trên DOM sẽ được tính toán trước trên DOM ảo, phân tích và tối ưu sau đó mới update DOM. Việc này giúp cho sự thay đổi trên DOM là hạn chế nhất có thể. Do đó tăng hiệu năng của ứng dụng.


### + Data Flow:

![](https://images.viblo.asia/ed19d1b4-edb5-4e0b-9443-fa9deccf85be.png)

<br>
      React sử dụng cơ chế one-way data binding – luồng dữ liệu 1 chiều. Dữ liệu được truyền từ parent đến child thông qua props. Luồng dữ liệu đơn giản giúp chúng ta dễ dàng kiểm soát cũng như sửa lỗi.

## 5.  Cấu trúc của 1 ứng dụng React

Folder source hoặc là app, src (hoặc có thể là bất kỳ tên gì mà bạn có thể khai báo trong file webpack.config.js) - chứa tất cả module JavaScript.<br>
File index.html - file html đơn giản để load JavaScript và cung cấp một vài thẻ div.
<br>
File package.json - là một file npm tiêu chuẩn, nó chứa tất cả thông tin về dự án như: name, description, author...
Một file công cụ đóng gói hoặc xây dựng module (thường là webpack.config.js).

![](https://images.viblo.asia/951f3c7c-b544-4a30-ae10-7d9605898ad0.png)


## 6.  Kết

Tài liệu mình tham khảo chắp vá ở nhiều bài trên viblo và trang chủ của Reactjs cũng như thông qua những gì mình tìm hiểu được nên nếu có chỗ nào sai sót mong mọi người góp ý và thông cảm (bow)
    
Phần tiếp theo mình sẽ giới tiếp tục tìm hiểu và giới thiệu về :
- React được xây dựng xung quanh các Component như thế nào?
- Hai khái niệm Props và State của data trong React
- Tìm hiểu thêm về inverse data flow
- Khái niệm về refs và findDOMENode
- Cuối cùng sẽ là 1 Project example React Todo List 

Cảm ơn mọi người!