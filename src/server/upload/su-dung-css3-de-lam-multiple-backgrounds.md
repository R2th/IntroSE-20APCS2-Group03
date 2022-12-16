Thêm background  bằng CSS không có gì mới, tính năng này đã có từ khi nó ra đời. Nhưng chúng ta đã giới hạn chỉ thêm một hình ảnh trong một khối khai báo. Bây giờ, CSS3 cho phép tùy chọn thêm nhiều background .
## Sử dụng nó như thế nào?
Vào thời xưa, khi chúng ta cần thêm nhiều hơn một background, rất có thể chúng ta sẽ làm gián đoạn cấu trúc HTML cũng như thêm nhiều class hơn để đạt được kết quả mong muốn thông qua CSS, đại loại như thế này.
```
.overcast1 {
  background-image: url("images/overcast.png");
  background-position: 150px 25px;
}
.rainbow {
  background-image: url("images/rainbow.png");
  background-position: 200px 10px;
}
.overcast2 {
  background-image: url("images/overcast.png");
  background-position: 250px 25px;
}
.sunny {
  background-image: url("images/sunny.png");
  background-position: 100px 10px;  
}
```
Các dòng code trên rõ ràng là thừa. Trong CSS3, đoạn code này chỉ cần sử dụng một thuộc tính *background-image*, như sau;
```
.weather {
  width: 500px;
  height: 280px;
  margin: 50px auto;
  background-image: url("images/overcast.png"),
        url("images/rainbow.png"), 
        url("images/overcast.png"), 
        url("images/sunny.png");
  background-position: 150px 25px, 
        200px 10px, 
        250px 25px, 
        100px 10px;
  background-repeat: no-repeat;
```
Trong đoạn code  này, chúng ta đã thêm bốn hình ảnh với các vị trí khác nhau phù hợp, tạo ra kết quả tuyệt vời này.
![](https://images.viblo.asia/ae7728f1-d094-4944-85cd-6e51031483ef.jpg)
## Thêm Animation Effect
Hơn nữa, chúng ta có thể làm cho kết quả tuyệt vời hơn nữa bằng cách thêm *CSS3 Animations*. Để làm cho việc mã hóa đơn giản hơn, chúng ta sẽ chỉ sử dụng cú pháp tiêu chuẩn từ W3C, nhưng hãy nhớ rằng các trình duyệt - IE9, Firefox, Opera, Chrome và Safari - vẫn cần tiền tố tương ứng để hoạt động.

```
@keyframes weather { 
  0% {
    background-position: 120px 25px, 200px 10px, 280px 25px, 80px 10px;
  }
  100% {
    background-position: 150px 25px, 200px 10px, 250px 25px, 100px 10px;
  }
}
```
Khi chúng ta đã chỉ định @keyframes, thì chúng ta chỉ cần thêmAnimations với tên khung hình chính vào bộ chọn dự định, trong trường hợp này .weather;
```
.weather {
  animation: weather 5s;
}
```
## Trình duyệt hỗ trợ
Theo CanIUse.com, CSS3 Multiple Backgrounds đã được hỗ trợ trong các trình duyệt sau; IE9 +, Firefox 3.6 trở lên. Không có may mắn với Internet Explorer 8. Nhưng nếu bạn có thể tự đảm bảo rằng bạn có thể bỏ lại IE8, bạn có thể sử dụng CSS3 Multiple Backgrounds ngay bây giờ.