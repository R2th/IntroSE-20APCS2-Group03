## 1. Response time testing là gì?
* ![](https://images.viblo.asia/3d2e51b6-5cec-4dc7-bae4-2dc8fb4e20b4.png)

- Response time testing là một loại kiểm thử đo lường thời gian phản hồi trung bình của yêu cầu được gửi lên máy chủ.
- Là thời gian để hệ thống xử lý một input đầu vào  cho đến khi xử lý kết thúc, chúng ta có thể hiểu một input đầu vào là một lệnh truy vấn (query) hay mỗi tiến trình xử lý bao gồm các phép thực thi có xác định điểm đầu và điểm cuối (transaction).
- Nói một cách thông dụng, đó là khoảng thời gian từ khi người dùng gửi yêu cầu cho đến khi ứng dụng chỉ ra rằng yêu cầu đã hoàn thành.

## 2. Đo lường response time như thế nào ?
### a. Đo lường thời gian phản hồi.
 - Chúng ta không thể đo lường thời gian phản hồi của hệ thống bằng manual testing, mà phải sử dụng các công cụ hỗ trợ.
 - Tất nhiên, đơn vị đo lường cho Response time là đơn vị thời gian (m, s, ms), được sử dụng nhiều nhất trong các công cụ kiểm thử là millisecond (ms).
### b. Các công cụ đo lường Response time thông dụng
* ![](https://images.viblo.asia/d98efd49-fb58-4ee3-b7db-281fe60292e9.jpg)

 - Có 3 công cụ hỗ trợ cho kiểm thử thời gian phản hồi của hệ thống được sử dụng nhiều nhất là:
     + **Jmeter** http://jmeter.apache.org/download_jmeter.cgi
     + **Load Runner** https://www.microfocus.com/en-us/products/loadrunner-professional/free-trial
      + **AEM** https://helpx.adobe.com/in/experience-manager/6-3/sites/developing/using/aem-eclipse.html
      
*   Trong cùng một tiến trình, response time được đo lường từ các công cụ khác nhau sẽ trả về kết quả có chút khác nhau, vì:
     + Sự khác nhau về phương pháp tính toán, thu nhập số liệu của mỗi tool.
     + Sự ảnh hưởng của các công cụ mô phỏng tốc độ tải và tốc độ chụp, được sử dụng trong mỗi tool.
     + Các mục tiêu được sử dụng để ghi lại và theo dõi tiến trình (report).
     + Mức tiêu thụ tài nguyên khi tính toán số liệu thu thập được ở mỗi tool khác nhau.
     + Sự khác nhau về kiến trúc của mỗ công cụ.
## 3. Các số liệu phản hồi
 Có 3 số liệu được sử dụng để thu thập, đánh giá Response time.
### Thời gian đáp ứng trung bình (Average response time)
- Thời gian phản hồi trung bình của mỗi request là số liệu sau khi tính trung bình của tất cả thời gian phản hồi cho request đó. Là sự phản ánh tốc độ của ứng dụng web đang được thử nghiệm - chỉ số TỐT NHẤT về cách trang web hoạt động theo quan điểm của người dùng. Nghĩa là khi sử dụng, người dùng cảm thấy thỏa mãn với tốc độ phản hồi khi hoạt động trên trang web.
- Thời gian phản hồi trung bình bị ảnh hưởng bởi nhiều thành phần, bao gồm việc phân phối HTML, hình ảnh, CSS, XML, tệp Javascript và bất kỳ tài nguyên nào khác đang được sử dụng.
   + Ngoài ra, một tác động nhỏ từ vị trí địa lý như end-user ở cách xa cũng ảnh hưởng đến thời gian phản hồi.
- Ta có thể đo được Average response time, thông qua JMeter.
* ![](https://images.viblo.asia/1c582823-863e-40dc-ab7c-ededb6d6685e.jpg)
* Biểu đồ trên thể hiện thời gian phản hồi trung bình của 400 requests gửi đến trang https://tiki.vn.
    Qua đó, chúng ta có thể thấy được, tool đã thu thập và phân tích ra được thời gian phản hồi trung bình là 6727 milliseconds.
### Thời gian đáp ứng cao điểm (Peak response time)
   - Thời gian đáp ứng cao điểm sẽ cho ta biết được, request nào có thời gian phản hồi cao nhất. Từ đó có thể phát hiện được những thành phần khả năng đang có vấn đề, những bất thường trong trang web hoặc có thể đang xử lý không chính xác.
       - Có thể hiểu trong tiến trình có sử dụng truy vấn dữ liệu nhiều, tải lên tệp hình ảnh hoặc gọi các thư viện JS lớn, thì những request đó sẽ cần thời gian phản hồi cao hơn so với các request khác. Nhờ đó, số liệu về thời gian đáp ứng cao điểm, sẽ giúp cho các developer có thể xác định được nguyên nhân dẫn đến response time trung bình bị giảm (thời gian phản hồi cao), để có thể có những giải pháp cải thiện.
    - Ví dụ:
   Sau khi chạy các request trong JMeter, ta có bảng kết quả:
- [Tham khảo](https://viblo.asia/p/kiem-thu-hieu-nang-voi-jmeter-gDVK2eWm5Lj) để tạo ra bảng kết quả.
* ![](https://images.viblo.asia/2e44ccdf-a736-428a-970e-eaf4867d2a83.jpg)
    * Request "PHU KIEN" là thời gian đáp ứng cao điểm (Peak response time), vì nó chiếm thời gian phản hồi cao nhất (đỏ - 4795 ms)
    * Request "BACH HOA" có thời gian phản hồi thấp nhất (vàng - 223 ms)
    * Thời gian phản hồi trung bình của cả 4 requests là 1402 ms.
###   Tỷ lệ lỗi (Error rate)
   + Tỷ lệ lỗi thể hiện tỷ lệ phần trăm của các requests gặp sự cố trên tất cả các request được gửi trong cả tiến trình. Nó cũng bao gồm cả những requests đã hết thời gian phản hồi.
   + Nó được tính toán thông qua việc đếm tất cả HTTP status code hiển thị trên máy chủ.
   + Ví dụ: Tỷ lệ lỗi trong ví dụ dưới đây là 20% trong tổng số các requests.
* ![](https://images.viblo.asia/2c84b87a-347f-41f6-a38c-ea670b455634.jpg)

## 4. Ba giá trị response time quan trọng
Thông thường thời gian để người dùng chờ đợi cho máy chủ phản hồi sẽ được liệt kê vào 3 giá trị chính sau:
|Response time||
| -------- | -------- | -------- |
|0.1 second |Đó là thời gian phản hồi lý tưởng. Người dùng sẽ cảm thấy hệ thống phản hồi các yêu cầu ngay lập tức và không có bất kỳ sự gián đoạn nào.|
|1.0 second| Nó được xem như giới hạn tối đa của thời gian phản hồi có thể chấp nhận được. Người dùng có thể vẫn không cảm thấy có sự gián đoạn khi máy chủ phản hồi các yêu cầu. Tuy nhiên nó vẫn làm ảnh hưởng đến trải nghiệm của người dùng. |
|10 seconds| Đây là giới hạn tối đa vượt quá giới hạn chấp nhận được, nó ảnh hưởng lớn đến trải nghiệm người dùng và thông thường khi đợi quá 6s người dùng sẽ thoát khỏi trang web.|



-----

Tài liệu tham khảo:
* https://loadstorm.com/load-testing-metrics/
* https://www.guru99.com/response-time-testing.html
* https://viblo.asia/p/kiem-tra-thoi-gian-phan-hoi-response-time-testing-L4x5x8og5BM