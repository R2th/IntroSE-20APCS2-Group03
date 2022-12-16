Khi joomla bắt đầu thực thi một request đến từ người dùng, như là GET hoặc POST, một trong những điều đầu tiên mà joomla làm là phân tích URL để xác định component nào sẽ thực thi request đấy, và chuyển giao quyền kiểm soát cho component đó. 

Joomla làm điều này bằng cách chạy "entry point" của  PHP file cho component đó. Vậy nếu như component được gọi là com_example, vậy joomla sẽ chạy:

```
* Ở font-end: components/com_example/example.php
* Ở back-end: administrator/components/com_example/example.php
```

Nếu bạn đang phát triển một component vậy bạn cần để tất cả mã nguồn ở trong 2 thư mục như ví dụ trên. Tuy nhiên điểm mạnh của việc tuân thủ MVC trong joomla giúp chúng ta có thể sử dụng thư viện joomla, thứ sẽ giúp chúng ta giảm rất nhiều thời gian để viết code

##**Joomla MVC overview**

![](https://images.viblo.asia/90c932f1-8f7d-4e93-8c6e-acc6f4ef4775.jpg)


**Entry Point code**
Nhiệm vụ chính của entry point PHP file (ví dụ: example.php cho com_example) là quyết định xem controller nào sẽ chạy. Nó làm việc dựa vào "task" parameter (Ta sẽ mô tả kỹ hơn về cái này sau) và liên quan đến: 

* Xác định lớp controller nào được sử dụng 
* Xác định tìm code ở đâu để chạy được lớp đấy 
* Gọi phương thức thích hợp của lớp đó 
* Lấy instance của lớp đó 

**Controller**
Controller chịu trách nhiệm phân tích yêu cầu của người dùng, kiểm tra xem người dùng có được cho phép thực hiện hành động đó và xác định đáp ứng yêu cầu. 

* Xác định model nào sẽ phù hợp với request này, và tạo một instance cho model đó 
* Gọi đến các phương thức trong model để thực hiện cập nhập vào database 
* Xác định view nào sẽ được sử dụng để hiển thị cho người dùng nhìn thấy, và tạo một instance cho view đó
* Thay vào đó người dùng sẽ nhận được chuyển hướng đến một URL khác, sau đó xác định điều hướng URL 

**View**

View chỉ định cái gì nên hiển thị trên trang web, và đối chiếu tất cả dữ liệu cần thiết cho đầu ra của HTTP response.

Sau khi controller tạo view instance nó gọi phương thức setModel() và truyền vào model instance. Bằng cách này thì view sẽ biết model nào đang được sử dụng, và gọi phương thức model để lấy dữ liệu cần thiết trả về cho người dùng. 

**Layout**
View thì không xuất ra HTML nhưng ủy nhiệm chúng cho layout. Layout chứa mã PHP, thứ chạy bên trong context của phương thức display của view, có nghĩa là nếu view đang giữ dữ liệu để phản hồi, ví dụ  ``` $this -> items ``` sau đó layout có thể truy cập vào đúng như  ```$this -> items``` khi mà xuất ra mã HTML

Tách view và layout ra khỏi nhau điều này cho phép một mức độ linh hoạt khác, như bạn có thể dễ dàng xử lý một layout ghi đè đe xuất dữ liệu chế độ xem bằng HTML ưa thích riêng của bạn.

**Model**

Model đóng gói lại dữ liệu được sử dụng bởi component. Trong đa số trường hợp dữ liệu sẽ đến từ database, chứ không phải từ joomla database, hoặc từ một số database mở rộng, nhưng nó có khả năng cho model có thể thực hiện dữ liệu từ các nguồn khác nhau. Như là thông qua dịch vụ API chạy trên một server khác. Model cũng chịu trách nhiệm cập nhập cơ sở dữ liệu thích hợp. Mục đích của model là cô lập controller và view từ các chi tiết về cách thu thập hoặc sửa đổi dữ liệu.

Nếu component đang hiển thị một form được định nghĩa trong XML sử dụng joomla Form approach, Sau đó model sẽ đảm nhận cài đặt và cấu hình Form instance, chuẩn bị cho layout xuất ra các trường sử dụng $form -> renderField() 

**Subsequent Processing**

Đầu ra của component (cụ thể hơn là HTML xuất ra từ layout) không phải là kết quả trực tiếp như HTTP response, như đúng hơn là bị bắt và được đệm bởi joomla. Một khi layout đã tạo ra được kết quả, component  điều khiển controller quay trở về với joomla framework sau đó tải và thực thi layout. Template được sinh ra và hiển thị trên trình duyệt dưới dạng một trang duy nhất 

*Tài liệu tham khảo: https://docs.joomla.org/Model-View-Controller*