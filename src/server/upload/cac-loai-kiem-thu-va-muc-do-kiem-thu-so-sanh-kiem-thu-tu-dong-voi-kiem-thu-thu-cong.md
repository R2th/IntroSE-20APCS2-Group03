# 1. Các loại kiểm thử và mức độ kiểm thử
## 1.1 Các loại kiểm thử 

**Kiểm thử chức năng**: Chú trọng đến chức năng của chương trình, bảo đảm các chức năng của hệ thống thỏa mãn đúng yêu cầu.

**Kiểm thử cấu trúc**: Đảm bảo các thành phần bên trong của chương trình chạy đúng và chú trọng đến các thành phần cấu trúc nội tại của chương trình.

**Kiểm thử hiệu năng**: Kiểm thử việc vận hành của hệ thống, đảm bảo tối ưu việc phân bổ tài nguyên hệ thống nhằm đạt các chỉ tiêu như thời gian xử lý hay đáp ứng câu truy vấn.

**Kiểm thử khả năng chịu tải**: Kiểm thử các giới hạn của hệ thống, bảo đảm hệ thống vận hành đúng dưới áp lực cao.

## 1.2 Các mức độ kiểm thử
![](https://images.viblo.asia/3f710a40-4e20-411b-9f7f-2856fbab740b.png)
## 1.2.1 Kiểm thử đơn vị - Unit test

Loại kiểm thử này thường được viết bởi các DEV như công việc của họ trong việc code (loại test white-box), để đảm bảo rằng từng hàm riêng biệt hoạt động đúng theo mong muốn. Một hàm có thể có nhiều kiểm thử, để bắt được các trường hợp hoặc các nhánh trong code. Unit testing một mình không thể đảm bảo chức năng của một bộ phận của phần mềm mà là sử dụng để đảm bảo rằng các khối kiến trúc của phần mềm làm việc độc lập với nhau.

## 1.2.2 Kiểm thử hồi quy – Regression test

Khi có sự thay đổi trong sản phẩm phần mềm, có thể một phần khác trong chương trình sẽ bị ảnh hưởng bởi sự thay đổi đó. Kiểm thử này có nhiệm vụ các bug được sửa không là nguyên nhân gây phát sinh ra các bug khác. Mục đích của kiểm thử này để đảm bảo rằng sự thay đổi chẳng hạn sự sửa chữa lỗi không dẫn đến phát sinh lỗi khác 

## 1.2.3 Kiểm thử tích hợp – Integration test

Là một loại kiểm thử phần mềm mà tìm kiếm để kiểm tra các giao diện giữa các thành phần dựa vào thiết kế của phần mềm. Integration testing làm việc để tìm ra lỗi (defect) trong các giao diện và giao tiếp giữa các thành phần (mô-đun). Các nhóm thành phần phần mềm đã được kiểm thử lớn dần từng bước tương ứng với các yếu tố của thiết kế kiến trúc đã được tích hợp và kiểm thử cho đến khi phần mềm hoạt động như một hệ thống. 

## 1.2.4 Kiểm thử hệ thống - System test

System testing kiểm thử một hệ thống đã được
tích hợp hoàn chỉnh để xác minh rằng nó đáp ứng được yêu cầu. Kiểm thử tích hợp hệ
thống chứng thực rằng hệ thống đã được tích hợp với các hệ thống bên ngoài hoặc hệ
thống thứ ba đã được xác định trong các yêu cầu hệ thống. 

## 1.2.5 Kiểm thử chấp nhận – Acceptance test

Là một cấp độ trong tiến trình kiểm thử phần mềm nhằm kiểm thử hệ thống về khả năng chấp nhận được. Mục tiêu của kiểm thử này là để đánh giá sự tuân thủ của hệ thống với các yêu cầu nghiệp vụ và thẩm định xem đã có chấp nhận để bàn giao chưa. Kiểm thử chấp nhận được khách hàng thực hiện. 

Gồm 2 loại kiểm thử:

**Alpha testing – Kiểm thử Alpha** : là việc kiểm thử hoạt động chức năng thực tế
hoặc giả lập do người dùng/khách hàng tiềm năng hoặc một nhóm test độc lập thực
hiện tại nơi sản xuất phần mềm.

**Beta testing – Kiểm thử Beta**: Beta testing được thực hiện sau alpha testing. Các
phiên bản của phần mềm - được biết như là các phiên bản beta – chúng được phát
hành tới một số lượng giới hạn khán giả bên ngoài nhóm sản xuất phần mềm.

# 2. Các phương pháp kiểm thử
Có hai phương pháp thực hiện kiểm thử: Kiểm thử tự động (automation test) và kiểm thử thủ công (manual test).

**Kiểm thử tự động**: Là xử lý một cách tự động các bước thực hiện các testcase, kiểm thử tự động bằng một công cụ nhằm rút ngắn thời gian kiểm thử.

**Kiểm thử thủ công**: là tester làm mọi công việc hoàn toàn bằng tay, từ viết test case đến thực hiện test, mọi thao tác như nhập điều kiện đầu vào, thực hiện một số sự kiện khác như click nút và quan sát kết quả thực tế, sau đó so sánh kết quả thực tế với kết quả mong muốn trong test case, điền kết quả test.

Ở bài trước thì mình cũng đã chia sẻ về Kiểm thử tự động là gì?Tổng quan về công cụ kiểm thử Selenium các bạn có thể tham khảo ở link sau:
https://link.sun-asterisk.vn/wb36zy

## 2.1 Kiểm thử thủ công có những ưu điểm gì?
Người kiểm thử phần mềm sẽ kiểm tra phần mềm bằng mắt và tay. Điều đầu tiên cần thực hiện chính là người kiểm thử phần mềm phải hiểu được những yêu cầu của khách hàng. Sau khi hiểu yêu cầu trước khi tiến hành kiểm thử thì việc kế tiếp chính là viết test case liệt kê những trường hợp cần kiểm thử từ giao diện, chức năng luồng dữ liệu.

Tiến hành kiểm thử thủ công: 

Trước khi kiểm thử phần mềm bằng thủ công thì kiểm thử viên phải áp dụng các phương pháp thiết kế test case hay còn gọi là kiểm thử hộp đen. Áp dụng các kiến thức kiểm thử hộp đen và tối ưu hóa bộ test case. Sau khi tối ưu hóa test case xong thì người kiểm thử viên sẽ tiến hành các bước kiểm thử phần mềm bằng thủ công. Tester sẽ dựa theo những điều cần phải kiểm tra theo bộ test case, sau đó thực thi bằng việc tương tác với chính phần mềm để tìm ra lỗi.

**Kiểm thử thủ công có những ưu điểm như sau:**

+	 Cho phép tester sáng tạo việc kiểm thử và khám phá sản phẩm.
+	 Thích hợp việc kiểm thử trong số ít lần.
+	 Giảm được chi phí ngắn hạn.
+	 Test case chỉ thực hiện trong số ít lần.

**Nhược điểm:**

+ Đối với mỗi lần release, người thực hiện phải thực hiện lại một tập hợp các test case đã chạy, dẫn đến sự mệt mỏi, tốn effort 
+  Cần thêm thời gian và nhiều người hơn
+  Phương pháp kiểm thử thủ công được thực thi bởi con người. Do đó, dễ mắc sai lầm & không tìm thấy lỗi.

**Khi nào cần kiểm thử thủ công:**

Hiện tại tuy kiểm thử tự động đang là xu thế. Tuy nhiên các doanh nghiệp hiện nay đa phần ưu ái hình thức kiểm thử thủ công trong các trường hợp như:

+	 Khi phải thực thi một số lượng test case quá lớn trong một thời gian ngắn.
+	 Khi số lượng đầu vào cho một test case quá nhiều.
+	 Tuy đã có nhiều hình thức kiểm thử khác nhau nhưng kiểm thử thủ công vẫn được ưu ái và loại hình kiểm thử không thể thay thế được.
+	 Cho dù có áp dụng kiểm thử tự động vào giai đoạn nào của dự án thì vẫn cần có người thực hiện kiểm thử thủ công nhằm đảm bảo giảm tối đa những lỗi không thể lường trước trong bất kỳ kịch bản nào.

## 2.2 So sánh kiểm thử tự động và kiểm thử thủ công



| Tiêu Chí | Kiểm thử tự động | Kiểm thử thủ công |
| -------- | -------- | -------- |
|Kiểm thử nhiều lần  | Thích hợp với trường hợp phải test nhiều lần cho một case, có tính ổn định và tin cậy cao hơn so với kiểm thử thủ công  | Thích hợp kiểm tra sản phẩm lần đầu tiên     |
| Chi phí    | Giảm chi phí đầu tư dài hạn     | Giảm được chi phí ngắn hạn    |
| Yêu cầu người kiểm thử   |Có khả năng lập trình  | Không yêu cầu lập trình    |
| Tốc độ thực hiện   | Nhanh   | Chậm, tùy thuộc vào người thử   |
| Khả năng sử dụng     | Có| Có   |
| Phụ thuộc người kiểm thử   | Giúp tester không phải làm những việc gây nhàm chán và dễ nhầm lẫn    | Phụ thuộc vào cảm xúc của tester   |

**Kiểm thử thủ công**
không thể bị thay thế hoàn toàn vì không thể tự động hóa được mọi thứ, tuy nhiên cũng không thể không có kiểm thử tự động, bởi trong nhiều trường hợp như kiểm thử hiệu năng, năng suất thì kiểm thử thủ công không thể thực hiện được.

# Kết Luận

Bài viết này chỉ hy vọng giúp các bạn có cái nhìn tổng quan về các loại kiểm thử và mức độ kiểm thử, so sánh giữa kiểm thử tự động với kiểm thử thủ công, để thấy được ưu nhược điểm của mỗi loại, để áp dụng vào công việc một cách hiệu quả nhất. Bạn cần tìm hiểu thêm để có thể hiểu sâu hơn về Kiểm thử tự động cũng như công cụ kiểm thử Selenium này để áp dụng hiệu quả nó vào công việc của bạn.

Tài liệu tham khảo:

https://link.sun-asterisk.vn/wb36zy,
https://link.sun-asterisk.vn/PdYjZm, 
https://link.sun-asterisk.vn/eeHNC0