Trong thực tế,  không ai muốn những sai lầm và sự sơ suất của họ bị người khác phát hiện ra, và đối với tester cũng vậy. Khi testers được yêu cầu  test bất kỳ 1 ứng dụng, từ thời điểm đó, họ sẽ chịu trách nhiệm và ứng dụng cũng đóng vai trò như một nền tảng để thể hiện kiến thức và kỹ thuật test của họ.

Vì vậy, để đảm bảo rằng việc kiểm thử được thực hiện hoàn tất, việc thực hiện  ***" End to End Testing "***   là cần thiết.

Trong bài viết này, chúng ta sẽ học được các nội dung về ***End-to-End testing*** như sau:

**1. What is End to End Testing?**

**2. Why End to End Testing ?**

**3. End to End testing Process.**

**4. How to create End-to-End Test Cases?**

**5. Metrics for End to End testing.**

**6. End to End Testing Vs System Testing.**

Chúng ta sẽ lần lượt đi qua các nội dung này nhé.
# 1. What is End to End Testing?
![](https://images.viblo.asia/9b16c361-23ef-4b08-8d96-deb59d21a3f3.png)

**End-to-End testing** là một loại kiểm thử phần mềm không chỉ validate các hệ thống phần mềm được thử nghiệm mà còn kiểm tra tích hợp với các giao diện bên ngoài. Do đó,  mục tiêu của End-to-End testing là thực hiện một kịch bản sản xuất hoàn chỉnh.

Cùng với hệ thống phần mềm, nó cũng validate việc xử lý hàng loạt/ dữ liệu từ hệ thống upstream/downstream khác.

End-to-End testing thường được thực hiện sau *Functional testing và System testing.*

Nó sử dụng hoạt động sản xuất thực tế như dữ liệu và môi trường test để mô phỏng cài đặt thời gian thực. End-to-End testing còn được gọi là Chain Testing ( kiểm thử chuỗi)
# 2. Why End to End Testing ?
Các hệ thống phần mềm hiện đại rất phức tạp và được liên kết với nhiều hệ thống con.

Một hệ thống con có thể khác với hệ thống hiện tại hoặc có thể thuộc sở hữu của một tổ chức khác.  **Nếu một trong những hệ thống con thất bại, toàn bộ hệ thống phần mềm có thể sụp đổ** . Đây là rủi ro lớn và bạn có thể tránh được bằng **End-to-End testing**. 

**End-to-End testing**  kiểm tra sự hoàn chỉnh của system flow. Nó tăng *Test Coverage* của các hệ thống  con. Nó giúp phát hiện các vấn đề với các hệ thống con và tăng  mức độ tin cậy trong  tổng thể sản phẩm phần mềm .
# 3. End to End testing Process.
Sơ đồ sau đây sẽ đưa ra tổng quan về quy trình của **End-to-End testing**

![](https://images.viblo.asia/6d87d3e5-169b-4be5-9d26-c68d8b92838e.png)

Các hoạt động chính liên quan tới  **End-to-End testing** là:

*  *Nghiên cứu các yêu cầu của End-to-End testing*
*   *Thiết lập Test Environment và các yêu cầu về phần cứng/ phần mềm*
*   *Mô tả tất cả hệ thống và quy trình con của nó.*
*   *Nội dung *vai trò và trách nhiệm* của toàn bộ hệ thống*
*   *Phương pháp kiểm thử  và các tiêu chuẩn*
*   *Yêu cầu về tracking và design các testcase*
*   *Dữ liệu input và output cho mỗi hệ thống*

# 4. How to create End-to-End Test Cases?
![](https://images.viblo.asia/5b91c6f7-f4aa-405f-a0c5-b73caf6729d2.png)

**End-to-End testing** thiết kế gồm 3 phần:
1. Xây dựng chức năng người dùng
2.  Xây dựng điều kiện
3. Xây dựng các trường hợp kiểm thử

Sau đây là chi tiết từng phần:

**1. Xây dựng chức năng người dùng**

 Xây dưng chức năng người dùng được thực hiện theo các hoạt động dưới đây:

* Liệt kê các tính năng của hệ thống và các thành phần kết nối với nhau
* Liệt kê input data, action và output data cho mỗi tính năng hoặc chức năng
* Xác định các mối quan hệ giữa các chức năng
* Xác định chức năng có thể sử dụng lại hay độc lập

    Ví dụ: Xác định một tình huống khi bạn đăng nhập vào 1 tài khoản ngân hàng của bạn và chuyển một ít tiền vào 1 tài khoản khác của 1 ngân hàng khác ( hệ thống con của bên thứ 3) 

    i.  Đăng nhập vào hệ thống ngân hàng

    ii. Kiểm tra số sư trong tài khoản

    iii. Chuyển một số tiền từ tài khoản của bạn sang một số tài khách của ngân hàng khác ( hệ thống con của bên thứ 3)

    iv. Kiểm tra số dư tài khoản mới nhất của bạn

    v.  Đăng xuất khỏi ứng dụng

**2. Xây dựng điều kiện dựa trên chức năng người dùng**

   Xây dưng điều kiện được thực hiện theo các hoạt động dưới đây:

*  Xây dựng 1 bộ các điều kiện cho mỗi chức năng người dùng đã được định nghĩa
*  Điều kiện bao gòm trình tự, thời gian và dữ liệu

    Ví dụ:  Kiểm tra một số điều kiện như sau:
    *  Login page:   
    
       i. User và password không hợp lệ
  
       ii. Kiêm tra với user và password hợp lệ
                                
       iii. Độ an toàn của password
                                
       iv. Các thông báo lỗi
                                
    *  Balance Amount: 
    
       i. Kiểm tra tài khoản hiện tại sau 24 giờ
        
        ii. Kiểm tra error message  nếu số tiền chuyển khoản lớn hơn số tiền trong tài khoản hiện tại.

**3. Xây dựng các trường hợp kiểm thử**

   Xây dựng một hoặc nhiều test case cho từng kịch bản được xác định. Các testcase có thể bao gồm mỗi điều kiện như là một testcase
# 5. Metrics for End to End testing.
Một số metrics dưới đây được sử dụng cho **End-to-End testing**

**a.Trạng thái việc chuẩn bị test case**
- Đưa ra  tiến độ chuẩn bị test case so với kế hoạch

**b. Quy trình kiểm thử hàng tuần**
-  Cung cấp chi tiết phần trăm về việc hoàn thành kiểm thử

**c. Trạng thái và chị tiết của lỗi**
- Đưa ra tỉ lệ phần trăm về việc đóng và mở các lỗi theo tuần. Ngoài ra, sự phân bố bug theo tuần còn dựa trên mức độ nghiêm trọng (severity) và mức độ ưu tiên (priority).

**d.  Mỗi trường có sắn**
-  Tổng số giờ dự kiến mỗi ngày cho việc  test
# 6. End to End Testing Vs System Testing.
![](https://images.viblo.asia/7b7b0684-58f3-4d9d-9b9f-fc1508a489fb.jpg)

### Ví dụ về End-to-End testing: Đăng nhập vào Google


Một bộ end-to-end testing hoàn chỉnh bao gồm mọi thứ mà user  có thể thực hiện với ứng dụng của bạn. Một single test thì sẽ xác minh một chức năng duy nhất được user nhận thức.

Việc đăng nhập vào tài khoản Google là ví dụ điển hình về end-to-end testing

Trong trường hợp dưới đây, user sẽ điều hướng qua lại hai trang Sign in của google và hoàn thành 4 tương tác với giao diện

**Sign in Google 1**: Nhập  valid email và ấn nút Next.

![](https://images.viblo.asia/dc28fe07-1678-4e20-8b41-346d945c68a7.PNG)

**Sign in Google 2:** Nhập  valid password và ấn nút Next.

![](https://images.viblo.asia/ee3221d8-888f-4b41-9530-ed6c137a8cc6.PNG)

Khi thực hiện test 4 bước này và end-to-end testing sẽ xem xét liệu có gì ảnh hưởng tới việc tương tác với ứng dụng web  hay không.

- Các form và button cần xuất hiện trong web page  và gửi dữ liệu chính xác đến server. 

- Ứng dụng web cần xử lý các hành động của user và server phản hồi chính xác trong khi vẫn duy trì tính toàn vẹn của giao diện.

- Các sign-in menu có thể truy cập được thông qua URL chính xác và việc hoàn tất các steps sẽ chuyển hướng người dùng đến một URL chính xác khác.

### Kết luận
**End-to-End testing**  là quá trình verify một hệ thống phần mềm cùng với hệ thống con của nó. Thách thức lớn nhất trong loại test này là cần có đủ kiển thức về toàn bộ hệ thống cũng như kết nối các hệ thống con.
Đối với các bản phát hành của sản phẩm phần mềm,  End to End testing đóng vai trò quan trọng vì nó kiểm tra toàn bộ ứng dụng trong môi trường mô phỏng người dùng thực tế như truyền thông mạng, tương tác cơ sở dữ liệu, v.v.

Tài liệu tham khảo: https://www.guru99.com/end-to-end-testing.html