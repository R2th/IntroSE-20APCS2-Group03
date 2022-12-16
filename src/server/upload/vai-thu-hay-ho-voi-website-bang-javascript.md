Để học một ngôn ngữ lập trình cách hiệu quả tốt nhất là hãy thực hành, hãy làm và tìm hiểu nó. Ở đây bạn sẽ học một số cách hữu ích của JavaScript trong vòng 30 phút, nó sẽ giúp bạn cách học hiệu quả hơn.
> Hãy sử dụng câu lệnh trên trình `console.log()` bằng cách sử dụng **phím F12** hoặc **Chuột phải** > **Inspect**, ngoài ra bạn cũng thể tổ hợp phím **Ctrl + Shift + I**.
# Sử dụng hàm alert()
Đôi khi bạn sử dụng `alert()` để gỡ lỗi, trình duyệt sẽ bật lên một hộp thoại nhỏ.
```
alert('ĐANG TRONG QUÁ TRÌNH!!! ^%$(&&* LOADING... ');
```
![](https://i.imgur.com/FuhPYcr.png)
# Sử dụng Math.random()
Đoạn code sau rất thú vị khi bạn sử dụng nó, bằng cách chọn tất cả thẻ `div`, `p`, `span`, `img`, `a` và `body` sau đó sử dụng `Math.random()` thay đổi góc nhìn của một trang web với **rotate**.
```
Array.prototype.slice.call(
  document.querySelectorAll(
    'div,p,span,img,a,body')).map(function(tag){
    tag.style['transform'] = 'rotate(' + (
    Math.floor(Math.random() * 3) - 1) + 'deg)';
});
```
Thật là thú zị ha quý zị.
![](https://i.imgur.com/6muaEAu.png)
# Sử dụng .style
Sử dụng `style` giúp cho giao diện và font chữ trang web trở lên độc đáo hơn =))
```
var allDivs = document.querySelectorAll('div');

for(var i = 0; i < allDivs.length; i++){
  allDivs[i].style['background-color'] = 'black';
  allDivs[i].style['color'] = 'green';
  allDivs[i].style['font-family'] = 'Monospace';
}
```
![](https://i.imgur.com/T6kMQHx.png)
# Thay đổi tất cả các hình ảnh thành hình chú chó
Thú zị ở đây là giúp cho bạn thấy được tất cả hình ảnh trên một trang web biến thành hình chú chó cute
```
Array.prototype.slice.call(
  document.querySelectorAll('img')).map(function(tag){
    tag.src = 'https://i.imgur.com/FRLvBQ9.jpg';
});
```
> Bạn có thể thay đổi URL hình ảnh trên nhé 😘
![](https://i.imgur.com/ti20yRK.png)
# Lật ngược trang web
Sử dụng hàm `setTimeout` của JavaScript, khi đấy người dùng cần phải kích hoạt sự kiện bằng cách di chuột trong vòng 5 giây. Khi sự kiện kích hoạt hiệu ứng sẽ được bật, cụ thể là sẽ lật ngược lại trang web.
```
setTimeout(function(){
 document.onmousemove = document.onkeypress = 
 function(){
     document.body.style['transition'] = 'transform 3s';
     document.body.style['transform'] = 'rotate(180deg)';
 }
}, 5000);
```
![](https://i.imgur.com/5ePtByK.png)

Mình hy vọng các bạn sẽ học được một số điều thú zị từ những bản hack JavaScript này!!!