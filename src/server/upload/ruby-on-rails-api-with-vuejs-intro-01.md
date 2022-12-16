Trước khi bắt đầu build ứng dụng, chúng ta có một vài điều cần làm rõ với nhau, phòng khi bạn thấy mơ hồ về những gì mình sắp đọc? :relieved: 
<br><br>
#### Đầu tiên, sử dụng Ruby on Rails như là một API, lợi ích của điều này là gì?

Vậy trước hết cần hiểu API là gì?

![](https://images.viblo.asia/6f165488-3517-4c7b-a307-970dc0d61f9d.png)
"API (Application Programming Interface) là tập các định nghĩa phương thức, giao thức và công cụ xây dựng phần mềm ứng dụng, với nó các lập trình viên sẽ dễ dàng xây dựng các chương trình máy tính." Ví dụ, nếu bạn có một tính năng cần cung cấp cho module khác, phần mềm khác, bạn sẽ mở ra một API để tác giả của module/phần mềm kia truy cập vào. Khi đó, họ có thể kết nối, lấy dữ liệu hoặc cập nhật dữ liệu vào hệ thống, tất nhiên để có thể tiếp tục hoạt động 2 bên cần thực hiện những gì đã cam kết qua API.

Tưởng tượng nhé, bây giờ bạn có một nguồn dữ liệu duy nhất cho các ứng dụng trong tương lai có thể truy cập, sử dụng, bất kể đấy là native mobile app hay front-end framework đều có thể "nói chuyện" với dữ liệu này. Về cơ bản, nhiều ứng dụng có thể giao tiếp với cùng một nguồn dữ liệu nghĩa là các ứng dụng này có thể tương thích hơn cho tất cả.
<br><br>
Trong series này, chúng ta sẽ tạo ra một ứng dụng đơn giản nhưng đầy đủ trong đó Ruby on Rails đóng vai trò xây dựng back-end và Vue.js + Axios đảm nhiệm việc tạo front-end. Chúng ta sẽ tạo hai ứng dụng "giao tiếp" với nhau để đạt được kết quả tương tự ứng dụng dựa trên Rails thông thường, nhưng với tất cả các đặc quyền của API.
<br><br>
#### Sử dụng trong ứng dụng này:
* Rails 5.2.2
* Ruby 2.5
* Gem bcrypt 3.1.7
* Gem rack-cors
* Gem redis 4.1.0
* Gem jwt-sessions
<br><br>

#### Chính xác chúng ta sẽ xây dựng những gì?
Đây sẽ là một ứng dụng đơn giản, nơi lưu trữ các bản ghi đĩa ca nhạc để bán và phân loại theo nghệ sĩ. Sẽ không có quá nhiều logic ngoài mà chỉ xây dựng một ứng dụng có nền tảng API, do đó ứng dụng của chúng ta sẽ bao gồm xác thực tài khoản (authentication - không sử dụng Devise) và CRUD cơ bản.

**Sẽ có hai ứng dụng:**
* Ruby on Rails back-end: xử lý dữ liệu, session và xác thực người dùng.
* Vue.js front-end: tầng view, cũng là nơi chịu trách nhiệm gửi và nhận dữ liệu đến back-end Rails. Phần này sẽ chạy trên một server khác bằng Vue-CLI, giúp chúng ta thiết lập như một ứng dụng độc lập.

Vì series này không hẳn là học một công nghệ mới (hai cơ mà :joy:) nên mình sẽ không đi sâu vào phần cài đặt môi trường. Rails và Vue.js cài đặt khá đơn giản bằng Terminal, bạn có thể tham khảo trên trang chủ. Tạm thời thế đã, hẹn gặp lại các bạn ở phần tiếp theo nhé!! **Không lười!!** (nói mình đấy) (/◕ヮ◕)/
<br><br>

**Nguồn tham khảo:**

https://web-crunch.com/ruby-on-rails-api-vue-js/

https://allaravel.com/hoi-dap/api-la-gi/


#### Phần 02: [Configuring Rails](https://viblo.asia/p/ruby-on-rails-api-with-vuejs-configuring-rails-02-ORNZqaj3Z0n)