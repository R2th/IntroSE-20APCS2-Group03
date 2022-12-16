## 1. Yêu cầu
Yêu cầu bài toán là cho sẵn một ảnh lớn bên trong có 20 khung hình, mỗi khung hình mô tả chuyển động của nhân vật. Nhiệm vụ của bạn là lặp các khung hình liên tục từ đầu tới cuối để tạo thành một sticker chuyển động giống như ảnh gif bên dưới. Đây là một trong những [bài tập vanilla Javascript](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox) ở mức cơ bản giúp các bạn làm quen, chủ yếu giải thích về Javascript nên phần giao diện sẽ không phân tích nhiều. Hi vọng với bài tập này các bạn sẽ thấy thích thú khi học Javascript.

![](https://1.bp.blogspot.com/-o1Xm7UR5YA8/XwM72i3AKNI/AAAAAAAAEoE/3OHYim4JL10PSdBQ3o_j8PFusCZNnzpKQCK4BGAsYHg/s520/ProjectJS%2BAnimated%2Bsticker.gif)

## 2. Chuẩn bị file
Trước khi bắt tay vào làm ta cùng xem ảnh lớn như thế nào để các bạn dễ hình dung.

![](https://images.viblo.asia/c0075f25-9097-48a1-b610-9820be7319d9.png)
## 3. Giao diện HTML - CSS
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vanilla JS Project: Animated sticker</title>
  <style type="text/css">
    .sticker {
      width: 130px; height: 130px; 
      background: url(Usagyuuun.png) no-repeat 0 0;
    }
  </style>
</head>
<body>
  <h1>Vanilla JS Project: Animated sticker</h1> 
  <div class="sticker"></div>
  <script type="text/javascript"> // code Javascript </script>
</body>
</html>
```
## 4. Hướng giải quyết chính
**Bước 1: Biết về CSS Image Sprites** 

Bạn có thể vào đường link bên dưới để tìm hiểu: https://kentrung256.blogspot.com/2019/10/tim-hieu-ky-thuat-css-image-sprites.html

**Bước 2: Đánh số ảnh**

Bước này nhằm giúp các bạn dễ theo dõi các hình ảnh chuyển động thôi, mình đã clone ảnh gốc và đánh số cho từng hình như bên dưới.
![](https://images.viblo.asia/3a517c94-15bd-4d72-802b-50b1d80581c5.png)

**Bước 3: Xác định kích thước của mỗi khung hình nhỏ**
* Ta có ảnh lớn kích thước đo được là: **2600x130**
* Ảnh lớn được chia theo kiểu 1 hàng ngang **20 ảnh**
* Như vậy mỗi hình nhỏ sẽ có kích thước: **130x130** = (2600 / 20)


**Bước 4: Xác định chuyển động cho từng khung hình**
* Về lí thuyết cứ 24 hình / giây thì mắt người coi đấy là một chuyển động liên tục, tuy nhiên với chuyển động sticker ta không cần phải đủ yêu cầu trên, có khi 19-20 hình / giây cũng ok rồi không cần phải mượt mà quá.
* Thời gian chuyển động mỗi khung hình ta dùng **setInterval** với thời gian là: **1000/20 = 50(ms)**
* Đặt một biến để biết ảnh tiếp theo sẽ cách bao nhiêu px:  **step = 130**
* Đặt một biến đếm giá trị ban đầu **count = 1**, mỗi lần có bước nhảy thì count + 1, khi count tăng lên và lớn hơn 20 thì ta reset nó về 1 (vì ta chỉ có 20 hình thôi)
* Để thay đổi ảnh thì ta cần biết thông tin của vị trí **postionX** trong css, tọa độ này lại phụ thuộc vào vị trí từng ảnh. Để dễ theo dõi và fix bug mình khuyên các bạn nên dùng ảnh đã đánh số để nhìn rõ thứ tự, giảm thời gian chuyển động xuống cho chậm lại dễ nhìn, cái khó hiểu có lẽ sẽ là tại sao step lại mang giá trị âm và việc tính toán giá trị positionX mà thôi.

## 5. Javascript
```js
const layoutWidth = 2600
const layoutHeight = 130
const totalImages = 20
const imageWidth = layoutWidth / totalImages
const imageHeight = layoutHeight
let count = 1
let positionX = 0
const stickerElement = document.querySelector('.sticker')

setInterval(function() {
  positionX = -(imageWidth * count)
  stickerElement.style.backgroundPosition = `${positionX}px 0`
  count++
  count = (count >= totalImages) ? 0 : count
}, 1000 / totalImages)
```
Kết quả đã được tua chậm và dùng bản đánh số cho dễ nhìn
![](https://images.viblo.asia/a456ad73-9679-43ae-8c00-0021aa42d491.gif)
## 6. Kết quả
{@embed: https://jsfiddle.net/trungnt256/95kn7hvo/9/embed/result,html,css,js/dark}


## 7. Yêu cầu nâng cao
* **Yêu cầu 1:** Hình ở bài tập trên được sắp xếp theo kiểu dàn thành hàng ngang hết nhưng giờ hãy thử độ khó hơn với kiểu sắp xếp bên dưới, code chắc chắn sẽ khiến bạn tiền đình hơn nhiều.
![](https://images.viblo.asia/f12724df-2a8f-4fac-9f20-0a6f6d16b18e.png)

* **Yêu cầu 2:** Nếu bạn hay chat facebook - zalo thì ở phần stickers các sticker đều đứng im, nó chỉ chuyển động khi chúng ta di chuột vào nó, sau khi nó chuyển động xong thì lại đứng im. Bạn nào làm được có thể gửi link cho mình và các bạn khác tham khảo cách làm nhé.



-----




Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* [Demo online](https://animated-sticker.kentrung.repl.co/)
* [Code online](https://replit.com/@kentrung/Vanilla-JS-Animated-sticker)
* [Series vanilla Javascript projects](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox)
* Liên hệ: trungnt256