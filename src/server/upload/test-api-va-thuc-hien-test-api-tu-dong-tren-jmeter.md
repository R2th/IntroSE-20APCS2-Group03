## I. API và những vấn đề liên quan đến API
API là viết tắt của Application Programming Interface (giao diện lập trình ứng dụng) phương thức kết nối với các thư viện và ứng dụng khác. Mỗi lần bạn sử dụng một ứng dụng như Facebook, gửi một đoạn tin nhắn hoặc một kiểm tra một thông tin thời tiết trên điện thoại đó là bạn đang sử dụng một API.
### Ví dụ về API?
Khi bạn sử dụng một ứng dụng trên điện thoại của bạn. ứng dụng đó sẽ kết nối đến internet và gửi dữ liệu đến server. Server sau đó sẽ nhận dữ liệu, biên dịch nó, thực hiện những hành những hành động cần thiết và gửi quay lại về điện thoại. Ứng dụng sau đó biên dịch dữ liệu đó và hiển thị thông tin mà bạn có thể đọc dễ nhất. Đó chính là 1 API tất cả những điều này có thể xử lý bởi API.

Chúng ta có thể lấy một ví dụ quen thuộc để làm rõ vấn đề này.

Bạn có thể tưởng tượng bạn đang ngồi trên một cửa hàng ăn uống với 1 danh sách món ăn để lựa chọn. Nhà bếp là một phần của hệ thống với những thứ sẽ chuẩn bị cho bạn. Thứ đang thiếu là đường dẫn kết nối giữa đơn đặt hàng đến nhà bếp và sự giao món ăn quay trở lại bàn của bạn. Nơi đó người phục vụ hoặc API mời vào. Người phục vụ như cái đoạn sứ giả hoặc 1 API - nhận lấy yêu cầu của bạn hoặc đơn đặt hàng và nói với nhà bếp hay hệ thống để làm điều đó. Sau đó người phục vụ giao lại cách phản hồi về cho bạn, trong trường hợp này nó chính là những món ăn.

Đây chính là ví dụ đời thường của API. Bạn có lẽ rất thân thuộc với quy trình tìm kiếm máy banh. Giống như cửa hàng, bạn có một sự lựa chọn đa dạng từ đó, bao gồm các thành phố khác nhau, khởi hành và ngày quay trở lại và nhiều hơn nữa. Chúng ta hãy tưởng tượng bạn đang đặt một chuyến bay trên trang đặt vé máy bay trực tuyến. Bạn lựa chọn một lịch trình khởi hành và một lịch trình quay trở về, hạng cabin, cũng như các giá trí khác. Để đặt vé máy bay, bạn tương tác với trang web máy bay để truy cập vào dữ liệu và nhìn thấy nếu bất kỳ chỗ nào vẫn còn khả dụng trong dữ liệu và cái giá của chuyến hành trình đó.

Tuy nhiên, chuyện gì xảy ra nếu bạn đang không sử dụng trang đặt vé máy trực tuyến-- một kênh các đã truy cập trực tiếp thông tin? Chuyện gì sẽ xảy ra nếu bạn dùng một trang dịch vụ du lịch trực tuyến, giống như Expedia,.. cái tập hợp thông tin đến tự một số dữ liệu máy bay ?

Dịch vụ chuyến đi, trong trường hợp này, nó tương tác với API của chuyến bay. API là giao diện đó, giống như sự hữu ích của người phục vụ bàn, có thể được hỏi yêu cầu bời dịch vụ du lịch để lấy thông tin từ dữ liệu chuyến bay cho việc đặt chỗ ngồi, tùy chọn hành lý, v..v.. API sau đó lấy phản hồi chuyến bay đến yêu cầu của bạn và giao nó ngay sau đó đến dịch vụ chuyến đi trực tuyến, cái sau đó hiển thị cập nhật nhất và thông tin liên quan.

### Lợi ích của test API testing: 
Test cho chức năng cơ bản của hệ thống

1. Lợi ích chính đầu tiên của kiểm thử API là truy cập vào ứng dụng không cần sử dụng giao diện người dùng.  Điều cốt lõi của việc test, chức năng đòn bảy của ứng dụng sớm phát hiện ra điểm yếu khi chạy tổng thể trước khi test về giao diện. Nó giúp phát hiện ra những nối nhỏ nhất cái có thể và trở lên vấn đề lớn trong quá trình test giao diện. Điều cốt lõi của việc truy cập không có khả năng kiểm thử trường việc lọc với hệ thống, giao tiếp thay đổi và những phát triển hợp tác giữa các nhóm. Đó là điều thuận lợi đặc biệt nếu bạn đang thực hiện test API với 1 đội offshore QA.

2. Tiết kiệm thời gian và chi phí.
    Kiểm thử API là tốn ít thời gian hơn test GUI. Trong việc test GUI, trang web là yếu tố cần được thực hiện, làm chậm quá trình xử lý. Để được thời gian xử lý API có thể tiết kiệm khi kiểm thử các chức năng chính của ứng dụng, xem xét theo như các thông số thực ví dụ dưới đây: 
3000 API test trong 50 phút
3000 GUI test trong 30 giờ
Thông qua thông kê tính toán lợi ích với một nhóm kỹ sư, bạn có thể mong đợi thời gian so sánh, sử dụng một API cho thói quen test tương tự. Kiểm tra tự động API yêu cầu ít hơn do đó cung cấp xử lý phạm vi kiểm tra tốt hơn nhanh hơn so với kiểm tra GUI. Kết quả cuối cùng của kiểm thử API nhanh hơn và giảm chi phí tổng thể.
3. Ngôn ngữ độc lập

   Trong việc test một API, dữ liệu được thay đổi sử dụng XML or JSON. Đó chế độ chuyển đổi là ngôn ngữ hoàn toàn độc lập đang chấp nhận bạn để lựa chọn vài ngôn ngữ khi theo đuổi chế độ test tự động cho ứng dụng của bạn.

4. Dễ dàng tích hợp với GUI

   Với kiểm thử API, việc test tích hợp cao là có thể. Đó là điều lợi ích đặc biệt nếu bạn kế hoạch chuyển đổi các chức năng GUI kiểm tra theo test API của bạn. Một ví dụ, dễ dàng tích hợp sẽ được chấp nhận cho việc tạo mới một user ứng dụng trước khi bắt đầu test GUI.
   
### Phương thức kiểm thử API cơ bản:

GET: Truy xuất một tài nguyên, nhận dữ liệu từ server và hiển thị
POST: Tạo một tài nguyên trên server
PUT: Thay đổi trạng thái một tài nguyên hoặc cập nhật nó
DELETE: Huỷ bỏ hoặc xoá một tài nguyên
### Cách test bằng API trên postman
Trường hợp 1: Cách sử dụng hàm Get

Với postman đã có sẵn ta cũng có thể truyền theo các trường có sẵn 

1.Phương thức chọn Get

2.Nhập giá trị url theo như design của API 

3.Nhập thêm giá trị params

4.Header không cần thiết phải nhập

5.Click send để lấy giá trị trả về 

Kết quả trả về là đúng hay sai sẽ phụ thuộc vào yêu cầu trong tài liệu API
![](https://images.viblo.asia/1c986b46-c30d-4905-9710-55e2fa21848f.PNG)

Trường hợp 2: Thực hiện request là hàm POST

Chúng ta cần thực hiện các bước sau 

1.Phương thức chọn POST 

2. Nhập giá trị url theo như design của API

3. Nhập giá trị body 

4. Nhập giá trị header có hoặc không tùy theo từng bài toán

5. Click send

Kết quả trả về phụ thuộc vào design của API và giá trị body truyền vào.

Trường hợp còn lại là PUT và DELETE tương tự như vậy.

![](https://images.viblo.asia/ff0953ce-ffd8-4856-9aee-8c0d6fbc0562.PNG)
## II. Áp dụng test Jmeter vào chạy 1 loạt test case cho API

Bạn thấy sao khi test API phải test từng case 1 nhập lại giá trị rồi lại kích SEND lặp đi lặp lại nhiều vòng.

Ví dụ đối với trường hợp test trường update name trong profile 

Với 1 trường name ta có thể check hơn chục trường hợp như 

- Nhập số 

- Nhập ký tự 

- Nhập ký tự đặc biệt

- Nhập chữ

- Nhập ký tự xss,...

Tương tự những điều như trên thì ta phải thực hiện tao tác này rất nhiều lần nhập lại giá trị và send. Sau khi tạo thay đổi các function cần test lại API thời gian tạo lại API và test lại từng API function nhỏ thì rất tốn thời gian và công sức. 

Giờ chúng ta xét đến test Jmeter 

Trước đến giờ chúng ta chỉ nghĩ đơn thuần biết rằng test Jmeter là performance và nó có thể chạy một chuỗi test case performance một lúc là quá đơn giản. Ưu điểm thứ 2 của test Jmeter là nó cũng có thể truyền các giá trị param trực tiếp trên Jmeter như trên Postman.

Vì những lợi ích trên mà ta có thể thấy rằng rất hữu ích khi sử dụng viết một loạt kịch bản test API trên Jmeter khi hướng đến một function liên quan để dễ kiểm soát và check được gía trị đúng hay sai

Cách thực hiện viết test case trên JMeter cho test API 

Bước 1: Mở 1 thread group 1 vì nó là 1 test case bạn nên set nó theo hướng test 1 case 
với thông số lần lượt là Number of Threads: 1

Ram-Up Period: 1 

Loop Count: 1 

Bước 2: Mở 1 HTTP Request 

Bước 3: Set giá trị test API 

 Method : Chọn Get/ Post/ Put/ Delete 
 
Protocol : Chọn http hoặc https

IP nhập giá trị link test

Path: Nhập thông tin test đường dẫn test API

Nhập giá trị Parameters

Bước 4: Nhập giá trị header nếu có hoặc không: mở HTTP Header Manager và nhập các giá trị cần thiết tùy theo đầu vào của bài toán 
![](https://images.viblo.asia/bbb500f4-3805-44e4-be47-983c6ddddb7f.PNG)

Tương tự ta có thể record nhưng case tương đương bằng cách tạo thêm nhiều Thread Group và set các giá trị tương tự

Ngoài ra ta có thể test bằng cách thực hiện record thông qua các case Postman đã được viết sẵn cái này áp dụng cho postman có version từ 5. trở lên

Bước 1: Tạo kịch bản trên Postman

Bước 2: Set bật proxy 
![](https://images.viblo.asia/398f6535-ed86-4263-8d9c-55a0642323f9.PNG)

Cài cổng tương tự như 8080 như ở Jmeter

Bước 3: Bắt đầu click record trên Jmeter 


Bước 4: Click Send button trên Postman

Bước 5: Check lại record trên Jmeter

Tương tự ta có thể lấy nhiều record 

Sau khi tạo được toàn bộ record trong API của theo test case bạn có thể click và cho chạy 1 loạt chuỗi và check kết quả nhanh gọn sau nhiều lần chạy.