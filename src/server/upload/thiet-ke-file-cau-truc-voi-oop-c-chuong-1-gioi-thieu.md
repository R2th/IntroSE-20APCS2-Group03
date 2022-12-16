Lập trình thường ngày các bạn dùng gì để lưu trữ dữ liệu - mình thường dùng database - sqlite, postgresql, ms sql server. Nhưng chúng đều là blackbox, mình chẳng hiểu gì cách chúng hoạt động như thế nào? Lưu trữ dữ liệu ở đâu, làm sao để tạo mục lục? ...
Đọc hết sách này chắc cũng chưa trả lời được, nhưng chúng ta sẽ hình dung ra được câu trả lời.
Mình muốn tìm hiểu sâu hơn, làm sao để tạo ra binary file có khả năng lưu trữ, đọc, ghi, chỉnh sửa nhanh chóng.

Tên sách là File Structures - An Object-Oriented Approach with C++

# Thiết kế File structures
(ND: Cuốn sách này được viết năm 1998)

## Chương 1: Giới thiệu

### Căn bản về thiết kế File structures

Disk là những kỳ quan công nghệ, khả năng lưu trữ hàng TB có thể chứa vừa trong một máy tính. 
Chúng phát triển rất nhanh: khi mà một vài năm trước cũng bằng ấy dung lượng sẽ sếp được các chồng đĩa to như chiếc máy rửa bát.
Lưu trữ trên đĩa là chậm chạp: Về tốc độ so với những phần khác của máy tính đĩa rất chậm.

Chậm như nào? Thời gian truy cập RAM vào khoảng 120 nanoseconds, 120 phần tỷ giây, trong khi lấy thông tin từ đĩa mất từ 30 miliseconds -> 30 nghìn giây.
Nhưng đĩa rẻ hơn RAM, không bị mất dữ liệu khi mất điện.

=> Đĩa rất chậm, vậy việc có một file structures với thiết kế tốt là rất cần thiết.

Một file structures là tập hợp dữ liệu trong 1 hoặc nhiều tập tin. Một file structure cho phép các ứng dụng có khả năng đọc, ghi, chỉnh sửa dữ liệu, tìm kiesm dữ liệu theo một vài tiêu chí.

Một cải tiến trong việc thiết kế file structure có thể khiến ứng dụng nhanh hơn gấp trăm lần. 

### Một chút lịch sử

 - Bắt đầu từ ý tưởng: chúng ta không muốn phải truy cập nhiều lần xuống đĩa mới lấy được thông tin.
 - Nếu có cách nào chỉ cần truy cập một lần là lấy được thông tin, chúng ta muốn cấu trúc cho phép tìm thông tin với ít lần truy cập đĩa nhất có thể. 
 Ví dụ, bạn có nhớ những gì học được về binary search cho phép chúng ta tìm bản ghi trong 50 bản ghi mà với không quá 6 phép so sánh. 
 Chúng ta cần file structure cho phép chúng ta tìm với chỉ 1 hoặc 2 lần truy cập đĩa.
 - Chúng ta muốn file structure nhóm những thông tin chúng ta cần với chỉ 1 lần truy cập đĩa. Nếu chúng ta cần tên, địa chỉm sđt, số dư tài khoản, chúng ta lấy tất cả thông tin trong một lần,
 hơn là tìm chúng tại nhiều nơi.

 Khá dễ khi thiết kế file structure mà không có sự thay đổi. Thiết kế file structures giúp thêm bớt thông tin là khá hơn nhiều.

 Ngày trước làm việc trên các tape, truy cập tuần tự , và cost of access tăng lên theo kích cỡ của file. Khi file lớn lên, chúng ta cần
 index để giữ danh sách keys và địa chỉ trong một file nhỏ hơn, giúp việc tìm kiếm dễ dàng. Với key và pointer, người dùng có thể truy cập trực tiếp vào file chính.

Khi index tăng lên, chúng trở nên khó để quản lý, đặc biệt với tập tin động, keys thay đổi. Vào đầu những năm 1960s, ý tưởng về cấu trúc tree được bắt đầu.
Không may, trees phát triển balance khi mà bản ghi đợc thêm và xóa.

Năm 1963 các nhà nghiên cứu phát triển AVL tree, tự cân bằng cho dữ liệu trên memory.
Các nhà nghiên cứu khác bắt đầu muốn áp dụng chúng cho tập tin. (ND: Như vậy có vẻ tạo file structures khó hơn nhiều so với data structures như linked list, pointer trong chương trình lưu trên RAM)
Vấn đề là vẫn cần cả tá yêu cầu để tìm một bản ghi.

Sau đó khoảng 10 năm, B-tree ra đời, B-tree phát triển từ dưới lên, AVL trên phát triển từ trên xuống.
B-tree có hiệu suất truy cập cao, nhưng truy cập tuần tự lại chưa hiệu quả, may mắn thay chúng ta có thể giải quyết vấn đề này ngay bằng cách thêm linked list structure vào level cuối cùa B-tree.
Combination of a B-tree và a linked list được gọi là B+ tree

10 năm tiếp theo, Btree và B+tree trở thành nền tảng của nhiều hệ thống file thương mại, 

### Công cụ 1: Lý thuyết File Structure

Chúng ta đã có khoảng 3 thập kỷ phát triển file structure. Chaper 2 - 6 cung cấp các công cụ cơ bản, 7 -> 11 giới thiệu về file structure.

### Công cụ lập trình hướng đối tượng: Tạo ra File Structures khả dụng

### Sử dụng Objects trong C++