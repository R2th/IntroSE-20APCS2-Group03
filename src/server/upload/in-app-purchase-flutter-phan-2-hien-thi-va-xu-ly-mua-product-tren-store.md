### 1. Thiết lập danh sách Product trên các Store:

Trong series bài viết này mình sẽ ví dụ 1 item Consumable tên là Test Diamond cho cả 2 store Android và Ios 

**1. Google Play Store**:

Bạn vào trang Google Play Conse -> App được chọn -> Store Presence -> In-app Products -> Managed products.
 
Sau đó, bạn nhấn nút **"Create managed product"**, rồi điền các thông tin cơ bản như hình dưới:

![](https://images.viblo.asia/36a5b2c7-011a-4a55-9151-9f2f0296e6ff.png)



Nhấn **Saved**,

![](https://images.viblo.asia/b5610a6e-db9d-4c4b-89a9-d53cd326d34c.png)

**2.  Apple Store**:

Đầu tiên, bạn vào trang App Store Connect -> App được chọn -> Chọn Tab Features -> In-App Purchases như hình dưới

![](https://images.viblo.asia/b18fb375-dd28-496f-918a-dbec386ea8fa.png)

Sau đó, chọn **Create Consumable Product**, rồi điền các thông tin cơ bản như hình dưới:

*(Lưu ý: "Product ID" bạn tạo ở 2 store phải đồng nhất với nhau)*

![](https://images.viblo.asia/e0a2c18d-ea6c-43fc-81e5-c91f87a6ddef.png)


### 2. Demo tính năng In App Purchase Flutter:

Việc set up cho từng platform ở trên rất phức tạp, nhưng các bạn phải đảm bảo hoàn thiện các bước ở trên mới nghĩ đến code Flutter. Nếu các bạn đã set up xong, chúc mừng các bạn mình bắt đầu việc code ở Flutter thui :v: 

**2.1 Get danh sách Product hiện tại và đã mua trên Store:**

Khi App được khởi tạo, bạn phải thực hiện các bước như sau:

1. Kiểm tra Connect đến Store.
1. Get danh sách Product hiện tại.
2. Get danh sách Product đã mua.
3. Trong trường hợp danh sách của bạn có sản phẩm thuộc dạng Consumable, bạn nên kiểm tra dưới backend của bạn xem User đã mua sản phẩm đó chưa.

![](https://images.viblo.asia/b976c32e-cfb1-490c-bd06-028db8479e95.png)

**2.2 Handle New Purchases :**
1. Cho phép User thực hiện việc mua Product.
2. Khởi tạo 1 Stream để lắng nghe việc mua hàng.

![](https://images.viblo.asia/a59561bd-53fd-448d-879c-46a4b553f75e.png)

**2.3 Build UI in Flutter:**

Trong giao diện example mà mình đã code khi chạy lên sẽ giống như hình dưới, các bạn hãy kiểm tra lại các setting nếu không fetch được danh sách sản phẩm trên Store.

![](https://images.viblo.asia/4c891396-1102-4b97-bb26-c4fd5e24b6d5.jpg)

![Android](https://images.viblo.asia/65e92e7a-e0aa-498f-829e-f79a63875a64.png)

Tiến hành đặt mua hàng thôi!!!

Khi User mua sản phẩm, mình call func **buyProduct()** để xử lý việc mua hàng, vì trong phạm vi bài viết này mình demo sản phẩm Consumable nên mình chỉ handle trường hợp này mà thôi.

![](https://images.viblo.asia/f9872e4c-8620-4893-9905-8cc12d884f82.png)

Điền mật khẩu và thanh toán thôi!!!

![IOS](https://images.viblo.asia/75bdbc35-a3c8-47ea-a0e1-99769f786e18.jpg)

![Android](https://images.viblo.asia/29db7aa0-c9f5-493f-bd7d-2fd856fdaa99.png)

Tutorial đến đây là kết thúc. Nếu các bạn có thắc mắc hay khó khăn gì, comment bên dưới cho mình biết nhé!!!