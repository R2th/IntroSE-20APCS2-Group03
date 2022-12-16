## Cách thiết kế cơ bản (thiết kế màn hình, thiết kế chức năng, thiết kế dữ liệu)

### Thiết kế màn hình (Thiết kế UI)

Đầu tiên và quan trọng nhất, yếu tố cần được quyết định chính là **Thiết kế màn hình (Thiết kế UI)**.

Vì người dùng sử dụng phần mềm thông qua màn hình (UI) nên trước hết, việc làm sao để người dùng cảm thấy "dễ sử dụng màn hình" chính là "Con đường tắt" dẫn đến thành công của dự án.

Như đã đề cập ở trên, các mục sau đây được quyết định trong thiết kế màn hình.

* Bạn có thể làm gì trên mỗi màn hình?
* Thông tin hiển thị (văn bản, hình ảnh, v.v.) và bố cục
* Tóm tắt những điều trên trong một sơ đồ chuyển đổi màn hình

![](https://images.viblo.asia/252bb08b-44d2-44cc-b322-4d39cf7639dd.png)

Nếu bạn tổ chức được thiết kế màn hình đến mức độ này, bạn có thể có được một hình ảnh cụ thể về hệ thống đã hoàn thành.
Đây là lý do ta nên  đưa ra thiết kế màn hình đầu tiên.

### Thiết kế tính năng

Sau khi thiết kế màn hình (UI design) xong, hãy thiết kế các chức năng cần thực hiện trong hệ thống.
Hãy hiểu rằng thiết kế chức năng là giai đoạn xác định "quá trình xử lý được thực hiện phía sau hậu trường, dữ liệu cần thiết".

Các quyết định bạn cần thực hiện như được mô tả ở trên.

* Xử lý ngầm ở dưới (tên chức năng và nội dung xử lý)
* Dữ liệu cần thiết để xử lý, nguồn thu thập dữ liệu (đầu vào từ màn hình, thu thập từ DB, v.v.)
* Điểm đến phân phối của dữ liệu đã xử lý (hiển thị màn hình, lưu vào DB, v.v.)

Hãy thiết kế sơ bộ các chức năng của từng trang xuất hiện trong sơ đồ chuyển màn hình.

![](https://images.viblo.asia/6e8cb2e4-9600-45eb-adbb-859a15298a29.png)

![](https://images.viblo.asia/9a1cb87d-7222-4a83-b59f-0f7ae3bd7389.png)

![](https://images.viblo.asia/08dd00d8-17ff-49f4-bfd0-e8d21dc18311.png)

![](https://images.viblo.asia/69d06d01-7faa-44e9-a478-903e32a47d06.png)

![](https://images.viblo.asia/31040499-ad5a-4752-a145-ea2a158b1eb8.png)

![](https://images.viblo.asia/c6e9fedf-be13-4bba-b647-4b295f67adec.png)

Bằng cách này, bất cứ ai cũng có thể hình dung chương trình sẽ được viết ra như thế nào.
Vì thành phần các bộ phận tạo nên hệ thống cũng được làm rõ, việc phân chia vai trò trong nhóm trở nên dễ dàng.

Để hoàn thiện thiết kế chức năng, hãy kết nối thiết kế màn hình và thiết kế chức năng.
Hình dung loại thao tác người dùng và xử lý mặt sau đang được thực hiện giữa các màn hình.

![](https://images.viblo.asia/651194bf-6486-47ed-9424-9a2589be8cd8.png)

Hình dưới đây cho thấy sự sắp xếp tổng thể.
* Lượng thông tin sẽ tăng lên khi bạn đến thời điểm này, vì vậy hãy phóng to phần bạn quan tâm.

![](https://images.viblo.asia/47b33201-941e-4cd5-b806-8d50e3b7bfeb.png)

### Thiết kế dữ liệu

Cuối cùng là thiết kế dữ liệu.
Sau khi chuẩn bị đến bước này, cuối cùng bạn có thể bắt đầu thiết kế dữ liệu.

Như đã đề cập ở trên, có ba điều cần quyết định.

* Nội dung cụ thể của dữ liệu
* Thiết kế cơ sở dữ liệu
* Luồng dữ liệu (luồng dữ liệu)

Điều bạn nên biết ở đây là có bốn loại dữ liệu.
Thiết kế cách thức bốn loại luồng dữ liệu này trong hệ thống.

* **Dữ liệu (tham số) được "đầu vào" cho chương trình**
    * Dữ liệu do người dùng nhập từ màn hình web
    * Dữ liệu đọc từ cơ sở dữ liệu
* **Dữ liệu "trả về" từ chương trình**
    * Dữ liệu được hiển thị trên màn hình web
    * Dữ liệu được lưu trữ trong cơ sở dữ liệu

#### Nội dung cụ thể của dữ liệu

Ở giai đoạn này, chúng ta sẽ thể hiện định nghĩa dữ liệu đã được trừu tượng hóa chẳng hạn như "thông tin thành viên".
Ở cấp độ thực tế, kiến thức về "Chuẩn hoá dữ liệu" là bắt buộc.
* Nếu bạn quan tâm, vui lòng xem [Bài viết tham khảo](https://qiita.com/mochichoco/items/2904384b2856db2bf46c).

* Thông tin thành viên
    * Họ và tên
    * Furigana
    * Mail address
    * Password
* Thông tin sản phẩm
    * Tên sản phẩm
    * Giải thích chi tiết
    * URL hình ảnh sản phẩm
    * Thể loại
    * Maker
    * Giá bán
    * Đánh giá
* Lịch sử mua hàng
    * Mã thành viên
    * ID sản phẩm
    * Ngày mua
    * Số lượng mua

#### Thiết kế cơ sở dữ liệu

Sau khi dữ liệu rõ ràng, hãy thiết kế cơ sở dữ liệu.

Điều đầu tiên cần nhớ là cho đến thời điểm này, dữ liệu được gọi bằng "thông tin thành viên", "thông tin sản phẩm", "lịch sử mua hàng", v.v.
Từ góc độ cơ sở dữ liệu, chúng ta sẽ sử dụng **Bảng**.
※Chẳng hạn như **"Bảng member"**, **"Bảng product"** và **"Bảng Purchase History"**.

Có ba nhiệm vụ được yêu cầu trong thiết kế cơ sở dữ liệu.

* Chia vai trò của bảng thành **"Master"** và **"History"**
* Tổ chức mối quan hệ tham chiếu giữa các bảng
* Từ mối quan hệ tham chiếu, lập biểu đồ ER

※(Lưu ý) Những cái tên như **"master"** và **"history"** là góc nhìn của riêng tôi.

Đầu tiên, chúng ta hãy phân chia vai trò của từng bảng theo các tiêu chí sau.

* Master: Thông tin cơ bản (dữ liệu được tham chiếu từ các bảng khác)
    * Bảng Member (sau đây gọi là "Member master")
    * Bảng Product (sau đây được gọi là "Product master")
* History: Dữ liệu được tích lũy trong khi hệ thống được sử dụng
    * Bảng Purchase history


Tiếp theo, trong "Mối quan hệ tham chiếu giữa các bảng", mối quan hệ giữa đích tham chiếu và nguồn tham chiếu được tổ chức bằng các mũi tên.
Nếu bạn ghi rõ ra là "Dữ liệu được phát sinh từ hành động của user" thì sẽ không bị sót luông dữ liệu cũng như là rất dễ hiểu.

* Trong một số trường hợp, dữ liệu được đưa vào từ bên ngoài thông qua mạng như ví dụ như API dự báo thời tiết.

![](https://images.viblo.asia/002e342e-31f4-4d46-acd2-27fa7eae5101.png)

Cuối cùng, tạo sơ đồ thiết kế của cơ sở dữ liệu (sơ đồ ER) và hoàn thành nó.
* Vui lòng tham khảo [Bài viết tham khảo](https://it-koala.com/entity-relationship-diagram-1897) để biết chi tiết về cách vẽ biểu đồ ER.

![](https://images.viblo.asia/2a7106d4-c49a-4fee-800a-68d3b539592e.png)

#### Luồng dữ liệu

Cuối cùng, nếu bạn tổ chức "mối quan hệ giữa cơ sở dữ liệu và sơ đồ chuyển đổi màn hình",
Bạn có thể thấy toàn bộ hệ thống "thiết kế màn hình x thiết kế chức năng x thiết kế dữ liệu".

Vì chúng ta sẽ viết từng chương trình dựa trên bản vẽ thiết kế này, nên hãy thực hành nhiều lần để bạn có thể vẽ toàn bộ một cách chắc chắn.

![](https://images.viblo.asia/177cf715-da8a-476c-b4e3-e840d90f8cb6.png)

## Thêm một bước nữa cho thiết kế cơ bản

Nếu bạn hiểu các bước từ đầu đến giờ, bạn có thể thiết kế cơ bản, như vậy là đủ cho mục đích phát triển sản phẩm của riêng bạn.
Hãy tiếp tục lập trình trong khi điều tra các phần khác nhau mà chúng ta không hiểu.

Sau khi phát triển, nhiều tác giả đã đăng các bài viết trên Qiita về cách cài đặt server cho việc release sản phẩm, vì vậy vui lòng tham khảo [bài viết này] nếu bạn có nhu cầu tìm hiểu.

Tại trang web phát triển thực tế, bạn không thể đưa ra yêu cầu rõ ràng với lập trình viên trừ khi bạn thực hiện **thiết kế chi tiết**.
Sau khi hiểu rõ nội dung của bài viết này, trước hết hãy nghiên cứu phần sau.

* Lập Class diagram và Sequence diagra
* Xác định kiến trúc hệ thống
* Xác định công nghệ sử dụng cho từng phần của kiến trúc

Mặc dù vậy, sự đổi mới công nghệ ngày nay đặc biệt nhanh chóng, vì vậy có những trường hợp công nghệ mới xuất hiện trong khi đang thực hiện quá trình thiết kế chi tiết.

Bạn cũng có thể học phương pháp phát triển Agile và tiến hành bằng cách "Quyết định trong khi thiết kế chi tiết".
* Bạn cũng có thể tuân theo chính sách phát triển nội bộ của công ty.

## Lời kết

Khi phát triển trong nhóm, việc phân chia vai trò là điều kiện tiên quyết.
Hãy vẽ toàn bộ bức tranh một cách chắc chắn, làm rõ "ai tạo ra cái gì", và tiến hành phát triển một cách suôn sẻ.

## Tham khảo

https://qiita.com/Saku731/items/741fcf0f40dd989ee4f8