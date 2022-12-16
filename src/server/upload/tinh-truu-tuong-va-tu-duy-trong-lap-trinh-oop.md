![](https://images.viblo.asia/28618901-4a8e-4286-95e5-feaa05488b93.jpg)

### Lập trình hướng đối tượng là gì?


Lập trình hướng đối tượng (tiếng Anh: Object-oriented programming, viết tắt: OOP) là một mẫu hình lập trình dựa trên khái niệm "công nghệ đối tượng", mà trong đó, đối tượng chứa đựng các dữ liệu, trên các trường, thường được gọi là các thuộc tính; và mã nguồn, được tổ chức thành các phương thức. Phương thức giúp cho đối tượng có thể truy xuất và hiệu chỉnh các trường dữ liệu của đối tượng khác, mà đối tượng hiện tại có tương tác (đối tượng được hỗ trợ các phương thức "this" hoặc "self"). Trong lập trình hướng đối tượng, chương trình máy tính được thiết kế bằng cách tách nó ra khỏi phạm vi các đối tượng tương tác với nhau.[1][2] Ngôn ngữ lập trình hướng đối tượng khá đa dạng, phần lớn là các ngôn ngữ lập trình theo lớp, nghĩa là các đối tượng trong các ngôn ngữ này được xem như thực thể của một lớp, được dùng để định nghĩa một kiểu dữ liệu.
(theo wiki)

### Bốn tính chất của OOP

Lập trình hướng đối tượng là một phương pháp lập trình có 4 tính chất chính sau:

1. **Tính trừu tượng (abstraction)**: Đây là khả năng của chương trình bỏ qua hay không chú ý đến một số khía cạnh của thông tin mà nó đang trực tiếp làm việc lên, nghĩa là nó có khả năng tập trung vào những cốt lõi cần thiết. Mỗi đối tượng phục vụ như là một "động tử" có thể hoàn tất các công việc một cách nội bộ, báo cáo, thay đổi trạng thái của nó và liên lạc với các đối tượng khác mà không cần cho biết làm cách nào đối tượng tiến hành được các thao tác. Tính chất này thường được gọi là sự trừu tượng của dữ liệu. 

Tính trừu tượng còn thể hiện qua việc một đối tượng ban đầu có thể có một số đặc điểm chung cho nhiều đối tượng khác như là sự mở rộng của nó nhưng bản thân đối tượng ban đầu này có thể không có các biện pháp thi hành. Tính trừu tượng này thường được xác định trong khái niệm gọi là lớp trừu tượng hay lớp cơ sở trừu tượng.


2. **Tính đóng gói (encapsulation) và che giấu thông tin (information hiding)**: Tính chất này không cho phép người sử dụng các đối tượng thay đổi trạng thái nội tại của một đối tượng. Chỉ có các phương thức nội tại của đối tượng cho phép thay đổi trạng thái của nó. Việc cho phép môi trường bên ngoài tác động lên các dữ liệu nội tại của một đối tượng theo cách nào là hoàn toàn tùy thuộc vào người viết mã. Đây là tính chất đảm bảo sự toàn vẹn của đối tượng.


3. **Tính đa hình (polymorphism)**: Thể hiện thông qua việc gửi các thông điệp (message). Việc gửi các thông điệp này có thể so sánh như việc gọi các hàm bên trong của một đối tượng. Các phương thức dùng trả lời cho một thông điệp sẽ tùy theo đối tượng mà thông điệp đó được gửi tới sẽ có phản ứng khác nhau. Người lập trình có thể định nghĩa một đặc tính (chẳng hạn thông qua tên của các phương thức) cho một loạt các đối tượng gần nhau nhưng khi thi hành thì dùng cùng một tên gọi mà sự thi hành của mỗi đối tượng sẽ tự động xảy ra tương ứng theo đặc tính của từng đối tượng mà không bị nhầm lẫn.


Ví dụ khi định nghĩa hai đối tượng "hinh_vuong" và "hinh_tron" thì có một phương thức chung là "chu_vi". Khi gọi phương thức này thì nếu đối tượng là "hinh_vuong" nó sẽ tính theo công thức khác với khi đối tượng là "hinh_tron".


4. **Tính kế thừa (inheritance)**: Đặc tính này cho phép một đối tượng có thể có sẵn các đặc tính mà đối tượng khác đã có thông qua kế thừa. Điều này cho phép các đối tượng chia sẻ hay mở rộng các đặc tính sẵn có mà không phải tiến hành định nghĩa lại. Tuy nhiên, không phải ngôn ngữ định hướng đối tượng nào cũng có tính chất này.
(theo wiki)


### Tính trừu tượng và tư duy trong lập trình OOP

Thầy giáo dạy công nghệ phần mềm trước đây của tôi đã từng nói một câu đại loại rằng:

> **Khả năng yếu nhất của lập trình viên Việt Nam là tính trừu tượng hoá.**



Thời điểm đó tôi không thực sự tán thành, nhưng trớ trêu thay càng ngày tôi càng mất đi những lý lẽ đủ thuyết phục để phản biện lại nhận xét này.

Tôi đã từng làm việc ở khá nhiều công ty về công nghệ, từ những tập đoàn lớn cho tới những startup chỉ khoảng vài ba người, từ outsourcing cho tới những công ty làm về product, ERP hay dịch vụ tài chính.

Ở đâu tôi cũng tình cờ gặp những đoạn code kiểu dạng như sau:
Một ngày nọ chúng tôi được yêu cầu triển khai chức năng cho phép gửi email cho khách hàng khi phát sinh biến động về tài chính trong tài khoản cá nhân. 
Ai đó ngay lập tức tạo class `Email` với phương thức `sendEmail()` nhằm hiện thực hoá chức năng này trong vòng 30 phút. So far so good.

```public void sendEmail(string email, string content...)```

Một thời gian sau, chúng tôi được yêu cầu tiếp tục triển khai thêm chức năng gửi SMS vào luồng xử lý hiện tại. Một vài người đề xuất tạo thêm phương thức `sendSMS()` vào class `Email` đang có (wtf, tống một phương thức gửi SMS và object Email?). 
Có vẻ ai cũng nhận ra đó là một ý tưởng tồi, và họ quyết định tạo class `SMS` mới với phương thức `sendSMS()`.


```public void sendSMS(string phoneNumber, string content...)```


Mọi chuyện có vẻ vẫn ổn, cho đến khi chúng tôi tiếp tục được đề nghị triển khai chức năng gửi notification vào trang cá nhân của khách hàng. 
Một vài người vẫn cố chấp tin tưởng rằng nên tiếp tục tạo thêm class với tên gọi Notification, một vài người khác bắt đầu lờ mờ nhận ra rằng họ đã sai ngay từ những thiết kế ban đầu, nhưng bởi đã có quá nhiều `dependencies` được tạo ra và không còn cách nào khác ngoài việc tiếp tục chuỗi sai lầm tệ hại để không phá vỡ kết cấu hệ thống (mà họ cho rằng hợp lý).


Bất cứ lập trình viên nào hiểu biết về OOP đều có thể nhận thức được rằng, tất cả những gì nên được tạo ra là class `Sender` với phương thức `sendMessage()`, nhưng không nhiều người nhận ra ý tưởng đó ngay từ những bước thiết kế đầu tiên. 

Sai lầm phổ biến trong design hệ thống là người ta quá tin tưởng và những gì mình biết và khẳng định sẽ không có sự thay đổi. Nhưng không! chúng ta không hiểu rõ như chúng ta tưởng. Tôi đã từng đọc được một câu nói (nào đó), của một người nổi tiếng (nào đó không nhớ tên), đại loại là:

> **Sau một thời gian triển khai, chúng tôi nhận ra rằng thứ mình tạo ra hoàn toàn khác so với những tưởng tượng ban đầu về chúng.**


Nếu không thể biết trước những gì sẽ thay đổi, hãy trừu tượng hoá nó nhiều nhất có thể. **Abstraction** luôn là một trong những yếu tố quan trọng nhất của OOP, nhưng không nhiều người thực sự nhận thức được điều này.
Nhưng ngay cả khi chúng ta hiểu được điều đó, liệu đã là đủ? Tôi đã từng thấy một lập trình viên "có kinh nghiệm" triển khai class **Sender** với những phương thức sau:

```public void sendEmail(string email, string content...)```

```public void sendSMS(string phoneNumber, string content...)```


Rõ ràng rằng **email**, **phoneNumber** hay **content** nên là những thuộc tính của **object** và chỉ được phép tương tác thông qua method **get()**, **set()** hay contructor(). Vấn đề ngay lập tức phát sinh khi tôi muốn lưu trữ lại email và phoneNumber vào một temp table nào đó. Một vài người sẽ vã thẳng đoạn code lưu trữ này vào từng method (f***), một vài người khác tạo một method mới kiểu dạng như:

```public void logging(string something...)```

Nhưng rõ ràng cách làm này ẩn chứa nhiều nguy cơ conflict dữ liệu không đáng có. Chúng ta vẫn thường ra rả nói về OOP, trong khi lại thường xuyên vi phạm nghiêm trọng tính *encapsulation* của đối tượng.

Lượm lặt đâu đó, bạn có thể gặp một vài người sử dụng **strategy pattern**, bản thân tôi thì thích **observer pattern** hơn. 
Tư duy trong lập trình là thứ có thể dễ dàng thay đổi, nhưng nghiệt ngã ở chỗ, thuyết phục được một người thay đổi tư duy lại khó khăn hơn gấp bội. 

Tôi đã nhiều lần gặp những lập trình viên phủ định ngay những ý tưởng mới, ngay cả khi họ chưa hiểu rõ ý tưởng đó là gì. Tiếc thay, những lời biện hộ lại có vẻ rất thuyết phục như "tôi cho rằng thiết kế này là phù hợp với chức năng hiện có" hay "các hệ thống đang có đều thiết kế như vậy". Chúng ta thường vận dụng những tư duy cũ cho một hệ thống mới và hy vọng vào một sự chuyển biến mang chiều hướng tích cực. Nhưng sự thuyết phục để thay đổi là vô cùng khó khăn khi mà ngay cả **loose coupling** hay **high cohesion** vẫn còn là những ý niệm hết sức mơ hồ.

> **Insanity is doing the same thing over and over again, but expecting different results. 
> (*lần này thì nhớ tên: Albert Einstein*)**
 


Tổng hợp từ các nguồn:

[Lập trình hướng đối tượng](https://vi.wikipedia.org/wiki/L%E1%BA%ADp_tr%C3%ACnh_h%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91i_t%C6%B0%E1%BB%A3ng)

[Sang Dang](https://www.facebook.com/profile.php?id=100005101456208)