## Reliability Testing
Reliability Testing là một quá trình kiểm thử phần mềm để kiểm tra xem phần mềm có thể thực hiện một hoạt động không có lỗi trong một khoảng thời gian cụ thể trên một môi trường cụ thể hay không. Mục đích của Reliability Testing là để đảm bảo rằng sản phẩm phần mềm không có lỗi và đủ tin cậy cho mục đích mong đợi của nó.

Reliability - Độ tin cậy có nghĩa là "mang lại kết quả như nhau", trong các thuật ngữ khác, từ "đáng tin cậy" có nghĩa là một cái gì đó đáng tin cậy và nó sẽ cho kết quả giống nhau mọi lúc. Điều này cũng đúng với Reliability Testing.

## Ví dụ về Reliability Testing
Xác suất để một PC trong cửa hàng có thể hoạt động trong tám giờ mà không gặp sự cố là 99%; đây được gọi là độ tin cậy.

![](https://images.viblo.asia/eeaa961d-d462-434f-92d3-d3fee05c17d3.png)

Reliability Testing có thể được phân loại thành ba phân đoạn,

* Mô hình hóa
* Đo đạc
* Cải tiến

Công thức sau đây là để tính xác suất thất bại.

> Xác suất = Số trường hợp không đạt / Tổng số trường hợp đang xét 

## Các yếu tố ảnh hưởng đến độ tin cậy của phần mềm
## 

1. Số lượng lỗi xuất hiện trong phần mềm
1. Cách người dùng vận hành hệ thống

* Reliability Testing là một trong những chìa khóa để có chất lượng phần mềm tốt hơn. Loại test này giúp phát hiện ra nhiều vấn đề trong thiết kế và chức năng của phần mềm.
* Mục đích chính của Reliability Testing là để kiểm tra xem phần mềm có đáp ứng được yêu cầu về độ tin cậy của khách hàng hay không.
* Reliability Testing sẽ được thực hiện ở một số cấp độ. Các hệ thống phức tạp sẽ được kiểm tra ở cấp độ đơn vị, lắp ráp, hệ thống con và hệ thống.

## Tại sao phải thực hiện Reliability Testing
Reliability Testing được thực hiện để kiểm tra hiệu suất phần mềm trong các điều kiện đã cho.

Mục tiêu đằng sau việc thực hiện Reliability Testing là,

1. Để tìm cấu trúc của các lỗi lặp lại.
1. Để tìm số lỗi xảy ra là khoảng thời gian được chỉ định.
1. Để khám phá nguyên nhân chính của failures - sự thất bại
1. Để tiến hành Kiểm tra hiệu suất của các mô-đun khác nhau của ứng dụng phần mềm sau khi sửa lỗi


Sau khi phát hành sản phẩm, chúng ta có thể giảm thiểu khả năng xảy ra lỗi và do đó cải thiện độ tin cậy của phần mềm. Một số công cụ hữu ích cho việc này là: Phân tích xu hướng, Phân loại khiếm khuyết trực giao và các phương pháp hình thức, v.v.

## Các loại Reliability Testing
Reliability Testing của phần mềm bao gồm Feature Testing, Load Testing và Regression Testing

### Feature Testing:

Feature Testing kiểm tra tính năng được cung cấp bởi phần mềm và được tiến hành theo các bước sau: 

* Mỗi thao tác trong phần mềm được thực hiện ít nhất một lần.
* Giảm tương tác giữa hai hoạt động.
* Mỗi hoạt động phải được kiểm tra để chắc chắn chúng thực hiện đúng.
 
### Load Testing:

Thông thường, phần mềm sẽ hoạt động tốt hơn khi bắt đầu quá trình và sau đó, nó sẽ bắt đầu xuống cấp. Load Testing được tiến hành để kiểm tra hiệu suất của phần mềm dưới tải công việc tối đa.

### Regression Testing:

Regression Testing chủ yếu được sử dụng để kiểm tra xem có bất kỳ lỗi mới nào được đưa vào do việc sửa các lỗi trước đó hay không. Regression Testing được tiến hành sau mỗi lần thay đổi hoặc cập nhật các tính năng phần mềm và chức năng của chúng.

## Cách thực hiện Reliability Testing
Reliability Testing tốn kém so với các loại test khác. Vì vậy cần phải lập kế hoạch và quản lý phù hợp trong khi thực hiện Reliability Testing. Điều này bao gồm quá trình test được thực hiện, dữ liệu cho môi trường test, lịch trình test, điểm kiểm tra test, v.v.

Để bắt đầu với Reliability Testing, Tester phải tiếp tục những điều sau đây,

* Thiết lập các mục tiêu về độ tin cậy
* Xây dựng kế hoạch hoạt động
* Lập kế hoạch và thực hiện các bài test
* Sử dụng kết quả test để đưa ra quyết định
* Như chúng ta đã thảo luận trước đó, có ba hạng mục mà chúng ta có thể thực hiện Reliability Testing: Mô hình hóa, Đo lường và Cải tiến .

Các thông số chính liên quan đến Reliability Testing là:

* Xác suất của hoạt động không có lỗi
* Khoảng thời gian hoạt động không có lỗi
* Môi trường mà nó được thực thi

### Bước 1) Mô hình hóa
Kỹ thuật tạo mô hình phần mềm có thể được chia thành hai loại phụ:

**1. Mô hình dự đoán**

**2. Mô hình ước tính**

* Có thể thu được các kết quả có ý nghĩa bằng cách áp dụng các mô hình phù hợp.
* Các giả định và sự trừu tượng có thể được thực hiện để đơn giản hóa các vấn đề và không có mô hình duy nhất nào phù hợp cho tất cả các tình huống.
Sự khác biệt chính của hai mô hình là: 


| Vấn đề	 | Mô hình dự đoán | Mô hình ước tính|
| -------- | -------- | -------- |
| **Tham chiếu dữ liệu**     | Sử dụng dữ liệu lịch sử     | Sử dụng dữ liệu hiện tại từ việc phát triển phần mềm.     |
| **Thời điểm được sử dụng trong chu kỳ phát triển**    | Thường sẽ được tạo trước giai đoạn phát triển hoặc test.     | Thường sẽ được sử dụng ở giai đoạn sau của Vòng đời phát triển phần mềm.     |
| **Khung thời gian**     | Dự đoán độ tin cậy trong tương lai.     | Dự đoán độ tin cậy cho thời điểm hiện tại hoặc trong tương lai.     |

### Bước 2) Đo lường
Độ tin cậy của phần mềm không thể được đo trực tiếp và do đó, các yếu tố liên quan khác được xem xét để ước tính độ tin cậy của phần mềm. Cách thực hiện của Reliability Testing của phần mềm được chia thành bốn loại: -

**1. Chỉ số Sản phẩm:** 

Chỉ số sản phẩm là sự kết hợp của 4 loại chỉ số:

* ***Kích thước phần mềm***:  Line of Code (LOC) là một cách tiếp cận ban đầu trực quan để đo kích thước của phần mềm. Source code được tính trong chỉ số này còn các nhận xét và các câu lệnh không thực thi khác sẽ không được tính.
* ***Chỉ số điểm chức năng***: Là phương pháp để đo lường chức năng của Phát triển phần mềm. Nó sẽ xem xét số lượng đầu vào, đầu ra, tệp chính, v.v. Nó đo lường chức năng được cung cấp cho người dùng và độc lập với ngôn ngữ lập trình.
* ***Độ phức tạp***: Nó liên quan trực tiếp đến độ tin cậy của phần mềm, vì vậy việc thể hiện độ phức tạp là rất quan trọng. Số liệu hướng về độ phức tạp là một phương pháp xác định độ phức tạp của cấu trúc điều khiển của chương trình, bằng cách đơn giản hóa code thành một graphical representation.
* ***Đo lường mức độ test***: Đây là một cách ước tính lỗi và độ tin cậy bằng cách thực hiện test hoàn chỉnh các sản phẩm phần mềm. Độ tin cậy của phần mềm có nghĩa nó là chỉ tiêu xác định rằng hệ thống đã được hoàn toàn xác minh và test.

**2. Các chỉ số quản lý dự án**

Các nhà nghiên cứu đã nhận ra rằng quản lý tốt có thể tạo ra các sản phẩm tốt hơn.

Một quản lý tốt có thể đạt được độ tin cậy cao hơn bằng cách sử dụng quy trình phát triển, quy trình quản lý rủi ro, quy trình quản lý cấu hình  tốt hơn, v.v.

**3. Số liệu quy trình**

Chất lượng của sản phẩm liên quan trực tiếp đến quá trình. Các thước đo quy trình có thể được sử dụng để ước tính, giám sát và cải thiện độ tin cậy và chất lượng của phần mềm.

**4. Các chỉ số lỗi và thất bại**

Các chỉ số Lỗi và Lỗi chủ yếu được sử dụng để kiểm tra xem hệ thống có hoàn toàn không bị lỗi hay không. Cả hai loại lỗi được phát hiện trong quá trình test (tức là trước khi release) cũng như lỗi do người dùng báo cáo sau khi release đều được thu thập, tóm tắt và phân tích để đạt được mục tiêu này.

Độ tin cậy của phần mềm được đo bằng thời gian trung bình giữa các lần hỏng hóc (MTBF) . MTBF bao gồm

* Mean to failure (MTTF): Là hiệu số thời gian giữa hai lần thất bại liên tiếp
* Mean time to repair (MTTR): Là thời gian cần thiết để sửa chữa lỗi.
> MTBF = MTTF + MTTR

Độ tin cậy của phần mềm tốt là một số từ 0 đến 1.

Độ tin cậy tăng lên khi các lỗi hoặc lỗi từ chương trình bị loại bỏ.

### Bước 3) Cải tiến

Việc cải tiến hoàn toàn phụ thuộc vào các vấn đề xảy ra trong ứng dụng hoặc hệ thống, hoặc các đặc tính khác của phần mềm. Theo mức độ phức tạp của mô-đun phần mềm, cách cải tiến cũng sẽ khác nhau. Hai hạn chế chính về thời gian và ngân sách, điều này sẽ hạn chế những nỗ lực được đưa vào cải thiện độ tin cậy của phần mềm.

## Các phương pháp ví dụ để kiểm tra độ tin cậy
ReliabilityTesting là việc thực thi một ứng dụng để các lỗi được phát hiện và loại bỏ trước khi hệ thống được triển khai.

Chủ yếu có ba cách tiếp cận được sử dụng để Kiểm thực hiện ReliabilityTesting 

1. Test-Retest Reliability
1. Biểu mẫu song song Độ tin cậy
1. Quyết định nhất quán

Dưới đây là một ví dụ.

### Test-Retest Reliability
Để ước tính độ tin cậy của Test-Retest Reliability, một nhóm Tester sẽ thực hiện quy trình test chỉ cách nhau vài ngày hoặc vài tuần. Thời gian phải đủ ngắn để có thể đánh giá kỹ năng của tester trong khu vực. Mối quan hệ giữa tester từ hai cơ quan quản lý khác nhau được ước tính, thông qua tương quan thống kê. Loại độ tin cậy này thể hiện mức độ mà một bài test có thể tạo ra điểm số ổn định, nhất quán theo thời gian.
![](https://images.viblo.asia/6052aee1-2cdd-4fa9-b7e9-cc9aa5626493.png)


### Biểu mẫu song song Độ tin cậy
Nhiều kỳ thi có nhiều định dạng câu hỏi, hình thức thi song song này cung cấp Bảo mật. Độ tin cậy của các hình thức song song được ước tính bằng cách quản lý cả hai hình thức của kỳ thi cho cùng một nhóm tester. Điểm của tester trên hai hình thức test có mối tương quan với nhau để xác định chức năng của hai hình thức test giống nhau như thế nào. Ước tính độ tin cậy này là một thước đo về mức độ nhất quán của điểm số bài test có thể được mong đợi trên các hình thức test.

![](https://images.viblo.asia/fc480eec-c190-494e-90b1-2ef3a43f1ed4.png)

### Quyết định nhất quán
Sau khi thực hiện Test-Retest Reliability và Biểu mẫu song song Độ tin cậy, chúng tôi sẽ nhận được kết quả test đạt hoặc không đạt. Đó là độ tin cậy của quyết định phân loại này được ước tính trong độ tin cậy nhất quán của quyết định.

Tầm quan trọng của kiểm tra độ tin cậy

Cần phải đánh giá kỹ lưỡng về độ tin cậy để cải thiện hiệu suất của quá trình và sản phẩm phần mềm. Kiểm tra độ tin cậy của phần mềm sẽ giúp ích rất nhiều cho các nhà quản lý và thực hành phần mềm.

Để kiểm tra độ tin cậy của phần mềm thông qua test:

* Một số lượng lớn các test cases nên được thực thi trong một khoảng thời gian dài để tìm hiểu xem phần mềm sẽ thực thi trong bao lâu mà không bị lỗi.
* Việc phân phối các test cases phải phù hợp với hoạt động thực tế hoặc theo kế hoạch của phần mềm. Một chức năng của phần mềm được thực thi càng thường xuyên, thì tỷ lệ test cases cần được cấp phát cho chức năng hoặc tập hợp con đó càng lớn.

## Công cụ hồ trợ thực hiện Reliability Testing
Một số công cụ Reliability Testing được sử dụng cho độ tin cậy của phần mềm là:

1. WEIBULL ++: Phân tích dữ liệu tuổi thọ độ tin cậy

2. RGA: Phân tích Tăng trưởng Độ tin cậy

3. RCM: Bảo trì tập trung vào độ tin cậy

**Tóm lược:**

Reliability Testing là một phần quan trọng của kỹ thuật độ tin cậy. Nói đúng hơn, nó là linh hồn của kỹ thuật độ tin cậy.

Hơn nữa, các bài Reliability Testing chủ yếu được thiết kế để phát hiện ra các chế độ lỗi cụ thể và các vấn đề khác trong quá software testing.

Trong Kỹ thuật phần mềm, Reliability Testing có thể được phân loại thành ba phân đoạn,

1. Mô hình hóa
1. Đo đạc
1. Cải tiến

Các yếu tố ảnh hưởng đến độ tin cậy của phần mềm

1. Số lượng lỗi xuất hiện trong phần mềm
1. Cách người dùng vận hành hệ thống


*----------------------Nguồn: https://www.guru99.com/reliability-testing.html ----------------------*