### 1. Fuzz testing là gì?
Hiện nay việc kiểm thử phần mềm luôn được ưu tiên hàng đầu trong mỗi dự án. Để có thể đảm bảo được phần mềm đáp ứng đầy đủ yêu cầu đặt ra của khách hàng và hướng tới sản phẩm với chất lượng cao thì việc chúng ta chủ động ngăn ngừa lỗi, defect xảy ra với phần mềm là thiết yếu.

![](https://images.viblo.asia/bb06e00f-0dbc-4f96-8eb0-ac2a3a20a15b.png)

Fuzzing là một kỹ thuật kiểm thử hộp đen giúp phát hiện lỗi của phần mềm bằng cách sử dụng phương pháp sinh dữ liệu và chuyển cho hệ thống xử lý. Nó cung cấp dữ liệu không hợp lệ ở đầu vào, sau đó các lỗi xảy ra khi phần mềm xử lý dữ liệu sẽ được ghi lại.

#### Ưu điểm:
- Cải thiện security testing.
- Lỗi được tìm thấy từ fuzz testing đôi khi nghiêm trọng và hầu hết được hacker lợi dụng như: rò rỉ bộ nhớ, hay ngoại lệ chưa được giải quyết,...
- Sử dụng fuzz testing có thể tránh trường hợp sót trường hợp kiểm thử khi mà tester kiểm thử thủ công hoặc không đủ thời gian và nguồn lực.
#### Nhược điểm:
- Không thể cung cấp đầy đủ về lỗi bảo mật tổng thể
- Ít hiệu quả hơn với các lỗi không gây ra sự cố treo phần mềm như: virut,..
- Chỉ có thể phát hiện lỗi đơn giản hoặc các mối đe dọa.
- Để thực hiện hiệu quả lớn thì cũng tốn nhiều thời gian.
- Điều kiện giá trị biên đầu vào ngẫu nhiên sẽ khó hơn với những ứng dụng đầu vào phức tạp.


### 2. Làm sao để bắt đầu
Nếu bạn muốn kết hợp fuzz testing vào 1 phần chu kỳ QA, hãy bắt đầu từ việc tách biệt các ứng dụng hoặc một phần của chúng khỏi hệ thống. Bắt đầu kiểm thử và xác định xem có sự cố xảy ra hay không.

Theo dõi bất kỳ log, sự cố, tệp tin và dữ liệu nào sử dụng gây ra lỗi, và bàn giao lại cho lập trình viên kiểm tra.

### 3. Chiến lược fuzz testing
Các bước cơ bản thực hiện fuzz testing:
![](https://images.viblo.asia/d22cf489-28c4-45c3-8143-880f9548a2b7.png)
- Bước 1: Xác định mục tiêu

- Bước 2: Xác định đầu vào

- Bước 3: Tạo trường hợp kiểm thử với dữ liệu fuzz

- Bước 4: Thực hiện kiểm thử sử dụng dữ liệu fuzz

- Bước 5: Theo dõi phần mềm khi chạy dữ liệu fuzz

- Bước 6: Ghi lại quá trình ở bước 5

Một số chiến lược được dùng trong fuzz testing:

- **Mutation-Based fuzzers**: tiếp cận từ dữ liệu chuẩn để có thể tạo ra tệp dữ liệu để thực hiện kiểm thử fuzz.

- **Generation-Based fuzzers**: thực hiện tạo dữ liệu dựa trên yêu cầu đầu vào.

- **Protocol-based fuzzer**: từ các trường hợp kiểm thử sử dụng đầu vào hợp lệ và không hợp lệ chúng ta có thể đưa vào hệ thống và thực hiện kiểm tra từ nội dung, hoạt động, thứ tự,...

### 4. Các lỗi được phát hiện từ fuzz testing

![](https://images.viblo.asia/a6cdf479-c2b8-4943-a579-8c5097311f3e.jpg)

- **Lỗi assertion và rò rỉ bộ nhớ**: Phương pháp này được sử dụng cho các ứng dụng lớn, nơi mà các lỗi liên quan tới an toàn bộ nhớ, một lỗ hổng nghiêm trọng.

- **Đầu vào không hợp lệ**: Từ dữ liệu đầu vào không hợp lệ được sử dụng để kiểm tra các trường hợp xử lý lỗi của hệ thống. Và giúp hệ thống đưa ra hướng giải quyết khi dữ liệu đầu vào lỗi.

- **Lỗi về độ chính xác**: Chẳng hạn như lỗi cơ sở dữ liệu hay kết quả tìm kiếm sai,....


### 5. Ví dụ cho fuzz testing
Một thử nghiệm fuzz tốt sẽ kết hợp các yếu tố từ cả hai loại dữ liệu ngẫu nhiên, được giải thích dưới đây:

##### Ngẫu nhiên gián tiếp
Fuzz testing với dữ liệu ngẫu nhiên gián tiếp, sử dụng dữ liệu ngẫu nhiên hoàn toàn: bất kỳ độ dài, bất kỳ nội dung ký tự….không hề có khuôn mẫu cho nó.

Mục đích của việc sử dụng loại dữ liệu này là để nhanh chóng tìm thấy bất kỳ điều kiện không mong muốn nào trong phần dọn dẹp mã code hay không. Những nơi có thể gây ra sự cố ở giai đoạn này có thể là nơi được giả định như sau:

- **Độ dài dữ liệu**: 
Phương thức A gọi phương thức B, phương thức B có giới hạn 50 ký tự nhưng phương thức A có giới hạn nhiều hơn 50 ký tự => Logic cần được thêm vào phương thức A đó là cắt bớt dữ liệu để phương thức B được giới hạn 50 ký tự.

- **Chuỗi mã hóa**:
Ví dụ thêm một dấu phẩy hay một ký tự đặc biệt trong một chuỗi. Điều này có thể dẫn đến lỗi sau khi phân tách chuỗi, gây ra sự cố sau này.

- **Kiểu dữ liệu không mong muốn**:
Nếu giả định dữ liệu luôn luôn là chữ thì đầu vào là số sẽ gây ra lỗi. Khi yêu cầu dữ liệu là định dạng nhất định, bạn vẫn cần phải thử nghiệm trường hợp đầu vào không phải là định dạng mong muốn để ngăn chặn lỗi đến với người dùng.

##### Ngẫu nhiên trực tiếp
Sau các bước trên, dữ liệu sẽ đi vào phần chức năng của hệ thống. Tại đây chúng ta nên chú trọng những ứng dụng có phần nguy hiểm, điểm yếu của hệ thống.
Kiểu của fuzz testing: lấy dữ liệu đầu vào tốt, để nó có thể chạy hết ứng dụng, và tìm kiếm vấn đề liên quan tới chức năng của ứng dụng

##### Fuzz testing trong thế giới thực
Trong lĩnh vực tài chính, các nhà máy đánh dấu tần số cao cho thị trường chứng khoán. Các mã có khoảng 150 chương trình cho người dùng và tiêu thụ dữ liệu thô - trong đó mỗi thị trường có thông số kỹ thuật khác nhau, tiếp đó chuẩn hóa dữ liệu cho phần còn lại của hệ thống để sử dụng

Vì nhịp độ của nó rất nhanh và downtime có thể khiến khách hàng mất hàng ngàn đô-la mỗi giây. Chương trình này cần đặt log để ghi lại mỗi khi có lỗi xảy ra. Đương nhiên là không nên đổ một tập tin lỗi và ngăn chặn hệ thống.

Vì vậy, việc xử lý loại dữ liệu đầu vào ngẫu nhiên khác nhau của hệ thống sẽ khiến hệ thống giảm thiểu thất bại đi đáng kể.

Khi phát hiện lỗi, tập tin lỗi được lọc ra và đặt sang thư mục riêng để các lập trình viên có thể khắc phục sự cố sau này. Việc xử lý này có thể thực hiện hàng chục lần mỗi giây, và nó có thể tìm thấy một số lỗi mà bạn mất cả ngày, cả tuần hay cả tháng để viết được trường hợp kiểm thử cụ thể.

Nói rằng: “ Điều đó sẽ không bao giờ xảy ra”?
Đó là lời sẽ được nói khi đứng trước lỗi lớn xảy ra. Mặc dù các tình huống kiểm thử fuzz testing có vẻ không thực tế, nhưng nếu ứng dụng gặp sự cố thì chắc chắn sẽ đến từ nguyên nhân xử lý dữ liệu không đúng cách, sai logic hoặc ….

### 6. Một số công cụ fuzz testing
- Peach fuzzera
- Spike proxy
- Webscarab
- Burp
- OWASP WSFuzzer
- AppScan

### Kết luận:
Có rất nhiều cách để bạn có thể dùng để tìm thấy lỗi, và một cách tôi giới thiệu trong bài viết này đó là “ Fuzz testing”. Fuzz testing có nhiều bài kiểm thử hơn là chỉ kiểm tra chức năng. Viết mã tốt không quan trọng bằng việc mọi thứ xảy ra sai. Fuzz testing sẽ giúp tester trong trường hợp này. Thay vì xây dựng kiểm thử đầu vào đã biết và đầu ra được mong đợi, thì “fuzz testing” sẽ dùng ngẫu nhiên đầu vào và đầu ra sẽ là “don’t crash”.

Nguồn tham khảo: 
https://www.guru99.com/fuzz-testing.html
https://techbeacon.com/intro-fuzz-testing-how-prevent-your-next-epic-qa-fail-easy-way