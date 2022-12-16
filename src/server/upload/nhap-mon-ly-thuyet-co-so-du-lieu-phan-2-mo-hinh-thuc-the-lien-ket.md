**Chào các bạn, hôm nay mình tiếp tục viết tiếp phần 2 cho series Nhập môn lý thuyết cơ sở dữ liệu. Phần 1 mình đã đưa ra những định nghĩa, tổng quan về Cơ sở dữ liệu. Trong bài này chúng ta tìm hiểu về Mô hình thực thể liên kết  ER (Entity Relationship). **


Đây là một ví dụ về mô hình ER có thể các bạn đã bắt gặp ở đâu đó.

![](https://images.viblo.asia/c3af7f01-bee8-43aa-96d5-85c233996e2f.png)


**Mô hình thực thể liên kết ER bao gồm các mô tả chi tiết của:
* 	 Thực thể (Entity Sets)
* 	 Thuộc tính (Attributes)
*    Liên kết (Relationship) và các ràng buộc

![](https://images.viblo.asia/23cd10ad-6d93-4368-b07d-17103e176e9a.png)

### 1. Thực thể
Thực thể là một vật hoặc  đối tượng (cụ thể hay trừu tượng) trong thế giới thực, có sự tồn tại độc lập và có thể phân biệt với các vật hoặc đối tượng khác.
	• Ví dụ: một người, một bài hát, một bức ảnh, một trò chơi, …
Kiểu thực thể là tập hợp các thực thể có thuộc tính giống nhau.
	• Ví dụ: tập hợp các thực thể sinh viên sẽ tạo ra kiểu Thực thể SINHVIEN.
• Phân loại:
	• Thực thể mạnh: tồn tại độc lập với thực thể khác.
![](https://images.viblo.asia/a67b9d5c-ba8f-471b-89a7-ee8a65dac128.png)

   • Thực thể yếu: không có thuộc tính khóa, sự tồn tại của nó phải phụ thuộc vào thực thể khác.
   
![](https://images.viblo.asia/75b7d124-b6bb-40f2-8a3a-924a198f3aab.png)


### 2. Thuộc tính
• Thuộc tính: là các tính chất đặc trung của thực thể, là yếu tố thông tin cho biết rõ hơn về thực thể.
VD:   Người có tên, tuổi, cân nặng, số chứng minh thư, …
• Mỗi thuộc tính có một miền giá trị.
VD: tên người là chuỗi ký tự, tuổi là số nguyên dương.
Nếu thuộc tính chưa có giá trị thì qui ước giá trị đó là null
![](https://images.viblo.asia/2a4b760a-3e14-41cc-a107-d616f070064c.png)
• Các kiểu thuộc tính:
*  Thuộc tính đơn và phức hợp
*  Thuộc tính đơn trị và đa trị
*  Thuộc tính suy dẫn và lưu trữ

![](https://images.viblo.asia/1b065a18-2291-4cf4-961e-f34891c0c4a5.png)

**2.1 Thuộc tính nguyên tố và phức hợp**
* Thuộc tính nguyên tố: là thuộc tính không thể chia nhỏ thành các phần riêng biệt nhỏ hơn và có ý nghĩa.
* 	VD: cân nặng, chiều cao,..
* Thuộc tính phức hợp: là thuộc tính có thể phân chia được thành các phần nhỏ hơn, để biểu diễn các thuộc tính cơ bản hơn với các ý nghĩa độc lập.
* VD: tên người gồm: họ, tên đệm, tên.

![](https://images.viblo.asia/58ddf19a-fbf0-4aa8-af54-d9d22b9027c1.png)

**2.2 Thuộc tính đơn trị và đa trị**
* Thuộc tính đơn trị: là thuộc tính chỉ có thể nhận một giá trị duy nhất cho một thực thể cụ thể.
* VD: Ngày_sinh, CMT,..
* Thuộc tính đa trị: là thuộc tính có thể nhận một hoặc một vài giá trị cho một thực thể <=> nhận nhiều giá trị đồng thời
* Kí hiệu: vòn elip kép (elip nét đôi)
* VD: Điện_thoại, Kỹ_năng,..

![](https://images.viblo.asia/1a8e2342-5268-4064-8a4d-c23f5cef0f73.png)


**2.3 Thuộc tính lưu trữ và suy dẫn**
* Thuộc tính lưu trữ: là thuộc tính mà giá trị của nó phải được nhập vào khi cài đặt cơ sở dữ liệu <=> phải nhập từ bàn phím.
* Thuộc tính suy dẫn: là thuộc tính của nó có thể  có thể được suy ra từ giá trị của các thuộc tính khác liên quan theo một nguyên tắc nào đó <=> không phải nhập, được tính không qua các thuộc tính khác.
* Kí hiệu: bằng một hình elip có nét đứt.
* VD: năm sinh  của một người thì được lưu trữ trong CSDL, còn tuổi của người đó sẽ được tính toán từ năm sinh. 

![](https://images.viblo.asia/4de267b8-26c9-47a0-8dcc-8bd97d0342e1.png)

**2.4 Thuộc tính khóa**
* Là thuộc tính mà giá trị của nó là duy nhất cho mỗi thực thể, giúp phân biệt thực thể này và thực thể khác trong cùng một kiểu thực thể. 
* Một kiểu thực thể có thể có nhiều khóa
* Ký hiệu: hình elip và một đường gạch chân dưới thuộc tính đó.
* VD: số chứng minh thư, Mã môn học, ….

![](https://images.viblo.asia/f9232084-88be-4958-b5ea-9f23f76cc396.png)

### 3. Liên kết
*  **Liên kết 1-1 (một – một)**: Một thực thể kiểu A  liên kết với một thực thể kiểu B và ngược lại.
*  Ký hiệu: thêm số 1 ở hai đầu thực thể
* Ví dụ: Một lớp có một sinh viên làm lớp trường và ngược lại, một sinh viên chỉ làm lớp trưởng của một lớp.

![](https://images.viblo.asia/daec7eaa-bf63-4421-bfcc-fd28d08f1c56.png)

* **Kiểu liên kết 1 – N (một-nhiều)**: 1 thực thể kiểu A  liên kết với nhiều thực thể kiểu B; 1 thực thể kiểu B chỉ liên kết duy nhất với 1 thực thể kiểu A.
*  Ký hiệu: thêm số 1 ở đầu phía một, thêm n ở đầu phía nhiều
*  Ví dụ: Một nhân viên làm việc cho một phòng và một phòng có nhiều nhân viên làm việc.

![](https://images.viblo.asia/b603c57d-5de4-490d-992e-d74b254b7cc7.png)

*  **Kiểu liên kết M – N (nhiều-nhiều)**: 1 thực thể kiểu A  liên kết với nhiều thực thể kiểu B và ngược lại
* Ký hiệu: thêm ký hiệu m và n ở hai đầu liên kết
* Ví dụ: 

![](https://images.viblo.asia/cdfd02e0-7ceb-4670-a5fd-ca1c123a53ac.png)

### 4. Ràng buộc về sự tham gia liên kết
*  Ràng buộc tham gia được xác định trên từng thực thể trong từng kiểu liên kết mà thực thể đó tham gia.
* Có hai kiểu ràng buộc tham gia:
 	+ Lực lượng tham gia toàn bộ (ký hiệu bằng gạch nối kép): tất cả các thực thể của kiểu thực thể phải tham gia vào liên kết.
 	+ Lực lượng tham gia bộ phận (ký hiệu bằng gạch nối đơn): chỉ một số thực thể của kiểu thực thể tham gia vào kiểu liên kết.
* Ví dụ: 

![](https://images.viblo.asia/c6e9f455-7246-4dc6-bb65-33b9651e7e5e.png)

**Đến đây mình đã đưa ra những lý thuyết cơ bản về mô hình thực thể liên kết ER. Trong phần tiếp theo mình sẽ đi sâu hơn vào mô hình ER, đồng thời cung cấp một số bài tập cho các bạn vận dụng để vẽ mô hình. **