Ở 2 phần trước, chúng ta đã đi cùng nhau thực hiện một ví dụ tạo hiệu ứng số tăng dần mà thường xuất hiện ở các trang Landing Page. Thành quả cuối cũng đã khá hoàn thiện, chúng ta tìm hiểu được thêm một hàm mới toanh - `requestAnimationFrame()` trong Javascript, cũng như sử dụng phương pháp tính toán được giá trị số dựa theo thời gian,...

Hôm nay, do hơi bí ý tưởng cho bài cuối cùng để hoàn thành thử thách MayFest :blush:, nên mình sẽ viết bài này để nói nốt những vấn đề liên quan khi làm một hiệu ứng động như trên.

# Hàm chuyển động của animation
Trước hết mình xin được đưa lại ví dụ CodePen - thành quả cuối cùng của chúng ta ở phần trước:

{@embed: https://codepen.io/tranxuanthang/pen/YzyBvYp}

Nếu nhìn kỹ, hiệu ứng tăng của mấy con số trên trông có vẻ gì đó hơi... nhàm chán. Rút cuộc là chúng ta đang thiếu cái gì?

Theo mình, nó là bởi giá trị của mấy con số hiện đang được **tăng đều** với giá trị của thời gian. Nói cách khác, hiệu ứng của chúng ta đang chạy với **tốc độ tuyến tính** - không thay đổi theo thời gian.

![](https://images.viblo.asia/cd14f3ad-7bbb-49a4-b630-a91946fe7a27.png)

Không có vật thể nào trong tự nhiên lại chuyển động với vận tốc đều với dạng đồ thị góc 45 độ như hình trên cả. Chả trách có gì đó sai sai.

Nếu bạn từng dùng CSS3 animation với transition, thì bán sẽ biết rằng có khá nhiều loại **hàm chuyển động** khác nhau để bạn lựa chọn như: linear, ease (chậm - nhanh - chậm), ease-in (khởi động chậm), ease-out (kết thúc chậm),...

![css3 animation timing function](https://images.viblo.asia/da0de434-9f0c-4abc-ada4-97f0b5347041.gif)

Ở trang [easings.net](https://easings.net) có sẵn rất nhiều hàm chuyển động mà mình có thể áp dụng cho hiệu ứng trong ví dụ của mình. Mình sẽ thử lấy hàm easeOutExpo để sử dụng. Nhớ rằng các hàm ease-out có khởi đầu nhanh, nhưng càng về cuối lại chuyển động chậm lại.

```javascript
// Lấy tại https://easings.net/#easeOutExpo

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
```

Hàm này nhận một tham số là giá trị `x` chính là tỉ lệ thời gian (trong khoảng từ 0 đến 1), và sẽ trả về tỉ lệ của quãng đường trong khoảng từ 0 đến 1.

Giờ mình sẽ bổ sung thêm hàm trên vào hàm tính toán animation của chúng ta:

```javascript
function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
  const startTime = performance.now()
  function updateNumber(currentTime) {
    const elapsedTime = currentTime - startTime
    if (elapsedTime > duration) {
      callback(finalNumber)
    } else {
      const timeRate = (1.0 * elapsedTime) / duration
      const numberRate = easeOutExpo(timeRate)
      const currentNumber = Math.round(numberRate * finalNumber)
      callback(currentNumber)
      requestAnimationFrame(updateNumber)
    }
  }
  requestAnimationFrame(updateNumber)
}
```

Thay đổi so với ở bài trước của mình như sau:

```diff
@@ -1,3 +1,7 @@
+function easeOutExpo(x) {
+  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
+}
+
 function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
   const startTime = performance.now()
   function updateNumber(currentTime) {
@@ -5,8 +9,9 @@
 function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback)
     if (elapsedTime > duration) {
       callback(finalNumber)
     } else {
-      const rate = elapsedTime / duration
-      const currentNumber = Math.round(rate * finalNumber)
+      const timeRate = (1.0 * elapsedTime) / duration
+      const numberRate = easeOutExpo(timeRate)
+      const currentNumber = Math.round(numberRate * finalNumber)
       callback(currentNumber)
       requestAnimationFrame(updateNumber)
     }
```

Thành quả là đây (nhấn nút 0,5x để xem toàn cảnh hơn). Giờ bạn đã có thể thấy càng về cuối chuyển động của các con số càng chậm lại, trông tự nhiên hơn rất rất nhiều.

{@embed: https://codepen.io/tranxuanthang/pen/abvewwP}

Nâng cao hơn, bạn có thể tìm hiểu và áp dụng hàm **đường cong bezier** cho hiệu ứng, được hầu hết các hàm chuyển động trong CSS3 sử dụng. Có bài viết rất hay (bằng tiếng Việt) về đường cong bezier trong CSS3 animation [ở đây](https://www.cione.vn/blog/html-css/css-transition-quy-trinh-chuyen-dong.html) mà bạn nên đọc thử.

![Hình minh họa đường cong bezier](https://images.viblo.asia/1183e973-d6a0-4aca-98a8-0f2af3ca0004.png)
# Tham khảo
* [CSS Transition – Kiểm soát quy trình chuyển động của hiệu ứng](https://www.cione.vn/blog/html-css/css-transition-quy-trinh-chuyen-dong.html)