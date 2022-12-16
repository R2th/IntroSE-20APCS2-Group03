![](https://images.viblo.asia/98353388-47c4-4acc-b19a-1c4b8153fc3a.gif)
Chào mọi người, hôm nay mình sẽ giới thiệu với các bạn 1 thủ thuật nho nhỏ bằng javascript làm sao ra được ảnh động giống như em Usagyuuun tăng động xoay xoay như thế kia. Cái gì cũng vậy, mình sẽ đi vào vấn đề mình đã gặp

# Vấn đề
Mình thấy thích usagyuuun tăng động này làm ảnh gif loading giống trên facebook nhưng quay đi quẩn lại usagyuuun này trên giphy, tenor... tìm mọt gông không thấy nó đâu. Câu hỏi đặt ra: *Tại sao facebook có ảnh gif như thế này hay vậy ?* Dân coder như mình sẽ mày mò và chỉ cần ấn F12 mọi chuyện sẽ sáng tỏ.

## Quá trình sau khi ấn F12 của mình
![](https://images.viblo.asia/50bea784-6a17-4a09-9b80-b7c0b59108da.gif)

Mình chọn vùng thẻ div có chứa em tăng động này xuất hiện thì có 1 background với url chưa hình định dạng **png**.

![](https://images.viblo.asia/f9854e42-814b-4805-8b84-394fa7c28915.png)

## Suy đoán
Tức là họ đã code một cách some how nào đó để tạo ra được hình ảnh như kiểu gif thế kia, họ đã ghép từ các hình trên ảnh png gốc sau đó cho chuyển qua chuyển lại tuần tự với bao nhiêu mili giây.

# Cách giải quyết
Như trên facebook họ đã giải quyết bằng css `background-image` và sử dụng code js để thay đổi `background-position` với tầm khoảng 200ms. Đó là 1 hướng đi hay mọi người có thể tham khảo.
## Cách giải quyết khác chỉ bằng html và javascript và có thể hơn thế nữa
Giả dụ bạn muốn xoay xoay thế kia và cộng thêm nó nhảy từ trên xuống dưới, vừa xoay vừa nhảy thì cách trên nếu làm được chắc rất khó :sweat_smile:

Với cách này chúng ta có thể hoàn toàn làm được điều đó sau khi đọc hết bài viết của mình :)))

Trước tiên, chúng ta cùng tìm hiểu qua **canvas** của HTML5.
Chúng ta quan tâm tới `drawImage` dùng để hiển thị hoặc vẽ hình trên canvas. `drawImage` chấp nhận 9 tham số truyền vào

```
(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```

Ý nghĩa của từng tham số tham khảo thêm tại: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

### Làm luôn cho nóng

ở file .html
Chúng ta chỉ cần 
```html
<canvas id="canvas" width="500px" height="500px"></canvas>
```


```index.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
      img.src = './usagyuun.png';
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
```

Kết quả:
![](https://images.viblo.asia/f9854e42-814b-4805-8b84-394fa7c28915.png)

```index.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// Usagyun variables
const USAGYUN_WIDTH = 79;
const USAGYUN_HEIGHT = 80;
const usagyuun = new Image();
usagyuun.src = './usagyuun.png';
usagyuun.onload = () => {
ctx.drawImage(
    // Image
    usagyuun,
    // ---- Selection ----
    0, // sx
    USAGYUN_HEIGHT * 2, // sy
    USAGYUN_WIDTH, // sWidth
    USAGYUN_HEIGHT, // sHeight
    // ---- Drawing ----
    0, // dx
    0, // dy
    USAGYUN_WIDTH, // dWidth
    USAGYUN_HEIGHT // dHeight
  );
};
```
Kết quả:
Phần **USAGYUN_HEIGHT * 2** đây là lấy position: left = 0 và top = 160px  và nó ra hình dưới đây

![](https://images.viblo.asia/8aac4690-9229-4037-a181-384807237fd3.png)

tại sao lại là 79px và 80px, mình có làm 1 số magic đo đạc các khoảng cách các usagyuuun trên các hình.
![](https://images.viblo.asia/bea2c609-c562-4b41-b3a7-6750cb2f1352.gif)

Bây giờ chúng ta sử dụng chút magic của **requestAnimationFrame** 

> Talk is cheap show me the code

{@embed: https://codepen.io/quanghung97/pen/RwbQJmX}

# Kết luận
Các bạn có thể đọc tại [đây](https://uxdesign.cc/how-you-can-use-simple-trigonometry-to-create-better-loaders-32a573577eb4) hoặc tại  [đây](https://uxdesign.cc/how-to-fix-dragging-animation-in-ui-with-simple-math-4bbc10deccf7) để hiểu rõ hơn hoặc có thể trở thành master animation js

facebook: https://www.facebook.com/quanghung997