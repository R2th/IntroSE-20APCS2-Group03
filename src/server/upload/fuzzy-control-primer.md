1. Tổng quan Fuzzy Control Primer

Fuzzy logic là một phương pháp được xây dựng dựa trên sự mơ hồ, nhập nhằng trong các mệnh đề. Thông thường khi nói về kết quả của một mệnh để chúng ta thường chỉ có hai giá trị chân lý hoặc là Đúng (TRUE) hoặc là Sai (FALSE). Một mệnh đề mang giá trị đúng thì sẽ không bao giờ mang giá trị sai và ngược lại.

Tuy nhiên thì trong cuộc sống không phải lúc nào chúng ta cũng có thể xem xét và nhận định các giá trị chân lý ấy như ở trên lý thuyết. Một mệnh đề có thể đúng trong ngữ cảnh này, nhưng khi ta đặt nó trong một ngữ cảnh khác thì liệu nó có còn đúng được hay không. Để giải quyết vấn đề này vào năm 1965 giáo sư Lotfi Zadeh người Mỹ đã công bố một công trình nghiên cứu có tên là Fuzzy Logic. Kể từ đó fuzzy logic đã trải qua nhiều  giai đoạn phát triển: phát minh ở Mỹ, áp dụng ở Âu Châu và được ứng dụng vào các sản phẩm thương mại ở Nhật.

Từ những thành công đạt được logic mờ đã trở thành một kỹ thuật thiết kế chuẩn và được chấp nhận rộng rãi vào trong cộng đồng.

Fuzzy logic thường đề cập đến những thứ mang tính mơ hồ (vague), không thực sự rõ ràng. Fuzzy logic giống với phương pháp đưa ra quyết định ở con người. Nó đơn gian hóa các vấn đề bên ngoài thế giới thực và dựa trên mức độ tin cậy vào vấn đề đó hơn là sự dụng các mệnh đề true hoặc false thông thường như bên logic cổ điển.

Hình phía bên dưới sẽ mô tả cho chúng ta về một fuzzy system, các giá trị sẽ được chỉ ra bẳng các giá trị thuộc trong khoảng từ 0 đến 1. Giá trị 1 ở đây sẽ biểu diễn absolute truth và 0 sẽ biểu diễn giá trị absolute falseness. Các giá trị này sẽ chỉ ra giá trị chân lý của các mệnh đề bên trong fuzzy system.

![](https://images.viblo.asia/6fb8eb7d-a00e-4829-a9e3-505c834edd4c.png)

Các tập mờ hay còn goi là Fuzzy set là một phần mở rộng của lý thuyết tập hợp kinh điển và được sử dụng trong logic mờ. Trong Classical theory set quan hệ của các thành viên ở trong tập hợp được đánh giá bằng các giá trị nhị phân 0 hoặc 1, đúng hoặc sai theo một mệnh đề rõ ràng - một phần tử hoặc sẽ thuộc về một tập hơp hoặc sẽ không thuộc về một tập hợp.

Chẳng hạn với mệnh đề: "Anh ấy có cao không ?" thì sẽ chỉ có hai giá trị chân lý Đúng hoặc Sai. Nếu anh ấy cao thật thì giá trị chân lý sẽ là 1 và ngược lại

Ngược lại, Fuzzy theory set thì sẽ cho phép chúng ta đánh giá mức độ tin cậy vào mệnh đề mà chúng ta đánh giá dựa trên một hàm phụ thuộc (membership function) và tập giá trị của hàm phụ thuộc này sẽ nằm trong đoạn từ 0 đến 1.

Chẳng hạn với mệnh đề: "Anh ấy có cao không ?" thì lúc này chúng ta sẽ có các giá trị chân lý như sau:
* Anh ấy rất cao (0.8)
* Anh ấy cao (1)
* Anh ấy thấp (0.2)
* Anh ấy rất thấp (0.0)

Ở đây các số 0.8, 1, 0.2, 0.0 sẽ là các giá trị chân lý chỉ ra mức độ tin cậy ứng với một một mệnh đề.

Từ đó chúng ta có thể hiểu đơn giản sự khác nhau giữa classical set và fuzzy set đó là:

* Classical set sẽ bao gồm các phần tử mà độ tin cậy của nó sẽ là hoàn toàn chính xác.
* Fuzzy set sẽ bao gồm các phân tử mà độ tin cậy của nó sẽ phụ thuộc vào hàm membership.


![](https://images.viblo.asia/83c9ffd6-1d9f-48b3-a600-0fd837988a61.png)

(còn tiếp)