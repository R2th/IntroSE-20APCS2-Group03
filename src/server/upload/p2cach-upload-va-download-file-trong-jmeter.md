# II. Download file 

### 1. Lý thuyết .

  Hành động tả file từ góc độ Jmeer về cơ bản chỉ là một yêu cầu GET HTTP. Khi một tệp đang được sử dụng trong đường dẫn yêu cầu, điều đó có nghĩa là một yêu cầu tải xuống được đưa ra và đang được phân phát và các chỉ số hiệu suất liên quan có hể được báo cáo.
  
  Nếu trường hợp sử dụng của bạn giả định kiểm tra tính toàn vẹn của tệp, chẳng hạn như khi nó không tồn tại ở máy chủ và đang được tạo ự động hoặc bạn cần so sánh nội dung của tệp đã tải xuống với tệp khác, bạn có thể muốn lưu phản hồi. Jmeer cung cấp Lưu phản hồi cho thành phần Trình xử lý tệp. 
  
  

| Thành phần | Mô tả | Yêu cầu|
| -------- | -------- | -------- |
| Name     | Mô tả tên của phần tử này có thể show ra ở kết quả báo cáo case     | Không  |
| Filename Prefix     | Tiền ố cho tệp được tạo, điều này có thể bao gồm tên thư mục. Các đường dẫn tương đối được liên quan đến thư mục làm việc (  mặc định sẽ ở thư mục bin)    | Có |
| Variable Name     |Tên của một biến để lưu tên tệp đã tạo (để nó có thể được sử dụng sau này trong kế hoạch thử nghiệm). Nếu có các mẫu con thì một hậu tố số được thêm vào tên biến. Ví dụ. nếu tên biến là FILENAME, thì tên tệp mẫu chính được lưu trong biến FILENAME và tên tệp cho bộ lấy mẫu con được lưu trong FILENAME1, FILENAME2, v.v.    |No|
| Save Failed Responses only  | Nếu được lựa chọn, hì chỉ những phản hồi không thành công mới được lưu   | Không  |
| Save successful Responses only    | Nếu được chon, chỉ lưu những phản hồi thành công      | không  |
| Don' add number to prefix    | Nếu được chọn thì không có số nào được thêm vào tiên tố. Nếu bạn chọn tùy chọn này , hãy đảm bảo rằng tiền tố là duy nhất hoặc  tệp có thể bị ghi đè     | Không  |
| Don't add suffix     | Nếu được chọn thì không có hậu tố nào được thêm vào. Nếu bạn chọn tùy chọn này, hãy đảm bảo rằng tiền tố đó là duy nhất hoặc tệp có thể bị ghi đè    | Không  |


**Chú ý: **

Trình nghe này có thể đặt ở bất kỳ đâu trong Kế hoạch thử nghiệm, tuy nhiên đối với test Tải xuống, chúng ta nên đặt nó làm con của Yêu cầu HTTP để thực hiện tải xuống tệp.

Nếu bạn muốn kiểm soát toàn bộ mà không thể đạt được với các tùy chọn trên, luôn có khả năng sử dụng tập lệnh để thao tác dữ liệu phản hồi.

Đối với biến xác định trước của Beanshell Post Processor, "dữ liệu" có sẵn. Nó là một mảng byte chứa phản hồi của máy chủ cho trình lấy mẫu chính.

Đối với Bộ xử lý bài đăng JSR223 hoặc BSF, tồn tại một biến được xác định trước “trước”. Nó là viết tắt của cá thể lớp SampleResult và cho thấy:

- getResponseData () - trả về mảng byte giống như biến "dữ liệu" cho Beanshell.
- getResponseDataAsString () - là một biểu diễn chuỗi của dữ liệu phản hồi của trình lấy mẫu chính

### 2. Demo

Step 1: Add Thread Group - HTTP Request sampler

Step 2 : Add values in HTTP Request sampler

![](https://images.viblo.asia/e50a9e52-ce90-406e-b682-e30afb8bcf08.PNG)


Step 3 : Add Listeners to view results

![](https://images.viblo.asia/3219822b-fee7-41b4-83b0-f9888914e948.PNG)

Step 4 : Add Listener - Save Responses to a file 
cách mở : HTTP request --> Add --> Lisener -->  Save Responser to file 
Các ý nghĩa đã mô tả như trên 

![](https://images.viblo.asia/3a23c5fa-a56d-4ca8-b5c1-999f496e6765.PNG)

Step 5 : Add values to this Listener
Chú ý ta có hể đánh số cho file tự động bằng cách  Tool --> Function Helper diolog --> chọn thear Num --> lấy được biến 
${__threadNum}

![](https://images.viblo.asia/e88ff081-dae4-4e95-857f-e1577a3e2ddd.PNG)

Step 6 : Run and Validate

![](https://images.viblo.asia/df1a995d-0baa-4287-9189-285e9e8dfd21.PNG)


Cảm ơn các bạn đã đọc.