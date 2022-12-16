Khi nói đến việc xây dựng các loại Test plan nâng cao khác nhau trong Jmeter, bao gồm không chỉ chạy lại một kịch bản thử nghiệm được ghi lại với số lượng người dùng tăng lên, mà còn phức tạp hơn, bạn có thể sẽ cần một dạng Counter.
 
Các kịch bản này có thể bao gồm các test plan:
 
- Phụ thuộc vào các nguồn dữ liệu ngoài như Tập dữ liệu CSV , Tập kết quả JDBC 
- Mục tiêu chỉ là để chạy thử nghiệm (hoặc một phần của thử nghiệm) nhiều lần và mỗi lần có một tham số động đại diện cho số lần lặp hiện tại
 
Bài đăng này sẽ hướng dẫn chi tiết cách sử dụng Counter và Loop Controller trong JMeter để chạy hiệu quả các thử nghiệm phức tạp này. 
 
### Sử dụng Counter Config Element
 
Chúng ta hãy tưởng tượng một kịch bản trong đó bạn cần tạo năm thực thể trong một vòng lặp bằng cách sử dụng  HTTP Request sampler  và mỗi tên thực thể phải là duy nhất.
 
Cách xấu để thực hiện điều này là copy và paste request có liên quan năm lần để test plan xuất hiện như trong hình dưới đây:
 
![](https://images.viblo.asia/9a9d7b07-dc4e-4e85-be9f-1cee6efcadda.PNG)

Test plan hoạt động tốt khi chúng ta copy paste 5 lần như vậy, nhưng nếu bạn cần phải làm điều này 100 lần thì sao? 200 lần? Điều gì xảy ra nếu bạn cần thêm một tham số cho  HTTP Request? Copy Paste như trên không phải là một ý tưởng tốt - tốt hơn hết là thiết kế các thành phần có thể tái sử dụng dưới dạng các mô đun có thể cắm, sử dụng các vòng lặp và các bộ điều khiển logic khác để giữ cho bài kiểm tra của bạn ngắn nhất có thể.
 
Cách tốt hơn là sử dụng Loop Controller và Counter .
 
![](https://images.viblo.asia/e3fb8c28-f64b-4a80-80c0-95c040bfb175.PNG)
 
Bây giờ, hãy thực hiện cùng một kịch bản bằng cách sử dụng một  HTTP Request duy nhất chạy qua các lần lặp được tham số hóa. Làm như vậy:
 
- Thêm một Loop Controller và set “Loop Count” là 5
- Xác định Counter bên trong Loop Controller và configure nó như sau:
 
* Start - Đây là giá trị Counter ban đầu, hãy đặt giá trị là 1 (Nếu bạn để trống, Counter sẽ bắt đầu từ 0.)
* Increment - giá trị sẽ được thêm vào giá trị Counter hiện tại sau mỗi lần lặp
* Maximum - Nếu nó được để trống, giá trị Counter sẽ tăng vô hạn. Khi Maximum được set và giá trị Counter hiện tại vượt quá giá trị Maximum, Counter bắt đầu lại. 
* Number Format - bạn có thể thay đổi định dạng số đầu ra bằng tham số này. Nếu nó được để trống, các giá trị sẽ là Thông thường, như 1, 2, 3, v.v. Nếu bạn đặt “ 00”, vào các trường, các giá trị sẽ được thêm vào bởi các số 0 như 001, 002, 003, v.v.
* Reference Name - cài đặt quan trọng nhất. Tại đây, bạn có thể xác định tên Biến JMeter sẽ giữ giá trị Counter hiện tại. Tốt hơn là làm cho nó một cái gì đó tự giải thích, để người khác có thể hiểu nó là gì (và khi bạn xem lại bài kiểm tra của mình vào một ngày sau đó, bạn sẽ dễ dàng xác định và hiểu nó). Vì vậy, hãy gọi nó là counter_value
 
Do đó, cấu hình Counter sẽ:
 
![](https://images.viblo.asia/864b551e-42af-4eca-a67e-e65f54c7cccb.png)
 
Bây giờ chúng ta hãy sửa đổi tên tham số HTTP Request, tên của ứng dụng HTTP để nó lấy giá trị Counter hiện tại và gửi nó đến máy chủ. Bạn có tùy chọn sửa đổi label sampler để phân biệt giữa các sampler khác nhau trong Listener và xác định một Request có vấn đề trong trường hợp thất bại.
 
Thay đổi  HTTP Request của bạn như sau:
 
![](https://images.viblo.asia/c8348b47-b227-4c8a-a6eb-558384fb0d0e.PNG)
 
Khi bạn nhìn vào  View Results Tree listener , bạn sẽ thấy rằng các kết quả giống hệt như khi chúng được thực hiện bằng cách sao chép và dán.
 
![](https://images.viblo.asia/0c6d4909-7670-4ff4-b27d-af11aa34554c.PNG)
 
### Các Counters khác
 
Nếu vì một lý do nào đó, Phần tử cấu hình Counter không chạy cho bạn, có những cách tiếp cận khác để lấy số lần lặp hiện tại.
 
**1. Sử dụng phần tử cấu hình Counter**
 
Xác định một Counter trong Thread Group và cấu hình nó như sau:
 
- Start: 1
- Increment: 1
- Reference name: iteration
- Tích vào hộp “Track counter independently for each user” (điều này là bắt buộc để tránh tính hai lần khi bạn có nhiều hơn một người dùng ảo)
 

![](https://images.viblo.asia/51a785c4-624b-406c-b0a7-6cf4d8dbfdd2.png)
 
**2. Sử dụng Hàm counter ()**
 
JMeter cung cấp hàm __counter () , trả về số tăng dần bắt đầu từ 1 và tăng 1 mỗi lần. Nó có 2 chế độ:
 
1. Mỗi thread(người dùng ảo) có đối tượng truy cập riêng
2. Tất cả các threads cùng một truy cập giống nhau
 
Trong kịch bản của chúng tôi, chức năng có liên quan sẽ là:
 
$ {__ Counter (TRUE,)}
 
TRUE là viết tắt của Counter riêng cho từng người dùng ảo.
 
Không đặt chức năng dưới bất kỳ nhà cung cấp lặp nào, ví dụ như Loop, While hoặc ForEach Controller nếu không nó sẽ bị tấn công nhiều lần và kết quả là giá trị sẽ không đáng tin cậy.

 
**3. Sử dụng Scripting**
 
Nếu các tùy chọn trên không được áp dụng, bạn luôn có thể quay lại tập lệnh. JMeter hỗ trợ một số ngôn ngữ kịch bản, phổ biến nhất là:
 
- JavaScript (thông qua Rhino hoặc Nashorn) - được sử dụng nội bộ trong JMeter, ví dụ như trong “If” Controller
- Beanshell (thông qua trình thông dịch BSH) - cung cấp quyền truy cập dễ dàng hơn vào JMeter và các API Java cơ bản
- Bất kỳ ngôn ngữ nào được hỗ trợ bởi JCP JSR-223 ( Groovy được khuyến nghị sử dụng với các yếu tố kiểm tra JSR-223 trong JMeter )
 
Ngôn ngữ này có quyền truy cập vào biến được xác định trước, viết tắt của thể hiện của lớp JMeterVariables , cung cấp quyền truy cập đọc-ghi vào tất cả các Biến JMeter trong phạm vi (phạm vi Biến JMeter chỉ giới hạn trong Thread Group hiện tại).
 
Get vòng lặp Thread Group đơn giản như sau:

`vars.getIteration ()`
      
Hãy nhớ rằng theo cách này, bạn sẽ chỉ nhận được số lần lặp của Thread Group. Các nhà cung cấp lặp khác (như Loop, While Controller, v.v.) sẽ không được xem xét và sẽ không làm cho số lần lặp tăng lên.
 
Demo:
 
Dưới đây là một ví dụ về việc nhận Lặp lại Thread Group hiện tại bằng cách sử dụng 3 cách tiếp cận đã nói ở trên:
 
![](https://images.viblo.asia/94fd806d-65f4-4e16-87f8-4423937da222.PNG)
 
Thông thường số lần lặp được kết hợp với số người dùng ảo hiện tại. ID người dùng ảo hiện tại có thể được truy xuất bằng hàm __threadNum .

Bài viết được tham khảo tại: "https://www.blazemeter.com/blog/how-use-counter-jmeter-test"