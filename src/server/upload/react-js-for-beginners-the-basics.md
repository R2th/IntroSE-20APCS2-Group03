# 1.Giới thiệu
## 1.1 React JS là gì?

**React** là một thư viện **Javascript** mã nguồn mở để xây dựng các thành phần giao diện có thể tái sử dụng. Nó được tạo ra bởi Jordan Walke, một kỹ sư phần mềm tại Facebook. React lần đầu tiên được triển khai cho ứng dụng Newsfeed của Facebook năm 2011, sau đó được triển khai cho **Instagram** năm 2012. Nó được mở mã nguồn (open-sourced) tại JSConf US tháng 5 năm 2013.

Mã nguồn của **React** được mở trên **GitHub**: https://github.com/facebook/react

Hiện nay **React JS** nhận được rất nhiều sự quan tâm đến từ cộng đồng. Nó đang được bảo trì (maintain) bởi Facebook và Instagram.
## 1.2 Tại sao cần sử dụng React JS?
Về cơ bản, việc xây dựng một ứng dụng MVC phía client với giàng buộc dữ liệu 2 chiều (2 way data-binding) là khá đơn giản. Tuy nhiên nếu dự án ngày càng mở rộng, nhiều tính năng hơn, làm cho việc bảo trì dự án gặp khó khăn, đồng thời hiệu năng cũng bị giảm.

Bạn cũng có thể giải quyết vấn đề đó bằng các thư viện khác như **Backbone.js** hay **Angular.js**, tuy nhiên bạn sẽ thấy các hạn chế của chúng khi dự án của bạn ngày càng lớn.

**React JS** ra đời sau **Angular JS**, nó sinh ra để dành cho các ứng dụng lớn dễ dàng quản lý và mở rộng. Mục tiêu chính của **React** là nhanh, đơn giản, hiệu năng cao và dễ dàng mở rộng.

**React JS** giải quyết vấn đề của tầng View trong mô hình MVC (Model-View-Controller).

**React JS** giúp viết mã Javascript dễ dàng hơn với **JSX**.

**JSX**  (JavaScript Syntax eXtension). Là một sự hòa trộn giữa **Javascript** và **XML**, vì vậy nó cũng dễ dàng hơn khi viết mã, và thân thiện hơn với các lập trình viên.

**Thành phần hóa** giao diện.

**React** cho phép lập trình viên tạo ra các **Component** (Thành phần) tương ứng với các phần của giao diện. Các Component này có thể tái sử dụng, hoặc kết hợp với các Component khác để tạo ra một giao diện hoàn chỉnh.

Ý tưởng về **Component** chính là chìa khóa giải quyết vấn đề khó khăn khi dự án ngày càng lớn. Giao diện được tạo ra từ các **Component** ghép lại với nhau, một **Component** có thể được sử dụng tại nhiều nơi trong dự án. Vì vậy thật dễ dàng khi bạn chỉ cần quản lý và sửa chữa các **Component** của chính bạn.

**Component** thực sự là tương lai của lập trình ứng dụng web, và nó cũng là tính năng quan trọng nhất mà **React** đem lại.

**Tăng hiệu năng với Virtual-DOM**

Khi dữ liệu của **Component** thay đổi. **React** cần phải rerender giao diện. Thay vì tạo ra thay đổi trực tiếp vào mô hình DOM của trình duyệt, nó tạo ra thay đổi trên một mô hình DOM ảo ( Virtual DOM). Sau đó nó tính toán sự khác biệt giữa 2 mô hình DOM, và chỉ cập nhập các thay đổi cho DOM của trình duyệt. Cách tiếp cận này mang lại hiệu năng cho ứng dụng.

![](https://images.viblo.asia/40bc1b1d-7931-4c8e-8695-c51d1e9be230.JPG)

Hình minh họa ở trên cho thấy mô hình DOM ảo và mô hình DOM thật có sự khác biệt duy nhất là 1 phần tử **<img>**, **React** chỉ cần cập nhập phần tử này cho mô hình DOM thật.


**Props và State:**

**Props**: giúp các **component** tương tác với nhau, **component** nhận input gọi là **props**, và trả thuộc tính mô tả những gì **component** con sẽ render. **Prop** là bất biến. **State**: thể hiện trạng thái của ứng dụng, khi state thay đồi thì component đồng thời render lại để cập nhật UI.

# 2. Viết ứng dụng đầu tiên với React JS
Đầu tiên chúng ta phải cài **Node JS**, các bạn có thể download  **Node JS** ở trang  chủ :
https://nodejs.org/en/

Sau khi cài xong **Node JS**, các bạn thực hiện theo các bước sau:
1.  Đầu tiên các bạn dùng  **npm** (node package manager) để cài đặt một phần mềm có thể chuẩn hóa các project **React JS** của bạn theo format của 1 thư mục **React JS**  chuẩn bằng lệnh:
    ```
    npm install -g create-react-app
    ```
2. Oke vậy là việc thiết lập môi trường đã xong, bây giờ chúng ra có thể tạo ra một project **React JS** rồi. Các bạn sử dụng lệnh sau: 
    ```
    create-react-app hello 
    ```
     Trong đó ```create-react-app``` là cú pháp tạo project và ```hello``` là tên project của bạn.

    Và đây là kết quả:
    ![](https://images.viblo.asia/778e447a-6a1c-49da-9c02-eccdd1a1df4e.JPG)

    Như vậy là bạn đã tạo xong 1 project **React JS**
    
    Và **create-react-app** đã dựng cho chúng ta một project có cấu trúc như sau:
    
    ![](https://images.viblo.asia/7ff95410-e7f8-4b89-a80e-2f7209140323.JPG)


3.  Như hình trên các bạn tiến hành ```cd hello``` để vào thư mục chứa project rồi dùng lệnh ```npm start``` để run server.

    Kết quả là:
    
    ![](https://images.viblo.asia/0a3f747e-45fa-4640-a244-3c3982477ee7.JPG)
    
    Như vậy server của bạn đã được build xong, bạn có thể mở brower lên sử dụng 1 trong 2 url  ```http://localhost:3000/``` hoặc ```http://192.168.0.152:3000/``` để xem thành quả :D.
    
    ![](https://images.viblo.asia/a97d79a2-14d2-4e59-bc1e-b00fa8eb1dea.JPG)

    Oke! vậy là chúng ta đã dựng xong 1 project sử dụng **React JS** rồi.
    
#  3. Kết luận
Trên đây là một số kiến thức mình muốn chia sẻ cho các bạn mới bắt đầu tìm hiểu về **React JS** bài viết bước đầu giới thiệu cho các bạn các khái niệm cơ bản, cách thức hoạt động và các ưu điểm của **React JS**. Ở các bài viết sau mình sẽ chia sẻ sâu hơn về cách sử dụng các kỹ thuật của **React JS** một cách chi tiết hơn. Cảm ơn các bạn đã đọc bài viết của mình!

Tài liệu tham khảo:

https://reactjs.org/

https://reactjs.org/tutorial/tutorial.html

https://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/