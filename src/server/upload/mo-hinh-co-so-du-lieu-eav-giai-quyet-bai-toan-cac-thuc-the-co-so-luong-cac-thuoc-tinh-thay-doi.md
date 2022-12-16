# Giới thiệu mô hình CSDL EAV
Mô hình csdl EAV viết đầy đủ là **Entity-Attribute-Value Pattern** là một mô hình đáp ứng được việc xây dựng hệ thống yêu cầu có sự tùy biến các thuộc tính của bảng thường xuyên tăng.

EAV là một cấu trúc thiết kế cơ sở dữ liệu trong Magento. Điểm mạnh của mô hình cơ sở dữ liệu này là có tính tùy biến tính mở rộng cao, không bị dư thừa dữ liệu.

![](https://images.viblo.asia/d95daaeb-1238-4fed-be02-33ba4c6fcc7e.png)

# Bài toán đặt ra
**Ví dụ một** : Chúng ta cần thiết kế cơ sở dữ liệu cho một hệ thống quản lý sản phẩm của một cửa hàng bán điện thoại.

Thông thường ta sẽ thiết kế 1 bảng Products có các thông tin (tên, mô tả, giá, số lượng, ram, rom..)

Sau khi làm xong hệ thống và đưa vào vận hành hệ thống thì khách hàng yêu cầu thêm các thông tin khác như (màu sắc, hệ điều hành, cpu..), oke không sao, ta thêm các cột đó vào DB thôi.

Nhưng khách hàng ngoài muốn bán điện thoại ra thì còn muốn bán máy tính, camera, tivi, loa... thì sử lý sao giờ, chẳng nhẽ cứ thêm các thuộc tính cần thiết của từng sản phẩm vào trong bảng product à, rồi bảng đó phình to đến hàng trăm cột, có rất nhiều cột dùng ở sản phẩm này nhưng không dùng ở sản phẩm khác được thì sẽ ở trạng thái NULL => Vây là thiết kế DB kiểu này không đảm bảo được rồi

**Ví dụ hai**

Cũng như bài toán một: ở đây chúng ta cần quản lý thông tin user:

Ban đầu bảng user sẽ có 1 số thông tin như sau

![](https://images.viblo.asia/96242637-2a97-45be-95d0-15c3127f3e6f.png)

Sau đó hệ thống yêu cầu lưu trữ nhiều dữ liệu hơn và các dữ liệu đó phát sinh trong khi sử dụng hệ thống, nghĩa là yêu cầu cho admin có thể tạo thêm các cột trên hệ thống. 

Và DB cũ cũng khổng thể đáp ứng được, khi đó chúng ta có thể sự dụng mô hinh CSDL EAV để giải quyết bài toán này.
# Sử dụng mô hình EAV giải quyết bài toán
Phần này chúng ta sử dụng mô hình EAV để giải quyết bài toán quản lý user với 3 bảng dữ liệu.

* Trước hết ta tạo một bảng users: gồm các trường bắt buộc phải có và không thay đổi nhưng (name, email, password...) bảng này trong mô hình EAV gọi là bảng Entity (thực thể)

![](https://images.viblo.asia/244e9dbf-d23f-4925-950f-6fde22ccae9f.png)

*  Tiếp theo ta tạo bảng user_fields:  bảng này trong mô hình EAV gọi là bảng Attribute (thuộc tính) có các trường dữ liệu (id, field_name là ')  bảng này dùng để lưu các tên thuộc tính của user ví dụ cần lưu thêm phone user hay thêm address của user thì chúng ta cần insert thuộc tính đó vào bảng này

![](https://images.viblo.asia/a60156bd-e916-4ddf-8f6d-aa28a71a289c.png)

*  Bảng cuối cùng là bảng user_values: bảng này có các cột user_id, user_field_id, value.  Dùng để lưu các giá trị của user tương ứng với các thuộc tính ở bảng user_fields , ví dụ ở bảng user_fields có thuộc tính phone thì bảng user_values dùng để lưu giá trị phone của user là gì.

![](https://images.viblo.asia/9e1d5878-c0d1-47b5-a348-988dd1295da8.png)

Thiết kế xong rồi, giờ chúng ta xem nó sử dụng ra sao:

Chúng ta cần quản lý thêm thông tin card_number của user 

Ví dụ ta cần trèn thông tin user như sau.

1. Thêm 1 user với thông tin cơ bản của bảng user 

      => một record sinh ra là ( id=1, name='Nguyen Thinh', 'email'='xxxx@gmail.com')
2.  Thêm 'card_number' vào bảng user_fields
 
      => một record sinh ra là ( id=20, field_name='card_number')
3. Thêm giá trị card_number='01919122' của user có id là 1 vào bảng user_values

     => một record sinh ra là ( user_id=1, user_field_id=20, value='01919122')
Khi chúng ta cần lấy các thông tin của user thì chỉ cần lấy ở bảng users kết hợp bảng  user_fields   và user_values để lấy ra các thông tin cần thiết.

Như vậy chúng ta đã sử dụng mô hình EAV để giải quyết vài bài này, Dữ liệu của chúng ta có thể đảm bảo được việc tùy biến các thuộc tính của bảng
# Kết bài
Qua bài viết này chúng ta cũng biết cách sử dụng cơ bản với mô hình CSDL EAV từ đó chúng ta có thể vận dụng để sử lý các bài toán có yêu cầu dữ liệu 'Động'. Cảm ơn các bạn đã theo dõi.