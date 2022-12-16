## 1. Phần mềm là gì?

Theo IEEE: Phần mềm là: Chương trình máy tính, thủ tục, các tài liệu liên quan (nếu có) và dữ liệu liên quan

Định nghĩa của ISO (ISO 9000-3) danh sách 4 thành phần cần thiết để đảm bảo chất lượng của tiến trình phát triển phần mềm và bảo trì dài hạn: 
* Chương trình máy tính (code)
* Thủ tục
* Tài liệu 
* Dữ liệu cần cho hoạt động của hệ thống phần mềm.


Lỗi phần mềm - Software Error  Là các phần code sai do lôi cú pháp, logic hoăc lôi do phân tích, thiết kế. 

Sai sót - Software Fault Là các errors dẫn tới hoạt động không chính xác của phần mềm. Không phải error nào cũng gây ra fault. 

Hỏng - Software Failures Fault sẽ trở thành failure khi nó được kích hoạt Một số đường chạy gây ra failures, một số không

## 2. Software errors, software faults và software failures

![](https://images.viblo.asia/4da469b2-41e6-4814-a09f-d3d938304177.png)
**Ví dụ**
```
public static int numZero (int[] x) 
{ // Effects: if x == null throw NullPointerException 
//else return the number of occurrences of 0 in x
int count = 0; 
for (int i = 1; i < x.length; i++) {   
if (x[i] == 0) {   
count++;}} 
return count; 
} 
```


Error: tìm kiếm các số bằng 0 từ chỉ số 1 thay vì chỉ số 0. Ví dụ numZero([2,7,0]) được tính chính xác là 1, còn với numZero([0,7,2]) sẽ được tính sai là 0. 

Trong cả 2 trường hợp, fault được thực thi. 

Trường hợp thứ 2 là gây ra failure

## 3. Chín nguyên nhân gây ra lỗi phần mềm
**1.Lỗi khi định nghĩa yêu cầu**

* Thường được xem như nguồn gốc của lỗi phần mềm 
* Định nghĩa yêu cầu lỗi: Định nghĩa sai, ví dụ công thức sai 
* Định nghĩa không đầy đủ : Yêu cầu không rõ ràng 
* Thiếu yêu cầu 
* Yêu cầu không cần thiết:
    * Nhiều dự án có những yêu cầu mà không bao giờ dùng đến 
    * Ảnh hưởng tới ngân sách, độ phức tạp, thời gian phát triển, …
    
**2. Quan hệ Client-developer**
* Hiểu sai các tài liệu yêu cầu 
* Hiểu sai tài liệu khi bị thay đổi 
* Hiểu sai thay đổi (miệng) trong quá trình phát triển 
* Không tham dự 
    * Thông báo cho khách hàng về giải pháp của devlopers về những thay đổi yêu cầu và 
    * Phản hồi của khách hàng về những câu hỏi của developer
* Đôi khi khách hàng trình bày như người dùng, lập trình viên trình bày theo tư duy khác hẳn.

**3. Sai phạm có chủ ý với yêu cầu phần mềm** 
* Developer tái sử dụng kết quả tương tự trước đó để tiết kiệm thời gian 
* Thường tái sử dụng code cần chỉnh sửa những phần không cần hoặc không dùng được developer(s) bỏ bớt chức năng do áp lực về thời gian/ngân sách. 
* Developer chèn thêm “cải tiến” không được chấp nhận (cải tiến code, sắp xếp/tìm kiếm mới…) dẫn tới mất một vài tính năng

**4.  Lỗi thiết kế logic**

* Thuật toán sai: Công thức sai, bảng quyết định sai, toán tử/toán hạng sai… 
* Định nghĩa tiến trình: các tiến trình trong hệ thống không phản ánh chính xác tiến trình nghiệp vụ 
    * Note: không phải tất cả các lỗi đều là  software errors. 
    * Đây là lỗi thủ tục, và không phải là một phần của hệ thống… 
* Lỗi khi định nghĩa điều kiện biên– nguồn lỗi phổ biến: Cần cẩn thận với các giá trị biên, ví dụ: ‘no more than’  “fewer than,” “n times or more;”  “the first time,” ...
* Bỏ sót các trạng thái phần mềm :  If rank is >= O1 and RPI is numeric, then…. Ta dễ bỏ sót hành động dựa trên trạng thái phần mềm
* Bỏ sót các định nghĩa liên quan tới các phản ứng khi có hành động không hợp lệ trong phần mềm có code để phát hiện ra các hành động không hợp lệ nhưng không thiết kế các hành động đáp trả của phần mềm. Ví dụ: chuông cảnh báo,…  

**5. Lỗi lập trình**

*  Rất nhiều thứ liên quan tới lỗi coding.
    *  Lỗi cú pháp (grammatical errors) 
    *  Lỗi logic (program runs;  results wrong)
    *   Lỗi Run-time (crash during execution)
    
**6. Không tuân thủ các hướng dẫn viết tài liệu và code**

* Không tuân thủ theo các khuôn mẫu templates (structure)
* Không tuân thủ theo các chuẩn coding (attribute names…) 
* (Standards and Integration Branch) 
    * Các chương trình khác phải chạy được trong môi trường!
    * Data Elements và Codes:  AFM 300-4;  
    * Tài liệu hướng dẫn và chỉ dẫn vận hành;  AFDSDCM 300-8, … 
* Đội SQA :  kiểm thử không chỉ sự thực thi của phần mềm mà còn chuẩn coding, tài liệu hướng dẫn, thông báo được hiển thị, tài nguyên cần thiết, đặt tên tài nguyên (file names, program names,…) 

**7.  Thiếu sót của quá trình kiểm thử**

* Là một phần của tiến trình phát triển nhưng thường xuyên bị cắt xén! 
* Kế hoạch test không đầy đủ:  Không test hết các phần của ứng dụng hoặc test qua loa! 
* Không phát hiện được lỗi tài liệu, báo cáo 
* Không phát hiện được chính xác lỗi do mô tả mập mờ về lỗi đó
* Không đủ thời gian để sửa lỗi

**8. Lỗi giao diện người dùng và thủ tục**
 
Các thủ tục chỉ dẫn cho người dùng cach thao tac cần thiết với từng bước của tiến trình. Chúng rất quan trọng với cac phần mềm phức tạp đòi hỏi tiến trình gồm nhiều bước liên tiếp nhau, mỗi bước xử lý nhiều kiểu dữ liệu khac nhau và cho phép kiểm tra cac kết quả trung gian

**9. Lỗi tài liệu**

* Lỗi trong thiết kế tài liệu 
* Lỗi trong tài liệu hướng dẫn sử dụng, online help
* Liệt kê những chức năng không tồn tại:  Đã từng lập kế hoạch phát triển, nhưng hoãn và chưa kịp sửa tài liệu
* Thông báo lỗi vô nghĩa
* Đặc tả (Specification): đặc tả lỗi, không đầy đủ, không nhất quan.
*  Thiết kế (Design): lỗi cơ bản trong thiết kế phần mềm. Cài đặt (Code): lỗi lập trình, mã độc (malicious code). 
*  Hệ thống hỗ trợ:  Ngôn ngữ lập trình nghèo nàn, trình biên dịch có lỗi... 
*  Kiểm thử không đầy đủ: kiểm thử chưa xong,  kiểm chứng nghèo nàn,...

![](https://images.viblo.asia/e37e22e0-c0c8-4e3d-853f-98e830a7ddab.png)

## 4.Chất lượng phần mềm, định nghĩa của IEEE


Chất lượng phần mềm là:
 
(1) Mức độ mà một hệ thống, thành phần, hay tiến trình đáp ứng được đặc tả yêu cầu by Philip Crosby 

Nhấn mạnh vào đặc tả: nếu khách hàng nói rõ tất cả yêu cầu trong đặc tả VÀ nếu đặc tả được đáp ứng thì khách hàng sẽ thoả mãn.

Đặc tả được soạn bởi khách hàng và đội phát triển. Do vậy, lỗi đặc tả sẽ không bị coi và không ảnh hưởng tới chất lượng phần mềm. Đây là điều ta cần xem xét.

(2) Mức độ mà một hệ thống, thành phần, hay tiến trình đáp ứng được nhu cầu/mong muốn của khách hàng/người dùng. by Joseph M. Juran

Ở đây, nhấn mạnh vào việc thoả mãn khách hàng. Do vậy, đặc tả có thể phải chỉnh sửa

Tuy nhiên, khách hàng phải có khả năng đưa ra một bản đặc tả chính xác và đầy đủ.

Trên thực tế, nhiều vấn đề lớn có thể được phát hiện ra quá muộn. Khách hàng lại không hài lòng!

**Định nghĩa chất lượng phần mềm của Roger Pressman**

Sự đáp ứng các yêu cầu chức năng, hiệu năng, các chuẩn (đặc tả) được phát triển, các đặc trưng mong muốn từ mọi phần mềm chuyên nghiệp (ngầm định).

## 5.Các định nghĩa khác nhau về đảm bảo chất lượng phần mềm

### 5.1 Đảm bảo chất lượng phần mềm
 
1. Một mô hình có kế hoạch và có hệ thống của tất cả các hành động cần thiết để đưa ra niềm tin là một mặt hàng/sản phẩm đáp ứng được các yêu cầu kỹ thuật đã thiết lập. 

2. Tập hợp các hành động được thiết kế để đánh giá tiến trình phát triển/sản xuất sản phẩm. Ngược với điều khiển chất lượng


### 5.2 Mục tiêu của hoạt động SQA trong phát triển phần mềm(Process-Oriented)
(1) Đảm bảo một mức độ tin cậy chấp nhận được là phần mềm sẽ tuân thủ các yêu cầu kỹ thuật về chức năng.

(2) Đảm bảo một mức độ tin cậy chấp nhận được là phần mềm sẽ tuân thủ các yêu cầu quản lý về thời gian và tài chính.

(3) Khởi đầu và quản lý các hoạt động để phát triển phần mềm và các hoạt động SQA được cải thiện và đạt hiệu quả cao hơn.


### 5.3 Mục tiêu của hoạt động SQA trong bảo trì phần mềm(Product-Oriented)

(1) Đảm bảo một mức độ tin cậy chấp nhận được là các hoạt động bảo trì phần mềm sẽ tuân thủ các yêu cầu kỹ thuật về chức năng.

(2) Đảm bảo một mức độ tin cậy chấp nhận được là các hoạt động bảo trì phần mềm sẽ tuân thủ các yêu cầu quản lý về thời gian và tài chính.

(3) Khởi đầu và quản lý các hoạt động để bảo trì phần mềm và hoạt động SQA được cải tiến hiệu quả

***Tài liệu tham khảo:***
Daniel Galin. Sofware Quality Assurance – From Theory to Implemtation. Addion Wesley, 2004.