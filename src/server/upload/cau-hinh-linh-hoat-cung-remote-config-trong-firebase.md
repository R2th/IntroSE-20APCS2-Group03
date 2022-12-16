Hi mọi người :grinning:, như các bạn đã biết, Firebase là một nền tảng phát triển ứng dụng cung cấp nhiều tiện ích cho người dùng. Ngoài những tiện ích nổi bật nhất có thể kể tới như xác thực, quản lý dữ liệu hay lưu trữ media thì mình còn tìm hiểu về một tiện ích nằm khá sâu trong danh mục tiện ích của Firebase nhưng lại vô cùng hiệu quả: **Remote Config**.

  Trong quá trình phát triển ứng dụng, các biến liên quan đến việc cấu hình, có tính chất thay đổi, mình thường quản lý chúng đơn giản nhất bằng cách lưu chúng trong file .env. Việc này tuy tiện lợi nhưng lại gặp phải một vấn đề: mỗi khi ta thay đổi biến, để chúng được áp dụng và chạy được thì cần phải build và deploy lại ứng dụng. Điều này có thể gây cản trở trong quá trình testing hoặc trong quá trình ứng dụng đến tay người dùng cuối, những nội dung như quảng cáo hay những đợt marketing sẽ được thay đổi một cách thường xuyên. Không thể sau mỗi lần đó, ứng dụng sẽ được deploy lại và yêu cầu người dùng cập nhập ứng dụng. Thật may, Remote Config đã được tạo ra để giải quyết vấn đề này :sunglasses::sunglasses:
# Remote Config là gì?

>  **Remote Config** (viết tắt của **Remote Configuration**) là một kỹ thuật phát triển phần mềm cho các ứng dụng trong đó hành vi hoặc tính năng của chúng có thể được thay đổi từ xa mà không cần phải cập nhật lại. 



  Remote Config thực hiện việc này bằng cách đặt một giá trị mặc định cho các cài đặt khác nhau trong ứng dụng (ví dụ như 1 giá trị cho chương trình giảm giá đặc biệt hay 1 giá trị cho việc bật/tắt 1 function debug trong source code,...) và sau đó bộ SDK mà bạn cần phải tích hợp vào ứng dụng khi cài đặt firebase, sẽ fetch giá trị của biến đó realtime từ Firebase Server.
Ngoài ra, Remote Config cung cấp một khái niệm **condition** - Được dùng như điều kiện để biến config sẽ được gán với một giá trị cụ thể tách biệt và có độ ưu tiên cao hơn giá trị mặc định nếu như ứng dụng fetch dữ liệu thỏa mãn điều kiện đề ra. 

![image.png](https://images.viblo.asia/7f346f48-d873-4a13-ab43-ca7351028a14.png)

Như ví dụ trên đây, mình đang tạo ra một biến config có tên là advertisement_enable - để quản lý việc hiển thị quảng cáo. Và mình đã thêm 3 condition `valid_in_web`, `valid_in_ios`, `valid_in_android` và chỉ cho hiển thị quảng cáo trên môi trường app.

Sau đây là hình ảnh biểu thị cho thứ tự ưu tiên trong việc trao đổi dữ liệu giữa Client App và Remote Config Server:

![image.png](https://images.viblo.asia/b9254ca4-b0e1-4e8d-b941-ea496f7597df.png)

Như chúng ta có thể thấy:
+ Về phía Remote Config Server sẽ trả về giá trị có thứ tự ưu tiên theo condition, sau đó mới đến giá trị mặc định.
+ Về phía Client App, sẽ ưu tiên giá trị lấy từ server, sau đó đến giá trị mặc định đã lưu trong bộ nhớ app, sau cùng đến giá trị khởi tạo ban đầu của biến trong source code.

# Ứng dụng của Remote Config 

## Kiểm soát các tính năng
  Bởi vì Remote Config cho phép bạn kiểm soát hành vi và giao diện của ứng dụng từ xa, đây là một cách tuyệt vời để triển khai các tính năng mới một cách có kiểm soát. Thay vì đưa các tính năng mới đến 100% người dùng bằng bản cập nhật ứng dụng, bạn có thể đặt các giá trị có điều kiện trong ứng dụng của mình, kiểm soát chúng trong Remote Config  để chỉ một bộ phận người dùng của bạn nhìn thấy tính năng mới và bạn có thể đánh giá sự cải tiến, triển khai chúng theo tốc độ của riêng mình khi nó có đã được phê duyệt.
## Khôi phục phiên bản
  Hãy tưởng tượng, khi ứng dụng của bạn nâng lên một phiên bản mới, sẽ là vấn đề lớn nếu lỗi hoặc sự cố được phát hiện sau khi phiên bản đó được phát hành trực tiếp tới người dùng ứng dụng phải mất nhiều ngày để khắc phục. Với Remote Config, bạn có thể nhanh chóng khôi phục các tính năng của ứng dụng mà không cần phải thực hiện bất kỳ thay đổi code backend, chỉ bằng cách chỉnh sửa các thông số cấu hình đã được thay đổi trước đó.
## A/B Testing
  A/B testing là một quy trình dùng để so sánh 2 phiên bản trên cùng một môi trường để đánh giá xem phiên bản nào là tốt hơn. Ví dụ tại cùng một màn đặt hàng, bạn có thể chỉnh sửa màu sắc, vị trí của nút một cách linh hoạt để ngầm so sánh và chọn ra đâu là thiết kế tốt nhất cho ứng dụng. Remote Config sẽ giúp bạn thực hiện điều này một cách dễ dàng và thuận tiện hơn cả.
# Ví dụ với Remote Config
Trong quá trình tìm hiểu Remote Config, mình đã sử dụng chúng để thực hiện chúng để thực hiện bật/tắt các giá trị log trong quá trình debug function trên server. Và nó cũng khá đơn giản để thực hiện. Tất nhiên trước khi bắt đầu bạn cần phải [cài đặt Firebase SDK](https://firebase.google.com/docs/web/setup) cho ứng dụng trước đó.
Để khởi tạo đối tượng Remote Config, ta thực hiện câu lệnh:
```
const remoteConfig = firebase.remoteConfig();
```
Sau đó bạn có thể thực hiện việc setup giá trị mặc định hoặc get ra các giá trị từ Remote Config:
```
//setup giá trị
remoteConfig.defaultConfig = {
  "welcome_message": "Welcome"
};
//get giá trị từ remote config
const val = remoteConfig.getValue("welcome_messsage");
```
Nếu bạn muốn lấy ra toàn bộ tất cả giá trị cũng như condition đã được setup trên server, thực hiện câu lệnh:
```
const remoteConfigTemplate = await remoteConfig.getTemplate();
```
  Sau đó, từ các giá trị đã lấy được từ Remote Config, bạn có thể toàn quyền xử lý chúng trong source code bản thân. Như mình, mình dùng nó để là điều kiện để bật những dòng log debug của  function. Trong quá trình phát triển, nếu gặp lỗi trong quá trình vận hành, mình có thể chuyển ứng dụng sang trạng thái debug một cách dễ dàng chỉ bằng một vài thao tác thay đổi giá trị trên Remote Config tại màn hình Console Firebase  :+1: 

# Kết Luận
Trên đây là một điều về Remote Config mình đã tìm hiểu được trong quá trình làm việc với Firebase. Nếu bạn thấy hứng thú có thể tìm hiểu sâu hơn về chúng, mình tin sẽ còn rất nhiều điều thú vị mà bạn có thể khám phá. Hẹn gặp lại các bạn ở các bài viết sau!!

# Tài liệu tham khảo 
* https://firebase.google.com/docs/remote-config
* https://www.optimizely.com/optimization-glossary/remote-config/