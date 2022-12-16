### Dễ dàng điều chỉnh độ sáng của hình ảnh và lọc màu bằng Android LightingColorFilter
### ![](https://images.viblo.asia/33d738c9-c0ff-4171-b8c7-84f8c9a43b5c.png)
Đưa ra một hình ảnh, làm thế nào chúng ta có thể làm cho nó sáng hơn hoặc tối hơn trong Android? Có thể nghĩ đến việc sử dụng một lớp màu khác, nhưng đó không phải là cách tốt nhất.

Thật may, Android cung cấp cho chúng ta class LightningColorFilter giúp chúng ta dễ dàng điều chỉnh độ sáng của hình ảnh.
```kotlin
image_background.colorFilter = LightingColorFilter(mul, add)
```

#### Giải thích nhẹ Mul và Add

Ví dụ Mã màu duới dạng hex 
```java
0 x 00     00    00     00
    alpha  red   green  blue
```
4 byte được sử dụng, một cho Alpha, một cho Red, một cho Green, một cho Blue. Phạm vi từ 0 đến FF (0 đến 255)

Trong mô tả API được cung cấp, lời giải thích không rõ ràng lắm.
> Một bộ lọc màu có thể được sử dụng để mô phỏng các hiệu ứng ánh sáng đơn giản.
> 
> LightingColorFilter đưuọc xác định bởi hai tham số, một được dùng để nhân màu nguồn(được gọi là **mul**), một được dùng để thêm vào màu nguồn(được gọi là **add**). Bộ lọc chỉ ảnh hưởng đến các giá trị Red, Green và Blue, còn Alpha sẽ không bị ảnh hưởng.
> 
>Cho màu RGB nguồn, màu R'G'B' được tính như sau: 
>
>R' = R * **mul**R + **add**R
>
>G' = G * **mul**G + **add**G
>
>B' = B * **mul**B + **add**B
>
> 

> Tạo một colorfilter(bộ lọc màu) với việc nhân các RGB channel với một màu và sau đó thêm vào màu thứ hai. Các phần alpha của mull và add sẽ bị bỏ qua. :-?
> 

**Ví dụ** nếu bạn muốn **bỏ đi phần màu Red của màu nguồn** thì giá trị mul và add sẽ là **mul: 0xFF00FFFF** và **add: 0x00000000**

Theo công thức trên thì các giá trị lần lượt là 
* **mul**R = 0x00,  **add**R = 0x00
* **mul**G = 0xFF,  **add**G = 0x00
* **mul**B = 0xFF,  **add**B = 0x00

#### Giải thích kỹ hơn công thức
Dưới đây là mô tả về mặt toán học (vì có các phép nhân và cộng).

Với mỗi pixel của màu nguồn, chúng ta sẽ biến nó thành màu mới với công thức ở dưới đây. Điều này áp dụng cho từng màu R G B, trừ Alpha
```java
newColor = mul/255 * (originalColor) + add
```
Có thể đoán rằng giá trị mặc định của mul là 255(0xFF) và add là 0(0x00).

#### Sử dụng thực tế
Mô tả ở trên vẫn là quá lý thuyết, cái chúng ta cần bây giờ là ví dụ cụ thể.

* Giá trị **mul** chỉ đơn giản là làm cho hình ảnh tối hơn (khi **mul = 0**)  và đúng với màu gốc của nó (khi **mul = 255**), như hiển thị bên dưới.

![](https://images.viblo.asia/f867f46d-6eca-4a98-9ac1-2cab9eb858e4.gif)

* Khi **mul = 255**, add chỉ đơn giản làm cho hình ảnh sáng hơn từ ảnh gốc (khi **add = 0**) cho đến khi nó cuối cùng toàn màu trắng (**khi add = 255**), như hiển thị bên dưới.

![](https://images.viblo.asia/f434feda-c0a6-4130-9299-7e10b5c68eea.gif)

* Tuy nhiên, khi mul = 0, đó là hình ảnh màu đen. Khi add tăng, nó sẽ từ từ chuyển sang màu trắng hoàn toàn, như bên dưới. Ảnh gốc hoàn toàn không hiển thị dưới dạng mul = 0.

![](https://images.viblo.asia/b194e078-7546-4d7f-ad61-49547c4766d9.gif)

#### Đồ thị mul và add

Nếu chúng ta vẽ đồ thị theo 2 chiều, nó sẽ trông như bên dưới, trong đó, khi mul = 0, hình ảnh sẽ có màu đơn giản, từ đen sang trắng, tùy thuộc vào giá trị của add , khi add = 255 tất cả hình ảnh là màu trắng.

Ở tất cả các giá trị khác, hình ảnh thực tế sẽ hiển thị, sau đó, ở một mức độ nào đó, khi mul = 255 và add = 0, màu gốc của hình ảnh được hiển thị.

![](https://images.viblo.asia/375451c5-6549-4d77-ad87-a7347e3ab14b.png)

### Lọc màu sắc cụ thể bằng LightingColorFilter
Ngoài việc điều chỉnh độ sáng, LightingColorFilter cũng có thể được sử dụng để lọc đi các màu cụ thể.

Nếu chúng ta muốn có màu chính (Red, Green hoặc Blue) của hình ảnh, chúng ta chỉ cần đặt Mul cụ thể của màu đó ở mức tối đa:
![](https://images.viblo.asia/8f230f72-0622-4250-bc7b-d89036763e66.png)

Nếu chúng ta chỉ trộn hai màu, nó sẽ giống như lọc đi một màu, như bên dưới: 

**Lưu ý:** Điều này sẽ không tạo ra màu thứ cấp, chẳng hạn như màu lục lam, đỏ tươi hoặc vàng, vì nó là sự tồn tại của hai màu của hình ảnh và không phải là sự pha trộn của hai màu.

![](https://images.viblo.asia/a05c5a43-b352-4dac-958f-0f677b6b33c4.png)


**Nếu chúng ta muốn hiển thị màu thứ cấp, theo kết hợp bên dưới, chúng ta sẽ cần sử dụng biến add**

![](https://images.viblo.asia/41a6481d-84b0-4fdb-9a9b-e94a9229d9c3.jpg)

![](https://images.viblo.asia/833d931e-1981-4ad7-813f-e25dfaa4c612.png)

Tương tự, nếu bạn muốn hiển thị hai trong số các màu thứ cấp, chỉ cần sử dụng ngược lại với màu thứ cấp tương ứng, như được hiển thị bên dưới.

![](https://images.viblo.asia/998dcf22-d46c-4083-a852-3f1837c08863.png)

### Kết luận 
Nói tóm lại, LightingColorFilter là một phương tiện để tăng cường hoặc giảm bớt màu sắc ban đầu của hình ảnh.

### Tài liệu
Bài viết này được dịch từ bài viết [**Android Image Lighting Control and Color Filtering**](https://medium.com/better-programming/android-image-lighting-control-and-color-filtering-89f51a139a79) của tác giả [**Elye**](https://medium.com/@elye.project).

Link github demo của tác giả: https://github.com/elye/demo_android_lightingcolorfilter

(thankyou) :D