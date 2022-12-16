Khi nói về các loại dịch vụ trên mạng, các dịch vụ web, người ta phải phân biệt các thuật ngữ sau vì chúng dễ gây nhầm lẫn:
- Một **protocol** (giao thức) như SOAP hoặc XML-RPC mô tả cú pháp hợp lệ của các yêu cầu và phản hồi API
- Một **architectural style** (kiểu kiến trúc) hoặc **paradigm** (mô hình) như REST đặt ra các quy tắc và mục tiêu của API nhưng không nhất thiết phải bao gồm cú pháp hoặc chi tiết chính xác của communication
- **Description languages** (các ngôn ngữ mô tả) như WADL (đối với dịch vụ web RESTful) hoặc WSDL (đối với dịch vụ web dựa trên SOAP) chỉ mô tả API theo cách được tiêu chuẩn hóa. Chúng liệt kê tất cả các phương thức và tham số API cũng như định dạng của các yêu cầu và phản hồi. Ngôn ngữ mô tả thường sử dụng là ngôn ngữ đánh dấu XML
- **Languages** (các ngôn ngữ) như GraphQL, JSON hoặc XML được sử dụng để xác định định dạng và cú pháp của các lệnh gọi API (yêu cầu và phản hồi) hoặc mô tả API. Điều đó có nghĩa là một API có tài liệu được viết bằng XML có thể sử dụng JSON hoặc các chuỗi truy vấn đơn giản cho các lệnh gọi API thực tế và không nhất thiết phải sử dụng XML cho điều đó

# API protocol (example): SOAP
* Simple Object Access Protocol (Giao thức truy cập đối tượng đơn giản) hoặc SOAP là giao thức gọn nhẹ dành cho người dùng để trao đổi thông tin có cấu trúc trong môi trường phi tập trung, phân tán (https://www.w3.org/TR/soap12-part1) và là giao thức kế thừa của XML-RPC
* Các lệnh gọi API (API-calls) của nó sử dụng một biến thể của ngôn ngữ đánh dấu XML để giao tiếp được tiêu chuẩn hóa
* SOAP APIs thường được mô tả bằng WSDL
* Khái niệm đóng gói dữ liệu chỉ định các thông báo bao gồm một phong bì chứa **SOAP Header** (tiêu đề SOAP) và **SOAP Body** (phần thân SOAP)

![](https://images.viblo.asia/71559c8b-2f1f-484d-a645-96825e43aa6f.png)

* Yêu cầu thô (với định dạng text/xml) cho lệnh gọi SOAP POST:

```
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sam="http://www.soapui.org/sample/">;
    <soap:Header/>
    <soap:Body>
        <sam:search>
            <searchstring>Alice</searchstring>
        </sam:search>
    </soap:Body>
</soap:Envelope>
```

* Khi bạn đã đệ trình, API endpoint sẽ tìm kiếm những người có tên đầu tiên bằng với tên được xác định bên trong thẻ `<searchstring>`
* Phản hồi cũng là XML (kết quả tìm kiếm được highlight). Phản hồi SOAP tuân theo các quy tắc và cú pháp giống như yêu cầu. Nhưng thay vì một đối tượng `<sam:search>`, nó sẽ sử dụng `<sam: searchResponse>` để phục vụ việc tìm kiếm

![](https://images.viblo.asia/fedf6517-c647-4adb-993a-8fda8aee26b6.png)

* Nếu không tìm thấy gì, kết quả tìm kiếm sẽ hiển thị thông báo lỗi:

![](https://images.viblo.asia/7a2a9ca9-a8a6-48c2-af57-664bada953a2.png)

# Description language (example): WADL
* Web Application Description Language (Ngôn ngữ mô tả ứng dụng web) là một phương pháp tiêu chuẩn để mô tả các ứng dụng web dựa trên HTTP
* Nó đã được thiết kế để hỗ trợ mô hình hóa và trực quan hóa ứng dụng, tạo mã cũng như cấu hình của máy khách và máy chủ
* WADL dựa trên XML - giống như SOAP
* Tệp mô tả WADL bao gồm phần tử gốc bắt buộc như "application", các phần tử "resources" và các yếu tố tùy chọn khác:

![](https://images.viblo.asia/ecbd345a-af5e-4030-bdc6-4e826cf2fb85.png)

Một yêu tố bắt buộc khác cũng đã được highlight: `xmlns="http://wadl.dev.java.net/2009/02"`
Postman cho phép bạn import trực tiếp WADL hợp lệ và tạo một bộ sưu tập mới từ nó. Ví dụ này được lấy từ thông số kỹ thuật chính thức của WADL tại https://www.w3.org/Submission/wadl/.

![](https://images.viblo.asia/6c9caa6a-6fff-487c-87cd-e5823a4807ac.png)

Để import WADL trực tiếp cần:
1. Click vào nút Import ở đầu giao diện người dùng Postman, sau đó mở tệp WADL từ hộp thoại "Import File", hoặc chọn tùy chọn "Paste Raw Text" để sao chép-dán mã trực tiếp.
2. Với điều kiện cú pháp của WADL là chính xác, Postman sẽ lưu trữ tất cả các yêu cầu từ tài liệu vào một bộ sưu tập mới:

![](https://images.viblo.asia/6f97ad87-044d-42b8-a8eb-34c56df309b1.png)

# Language (example): JSON
JSON là từ viết tắt của cụm từ "JavaScript Object Notation" (ký hiệu đối tượng JavaScript). Giống như tên cho thấy, mỗi đoạn mã JSON thực sự là một đối tượng javascript hợp lệ. Nó có khá nhiều ưu điểm:
* Dễ dàng được chuyển đổi sang các ngôn ngữ khác
* Rất ít chi phí, một đối tượng JSON chỉ bao gồm rất ít ký tự - ngoài tải trọng thực tế (dữ liệu bạn gửi đến hoặc từ API). Do đó, khả năng đọc của nó cũng rất tuyệt - một khi bạn đã học được cú pháp khá đơn giản: `{ "name": "John", age: 31, "city": "New York" }`
* Toàn bộ đối tượng JSON được đặt trong dấu ngoặc nhọn
* Các tham số riêng được phân tách bằng dấu phẩy
* Các cặp giá trị khóa được phân tách bằng dấu hai chấm như trong "key": "value"
* Văn bản (string) phải được nằm trong dấu ngoặc kép: "New York"
* Nhiều loại dữ liệu được cho phép, ví dụ: strings, numbers, arrays và các đối tượng JSON khác (được đặt trong dấu ngoặc nhọn). Ví dụ:

```
{"gigs": [
    {"name": "pop concert", "description": "a wonderful evening"},
    {"name": "festival", "description": "a weekend full of fun"}
]}
```

* Không có yêu cầu về khoảng cách hoặc padding, nhưng để dễ đọc hơn, nên sử dụng một số thụt đầu dòng và đặt từng đối tượng vào dòng riêng của nó. Tất cả khoảng trắng không phải là một phần của giá trị (bên trong dấu ngoặc kép) thường sẽ bị cắt và loại bỏ bởi máy chủ

Hãy xem một ví dụ trên Postman:
* Đây là yêu cầu tương tự như trước đây (tìm kiếm người theo tên) nhưng lần này là với JSON:

![](https://images.viblo.asia/6d3429de-c319-4a24-ad9c-a802fa04c23c.png)

* Kết quả cũng là một đối tượng JSON: `{“Alice Xiang”}`
* Đảm bảo chọn Content-Type phù hợp cho yêu cầu: application / json

![](https://images.viblo.asia/4f3073bb-9396-4fc3-a2ab-10e33b246b38.png)

* Khi không có kết quả hợp lệ cho chuỗi tìm kiếm đã cho, bạn sẽ nhận được phản hồi "not found":

![](https://images.viblo.asia/c2969eae-8b20-4405-bf8d-407ca4ce96fc.png)

# Các công cụ và công nghệ kiểm tra API thú vị khác
Bạn đã học cách kiểm tra các dịch vụ web bằng Postman. Tất nhiên, có những công cụ khác mà ít nhất bạn nên nghe nói đến.
* **SoapUI**: SoapUI là một ứng dụng thử nghiệm cho cả REST APIs và SOAP APIs. Phiên bản cơ bản là mã nguồn mở và miễn phí. Công dụng chính của nó là để thiết kế và thực hiện các thử nghiệm tự động, nhưng nó cũng có thể được sử dụng để thử nghiệm thủ công

![](https://images.viblo.asia/9eeb8e72-4a96-4029-ba83-9d29200dd9c6.png)

* **GraphQL**:
    * Được thiết kế ban đầu bởi và cho Facebook, GraphQL nhanh chóng trở thành ngôn ngữ phổ biến cho các dịch vụ web. Công nghệ nguồn mở này được lưu trữ bởi Quỹ phi lợi nhuận Linux Foundation
    * Ngôn ngữ này có GraphQL Schema Definition Language (Ngôn ngữ Định nghĩa Lược đồ GraphQL) riêng. Nó trông hơi giống với JSON. Nhưng ngoài việc là một định dạng thuần túy để truyền dữ liệu, nó còn có ngôn ngữ truy vấn và sửa đổi dữ liệu rất mạnh của riêng nó

![](https://images.viblo.asia/5a7e1716-cbb8-463a-a0fd-f2925315cd1e.png)

* **Swagger UI**: 
    * Một dự án nguồn mở khác giúp kết xuất tài liệu dịch vụ web
    * Nó bao gồm một tập hợp các HTML, Javascript và CSS và có thể tự động tạo tài liệu web có thể duyệt từ bất kỳ API tuân thủ nào

![](https://images.viblo.asia/5dac6c32-0196-48d4-b3ee-43002ca9202f.png)

Đây là các tệp tập lệnh được sử dụng trong các yêu cầu trong khóa học này: https://github.com/MartinRJ/testtraining


**Nguồn tham khảo:**

Dịch từ: https://www.utest.com/academy/tracks/28/courses/common-types-of-apis-and-web-services