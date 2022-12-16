# Kiểu Optinal là gì?
Optional là một kiểu khai báo biến mà nếu biến thuộc kiểu Optional thì biến đó được phép nil ( vắng mặt giá trị ). Khi đó biến Optional có hai khả năng: Có giá trị hoặc không có giá trị. Nếu biến có giá trị, ta phải unwrap (mở ra) để lấy giữ liệu
Ví dụ: 
```
var sometext: String?
```
 Khi đó biến sometext thuộc kiểu Optional String . Và đang mang giá trị nil. Hãy theo dõi đoạn code sau: 
```
sometext = "Hello World"
print("In ra dong chu: \(sometext)")
// In ra dong chu Optional("Hello World")
```
Ta có thể thấy giá trị "Hello World" của biến sometext đã được bọc lại bởi Optinal giá trị khi in ra của nó là "Optional("Hello World")" chứ không phải là "Hello World". 

Hoặc là khi ta khai báo 1 biến nhận giá trị từ server, nếu lỗi mạng hay lỗi API thì biến sẽ không thể nhận giá trị. Khi đó biến này có 2 khả năng: nil và có giá trị → ta khai báo biến này kiểu Optional

- Không giống như ở C hay Objective C ( kiểu nil chỉ xuất hiện ở object hay kiểu trả về của hàm) biến optional trong Swift có thể nil ở bất kỳ kiểu dữ liệu nào. 
- Sau khi khai báo nếu không gán giá trị thì biến có giá trị mặc định là nil
 
# Tại sao lại phải khai báo biến kiểu Optinals? 
Nếu như chỉ đọc định nghĩa hoặc bạn bắt đầu học lập trình từ ngôn ngữ Swift thì thật khó để hiểu. Trong đầu bạn sẽ xuất hiện các câu hỏi đại khái như là:
Đơn giản là nil và có giá trị, ở ngôn ngữ khác ta có thể check nil được mà, vậy tại sao lại cần phải sinh ra kiểu Optinal này làm gì ? Optinals liệu có làm mọi thứ rắc rối ? Câu trả lời là không. Hãy theo dõi ví dụ thực để sau để hiểu rõ về nó!
Khi ta muôn convert 1 đoạn text từ kiểu chữ sang dạng số. Ta làm như sau 

ở ngôn ngữ Objective C
```
NSString * text = @"Hello World";
NSInteger *number = [text integerValue];
NSLog(@"gia tri la: %d", number);
//// gia tri la:  0
```
Ngôn ngữ Swift
```
sometext = "Hello World"
number = Int(sometext!)
print("gia tri la: \(number!))
// gia tri la: nil
```
Tạm thời bỏ qua dấu ! nằm sau biến number, đó là 1 kiểu unwrap và mình sẽ nói rõ ở phần sau.
Các bạn đã thấy sự khác biệt của 2 ngôn ngữ này chưa? Kết quả ở Objective C là 0( có giá trị ), còn ở swift là nil (không có giá trị). Nếu có giá trị nó sẽ tốn của bạn 1 vùng nhớ. ( Các bạn có thể tìm hiểu rõ về nil để có cái nhìn tổng quát hơn). Rõ ràng,  Swift đã làm cho app của bạn tiết kiệm được 1 vùng nhớ. Thật tuyệt vời đúng không ?

Có thể nói, ngôn ngữ Swift sinh ra để giải quyết một số bất cập từ những ngôn ngữ trước đó. Và Optinal chính là một ví dụ tiêu biểu về bất cập của nil (Null). Optinal là đặc trưng của ngôn ngữ Swift mà chỉ khi bạn nắm rõ về nó thì bạn mới thực sự làm chủ ngôn ngữ Swift. 
Trên đây là cái nhìn tổng quan về Optinal trong ngôn ngữ Swift, ở phần sau mình sẽ nói đầy đủ về những cách unwrap và đặc điểm của chúng. Cám ơn mọi người đã đọc bài viết và rất mong nhận được sự góp ý từ những người đi trước. Thank you!