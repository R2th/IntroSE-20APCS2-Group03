## 1. Khái niệm về UML

- UML (Unified Modeling Language) là ngôn ngữ dành cho việc đặc tả, hình dung, xây dựng và làm tài liệu của các hệ thống phần mềm.
- UML được dùng để trực quan hóa hệ thống từ một khía cạnh nào đó. Trong hầu hết các hệ thống, biểu đồ tái hiện một khung nhìn về các phần tử làm nên hệ thống.
- UML cung cấp cho người dùng một ngôn ngữ mô hình hoá trực quan sẵn sàng để dùng và có ý nghĩa:
    + Cho phép phát triển và trao đổi những mô hình mang nhiều ý nghĩa.
    + Cung cấp khả năng mở rộng và chuyên môn hoá để mở rộng những khái niệm cốt lõi.
    + Độc lập với ngôn ngữ lập trình chuyên biệt và các tiến trình phát triển.
    + Cung cấp nền tảng về sự hiểu biết ngôn ngữ mô hình hoá.
    + Khuyến khích và hỗ trợ sự phát triển của các công cụ hướng đối tượng.
    + Hỗ trợ những khái niệm phát triển cấp độ cao như collaboration, framework, pattern and component.
    + Tích hợp một cách tốt nhất với thực tiễn.
- Một phần tử thường xuất hiện trong một vài biểu đồ và đôi khi xuất hiện trong tất các các biểu đồ.
- Tuy nhiên trong thực tế, chỉ một số loại biểu đồ là cần thiết cho quá trình phát triển phần mềm.
- UML cung cấp chín loại biểu đồ, ở trong bài viết lần này, tôi sẽ tập trung vào giới thiệu 4 loại biểu đồ UML

## 2. Các loại biểu đồ UML
### 1. Biểu đồ ca sử dụng (Usecase)
- Usecase là một yêu cầu chức năng trong hệ thống
- Usecase miêu tả sự tương tác của người dùng cuối với hệ thống
- Biểu đồ Usecase giúp chúng ta
    + Mô tả yêu cầu chức năng của hệ thống
    + Mô tả rõ ràng nhất và nhất quán cái hệ thống sẽ làm và sẽ được sử dụng thường xuyên trong quá trình phát triển
    + Cung cấp cơ sở để kiểm tra thử nghiệm hệ thống.
- Các thành phần của biểu đồ Usecase
    + Các thành phần tối thiểu trong mô hình UC
        
        + Tác nhân (Actor): là đối tượng bên ngoài hệ thống tác động vào các UC để nó hoạt động
      
        + Usecase: có thể thực hiện một chức năng hoàn chỉnh của hệ thống
  Dưới đây là một ví dụ về biểu đồ UC miêu tả tổng quát một hệ thống quản lí sinh viên của trường đại học
  ![](https://images.viblo.asia/6b323edd-57a8-4391-8334-be9db5906152.png)

- Từ biểu đồ UC trên có thế có cái nhìn tổng quan về Actors của hệ thống và các chức năng chính của hệ thống
    
   * Actors: Sinh viên / Manager / Admin
    
   * Các UC chính: Xem thông tin hồ sơ / Xem điểm / Tìm kiếm / Cập nhật / In báo cáo / Quản lí tài khoản ( tất cả các UC đều cần tiền điều kiện là thực hiện UC Đăng nhập)
   
### 2. Biểu đồ lớp
- Biểu đồ lớp cho phép chúng ta diễn tả các lớp trong UML
- Biểu đồ lớp mô tả cấu trúc tĩnh của hệ thống thông qua các lớp và các mối quan hệ giữa chúng
- Biểu đồ lớp cho ta cái nhìn trực quan về lớp, đối tượng và các thuộc tính/hành vi của chúng trong hệ thống
- Cú pháp của một thuộc tính được quy định như sau:
[Tầm nhìn][/]tên[:Kiểu][Bản số][=Giá trị đầu]
* Tầm nhìn (Visibility)
    + Public (+)
    + Private (-)
    + Protected (#)
    + Package (~)
* Kiểu (Type): Kiểu của các giá trị thuộc tính
    + Các kiểu dữ liệu thông thường như: string, interger, boolean, real,...
    + Các kiểu khác
* Bản số: là số các giá trị có thể nhận, được thể hiện dưới dạng [a..b] (vd: mobilenumber[1..*]
* Giá trị đàu: là giá trị ngầm mặc định gán cho thuộc tính khi đối tượng được tạo lập
- Ngoài ra cũng cần quan tâm đến mối quan hệ giữa các đối tượng như: 
* Bản số của mỗi kết hợp: 1-n, 0-n, 1-1, n-n
     + Quan hệ khái quát hóa (Generalization)
     + Quan hệ liên kết ( Association)
     + Quan hệ kết nhập (Aggregation)
     + Quan hệ hợp thành (Composition)
     + Quan hệ phụ thuộc (Dependency)
- Ví dụ về một biểu đồ lớp chi tiết như hình dưới đây
![](https://images.viblo.asia/e91737fc-0ca0-49d2-8c96-990aef163244.png)

- Chúng ta cùng thử phân tích đối tượng Lớp trong sơ đồ trên![](https://images.viblo.asia/79ca8226-9227-41da-b784-88167e285a29.png)
* Đối tượng gồm có 2 thuộc tính
  1. Malop: kiểu dữ liệu là String
  2. Tenlop; kiểu dữ liệu là String
* Các hành vi
  1. Set Malop()
  2. set Tenlop()
  3. get Malop()
  4. get Tenlop()
  5. Thực hiện được chức năng Capnhat()
  6. Thực hiện được hành vi Timkiemtheolop()
  
  Từ đó chúng ta có thể thấy rõ được vai trò và tác dụng mà UML mang lại trong tiến trình phát triền phần mềm
  Ở kì sau tôi sẽ tiếp tục giới thiệu các loại biểu đồ UML khác và cách khai thác để sinh Test data tự động từ đồ thị UML
  
##   3. Tools
- Rational rose: https://www.ibm.com/support/pages/ibm-rational-rose-enterprise-7004-ifix001