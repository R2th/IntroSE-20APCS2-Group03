## 1. Tìm hiểu về kiểm thử theo cặp

Kiểm thử theo cặp là một phương pháp test kết hợp mỗi cặp 2 tham số đầu vào của 1 bộ các đối tượng có liên quan đến nhau, tạo ra bộ giá trị kiểm thử. Ta sẽ kiểm tra tất cả các khả năng có thể kết hợp các giá trị của cặp 2 tham số đó với nhau. Thực hiện kiểm tra theo cặp như vậy sẽ giúp làm giảm thời gian hơn rất nhiều so với việc phải kiểm tra đầy đủ mọi khả năng kết hợp của tất cả các giá trị của bộ nhiều các thông số với nhau.

**Công thức tính số testcase**

>  Số lượng test case = số lượng vùng giá trị lớn nhất của các biến * số lượng vùng giá trị lớn thứ 2 trong số các biến.



**Các bước liệt kê số testcases**

Bước 1: Sắp xếp các biến theo thứ tự giảm dần số lượng vùng giá trị: biến có nhiều vùng giá trị nhất sắp xếp đầu tiên. Biến có số lượng vùng giá trị ít nhất để ở cuối cùng. 

Bước 2: Điền các vùng giá trị tương ứng vào bảng lần lượt theo các cột. Bắt đầu từ cột thứ 2

Bước 3: Điền vùng giá trị cho các cột tiếp theo và kiểm tra nhằm đảm bảo rằng tất cả các cặp giá trị đều được cover 


## 2. Khi nào nên áp dụng kiểm thử theo cặp hoặc các kỹ thuật test design technique khác

**Kiểm thử theo cặp được sử dụng khi:**
  + Rất nhiều biến/tham số
  + Nếu lỗi xảy ra thì sẽ rất nghiêm trọng

**Kiểm thử biên được sử dụng khi:**
 + Giá trị đầu vào ko ràng buộc lẫn nhau
 + Có nhiều giá trị đầu vào nhận giá trị trong các miền hoặc các tập hợp
 + Muốn test đơn giản, test tự động hóa. 
(Kiểm thử đơn vị, tích hợp, hệ thống và chấp nhận)

**Kiểm thử lớp tương đương được sử dụng khi:**
 + Nhiều giá trị đầu vào và nhận giá trị trong các miền/tập
 + Test thủ công
(Kiểm thử đơn vị, tích hợp, hệ thống và chấp nhận)

**Kiểm thử bảng quyết định được sử dụng khi:**
  + Logic và điều kiện phức tạp. Có các quan hệ logic quan trọng giữa các biến đầu vào.
  + Đặc tả có thể chuyển về trạng thái bảng(Các chức năng có thể mô tả bằng quyết định)
  + Thứ tự các hành động sảy ra ko quan trọng
  + Thứ tự các luật ko ảnh hưởng đến hàng động
  + Khi một luật thỏa mãn và được chọn thì không cần xét luật khác
  + Các luật phải đầy đủ(Có mọi tổ hợp) và nhất quán(Mọi tổ hợp chân lý chỉ gây ra 1 tập hành động)

**Sơ đồ chuyển trạng được sử dụng khi:**
  + Khi muốn kiểm thử trạng thái, sự kiện, chuyển tiếp
  + Ko hữu dụng khi hệ thống ko có trạng thái hay ko phải đáp trả các sự kiện thời gian thực từ bên ngoài hệ thống

## 3. Ví dụ về kiểm thử theo cặp 
Form đăng ký mua vé tàu được cho như hình vẽ. Danh sách ga ở Ga đi và Ga đến là {Hà Nội, Vinh, Huế, Đà Nẵng, Sài Gòn}. Danh sách mác tàu là {SE,TN}. Không tính trường Ngày đi, hãy thực hiện: 

![](https://images.viblo.asia/0f38db81-b220-4afd-8100-cabd4da8ac9e.png)


a. Nếu kiểm thử tất cả các trường hợp xảy ra thì cần bao nhiêu ca kiểm thử? 

b. Số cặp tối đa mà một ca kiểm thử có thể chứa

c. Xác định các cặp giá trị có thể xảy ra

d. Thiết kế bộ kiểm thử theo cặp

**Giải quyết bài toán:**

a. Tổng số ca kiểm thử: 2*(5*5-5)*2 = 80 test case

(Vì Ga đi và Ga đến có 5 giá trị -> có 5*5 trường hợp. Nhưng loại bỏ 5 trường hợp Ga đi và Ga đến trùng nhau)

b. Số cặp tối đa của 1 ca kiểm thử: 6 cặp

c. Các cặp giá trị có thể xảy ra: 64 cặp: (Một chiều, đi Hà Nội), (Một chiều, đến Hà Nội), (Một chiều, SE), (Một chiều, TN)…

d. Một bộ test case bao phủ được tất cả các cặp: 

Số lượng test case = số lượng vùng giá trị lớn nhất của các biến * số lượng vùng giá trị lớn thứ 2 trong số các biến.

Vùng giá trị lớn nhất: Ga đi  {Hà Nội, Vinh, Huế, Đà Nẵng, Sài Gòn} => Có 5 giá trị

Vùng giá trị lớn thứ 2: Ga đến tuy nhiên trừ đi 1 vì tránh trường hợp Ga đi và Ga đến trùng nhau => Có 4 giá trị

Tổng số testcase cần kiểm thử = 5*4= 20 testcases



| Loại vé | Ga đi | Ga đến |Mác tàu|
| -------- | -------- | -------- | -------- |
|  Một Chiều|Hà Nội |Vinh     |SE     |
| Khứ hồi|Vinh  |Huế | TN|
|   Một chiều |Huế  |Đà Nẵng      |SE     |
| Khứ hồi   |Đà Nẵng  |Sài Gòn      |TN     |
|  Một chiều  |Sài Gòn  | Hà Nội     | SE    |
|   Cứ hồi | Hà Nội |Huế      |TN     |
|Một chiều  | Vinh |  Đà Nẵng    |SE     |
|  Khứ hồi  |Huế  | Sài Gòn     | TN    |
|    Một chiều| Đà Nẵng|Hà Nội      |SE     |
|  Khứ Hồi  |Sài Gòn | Vinh     |TN     |
|   Khứ hồi |Hà Nội  |Đà Nẵng      |TN     |
|Một chiều    |Vinh  | Sài Gòn     | SE    |
|Khứ Hồi    |Huế  | Hà Nội     |TN     |
|  Một chiều  | Sài gòn | Huế     | SE    |
|    |Đà Nẵng   |Vinh      |     |
|    | Hà Nội | Sài gòn     |     |
|    |Vinh  | Hà Nội     |     |
|    | Huế | Vinh     |     |
|    | Đà Nẵng | Huế     |     |
|    | Sài Gòn | Đà Nẵng     |     |
|    |Huế | Hà Nội     |     |

***Link tài liệu tham khảo:***

Daniel Galin. Sofware Quality Assurance – From Theory to Implemtation. Addion Wesley, 2004.