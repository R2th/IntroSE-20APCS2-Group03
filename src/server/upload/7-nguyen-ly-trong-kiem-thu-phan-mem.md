Kiểm thử phần mềm là quá trình thực hiện kiểm tra một chương trình nhằm mục đích tìm ra lỗi.  Có 7 nguyên lý trong kiểm thử phần mềm như sau:
![](https://images.viblo.asia/9571fe86-999f-4928-b91b-a8903b5720bc.png)


*7 principles of software testing*

### 1. Testing show presence of defect - Kiểm thử nhằm chỉ ra lỗi
Kiểm thử chỉ ra sự hiện diện của lỗi trong phần mềm nhưng không thể chứng minh rằng phần mềm không có lỗi. 

![](https://images.viblo.asia/2e43128a-4d8b-4f95-a7dd-91f8217c0f77.jpg)

Kiểm thử giúp làm giảm xác suất của các lỗi tiềm ẩn vẫn còn trong phần mềm nhưng ngay cả khi không tìm thấy thêm bất kỳ môt lỗi nào thì cũng không thể khẳng định phần mềm không còn lỗi. Nó cũng không phải là một bằng chứng về tính đúng đắn của phần mềm. Thay vào đó, mọi kiểm thử đều xác nhận rằng phần mềm đáp ứng tất cả các yêu cầu nghiệp vụ và nó hoạt động theo nhu cầu của người dùng cuối.

### 2. Exhaustive testing is impossible- Complete test - Test toàn diện là không thể
Kiểm thử toàn diện là hoàn toàn không khả thi. 

![](https://images.viblo.asia/7ebd5699-e464-40c2-b2d1-e0ac7b17c9c8.JPG)

*Exhaustive testing is impossible*

Đơn giản ta hiểu là không thể kiểm tra tất cả các chức năng với tất cả các kết hợp dữ liệu đầu vào hợp lệ và không hợp lệ trong quá trình kiểm thử thực tế. 

**Tại sao lại không thể kiểm thử toàn diện?**
* Người kiểm thử cần phải hoàn thành nhiều hoạt động kiểm thử khác nhau trong quỹ thời gian nghiêm ngặt. 
* Các chương trình cũng có thể có nhiều trạng thái hơn. Tức là, một đầu vào, có giá trị tại một thời điểm cụ thể, có thể không hợp lệ tại một thời điểm khác.
* Việc kiểm tra tất cả các môi trường thực thi kiểm tra có thể xảy ra của là không khả thi.
* Không thể kiểm tra tất cả các đầu ra có thể xảy ra hoặc chuỗi các hoạt động với kiểm thử  toàn diện.
* Hơn nữa, thiết kế có thể quá phức tạp để thực hiện kiểm tra thực hiện.

![](https://images.viblo.asia/c850d762-dc3c-4538-90b8-8467f02148a2.jpg)

*Exhaustive testing is impossible*

Thay vì kiểm thử tất cả, phân tích rủi ro và sắp xếp thứ tự ưu tiên được sử dụng để tập trung trong kiểm thử. 

### 3. Early testing- Kiểm thử càng sớm càng tốt

![](https://images.viblo.asia/2c215787-0760-4edc-bf4a-56199cda2582.png)

*Early testing*

Các hoạt động test nên bắt đầu càng sớm càng tốt trong quy trình phát triển phần mềm và nên tập trung vào mục tiêu được xác định. 

Thực hiện thiết kế và review test càng sớm thì lỗi càng được phát hiện sớm khi đó tốn ít công và thời gian để tìm kiếm và sửa chữa lỗi. 

### 4. Defect clustering: defect density- Sự tập trung của lỗi

![](https://images.viblo.asia/05f92f80-9c5e-4473-9da0-cf2efbe62592.jpg)

*Defect Clustering*

Các chuyên gia testing đã chỉ ra rằng các lỗi sẽ nằm tập trung trong một số module nhất định nào đó chứ không phải nằm rãi đều trên tất cả các modules của sản phẩm nên khi phát hiện 1 bug thuộc module nào đó thì nên cần phải test kĩ hơn nữa để đảm bảo tìm ra được nhiều bug tiềm ẩn có thể nhất.

Để hiểu rõ hơn nguyên tắc này, ta nên xem xét 3 điều sau:

- Nguyên tắc tổ gián: Nơi nào có một vài con gián (lỗi) thì có nghĩa là ở đó sẽ rất gần tổ gián, nghĩa là sẽ có rất nhiều gián. Chỗ nào có 1 vài con bug thì xung quanh, gần gần chỗ đó sẽ có nhiều bug.

- Nguyên tắc 80/20: thông thường 20% chức năng quan trọng trong một chương trình có thể gây ra đến 80% tổng số bug phát hiện được trong chương trình đó.

- Exhaustive testing is impossible (nguyên tắc thứ 2): do đó cần phải ananlysis (phân tích) và priorities (tính toán mức độ ưu tiên) để quyết định tập trung vào test chỗ nào.


### 5. Pesticide paradox- Nguyên lý thuốc trừ sâu

![](https://images.viblo.asia/a7b07a3f-aeeb-48fe-a4fe-14f59e22a8d4.png)

*Pesticide paradox*

Nếu các test được thực hiện lặp đi lặp lại nhiều lần thì không có lỗi mới nào có thể  được tìm thấy. 
Hiệu quả của các trường hợp kiểm thử bắt đầu giảm xuống sau một số lần thực hiện.

Để khắc phục nguyên lý thuốc trừ sâu này, các test case cần phải được thường xuyên rà soát và sửa đổi. Test mới và khác đi để có thể tìm ra nhiều lỗi tiềm ẩn hơn. 

### 6. Testing is context dependence- Kiểm thử phụ thuộc vào bối cảnh

![](https://images.viblo.asia/bd115c29-796f-414e-a827-dc05628a66ab.png)

*Testing is context dependence*

Test được thực hiện khác nhau trong các bối cảnh khác nhau. 

Ngữ cảnh ở đây là bản chất của các ứng dụng mà ta sẽ áp dụng những phương thức, kỹ thuật, cũng như loại kiểm thử khác nhau. Ví dụ như các phần mềm phát triển nhằm phục vụ cho các  ngành cần bảo mật cao như: ngân hàng, y tế, giáo dục thì việc test các lỗi cần kiểm tra kĩ càng hơn và nhiều hơn để đảm bảo an toàn tuyệt đối tránh lộ những thông tin nội bộ.

Chúng ta có thể sử dụng phương pháp tiếp cận, kỹ thuật, loại kiểm thử khác nhau dựa trên từng loại ứng dụng khác nhau

### 7. Absence of error fallacy- Sự sai lầm về việc không có lỗi

![](https://images.viblo.asia/5faf53ac-74e0-4825-8f71-f84a3f8a4d6d.JPG)

*Absence of error fallacy*

Tất cả các yêu cầu được chỉ định và sửa tất cả các lỗi được tìm thấy vẫn có thể tạo ra một hệ thống khó sử dụng, không đáp ứng được nhu cầu và mong đợi của người dùng, hoặc kém hơn so với các hệ thống cạnh tranh khác. 

Phần mềm được xây dựng không chỉ là phần mềm không có lỗi 99% mà còn phải đáp ứng nhu cầu kinh doanh nếu không nó sẽ trở thành một phần mềm không thể sử dụng được.

### Kết Luận
Việc hiểu rõ các nguyên tắc trong kiểm thử phần mềm sẽ giúp bạn tiếp cận dễ dàng hơn trong việc kiểm thử và giảm thiểu tối đa các rủi rõ cũng như đạt hiệu quả cao trong quá trình thực hiện kiểm thử bất kỳ một ứng dụng nào

### Tham khảo 

https://www.geeksforgeeks.org/software-engineering-seven-principles-of-software-testing/
https://www.istqb.org/downloads/glossary.html