Trong thế giới đang phát triển của cà phê, có rất nhiều loại cà phê rang xay từ nhiều vùng trên thế giới. Bạn được giao một nhiệm vụ tạo một ứng dụng cho khách hàng để có thể create, read, update và destroy (CRUD) các loại cà phê khác nhau. Họ cũng yêu cầu bạn là họ sẽ nhận được thông báo thông qua SMS mỗi khi một loại cà phê rang xay được thêm vào trang web của họ để ngăn chặn các đối thủ đưa vào cà phê rang xay giả.
Hôm nay, chúng ta sẽ xây dựng một app Rails 5 đơn giản tên là "Coffee Roasts" (Cà phê rang xay) sẽ thông báo cho khách hàng của bạn qua SMS bất cứ khi nào một cà phê rang mới được thêm vào trang web bằng cách sử dụng API SMS của Twilio.
## Tạo app Rails
Trước tiên, hãy đảm bảo rằng bạn đã cài đặt Ruby, Bundler và Rails để thiết lập project mới:
![alt](https://images.viblo.asia/f6ed1656-3790-47b2-8c75-15503e2a2f0c.png)
Sử dụng một trình tạo đơn giản để tạo toàn bộ CRUD app với dòng lệnh:
![alt](https://images.viblo.asia/8c2e3b36-8c83-41e4-93eb-29ba63538b82.png)
Sau đó, chúng ta setup database:
![alt](https://images.viblo.asia/e0c1ee62-cd11-4625-a4c1-1785d3d218ed.png)
## Tích hợp Rails app với Twilio
Twilio và cộng đồng Ruby đã tạo ra một gem (library) để giúp việc tích hợp Twilio trở nên dễ dàng. Hãy thêm gem sau vào Gemfile để thực hiện chức năng của Twilio:
![alt](https://images.viblo.asia/db8f4a51-ba83-42dd-a062-d1c40cbc7831.png)
Sau đó chạy lệnh bundle để cài đặt Twilio gem trong Rails app của chúng ta:
![alt](https://images.viblo.asia/c9a2a21e-2f24-40af-b967-2366bf25d805.png)
### Đăng ký Twilio
Sau đó, hãy thiết lập các cấu hình cần thiết cho ứng dụng của chúng ta:
1. Truy cập vào trang chủ Twilio [Link](https://www.twilio.com/console)
2.  Nếu bạn chưa có tài khoản Twilio, ấn vào sign up. Điền đầy đủ thông tin của bạn rồi ấn "Start your free trial":
![alt](https://images.viblo.asia/89a97a63-22ed-4e00-8cf0-626c69d25a66.png)
3. Sau khi đăng ký, Twilio sẽ yêu cầu bạn xác minh số điện thoại cá nhân. Với tài khoản dùng thử miễn phí, đây là số duy nhất bạn có thể gửi văn bản tới, nhưng với ứng dụng thử nghiệm như vậy là đủ. Hãy đảm bảo số điện thoại của bạn có khả năng SMS:
![alt](https://images.viblo.asia/c0eb849f-f937-4340-b87f-8bd5ab0d0d68.png)
4. Click vào biểu tượng hình ngôi nhà trên cùng bên trái của bảng điều khiển Twilio. Bạn sẽ thấy một mã là ACCOUNT_SID và AUTH_TOKEN. Chúng sẽ cần thiết cho thiết lập Rails app của chúng ta:
![alt](https://images.viblo.asia/56ef20ea-6f1d-4663-862e-f849f8c6f578.png)
5. Chúng ta click vào biểu tượng tin nhắn dưới hình ngôi nhà, chọn *Programmable SMS > Learn & Build*. Bạn có thể demo việc gửi tin nhắn SMS đến điện thoại của bạn bằng cách nhập số điện thoại vào. Ở đó chúng ta thấy trường "from" chính là số điện thoại sẽ gửi tin nhắn đến điện thoại của bạn. Nó chính là PHONE_NUMBER chúng ta sẽ cấu hình cho ứng dụng Rails:
![alt](https://images.viblo.asia/e9319d70-56b4-4433-8f0e-06eefb610e90.png)
### Cấu hình ứng dụng của chúng ta
Chúng ta sẽ thêm ACCOUNT_SID, AUTH_TOKEN và PHONE_NUMBER vào config/secrets.yml. Nó trông giống như thế này:
![alt](https://images.viblo.asia/9d9f3ffa-4f0f-4146-be81-9fccfd1c622b.png)
Xin lưu ý là bạn cần thêm mã quốc gia vào twilio_phone_number. Ví dụ trên hình trên số điện thoại gửi là (334) 326-2843 thì bạn nhập số tương ứng (+13343262843) vào twilio_phone_number.
Chúng ta cần định cấu hình ứng dụng khách của mình bằng cách thêm trình khởi tạo Twilio sẽ được tự động tải bằng Rails. Tạo tập tin *config/initializers/twilio.rb* và thêm mã này:
![alt](https://images.viblo.asia/ea104450-8681-4d26-a868-c34670c8296b.png)
## Bắt đầu viết code demo
Tiếp theo, hãy thêm code tin nhắn văn bản vào service object trong Rails app trong app/services/twilio_text_messenger.rb:
![alt](https://images.viblo.asia/b45e8f42-8321-4498-bce9-8186db3748be.png)
Lưu ý, user_phone chúng ta truyền vào phương thức cũng cần có mã quốc gia của chúng ta ở đằng trước. Ở nước ta mặc định là (+84).
Cuối cùng, chỉnh sửa phương thức create và gọi service object nếu chúng ta tạo ra một đối tượng "coffee roast" trong *app/controllers/coffeeroastscontroller.rb*:
![alt](https://images.viblo.asia/26b9df80-e519-4d88-b03d-9a59da037a20.png)
## Chạy Rails app
Start server và truy cập vào "localhost:3000/coffee_roasts/new", bạn hãy tạo một "coffee roast" và cầm điện thoại bạn lên, bạn sẽ nhận được tin nhắn thông báo với message mà bạn đã truyền vào trong controller. 
![alt](https://images.viblo.asia/7644c6fd-4809-41aa-b783-894b9451ef89.png)
Tèn tèn ten:
![alt](https://images.viblo.asia/336d935b-e9f0-4603-8019-4a04ef464f20.jpg)

Trên đây chỉ là ứng dụng Rails cơ bản để gửi SMS thông báo bằng Twilio. Bạn có thể xây dựng các tính năng nâng cao hơn được đề cập trong [Link](https://www.twilio.com/docs/)
Chúc các bạn thành công! :100:

Nguồn: [Link](https://www.twilio.com/blog/2017/12/send-sms-ruby-rails-5-coffee.html)