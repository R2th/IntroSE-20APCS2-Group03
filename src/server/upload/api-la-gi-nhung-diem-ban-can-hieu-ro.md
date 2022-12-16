# API là gì?
API là cụm viết tắt của **Application Programming Interface** (giao diện lập trình ứng dụng). Đây là phương thức các lập trình viên kết nối với các ứng dụng khác, hoặc cũng có thể là kết nối với các thư viên. Windows, Google, Twitter hay Facebook đều có API cho cộng đồng sử dụng để giao tiếp với nền tảng của họ.

API cung cấp khả năng truy xuất đến một tập các hàm, các hàm này đều được người sử dụng hệ điều hành hay dùng. Nói nôm na API là một loại công cụ, là cách để tạo ra phần mềm, hệ điều hành, ứng dụng, các module trong hệ thống có thể giao tiếp và tận dụng năng lực của nhau.

Ví dụ: khi sử dụng một ứng dụng trên điện thoại di động, ứng dụng kết nối Internet và gửi dữ liệu tới máy chủ. Sau đó, máy chủ lấy ra dữ liệu đó, diễn giải nó, thực hiện các hành động cần thiết và gửi nó trở lại điện thoại. Ứng dụng sau đó sẽ diễn giải dữ liệu đó và trình bày thông tin bạn muốn theo cách có thể đọc được.

![](https://images.viblo.asia/d74bd993-b8c9-41b2-9403-5b26c6aa731f.jpg)
Tại sao lại cần tồn tại những mối liên kết như API giữa các phần mềm hay trang web. Rất đơn giản, mạng lưới công nghệ hiện nay là sự kết nối giữa các trang web và ứng dụng khác nhau, khó có thể một ứng dụng chạy độc lập mà phục vụ được tất cả. Đó chính là lý do vì sao API ra đời, không chỉ giúp các ứng dụng giao tiếp với nhau mà còn để cải tiến quá trình liên kết này đến mức tối ưu nhất. Đó chính là đặc điểm cần thiết trong thời đại công nghệ phát triển.

# Phân loại API

## 1. API trên nền tảng web, hay gọi là web API

Loại API này hiện đang rất phổ biến trong [lập trình web](https://topdev.vn/blog/lap-trinh-web/) hiện nay. Các website lớn như Google, Facebook đều cung cấp hệ thống API cho phép bạn kết nối, lấy dữ liệu hoặc cập nhật dữ liệu vào hệ thống. Hiện nay đa số web API được thiết kế theo tiêu chuẩn RESTful, bạn có thể đọc thêm [restful api là gì?](https://topdev.vn/blog/restful-api-la-gi/). Thường nó có định dạng dữ liệu là [JSON](https://google.com.vn/url?q=https://topdev.vn/blog/json-la-gi/), XML hoặc một kiểu dữ liệu bất kỳ.
![](https://images.viblo.asia/37606010-b6ee-4556-ac48-1e98bd4611cd.png)

## 2. API trên Hệ điều hành
Khái niệm này có trước cả web API, Microsoft cung cấp các hệ điều hành Windows cùng các tài liệu API là đặc tả các hàm, phương thức, lời gọi hàm cũng như các giao thức kết nối cho lập trình viên, giúp lập trình viên có thể tạo ra các phần mềm ứng dụng có thể tương tác trực tiếp với hệ điều hành.

# API qua ví dụ về Google
Khi bạn sử dụng tài khoản Gmail của mình để đăng nhập vào rất nhiều trang web bên thứ ba. Để người dùng của mình có thể sử dụng thông tin cá nhân Gmail trên các trang này, điều duy nhất mà Google này cần làm là tạo ra một API đăng nhập tài khoản Gmail. Mỗi lần bạn click vào nút "Đăng nhập với Gmail" trên Github, Docker hay Quora thì các trang web/ứng dụng này sẽ "gọi" tới API của Google. 
Công việc xác thực danh tính sẽ được Gmail thực hiện, các trang web và các ứng dụng không cần phải nhúng tay vào. Sau khi xác thực xong, Google sẽ phản hồi lại cho các trang web và ứng dụng gọi tới API của mình trên một gói tin có nội dung đại loại như "Đây là anh Tony Tèo, tài khoản Gmail là toilateo@gmail.com" chẳng hạn. Nhờ có API mà Google có thể thực hiện tính năng xác thực hộ các dịch vụ khác. 

# Những điểm nổi bật của API

Ngày trước, API thường được mô tả là giao diện kết nối chung cho một ứng dụng. Nhưng hiện nay, API hiện đại có một số đặc điểm làm cho chúng trở nên hữu ích và có giá trị hơn:

* Các API hiện đại tuân thủ các tiêu chuẩn (thường là HTTP và REST), có tính dễ sử dụng và dễ hiểu và thân thiện với các nhà phát triển. 
* API được xử lý giống như sản phẩm hơn là code. Chúng được thiết kế cho các đối tượng cụ thể (ví dụ: api cho thiết bị di động...). 
* Vì chúng được chuẩn hóa nhiều hơn, nên tính bảo mật và quản trị mạnh hơn, cũng như được theo dõi và quản lý hiệu suất, quy mô tốt hơn. 
* Như bất kỳ phần mềm sản phẩm nào khác, API hiện đại có chu kỳ phát triển phần mềm riêng của nó về thiết kế, thử nghiệm, xây dựng, quản lý.