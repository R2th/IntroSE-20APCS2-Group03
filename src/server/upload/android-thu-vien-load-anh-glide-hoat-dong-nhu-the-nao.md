Ngày xưa lúc chưa biết mấy cái thư viện load ảnh như Glide, Picasso, Fresco, Universal Image Loader,…các Android dev chắc chắn đều gặp phải mấy cái vụ crash app do load quá nhiều ảnh dẫn đến ngốn hết bộ nhớ được cấp phát cho app, hay load ảnh từ trên internet mất tới vài giây mới hiển thị, thậm chí show ảnh ra list thì trượt lên trượt xuống lag như chơi game cấu hình cao trên máy tính cấu hình cùi vậy :D

**Vấn đề mà các Android dev luôn gặp trong việc load ảnh lên UI:**
1. Ngốn bộ nhớ
2. Load ảnh chậm
3. UI chạy không trơn tru, lướt màn hình khá lag
Để giải quyết vấn đề trên các thư viện dùng để cache + load ảnh ra đời : Glide, Picasso... 
![](https://images.viblo.asia/0231b5c6-4a5c-47e6-9ef4-4574b51dfbf4.png)
**1. Out Of Memory (ngốn bộ nhớ/ hết vùng nhớ)**

Hệ điều hành Android cũng như các hệ điều hành khác, mỗi ứng dụng hay chương trình đều được cấp phát 1 vùng nhớ nhất định – nơi lưu trữ dữ liệu, tài nguyên,… sẽ được truy cập bởi ứng dụng, chương trình đó.

Giả sử 1 ứng dụng được cấp phát vùng nhớ với dung lượng 50MB, và ứng dụng đó thực hiện load 100 bức ảnh, mỗi bức ảnh có dung lượng là 1MB, vậy ta có: 100*1 =100MB > 50MB => Out Of Memory (OOM).

Để giải quyết việc này, Glide sử dụng kĩ thuật gọi là **Downsampling** – thay vì load chính xác kính thước của ảnh vào view chứa, Glide sẽ scale kích thước ảnh sao bằng hoặc nhỏ hơn kích thước view chứa. Ví dụ, ta có bức ảnh có kích thước 500*500 và view chứa có kích thước là 200*200, thì Glide sẽ scale kích thước ảnh xuống thành 200*200 hoặc nhỏ hơn.

**Với câu lệnh sau :**
```
GlideApp.with(context).load(url_of_image).into(imageView);
```
Glide cần biết kích thước của imageView để dựa vào đó mà scale kích thước của ảnh nếu cần thiết. 

Qua đó Glide giúp ứng dụng sử dụng ít bộ nhớ nhất có thể, vì vậy khả năng OOM cũng được giảm đi rất nhiều. Thật tuyệt phải không nào ???  :)

**2. Load ảnh chậm**

Việc load 1 hay nhiều bức ảnh lên giao diện của app tốn rất nhiều bởi lý do: nhiều tác vụ được thực hiện ở trong UI thread (main thread) như download byte ảnh từ Internet, decode byte thành ảnh, chưa kể ảnh có dung lượng lớn…, đẫn đến nhiều tác vụ chạy đến mức không cần thiết.

1 vấn đề lớn là ta không thể cancel các tác vụ load ảnh được. Nhưng Glide có thể làm được điều này, cancel các tác vụ không cần thiết, và chỉ load các ảnh đã sẵn sàng hiển thị cho người dùng.

Dựa vào 2 câu lệnh sau:
```
GlideApp.with(activity).load(url_of_image).into(imageView);
```
&
```
GlideApp.with(fragment).load(url_of_image).into(imageView);
```
 Glide dựa vào life cycle của activity hay fragment hiện thời để xác định lúc nào tiếp tục, hủy bỏ các tác vụ load ảnh hay ảnh nào cần load hay hủy bỏ load.

Đó mới là cách thứ nhất 🙂
Cách thứ hai, Glide sử dụng 2 cache:

* Memory Cache (Cache ở RAM)
* Disk Cache (Cache ở ổ đĩa hay CPU)

Sử dụng cache có thể giúp ta hạn chế download, decode ảnh lần nữa, vừa tăng performance cho ứng dụng.

Cùng xem Glide sử dụng 2 cache này như thế nào nhé 🙂
1. Glide kiểm tra xem ảnh được nó được lưu trữ ở memory cache chưa
2. Nếu có rồi thì chỉ cần load ảnh thôi
3. Nếu chưa có, thì kiểm tra ở disk cache
4. Nếu ảnh được lưu trữ ở disk cache, thì lưu trữ ảnh vào memory cache, sau đó load ảnh vào view
5. Nếu không tồn tại ảnh trong ở cả 2 cache, download ảnh, hay load từ điện thoại, sau đó lưu trữ ảnh ở 2 cache và load vào view.

Qua cách này, ta vừa load ảnh nhanh hơn và hiệu quả hơn, vừa hạn chế download + decode ảnh không cần thiết.

**3.  UI không reponsive, lag giật cấp thấp**

Có thể bạn không biết, cứ mỗi 16ms thì Android sẽ update UI 1 lần, và giả sử việc load ảnh trong UI thread ngốn hơn 16ms đó sẽ dẫn đến UI mất đi 1 “frame“. Càng nhiều frame bị mất đi dẫn đến việc app chay không mượt, giật lag.

Ngoài ra  theo thời gian khi nhiều ảnh được load đồng nghĩa cấp phát thêm vùng nhớ để sử dụng, và bắt buộc Garbage Collector (GC) phải làm việc để dọn dẹp vùng nhớ, xử lý các object khác không còn sử dụng nữa,…

Khoảng cách giao phiên làm việc của 2 thanh niên này rất nhỏ dến mức ta không nhận ra, nhưng nếu GC cứ làm việc liên tục sẽ dẫn đến UI của app sẽ đơ hay giật lag.

Để giải quyết vấn đề trên, Glide tạo 1 **Bitmap Pool.**

**Bitmap Pool** là nơi chứa các bitmap **không còn sử dụng** nhưng có thể **sử dụng lại** để decode, **load bitmap mới vào cùng vùng nhớ.** Pool này hoạt động dựa trên khái niệm **inBitmap** .


Để dễ hiểu, mình có đoạn code sau:

```
Bitmap oldImage = BitmapFactory.decodeFile(pathOfOldImage);
imageView.setImageBitmap(oldImage);
// sử dụng thuộc tính inBitmap để sử dụng lại vùng nhớ của oldImage
// cho viêc decode và load newImage
BitmapFactory.Options options = new BitmapFactory.Options();
options.inJustDecodeBounds = true;
BitmapFactory.decodeFile(pathOfNewImage, options);
options.inMutable = true;
options.inBitmap = oldImage;
options.inJustDecodeBounds = false;
Bitmap newImage = BitmapFactory.decodeFile(pathOfNewImage, options);
imageView.setImageBitmap(newImage)
```
Khi Glide cần load 1 bitmap mới, Glide sẽ vào trong Bitmap pool tìm một bitmap phù hợp cho việc load bitmap mới vào vùng nhớ của nó. Tất nhiên kích thước bitmap mới phải bằng hoặc bé hơn bitmap cũ, để có thể tận dụng được vùng nhớ của bitmap cũ.

Khi 1 bitmap hiển thị trên UI không còn sử dụng, Glide sẽ xem xét tính tái sử dụng của bitmap đó để đẩy vào Bitmap pool.

Qua cách này, ta hạn chế việc cấp phát bộ nhớ liên tục, tần suất GC phải làm việc, app chiếm được phần lớn thời gian để chạy, trải nghiệm sử dụng app tốt hơn, mượt hơn, dễ chịu hơn.

**Lời kết**

Vậy là ta đã nắm được phần nào cách các thư viện Android load ảnh hoạt động như thế nào rồi nhỉ ? . Cũng khuya rồi, mình xin dừng đập bàn phím, và cày phim thế giới động vật.