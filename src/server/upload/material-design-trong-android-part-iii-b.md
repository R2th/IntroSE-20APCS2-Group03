# I. Lời mở đầu
* Xin chào mọi người, hôm nay mình sẽ tiếp tục viết về seri về material design trong android.
* Tiếp tục phần III-a hôm nay mình sẽ viết tiếp về phần III-b về **bold graphic design**.
* Trong phần này mình sẽ nói về các vấn đề: Font và image.

# II. Nội dung
## 1. Font
### a. Định dạng font
* Để hiểu rõ hơn về font, chúng ta cần hiểu hơn về các kiểu font.
* **serif** : 
    * Kiểu chữ có chân. Một nét được thêm vào phần bắt đầu hoặc phần cuối trong nét chính của một chữ.  
    * Được sử dụng nhiều cho các ứng dụng thời gian đọc dài như book...
* **san-serif**:
    * Kiểu chữ không có chân.
    * Được sử dụng nhiều cho web và văn bản phát sinh trong giao diện người dùng.

### b. Đường cơ sở của font
![](https://images.viblo.asia/11552d80-1e3e-4462-92bb-762b1aa0be2e.png)
* **baseline**: điểm đáy của tất cả các text ko có phần dưới.
* **xheight**: chiều cao của text viết thường trong font. Font với xheight lớn giữ cho chữ dễ đọc và thích hợp với body text.
* **capheight**: là chiều cao của chữ in hoa.
* **ascender - descender**: là phần của lowercase dưới capheight hoặc dưới baseline.
* **leading** : là khoảng cách giữa các dòng dọc của text.

###  c. weight and style
* **weight**: 
    * Có gía trị từ 100 đến 1000.
    * Giá trị mỏng nhất là 100.
    * Giá trị đậm nhất là 1000.

* **Style**: 
    * **Bold**: chữ in đậm.
    * **Italic**: chữ in nghiêng.

* Android không có thuộc tính thiết lập **weight** cho Font mà chỉ có thuộc tính thiết lập **style** cho Font:

![](https://images.viblo.asia/aeb431d3-2752-4f7b-826c-25475193d838.png)
* Với việc kết hợp 2 thuộc tính **android:fontFamily** và **android:textStyle** chúng ta có thể thiết **weight** cho chữ.

### a. Chọn chữ phù hợp với ứng dụng
* Chọn những Font có phần cuối cuộn tròn tạo cảm giác gần gũi:

![](https://images.viblo.asia/9f4a5c7b-ce36-4263-9a96-0f4e0344acde.png)
* Chọn những Font hình học thể hiện yêu cầu về cấu trúctrúc đôi khi là cứng nhắc.

![](https://images.viblo.asia/362f879a-9bbe-440b-8837-abcf2536fcc2.png)

**Note**: Việc chọn font không phù cũng sẽ làm giảm trải nghiệm của người dùng + giảm hiệu năng của ứng dụng.
## 2. Image
* Để hình ảnh được hiển thị phù hợp với yêu cầu và đầy đủ, chúng ta cần lưu ý tới thuộc tính **android:scaleType** của **ImageView** hay **ImageButton**.
* **CENTER** : đặt ảnh ra giữa view nhưng không scale.
* **CENTER_CROP** :
    * Scale ảnh đều 2 kích thước (giữ nguyên tỉ lệ của ảnh).
    * Cả hai kích thước (width, height) sẽ >= kích thước của view  padding.
* **CENTER_INSIDE** : ngược với CENTER_CROP. Nếu ảnh to hơn view thì nó = FIT_CENTER.
* **FIT_CENTER** :
    * Scale image để vừa với bên trong view và giữ nguyên tỉ lệ của ảnh.
    * Nếu image ko vừa view thì khoảng cách sẽ được chia đều cho left và right hoặc –top và bottom.
* **FIT_START** và **FIT_END** : scale image để vừa bên trong view nó căn chỉnh sao cho khoảng không được sử dụng sẽ xuất hiện đàu hoặc cuối.
* **FIT_XY** : scale image sử dụng tất cả các không gian của view không quan tâm tới tỉ lệ ảnh.

# III. Tổng kết
* Mình vừa trình bày hết về phần 3 của material design.
* Phần tiếp theo mình sẽ trình bày về **Meaning motion**.