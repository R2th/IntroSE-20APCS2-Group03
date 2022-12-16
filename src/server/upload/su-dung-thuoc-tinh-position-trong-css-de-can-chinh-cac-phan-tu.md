![](https://cdn-media-1.freecodecamp.org/images/1*fXBo56b0tanSCNHo4O2eWw.jpeg)

Nếu bạn mới làm quen với CSS, việc căn chỉnh các phần tử với thuộc tính `position` có thể không dễ dàng như bạn tưởng tượng. Mọi thứ sẽ trở nên phức tạp hơn khi dự án lớn hơn và nếu không hiểu rõ cách CSS giải quyết vấn đề căn chỉnh các phần tử HTML, bạn sẽ không thể khắc phục các vấn đề về căn chỉnh của mình.

Có nhiều cách/phương pháp khác nhau để định vị (xác định vị trí) các phần tử bằng CSS thuần túy. Sử dụng các thuộc tính `float`, `display` và `position` trong CSS là những phương pháp phổ biến nhất. Trong bài viết này, mình sẽ giải thích một trong những cách khó hiểu nhất để căn chỉnh các phần tử bằng CSS thuần túy: thuộc tính `position`.

Bạn cũng có thể xem hướng dẫn căn chỉnh với `position` trong CSS bằng video [tại đây](https://www.youtube.com/watch?v=NYEEN4rs4T8).

Bây giờ thì bắt đầu thôi!

### Thuộc tính `position` và helper

Chúng ta có 5 giá trị chính cho thuộc tính `position`:

`position: static | relative | absolute | fixed | sticky`

và các thuộc tính bổ sung để thiết lập tọa độ của một phần tử (mình gọi chúng là “thuộc tính helper”):

`top | right | bottom | left` AND the `z-index`

> **Lưu ý quan trọng:** thuộc tính helper không hoạt động nếu không có `position` nào được khai báo hoặc với `position: static`.


### `z-index` là gì?

Tưởng tượng rằng chúng ta có các thuộc tính `height` (chiều cao) là `x` và `width` (chiều rộng) là `y`. Vậy `z` là chiều thứ 3. Một phần tử trong trang web đứng trước các phần tử khác khi giá trị z-index của nó tăng lên. 

> `z-index` không hoạt động với `position: static` hoặc không có `position` nào được khai báo.

Các phần tử được sắp xếp từ sau ra trước, khi `z-index` của chúng tăng lên:

![](https://cdn-media-1.freecodecamp.org/images/1*Dc7075K8xmYZQAqn6BaJPg.png)

Bạn có thể xem video [tại đây](https://www.youtube.com/watch?v=vo1JBj-OAa8) để biết cách sử dụng z-index chi tiết hơn.

Giờ thì tiếp tục với các giá trị của thuộc tính `position`!

### 1. Static

`position: static` là giá trị mặc định. Cho dù chúng ta có khai báo hay không, các phần tử vẫn sẽ được định vị theo thứ tự bình thường trên trang web. Ví dụ:

Đầu tiên, chúng ta định nghĩa một cấu trúc HTML:

```html
<body>
  <div class="box-orange"></div>
  <div class="box-blue"></div>
</body>
```

Sau đó, tạo 2 hộp và xác định widths, heights & positions của chúng:

```css
.box-orange {          // without any position declaration
  background: orange;
  height: 100px;
  width: 100px;       
}

.box-blue {
  background: lightskyblue;
  height: 100px;
  width: 100px; 
  position: static;   // Declared as static
}
```

Kết quả là như nhau với việc có và không có khai báo `position: static`:

![](https://cdn-media-1.freecodecamp.org/images/1*atA27-7dzI4wKkg_HfAtLw.png)

### 2. Relative

`position: relative`: **Vị trí mới của một phần tử so với vị trí bình thường của nó.**

Bắt đầu từ `position: relative` (và đối với tất cả các giá trị `position` non-static) trở đi, chúng ta có thể thay đổi vị trí mặc định của phần tử bằng cách sử dụng các thuộc tính helper mà mình đã đề cập ở trên.

Thử di chuyển hộp màu cam sang bên cạnh hộp màu xanh:

```css
.box-orange {
  position: relative;  // We are now ready to move the element
  background: orange;
  width: 100px;
  height: 100px;
  top: 100px;         // 100px from top relative to its old position
  left: 100px;        // 100px from left
}
```

Hộp màu cam được di chuyển 100px xuống dưới cùng và bên phải, so với vị trí bình thường của nó:

![](https://cdn-media-1.freecodecamp.org/images/1*noqTpZ-EBTftlKdFi48Iiw.png)

> **Lưu ý:** Sử dụng `position: relative` cho một phần tử, không ảnh hưởng đến vị trí của các phần tử khác.

### 3. Absolute

Trong `position: relative` , phần tử được định vị tương đối với chính nó. Tuy nhiên, một phần tử có `position: absolute` (định vị tuyệt đối) lại liên quan đến phần tử cha của nó.

Phần tử `position: absolute` bị xóa khỏi vị trí bình thường trên trang web. Nó được định vị tự động đến điểm bắt đầu (góc trên bên trái) của phần tử cha. Nếu nó không có bất kỳ phần tử cha nào thì thẻ gốc ban đầu `<html>` sẽ là phần tử cha của nó.

Từ vị trí của phần tử có thuộc tính `position: absolute`, các phần tử khác có thể bị ảnh hưởng và hoạt động như phần tử `position: absolute` đã bị xóa hoàn toàn khỏi trang web.

Ví dụ nhé, thêm một `container` làm phần tử chính:
```html
<body>
  <div class="container">
    <div class="box-orange"></div>
    <div class="box-blue"></div>
  </div>
</body>
```

```css
.box-orange {
  position: absolute;
  background: orange;
  width: 100px;
  height: 100px;
}
```

`position: absolute` đưa phần tử màu cam về đầu phần tử cha của nó:

![](https://cdn-media-1.freecodecamp.org/images/1*C15mDxOdtFLkXLcFaVRYBQ.png)

Bây giờ nhì thì có vẻ như hộp màu xanh lam đã biến mất, nhưng chưa đâu :relieved: Hộp màu xanh dương hoạt động giống như hộp màu cam bị loại bỏ, vì vậy nó sẽ dịch chuyển đến vị trí của hộp màu cam. 

Giờ thì thử di chuyển hộp màu cam 5 pixels, chúng ta đã có thể nhìn thấy hộp màu xanh đang nằm ở vị trí nào rồi nhé!

```css
.box-orange {
  position: absolute;
  background: orange;
  width: 100px;
  height: 100px;
  left: 5px;
  top: 5px;
}
```

![](https://cdn-media-1.freecodecamp.org/images/1*ss6uEQz9Bbdrdst8kNiHqQ.png)

Tọa độ của một phần tử có `position: absolute` là tương đối với phần tử cha của nó nếu phần tử cha cũng có vị trí non-static.

```css
.container {
  position: relative;
  background: lightgray;
}

.box-orange {
  position: absolute;
  background: orange;
  width: 100px;
  height: 100px;
  right: 5px;    // 5px relative to the most-right of parent
}
```

![](https://cdn-media-1.freecodecamp.org/images/1*AEX5fn8t0MJZCo4Lx52Uaw.png)

### 4. Fixed

Giống như `position: absolute`, các phần tử có` position: fixed` cũng bị xóa khỏi vị trí bình thường trên trang. Sự khác biệt là:

* Chúng chỉ có quan hệ tương đối với thẻ `<html>`, không phải bất kỳ phần tử cha nào khác.
* Chúng không bị ảnh hưởng bởi thao tác cuộn.
    
```css
.container {
  position: relative;
  background: lightgray;
}

.box-orange {
  position: fixed;
  background: orange;
  width: 100px;
  height: 100px;
  right: 5px;    // 5px relative to the most-right of parent
}
```

**Ví dụ:** Thay đổi vị trí của hộp màu cam thành `position: fixed` và lần này nó có vị trí tương đối là 5px so với lề phải của thẻ `<html>` chứ không phải so với phần tử cha (vùng chứa) của nó:

```html
<div class="container">
  <div class="box-orange"></div>
  <div class="box-blue"></div>
  <p>Scroll down the page</p>
</div>
```

```css
.container { 
  position: relative;
  background: lightgray;
  width: 50%;
  margin: 0 auto;
  height: 1000px;
}

.container p {
  text-align: center;
  font-size: 20px;
}

.box-orange {
  background: orange;
  width: 100px;
  height: 100px;
  position: fixed;
  right: 5px;
}

...
}
```

![](https://images.viblo.asia/1af5c4eb-8f06-4621-9650-a6f888f0c2b7.png)

Xem cụ thể cuộn trang [tại đây](https://codepen.io/cem_eygi/pen/EebjaB). Như chúng ra có thể thấy, việc cuộn trang cũng không ảnh hưởng đến vị trí cố định của hộp màu cam. Nó không còn liên quan đến phần tử cha (vùng chứa) của nó nữa.

### 5. Sticky

`position: sticky` có thể được giải thích như là sự pha trộn giữa `position: relative` và `position: fixed`.

Ban đầu, nó hoạt động như một phần tử có `position: relative`, cho đến khi thuộc tính helper được khai báo thì nó được thay đổi hành vi thành `position: fixed`. Cách tốt nhất để giải thích `position: sticky` là bằng một [**ví dụ**](https://codepen.io/cem_eygi/pen/RYjrWz):

```html
<div class="container">
  <div class="box-orange"></div>
  <div class="box-blue"></div>
  <p>Scroll down the page</p>
  <p class="sticky">I am sticky</p>![](https://images.viblo.asia/b9225e4f-46e7-4d0c-86c0-683007885b24.png)

</div>
```

```css
.container { 
  position: relative;
  background: lightgray;
  width: 50%;
  margin: 0 auto;
  height: 1000px;
}

...

.sticky {
  position: sticky;
  background: red;
  top: 0;
  padding: 10px;
  color: white;
}
```

Ban đầu khi chưa có thao tác cuộn hoặc có thao tác cuộn nhưng phần tử có `position: sticky` chưa ở vị trí `top: 0` thì nó hoạt động như  `position: relative`:

![](https://images.viblo.asia/b9225e4f-46e7-4d0c-86c0-683007885b24.png)

Khi thao tác cuộn và phần tử có `position: sticky` bắt đầu lên đến vị trí `top: 0` thì nó hoạt động như `position: fixed`:
![](https://images.viblo.asia/105488c8-6821-46c1-bcc1-012f4e773cf2.png)

> **Lưu ý quan trong:** `position: sticky` không được hỗ trợ trong Internet Explorer và một số phiên bản cũ của các trình duyệt khác. Bạn có thể kiểm tra hỗ trợ của trình duyệt tại caniuse.com.

![](https://www.freecodecamp.org/news/content/images/2019/10/Ekran-Resmi-2019-10-04-23.09.24.png)

Cách tốt nhất để hiểu thuộc tính `position` trong CSS là thực hành. Tiếp tục viết mã cho đến khi bạn hiểu rõ hơn. Nếu có bất kỳ thắc mắc nào về bài viết, hãy dể lại ý kiến ở phần bình luận nhé!

 Tham khảo: [**Nguồn bài viết**](https://www.freecodecamp.org/news/how-to-use-the-position-property-in-css-to-align-elements-d8f49c403a26/)

Thank for reading!!