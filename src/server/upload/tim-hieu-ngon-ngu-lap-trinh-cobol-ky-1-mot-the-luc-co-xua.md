Hiện nay, các ngôn ngữ lập trình của ngành IT vô cùng đa dạng. C, C++, PHP, C#, VB.Net, Java, Node.js, React, Kotlin, Objective C, Swift.... là các ngôn ngữ thường gặp trong mục "Yêu cầu kĩ thuật" khi bạn lướt qua các trang web tuyển dụng nhân sự cho các công ty phần mềm. Tuy nhiên nếu bạn lướt qua các mục tuyển dụng của các công ty có quá trình phát triển lâu đời, đặc biệt trong ngành tài chính ngân hàng, thi thoảng bạn sẽ bắt gặp một vài mục tuyển dụng có yêu cầu kiến thức về ngôn ngữ **COBOL**.  
Vậy COBOL là gì và nó có ưu khuyết điểm gì? Chúng ta cùng tìm hiểu nhé.  
***
**1. COBOL là gì?**  
COBOL (viết tắt của **COmmon Business-Oriented Language**) là một trong những ngôn ngữ lập trình lâu đời nhất còn được sử dụng. Được phát triển từ năm 1959, đến năm 1968 thì được chuẩn hoá và  COBOL thực sự được ra đời. Những dòng lệnh của COBOL được thiết kế sao cho đọc giống như đọc tiếng Anh, vì thế source code COBOL có khả năng tự mô tả và dễ đọc.  
Ví dụ khi muốn gán biến y bằng giá trị biến x, đa số các ngôn ngữ lập trình sẽ sử dụng cú pháp sau:  
`y = x;`  
Còn COBOL thì sử dụng cú pháp giống-tiếng-Anh hơn:  
`MOVE x TO y.`  
Điều này cho phép COBOL dễ đọc hơn, nhưng cũng khiến source code COBOL dài dòng hơn hẳn các ngôn ngữ lập trình hiện nay.  
Một ứng dụng COBOL bao gồm cả triệu dòng lệnh là điều hết sức bình thường. :D  
COBOL được sử dụng chủ yếu trong các hệ thống liên quan tới ngân hàng, bảo hiểm và các hệ thống quản trị doanh nghiệp, chính phủ. (COBOL và FORTRAN là 2 ngôn ngữ lập trình chủ yếu sử dụng cho hệ thống điều khiển vũ khí hạt nhân đấy các bạn ạ, ngầu chưa?)  
***
**2. Cấu trúc 1 chương trình viết bằng COBOL:**  
Mỗi chương trình COBOL thường bao gồm 4 DIVISION (phân vùng): Identification, Environment, Data, Procedure.  
- IDENTIFICATION: thể hiện thông tin cơ bản của chương trình.
- ENVIRONMENT: chứa các thông tin về môi trường và cấu hình để chạy chương trình.
- DATA: Chứa thông tin khai báo biến sử dụng trong chương trình.
- PROCEDURE: Các hàm hay chương trình con trong chương trình. Chứa tất cả các đoạn mã thực hiện công việc của chương trình.

Mỗi DIVISION bao gồm nhiều SECTION.  
Mỗi SECTION bao gồm nhiều PARAGRAPH.  
Mỗi PARAGRAPH bao gồm nhiều SENTENCE.  
Mỗi SENTENCE bao gồm nhiều STATEMENT.  
![](https://images.viblo.asia/a5da9343-2b9e-457b-acd7-924ecb8791aa.png)

Chúng ta xem thử source code một chương trình COBOL để hiểu rõ hơn nhé.
```COBOL
000100 IDENTIFICATION DIVISION.
000200 PROGRAM-ID. HELLOWORLD.
000300 PROCEDURE DIVISION.
000400     DISPLAY "Hello world".
000500     STOP RUN.      
```
Trên đây là program kinh điển "Hello World" được viết bằng COBOL. Như các bạn thấy, chỉ có Division IDENTIFICATION và PROCEDURE. Các Division còn lại nếu không cần thiết thì không có cũng không sao.  
Mỗi dòng lệnh COBOL bao gồm:  
- 6 kí tự đầu tiên để đánh số dòng code.
- kí tự thứ 7 là khoảng trắng, nếu dòng đó dùng để ghi chú thích (comment) thì kí tự thứ 7 là dấu *.
- Từ kí tự 8 đến 11 (được gọi là vùng A - A Area). Các Divison và Section phải được bắt đầu từ đây. Tức là các dòng như IDENTIFICATION DIVISION phải được bắt đầu viết từ cột thứ 8 tới cột 11, không được để tới cột thứ 12 mới viết.
- Từ kí tự 12 tới 72 (được gọi là vùng B - B Area)
- Từ kí tự 73 trở đi: không được xét tới trong chương trình.
- *Mỗi dòng lệnh COBOL nhất thiết phải được kết thúc bằng 1 dấu chấm.*
![](https://images.viblo.asia/24d0eb47-4774-414e-87f7-5738d5f2e279.png)
***
**3. Ưu nhược điểm của COBOL:**  
Ưu điểm của COBOL:  
- Dễ đọc hiểu, tự tài liệu hoá (đọc code thì khỏi cần đọc tài liệu luôn. :D)  
- Có thể xử lý khối lượng data lớn một cách dễ dàng.  
- Được sử dụng rộng rãi trên các hệ thống lớn (đây là ưu điểm phi kĩ thuật, nó đồng nghĩa với việc nếu bạn thông thạo ngôn ngữ này thì dễ có lương cao và cơ hội việc làm ổn định).  
Hiện tại Cobol là ngôn ngữ chạy nhiều nhất trên các máy vi tính Mainframe, hằng ngày, hàng triệu dòng Cobol được viết trong những chương trình "Business". Theo Reuters, hằng ngày khoảng ba nghìn tỷ đô la được luân chuyển trong các giao dịch thương mại thông qua các hệ thống COBOL. Nhiều tập đoàn tài chính lớn và một số bộ phận của chính phủ liên bang đã xây dựng toàn bộ cơ sở hạ tầng của họ trên các căn cứ của COBOL từ những năm 70 và 80.  
  
Nhược điểm của COBOL:  
- Source code lớn, khi maintain và chỉnh sửa đọc code rất "phê". (bản thân người viết từng đọc những file source COBOL rất dài để điều tra bug, có khi sửa một lỗi nhỏ cũng mất cả ngày đọc source)  
- Ngày càng ít phổ biến, ít được quan tâm phát triển thêm.

Trên đây là những thông tin tổng quan về COBOL và một ít đánh giá về ngôn ngữ này, hy vọng đã cung cấp 1 cái nhìn tổng thể cho các bạn. Nếu các bạn có hứng thú với ngôn ngữ này, hãy cùng mình tìm hiểu nó nhé. Kỳ tới chúng ta sẽ tiếp tục tìm hiểu các cú pháp của COBOL thông qua vài ví dụ chương trình nho nhỏ.  

Link tham khảo:  
https://en.wikipedia.org/wiki/COBOL  
https://searchitoperations.techtarget.com/definition/COBOL-Common-Business-Oriented-Language  
https://thenextweb.com/finance/2017/04/10/ancient-programming-language-cobol-can-make-you-bank-literally/