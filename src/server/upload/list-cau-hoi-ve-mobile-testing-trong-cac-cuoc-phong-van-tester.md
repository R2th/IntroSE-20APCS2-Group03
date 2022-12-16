Bạn đang có ý định chuyển việc mà lại chưa có nhiều kinh nghiệm test hoặc bạn đã có nhiều kinh nghiệm test nhưng lại là những domain như web; automotive... Bạn muốn apply vào những cty start up or công ty Outsource mà họ yêu cầu  làm về Mobile app. Hoặc thậm chí là bạn đã làm nhiều với Mobile app nhưng liệu chắc rằng bạn đã hiểu rõ và đầy đủ về nó. Vậy đừng lo lắng. Mình sẽ giúp bạn bỏ túi với một list các câu hỏi liên quan đến Mobile Testing nếu như người phỏng vấn muốn hỏi bạn về chúng. Ít nhất nếu bạn không có kinh nghiệm về nó thì bạn cũng nên để cho người phỏng vấn thấy rằng bạn là một người hiểu biết rông; sẵn sàng tìm hiểu học hỏi. Nếu vậythi cơ hội để bạn pass sẽ cao hơn rất nhiều đúng không nào ^^ Vậy hãy cùng mình tìm hiểu list câu hỏi thần thánh này nhé !!!


### 1. Hãy phân biệt sự khác nhau giữa Web testing và WAP testing?

Và câu trả lời sẽ là: * lưu ý là mọi câu hỏi và đáp án này chỉ mang tính chất tham khảo nhé. Bạn có thể bổ sung or lược bớt những kiến thức mà bạn cho là đúng nhé *

*  WAP Testing : Đây là kiểm tra WAP (Giao thức ứng dụng không dây) được sử dụng trong các ứng dụng mạng

* Web Testing : Liên quan chủ yếu đến việc kiểm tra các ứng dụng web như trang web và cổng thông tin

### 2. Bạn hãy kể một số tool kiểm thử tự động Moblie Testing mà bạn biết :(nên nhớ có thể bạn không làm đến lĩnh vực auto testing nhưng mình đang trong thời đại 4 chấm nên cần phải ít nhất biết được tool nào đang hot nhé .hihi )

Đối với thử nghiệm di động, có hai loại công cụ tự động hóa để thử nghiệm đó là:

-  Mobile tools dựa trên đối tượng:  Jama solution, Ranorex,
- Mobile tools  dựa trên hình ảnh:  RoutinBot, Egg Plant, Sikuli

### 3. Hãy phân biệt sự khác nhau giữa :  simulator và emulator?
 
- Simulator:  hay còn gọi là Trình mô phỏng: Đây là một thiết bị mô phỏng mạng điện tử hoặc thiết bị trạm gốc cho điện thoại di động CDMA / CMA. Nó giúp chốt các mạng gia đình mà không cần dịch vụ chuyển vùng và có thể tạo Thoại; Cuộc gọi dữ liệu, SMS...

- Emulator: Đây là phần mềm để kiểm tra ứng dụng di động mà không cần thiết bị cầm tay trực tiếp. Thường thì Tester sẽ dùng emulator để test các ứng dụng trong trường hợp không có device test. Để build emulator bạn cũng cần dev support để cài đặt nhé

### 4. Hãy liệt kê các loại thử nghiệm ứng dụng di động?

Các loại thử nghiệm ứng dụng di động bao gồm

*  Kiểm tra tính khả dụng
*  Kiểm tra tương thích 
* Kiểm tra giao diện
* Kiểm tra Service 
* Kiểm tra Performance
* Kiểm tra hoạt động
* Kiểm tra cài đặt
* Kiểm tra bảo mật

### 5. Chiến lược thử nghiệm Android là gì?

Chiến lược thử nghiệm Android tiêu chuẩn phải bao gồm thử nghiệm sau :

* Kiểm tra đơn vị
* Kiểm tra tích hợp 
* Kiểm tra hoạt động
* Kiểm tra hệ thống

### 6. Hãy giải thích các framework dùng trong Android Testing ?

Khung thử nghiệm Android bao gồm ba segments:

* Gói ứng dụng: Đây là ứng dụng mục tiêu cái mà sẽ cần được test 
* Thiết bị đo kiểm TestRunner: Đây là trình chạy trường hợp thử nghiệm chạy các trường hợp thử nghiệm trên ứng dụng đích. Nó bao gồm một công cụ SDK để xây dựng thử nghiệm và một công cụ cung cấp API để viết chương trình điều khiển thiết bị Android, ví dụ: MonkeyRunner
* Gói thử nghiệm: Nó bao gồm hai lớp, lớp trường hợp thử nghiệm và đối tượng Mock. Các lớp trường hợp thử nghiệm bao gồm các phương thức thử nghiệm để thực hiện trên ứng dụng đích, trong khi đối tượng giả bao gồm dữ liệu giả sẽ được sử dụng làm đầu vào mẫu cho các trường hợp thử nghiệm.

### 7. Liệt kê các cách tốt nhất để test  Android app?

*  Developer nên chuẩn bị các trường hợp thử nghiệm cùng một lúc với việc viết code 
*  Cần có thư mục lưu trữ source code và bộ test case 
*  Khi có bất kỳ sự thay đổi code nào; cần phải thực hiện test tích hợp và regression test
*  Tránh sử dụng các thiết bị và trình giả lập đã root

### 8. Hãy list các lỗi phổ biến được tìm thấy trong khi thử nghiệm di động ?

* Bug  Quan trọng: App bị crash  khi đang test một tính năng nào đó trong app 
* Bug block :  Máy bị đơ và không thể làm bất cứ điều gì mặc dù điện thoại đang bật trừ khi khởi động lại device. 
* Bug Major: Không thể thực hiện chức năng của một tính năng cụ thể
* Bug nhỏ: Thường sẽ là các bug về UI 

### 9. Giải thích cách thử nghiệm A / B cho ứng dụng ios?

Thử nghiệm A / B cho ios bao gồm ba bước: 

- Cấu hình bản test : Chuẩn bị hai version cho ứng dụng iOS (A & B) và số liệu để test
- Test : Kiểm tra đồng thời hai phiên bản iOS trên thiết bị
- Phân tích: Chọn và đo phiên bản tốt hơn để release

### 10. Trong quá trình  thực hiện kiểm tra đầu cuối mobile , các tiêu chí quan trọng bạn cần phải xem xét là gì ?

- Cài đặt
- Khởi chạy app mà không cần có mạng
- Gỡ cài đặt app 
- Test hiệu năng app  trên một loại thiết bị và kịch bản network khác nhau
- Test response app trả về 

### 11. Liệt kê các tính năng mà monkey tool  cung cấp?

Monkey tool cung cấp các tính năng như sau: 

- Tùy chọn cấu hình cơ bản
- Những hạn chế của hoạt động
- Các loại sự kiện và tần suất
- Tùy chọn debugging 

### 12.  Đề cập đến các tiêu chí lựa chọn cho Tools  automation test cho test mobile là gì ?

- Đối với test mobile, Tools  automation test  phải có các tiêu chí sau: 

- Hỗ trợ đa nền tảng: Đảm bảo rằng các tools hỗ trợ nền tảng mục tiêu hiện tại và tương lai .
- Khả năng sử dụng tập lệnh: Các tools dựa trên đối tượng cung cấp mức độ cao về khả năng sử dụng tập lệnh
- Yêu cầu bẻ khóa:  Nếu tools sử dụng các thiết bị đã root, nó có thể không hỗ trợ phiên bản hệ điều hành  mới nhất và có thể không tương thích với các chính sách MDM
- Thay đổi mã nguồn: Luôn luôn có thể chia sẻ mã nguồn
- Thời gian chờ cho phiên bản hệ điều hành mới: Công cụ có thể hỗ trợ phiên bản hệ điều hành iOS / android / khác mới trong bao lâu

### 13. Khi nào nên chọn auto testing  và khi nào thì chọn manual testing :

*  Manual test:

- Nếu app có chức năng mới
- Nếu app yêu cầu thử nghiệm một hoặc hai lần

* Auto test:

- Nếu cần phải thực hiện nhiều lần Regression test
- App thử nghiệm cho các kịch bản phức tạp

### 14.  Liệt kê các vấn đề phổ biến nhất mà tester gặp phải khi thực hiện mobile testing  trong Điện toán đám mây?

Những thách thức phải đối mặt là:

- Mô hình đăng ký
- Chi phí cao
- Khóa lại
- Sự cố kết nối Internet
- Tự động hóa dựa trên hình ảnh và tốn thời gian
- Tự động hóa không thể được sử dụng bên ngoài framework

### 15. Giải thích test security cho mobile app  bao gồm những gì?

Kiểm tra bảo mật di động bao gồm:

- Kiểm tra hỗ trợ nhiều người dùng mà không can thiệp vào dữ liệu giữa họ
- Kiểm tra quyền truy cập vào các tệp được lưu trữ trong ứng dụng bởi bất kỳ người dùng ngoài ý muốn
- Phương pháp giải mã hoặc mã hóa được sử dụng để liên lạc dữ liệu nhạy cảm
- Phát hiện các khu vực nhạy cảm trong ứng dụng được thử nghiệm để chúng không nhận được bất kỳ nội dung độc hại nào

### 16) Liệt kê các thử nghiệm cơ bản cho app mobile?

- Kiểm tra trong tất cả các trình duyệt web
- Khó khăn trong việc điểm chuẩn hiệu suất do thị trường bị phân mảnh cao
- Trình giả lập không nắm bắt được tất cả các thuộc tính hoặc đặc tính của thiết bị
- Việc thực hiện các đặc điểm kỹ thuật có thể không nhất quán giữa các nhà cung cấp và thiết bị
- Trong một số trường hợp, bộ chuyển mã có thể không tôn trọng các yếu tố trải nghiệm người dùng

### 17) Giải thích kiểm tra port là gì?

Thử nghiệm này được thực hiện để kiểm tra cùng chức năng trên các thiết bị khác nhau với các nền tảng khác nhau. Nó được phân thành hai loại

- Kiểm tra thiết bị
- Kiểm tra nền tảng

### 18) Liệt kê một số công cụ kiểm tra iPhone và iPad?

- Trình kiểm tra iPhone: Kiểm tra giao diện web của bạn trong khung có kích thước i-phone
- Appium: Đây là một công cụ tự động hóa thử nghiệm được sử dụng với ứng dụng ios gốc và lai
- iPad Peek: Kiểm tra ứng dụng web của bạn bằng giao diện iPad
- Test Studio: Nó cho phép bạn ghi lại, xây dựng và chạy các bài kiểm tra tự động cho các ứng dụng iPad và iPhone của bạn.

Trên đây là một số câu hỏi mình sưu tầm được. Còn rất rất nhiều câu hỏi khác tùy thuộc vào người phỏng vấn và skill mà người tuyển dụng cần. Mong là sẽ giúp ích cho các bạn trong quá trình chuẩn bị. Hẹn gặp lại mọi người vào bài chia sẻ tiếp theo nhé ^^

https://www.guru99.com/mobile-testing-interview-questions.html