# Design Patterns trong C
Design Patterns (Thiết Kế Mẫu) không phải là một khái niệm quá xa lạ với người lập trình. Trong Viblo cũng đã có nhiều bài viết chia sẻ về DP. Tuy nhiên khi nói đến DP, thông thường DP hay gắn với các ngôn ngữ lập trình hướng đối tượng. Ngay trong quyển sách Design Pattern - có thể coi là kinh thánh về DP - của Nhóm bộ tứ (Gang of Four), các tác giả cũng nói rằng "DP miêu tả các thiết kế hướng đối tượng do vậy phù hợp với các ngôn ngữ lập trình OOP như Smalltalk hay C++ hơn là các ngôn ngữ lập trình hướng thủ tục như là C hay Pascal".
Bản thân C ra đời từ rất lâu nhưng cho đến hiện nay vẫn có một chỗ đứng vững chắc trong các ngôn ngữ lập trình. Rất nhiều dự án vẫn đang được triển khai bằng C. Vậy liệu trong các dự án viết bằng C có thể áp dụng các thiết kế mẫu vốn dành cho ngôn ngữ lập trình hướng đối tượng?

Trước hết, có thể thấy rằng tất cả các thiết kế mẫu đều dùng rất nhiều các kỹ thuật của OOP như lớp, thừa kế, nạp chồng (override), ràng buộc động (dynamic binding) và tính đa hình (polymorphism). Do vậy, nếu muốn áp dụng các thiết kế mẫu này trong ngôn ngữ lập trình C, hiển nhiên sẽ có nhiều hạn chế. 

Tuy nhiên cái khó ló cái khôn, trong series "Design Patterns trong C", mình sẽ giới thiệu 1 vài thiết kế mẫu phổ biến cài đặt lại bằng ngôn ngữ lập trình C và các cách "lách luật" để biến một thiết kế mẫu dành cho OOP có thể cài đặt được bằng C.

Trong các thiết kế mẫu mà mình sẽ giới thiệu, mình sẽ trình bày:
- Tư tưởng chính của thiết kế mẫu
- Một tình huống cụ thể trong đó có thể áp dụng thiết kế mẫu
- Thiết kế OOP (bằng UML)
- Cài đặt thiết kế mẫu + tình huống bằng C
- Thảo luận

# Singleton
Singleton có thể coi là thiết kế mẫu đơn giản nhất. Thiết kế gốc của Singleton thậm chí chỉ có 1 lớp.
## Tư tưởng chính
Singleton cung cấp giải pháp khi mà người thiết kế hệ thống muốn:
1. Tạo ra 1 lớp mà chỉ cho phép tạo ra duy nhất 1 đối tượng từ lớp đó.
2. Đối tượng được tạo ra phải có khả năng truy nhập toàn cục (global access)

Lưu ý rằng, thông thường, khi một lớp có thể khởi tạo ra rất nhiều đối tượng. Ví dụ nếu ta có lớp Human, có thể tạo ra vô số đối tượng của Human:
```
Human h1;
Human h2;
```

Ngoài ra thì các đối tượng này thường là có phạm vi cục bộ (local), ra khỏi phạm vi là hệ thống sẽ xóa khỏi bộ nhớ.
## Hoàn cảnh áp dụng
Một ví dụ rất hay được sử dụng để minh họa Singleton (cũng có trong Kinh thánh về DP của Nhóm bộ tứ) là ví dụ về máy in (Printer) và trình điều khiển máy in (Spooler). Giả sử trong 1 văn phòng, có nhiều máy tính (Computer) kết nối đến 1 máy in. Mỗi máy tính có 1 trình điều khiển máy in và ra lệnh cho máy in thông qua trình điều khiển này. Nếu các trình điều khiển máy in này hoạt động riêng rẽ thì có khả năng 2 máy tính ra lệnh in cùng lúc sẽ làm các tài liệu in bị chồng chéo. Từ đó dẫn đến nhu cầu trình điều khiển máy in phải là duy nhất và được chia sẻ giữa các máy tính => BÙM Singleton hiện ra để giải quyết!
## Lời giải bằng UML
Dưới đây là thiết kế lớp mô phỏng bài toán trên bằng UML.


-----


![](https://images.viblo.asia/f940e1f2-0370-4c49-9572-5f3ced1073f6.png)


-----


Các đặc trưng của Singleton được thể hiện trong lớp Printer:
- thuộc tính spooler kiểu Printer được khai báo là static (do đó có thể truy cập toàn cục sau này)
- hàm khởi tạo Printer() được đặt trong mức bảo vệ private (do đó không thể tùy ý khởi tạo được đối tượng của lớp Printer)
- hàm get_spooler() là hàm static, sẽ tạo hoặc trả ra đối tượng spooler tùy theo nó đã được khởi tạo hay chưa, nếu chưa được khởi tạo sẽ dùng hàm khởi tạo.

## Cài đặt Singleton bằng C
Có thể thấy ngay rằng, cấu trúc (struct) trong C có thể dùng cho các lớp (class) trong OOP, tuy nhiên ta sẽ không có các phương thức mà phải thay bằng các hàm thông thường.
Printer được khai báo bằng struct như sau:


-----


![](https://images.viblo.asia/4d2a85bf-ff36-4b3b-8ecb-1be642fdfdbc.png)


-----



Cài đặt của hàm get_printer:


-----


![](https://images.viblo.asia/3a997564-31fe-47dd-8fc2-faa0accf9914.png)


-----


Biến spooler được khai báo là static, ban đầu được khởi tạo là NULL. Nếu hàm get_print được gọi lần đầu tiên, đoạn code trong câu lệnh if sẽ chạy và spooler sẽ được trỏ đến 1 cấu trúc trong Heap do câu lệnh malloc. Từ sau này, các lời gọi đến hàm get_printer sẽ chỉ đơn giản nhận lại con trỏ spooler đã trỏ đến vùng nhớ được khởi tạo trước đó (của lần gọi đầu tiên).
Ví dụ về việc sử dụng hàm get_printer để in (giả lập) một tài liệu:


-----


![](https://images.viblo.asia/ed73462a-7b4d-4c2a-9b41-7e2a3c014c28.png)


-----
Trong ví dụ trên, khi hàm computer_print được gọi lần thứ nhất, spooler sẽ được trỏ đến 1 vùng nhớ trong Heap mới tạo ra cho cấu trúc printer. Khi gọi computer_print lần thứ hai, spooler sẽ được trỏ lại vào chính vùng nhớ này.

Code: https://github.com/dttung79/singletoninc.git

## Thảo luận
Ví dụ mô phỏng máy in trên cho thấy Singleton cũng có thể được cài đặt bằng C. Tuy nhiên cài đặt này chỉ giải quyết được vấn đề thứ 2 trong Singleton: đóng gói và cung cấp 1 chia sẻ toàn cục đến cấu trúc máy in. Do C không có mức bảo vệ như OOP nên nếu muốn ta có thể tạo ra bao nhiêu biến kiểu cấu trúc printer cũng được và do đó không thỏa ứng được vấn đề thứ nhất (tính duy nhất).
Hẹn gặp lại các bạn trong bài tiếp theo của series này.