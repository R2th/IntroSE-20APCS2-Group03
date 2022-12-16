![](https://images.viblo.asia/9921a806-69eb-488f-9b05-557bb84e3150.png)

# Box shadow chính truyện

Nhắc đến box shadow, có phải bạn chỉ dùng và chỉ nghĩ đến mấy cái này?

![image.png](https://images.viblo.asia/3abf0650-a038-4eb2-a3bf-4b360fc6d378.png)

Vậy là bạn đã biết tới cách sử dụng cơ bản của box shadow rồi, tới lúc nâng trình lên rồi đây :D

## Cơ bản
### Cú pháp
Box shadow thì hầu như ai cũng biết rồi, tuy nhiên thì thường mọi người không dùng hết power của nó, nên trước hết mình nhắc lại cú pháp đầy đủ đã nhé:
```css
box-shadow: none|h-offset v-offset blur spread color |inset|initial|inherit;
```
* `none`: Giá trị default: là không có shadow
* `h-offset`: Điều chỉnh khoảng cách shadow theo chiều ngang. Giá trị dương cho shadow đổ bóng về bên phải (bóng hiển thị ở bên phải), giá trị âm đổ bóng về bên trái (bóng đổ về bên trái)
* `v-offset`: Điều chỉnh khoảng cách shadow theo chiều dọc. Giá trị dương cho shadow đổ bóng xuống dưới (bóng xuất hiện ở dưới hình), giá trị âm cho shadow đổ bóng lên phía trên (bóng xuất hiện phía trên hình)
* `blur` - không bắt buộc: Độ 'blur' - độ mờ của bóng. Giá trị càng lớn thì bóng càng mờ đi. Giá trị càng nhỏ càng 'solid'
* `spread` - không bắt buộc: Độ phân tán của shadow. Giá trị dương sẽ làm shadow rộng ra, giá trị âm sẽ thu nhỏ kích cỡ shadow
* `color`: màu của shadow. Mặc định là màu font-color hiện tại
* `inset` - không bắt buộc: thay đổi shadow ngoài thành shadow nằm trong hình (giống như mình nhìn đèn trần thạch cao ấy :smiley:)

## Make some art
### Layer icon

![image.png](https://images.viblo.asia/b2bf4d26-7214-413b-9bf3-1ddeb57114a5.png)

Icon này chắc khá quen thuộc rồi, giờ bạn có thể tự vẽ với 1 dòng html thôi này (thêm xíu css nữa) :D.

Đầu tiên, chính là 1 dòng html duy nhất:
```html
<div class="layer"></div>
```
Mình sẽ tạo hình vuông màu nhạt trước, tạo hình cho nó:
```css
body {
  padding: 200px;
}
.layer {
  width: 140px;
  height: 140px;
  border-radius: 15px;
  background-color: #d8d8ff;
}
```

![image.png](https://images.viblo.asia/37ff2d46-4e37-454c-b04e-c9d21ca943a7.png)

Tiếp theo, xoay nghiêng nó 

```css
.layer {
 ...
 transform: rotate(45deg);
}
```

Target tiếp theo là tạo 2 hình layer màu đậm dần. 2 hình này được tạo bằng box shadow đổ sang phải (h-offset > 0) và xuống dưới (v-offset > 0) nếu tính theo việc mình đang nghiêng 45 độ. Mỗi hình sẽ là 1 bộ tham số của box shadow nhé:

![image.png](https://images.viblo.asia/41bd21f1-60be-4c17-9047-49af8711fffa.png)

```css
.layer {
 ...
 box-shadow: #b2b1ff 40px 40px, #6563ff 80px 80px;
 transform: rotate(45deg);
}
```

Lớp shadow đầu tiên, mình chỉnh cho lệch đi 40px so với hình gốc, cả về 2 phía ngang và dọc. Lớp thứ 2 tương tự, nhưng lệch 80px để tạo khoảng cách đều nhau giữa 3 hình.

Trông khá ổn rồi. Giờ phải kéo giãn hình ra cho giống mẫu nữa. Để kéo giãn, mình dùng `transform: skewX` nhé. Do việc skew này sẽ khiến cho hình không còn đều các cạnh nữa, thậm chí trông cũng có vẻ không phải nghiêng 45 deg so như hình mẫu nữa. Vì vậy sẽ cần chỉnh sửa góc rotate và thêm scaleX cho 'cân mắt'. Sau 1 hồi điều chỉnh các thông số lên xuống, mình được kết quả cuối như sau:
```css
.layer {
 ...
 box-shadow: #b2b1ff 40px 40px, #6563ff 80px 80px;
 transform: rotate(30deg) skewX(-30deg) scaleX(1.15);
}
```

Giờ thì 'trông giống' hình lắm rồi đấy :D

{@embed: https://codepen.io/bunnypi04/pen/oNwEwrv}

Các bạn có thể xem mẫu trên codepen nhé:
https://codepen.io/bunnypi04/pen/oNwEwrv

### Shadow đồng tâm - target board - bảng phi tiêu

![image.png](https://images.viblo.asia/ae627217-10c0-40b9-be41-de4f43436ab0.png)

Ở phần ví dụ này, có 2 cách để làm, tuy nhiên mình sẽ dùng thuộc tính `inset` để có thêm ứng dụng nhiều hơn nhé.

Vì sử dụng `inset`, nên bóng của mình sẽ đổ vào bên trong. Như vậy chỉ cần tạo hình tròn bên ngoài cùng, rồi các vòng tròn bên trong sẽ co dần vào, thế là kích thước của Hình kết quả sẽ bằng với kích thước của div gốc luôn.

```html
<div class="target"></div>
```

Tiếp đến là tạo hình tròn gốc:
```css
body {
  background-color: #3ebb92;
  padding: 100px;
}

.target {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background-color: #e8ac1e;
}
```

![image.png](https://images.viblo.asia/d618ec7b-bdf1-4aed-bc37-51ffbff3ca63.png)

Có thể thấy, mình sử dụng background của hình tròn này là màu của vòng tròn trong cùng - vòng tròn tâm. Bởi vì khi sử dụng shadow ăn dần vào phía trong, thì giống như tạo border rộng dần vào trong của hình vậy, vì thế trong cùng mới là màu nền của hình nhé.

Tiếp theo, mỗi vòng màu sẽ là 1 bộ tham số box shadow. Để nó 'ăn' vào bên trong hình tròn, mình sử dụng inset. Đầu tiên là màu trắng ở ngoài cùng: cho nó dày tầm 35px nhé:
```css
.target {
  ...
  background-color: #e8ac1e;
  box-shadow: white 0px 0px 0px 35px inset;
}
```
Vì shadow này sẽ có tâm là tâm hình tròn luôn, không nghiêng về phía nào cả, nên `h-offset` và `v-offset` đều bằng 0. Vì hình solid, nên blur cũng bằng 0 luôn. Vậy là độ dày 35px kia chính là `spread` - độ phân tán - độ rộng shadow. Thử xem này:

![image.png](https://images.viblo.asia/faf2e8f9-a31b-4cb7-ae0a-e262804d2ee4.png)

Trông hao hao cái trứng ốp :D

Được 1 cái rồi thì những cái tiếp theo đơn giản thôi, cứ như cũ mà làm, tăng dần độ dày lên là được nhé:

```css
.target {
  ...
  background-color: #e8ac1e;
  box-shadow: white 0px 0px 0px 35px inset,
                          #5aafe0 0px 0px 0px 70px inset,
                          #e15a68 0px 0px 0px 105px inset,
                          #fbd323 0px 0px 0px 140px inset;
}
```

Thế là xong Target board như mẫu rồi kìa! Dễ như ăn kẹo :D

Mọi người có thể xem kết quả trên codepen của mình này: https://codepen.io/bunnypi04/pen/NWgyjmP?editors=1100

{@embed: https://codepen.io/bunnypi04/pen/NWgyjmP?editors=1100}


### Pixel art
Với box shadow này, mình thích nhất là trò vẽ pixel chỉ bằng 1 dòng html và còn lại là css và box shadow cân tất :D

Về Pixel art, chắc các bạn không lạ gì trò minecraft, đây là điển hình của Pixel art. Mọi thứ đều tạo từ các hình hộp lập phương, trong 2D mà hôm nay mình làm thì sẽ là hình vuông. VD như hình dưới đây mình tìm được

![image.png](https://images.viblo.asia/5bcb850f-5cdf-4d01-8170-5e2a864f6fc4.png)

Với phần tutorial, mình sẽ hướng dẫn vẽ hình trái tim bằng pixel để hướng dẫn, còn bài ví dụ mình sẽ vẽ Pokeball kia nhé (định vẽ pikachu nhưng mà ngồi lâu đau lưng quá :D)

Để dễ hình dung, mình sẽ vẽ hình mẫu trên lưới ô vuông cho mọi người dễ nhìn. Vẽ luôn trên excel có đánh vị trí các ô cho tiện theo dõi nhé :D

![image.png](https://images.viblo.asia/6488d08f-f349-421f-b16a-f541bc75971c.png)

Như trên hình minh họa, thì cấu tạo tranh là lưới các mắt hình vuông, trong đó 1 số ô vuông được tô màu đỏ, tạo thành hình trái tim. Vậy thì việc đơn giản thôi: ô trắng kệ nó, vẽ - tô ô đỏ thôi.


Đầu tiên, vẽ 1 ô vuông kích thước đại diện đã này:
```html
<div class="heart-block" style="width: 20px; height: 20px"></div>
```

Mình sẽ chọn ô B2 là ô kích thước đại diện này nhé. Ô vuông này cũng chính là 'Khung' của hình pixel - dòng html duy nhất đây :D.

**Hàng 1:** 

Tiếp theo, để vẽ ô đỏ C2, mình sẽ tạo box-shadow cho `heart-block` kia có `h-offset` = 20px (tức cách bên trái 20px, do lấy col B làm base dọc), `v-offset` = 0 (do lấy row 2 làm base ngang), `blur` = 0 (vì mình cần hình solid), chọn màu đỏ nhé:
```css
.heart-block {
    box-shadow: 20px 0 0 red,
}
```

![image.png](https://images.viblo.asia/d37fa245-ba52-41ea-962a-70540e1d0899.png)

Giờ thì ta có như hình, có ô viền đen kia là ô B2, ô đỏ là ô C2 rồi. Tiếp hàng 1 là ô D2, F2, G2.

D2 có vị trí: h-offset=40px, v-offset vẫn bằng 0 (toàn bộ hàng 1 có v-offset bằng 0)
Viết tiếp vào shadow
```css
.heart-block {
  margin-bottom: 100px;
  box-shadow: 20px 0 0 red, 40px 0 0 red, 80px 0 0 red, 100px 0 0 red;
}
```

![image.png](https://images.viblo.asia/001c529c-e6a4-437e-9f5d-be1eabeef9cb.png)

Xong hàng 1 rồi. Với cách làm như vậy, làm tiếp các hàng tiếp theo nhé:

**Hàng 2, 3, 4, 5, 6:**

Dưới đây là các hàng đầy đủ, mỗi hàng trên 1 dòng:

![image.png](https://images.viblo.asia/e5b6aa5d-03bb-4f44-af08-c9b420e4a7a1.png)

Vậy là từ giờ, bạn có thể vẽ bất cứ pixel art nào với box shadow rồi nhé :D. Đây là quả bóng pokeball của mình để mọi người tham khảo
https://codepen.io/bunnypi04/pen/YzQeNxo?editors=1100

{@embed: https://codepen.io/bunnypi04/pen/YzQeNxo?editors=1100}

# Số phận các câu chuyện tiếp theo

Phần này thì chỉ là 1 số lời tới những bạn đang theo dõi các series bài viết của mình thôi, vài lời bên lề :)

Sắp tới có thể là sẽ có 1 vài sự thay đổi, dẫn đến việc mình không bị 'dí' target 1 bài viblo mỗi tháng nữa. Vì vậy rất có thể là các bạn sẽ thấy lâu quá mình không viết tiếp series nữa (mặc dù vẫn còn nhiều cái để viết lắm, nhưng mà mình lười ạ :D). Bản thân cũng muốn share thêm viết thêm bài kiến thức lắm, vì lúc viết bài mình mới mò mẫm thêm nhiều kiến thức để share được phong phú nhất cho các bạn, và mình cũng thích series này nữa, nên là có thể lâu lâu rảnh mình lại viết tiếp.

Vậy nhé, nếu tầm này tháng sau mình không ra bài mới, thì các bạn thông cảm là lâu lâu nữa mình mới có bài nhé, đỡ sốt ruột :D