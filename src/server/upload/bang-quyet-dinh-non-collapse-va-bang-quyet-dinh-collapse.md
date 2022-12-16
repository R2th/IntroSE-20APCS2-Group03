Giải bài tập tìm số test case thông qua bảng quyết định collapse (thu gọn) và không collapse

Kiểm tra bảng quyết định là một kỹ thuật thiết kế hộp đen trong đó các trường hợp kiểm thử được thiết kế để thực hiện các kết hợp đầu vào được xác định trong bảng quyết định.

Làm thế nào để sử dụng bảng quyết định để thiết kế thử nghiệm?

Kỹ thuật theo dõi để kiểm tra bảng quyết định như sau:

*  Phân tích các đầu vào kiểm tra nhất định hoặc yêu cầu một danh sách các Điều kiện khác nhau trong bảng quyết định.
* Tính số lượng kết hợp có thể được gọi là Quy tắc. Các quy tắc thường được tính bằng 2 với sức mạnh của điều kiện (điều kiện 2 ^).
* Điền vào các cột của bảng quyết định với tất cả các kết hợp có thể (Quy tắc)
* Đối với mỗi kết hợp của các giá trị, hãy tìm hiểu kết quả Hành động hoặc Dự kiến.

Chúng ta hãy xem xét một ví dụ để xây dựng bảng quyết định:


**Q: For persons in the age group 16-65 (both inclusive) tax payment have to be calculated. A person earning less than £20,000 will pay 20% taxes, otherwise they pay 50% taxes. If the person has children he/she will receive a tax reduction of 10%.**

Trước tiên chúng ta hãy xác định các điều kiện và action trong ví dụ đã cho
![](https://images.viblo.asia/4b76d1d4-d7ba-4155-9d3a-04abb98f3e02.PNG)

Để xây dựng bảng quyết định, chúng ta cần biết số lượng cột / bộ kiểm tra có nguồn gốc từ công thức được giải thích trước đó, điều kiện 2 ^ vì vậy trong ví dụ của chúng tôi, đó là 2 ^ 3 = 8 bộ kiểm tra

Cho phép xây dựng Bảng quyết định:

![](https://images.viblo.asia/3cf516a0-d014-4985-89a3-88a62bca5269.PNG)

như chúng ta biết, chúng ta cần 8 bộ kiểm tra do đó chúng ta có 8 cột được đánh số. 
Nếu bạn xem điều kiện ở đây, chúng ta chỉ lấy tập hợp dương như khi bạn tiếp tục điền vào bảng quyết định, chúng ta sẽ điền vào đó bằng 1 hoặc 0. trong đó 1 đại diện cho tập dương và 0 đại diện cho tập âm. 
Ví dụ trong trường hợp có điều kiện Trẻ em 1 = Có và 0 = Không

Cách dễ dàng để điền vào bảng Quyết định:

* Hàng thứ nhất = bắt đầu bằng 1 và điền vào bộ kiểm tra / 2 cột với nó. tức là, 8/2 = 4 vì vậy, 4 cột đầu tiên có 1 và 4 cột tiếp theo có 0
* Hàng thứ 2 = bắt đầu bằng 1 và điền vào bộ kiểm tra / 4 với nó. tức là, 8/4 = 2 vì vậy, 2 cột đầu tiên có 2 cột thứ 2 và thứ hai có số 0 và lặp lại tương tự cho 4 cột còn lại
* Hàng thứ 3 = bắt đầu bằng 1 và điền vào bộ kiểm tra / 8 với nó. tức là, 8/8 = 1 vì vậy cột đầu tiên có cột 1 và cột thứ hai có 0 và lặp lại tương tự cho các cột còn lại.

Xem bảng dưới đây:
![](https://images.viblo.asia/eedce4e3-0cfc-4ffe-b26b-08b08aa29915.PNG)

Bây giờ hãy bắt đầu đánh dấu các hành động trong bảng,

* Cột thứ 1: Một người có độ tuổi 16 - 65 và kiếm được ít hơn 20.000 và có con nên anh ta phải đóng thuế 20% vì có con, anh ta được khấu trừ thuế 10% = 10% thuế
* Cột thứ 2: Một người có độ tuổi từ 16 đến 65, kiếm được <20.000 và không có con do đó không được khấu trừ và phải đóng thuế 20%.
* Cột thứ 3: Một người có độ tuổi 16 - 65 và kiếm được> 20, 000 và có con do đó anh ta phải trả 50% thuế vì có con, anh ta được khấu trừ 10% = thuế 40%

Bây giờ, bạn chỉ cần điền vào phần còn lại của cột. Bảng hoàn thành trông như thế này:

![](https://images.viblo.asia/bd760371-b030-41fd-9041-3a7f4dcba9e8.PNG)
Bây giờ tôi muốn nói về Bảng quyết định thu gọn, nếu hai cột thử nghiệm chỉ có một điều kiện khác nhau và các hành động kết quả giống nhau thì các cột này có thể được nối hoặc nói cách khác là xóa các trường hợp thử nghiệm không liên quan.

Quy tắc áp dụng bảng quyết định collapse (thu gọn):

* Bước 1: So sánh cột 1-2, 3-4, 5-6, 7-8
* Bước 2: So sánh cột 1-3, 2-4, 5-7, 6-8
* Bước 3: So sánh cột 1-5, 2-6, 3-7, 4-8

**Những điều cần ghi nhớ:**
* Luôn xóa cột bên phải
* Không đổi tên các cột sau khi xóa.
* áp dụng khái niệm về bảng quyết định thu gọn cho bảng quyết định trên  vừa xây dựng

Bước 1: Áp dụng vai trò này vào bảng trên,

* Cột 1- 2 = không cùng hành động
* Cột 3-4 = không cùng hành động
* Cột 5-6 = giống nhau về mặt hành động với chỉ điều kiện khác nhau, tức là trẻ em do đó chúng ta có thể xóa cột 6 (cột bên phải).
* Cột 7-8 = giống nhau về mặt hành động với chỉ điều kiện khác nhau, tức là trẻ em do đó chúng ta có thể xóa cột 8 (cột bên phải).

Sau khi áp dụng bảng bước 1 trông như dưới đây:
![](https://images.viblo.asia/e64dde7c-8833-4ad0-b0b1-9b2923854002.PNG)

Bước 2: Áp dụng vai trò này vào bảng trên,

* Cột 1-3 = không cùng hành động
* Cột 2-4 = không cùng hành động
* Cột 5-7 = giống nhau về mặt hành động với chỉ điều kiện khác nhau, tức là kiếm được do đó chúng ta có thể xóa cột 7 (cột bên phải).
* Cột 6-8 = vì không có cột để so sánh,  bỏ qua điều này

Sau khi áp dụng bảng bước 2 trông như dưới đây:
![](https://images.viblo.asia/06715410-6e79-4022-afc9-d2971af52409.PNG)

Bước 3: Áp dụng vai trò này vào bảng trên,

* Cột 1-5 = không cùng hành động
* Cột 2-6 = vì không có cột 6 để so sánh,  bỏ qua điều này
* Cột 3-7 = vì không có cột 7 để so sánh, bỏ qua điều này
* Cột 4-8 = vì không có cột 8 để so sánh, bỏ qua điều này

Vì vậy, bảng decision collapse sẽ là:
![](https://images.viblo.asia/9930539f-56f8-4cef-9328-f4fccd649039.PNG)