### Mở đầu
CSS `transition` là một thuộc tính khá đơn giản và dễ sử dụng, nó cung cấp cho chúng ta một cách để điều khiển tốc độ của hiệu ứng khi thay đổi các thuộc tính của CSS. Ngoài cách sử dụng thông thường như `transition: all .3s ease` ra thì có vài mẹo có thể giúp chúng ta tạo ra những `transition` phức tạp hơn mà chỉ có thể làm được bằng `animation`. Một trong số những mẹo đó là Multi-step `transition`, và đó là thứ chúng ta sẽ tìm hiểu trong post này.
<br><br>
![alt](http://miro.medium.com/max/1400/0*vUKJTBhnHua6SzZG.png)
### Cách viết `transition`
`transition` giống như một version đơn giản hơn của `animation`, chúng đều chuyển từ một thuộc tính cố định sang 1 thuộc tính khác.
```SCSS
.transition {
     transition: [transition-property] [transition-duration] [transition-timing-function] [transition-delay];
}
```
Giống như  `animation`, `transition` cũng có các thuộc tính như `duration` `timing-function` và `delay`.
<br><br>
Bây giờ chúng ta cùng xem qua ví dụ sau
```SCSS
.box {
   width: 150px;
   height: 150px;
   background-color: #5A74C9;
   transition: all .5s ease;
}

.box:hover {
   width: 300px;
   background-color: #CFF9A9;
}
```
Đoạn code trên nói với element `.box` rằng hãy thực hiện transition `width` và `background-color` khi được hover.
<br><br>
{@codepen: https://codepen.io/phongct-1713/pen/JVZemX}
<br>
Chưa hẳn là Multi-step `transition` nhưng với một vài mẹo chúng ta có thể làm được.
### Multi-step `transition`
Chúng ta sẽ đổi một ít đoạn code `CSS` ở trên bằng cách lồng nhiều `transition`, sau đó chỉnh sửa `duration` với `delay` để tạo ra các hiệu ứng `transition` mà chúng ta chỉ có thể thấy trong `keyframes animation`
```SCSS
.box {
   transition: 
     /* step 1 */
     width      .5s ease,
     /* step 2 */
     background-color 0.5s .5s ease;
}
```
{@codepen: https://codepen.io/phongct-1713/pen/dLKQEW}
<br>
Vậy là chúng ta có được 1 hiệu ứng `transition` khá "xịn" và hiệu ứng này tuân theo các bước cố định.
* Khi được hover vào thì `width` sẽ tăng từ `150px` lên `300px` trong `.5s`
* Sau khi `delay` `.5s` thì background-color sẽ thay đổi trong `.5s`
### Tiền năng của Multi-step `transiton`
Đây là một ví dụ về khả năng mà `transiton` CSS có thể làm được bằng cách sự dụng Multi-step.
{@codepen: https://codepen.io/phongct-1713/pen/jRxbZo}
<br>
Cảm ơn các bạn đã đọc, nếu bạn thấy bài viết này hữu ích thì hãy Upvote nhé.