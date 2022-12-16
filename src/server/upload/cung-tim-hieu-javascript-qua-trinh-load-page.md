![](https://images.viblo.asia/b6c7c610-7e01-42b3-9356-85440ae72d47.png)


> ***TL;DR: Giống Life cycle (vòng đời) của một người - Sinh Lão Bệnh Tử.***


-----


# MỤC LỤC

1. Quá trình load page.
2. Vậy làm gì nữa?
3. Túm cái váy lại.

# 1. QUÁ TRÌNH LOAD PAGE

Khi bạn load trang web, những gì diễn ra sau hậu trường gồm:

1. Sinh - `DOMContentLoaded`: 
    * JS load xong file HTML và dựng xong DOM.
    * Chưa load xong external resources (style framework - Bootstrap, API...)
2. Lão - `load`: Giờ mới load xong hết

Khi bạn close trang web, tương tự:

3. Bệnh - `beforeunload`:
    * Giống tên gọi, chưa unload gì cả.
    * VD trong điền form: Alert "Bạn có chắc chắn rời trang? Thông tin sẽ bị mật".
4. Tử - `unload`: unload hoàn toàn, có thể dùng để xử lý, gửi data.

# 2. VẬY LÀM GÌ NỮA?
Xài thôi... Xài cái nào thì viết y chang code như dưới nhé!

```javascript
document.addEventListener('DOMContentLoaded',() => {
    // quậy phá tại đây
});

document.addEventListener('load',() => {
    // quậy phá tại đây
});

document.addEventListener('beforeunload',() => {
    // quậy phá tại đây
});

document.addEventListener('unload',() => {
    // quậy phá tại đây
});

```

# 3. DÒ BÀI CUỐI GIỜ!

1. Quá trình load page diễn ra như thế nào?

![](https://images.viblo.asia/80de61a0-0235-4876-b281-d3462f02d698.jpg)

Nếu bạn thấy bài viết này bổ ích thì hãy tương tác để mình có thêm động lực viết tiếp nhé ^^.

> *Đọc thêm những bài viết khác tại: https://tannguyencse.wordpress.com/*