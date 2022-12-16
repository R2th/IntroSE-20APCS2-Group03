Nhắc đến thư viện load ảnh trong Android thì thứ đầu tiên xuất hiện trong đầu các lập trình viên sẽ nghĩ ngay đến Glide hoặc là Picasso phải không nào ? :laughing:

Tuy nhiên có 1 thư viện khác cũng dùng để load ảnh và cũng mạnh mẽ không kém cạnh gì so với 2 thư viện kể trên mà ít người biết đến. Đó chính là Fresco - chủ đề mà trong bào viết này mình sẽ chia sẻ với các bạn để xem nó có gì khác biệt so với những lib còn lại và có nên sử dụng Fresco để thay thế những thư viện kia không ?

Hãy bắt đầu thôi. Let's go :heart_eyes:
## 1: Fresco là gì ?

Fresco là một thư viện khá là mạnh mẽ được phát triển bởi Facebook và cũng được các ứng dụng Facebook, Instagram... sử dụng để xử lý ảnh. Thư viện này hỗ trợ các thiết bị bắt đầu từ version 2.3 (Gingerbread) trở đi.

Giống như các thư viện khác, Fresco sẽ hạn chế được các vấn đề phát triển khi load and display ảnh trong Android. Các vấn đề đó là gì thì các bạn có thể tham khảo bài viết bên dưới của mình nhé.

https://viblo.asia/p/android-tai-sao-phai-su-dung-thu-vien-de-load-anh-trong-phat-trien-ung-dung-android-bWrZnVNOZxw

## 2: Fresco khác biệt gì các thư viện khác?

Trong bài viết này mình sẽ tập trung vào cơ chế hoạt động cũng như những điều đặc biệt của thư viện này nên mình sẽ không đề cập đến cách implement thư viện này nữa. Các bạn có thể tham khảo cách implement trong đường link mình để cuối bài viết nhé.

### 2.1: Bộ nhớ lưu trữ ảnh.

Nếu như ở Glide và Piscasso thì sẽ có 2 vùng nhớ là *cache và disk* để lưu ảnh sau khi được load lần đâu tiên thì với Fresco chúng ta sẽ có tới 3 vùng nhớ đảm nhiệm công việc này với nhiều lựa chọn hơn.Các vùng nhớ đó là:

* Bitmap Cache:

Bitmap cache cho phép lưu trữ các bức ảnh dưới dạng bitmap.Các bức ảnh sau khi được load về sẽ chuyển sang dạng bitmap và lưu vào trong bộ nhớ này.Có 1 điều đặc biệt mà ở các thư viện khác không có đó là ở Fresco khi thiết bị ở version nhỏ hơn 4.0 thì Bitmap cache data sẽ được lưu ở 1 vùng nhớ gọi là Ashmem heap chứ không phải là Java heap giống như Glide và Picasso. Và tất nhiên khi không lưu ở Java heap thì GC cũng sẽ không được gọi nữa hạn chế lỗi UI unresponsive khi load ảnh. Đó chính là lí do ở những phiên bản Android thấp Fresco được khuyến cáo sử dụng.

* Encoded memory Cache:

Trong vùng nhớ này ảnh sẽ được lưu ở dạng nén (encoded image) để giảm dung lượng của ảnh. Nó sẽ thích hợp để lưu trữ những bức ảnh có kích thước lớn, tránh hiện tượng tràn bộ nhớ và giảm dung lượng ứng dụng đi.
Các bức ảnh được lấy ra từ vùng nhớ này trước khi được display trong view thì sẽ được decode giải mã sau đó mới bắt đầu sử dụng. Tuy nhiên  với trường hợp nếu ảnh được chỉnh sửa( resize, rotation...) thì các hành động chỉnh sửa ảnh này sẽ diễn ra trước khi ảnh được giải mã.

* Disk 

Vùng nhớ này thì chắc hẳn không còn xa lạ với các lập trình viên rồi nhỉ :laughing: Nó có tốc độ chậm hơn so với cache nhưng lại có thể lưu trữ  được dữ liệu ngay cả khi app chuyển sang trạng thái background một điều mà cache không làm được

Đó là 3 vùng nhớ khác nhau trong Fresco. Về cơ chế load ảnh của nó thì các bạn có thể xem trong sơ đồ bên dưới để hiểu rõ hơn nhé.

![](https://images.viblo.asia/2f62ce25-9c17-4417-add5-711ad4d3e35f.png)

### 2.2: Drawing trong Fresco.

Nói đến view hiển thị trong các thư viện load ảnh thì có thể kể đến tiêu biểu là Imageview. Nhưng với Fresco thì lại khác. Thư viện này có hẳn một view riêng để hiển thị ảnh được gọi là *Drawees*.

![](https://images.viblo.asia/f0600b69-a37c-4223-a9e9-5d627849b6b5.png)


Với Drawees, Fresco cung cấp rất nhiều các phương thức để xử lý hình ảnh mà các thư viện khác để implement các method đó tốn khá nhiều dòng code. Ta có thể kể đến một số chức năng hữu ích như:

* Scale ảnh dựa theo 1 điểm chọn trước.
* Hiển thị ảnh dưới dạng hình tròn hoặc với stroke
* Nhấn vào ảnh để load lại ảnh trong trường hợp load fail
* Custom background ảnh
* Hiển thị Progress bar khi load ảnh
* Hiển thị hover khi người dùng tương tác với ảnh

Đó là một vài tính năng hữu ích thì thư viện cung cấp để xử lý ảnh với Drawees. Với chỉ vài dòng code setup đơn giản là lập trình viên đã fix được ảnh theo mong muốn của mình rồi

Ví dụ: Nhấn để load lại ảnh:
![](https://images.viblo.asia/becaff03-b75d-4bde-8249-e6f03202388a.png)
 Chỉ cần tạo 1 Controller với thuộc tính *setTapToRetryEnabled(true)* thì người dùng đã có thể load lại ảnh nếu trong trường hợp ảnh load fail. Nếu với tính năng này sử dụng trong các thư viện khác thì lập trình viên sẽ phải tạo ra kha khá dòng code đấy :slightly_frowning_face: 
 
###  2.3: Streaming trong Fresco.

Streaming là một chức năng khá hay ho của Fresco cho phép ảnh hiển thị từ chất lượng thấp cho đến chất lượng cao. Nó sẽ áp dụng tốt trong trường hợp ảnh có độ phân giải cao hoặc mạng bị chậm mà lập trình viên không muốn show ra 1 placeholder image.

![](https://images.viblo.asia/78c1e048-45b7-4df0-9f23-172a322ab6dd.png)

Ảnh trên là 1 ví dụ về Streaming Image. Nếu để ý thì bạn sẽ thấy Facebook cũng áp dụng phương pháp này đúng không ? Vì Facebook tạo ra Fresco mà :joy:

Để tạo Streaming image cũng không cần quá nhiều code. Ta chỉ cần 2 bước đơn giản

1.Tạo ImageRequest với 1 image Uri

![](https://images.viblo.asia/5dc5ee90-4046-4b25-b09d-f969ad32bde1.png)


2. Tạo DraweeController và cài đặt trong  SimpleDraweeView (Drawees).

![](https://images.viblo.asia/d317de67-1660-43c2-8451-71fce540cd65.png)


Code cũng không quá phức tạp đúng không nào :v: 


## 3: Khi nào nên sử dụng Fresco?

Vậy là mình đã chia sẻ một vài thứ khá là tiêu biểu của Fresco mà những thư viện khác không có sẵn. Ngoài những thông tin phía trên thì thư viện này cũng còn khá nhiều điều xịn xò nữa nhưng mà chắc là để các bạn tìm hiểu dần thôi :laughing::laughing:

Thư viện xịn xò như này thì có nên sử dụng ngay thay thế cho Glide và Picasso không ?

Theo mình thì Fresco có khá nhiều thứ hay ho tuy nhiên không phải lúc nào cũng nên dùng mà còn phải phụ thuộc vào requirement của app mà lập trình viên phát triển.

Fresco có khá nhiều hàm tính năng hay tuy nhiên code cũng sẽ phức tạp hơn các thư viện khác. Với các app cần xử lý ảnh hay chỉnh sửa ảnh nhiều thì nên sử dụng thư viện này để tận dụng được các hàm có sẵn của nó.
Tuy nhiên, với những app đơn giản chỉ load và display ảnh thông thường ít xử lý ảnh thì lập trình viên nên cân nhắc Glide hoặc Picasso để tối ưu hóa chương trình tốt hơn.

## 4: Kết luận

Vậy là mình đã kết thúc bài chia sẻ ở đây. Hy vọng thông tin bài viết hữu ích với bạn đọc. 

Các bạn có thể xem thêm các thông tin khác về thư viện Fresco trong đường link bên dưới và góp ý cho bài viết của mình nhé :kissing_smiling_eyes: 

https://frescolib.org/