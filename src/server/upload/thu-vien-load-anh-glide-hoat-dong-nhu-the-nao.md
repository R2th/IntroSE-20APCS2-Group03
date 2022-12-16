Ngày trước khi chưa có Glide chúng ta thường sử dụng các thư viện load ảnh như Picasso, Fresco, Image Loader....Hẳn là các Android dev sẽ thường mắc phải các lỗi ví dụ như crash app do load quá nhiều ảnh dẫn đến hết ngốn hết bộ nhớ được cấp phát cho app, hay load ảnh từ internet mất tới vài giây mới hiển thị, thậm chí khi show ra list trượt lên trượt xuống giật lag như chơi game cấu hình cao trên máy cùi vậy :D.

# Vấn đề đặt ra khi load ảnh trên UI :
* Ngốn bộ nhớ.
* Load ảnh chậm.
* UI chạy không trơn tru, lướt màn hình khá lag.

**1.Out of memory (ngốn bộ nhớ/ hết vùng nhớ) :**

Hệ điều hành Android cũng như các hệ điều hành khác, mỗi ứng dụng khi chạy đều sẽ được **cấp phát 1 vùng nhớ nhất định** - đây là nơi lưu trữ dữ liệu, tài nguyên... sẽ được truy cập bởi ứng dụng, chương trình đó.

Giả sử 1 ứng dụng được cấp phát vùng nhớ với dung lượng 50MB, và ứng dụng đó thực hiện load 100 bức ảnh, mỗi bức ảnh có dung lượng là 1MB, vậy ta có: 100*1 =100MB > 50MB => Out Of Memory (OOM).

Để  giải quyết vấn đề này, Glide sử dụng kỹ thuật gọi là **Downsampling** - thay vì load chính xác kích thước của ảnh vào View chứa, Glide sẽ scale kích thước ảnh sao bằng hoặc nhỏ hơn kích thước view chứa. Ví dụ, ta có bức ảnh 500x500 và 1 view có kích thước 200x200, thì Glide nó sẽ scale kích thước ảnh xuống thành 200*200 hoặc sẽ nhỏ hơn.

**Với câu lệnh sau :**
   ```
   GlideApp.with(context).load(url_of_image).into(imageView); 
   ```
Glide cần biết kích thước của imageview để dựa vào đó mà scale kích thước ảnh nếu cần thiết. Qua đó ứng dụng sử dụng ít bộ nhớ nhất có thể, vì vậy khả năng OOM được giảm đi nhiều. Rất tuyệt vời phải không nào.

**2.Load ảnh chậm:**

Việc load 1 hay nhiều bức ảnh lên giao diện của app tốn rất nhiều thời gian bởi lý do: nhiều tác vụ được thực hiện ở trong UI thread (main thread) như download byte ảnh từ Internet, decode byte thành ảnh, chưa kể ảnh có dung lượng lớn…, đẫn đến nhiều tác vụ chạy đến mức không cần thiết.

1 vấn đề lớn là ta không thể cancel các tác vụ load ảnh được. Nhưng Glide có thể làm được điều này, cancel các tác vụ không cần thiết, và chỉ load các ảnh đã sẵn sàng hiển thị cho người dùng.


**Với câu lệnh sau :**
   ```
   GlideApp.with(activity).load(url_of_image).into(imageView);
   ```
&
   ```
   GlideApp.with(fragment).load(url_of_image).into(imageView);
   ```
Glide dựa vào life cycle của activity hay fragment hiện thời để xác định lúc nào tiếp tục, hủy bỏ các tác vụ load ảnh hay ảnh nào cần load hay hủy bỏ load.

Một điều tuyệt vời nữa đó là Glide sử dụng 2 cache :
*    Memory Cache (Cache ở RAM)
*    Disk cache (Cache ở ổ đĩa hay CPU)
Sử dụng cache có thể giúp ta hạn chế download, decode ảnh lần nữa, và như vậy làm tăng performance cho ứng dụng.

Cùng xem Glide sử dụng 2 cache này như thế nào nhé 🙂
1. Glide kiểm tra xem ảnh được nó được lưu trữ ở memory cache chưa
2. Nếu có rồi thì chỉ cần load ảnh thôi
3. Nếu chưa có, thì kiểm tra ở disk cache
4. Nếu ảnh được lưu trữ ở disk cache, lưu trữ ảnh vào memory cache, sau đó load ảnh vào view
5. Nếu không tồn tại ảnh trong ở cả 2 cache, download ảnh, hay load từ điện thoại, sau đó lưu trữ ảnh ở 2 cache và load vào view.

Qua cách này, ta vừa load ảnh nhanh hơn và hiệu quả hơn, vừa hạn chế download + decode ảnh không cần thiết. (y)

**2.UI giật lag**

Có thể bạn không biết, cứ mỗi 16ms thì Android sẽ update UI 1 lần, và giả sử việc load ảnh trong UI thread ngốn hơn 16ms như vậy sẽ dẫn đến UI mất đi 1 "frame". Càng nhiều frame bị mất đi như vậy sẽ làm cho app chạy không muợt và bị giật lag.