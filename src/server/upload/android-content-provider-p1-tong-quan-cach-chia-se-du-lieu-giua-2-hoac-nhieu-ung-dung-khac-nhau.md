# I. Tổng quan
![](https://images.viblo.asia/51c36feb-7c77-427f-8980-943faf20ed61.jpg)

Trên nền tảng Android, một ứng dụng không thể truy cập trực tiếp (đọc / ghi) dữ liệu của ứng dụng khác. Tất cả dữ liệu của ứng dụng là riêng tư đối với ứng dụng đó. Mỗi ứng dụng đều có thư mục dữ liệu id riêng và vùng bộ nhớ được bảo vệ riêng. Điều này có nghĩa là một ứng dụng không thể truy vấn hoặc thao tác dữ liệu của một ứng dụng khác. Tuy nhiên, nếu bạn muốn bật ứng dụng truy vấn hoặc thao tác dữ liệu của ứng dụng khác, bạn cần sử dụng khái niệm **Content Providers**. Vậy chúng ta cùng tìm hiểu nó như thế nào nhé!

# II. Content Providers là gì?
**Content Providers** là một tập dữ liệu được bao bọc trong một custom API để có thể cho phép đọc và ghi. Nó hoạt động như một interfacae cho phép bạn lưu trữ và truy xuất dữ liệu từ một nguồn lưu trữ dữ liệu (repository). Và nó đối tượng này cũng cho phép bạn chia sẻ dữ liệu giữa các ứng dụng khác nhau.  Content Providers tách lớp ứng dụng khỏi lớp dữ liệu bằng cách trừu tượng nguồn dữ liệu cơ bản, do đó làm cho ứng dụng nguồn dữ liệu độc lập. Chúng cho phép kiểm soát permisstion, cho phép ứng dụng khác có quyền truy cập đến nguồn lưu trữ dữ liệu hay không, giúp cho việc chia sẻ dữ liệu trở lên dễ dàng.
Và tất nhiên, bất kỳ ứng dụng nào có quyền (permissions) phù hợp đều có thể thêm, xóa, cập nhật và truy xuất dữ liệu của một ứng dụng khác bao gồm dữ liệu trong một số cơ sở dữ liệu Android Native.

Có 2 loại Content Providers:
- Native content providers: Chúng cung cấp quyền truy cập vào cơ sở dữ liệu tích hợp có sẵn, chẳng hạn như Contacts, Media player, Message và các cơ sở dữ liệu gốc khác. Bạn cần cấp các quyền cần thiết cho ứng dụng của mình trước khi sử dụng nhà cung cấp nội dung gốc
- Custom content providers: 1 dạng custom cở sở dữ liệu tự tạo bởi nhà phát triển để phù hợp với các yêu cầu của ứng dụng.

Vậy content Content Provider có thể coi là 1 nơi lưu trữ dữ liệu, cho phép các ứng dụng có thể chia sẻ, trao đổi dữ liệu cho nhau. Vậy làm cách nào để kết nối hay sử dụng đối tượng Content Providers này. Khái niệm tiếp theo sau đây, chúng ta cùng tìm hiểu tiếp nhé.

# III. Content Resolver là gì?
Để nhận dữ liệu và tương tác với Content Provider, một ứng dụng sử dụng đối tượng đó là **Content Resolver** để gửi yêu cầu tới Content Provider.
Đối tượng ContentResolver cung cấp các phương thức query (), insert (), update () và delete () để truy cập dữ liệu từ Content Provider. Mỗi request bao gồm một URI và một truy vấn SQL, và response trả về sẽ là một đối tượng Cursor.
Để chi tiết hơn, chúng ta hãy xem sơ đồ follow dưới đây:

![](https://images.viblo.asia/55215b0e-353f-4b1e-96f0-e297658459fe.png)

# IV. Example
Lấy 1 ví dụ đơn giản. Bài toán chúng ta bây giờ sẽ là:
Tạo 1 ứng dụng (A) chỉ nhằm mục đích lưu trữ dữ liệu đa số các món ăn ngon, thông dụng và sử dụng nhiều nhất hiện nay. Ứng dụng này hoàn toàn không có giao diện. Chỉ là nơi lưu trữ dữ liệu.
Tiếp theo đó là việc tạo ra 2 ứng dụng khác, 1 ứng dụng là từ điển các món ăn, 1 ứng dụng sẽ là đặt món ăn của 1 nhà hàng. Bài toán của chúng ta đơn giản chỉ là 2 ứng dụng trên sẽ cùng truy cập vào ứng dụng (A) lưu trữ dữ liệu để tìm kiếm dữ liệu có liên quan đến từng ứng dụng của mình.

# V. Lợi ích Content Providers
 Content Providers rất hữu ích cho các ứng dụng muốn cung cấp dữ liệu cho các ứng dụng khác.
 - Với Content Providers, bạn có thể cho phép nhiều ứng dụng khác truy cập, sử dụng và sửa đổi một nguồn dữ liệu duy nhất mà ứng dụng của bạn cung cấp. (Ví dụ ở trên)
 - Để kiểm soát truy cập, bạn có thể chỉ định các permisions cho Content Providers của mình, chỉ định cách các ứng dụng khác có thể truy cập dữ liệu. Ví dụ: Nhà hàng có thể không được phép thay đổi dữ liệu thông tin món ăn mà không phải do họ cung cấp.
 - Bạn có thể lưu trữ dữ liệu độc lập với ứng dụng, bởi vì Content Providers nằm giữa giao diện người dùng và nơi dữ liệu của bạn được lưu trữ. Bạn có thể thay đổi cách dữ liệu được lưu trữ mà không cần thay code chương trình.
 - Một lợi ích khác của việc tách dữ liệu khỏi giao diện người dùng với Content Providers là các nhóm phát triển có thể hoạt động độc lập trên giao diện người dùng và kho dữ liệu của ứng dụng của bạn. Đối với các ứng dụng phức tạp, lớn hơn, rất phổ biến là giao diện người dùng và phần phụ trợ dữ liệu được phát triển bởi các nhóm khác nhau và thậm chí chúng có thể là các ứng dụng riêng biệt.

# VI. Kiến trúc Content Providers
Content Providers là một tầng lớp giữa phần lưu trữ dữ liệu của ứng dụng cung cấp nội dung và phần còn lại của ứng dụng, tách dữ liệu và giao diện.
Để cung cấp cho bạn một hình ảnh về toàn bộ kiến trúc Content Providers, phần này hiển thị và tóm tắt tất cả các phần của kiến trúc Content Providers đã triển khai, chi tiết như dưới đây:

![](https://images.viblo.asia/a6c7a707-8f73-48bb-bcb1-98a106411a5f.png)

### 1. Data and Open Helper
Kho dữ liệu. Dữ liệu có thể nằm trong cơ sở dữ liệu (database), file, trên internet, được generated dynamically hoặc thậm chí là kết hợp các dữ liệu này. Ví dụ: nếu bạn có ứng dụng từ điển, từ điển cơ sở có thể được lưu trữ trong cơ sở dữ liệu SQLite trên thiết bị của người dùng. Nếu một ghi chú hay topic không có trong cơ sở dữ liệu, nó có thể được lấy từ internet, và nếu điều đó thất bại, ứng dụng có thể yêu cầu người dùng cung cấp một định nghĩa hoặc kiểm tra cú pháp.

Dữ liệu được sử dụng với các Content Providers thường được lưu trữ trong cơ sở dữ liệu SQLite và API của Content Providers.

### 2. Contract
Contract là một lớp public hiển thị thông tin quan trọng về Content Providers cho các ứng dụng khác. Điều này thường bao gồm các lược đồ URI, các hằng số quan trọng và cấu trúc của dữ liệu sẽ được trả về. Ví dụ: đối với ứng dụng từ điển món ăn, Contract có thể hiển thị tên của các cột chứa giá và tên của sản phẩm và URI để truy xuất một món ăn theo tên hoặc ID.

### 3. Content Provider
Content Provider kế thừa lớp ContentProvider và cung cấp các phương thức query (), insert (), update () và delete () để truy cập dữ liệu. Ngoài ra, nó cung cấp một **public interface** và **secure interface** cho dữ liệu, để các ứng dụng khác có thể truy cập dữ liệu với các permissions thích hợp. Ví dụ: để lấy thông tin món ăn từ cơ sở dữ liệu của ứng dụng, ứng dụng từ điển sẽ kết nối với ContentProvider chứ không phải trực tiếp đến cơ sở dữ liệu vì điều đó không được phép.

Ứng dụng sở hữu dữ liệu chỉ định những quyền nào (permissions) các ứng dụng khác cần phải làm việc với nhà cung cấp nội dung. Ví dụ: nếu bạn có ứng dụng cung cấp thông tin các món lẩu cho nhà hàng kinh doanh, ứng dụng của bạn sở hữu dữ liệu và xác định quyền truy cập của các ứng dụng khác đối với dữ liệu. Quyền được chỉ định trong file Android Manifest.

### 4. Content Resolver
Content Providers luôn được truy cập thông qua trình Content Resolver. Hãy nghĩ về Content Resolver như một lớp trợ giúp quản lý tất cả các chi tiết kết nối với một Content Provider cho bạn. Phản ánh API của Content Provider, đối tượng ContentResolver cung cấp cho bạn các phương thức query (), insert (), update () và delete () để truy cập dữ liệu của Content Provider. Ví dụ: để có được tất cả các món ăn là lẩu, ứng dụng từ điển món ăn sẽ tạo truy vấn cho món lẩu và sử dụng trình Content Resolver để gửi truy vấn đó đến Content Providers.

# VII. Implementing a Content Provider
Dựa vào các thông tin trên, để triển khai một Content Providers bạn cần:
- Data (dữ liệu) trong cơ sở dữ liệu
- Một phương thức để truy cập lưu trữ dữ liệu, ví dụ, thông qua một trình trợ giúp ( open helper) cho một cơ sở dữ liệu.
- Định nghĩa, khai báo Content Provider của bạn trong Tệp Android Manifest để cung cấp cho ứng dụng của riêng bạn và các ứng dụng khác.
- Phân lớp (kế thừa) lớp ContentProvider thực hiện các phương thức query (), insert (), delete (), update (), count () và getType ().
- Public **contract** class hiển thị lược đồ URI, tên bảng, loại MIME và các hằng số quan trọng cho các lớp và ứng dụng khác. Trong khi điều này là không bắt buộc, nhưng nếu không có nó, các ứng dụng khác không thể biết cách truy cập vào Content Provider của bạn.
- Trình Content Resolver để truy cập vào Content Provider bằng các phương thức và truy vấn thích hợp.

Xong, hoàn tất việc chuẩn bị, ở phần tiếp theo mình sẽ hướng dẫn implement chi tiết cụ thể từng bước để tạo 1 ứng dụng hoàn chỉnh thao tác với Content Providers. Hẹn gặp lại các bạn ở phần tiếp theo!

## Tài liệu tham khảo
- https://developer.android.com/guide/topics/providers/content-provider-basics?hl=en
- https://android-delight.blogspot.com/2016/07/how-to-sharing-data-between-apps-using.html
- https://google-developer-training.gitbooks.io/android-developer-fundamentals-course-concepts/content/en/Unit%204/111_c_share_data_through_content_providers.html