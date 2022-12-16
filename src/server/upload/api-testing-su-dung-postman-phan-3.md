Như chúng ta đã biết Postman là một công cụ giúp cho việc test các request và xem response một cách đơn giản và tiện lợi. 
Để nối tiếp các bài viết trước, trong bài này mình sẽ trình bày thêm một số tính năng của Postman giúp ích cho ứng dụng vào công việc.

Một số chức năng mình sẽ trình bày trong bài viết bao gồm:
- Sử dụng biến môi trường để test trên nhiều server khác nhau
- Collections
# 1. Environments in Postman
Đây là chức năng mình thấy khá là hữu ích . Thông thường thì chức năng chính của Environments có thể hiểu nôm na là một nơi  lưu “biến” giống như “biến” trong code để mình có thể tái sử dụng ở nhiều nơi khác nhau .

## Ứng dụng:

  – Giúp lưu lại giá trị của response API trước để điền vào API sau. (Phần này có kết hợp với phần Pre-request và Tests)
  
  – Không phải sửa giá trị của các tham số quá nhiều lần.
  
  Ở Postman sẽ chia làm 2 loại Environments: Local và Global

- Local: Phạm vi ảnh hưởng chỉ có khi chọn đúng Enviroments.
- Global: Phạm vi ảnh hưởng đến toàn bộ các project có trong Postman, nhưng nếu có 2 biến cùng tên ở Local và Global thì sẽ ưu tiên lấy Local.

Ví trí của Envinroment trong Postman như hình dưới đây:
![](https://images.viblo.asia/64aec746-7a62-43b8-a258-caeefe318dd0.png)

## Cách tạo 1 environment

 Ta sẽ tạo ra các biến môi trường và khi chuyển đổi môi trường để test API thì ta cũng chỉ cần chuyển đổi environment sang cái tương ứng. Cách sử dụng chức năng này như sau: 
 
 **Bước 1:**
 
 Ở góc trên bên phải của màn hình chính ta chọn hình bánh răng và chọn chức năng Manage Environments. 
 
 Trong màn hình này ta có thể thêm hoặc sửa một Environment.
 Với mỗi environment , ta có thể import – export, duplicate, add, edit, delete.
 
 ![](https://images.viblo.asia/4d1179e4-137b-47f2-a9a7-5b6a0ea9b674.png)
 
 **Bước 2:**
 
 Điền tên của Enviroment, tên và giá trị của biến.
 
Ở đây, mình lấy ví dụ với biến Test_url , có giá trị là localhost:8080

![](https://images.viblo.asia/29e4c4c3-3a4c-46b1-bc2b-0702c8fb210d.png)

Dấu checkbox thể hiện rằng: có active cái biến đó hay ko. Trong ví dụ trên: mình đang active biến Test_url và có thể sử dụng biến này trong môi trường Test Demo.

Sau đây mình sẽ hướng dẫn cách lấy giá trị của các biến 
- Để lấy giá trị của các biến trong request, viết theo cú pháp :

`{{tên_biến}}:  ví dụ: {{Test_url}}`

 
 ![](https://images.viblo.asia/5b984985-4112-490d-a6c3-dbcfafcec5a8.png)
 
 Như trong hình:
1. Chỗ chuyển đổi qua lại giữa các Environment
2. Cách lấy giá trị biến. Lấy đúng sẽ có màu cam, khi  hover chuột vào thì hiển thị giá trị của biến.
3. Nếu tên biến có màu đỏ có nghĩa là không có biến này trong Environment, chuyện này thường xảy ra khi chuyển đổi qua lại giữa các môi trường của các dự án khác nhau, hoặc đã inactive biến đó.


# 2. Collections
Collections có thể hiểu nom na nó chính là một Folder, giúp tổng hợp các reqquest vào chung một chỗ.
Trước đây nếu không dùng nó, chúng ta sẽ gặp phải một số vấn đề sau:
- Sẽ phải dùng History để tìm lại những request đã dùng
- Không dùng được chức năng tạo API documents tự động mà Postman cung cấp
- Không thể dùng được chức năng Runner, giúp chạy liên tục các Request.
Và Collections giúp giải quyết các vấn đề gặp phải trên.

## Tạo 1 collections
1. Click vào button [New collection]  bên sidebar phía tay trái. 
Điền tên và mô tả (không bắt buộc) collection đó.
![](https://images.viblo.asia/3722b31a-de2a-4e7d-9673-2c14f73835dc.png)

2. Lưu request vào Collection.
3. Lưu request vào Collection.

    B1. Tạo ra 1 new Request 
    
    B2. Ấn nút Save
    
    B3. Chọn Collection cần lưu và Save tiếp.
    
![](https://images.viblo.asia/c7aed6cf-0e22-4dd4-98d9-28d27613a84c.png)

## Các settings chính của 1 Collection.

![](https://images.viblo.asia/487de590-7de3-4f0e-8da4-8c6bbab4df2c.png)

**Share collections**: tạo ra link để share với người khác collection (bị hạn chế bởi kiểu account).

**Rename**: Đổi tên của collection.

**Edit**: Sửa tên và mô tả của collection.

**Add Folder**: tạo thêm collection mới bên trong Collection đó.

**Duplicate**: nhân đôi collection đang có.

**Export**: Xuất collection ra dạng file .json

**Monitor Collection**: Dùng để test hiệu năng (bị hạn chế bởi kiểu account).

**Mock Collection**: giúp giả lập các API sử dụng chức năng Example mà postman hỗ trợ. (bị hạn chế bởi kiểu account).

**Publish Docs**: Tạo ra API Docs định dạng HTML.

**Delete**: Xóa Collection.

Ngoài cách trên, có thể xem chi tiết Collection bằng cách click vào mũi tên [>] .


![](https://images.viblo.asia/ce2bba13-6134-4ccf-b6c3-5d83de65bcf4.png)



Trên đây là những phần mình đã trình bày, hi vọng có thể giúp ích cho mọi người ứng dụng vào công việc khi sử dụng Postman.
Trong bài viết sau mình sẽ tiếp tục trình bày thêm các tính năng khác của công cụ này.

## Tài liệu tham khảo:

[1]https://www.getpostman.com/docs/v6/postman/environments_and_globals/manage_environments

[2]https://www.getpostman.com/docs/v6/postman/collections/creating_collections