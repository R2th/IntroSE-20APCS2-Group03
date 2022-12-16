## 1. Giới thiệu
C# 8.0 giới thiệu kiểu tham chiếu nullable và kiểu tham chiếu non-nullable cho phép bạn đưa ra các lựa chọn quan trọng về thuộc tính cho các biến kiểu tham chiếu:
* Tham chiếu không hỗ trợ tham chiếu nullable. Khi các biến không được hỗ trợ để null, trình biên dịch thực thi các quy tắc đảm bảo an toàn khi bỏ qua tham chiếu các biến này mà không cần kiểm tra trước rằng nó không phải là null:
    * Biến phải được khởi tạo thành một giá trị non-null.
    * Biến không bao giờ có thể được gán giá trị null.
* Tham chiếu có thể là null. Khi các biến có thể là null, trình biên dịch thực thi các quy tắc khác nhau để đảm bảo rằng bạn đã kiểm tra chính xác tham chiếu null:
    * Biến chỉ có thể được tham chiếu khi trình biên dịch có thể đảm bảo rằng giá trị không null.
    * Các biến này có thể được khởi tạo với giá trị null mặc định và có thể được gán giá trị null ở chỗ khác.
  
Tính năng mới này cung cấp những lợi ích đáng kể so với việc xử lý các biến tham chiếu trong các phiên bản C# trước đó mà mục đích thiết kế không thể được xác định từ lúc khai báo biến. Trình biên dịch không cung cấp sự an toàn trước các ngoại lệ tham chiếu rỗng cho các loại tham chiếu:
   * Tham chiếu có thể là null. Trình biên dịch sẽ không đưa ra bất kỳ cảnh báo nào khi một biến kiểu tham chiếu được khởi tạo thành null hoặc sau đó được gán null. Trình biên dịch sẽ đưa ra cảnh báo khi các biến này được tham chiếu mà không có kiểm tra null
   * Một tham chiếu được giả định là không null. Trình biên dịch sẽ không đưa ra bất kỳ cảnh báo nào khi các loại tham chiếu được bỏ tham chiếu. Trình biên dịch đưa ra cảnh báo nếu một biến được đặt thành một biểu thức có thể là null.
   
 Các cảnh báo này được phát ra tại thời điểm biên dịch. Trình biên dịch sẽ không có thêm bất kỳ cách kiểm tra null hoặc cấu trúc thời gian chạy nào khác trong ngữ cảnh có thể null. Trong thời gian chạy, một tham chiếu nullable và một tham chiếu non-nullable là tương đương nhau.
 
 Với việc bổ sung các kiểu tham chiếu nullable, bạn có thể khai báo ý định của mình rõ ràng hơn. Giá trị null là cách chính xác để biểu thị rằng một biến không tham chiếu đến một giá trị. Không sử dụng tính năng này để xóa tất cả các giá trị rỗng khỏi mã của bạn. Thay vào đó, bạn nên khai báo ý định của mình cho trình biên dịch và các nhà phát triển khác đọc mã của bạn. Bằng cách khai báo ý định của bạn, trình biên dịch sẽ thông báo cho bạn khi bạn viết mã không phù hợp với ý định đó.
 
Kiểu tham chiếu nullable được ghi chú bằng cách sử dụng cú pháp giống như kiểu giá trị nullable: a? được thêm vào kiểu của biến. Ví dụ, khai báo biến sau đại diện cho một biến chuỗi nullable, tên:
``` C#
string? name;
```
Bất kỳ biến ở đâu không được thêm "?" vào tên kiểu là một kiểu tham chiếu non-null. Điều đó bao gồm tất cả các biến loại tham chiếu trong mã khả dụng có khi bạn đã bật tính năng này. 

Trình biên dịch sử dụng phân tích tĩnh để xác định xem một tham chiếu nullable được định nghĩa là non-null. Trình biên dịch sẽ cảnh báo bạn nếu bạn bỏ qua một tham chiếu nullable khi nó có thể là null. Bạn có thể ghi đè hành vi này bằng cách sử dụng toán tử null-forgiving "!" theo sau một tên biến. Ví dụ: nếu bạn biết biến tên không phải là null nhưng trình biên dịch đưa ra cảnh báo, bạn có thể viết mã sau để ghi đè phân tích của trình biên dịch:
``` C#
name!.Length;
```
## 2. Các loại nullable
Bất kỳ loại tham chiếu nào cũng có thể có một trong bốn giá trị nullable, mô tả thời điểm các cảnh báo được tạo:
* Nonnullable: Không thể gán giá trị null cho các biến kiểu này. Các biến thuộc loại này không cần phải được kiểm tra null trước khi truy cập.
* nullable: Null có thể được gán cho các biến kiểu này. Các biến tham chiếu thuộc loại này mà không kiểm tra trước để tìm giá trị null sẽ gây ra cảnh báo.
* Oblivious: Oblivious là trạng thái trước C# 8.0. Các biến loại này có thể được tham chiếu hoặc gán mà không có cảnh báo.
* Unknown: Unknown thường dành cho các tham số kiểu trong đó các ràng buộc không cho trình biên dịch biết rằng kiểu phải là nullable hoặc non-nullable.

Tính nullable của một kiểu dữ liệu trong khai báo biến sẽ được kiểm soát bởi ngữ cảnh có thể nullable mà trong đó biến được khai báo.
## 3. Các ngữ cảnh nullable
Các ngữ cảnh nullable cho phép kiểm soát chi tiết cách trình biên dịch diễn giải các biến kiểu tham chiếu. Bạn có thể coi trình biên dịch trước C# 8.0 giống như việc biên dịch tất cả mã của bạn trong ngữ cảnh có thể nullable bị vô hiệu hóa và bất kỳ loại tham chiếu nào cũng có thể là rỗng. Ngữ cảnh cảnh báo nullable cũng có thể được bật hoặc tắt. Bối cảnh cảnh báo nullable chỉ định các cảnh báo được tạo bởi trình biên dịch bằng cách sử dụng phân tích luồng của nó.

Có thể đặt ngữ cảnh chú thích có thể nullable và ngữ cảnh cảnh báo có thể nullable được đặt cho một dự án bằng cách sử dụng phần tử nullable trong tệp .csproj của bạn. Phần tử này cấu hình cách trình biên dịch diễn giải khả năng vô hiệu của các loại và những cảnh báo nào được tạo ra. Cài đặt hợp lệ là:

* enable: Ngữ cảnh chú thích nullable được bật. Ngữ cảnh cảnh báo nullable được bật.
    * Các biến của kiểu tham chiếu, ví dụ như chuỗi, là không thể rỗng. Tất cả các cảnh báo về khả năng vô hiệu đều được bật.
* warnings: Ngữ cảnh chú thích nullable bị tắt. Ngữ cảnh cảnh báo nullable được bật.
    * Các biến của một loại tham chiếu là bị bỏ qua. Tất cả các cảnh báo về khả năng nullable đều được bật.
* annotations: Ngữ cảnh chú thích nullable được bật. Ngữ cảnh cảnh báo nullable bị vô hiệu hóa.
    * Các biến của kiểu tham chiếu, ví dụ như chuỗi, là non-nullable. Tất cả các cảnh báo về khả năng nullable đều bị vô hiệu hóa.
* disable: Ngữ cảnh chú thích nullable bị vô hiệu hoá. Ngữ cảnh cảnh báo nullable bị vô hiệu hóa.
    * Các biến của một loại tham chiếu là không rõ ràng, giống như các phiên bản trước đó của C#. Tất cả các cảnh báo về khả năng nullable đều bị vô hiệu hóa. 

```XML
<nullable>enable</nullable>
```

Bạn cũng có thể sử dụng các cấu hình khác ở bất kỳ đâu trong dự án của mình:
* #nullable enable: Đặt ngữ cảnh chú thích có thể nullable và ngữ cảnh cảnh báo có thể nullable thành bật.
* #nullable disable: Đặt ngữ cảnh chú thích có thể nullable và ngữ cảnh cảnh báo có thể nullable thành tắt.
* #nullable restore: Khôi phục ngữ cảnh chú thích có thể nullable và ngữ cảnh cảnh báo có thể nullable vào cài đặt project.
* #nullable disable warnings: Đặt ngữ cảnh cảnh báo có thể nullable thành tắt.
* #nullable enable warnings: Đặt ngữ cảnh cảnh báo có thể nullable thành bật.
* #nullable restore warnings: Khôi phục ngữ cảnh cảnh báo có thể nullable vào cài đặt dự án.
* #nullable disable annotations: Đặt ngữ cảnh chú thích có thể nullable thành tắt.
* #nullable enable annotations: Đặt ngữ cảnh cho chú thích có thể nullable thành bật.
* #nullable restore annotations: Khôi phục ngữ cảnh cảnh báo chú thích vào cài đặt dự án.

Theo mặc định, các ngữ cảnh cảnh báo và chú thích có thể nullable đều bị tắt, bao gồm cả các project mới. Điều đó có nghĩa là mã hiện tại của bạn biên dịch mà không có thay đổi sẽ không tạo ra bất kỳ cảnh báo mới nào.