![](https://images.viblo.asia/18cd4ad8-c806-4b53-bd18-9de3239802e1.png)

# 1. Kiểm thử chức năng là gì
Kiểm thử chức năng (hay **Functional Testing**) là một trong các quy trình đảm bảo chất lượng của lĩnh vực kiểm thử phần mềm. Đây là một loại kiểm thử hộp đen (`black box testing`), tức là các trường hợp nó cần xét đến sẽ dựa vào đặc tả của ứng dụng/phần mềm hoặc hệ thống đang thử nghiệm. Các chức năng sẽ được kiểm tra bằng cách nhập các giá trị đầu vào và sau đó sẽ kiểm tra, đánh giá các kết quả đầu ra mà không cần quan tâm đến các cấu trúc hay cài đặt bên trong của ứng dụng.

![](https://images.viblo.asia/7e0640dc-8a7a-4762-8ead-818dabafca84.png)

Kiểm thử chức năng là một quy trình so sánh sự khác biệt giữa đặc tả bên ngoài của phần mềm với các chức năng thực tế mà phần mềm cung cấp. Các đặc tả này phần nhiều sẽ dựa vào góc nhìn của người sử dụng về phần mềm, không liên quan đến các công nghệ sử dụng hay các thiết lập bên trong nó.Người sử dụng có thể là bất cứ ai, nếu họ tiếp xúc với phần mềm khi nó là thành phẩm có thể sử dụng được.

# 2. Tại sao cần phải kiểm thử chức năng
Trong kiểm thử phần mềm có nhiều quy trình, mỗi cái lại có một nhiệm vụ khác nhau.
* Kiểm thử đơn vị (`Unit testing`) sẽ kiểm tra sự khác biệt giữa đặc tả giao tiếp của đơn vị với thực tế đơn vị này cung cấp cho phần mềm.
* Kiểm thử hệ thống sẽ đánh giá độ phù hợp của phần mềm với mục tiêu đề ra
* Còn với kiểm thử chức năng, nó sẽ làm nốt phần còn lại, đánh giá độ phù hợp của phần mềm với các đặc tả bên ngoài của nó, về các hành vi của phần mềm mà người dùng thấy được.

Kiểm thử chức năng cũng đem lại khá nhiều lợi ích, chẳng hạn như tránh được việc kiểm thử dư thừa với các chức năng không cần thiết, hay ngăn chặn sự đa dạng lỗi tại cùng một thời điểm.

![](https://images.viblo.asia/f0990431-695e-40ad-9e29-e0ae7f3b1cbe.png)

# 3. Các bước tiến hành của kiểm thử chức năng
Thông thường kiểm thử chức năng sẽ tiến hành theo 6 bước sau:
1. Xác định các chức năng mà phần mềm dự kiến sẽ làm (dựa vào đặc tả của phần mềm)
2. Xác định bộ dữ liệu đầu vào dựa trên các thông số kỹ thuật của chức năng
3. Xác định bộ dữ liệu đầu ra dựa trên các thông số kỹ thuật của chức năng
4. Viết và thực thi các trường hợp kiểm thử (`test case`)
5. So sánh kết quả đầu ra chuẩn bị ở bước 3 và kết quả thực tế
6. Dựa vào nhu cầu của khách hàng để đánh giá xem kết quả ở bước 5 có phù hợp hay không

# 4. Các cấp độ của kiểm thử chức năng
Nhìn chung, khi kiểm thử chức năng, giống như những loại kiểm thử khác, chúng ta sẽ cần làm từ đơn giản đến phức tạp.

![](https://images.viblo.asia/6bdc6eb8-feec-44b9-acad-b3cc58a8b332.png)

* Đầu tiên và quan trọng nhất, chúng ta cần hiểu được luồng hoạt động, các quy trình vận hành của sản phẩm phần mềm.
* Sau đó chúng ta cần xác định được các nghiệp vụ sử dụng của nó
* Chúng ta sẽ kiểm thử các chức năng ở từng màn hình riêng biệt, chẳng hạn như màn hình đăng nhập, màn hình profile ...
* Sau khi kiểm thử từng màn hình chúng ta sẽ kiểm thử một mô đun chứa nhiều màn hình cùng nhóm
* Tiếp đến là kiểm thử một vòng hoàn chỉnh của nghiệp vụ và kiểm tra tất cả các vòng
* Cuối cùng chúng ta sẽ giả định như mình là người dùng thực tế, định ra các kịch bản đặc biệt và tiến hành kiểm tra nó.

# 5. Một số kỹ thuật của kiểm thử chức năng
### 5.1 Kiểm thử điều hướng của người dùng (`user navigation testing`)
Trong kỹ thuật này, chúng ta sẽ cần kiểm tra một số thành phần , các liên kết giữa màn hình này tới màn hình khác để đảm bảo cho sự hoạt động liên tục của nghiệp vụ đang thực hiện. Có thể kể đến 1 số thành phần như:
* Hệ thống đăng nhập, đăng xuất
![](https://images.viblo.asia/45ba0913-5392-4d32-b934-63b3dd0bfcda.png)


* Hệ thống thanh điều hướng (`navigation bar`, `sidebar`, `menubar`)

![](https://images.viblo.asia/5fc3687c-5cb4-49ff-8e94-55427c58b105.png)

![](https://images.viblo.asia/72ac4a8e-274a-4282-82a2-c6c81a8bd250.jpg)

* Hệ thống thanh công cụ (`toolbar`)

![](https://images.viblo.asia/4f75b267-3909-4bd6-a383-38c25fdcbabe.png)

* Hệ thống cây phân cấp chức năng

![](https://images.viblo.asia/ac798d20-a2ef-49b4-af04-b19bd413f4dc.png)

Kiểm thử khả năng điều hướng tập trung trên 2 vấn đề
* Người dùng đăng nhập vào hệ thống với một số quyền hạn nhất định.
* Người dùng thao tác qua các tính năng một cách tự nhiên không bị đứt quãng và sau đó sẽ đăng xuất.

### 5.2 Kiểm thử thao tác trên màn hình (`transaction screen testing`)
Thông thường sẽ là các form nhập liệu, hoặc một số các button chức năng, các options lựa chọn. Có 2 loại thường thấy:
* Kết quả sẽ được hiển thị ở một trang khác
* Kết quả sẽ được hiển thị ở ngay trang hiện tại

![](https://images.viblo.asia/e7a8e3b3-bde0-4434-ad52-35a67cb96873.jpg)

Với mỗi loại ô nhập liệu, hay các button, options, người kiểm thử cần xác định các trường hợp thao tác trên màn hình theo các yêu cầu đặc tả, tài liệu người dùng hay tài liệu quản trị viên tương ứng.  
Nếu kết quả hiển thị ngay trên màn hình thao tác hiện tại thì ta có thể dựa vào bộ dữ liệu đầu vào và đầu ra dự kiến để kiểm tra nó bằng phương pháp kiểm thử hộp đen. Tương tự nếu kết quả được hiển thị ở trang khác nếu là click vào các button.

### 5.3 Kiểm thử luồng thực hiện (`transaction flow testing`)
Với kỹ thuật này, chúng ta cần thực hiện liền mạch một số thao tác qua nhiều bước với nhiều màn hình khác nhau để đánh giá xem có phù hợp với luồng nghiệp vụ không.  
Chẳng hạn khi chúng ta muốn mở một khóa học trên hệ thống `E-learning` nào đó, ta cần làm các bước sau: 
1. Màn hình 1 cho phép tạo khóa học với các thông tin cho trước (VD: tên, nội dung, giới thiệu, thời gian học ...)
2. Màn hình 2 cho phép thêm các môn học cho khóa học
3. Màn hình 3 dùng để thêm giảng viên cho khóa học 
4. Màn hình 4 dùng để thêm học viên hoặc cho phép học viên đăng ký học
5. Màn hình 5 để xem kết quả khóa học sau khi tạo thành công.

![](https://images.viblo.asia/4b06247b-e9ae-4029-b568-05b0a4d05feb.png)

Chúng ta cần xác định 2 trường hợp
* Nếu người dùng thao tác đúng quy trình thì kết quả sẽ cho ra đúng như đặc tả yêu cầu.
* Nếu người dùng thao tác không đúng dù chỉ một bước thì sẽ không ra được kết quả.

### 5.4 Kiểm thử màn hình báo cáo (`report screen testing`)
Không như màn hình thao tác ở phần [5.2](#_52-kiem-thu-thao-tac-tren-man-hinh-transaction-screen-testing-6), màn hình báo cáo sẽ không yêu cầu phải nhập liệu. Ở đây cái chúng ta cần kiểm tra là cách hiển thị hay tìm kiếm dữ liệu. 

Có rất nhiều cách người dùng có thể đặc tả các dữ liệu cần tìm (như bộ lọc hay nhập các điều kiện tìm kiếm) hoặc cách mà dữ liệu được hiển thị (danh sách, bảng biểu, biểu đồ ....)

![](https://images.viblo.asia/c4803a88-0bb0-467f-b6fe-68334fda0e1a.png)

Chúng ta cần căn cứ vào đặc tả của ứng dụng để phân tích các trường hợp kiểm thử (`test case`), có thể có một số trường hợp như lựa chọn giá trị không phù hợp cho bộ lọc (VD: ngày bắt đầu lớn hay ngày kết thúc) hay dữ liệu không được hiển thị đúng (VD: bảng biểu không có tên các cột) 

### 5.5 Kiểm thử luồng báo cáo (`report flow testing`)
Ở đây chúng ta cần dựa vào tài liệu đặc tả để biết có bao nhiêu loại thể hiện báo cáo được hỗ trợ bởi phần mềm. Một phần mềm bình thường sẽ có thể hiển thị báo cáo lên màn hình, hoặc là in ra file, in ra giấy bằng máy in. Chúng ta cần đảm bảo có sự thống nhất về mặt nội dung và bố cục giữa tất cả các tài liệu in. Bên cạnh đó cũng cần đảm bảo đủ các phương thức in theo đặc tả. Nhiều lúc còn cần để ý đến định dạng font chữ, hoặc màu sắc nếu là in màu ....

![](https://images.viblo.asia/05399161-2a91-4f25-97e3-e0677a28b7b2.jpg)

# 6. So sánh kiểm thử chức năng và kiểm thử phi chức năng
Kiểm thử chức năng và phi chức năng được so sánh như trong bảng sau 

| Kiểm thử chức năng | Kiểm thử phi chức năng |
| --------------------------- | ---------------------------------- |
| Được thực hiện bằng cách sử dụng đặc tả chức năng do khách hàng cung cấp và xác minh hệ thống theo các yêu cầu chức năng | Dùng để kiểm tra hiệu năng (`performance testing`), độ tin cậy (`reliability`), khả năng mở rộng (`scalability`) và các nghiệp vụ phi chức năng khác của hệ thống |
| Được thực hiện đầu tiên | Nên được thực hiện ngay sau khi kiểm thử chức năng kết thúc |
| Có thể sử dụng tool để kiểm thử hoặc kiểm thử bằng tay (`manual testing`) | Khi sử dụng tool sẽ hiệu quả hơn |
| Đầu vào là các yêu cầu nghiệp vụ theo các tài liệu đặc tả | Đầu vào là các thông số như tốc độ tải, độ bảo mật cũng như khả năng mở rộng |
| Mô tả những thứ sản phẩm phần mềm sẽ làm | Mô tả sản phẩm phần mềm hoạt động như thế nào là tốt |
| Dễ dàng thực hiện kiểm thử bằng tay (`manual testing`) | Khó khăn khi kiểm thử bằng tay (`manual testing`) |
| Các loại kiểm thử chức năng thường gặp: | Các loại kiểm thử phi chức năng thường gặp: |
| * `Unit Testing` (Kiểm thử đơn vị) | * `Performance Testing`  (Kiểm thử hiệu năng) |
| * `Smoke Testing` | * `Load Testing` (Kiểm thử tải) |
| * `Sanity Testing` | * `Volume Testing` (Kiểm thử khối lượng) |
| * `Integration Testing`  (Kiểm thử tích hợp) | * `Stress Testing` |
| * `White Box Testing` (Kiểm thử hộp trắng) | * `Security Testing` (Kiểm thử bảo mật) |
| * `Black Box Testing` (Kiểm thử hôp đen) | * `Installation Testing` (Kiểm thử cài đặt) |
| * `User Acceptance Testing` (Kiểm thử chấp nhận) | * `Penetration Testing` (Kiểm thử xâm nhập) |
| * `Regression Testing` (Kiểm thử hồi quy) | * `Compatibility Testing` (Kiểm thử tương thích) |
| | * `Migration Testing` |

# Kết luận
Trên đây chỉ là một vài tìm hiểu và viết lại theo cách hiểu của mình về kiểm thử chức năng trong kiểm thử phần mềm. Cảm ơn mọi người đã đọc ^^.
# Tài liệu tham khảo
* https://www.guru99.com/functional-testing.html
* https://en.wikipedia.org/wiki/Functional_testing
* https://www.softwaretestinghelp.com/guide-to-functional-testing/
* https://viblo.asia/p/tim-hieu-ve-kiem-thu-chuc-nang-functionality-testing-bJzKmLVB59N