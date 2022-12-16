## 1. Fuzz Testing là gì?
- Fuzz Testing là một loại thử nghiệm trong đó các kỹ thuật kiểm tra tự động hoặc bán tự động được sử dụng để phát hiện lỗi mã hóa và lỗ hổng bảo mật trong phần mềm, hệ điều hành hoặc mạng bằng cách nhập dữ liệu không hợp lệ hoặc ngẫu nhiên gọi là **FUZZ** vào hệ thống. Sau đó hệ thống được giám sát cho các ngoại lệ khác nhau, chẳng hạn như bị hỏng hệ thống hoặc không có mã tích hợp, ...

- Fuzz Testing hoặc Fuzzing là một kỹ thuật kiểm thử phần mềm, và là một loại **Security Testing**.

Ví dụ, kiểm tra Fuzz có thể bao gồm đầu vào của các loại số nguyên, chuỗi ký tự, phao nổi và các biến khác, nếu không được nhập chính xác, có thể khiến ứng dụng phần mềm bị treo hoặc crash. 
- Chẳng hạn, một trường số nguyên chứa một số cụ thể từ 1 đến 5, nhưng người dùng có thể nhập bất kỳ số nguyên nào do thiết lập chung của trường nhập hoặc điều khiển. 
- Việc nhập giá trị cao có thể gây ra lỗi hoặc sự cố. Trong thử nghiệm Fuzz, các nhà phát triển thử nghiệm với nhiều loại phản ứng ngẫu nhiên khác nhau và sau đó ghi lại bất kỳ lỗi nào xảy ra. Trong một số trường hợp, các nhà phát triển có thể sử dụng một công cụ gọi là một fuzzer để tiêm dữ liệu ngẫu nhiên.

## 2. Tại sao sử dụng Fuzz testing?
- Thông thường, Fuzz testing tìm thấy defect hoặc fault bảo mật nghiêm trọng nhất.
- Fuzz testing cho kết quả hiệu quả hơn khi được sử dụng với Kiểm tra hộp đen (Black box testing), Thử nghiệm Beta và các phương pháp debug khác.
- Fuzz testing sử dụng để kiểm tra tính dễ bị hư hỏng của phần mềm. Đó là kỹ thuật kiểm tra rất hiệu quả về chi phí.
- Fuzz testing là một trong những kỹ thuật thử nghiệm hộp đen. Fuzzing là một trong những hackers phương pháp phổ biến nhất được sử dụng để tìm lỗ hổng của hệ thống.
## 3. Chiến lược kiểm tra Fuzz
Các bước để kiểm tra fuzz bao gồm:

- Bước 1: Xác định hệ thống đích

- Bước 2: Xác định đầu vào

- Bước 3: Tạo dữ liệu mờ

- Bước 4: Thực hiện kiểm tra bằng cách sử dụng dữ liệu mờ

- Bước 5: Theo dõi hành vi hệ thống

- Bước 6: Log defects
![](https://images.viblo.asia/2a10da19-c5f6-4874-ab52-6725b0edeb58.png)

## 4. Chiến lược kiểm tra fuzz 
* **Mutation-Based Fuzzers**: Các Fuzzers dựa trên đột biến thay đổi các mẫu dữ liệu hiện có để tạo dữ liệu thử nghiệm mới. Đây là cách tiếp cận rất đơn giản và thẳng tiến, điều này bắt đầu với các mẫu giao thức hợp lệ và giữ xén từng byte hoặc tệp.

* **Generation-Based Fuzzers**: Fuzzers dựa trên thế hệ xác định dữ liệu mới dựa trên đầu vào của mô hình. Nó bắt đầu tạo ra đầu vào từ đầu dựa trên đặc điểm kỹ thuật.

* **PROTOCOL-BASED-FUZZER** : bộ lọc thành công nhất là có kiến thức chi tiết về định dạng giao thức đang được thử nghiệm. Sự hiểu biết phụ thuộc vào đặc điểm kỹ thuật. 
    * Nó liên quan đến việc viết một mảng đặc tả vào công cụ sau đó bằng cách sử dụng kỹ thuật tạo mô hình dựa trên mô hình đi qua đặc điểm kỹ thuật và thêm bất thường trong nội dung dữ liệu, chuỗi, ... Điều này còn được gọi là kiểm tra cú pháp, kiểm tra ngữ pháp, kiểm tra độ mạnh, ...
    * Fuzzer có thể tạo ra các trường hợp thử nghiệm từ hiện tại, hoặc chúng có thể sử dụng các đầu vào hợp lệ hoặc không hợp lệ.
* Có hai hạn chế của fuzzing dựa trên giao thức:
    * Thử nghiệm không thể tiến hành cho đến khi đặc điểm kỹ thuật chín muồi.
    * Nhiều giao thức hữu ích là phần mở rộng của các giao thức đã publish. Nếu kiểm tra Fuzz dựa trên các thông số kỹ thuật đã publish, phạm vi kiểm tra cho các giao thức mới sẽ bị hạn chế.
* Dạng đơn giản nhất của kỹ thuật Fuzz là gửi đầu vào ngẫu nhiên vào phần mềm hoặc dưới dạng gói giao thức hoặc dưới dạng event. Kỹ thuật truyền đầu vào ngẫu nhiên này rất mạnh để tìm lỗi trong nhiều ứng dụng và dịch vụ.
* Các kỹ thuật khác cũng có sẵn và rất dễ thực hiện. Để thực hiện các kỹ thuật này, chúng ta chỉ cần thay đổi các đầu vào hiện có. Chúng ta có thể thay đổi đầu vào chỉ bằng cách hoán đổi các bit của đầu vào.
## 5. Các loại lỗi được phát hiện bởi Fuzz Testing
- Assertion failures and memory leaks (Lỗi xác nhận và rò rỉ bộ nhớ): Phương pháp này được sử dụng rộng rãi cho các ứng dụng lớn, nơi các lỗi đang ảnh hưởng đến sự an toàn của bộ nhớ, đó là một lỗ hổng nghiêm trọng.

- Invalid input (Đầu vào không hợp lệ)
Trong thử nghiệm mờ, các fuzzers được sử dụng để tạo ra một đầu vào không hợp lệ được sử dụng để kiểm tra các thường trình xử lý lỗi và điều này quan trọng đối với phần mềm không kiểm soát đầu vào của nó. Sự mờ đơn giản có thể được biết đến như một cách để tự động kiểm tra số âm.

- Correctness bugs (Lỗi chính xác)
Fuzzing được sử dụng để phát hiện một số loại lỗi "đúng đắn". Chẳng hạn như cơ sở dữ liệu bị hỏng, kết quả tìm kiếm kém, ...

## 6. Công cụ kiểm tra Fuzz
Các công cụ được sử dụng trong bảo mật web có thể được sử dụng rộng rãi trong các thử nghiệm mờ như Burp Suite, Peach Fuzzer, ...

* Peach Fuzzera

Peach Fuzzer cung cấp phạm vi bảo mật mạnh mẽ và bảo mật hơn so với scanner. Các công cụ kiểm tra khác chỉ có thể tìm kiếm các chủ đề đã biết trong khi Peach Fuzzer cho phép người dùng tìm cả các chủ đề đã biết và chưa biết.

* Proxy Spike

Nó là một công cụ cấp chuyên nghiệp tìm kiếm các lỗ hổng cấp ứng dụng trong các ứng dụng web. SPIKE Proxy bao gồm các vấn đề cơ bản, chẳng hạn như SQL Injection và cross-site-scripting, nhưng nó hoàn toàn là cơ sở hạ tầng Python mở. SPIKE Proxy có sẵn cho Linux và Windows.

* Webscarab

Webscarab được viết bằng Java do đó di động với nhiều nền tảng. Để phân tích ứng dụng, khung công tác Webscarab được sử dụng để giao tiếp sử dụng giao thức HTTP và HTTPS.
+ +  Ví dụ: Webscarab hoạt động như một proxy chặn, nó cho phép toán tử xem xét và sửa đổi yêu cầu được tạo bởi trình duyệt trước khi chúng được máy chủ nhận. Và cho phép xem lại và cập nhật phản hồi do máy chủ tạo ra trước khi trình duyệt nhận được. Bằng cách này, nếu web scarab tìm thấy bất kỳ lỗ hổng nào, nó sẽ làm cho danh sách các vấn đề được báo cáo.

* Burp

Burp được sử dụng như một công cụ bảo mật cho ứng dụng web java. Burp được sử dụng để xử lý các cuộc tấn công chống lại các ứng dụng bao gồm kiểm tra các lỗ hổng ứng dụng web như tràn bộ đệm, kịch bản lệnh cross-site, chèn SQL, ...

* OWASP WSFuzzer

WSFuzzer là một chương trình GPL được viết bằng Python. Chương trình GPL hiện đang nhắm mục tiêu các Dịch vụ Web. Trong phiên bản hiện tại của OWASPWSFuzzer, các dịch vụ SOAP dựa trên HTTP là mục tiêu chính.

* AppScan

AppScan quét và kiểm tra tất cả các lỗ hổng ứng dụng web phổ biến như SQL-Injection, Cross-Site Scripting và Buffer Overflow.

## 7. Ưu điểm và nhược điểm của thử nghiệm Fuzz
### 1. Ưu điểm

- Kiểm tra Fuzz cải thiện Kiểm thử Security phần mềm .
- Bugs tìm thấy trong fuzzing đôi khi nghiêm trọng và hầu hết thời gian được sử dụng bởi hackers bao gồm cả crashes, memory leak(rò rỉ bộ nhớ), unhandled exception,...
- Bất kỳ các bug mà không nhận được sự chú ý của người thử nghiệm do giới hạn thời gian và tài nguyên, các lỗi đó cũng được tìm thấy trong thử nghiệm Fuzz.

### 2. Nhược điểm

- Chỉ riêng thử nghiệm Fuzz không thể cung cấp bức tranh hoàn chỉnh về mối đe dọa hoặc lỗi bảo mật tổng thể.
- Kiểm tra Fuzz ít hiệu quả hơn trong việc xử lý các mối đe dọa bảo mật không gây ra sự cố chương trình, chẳng hạn như một số virus, worms, Trojan...
- Thử nghiệm Fuzz có thể phát hiện lỗi đơn giản hoặc các mối đe dọa.
- Để thực hiện hiệu quả, nó sẽ đòi hỏi thời gian đáng kể.
- Thiết lập điều kiện giá trị biên với đầu vào ngẫu nhiên là rất khó nhưng bây giờ sử dụng các thuật toán xác định dựa trên người dùng đầu vào hầu hết những người thử nghiệm giải quyết vấn đề này.

## Kết luận:

Kiểm tra Fuzz cho thấy sự hiện diện của các lỗi trong một ứng dụng. 
Fuzzing không thể đảm bảo phát hiện lỗi hoàn toàn trong một ứng dụng. Nhưng bằng cách sử dụng kỹ thuật Fuzz, nó đảm bảo rằng ứng dụng là mạnh mẽ và an toàn, vì kỹ thuật này giúp phơi bày hầu hết các lỗ hổng phổ biến.



## Tham khảo
https://www.guru99.com/fuzz-testing.html

https://medium.com/ouspg/fuzz-testing-beginners-guide-da2c9179caa7