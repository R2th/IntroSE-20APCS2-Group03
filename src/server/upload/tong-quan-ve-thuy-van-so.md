## 1.  Khái niệm thủy vân số
Thủy vân số là quá trình nhúng dữ liệu (hay được gọi là thủy vân) vào một đối tượng đa phương tiện nhằm xác thực nguồn gốc hay chủ sở hữu của đối tượng đó
![](https://images.viblo.asia/18fcee02-6f67-4107-8ecc-65319d8bd55d.jpg)



So sánh với ẩn mã
- Giống: Giấu một dữ liệu vào trong dữ liệu khác
- Khác về mục đích:

| Ẩn mã | Thủy vân | 
| -------- | --------
| che giấu sự tồn tại của dữ liệu được nhúng | đảm bảo tính xác thực, an toàn và bảo vệ bản quyền đối với dữ liệu chứa thông tin được nhúng     |
## 2. Phân loại thủy vân số
![](https://images.viblo.asia/13c2abd1-6f29-4647-98d3-ebcffaff46d6.JPG)


## 3. Cấu trúc của hệ thống thủy vân số


Kí hiệu:
* I là vật phủ dung để nhúng thủy vân vào
* W là thủy vân ban đầu cần nhúng
* 𝑊𝑒 là thủy vân trích xuất được
* 𝐼𝑊 là vật phủ sau khi được nhúng thủy vân
* K là khóa sử dụng trong quá trình nhúng và phát hiện/ trích xuất thủy vân
* 𝐼𝑟 là vật có nhúng thủy vân nhưng đã bị tấn công
trên đường truyền, đây cũng chính là vật dung để
kiểm tra trong quá trình phát hiện/trích xuất thủy
vân
* 𝐸𝑚𝑏 là hàm (thuật toán) nhúng thủy vân
* 𝐷𝑡𝑐 là hàm (thuật toán) trích xuất thủy vân
* D là hàm phát hiện thủy vân
* f(I) là hàm biến đổi vật phủ I sang miền tần
số/sóng, giá trị của f là một vector các hệ số tương
ứng của vật phủ trên miền lựa chọn

Quá trình nhúng
*  Nhúng trên miền không gian:
    * 𝐸𝑚𝑏 𝐼, 𝑊,𝐾 = 𝐼𝑊
*  Nhúng trên miền tần số:
    * 𝐸𝑚𝑏 𝑓 𝐼 ,𝑊,𝐾 = 𝐼𝑊
*  Lược đồ nhúng thủy vân

![](https://images.viblo.asia/fe6b48fe-1ee8-4aa6-9280-edfd9470569e.JPG)

Quá trình phát hiện/trích xuất
* Nếu quá trình nhúng sử dụng khóa K thì quá trình
phát hiện/trích xuất cũng phải áp dụng K
* Thủy vân mù: 𝐷𝑡𝑐 (𝐼𝑟,𝐾) = 𝑊𝑒
* Thủy vân không mù: 𝐷𝑡𝑐(𝐼𝑟,𝐼,𝐾) = 𝑊𝑒
* Quá trình phát hiện mù sinh ra đầu ra là một giá trị nhị phân thể hiện sự có mặt hay không của thủy vân W và có thể được biểu diễn như sau:
* 𝐷 (𝐼𝑟, 𝑊,𝐾) =
    * 0, 𝑘ℎô𝑛𝑔 𝑐ó 𝑡ℎủ𝑦 𝑣â𝑛
    * 1, 𝑐ó 𝑡ℎủ𝑦 𝑣ân

Lược đồ phát hiện/trích xuất thủy vân

![](https://images.viblo.asia/f11ec6fe-6e43-4ff4-b8da-3801e575ae99.JPG)

## 4. Một số tính chất của thủy vân số
* Bền vững
    * Không bị thay đổi trước các tác động xử lí cũng
    như các tấn công
        * Nhưng vẫn có thể phát hiện được sau khi xảy ra các tác
        động hay tấn công
    * Thường áp dụng trong trường hợp bảo vệ bản
    quyền chứ không phù hợp với ứng dụng xác thực
    tính toàn vẹn của dữ liệu

* Dung lượng nhúng
    * Là số lượng thông tin có thể được giấu trong vật
phủ
    * Luôn phải xem xét tới hai yêu cầu quan trọng khác
đó là tính trong suốt và tính bền vững
        * → Để có được dung lượng lớn thường phải mất đi hoặc
tính bền vững hoặc tính trong suốt hoặc cả hai


* Trong suốt
* Không thể cảm nhận được bằng các giác quan
thông thường của con người về thủy vân đã được
nhúng
    *  Vẫn phát hiện được thông qua việc xử lí đặc biệt
*  Chỉ áp dụng với thủy vân ẩn chứ không phải thủy
vân hiện

* An toàn
* Thủy vân số là dấu hiệu để định danh một cách
chính xác
    * → Chỉ những người dùng có thẩm quyền mới có thể
phát hiện, trích xuất và thậm chí sửa đổi thủy vân

* Chi phí tính toán
    * Là độ phức tạp của thuật toán sử dụng trong mô
hình thủy vân
    * Là vấn đề rất quan trọng đặc biệt trong các ứng
dụng giám sát truyền thông
        * Vì việc sản xuất đa phương tiện không được phép chậm
và quá trình phát hiện thủy vân phải thực hiện với thời
gian thực
    * Cũng là yêu cầu quan trọng đối với các ứng dụng
trên các thiết bị di động
        * Vì tài nguyên hạn chế và cần phải cân bằng giữa rất
nhiều yếu tố như nguồn pin, băng thông, bộ nhớ, …

## 5. Một số kĩ thuật thủy vân số
* Thủy vân trên miền không gian
* Thủy vân trên miền tần số
* Kết hợp thủy vân trên miền không gian và tần số
* Thủy vân dễ vỡ
* Thủy vân bền vững
## 6. Tổng kết
Ở bài này mình đã giới thiệu cho các bạn một số khái niệm cơ bản , giúp cho các bạn có cái nhìn tổng quan về thủy vân số.

Cảm ơn các bạn đã theo dõi bài viết của mình!