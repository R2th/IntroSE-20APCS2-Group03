# 1. Kiến thức nền tảng 
## 1.1 Tìm hiểu mô hình MVC là gì?
* **MVC** là viết tắt của cụm từ **“Model-View-Controller“**. 
* Đây là mô hình thiết kế được sử dụng trong kỹ thuật phần mềm. 
* MVC là một mẫu kiến trúc phần mềm để tạo lập giao diện người dùng trên máy tính. 
* MVC chia thành *ba phần* được *kết nối với nhau* và mỗi thành phần đều có một nhiệm vụ **riêng** của nó và **độc lập** với các thành phần khác. 
* MVC cũng được sử dụng rộng rãi trong phát triển **web**, *sự khác biệt được tùy chỉnh liên quan đến sự có mặt của **server - client***.![](https://images.viblo.asia/ed9ea401-6c09-4ca8-9aa1-8b143956db8f.png)


## 1.2 Các thành phần trong MVC
### Model 
* Có nhiệm vụ thao tác với **Database**
*  Nó chứa **tất cả các hàm, các phương thức truy vấn trực tiếp** với dữ liệu
*  **Controller** sẽ thông qua các hàm, phương thức đó để **lấy dữ liệu rồi gửi qua View**
### View
* Là giao diện người dùng (**User Interface**)
* Chứa các thành phần tương tác với người dùng như menu, button, image, text,...
* Nơi nhận dữ liệu từ **Controller** và hiển thị
### Controller 
* Là thành phần **trung gian** giữa **Model** và **View**
* Đảm nhận vai trò tiếp nhận yêu cầu từ người dùng, thông qua **Model** để **lấy dữ liệu** sau đó thông qua **View** để **hiển thị** cho người dùng

## 1.3 Luồng xử lý trong MVC
Luồng xử lý trong MVC rất đơn giản thôi, với **web** nó gồm các bước như sau:
* Đầu tiên là **Request** từ người dùng được **gửi từ client đến server** ([*Xem thêm*](https://viblo.asia/p/http-request-la-gi-cac-phuong-thuc-http-request-6J3Zgy6A5mB) nếu bạn chưa biết về Request) 
* Sau đó **Controller** dựa vào yêu cầu của người dùng tiến hành **giao tiếp với Model** để lấy data từ database
* Cuối cùng **Controller** gửi dữ liệu vừa lấy được về **View** và hiển thị ra cho người dùng trên trình duyệt

## 1.4 Tại sao nên sử dụng mô hình MVC
***1. Sự độc lập và phát triển song song***
* Vì mỗi thành phần trong MVC có nhiệm vụ **riêng** và **độc lập** với nhau, nên mỗi developer có thể **đảm nhiệm một thành phần** và không ảnh hưởng đến nhau khiến quá trình phát triển diễn ra nhanh chóng, dễ dàng

***2. Hỗ trợ bất đồng bộ***
* Kỹ thuật bất đồng bộ khiến các ứng dụng được load nhanh hơn đơn giản vì tiến hành chạy nhiều câu lệnh cùng lúc
[Xem thêm](https://en.wikipedia.org/wiki/Asynchrony_(computer_programming))

***2. MVC thân thiện với SEO***
* Nền tảng MVC hỗ trợ phát triển các trang web thân thiện với SEO. Bằng nền tảng này, bạn có thể dễ dàng phát triển các URL thân thiện với SEO để tạo ra nhiều lượt truy cập hơn.

## 1.5 Lịch sử mô hình MVC
*MVC được tiến sĩ Trygve Reenskaug đưa vào ngôn ngữ lập trình Smalltalk-76 khi ông đến trung tâm Nghiên cứu Xerox Palo Alto (PARC) vào giữa năm 1970. Sau đó, việc triển khai trở nên phổ biến trong các phiên bản khác của Small- Talk. Năm 1988, các bài báo “The Journal of Object Technology” – JOT mang lại bước tranh toàn cảnh về MVC mang liệu sự hiệu quả tốt nhất.*
# 2. Áp dụng MVC vào project thực tế 
Nếu bạn đọc và hiểu những gì bên trên, thì bạn nắm được cơ bản về mô hình MVC rồi đấy, nhưng khi áp dụng nó vào project thì nó lại là chuyện khác.

Ở đây tôi muốn chia sẻ cho bạn một nguồn mà tôi đã giúp tôi hiểu rõ hơn khi tìm hiểu về mô hình MVC. Đó là kênh youtube **F8 Official** của **Sơn Đặng**. Trong đó có rất nhiều khóa học hay về web nhưng nếu bạn chỉ muốn hiểu sâu hơn về **cách áp dụng mô hình MVC trong project thực tế** thì đây là  [[Link]](https://www.youtube.com/watch?v=z2f7RHgvddc&list=PL_-VfJajZj0VatBpaXkEHK_UPHL7dW6I3) dành cho bạn. Hãy xem từ **video 17: Mô hình MVC** nhé! 

**Chúc bạn thành công!!!**