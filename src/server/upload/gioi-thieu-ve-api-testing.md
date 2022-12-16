![](https://images.viblo.asia/8033edde-b507-461f-8f25-759aca8fdf4f.png)
Chúng ta đang sống trong một thời đại tuyệt vời của sự thông minh, nơi mà sự tiến bộ chuyển động với tốc độ chóng mặt. Chúng ta được kết nối với thế giới và tất cả mọi thứ. API (Application Programming Interface) là người hùng vô danh trong thế giới kết nối của chúng ta. Dưới đây là những nội dung bạn cần biết về API và API testing đóng một vai trò quan trọng như thế nào.

### 1. API là gì?

![](https://images.viblo.asia/f4a578cf-93ca-43d6-8a74-d11d9dc7fbda.png)
- API là một từ viết tắt của Application Programming Interface (Giao diện lập trình ứng dụng)
- Các API được sử dụng để tích hợp các hệ thống với nhau.Thông qua API, người dùng có thể tạo sẵn dữ liệu cho các hệ thống khác truy cập hoặc chấp nhận dữ liệu từ các hệ thống khác.
- Các ứng dụng thành công như Facebook, Youtube, Twitter sử dụng API để có thể giao tiếp với các chương trình của bên thứ ba. Thông thường API hoạt động tương tự như cách hoạt động của bất kì website. Yêu cầu (request) được gửi từ client tới server và kết quả phản hồi (response) thông qua giao thức http.

### 2. API Testing là gì?

![](https://images.viblo.asia/59f1d241-5d45-42d4-8e6c-cf6e03052098.png)

- API testing là một loại kiểm thử phần mềm liên quan tới việc kiểm tra giao diện lập trình ứng dụng (API) một cách trực tiếp và là một phần của integration testing để xác định nếu hệ thông có đáp yêu cầu về tính năng, độ tin cậy, hiệu suất và bảo mật . 
- API testing hoàn toàn khác so với GUI testing và chủ yếu tập trung vào lớp logic nghiệp vụ của kiến trúc phần mềm. Loại testing này sẽ không tập trung vào giao diện của ứng dụng.
- Thay vì sử dụng chuẩn input(từ bàn phím) và output, trong API testing, người dùng sử dụng phần mềm để gọi tới API, nhận dữ liệu output và ghi lại response từ hệ thống.
- API testing yêu cầu ứng dụng phải tương tác với API. Để test 1 API, cần phải:

        i. Sử dụng công cụ kiểm thử để điều chỉnh API

        ii. Viết code của bạn để kiểm tra API


### 3. Thiết lập môi trường API test
- API testing khác với các loại testing khác vì GUI không hiển thị, và bạn buộc phải thiết lập môi trường ban đầu gọi tới API với các tham số bắt buộc và sau đó kiểm tra kết quả test. Do đó, việc thiết lập môi trường test cho API testing có một chút phức tạp.
- Database và server nên được cài đặt như 1 phần yêu cầu của ứng dụng
- Khi cài đặt hoàn tất, chức năng API nên được gọi đến để kiểm tra xem API đang hoạt động.

### 4. Các loại output của API

Output của API có thể là:

**a. Mọi loại dữ liệu**

Ví dụ: Hàm API cần thêm 2 số nguyên :

`long add(int a, int b)`

Các số phải được đưa ra dưới dạng tham số đầu vào. Output phải là  2 số nguyên. Output này cần phải xác minh với kết quả dự kiến

`add (1234, 999)`

Các exception phải được xử lý nếu vượt quá giới hạn số nguyên.

**b. Trạng thái ( pass hoặc fail)**

Ví dụ: xác đinh chức năng API dưới đây:

```
Lock()

Unlock()

Delete()
```

Chúng trả về kết quả True ( trong trường hợp thành công) hoặc False (trong trường hợp lỗi) là output.

**c. Gọi tới một hàm API khác**

![](https://images.viblo.asia/90c34662-8b55-4647-85da-c29bd688e8b7.jpg)

Trong trường hợp này, chúng ta gọi API function mà lần lượt sẽ gọi function khác.

Ví dụ:
API function đầu tiên có thể được sử dụng để xóa 1 bản ghi đặc biết trong bảng and chính function này sẽ tiếp tục gọi 1 function khác để refresh  cơ sở dữ liệu.

### 5. Test Cases for API Testing

Các testcase của API testing dựa trên:
- **Giá tri trả về dựa trên diều kiện đầu vào**: nó tương đối dễ kiểm tra, vì đầu vào có thể xác định và kết quả có thể được xác minh.
- **Không trả về bất cứ cái gì**: khi không có giá trị trả về, hành vi của API trên hệ thống sẽ được kiểm tra.
- **Kích hoạt một số API/ event/ interrupt**: nếu output của 1 API kích hoạt một số event hoặc interrupt, thì sau đó các event và interrput đó nên được theo dõi.
- **Cập nhật cấu trúc dữ liệu**: Cập nhật cấu trúc dữ liệu sẽ có một số kết quả hoặc hiểu quả trên hệ thống và cần được xác thực.
- **Sửa đổi các tài nguyên nhất định**: Nếu API được gọi sửa đổi một số tài nguyên, thì nó phải được xác nhận bằng cách truy cập vào các tài nguyên tương ứng.

### 6. Các định hướng của kiểm tra API:

![](https://images.viblo.asia/bc3f7b82-72e2-4136-8979-a75008df781d.png)
Các điểm dưới đây sẽ giúp người dùng thực hiện phương pháp kiểm tra API:

a. Hiểu được chức năng của chương trình API và xác định rõ phạm vi của chương trình.

b. Áp dụng các kĩ tuật thử nghiệm như phân vùng tương đương, phân tích giá trị biên, đoán lỗi và viết các testcase cho API.

c. Tham số dầu vào cho API cần được lên kế hoạch và xác định hợp lý.

d. Thực hiện các trường hợp kiểm thử và so sánh kết quả dự kiến và thực tế.

### 7. Phương thức test API
API testing nên bao gồ ít nhất các phương pháp kiểm thử sau
- **Kiểm tra khám phá**: Nhóm thử nghiệm phải thực hiện theo cách thủ công tập hợp các cuộc gọi được ghi lại trong API như xác minh rằng một tài nguyên cụ thể được tiếp xúc bởi API có thể được liệt kê, tạo và xóa một cách thích hợp
- **Kiểm tra khả năng sử dụng**: Thử nghiệm này xác minh xem API có hoạt động hay không và mức độ thân thiện với người dùng. Và API có tích hợp tốt với một nền tằng khác không.
- **Kiểm tra bảo mật**: Thử nghiệm này bao gồm loại loại chứng thực được yêu cầu và liệu dữ liệu nhạy cảm được mã hóa quá HTTP hay cả hai.
- **Kiểm thử tự động**: Kiểm tra API nên đạt đến cực đại trong việc tạo ra một tập hợp lệnh hoặc một công cụ có thể được sử dụng để thực thi API thường xuyên
- **Tài liệu**:  Nhóm kiểm tra phải đảm bảo rằng tài liệu là đầy đủ và cung cấp đủ thông tin để tương tác với API. Tài liệu phải là một phần của kết quả cuối cùng

### 8. Thực hành API testing

- Các test case phải được nhóm theo danh mục kiểm thử
- Mỗi test case nên bao gồm các khai báo của các API được gọi
- Lựa chọn tham số phải được đề cập rõ ràng trong test case chính
- Mỗi test case phải độc lập và độc lập với các mối quan hệ phụ thuộc nhất có thể
- Tránh "test chaining"
- Cần chú ý đặc biejt trong khi xử lý các chức năng xóa, close window...
- Trình tự gọi nên được thực hiện và có kế hoạch tốt
- Để đảm bảo phạm vi kiểm tra hoàn chỉnh, hãy tạo các test case cho tất cả các kết hợp đầu vào có thể có của API.

### 9. Một số tool:

- SOAPUI
- Runscope
- Postman 
- Eclipse SDK tool- Automated API testing
- Cfix
- dotTEST

### 10. Lí do cần sử dụng API Testing

- Kiểm tra ứng dụng sớm và không có giao diện người dùng

- Đưa ra một chiến lược tự động hóa thử nghiệm tuyệt vời và giảm chi phí

- Phát triển phần mềm nhanh và giảm kiểm tra hồi quy thủ công

**Kết luận:**

*API bao gồm một tập hợp các lớp / hàm / phương thức đại diện cho lớp logic nghiệp vụ. Nếu API không được kiểm tra đúng cách, nó có thể gây ra sự cố không chỉ ứng dụng API mà còn trong ứng dụng được gọi đến.*


*Tài liệu tham khảo:* 
http://www.logigear.com/magazine/api-testing/everything-you-need-to-know-about-api-testing/
https://www.guru99.com/api-testing.html