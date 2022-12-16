![](https://images.viblo.asia/667016ad-2efc-451b-a525-2e98b512e1df.jpg)

khái niệm responsive website là gì thì xin không trình bày lại ở đây các bác google nhé :rofl::rofl: . Series bài viết này chỉ chia sẻ lại những notes , kinh ngiệm để how to responsive mà thôi ^^ 
# Khai báo meta viewport
Nội dung HTML sẽ đối ứng với màn hình giao diện PC, nên khi xem trên các thiết bị như Tablet hay SP, nội dung sẽ hiển thị không như ý muốn, cụ thể là nội dung bị phóng to hoặc thu nhỏ với tỷ lệ khác đi, để giải quyết vấn đề này ta dùng khai báo viewport cho file HTML.
```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

 
**width=device-width** : Chiều rộng bằng chiều rộng của thiết bị.

**height=device-height** :  Chiều cao bằng chiều cao của thiết bị.

**maximum-scale=1.0** :  Tỷ lệ lớn nhất (1.0 ứng với 100%).

**minimum-scale=1.0** :  Mức phóng to tối thiểu của thiết bị (1.0 ứng với 100%).

**initial-scale=1.0** :  Độ phóng to ban đầu (1.0 ứng với 100%).

**user-scalable=no** :  Cho phép người dùng phóng to màn hình hay không (giá trị yes hoặc no)

# Media queries
Phần này các bạn có thể tham khảo ở link dưới. Khá đầy đủ và chi tiết
https://viblo.asia/p/tim-hieu-ve-media-query-3ZabG9oRzY6E
# Kĩ thuật đặt tên biến với root::
với root bạn có thể nhất thống giang hồ khai báo cá properties của các class trong CSS ở một nơi rồi dùng chung cho cả project . 2 lợi ích chính của việc dùng root này đó là: 
+ khai báo 1 chỗ duy nhất và dùng chung cho tất cả các class , thẻ,
+ định danh được tên biến để đỡ phải ghi nhớ mệt đầu :laughing:

```
::root {
  --checkbox: "\f14a";
  --star: "\f005";
  --bolt: "\f0e7";
  
  --clr-success: rgb(64, 209, 91);
  --clr-error: rgb(219, 138, 52);
  --clr-warning: rgb(206, 41, 26);
}

.icon-list li::before {
  content: var(--icon);
  color: var(--icon-color);
  /* Other styles */
}
```
 Ví dụ trên có thể thấy các properties như : --checkbox, --star, --bolt được sửa dụng lại mà bạn không cần phải quan tâm đến giá trị ban đầu của chúng là gì nữa.
# Định dạng đơn vị tương đối (em ,rem, vh) 
 Không nên sử dụng các giá trị tuyệt đối như px, pt cho các phần tử mang tính bao quát trong trang, điều này sẽ làm cho nội dung của trang web sẽ bị tràn khi xem ở thiết bị có chiều rộng nhỏ hơn giá trị đã thiết lập.

Bạn nên sử dụng các đơn vị tương đối như em , rem , vh, %. Cụ thể các đơn vị này là gì thì các bạn có thể tham khảo bài viết bên dưới và nhiều nguồn trên internet
https://viblo.asia/p/em-rem-trong-css-naQZRGjPlvx

# Một số lưu ý khác
- Nên sử dụng max-width thay vì width để tránh cố định chiều rộng.
- Sử dụng display: none cho các thành phần cần ẩn đi ở từng thiết bị mà bạn muốn ẩn. Và display: block ở các thiết bị cần hiển thị ra.
- Sử dụng tùy chọn !important nếu cần đè viết đè CSS.