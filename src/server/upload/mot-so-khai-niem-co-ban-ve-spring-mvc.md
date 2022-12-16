## Spring
### Khái niệm
   Spring là framework phát triển các ứng dụng Java, nó giúp ứng dụng có hiệu năng cao, dễ kiểm thử và sử dụng lại code,…
   
   Spring tổ chức theo module nên dễ dàng tái sử dụng.
   
###    **Các dự án của Spring:**
* Spring MVC: được thiết kế dành cho xây dựng ứng dụng nền tảng web.
* Spring Security: cung cấp cơ chế xác thực và phân quyền.
* Spring Boot: framewrok phát triển ứng dụng một cách nhanh chóng
* Spring Batch: Giúp người dùng dễ dàng scheduling, processing.
* Spring IO
* Spring Cloud
* Spring Mobile
* Spring for Android
* Spring Session
## Spring MVC
### Khái niệm 
Spring MVC là framework được thiết kế dành cho xây dựng ứng dụng nền tảng web.

Nó tuân theo mô hình MVC (Model-View-Controller)

### Mô hình hoạt động cơ bản:

![](https://images.viblo.asia/8766ea47-8d20-4045-a616-8e7c101bbb79.png)
* Model: là các file POJO, Service, DAO thực hiện truy cập database, xử lý business
* View: là các file JSP, html…
* Control: là Dispatcher Controller, Handler Mapping, Controller – thực hiện điều hướn các request.

### Flow trong Spring MVC:
![](https://images.viblo.asia/a4d4da77-1951-48d4-8ca5-1b9d0d277e46.png)
* Bất kỳ request nào tới ứng dụng web đều sẽ được gửi tới Front Controller (Dispatcher Servlet)
* Front Controller sẽ sử dụng Handler Mapping để biết được controller nào sẽ xử lý request đó
* Controller nhận request, gọi tới các class service thích hợp để xử lý yêu cầu.
* Sau khi xử lý xong, Controller sẽ nhận được model từ tầng Service hoặc tầng DAO.
* Controller gửi model vừa nhận được tới Front Controller (Dispatcher Servlet)
* Dispatcher Servlet sẽ tìm các mẫu view, sử dụng view resolver và truyền model vào nó.
* View template, model, view page được build và gửi trả lại Front Controller
* Front Controller gửi một page view tới trình duyệt để hiển thị nó cho người dùng.

### **Ưu điểm:** 
* Các tầng trong Spring MVC độc lập nên việc unit test dễ dàng hơn.
* Phần view có thể tích hợp với nhiều Framework về UI như JSF, Freemarker, Themeleaf…
* Spring MVC base trên các POJO class nên các hành động của nó khá đơn giản
* Hỗ trợ cả Annotation và XML config giúp việc phát triển code nhanh hơn và sạch hơn.
* Cung cấp việc phân chia một cách rõ ràng, linh hoạt giữa controller, service, data acces layer.

## Anomations
### `@Controller`
`@Controller` là chú thích chính cho biết lớp được chú thích đóng vai trò là Bộ điều khiển của MVC. Dispatcher Servlet quét các lớp được chú thích với nó để ánh xạ các yêu cầu web tới các phương thức được chú thích bằng `@RequestMapping`. 

`@Controller` kế thừa từ chú thích `@Component` giống như các chú thích Spring khác, chẳng hạn như `@Service` và `@Repository`.

### `@RequestMapping` 
`@RequestMapping` để ánh xạ các yêu cầu tới các phương thức của bộ điều khiển. Nó có các thuộc tính khác nhau để khớp theo URL, phương thức HTTP, tham số yêu cầu, tiêu đề và loại phương tiện. Bạn có thể sử dụng nó ở cấp lớp để thể hiện các ánh xạ được chia sẻ hoặc ở cấp phương pháp để thu hẹp thành một ánh xạ điểm cuối cụ thể.

![](https://images.viblo.asia/1501fabf-7c99-4a9b-ae21-1166eb99c252.png)
-> Class HomeController sẽ xử lý 2 URL là “/method1”, “/method2”.

**Tương tự có:**
* `@GetMapping`
* `@PostMapping`
* `@PutMapping`
* `@DeleteMapping`
* `@PatchMapping`

### `@ModelAttribute`
* Trên một đối số phương thức trong các phương thức `@RequestMapping` để tạo hoặc truy cập một Đối tượng từ mô hình và liên kết nó với yêu cầu thông qua WebDataBinder.
* Là một chú thích cấp phương thức trong các lớp `@Controller` hoặc `@ControllerAdvice` giúp khởi tạo mô hình trước bất kỳ lệnh gọi phương thức `@RequestMapping` nào.
* Trên phương thức `@RequestMapping` để đánh dấu giá trị trả về của nó là một thuộc tính mô hình.
* Phần này thảo luận về các phương thức `@ModelAttribute` - mục thứ hai trong danh sách trước. Bộ điều khiển có thể có bất kỳ số phương thức `@ModelAttribute` nào. Tất cả các phương thức như vậy được gọi trước các phương thức `@RequestMapping` trong cùng một bộ điều khiển. Phương thức `@ModelAttribute` cũng có thể được chia sẻ trên các bộ điều khiển thông qua `@ControllerAdvice`. Xem phần Tư vấn về Bộ điều khiển để biết thêm chi tiết.
* Phương thức `@ModelAttribute` có chữ ký phương thức linh hoạt. Chúng hỗ trợ nhiều đối số giống như phương thức `@RequestMapping`, ngoại trừ bản thân `@ModelAttribute` hoặc bất kỳ thứ gì liên quan đến phần thân yêu cầu.
### `@InitBinder`
* Các lớp `@Controller` hoặc `@ControllerAdvice` có thể có các phương thức `@InitBinder` khởi tạo các bản sao của WebDataBinder và những phương thức này có thể:
    * Ràng buộc các tham số yêu cầu (nghĩa là dữ liệu biểu mẫu hoặc truy vấn) với một đối tượng mô hình.
    * Chuyển đổi các giá trị yêu cầu dựa trên chuỗi (chẳng hạn như tham số yêu cầu, biến đường dẫn, tiêu đề, cookie và các giá trị khác) thành loại đích của đối số phương thức bộ điều khiển.
    * Định dạng các giá trị đối tượng mô hình dưới dạng giá trị Chuỗi khi hiển thị các biểu mẫu HTML.
* Phương thức `@InitBinder` có thể đăng ký các thành phần java.beans.PropertyEditor hoặc Spring Converter và Formatter dành riêng cho bộ điều khiển. Ngoài ra, bạn có thể sử dụng cấu hình MVC để đăng ký các loại Chuyển đổi và Định dạng trong một FormattingConversionService được chia sẻ toàn cục.
* Các phương thức `@InitBinder` hỗ trợ nhiều đối số giống như các phương thức `@RequestMapping`, ngoại trừ các đối số `@ModelAttribute` (đối tượng lệnh). Thông thường, chúng được khai báo với đối số WebDataBinder (cho đăng ký) và giá trị trả về void.
### `@ExceptionHandler`
Các lớp `@Controller` và `@ControllerAdvice` có thể có các phương thức `@ExceptionHandler` để xử lý các ngoại lệ từ các phương thức controller
### Một số Anomations hỗ trợ việc validate
* `@NotNull`: giá trị không được rỗng.
* `@Min`: số phải bằng hoặc lớn hơn giá trị được chỉ định.
* `@Max`: số phải bằng hoặc nhỏ hơn giá trị được chỉ định.
* `@Size`: kích thước phải bằng giá trị được chỉ định.
* `@Pattern`: chuỗi tuân theo biểu thức chính quy được chỉ định. Ví dụ như: định dạng email, password phải có chữ hoa chữ thường ,…
## Đa ngôn ngữ
Spring MVC – Code ví dụ Đa ngôn ngữ trong Spring MVC, Internationliaztion-i18n

Tương tự JSF Framework, Spring MVC cũng hỗ trợ đa ngôn ngữ, giúp hiển thị các loại ngôn ngữ khác nhau mà không cần phải hard code.
Mình sẽ thực hiện tạo các file .properties chứa label/text cho từng ngôn ngữ (tiếng anh, tiếng việt, tiếng nhật, tiếng pháp). Mỗi khi chọn ngôn ngữ nào thì nó sẽ hiển thị label/text của ngôn ngữ đó.

Nó hỗ trợ các class sau:
![](https://images.viblo.asia/8469775a-348d-4449-8f78-2ab43ab6ec47.png)


## Tổng kết 
Trên đây là một số các kiến thức cơ bản dành cho các bạn mới làm quen về ngôn ngữ Java nói chung và Spring MVC nói riêng. Chúc các bạn học tập tốt!