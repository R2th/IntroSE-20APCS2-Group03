# I. Các khái niệm cơ bản trong lập trình hướng đối tượng.
- Hôm nay mình xin tổng hợp một số định nghĩa cơ bản trong lập trình hướng đối tượng.
## 1.	Lập trình hướng đối tượng là gì:
- Lập trình hướng đối tượng là chia bài toán thành các đối tượng, mỗi đối tượng gồm thuộc tính và phương thức. để xử lý bài toán ta đi xây dựng mối quan hệ giữa các đối tượng và cho các đối tượng thực thi phương thức của chính nó.
## 2.	Các mối quan hệ của lập trình hướng đối tượng là gì?
- Kế thừa: kế thừa là đối tượng con thừa hưởng phương thức và thuộc tính của đối tượng cha.
- phụ thuộc: 1 đối tượng được khai báo là 1 thuộc tính của đối tượng khác thì mối quan hệ đó là phụ thuộc.
- song song: 2 đối tượng k liên quan gì tới nhau.
## 3.	Cách xác định đối tượng, thuộc tính, phương thức trong bài toán.
- Đối tượng là danh từ không có miền giá trị.
- Thuộc tính là danh từ có miền xác định.
- Phương thức là động từ mô tả hành động của đối tượng.
## 4.	Các tính chất của lập trình hướng đối tượng là gì. Giải thích từng tính chất:
Có 4 tính chất: 
- Đóng gói: Tạo ra các gói để chứa các class có tính chất giống nhau.
- Kế thừa: Class con kế thừa thuộc tính và phương thức của class cha.
- Đa hình: 1 class có nhiều phương thức cùng tên nhưng khác số lượng tham số hoặc kiểu tham số. hoặc class con có thể có phương thức giống với phương thức ở class cha. Thể hiện bằng overload và overide.
+ vd đa hình: 1	đối tượng có thể được khởi tạo bằng nhiều thể hiện khác.
+ Tugiac tg=new TuGiac();
+ TuGiac tg2=new Hinhvuong();
+ TuGiac tg3=new HinhChuNhat();
- Trừu tượng: Trừu tượng hóa đối tượng, khi phân tích 1 bài toán có rất nhiều thông tin, ta sẽ sử dụng tính trừu tượng và chỉ quan tâm đến những thứ liên quan đến bài toán.
+ Tính trừu tượng giúp bạn tập trung vào những cốt lõi cần thiết của đối tượng thay vì quan tâm đến cách nó thực hiện.
+ Tính trừu tượng được thể hiện qua abtract và interface.

## 5.	Overloading and overiding là gì
- Overloading (Nạp chồng) là việc 1 class có nhiều phương thức cùng tên nhưng khác tham số hoặc khác kiểu dữ liệu của tham số, nó thể hiện tính đa hình lúc biên dịch.
- Overriding (Ghi đè) là việc cài đặt lại các phương thức đã có ở lớp cha, các phương thức override ở lớp con phải giống hệt lớp cha, nó thể hiện tính đa hình lúc runtime
## 6.	Abstract class là gì?
- Abstract class là 1 lớp trừu tượng, nó có thể chứa phương thức trừu tượng hoặc không trừu tượng.
- Abtract class dùng để miêu tả đối tượng có chung thuộc tính và phương thức. nhưng có 1 vài phương thức có cụ thể hóa khác nhau nên ta cần có abstract method.
- Có 2 loại method là abstract method và method thường:
+ abstract method là method trống không có thực thi.
+ method thường là method có thực thi.
- Lưu ý: Các lớp chỉ có thể kế thừa một Abstract class.
+ Hướng đến tính năng và những tính năng có thực thi được sử dụng làm hàm chung cho các class extend nó.

## 7.	Interface là gì?
- Interface là 1 bộ hành vi chung của các đối tượng, Nó bao gồm các method trừu tượng.
+ Không phải là class.
+ Chỉ chứa những method/properties trống không có thực thi.
+ Nó giống như một khuôn mẫu, một khung để để các lớp implement và follow.
+ Các lớp có thể kế thừa nhiều interface.
+ Là một contract, các class implement phải triển khai các method theo như interface đã định nghĩa.
## 8. So sánh abstract và interface.

| Abstract 1 | interface 2 | 
| -------- | -------- |
| Abstract class có phương thức abstract (không có thân hàm) và phương thức non-abstract (có thân hàm), constructor.| Interface có phương thức abstract. Nó có thêm các phương thức default và static.| 
|Abstract class không hỗ trợ đa kế thừa.( Dùng từ khóa extend và chỉ đc extend 1 class.)|Interface có hỗ trợ đa kế thừa (Dùng từ khóa implement để thực thi, có thể implememnt nhiều interface.)|
|Abstract class có các biến final, non-final, static and non-static.|Interface chỉ có các biến static và final.|Interface chỉ có các biến static và final.|
|Access modifier có thể là private, default, protected, public.|Access modifier Chỉ có thể là public.|
|Abstract class có thể cung cấp nội dung cài đặt cho phương thức của interface.|Interface không thể cung cấp nội dung cài đặt cho phương thức của abstract class.|
|Sử dụng từ khóa abstract để khai báo.|Sử dụng từ khóa implement.|
## 9.	Kiểu dữ liệu là gì ?
- Kiểu dữ liệu là một sự quy định về cấu trúc và miền giá trị dữ liệu và tập hợp các phép toán tác động lên miền giá trị đó.
- Có 2 loại kiểu dữ liệu cơ bản: Kiểu dữ liệu nguyên thủy và kiểu dữ liệu có cấu trúc.
- Kiểu dữ liệu cơ bản có 8 loại: boolean, byte, short, int, long, float, double, char.
## 10.	Class, variable, method, contructor là gì?
- Class là nhóm đối tượng có chung bản chất.
- Variable,Thuộc tính của đối tượng.
- Method là hành động của 1 đối tượng,
- Contructor là phương thức để khởi tạo 1 đối tượng.
## 11.	Có mấy loại ép kiểu và tính chất của từng loại.
Có 2 loại ép kiểu:
- Nới rộng(không mất dữ liệu).
- thu hẹp(mất dữ liệu).
## 12.	Access modify là gì. Có những loại nào và tính chất của từng loại.
- Các access modifiers  xác định độ truy cập (Phạm vi) vào dữ liệu của của các trường, phương thức, class.
- Có 4 accessmodifier:  Xem bảng minh họa để hiểu rõ cách dùng Access modify.

![](https://images.viblo.asia/5ca5adf7-dc8b-4789-8df0-ce443cb6a628.PNG)

## 13.	Có những loại toán tử cơ bản nào .
+ Toán tử số học: +, -,*, /,%,++,--
+ Toán tử quan hệ: ==, !=, >, <, >=, <=
+ Toán tử logic: &&, || , !
+ Toán tử gán: = , +=, -= , *= , /=, %=

## 14.	Có những loại cấu trúc rẽ nhánh nào. Và khi nào thì nên dùng loại nào?
- Có 2 loại là If/else và switch/case
- If else dùng khi có nhỏ hơn 4 nhánh, còn lại dùng switchcase.
## 15.	Có những loại vòng lặp nào. Khi nào dùng loại nào?
- For, While, Do/while
- For dùng khi biết trước số lần lặp
- While dùng khi chưa biết số lần lặp
- Do/while dùng khi chưa biết số lần lặp và cần chạy ít nhất 1 lần
## 16.	Break và continue dùng như thế nào?
- Break dùng để dừng vòng lặp.
- Continue dùng để bỏ qua lần lặp hiện tại và sang lần lặp tiếp theo.
## 17.	Supper là gì, This là gì. Dùng this và supper trong trường hợp nào, Khác nhau giữa this và supper?
- Super là  toán tử đại diện cho class cha,
- This là toán tử đại diện cho class gần nhất chứa nó.
## 18.	Khái niệm và mục đích mảng 1 chiều.
- Quản lý tập hợp các phần tử có cùng bản chất hoặc cùng mộ hành vi.
- Có kích thước cố định.
- Quản lý đối tượng hoặc kiểu nguyên thủy
- Dùng để giải quyết các bài toán liên quan đến quản lý các đối tượng có chung bản chất hoặc có chung bộ hành vi mà số lượng các phần tử là cố đinh.
## 19.	Cách khai báo, khởi tạo, cách dùng mảng 1 chiều.
- Khai báo:
<KieuDuLieu>[] <ten>;
<KieuDuLieu> <ten>[];
- Khởi tạo:
<ten> = new <KieuDuLieu>[<SoLuong>]; 
Int[] arrInt = new int[3];
arrInt[0] = 1;
##  20.	 Khi khai báo 1 mảng 10 phần tử mà k có đủ 10 ô liền nhau thì sẽ ntn?
- Nếu không tìm đc vùng nhớ thích hợp nó sẽ reallowcate bộ nhớ để tìm vùng nhớ phù hợp.
# II. Kết luận.
 - Vậy là mình đã chia sẻ kiến thức của mình về oop qua bài viết này. Còn nhiều thiếu sót mong mọi người góp ý để bài viết hoàn thiện hơn. Mọi thắc mắc mọi người comment phía dưới nhé. thanks!