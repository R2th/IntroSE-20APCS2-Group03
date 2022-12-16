Nguồn: eginnovations.com/blog/what-is-garbage-collection-java/

# Giới thiệu sơ lược về Garbage Collection

Các ứng dụng Java lấy các đối tượng trong bộ nhớ khi cần thiết. Nhiệm vụ của Garbage Collection (GC) trong máy ảo Java (JVM) là tự động xác định bộ nhớ nào không còn được ứng dụng sử dụng và tái chế bộ nhớ này cho các mục đích khác. Vì bộ nhớ được tự động giải phóng trong JVM, lập trình viên không phải thủ công tự đi giải phóng các đối tượng bộ nhớ không được sử dụng. GC hoạt động trên tiền đề rằng hầu hết các đối tượng được sử dụng trong code Java đều tồn tại trong thời gian ngắn và có thể được giải phóng không lâu sau khi tạo. Bởi vì các đối tượng không được tham chiếu sẽ tự động bị xóa khỏi bộ nhớ heap, GC giúp cho Java sử dụng bộ nhớ một cách hiệu quả hơn.

Vì GC giải phóng lập trình viên khỏi việc xử lý thủ công việc phân bổ bộ nhớ, nó giúp giảm đáng kể những loại bug như sau:

* Lỗi "Dangling pointer" xảy ra khi một phần bộ nhớ được giải phóng trong khi vẫn còn con trỏ đến nó và một trong những con trỏ đó được tham chiếu đến. Đến lúc đó bộ nhớ có thể đã được gán lại cho một mục đích sử dụng khác, dẫn đến những kết quả không thể dự đoán trước được.
* Lỗi "Double free" xảy ra khi chương trình cố gắng giải phóng một vùng bộ nhớ đã được giải phóng từ trước hay thậm chí đã được allocate lại.
* Một số loại bug rò rỉ bộ nhớ, trong đó một chương trình không thể giải phóng bộ nhớ bị chiếm bởi các đối tượng không thể truy cập được, có thể dẫn đến cạn bộ nhớ.

Có thể phân hoạt động GC thường xảy ra trong Java ra làm 2 loại:

* GC quy mô nhỏ: Xóa các đối tượng không thể truy cập trong young generation của bộ nhớ heap.
* GC quy mô lớn: Xóa các đối tượng không bị xóa bởi GC quy mô nhỏ và được sao chép vào old/permanent generation của bộ nhớ heap. GC ít xảy ra ở old generation hơn young generation.

Để giải phóng bộ nhớ, JVM phải dừng ứng dụng chạy trong ít nhất một thời gian ngắn và thực thi GC. Quá trình này được gọi là “stop-the-world”. Điều này có nghĩa là tất cả các luồng, ngoại trừ các luồng GC, sẽ ngừng thực thi cho đến khi các luồng GC được thực thi và các đối tượng được giải phóng.

Các cách implement GC hiện đại cố gắng giảm thiểu tình trạng “stop-the-world” bằng cách thực hiện càng nhiều công việc ở background càng tốt (tức là sử dụng một thread riêng biệt), ví dụ như đánh dấu các instance rác không thể truy cập trong khi process của ứng dụng tiếp tục chạy.

Quá trình GC tiêu tốn tài nguyên CPU để quyết định bộ nhớ nào cần giải phóng. Nhiều trình GC khác nhau đã được phát triển để giảm tình trạng ứng dụng bị chững lại xảy ra trong quá trình GC và đồng thời để cải thiện hiệu suất liên quan đến GC.

Có bốn cách để thực hiện hoạt động GC trong máy ảo Oracle HotSpot JVM truyền thống:

* Serial: Chỉ một luồng thực thi GC
* Song song: Nhiều luồng nhỏ được thực thi đồng thời, mỗi luồng thực thi một phần của GC
* Concurrent Mark Sweep (CMS): tương tự như song song, cũng cho phép thực thi một số luồng ứng dụng và giảm tần suất tình trạng “stop-the-world”
* G1: Cũng được chạy song song và đồng thời nhưng hoạt động khác với CMS

# Tầm quan trọng của việc giám sát hoạt động GC

GC có thể gây các ảnh hưởng không thể đoán trước được đến hiệu suất của ứng dụng Java. Khi hoạt động GC xảy ra nhiều, nó sẽ thêm rất nhiều tải cho CPU và làm chậm quá trình xử lý ứng dụng, dẫn đến việc thực hiện giao dịch bị chậm đi và cuối cùng là ảnh hưởng đến trải nghiệm người dùng của người dùng cuối.

Hoạt động GC xảy ra quá mức có thể bắt nguồn từ nguyên nhân do rò rỉ bộ nhớ trong ứng dụng Java, hoặc do lập trình viên cấp phát bộ nhớ không đủ cho JVM. Thường biểu hiện của việc GC đang hoạt động quá mức là tình trạng mức sử dụng CPU của JVM tăng cao.

Để có ứng dụng Java đạt được hiệu suất tối ưu, chúng ta phải giám sát hoạt động GC của JVM. Để có hiệu suất tốt, GC quy mô lớn chỉ nên chạy với tần suất thấp.