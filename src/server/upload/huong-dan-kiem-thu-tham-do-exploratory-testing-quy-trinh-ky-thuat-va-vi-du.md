Exploratory Testing là sự khai phá,nghiên cứu và học hỏi. Nó nhấn mạnh vào từng cá nhân và trách nhiệm của người Tester đó. Test case sẽ không được tạo ra trước nhưng Tester sẽ kiểm tra hệ thống một cách nhanh chóng. Họ sẽ tạm ghi chú những ý tưởng về việc cách test trước khi thực hiện test. Trọng tâm của kiểm thử thăm dò nhiều hơn công việc của Testing bởi hoạt động "Thingking"

Theo như kịch bản Testing , bạn thiết kế test case và sau đó tiến hành việc thực hiện test . Ngược lại, ở Kiểm thử thăm dò sẽ diễn ra đồng thời việc design và thực hiện test. 

Kịch bản của việc thực hiện test thông thường là cái hoạt đồng "non-thinking" nơi mà các Tester thực hiện các bước test và so sánh giữa kết quả thực tế và kết quả mong muốn. Công việc này có thể làm tự động mà không cần quá nhiều hoạt động nhận thức. 

![](https://images.viblo.asia/545352af-49d2-4cba-94a0-b65a0e987048.png)

Mặc dù xu hướng hiện tại của Testing là sự đẩy nhanh việc test tự động, thì kiểm thử thăm dò là cách suy nghĩ mới mẻ. Tự động cũng sẽ có giới hạn. 

![](https://images.viblo.asia/1954d20d-56a5-46c7-97d7-4b043d2366d4.png)

Sau đây chỉ ra một vài sự khác nhau cơ bản giữa test theo kịch bản và test thăm dò : 


| Scripted Testing | Exploratory Testing | 
| -------- | -------- | 
| Thực hiện trực tiếp từ yêu cầu    | Thực hiện trực tiếp từ yêu cầu và thăm dò trong quá trình test   | 
| -------- | -------- | 
| Đầu tiên sẽ phải xác định test case  | Xác định test case trong quá trình test   |
| -------- | -------- | 
| Xác nhận test cùng với yêu cầu  |Nghiên cứu hệ thống và ứng dụng    |
| -------- | -------- | 
| Nhấn mạnh vào điều kiện và quyết định  | Nhấn mạnh vào sự thích nghi và học hỏi   |
| -------- | -------- | 
|  Tham gia vào việc xác nhận test |  Tham gia vào việc nghiên cứu  |
| -------- | -------- | 
| Là việc test theo sự điều khiển  | Là việc cải thiện test design |
| -------- | -------- | 
| Giống như việc đọc bài phát biểu  và bạn đọc nó từ bản nháp  |Giống như làm một đoạn hội thoại - mọi thứ là tự phát    |
| -------- | -------- | 
| Kịch bản điều khiển  | Suy nghĩ của tester được điều khiển   |

Kiểm thử thăm dò:

* Đó không phải là việc test ngẫu nhiên: đó là kiểm thử adhoc với mục tiêu là tìm ra bug

* Có cầu trúc nghiêm ngặt

* Có sự suy nghĩ về cấu trúc như là việc so sánh với các cấu trúc thực hiện của test có kịch bản. Cấu trúc này đến từ  Charter, time boxing ...

* Nó có tính truyền đạt và quản lý cao

* Nó không phải là kỹ thuật mà là cách tiếp cận . Những hoạt động nào tiếp theo sẽ được điều khiển bởi cái gì mà bạn đang làm.

## Các bước của test thử nghiệm thăm dò:

Thử nghiệm thăm dò sẽ đi qua 5 bước được miêu tả chi tiết dưới đây và nó cũng được gọi là phiên dựa trên quản lý test (SBTM Cycle)

### 1. Tạo ra sự phân loại bug:

* Phân loại ra các loại bug common có ở dự án cũ

* Phân tích nguồn gốc vấn đề của bug

* Tìm được các rủi ro và có ý tưởng phát triển việc test ứng dụng

### 2. Rule của test

1. Bạn test cái gì?

2. Bạn sẽ test nó như thế nào?

3. Những cái nào cần phải kiểm tra?

* Ý tưởng test là điểm bắt đầu của kiểm thử thăm dò

* Rule test sẽ giúp xác định người dùng cuối có thể sử dụng hệ thống như thế nào.

### 3. Time box

* Phương pháp này bao gồm cặp test làm việc cùng nhau trong khoảng time không dưới 90 phút

* Không nên có bất kỳ gián đoạn nào trong thời gian phiên làm việc 90 phút

* Time box có thể được tăng hoặc giảm xuống khoảng 45 phút

* Phiên làm việc này khuyến khích tester có thể tái hiện lại những phản hồi từ hệ thống và chuẩn bị cho cái đầu ra chính xác.

### 4. Review Result:

* Đánh giá lại lỗi

* Bài học rút ra từ việc test

* Phân tích khu vực bao phủ

### 5. Phân tích 

* Biên dịch lại kết quả đầu ra

* So sánh kết quả và rule

* Kiểm tra xem liệu rằng có cần thêm có cần thiết phải thêm việc testing nào không

Trong suốt quá trình thực hiện test thử nghiệm thăm dò, những điều dưới đây cần phải hoàn thành :

* Nhiệm vụ của việc test phải được làm rõ

* Take note cái bạn cần phải test, tại sao phải test và đánh giá chất lượng của sản phẩm.

* Theo dõi câu hỏi và issue được raise lên trong quá trình thực hiện test

* Tốt hơn có sự gắn kết thành cặp của tester cho việc hiệu quả test

* Nhiều hơn những gì chúng ta test, nhiêu hơn việc chỉ thực hiện đúng theo các bước của kịch bản test

Việc nắm bắt yêu cầu thực sự quan trọng và nó sẽ follow theo những yêu cầu dưới đây :

* Test bao phủ: Liệu rằng chúng ta có note lại vùng bao phủ của test case và cải thiện chât lượng của sản phẩm

* Rủi ro: Những cái rủi ro nào sẽ được covered và cái nào quan trọng nhất 

* Log của thực hiện test: Ghi lại việc thực hiện test

* Vấn đề / Câu hỏi: Take note lại những issue và câu hỏi của hệ thống

## Ưu và  nhược điểm của phương pháp kiểm thử thăm dò

### Ưu điểm:

* Thực sự hữu ích đối với những dự án không có sẵn tài liệu hoặc chỉ có sẵn một phần

* Nó tham gia vào quá trình nghiên cứu cái mà giúp cho việc tìm nhiêù bug hơn so với cách thông thường

* Tìm ra những bug không bao phủ - cái mà sẽ không tìm thấy bằng kỹ thuật thông thường

* Đào sâu vào những phần nhỏ và sẽ cover được toàn bộ yêu cầu

* Cover được toàn bộ các loại test và nó cũng cover được kịch bản và cases khác nhau

* Khuyến khích sự sáng tạo và trực giác

* Tạo ra những ý tưởng mới trong suốt quá trình test

## Nhược điểm:

* Phụ thuộc hoàn toàn vào kinh nghiệm của người testẻr

* Bị giới hạn bởi kiến thức của người tester

* Không phù hợp đối với thời gian test dài

## Thách thức của kiểm thử thăm dò

Có rất nhiều thách thức của kiểm thử thăm dò sẽ được trình bày chi tiết dưới đây:

* Phải học sử dụng app và phần mềm

* Phải nhân rộng lỗi

* Xác định được tools cần sử dụng

* Xác định được test case tốt nhất để sử dụng

* Báo cáo lại kết quả trong khi không có kịch bản/ case nào để so sánh cùng với kết quả hiện tại và output 

* Không biết khi nào sẽ dừng test bởi vì nó không define được test case cần thực hiện

## Khi nào sẽ sử dụng kiểm thử thăm dò

* Khi đội test có những tester nhiều kinh nghiệm

* Cần phải kiểm thử lặp sớm

* Có ứng dụng quan trọng

* Một người test mới tham gia vào dự án

Nguồn tham khảo : https://www.guru99.com/exploratory-testing.html